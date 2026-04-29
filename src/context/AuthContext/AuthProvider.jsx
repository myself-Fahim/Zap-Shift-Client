import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    

    const registerUser = (email,password) =>{
       setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }

    const SignInUser = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const SignInGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const updateProfileInfo = (profile) =>{
        return updateProfile(auth.currentUser,profile)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })

        return ()=>{
            unsubscribe()
        }
    },[])


    const authInfo = {
        registerUser,
        SignInUser,
        SignInGoogle,
        logOut,
        user,
        loading,
        setLoading,
        updateProfileInfo

    }



    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;