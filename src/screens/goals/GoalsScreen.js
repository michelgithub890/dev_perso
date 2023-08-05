import React, { useEffect, useState, useContext } from 'react'
// REACT NATIVE 
import { View, Alert, ScrollView, StyleSheet } from 'react-native'
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

const GoalsScreen = () => {
    // USER 
    const { user } = useContext(AppContext) 
    // FIREBASE
    const { _readGoals, goals, _writeData, _deleteData } = useFirebase()
    // FORMULAIRE 
    const { _handleChange, values } = useForm(INITIAL_STATE)
    // CONST 
    const [showInput, setShowInput] = useState(false)

    // READS GOALS FROM FIREBASE
    useEffect(() => {
        _readGoals(user.uid)
    },[])

    // ADD GOALS 
    const _handleAddGoal = () => {
        // DATA 
        const data = {
            title:values.title
        }
        // FIREBASE
        _writeData(`devperso/${user.uid}/goals`, data)
        // HIDE TEXT INPUT
        _handleShowInput()
    }


    // DELETE GOAL 
    const _handleDeleteGoal = (idGoal) => {
        // ALERT + CONFIRM / CANCEL
        Alert.alert(
            "Supprimer l'ojectif",
            "",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Annulation pressée"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => _deleteData(`${user.uid}/goals/${idGoal}`) }
            ],
            { cancelable: false }
        )
        
    }

    // SHOW HIDE TEXT INPUT 
    const _handleShowInput = () => {
        setShowInput(!showInput)
    }

    return (
        <ScrollView>

            {showInput ?

                <View>

                    {/* INPUT TITLE */}
                    <TextInput 
                        label='titre' 
                        value={values.title} 
                        textColor={MODEL_COLORS.main} 
                        onChangeText={(text) => _handleChange('title', text)} 
                        style={styles.input} 
                    />

                    <View style={{ display:"flex", flexDirection:"row", justifyContent:"center" }}>

                        {/* BUTTON ADD */}
                        <Button 
                            mode="contained" 
                            disabled={values.title ? false : true} 
                            buttonColor={MODEL_COLORS.main} 
                            onPress={_handleAddGoal} 
                            style={{ margin:10 }}
                        >Enregistrer</Button>

                        {/* BUTTON CANCEL */}
                        <Button 
                            mode="contained" 
                            buttonColor={MODEL_COLORS.orange} 
                            onPress={_handleShowInput} 
                            style={{ margin:10 }}
                        >Annuler</Button>

                    </View>

                </View>
            :
                //  BUTTON SHOW / HIDE INPUT  
                <Button 
                    mode="contained" 
                    buttonColor={MODEL_COLORS.main} 
                    onPress={_handleShowInput} 
                    style={{ margin:10 }}
                >Ajouter</Button>

            }

            {/* LIST GOALS */}
            {goals.map(goal => (
                <Card key={goal.id} style={{ marginTop:10 }} onPress={() => _handleDeleteGoal(goal.id)}>
                    <Card.Title title={goal.title} />
                </Card>
            ))}

        </ScrollView>
    )
}

export default GoalsScreen

// STYLES DESIGN 
const styles = StyleSheet.create({
    input: {
        height: 40, 
        marginTop:20, 
        marginStart:20, 
        marginEnd:20 , 
        paddingStart:10,
        backgroundColor:MODEL_COLORS.ultraLight,
    },
})


