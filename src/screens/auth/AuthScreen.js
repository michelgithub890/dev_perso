import React, { useState, useContext } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native' 
import { Button } from 'react-native-paper'
import useAuthFirebase from '../../firebase/useAuthFirebase'
import { MODEL_COLORS } from '../../models/modelColors'
import { AppContext } from '../../../App'

const AuthScreen = () => {
    const { user } = useContext(AppContext) 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { _signIn, _signOut } = useAuthFirebase()

    const _submitForm = () => {
        // Ici, vous pouvez gérer l'envoi du formulaire
        console.log(`Email: ${email}, Password: ${password}`)
        _signIn(email, password)
    }

    const _handleSignOut = () => {
        _signOut()
    }

    return (
        <View>
            {user.uid ? 
                <Button mode='contained' buttonColor={MODEL_COLORS.orange} onPress={_handleSignOut} style={{ marginStart:20, marginEnd:20, marginTop:30 }}>Se deconnecter</Button>
            : 
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
            }
        </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    button: {
        margin:20
    }
})