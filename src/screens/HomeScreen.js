import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>PAGE HOME SCREEN</Text>
            <View style={styles.button}>
                <Button 
                    style={styles.button}
                    title="Envies" 
                    onPress={() => navigation.navigate("cravings")}
                />
            </View>
            <View style={styles.button}>
                <Button 
                    title="Pomodoro" 
                    onPress={() => navigation.navigate("pomodoro")}
                />
            </View>
            <View style={styles.button}>
                <Button 
                    title="Zen" 
                    onPress={() => navigation.navigate("meditation")}
                />
            </View>
            <View style={styles.button}>
                <Button 
                    title="IA" 
                    onPress={() => navigation.navigate("ia")}
                />
            </View>
            <View style={styles.button}>
                <Button 
                    title="Auth" 
                    onPress={() => navigation.navigate("auth")}
                />
            </View>
            <View style={styles.button}>
                <Button 
                    title="Récompenses" 
                    onPress={() => navigation.navigate("rewards")}
                />
            </View>
            <View style={styles.button}>
                <Button 
                    title="Auth" 
                    onPress={() => navigation.navigate("auth")}
                />
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    button:{
        margin:10
    }
})
