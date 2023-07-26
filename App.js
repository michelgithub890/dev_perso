import React, { useEffect, createContext } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { MODEL_COLORS } from './src/models/modelColors'
import Tabs from './src/navigation/Tabs'
import useAuthFirebase from './src/firebase/useAuthFirebase'
import { PaperProvider } from 'react-native-paper'

// CONTEXT
export const AppContext = createContext()

const App = () => {
  const { user, _onAuth } = useAuthFirebase() 

  useEffect(() => {
    _onAuth()
  },[])

  return (
    <PaperProvider>
      <AppContext.Provider value={{ user }}>
        <StatusBar barStyle="dark-content" backgroundColor={MODEL_COLORS.light} />
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </AppContext.Provider>
    </PaperProvider>
  )
}

export default App

