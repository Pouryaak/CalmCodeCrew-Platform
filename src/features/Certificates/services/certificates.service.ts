import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { formatDateFromTimestamp } from '../../../utils';
import { getOneUser } from '../../Users/services/users.service';
import { getOneWorkshop } from '../../Workshops/services/workshop.service';
import { Certificate, UserCertificate } from '../models';

export const getAllCertificates = async (): Promise<UserCertificate[]> => {
  try {
    const certificateRef = collection(db, 'certificates');
    const certificateDocs = await getDocs(certificateRef);
    const certificatesWithUser = await Promise.all(
      certificateDocs.docs.map(async (cert) => {
        const certificate = {
          uid: cert.id,
          ...cert.data(),
          generationDate: formatDateFromTimestamp(cert.data().generationDate),
        } as Certificate;
        // Fetch the user for each certificate using the userId field from the certificate
        try {
          const user = await getOneUser(certificate.userId);
          const workshop = await getOneWorkshop(certificate.workshopId);
          // Return the certificate with the user's name added to it
          return {
            ...certificate,
            userName: user.name,
            workshopName: workshop.name,
          };
        } catch (error) {
          console.error(
            `Error fetching user for certificate ${certificate.uid}: `,
            error,
          );
          // Return the certificate without a user name if the user fetch fails
          return certificate; // Return the certificate data without user info if user fetch fails
        }
      }),
    );

    return certificatesWithUser;
  } catch (error) {
    console.error('Error fetching all certificates: ', error);
    throw error;
  }
};

export const getOneCertificate = async (
  certificateUid: string,
): Promise<Certificate> => {
  try {
    const certificateRef = doc(db, 'certificates', certificateUid);
    const certificateDoc = await getDoc(certificateRef);

    if (!certificateDoc.exists) {
      throw new Error('Certificate not found in Firestore');
    }

    return { uid: certificateDoc.id, ...certificateDoc.data() } as Certificate;
  } catch (error) {
    console.error('Error fetching single certificate: ', error);
    throw error;
  }
};
