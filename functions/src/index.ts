import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as logger from 'firebase-functions/logger';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

admin.initializeApp();
logger.info('Admin initialized');

let cachedBackgroundImageBuffer: Buffer | null = null;

async function getBackgroundImageBuffer(): Promise<Buffer> {
  if (cachedBackgroundImageBuffer) {
    return cachedBackgroundImageBuffer;
  }
  const bucket = admin.storage().bucket();
  const backgroundImageFile = bucket.file('cert_frame.jpeg');
  const [backgroundImageBuffer] = await backgroundImageFile.download();
  cachedBackgroundImageBuffer = backgroundImageBuffer;
  return backgroundImageBuffer;
}

async function createCertificate(
  studentName: string,
  workshopName: string,
  instructorName: string,
): Promise<Buffer> {
  const backgroundImageBuffer = await getBackgroundImageBuffer();
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([1468, 1080]);
  const jpgImage = await pdfDoc.embedJpg(backgroundImageBuffer);
  const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

  const nameFontSize = 150; // Size for student name
  const workshopFontSize = 100; // Size for workshop name
  const instructorFontSize = 70; // Size for instructor name

  const nameTextWidth = font.widthOfTextAtSize(studentName, nameFontSize);
  const workshopTextWidth = font.widthOfTextAtSize(
    workshopName,
    workshopFontSize,
  );

  page.drawImage(jpgImage, {
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
  });

  // Add text on top of the image
  page.drawText(studentName, {
    x: (page.getWidth() - nameTextWidth) / 2,
    y: 1500,
    size: nameFontSize,
    font: font,
    color: rgb(1, 1, 1),
  });

  page.drawText(workshopName, {
    x: (page.getWidth() - workshopTextWidth) / 2,
    y: 1150,
    size: workshopFontSize,
    font: font,
    color: rgb(1, 1, 1),
  });

  page.drawText(instructorName, {
    x: 2200,
    y: 710,
    size: instructorFontSize,
    font: font,
    color: rgb(1, 1, 1),
  });

  const uint8Array = await pdfDoc.save();
  return Buffer.from(
    uint8Array.buffer,
    uint8Array.byteOffset,
    uint8Array.byteLength,
  );
}

const storage = new Storage();

async function getServiceAccountEmail() {
  const [serviceAccount] = await storage.getServiceAccount();
  logger.info(`The service account email is: ${serviceAccount.emailAddress}`);
}

exports.onWorkshopCompletion = functions.firestore
  .document('workshops/{workshopId}')
  .onUpdate(async (change, context) => {
    logger.info('onWorkshopCompletion triggered, execution started');
    const before = change.before.data();
    const after = change.after.data();
    logger.info('Document before update:', before);
    logger.info('Document after update:', after);

    if (
      before &&
      after &&
      before.status !== 'completed' &&
      after.status === 'completed'
    ) {
      logger.info('Workshop status changed to completed');
      const workshopId = context.params.workshopId;
      const workshopName = after.name + 'Workshop';
      const instructorName = after.mentor;
      const studentIds: string[] = after.students;

      const uploadPromises = studentIds.map(async (userId) => {
        logger.info('Started promises');
        const userRef = admin.firestore().collection('users').doc(userId);
        const userDoc = await userRef.get();
        const studentName = userDoc.data()?.name; // replace with actual field name for full name

        // Generate the certificate PDF

        const pdfBuffer = await createCertificate(
          studentName,
          workshopName,
          instructorName,
        );
        logger.info('After certificate created');

        logger.info('Upload the PDF to Firebase Storage');
        // Upload the PDF to Firebase Storage
        const certificatePath = `certificates/${studentName}_${Date.now()}_${workshopName}.pdf`;
        logger.info('doing admin.storage().bucket().file(certificatePath)');
        const file = admin.storage().bucket().file(certificatePath);
        logger.info(
          "await file.save(pdfBuffer, { contentType: 'application/pdf' });",
        );
        await file.save(pdfBuffer, { contentType: 'application/pdf' });

        logger.info('Get the public URL for the new file');
        // Get the public URL for the new file
        const signedUrlConfig: GetSignedUrlConfig = {
          action: 'read', // 'read', 'write', 'delete', or 'resumable' are valid actions
          expires: '03-01-2500', // The expiration date must be a valid RFC 3339 date string
        };
        logger.info(
          'Doing const [publicUrl] = await file.getSignedUrl(signedUrlConfig);',
        );
        getServiceAccountEmail().catch(console.error);
        const [publicUrl] = await file.getSignedUrl(signedUrlConfig);

        logger.info('Return necessary data for further processing');

        // Return necessary data for further processing
        return {
          userId,
          studentName,
          workshopId,
          publicUrl,
          certificatePath,
        };
      });

      logger.info('Getting results from the promises');

      const results = await Promise.all(uploadPromises);
      logger.info('Got the results from the promises');

      logger.info('Doing const batch = admin.firestore().batch();');

      // Use batch to update users in a single atomic operation
      const batch = admin.firestore().batch();

      logger.info('Doing foreach on the results from promises');

      results.forEach(({ userId, publicUrl, certificatePath }) => {
        // Create a certificate document in 'certificates' collection
        logger.info('Going into every single student');
        const certificateRef = admin
          .firestore()
          .collection('certificates')
          .doc();
        batch.set(certificateRef, {
          userId: userId,
          workshopId: workshopId,
          generationDate: admin.firestore.FieldValue.serverTimestamp(),
          link: publicUrl,
          filePath: certificatePath,
        });
        logger.info('Added it to the certificate');

        // Update the user's 'certificates' array
        const userRef = admin.firestore().collection('users').doc(userId);
        batch.update(userRef, {
          certificates: admin.firestore.FieldValue.arrayUnion(
            certificateRef.id,
          ),
          attendedWorkshops: admin.firestore.FieldValue.arrayUnion(workshopId),
        });
        logger.info('Added it to the users info');
      });

      try {
        await batch.commit();
        logger.info(
          'Successfully updated attendedWorkshops for users:',
          studentIds,
        );
      } catch (error) {
        logger.error('Error updating attendedWorkshops:', error);
      }
    }

    return null;
  });
