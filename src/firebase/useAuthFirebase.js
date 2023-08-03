import React, { useState } from 'react'
// FIREBASE
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from './FirebaseConfig'
// import useFirebase from './useFirebase'
// HOOKS AUTH

const useAuthFirebase = () => { 
    const [user, setUser] = useState({})
    // const { writeData, updateData } = useFirebase()  
    // const [showModal, setShowModal] = useState(false) 
    // const [titleModal, setTitleModal] = useState(false)
    // const [showModalForgetPassword, setShowModalForgetPassword] = useState(false)
    // const [codeError, setCodeError] = useState()
    // const [myRedir, setMyredir] = useState() 
 
    const _signIn = async (email, password) => { 
        signInWithEmailAndPassword(auth, email, password)
            .then((useCredential) => {
                const user = useCredential.user
                console.log('useauthfirebase signin ok')
            })  
            .catch(() => {
                console.log('email ou mot de passe incorrect')
            })
    }

    // const _signUp = (name, surname, email, password, key, token,phone) => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((useCredential) => {
    //             const user = useCredential.user
    //             // enregistrer ici le document dans firebase
    //             let nameClient = name.toUpperCase()
    //             let surnameClient = surname.charAt(0).toUpperCase() + surname.slice(1)
    //             const data = {name:nameClient, surname:surnameClient, email:email, phone:phone? phone : '' ,uid:user.uid, token:token}
    //             writeData('entreprises/'+key+'/clients',data)
    //             setMyredir('ok')
    //         })
    //         .catch((error) => {
    //             error.code === 'auth/email-already-in-use' ?
    //                 setCodeError(error.code)
    //             :
    //             setShowModal(true)
    //                 setTitleModal('Email incorrect')
    //         })
    // }
 
    const _signOut = () => {
        console.log('useAuth _signOut method')
        signOut(auth).then(() => {
            console.log('useAuth _signOut OK ')
            setCount(count+1)
            _onAuth()
        }).catch((error) => {
            console.log(error)
        })
    }

    const _onAuth = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
        })
    }

    const _forgotPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // setShowModalForgetPassword(true)
                alert('Un lien a été envoyé sur votre boîte mail')
            })
    }

    // IF EMAIL EXIST
    // const _checkIfEmailExists = (email) => {
    //     console.log('_checkIfEmailExists forgotemail email ok', email)
    //     sendPasswordResetEmail(auth, email) 
    //         .then(() => {
    //             alert('Un lien a été envoyé sur votre boîte mail') 
    //             setShowModalForgetPassword(true)
    //         })
    //         .catch((error) => {
    //             alert('Un lien a été envoyé sur votre boîte mail')
    //             setShowModalForgetPassword(true)
    //             // FETCH
    //             fetch(`https://node-server-applysolution.herokuapp.com/email/${email}`)
    //             // CONSOLE
    //             console.log('page use auth firebase _checkIfEmailExists ', email)
    //         })
    // }

    // UPDATE TOKEN 
    // const _updateToken = (email, token, clients, key) => {
    //     const data = {token:token}
    //     clients.filter(c => c.email === email && c.token !== token).map(c => (
    //         updateData('entreprises/'+key+'/clients/'+c.id,data) 
    //     )) 
    // }

    return { 
        user, 
        _onAuth,  
        _signIn, 
        _signOut,  
        _forgotPassword, 
        // _signUp, 
        // showModal,
        // setShowModal,
        // titleModal,
        // setTitleModal,
        // codeError,
        // myRedir,
        // _checkIfEmailExists,
        // showModalForgetPassword,
        // setShowModalForgetPassword,
    }
}

export default useAuthFirebase

