import React from 'react'
// REACT NATIVE 
import { StyleSheet, ImageBackground } from 'react-native'
// REACT NATIVE PAPER 
import { Button } from 'react-native-paper'
// MODELS 
import { MODEL_COLORS } from '../models/modelColors'
// IMAGES 
import home_fond from '../images/home_fond.jpeg'

const HomeScreen = ({ navigation }) => { 
    return (
        // background image
        <ImageBackground source={home_fond} style={styles.backgroundImage}>

                {/* BUTTON AND NAVIGATE  */}
                <Button mode="contained" buttonColor={MODEL_COLORS.orange} style={styles.button} onPress={() => navigation.navigate("cravings")}>Objectifs</Button>

                <Button mode="contained" buttonColor={MODEL_COLORS.orange} style={styles.button} onPress={() => navigation.navigate("pomodoro")}>Pomodoro</Button>

                <Button mode="contained" buttonColor={MODEL_COLORS.orange} style={styles.button} onPress={() => navigation.navigate("meditation")}>Zen</Button>

                <Button mode="contained" buttonColor={MODEL_COLORS.orange} style={styles.button} onPress={() => navigation.navigate("ia")}>Motivation</Button>

                <Button mode="contained" buttonColor={MODEL_COLORS.orange} style={styles.button} onPress={() => navigation.navigate("rewards")}>Récompenses</Button>

                <Button mode="contained" buttonColor={MODEL_COLORS.orange} style={styles.button} onPress={() => navigation.navigate("auth")}>Auth</Button>

        </ImageBackground>
    )
}

export default HomeScreen

// STYLE DESIGN 
const styles = StyleSheet.create({
    button:{
        marginStart:60,
        marginEnd:60,
        marginTop:30,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        display:"flex", flexDirection:'column', alignItems:"center"
    },
})
