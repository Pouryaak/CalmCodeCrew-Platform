import { doc, getDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { User } from '../../Authentication/models';
import { db } from '../../../config/firebase';

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersRef = collection(db, 'users');
        const userDocs = await getDocs(usersRef);
        return userDocs.docs.map(doc => ({ uid: doc.id, ...doc.data() }) as User);
    } catch (error) {
        console.error("Error fetching all users: ", error);
        throw error;
    }
};

export const getOneUser = async (userUid: string): Promise<User> => {
    try {
        const userRef = doc(db, 'users', userUid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            throw new Error('User not found in Firestore');
        }

        return { uid: userDoc.id, ...userDoc.data() } as User;
    } catch (error) {
        console.error("Error fetching single user: ", error);
        throw error;
    }
};

export const updateUser = async (userId: string, updatedData: Partial<User>): Promise<User> => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, updatedData);
        const updatedUserDoc = await getDoc(userRef);
        return { uid: updatedUserDoc.id, ...updatedUserDoc.data() } as User;
    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
    }
};

export const deleteUser = async (userUid: string): Promise<void> => {
    try {
        const userRef = doc(db, 'users', userUid);
        await deleteDoc(userRef);
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
};