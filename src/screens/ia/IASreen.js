import React, { useEffect, useState, useContext } from 'react'
// REACT NATIVE 
import { View, Alert, StyleSheet } from 'react-native'
// REACT NATIVE PAPER 
import { Button, TextInput, Card  } from 'react-native-paper'
// FIREBASE 
import useFirebase from '../../firebase/useFirebase'
// CONTEXT 
import { AppContext } from '../../../App'
// MODELS 
import { MODEL_COLORS } from '../../models/modelColors'
// FORMULAIRE 
import useForm from '../../hooks/useForm'

// VALUES 
const INITIAL_STATE = {
    title:'',
}

const IASreen = () => {
    // USER 
    const { user } = useContext(AppContext) 
    // FIREBASE 
    const { _readMotivations, motivations, _writeData, _deleteData } = useFirebase()
    // FORMULAIRE 
    const { _handleChange, values } = useForm(INITIAL_STATE) 
    // CONST 
    const [showInput, setShowInput] = useState(false)

    // READ MOTIVATION 
    useEffect(() => {
        _readMotivations(user.uid)
    },[])

    // ADD MOTIVATION
    const _handleAddMotivation = () => {
        const data = {
            title:values.title
        }
        _writeData(`devperso/${user.uid}/motivations`, data)
        _handleShowInput()
        setTitle()
    }

    // DELETE MOTIVATION
    const _handleDeleteMotivation = (idMotivation) => {
        Alert.alert(
            "Supprimer la motivation",
            "",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Annulation pressée"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => _deleteData(`${user.uid}/motivations/${idMotivation}`) }
            ],
            { cancelable: false }
        )
        
    }

    // SHOW INPUT TEXT 
    const _handleShowInput = () => {
        setShowInput(!showInput)
    }

    return (
        <View>

            {showInput ? 

                <View>

                    {/* INPUT TITLE */}
                    <TextInput 
                        label='titre' 
                        value={values.title} 
                        textColor={MODEL_COLORS.main} 
                        style={styles.input}
                        onChangeText={(text) => _handleChange('title', text)}
                    />

                    {/* BUTTON SAVE CANCEL */}
                    <View style={styles.viewButton}>

                        <Button 
                            mode="contained" 
                            disabled={values.title ? false : true} 
                            buttonColor={MODEL_COLORS.main} 
                            onPress={_handleAddMotivation} 
                            style={{ margin:10 }}
                        >Enregistrer</Button>

                        <Button 
                            mode="contained" 
                            buttonColor={MODEL_COLORS.orange} 
                            onPress={_handleShowInput} 
                            style={{ margin:10 }}
                        >Annuler</Button>
                    </View>

                </View>

            :
                <Button mode="contained" buttonColor={MODEL_COLORS.main} onPress={_handleShowInput} style={{ margin:10 }}>Ajouter</Button>
            }

            {/* LIST MOTIVATION */}
            {motivations.map(motivation => (
                <Card key={motivation.id} style={{ marginTop:10 }} onPress={() => _handleDeleteMotivation(motivation.id)}>
                    <Card.Title title={motivation.title} />
                </Card>
            ))}

        </View>
    )
}

export default IASreen

// STYLE DESIGN 
const styles = StyleSheet.create({
    viewButton: {
        display:"flex", 
        flexDirection:"row", 
        justifyContent:"center",
    },
    input: {
        height: 40, 
        marginTop:20, 
        marginStart:20, 
        marginEnd:20 , 
        paddingStart:10,
        backgroundColor:MODEL_COLORS.ultraLight,
    },
})
