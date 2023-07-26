import React, { createContext, useState, useEffect } from 'react'
// STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false)
  
    useEffect(() => {
        const checkIfLoggedIn = async () => {
            const token = await AsyncStorage.getItem('@token')
            if (token !== null) {
                setUserLoggedIn(true)
            }
        }
        console.log('auth_context useefect ', isUserLoggedIn)
        checkIfLoggedIn()
    }, [])
  
    return (
        <AuthContext.Provider value={{ isUserLoggedIn, setUserLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
