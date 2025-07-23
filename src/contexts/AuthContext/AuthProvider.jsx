import React, {  useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = profileInfo => {
        setLoading(true);
        return updateProfile(auth.currentUser, profileInfo);
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , currentUser => {
            setUser(currentUser);
            console.log('user in the auth state change',currentUser);
            
            setLoading(false);
        });

        return () =>{
            unsubscribe();
        }
    },[])



    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        googleSignIn,
        updateUserProfile,
        setLoading,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;