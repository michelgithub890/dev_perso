import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import CravingsScreen from '../screens/cravings/CravingsScreen'
import PomodoroScreen from '../screens/pomodoro/PomodoroScreen'
import MeditationScreen from '../screens/meditation/MeditationScreen'
import { MODEL_COLORS } from '../models/modelColors'
import IASreen from '../screens/ia/IASreen'
import AuthScreen from '../screens/auth/AuthScreen'
import RewardsScreen from '../screens/rewards/RewardsScreen'

const Stack = createNativeStackNavigator()

const Tabs = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="cravings" 
                component={CravingsScreen} 
                options={{ title: 'Envies', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            />
            <Stack.Screen 
                name="pomodoro" 
                component={PomodoroScreen} 
                options={{ title: 'Pomodoro', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            /> 
            <Stack.Screen 
                name="meditation" 
                component={MeditationScreen} 
                options={{ title: 'Zen', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            />  
            <Stack.Screen 
                name="ia" 
                component={IASreen} 
                options={{ title: 'IA', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            /> 
            <Stack.Screen 
                name="auth" 
                component={AuthScreen} 
                options={{ title: 'Auth', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            /> 
            <Stack.Screen 
                name="rewards" 
                component={RewardsScreen} 
                options={{ title: 'Récompenses', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            /> 
        </Stack.Navigator>
    )
}

export default Tabs