import React, { use, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
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


    // useEffect(()=>{
    //     const unsubscribe = onAuthStateChanged(auth , currentUser => {
    //         setUser(currentUser);
    //         setLoading(false);
    //     });

    //     return () =>{
    //         unsubscribe();
    //     }
    // },[])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                // Temporary way to assign role
                const tempUser = {
                    ...currentUser,
                    role: currentUser.email === "admin@admin.com" ? "admin" : "user",
                    isMember: false // Optional: For membership
                };
                setUser(tempUser);
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);



    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        googleSignIn,
    }


    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;