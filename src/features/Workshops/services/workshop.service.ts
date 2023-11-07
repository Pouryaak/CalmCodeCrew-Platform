import { doc, getDoc, collection, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { Workshop } from '../models';
import { db } from '../../../config/firebase';
import { omitProperty } from '../../../utils';

// ... other imports ...

export const getAllWorkshops = async (): Promise<Workshop[]> => {
    try {
        const workshopsRef = collection(db, 'workshops');
        const workshopDocs = await getDocs(workshopsRef);
        return workshopDocs.docs.map(doc => ({ uid: doc.id, ...doc.data() }) as Workshop);
    } catch (error) {
        console.error("Error fetching all workshops: ", error);
        throw error;
    }
};

export const getOneWorkshop = async (workshopUid: string): Promise<Workshop> => {
    try {
        const workshopRef = doc(db, 'workshops', workshopUid);
        const workshopDoc = await getDoc(workshopRef);

        if (!workshopDoc.exists) {
            throw new Error('Workshop not found in Firestore');
        }

        return { uid: workshopDoc.id, ...workshopDoc.data() } as Workshop;
    } catch (error) {
        console.error("Error fetching single workshop: ", error);
        throw error;
    }
};

export const addWorkshop = async (workshop: Workshop): Promise<string> => {
    try {
        const omittedWorkshop = omitProperty(workshop, "uid");
        const workshopsRef = collection(db, 'workshops');
        const workshopDocRef = await addDoc(workshopsRef, omittedWorkshop);
        return workshopDocRef.id;
    } catch (error) {
        console.error("Error adding workshop: ", error);
        throw error;
    }
};

export const updateWorkshop = async (updatedData: Workshop): Promise<Workshop> => {
    try {
        const workshopRef = doc(db, 'workshops', updatedData.uid);
        await updateDoc(workshopRef, omitProperty(updatedData, "uid"));
        const updatedWorkshopDoc = await getDoc(workshopRef);
        return { uid: updatedWorkshopDoc.id, ...updatedWorkshopDoc.data() } as Workshop;
    } catch (error) {
        console.error("Error updating workshop: ", error);
        throw error;
    }
};

export const deleteWorkshop = async (workshopUid: string): Promise<void> => {
    try {
        const workshopRef = doc(db, 'workshops', workshopUid);
        await deleteDoc(workshopRef);
    } catch (error) {
        console.error("Error deleting workshop: ", error);
        throw error;
    }
};