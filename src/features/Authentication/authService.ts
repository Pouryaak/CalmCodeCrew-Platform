import { auth, db } from '../../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User } from './models';

export const signInUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const userRef = doc(db, 'users', userCredential.user.uid);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists) {
    throw new Error('User data not found in Firestore');
  }
  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email || '',
    name: '', // You can update this if you fetch the name as well
    intrests: [],
    attendedWorkshops: [],
    certificates: [],
  } as User;
};

export const signUpUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const userRef = doc(db, 'users', userCredential.user.uid);
  await setDoc(userRef, {
    name,
    email,
    intrests: [],
    attendedWorkshops: [],
    certificates: [],
  });
  return {
    uid: userCredential.user.uid,
    email,
    name,
    intrests: [],
    attendedWorkshops: [],
    certificates: [],
  };
};
