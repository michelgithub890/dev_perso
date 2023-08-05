import React, { useState } from 'react'
// FIREBASE
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from './FirebaseConfig'


const useAuthFirebase = () => { 
    // USER
    const [user, setUser] = useState({})
    // CONST 
    const [myRedir, setMyredir] = useState()
 
    // SIGN IN 
    const _signIn = async (email, password) => { 
        signInWithEmailAndPassword(auth, email, password)
            .then((useCredential) => {
                const user = useCredential.user
                console.log('useauthfirebase signin ok')
                setMyredir('ok')
            })  
            .catch(() => {
                console.log('email ou mot de passe incorrect')
            })
    }
 
    // LOG OUT
    const _signOut = () => {
        console.log('useAuth _signOut method')
        signOut(auth).then(() => {
            console.log('useAuth _signOut OK ')
            _onAuth()
        }).catch((error) => {
            console.log(error)
        })
    }

    // AUTH / NOT AUTH
    const _onAuth = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
        })
    }

    return { 
        user, 
        _onAuth,  
        _signIn, 
        _signOut,
        myRedir,  
    }
}

export default useAuthFirebase

