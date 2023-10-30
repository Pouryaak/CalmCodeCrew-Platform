import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setInitializing, setUser } from './features/Authentication/authSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './config/firebase';

function App({ children }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user data from Firestore using the user's UID
        console.log(user);
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          // Dispatch an action to set the user data in the Redux store
          dispatch(setUser(userDoc.data()));
        }
      } else {
        dispatch(setUser(null));
      }
      dispatch(setInitializing(false));
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div>{children}</div>
    </>
  );
}

export default App;
