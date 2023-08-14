import React, { useEffect, createContext } from 'react'
// STATUS BAR 
import { StatusBar } from 'react-native'
// NAVIGATION 
import { NavigationContainer } from '@react-navigation/native'
// MODEL 
import { MODEL_COLORS } from './src/models/modelColors'
// TABS 
import Tabs from './src/navigation/Tabs'
// HOOK FIREBASE 
import useAuthFirebase from './src/firebase/useAuthFirebase'
// REACT NATIVE PAPER 
import { PaperProvider } from 'react-native-paper'

// CONTEXT
export const AppContext = createContext()

const App = () => {
  // HOOK AUTH FIREBASE
  const { user, _onAuth } = useAuthFirebase() 

  // ASK IF LOGGED 
  useEffect(() => {
    _onAuth()
  },[])

  return (
    <PaperProvider>
      {/* PUT USER INSIDE ALL APP */}
      <AppContext.Provider value={{ user }}>
        <StatusBar barStyle="dark-content" backgroundColor={MODEL_COLORS.light} />
        <NavigationContainer>
          {/* INSIDE TABS => PAGES APP */}
          <Tabs />
        </NavigationContainer>
      </AppContext.Provider>
    </PaperProvider>
  )
}

export default App

