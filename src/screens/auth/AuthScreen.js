import React, { useContext, useEffect } from 'react'
// REACT NATIVE 
import { View, StyleSheet } from 'react-native' 
// REACT NATIVE PAPER 
import { Button,TextInput } from 'react-native-paper'
// FIREBASE 
import useAuthFirebase from '../../firebase/useAuthFirebase'
// MODELS 
import { MODEL_COLORS } from '../../models/modelColors'
// CONTEXT 
import { AppContext } from '../../../App'
// FORMULAIRE 
import useForm from '../../hooks/useForm'

// VALUES 
const INITIAL_STATE = {
    email:'',
    password:'',
}

const AuthScreen = ({ navigation }) => {
    // USER 
    const { user } = useContext(AppContext) 
    // FIREBASE 
    const { _signIn, _signOut, myRedir } = useAuthFirebase()
    // FORMULAIRE 
    const { _handleChange, values } = useForm(INITIAL_STATE)

    // NAVIGATION HOME PAGE AFTER AUTHENTIFICATION
    useEffect(() => {
        if (myRedir === 'ok') {
            console.log('page auth admin ', myRedir)
            navigation.navigate('Home')
        } 
    },[myRedir])

    // SIGN IN 
    const _submitForm = () => {
        // Ici, vous pouvez gérer l'envoi du formulaire
        _signIn(values.email, values.password)
    }

    // LOG OUT 
    const _handleSignOut = () => {
        _signOut()
    }

    return (
        <View>

            {user.uid ? 

                // BUTTON LOG OUT 
                <Button 
                    mode='contained' 
                    buttonColor={MODEL_COLORS.orange} 
                    onPress={_handleSignOut} 
                    style={styles.buttonLogOut}
                >Se deconnecter</Button>
            
                : 
                <View>

                    {/* INPUT EMAIL */}
                    <TextInput
                        value={values.email}
                        onChangeText={(text) => _handleChange('email', text)}
                        placeholder="Email"
                        style={styles.input}
                    />

                    {/* INPUT PASSWORD */}
                    <TextInput
                        value={values.password}
                        onChangeText={(text) => _handleChange('password', text)}
                        placeholder="Password"
                        secureTextEntry
                        style={styles.input}
                    />
                    <View style={styles.button}>

                        {/* BUTTON CONNECT */}
                        <Button 
                            mode='contained' 
                            onPress={_submitForm} 
                            buttonColor={MODEL_COLORS.main}
                        >CONNEXION</Button>
                    
                    </View>
                </View>
            }
        </View>
    )
}

export default AuthScreen

// STYLES DESIGN
const styles = StyleSheet.create({
    button: {
        margin:20,
    },
    input: {
        height: 40, 
        marginTop:20, 
        marginStart:20, 
        marginEnd:20 , 
        paddingStart:10,
        backgroundColor:MODEL_COLORS.ultraLight,
    },
    buttonLogOut: {
        marginStart:20, 
        marginEnd:20, 
        marginTop:30
    },
})