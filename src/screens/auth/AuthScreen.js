import React, { useState } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native' 
import { Button } from 'react-native-paper'
import useAuthFirebase from '../../firebase/useAuthFirebase'
import { MODEL_COLORS } from '../../models/modelColors'

const AuthScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { _signIn } = useAuthFirebase()

    const _submitForm = () => {
        // Ici, vous pouvez gérer l'envoi du formulaire
        console.log(`Email: ${email}, Password: ${password}`)
        _signIn(email, password)
    }

    return (
        <View>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop:20, marginStart:20, marginEnd:20 , paddingStart:10 }}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin:20, paddingStart:10 }}
            />
            <View style={styles.button}>
                <Button mode='contained' onPress={_submitForm} buttonColor={MODEL_COLORS.main}>CONNEXION</Button>
            </View>
      </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    button: {
        margin:20
    }
})