import React from 'react'
// NAVIGATION 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// MODEL 
import { MODEL_COLORS } from '../models/modelColors'
// PAGES 
import HomeScreen from '../screens/HomeScreen'
import PomodoroScreen from '../screens/pomodoro/PomodoroScreen'
import MeditationScreen from '../screens/meditation/MeditationScreen'
import IASreen from '../screens/ia/IASreen'
import AuthScreen from '../screens/auth/AuthScreen'
import RewardsScreen from '../screens/rewards/RewardsScreen'
import GoalsScreen from '../screens/goals/GoalsScreen'

// CREATE STACK
const Stack = createNativeStackNavigator()

const Tabs = () => {
    return (
        // STACK NAVIGATION 
        <Stack.Navigator>

            {/* HOME */}
            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ headerShown: false }} 
            />

            {/* GOALS */}
            <Stack.Screen 
                name="cravings" 
                component={GoalsScreen} 
                options={{ title: 'Objectifs', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            />

            {/* POMODORO */}
            <Stack.Screen 
                name="pomodoro" 
                component={PomodoroScreen} 
                options={{ title: 'Pomodoro', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            /> 

            {/* MEDITATION */}
            <Stack.Screen 
                name="meditation" 
                component={MeditationScreen} 
                options={{ title: 'Zen', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            />  

            {/* IA */}
            <Stack.Screen 
                name="ia" 
                component={IASreen} 
                options={{ title: 'Motivations', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            /> 

            {/* AUTH */}
            <Stack.Screen 
                name="auth" 
                component={AuthScreen} 
                options={{ title: 'Auth', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            /> 

            {/* REWARDS */}
            <Stack.Screen 
                name="rewards" 
                component={RewardsScreen} 
                options={{ title: 'Récompenses', headerStyle: { backgroundColor:MODEL_COLORS.light } }}
            /> 
        </Stack.Navigator>
    )
}

export default Tabs