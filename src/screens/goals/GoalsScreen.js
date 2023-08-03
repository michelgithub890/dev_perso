import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Alert, ScrollView } from 'react-native'
import { Button, TextInput, Card  } from 'react-native-paper'
import useFirebase from '../../hooks/useFirebase'
import { AppContext } from '../../../App'
import { MODEL_COLORS } from '../../models/modelColors'

const GoalsScreen = () => {
    const { user } = useContext(AppContext) 
    const { _readGoals, goals, _writeData, _deleteData } = useFirebase()
    const [title, setTitle] = useState('')
    const [showInput, setShowInput] = useState(false)

    useEffect(() => {
        _readGoals(user.uid)
    },[])

    const _handleAddGoal = () => {
        const data = {
            title:title
        }
        _writeData(`devperso/${user.uid}/goals`, data)
        _handleShowInput()
        setTitle()
    }

    const _handleDeleteGoal = (idGoal) => {
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

    const _handleShowInput = () => {
        setShowInput(!showInput)
    }

    return (
        <ScrollView>
            {showInput ? 
                <View>
                    <TextInput label='titre' value={title} textColor={MODEL_COLORS.main} onChangeText={setTitle} name='title' style={{ margin:10 }} />
                    <View style={{ display:"flex", flexDirection:"row", justifyContent:"center" }}>
                        <Button mode="contained" disabled={title ? false : true} buttonColor={MODEL_COLORS.main} onPress={_handleAddGoal} style={{ margin:10 }}>Enregistrer</Button>
                        <Button mode="contained" buttonColor={MODEL_COLORS.orange} onPress={_handleShowInput} style={{ margin:10 }}>Annuler</Button>
                    </View>
                </View>
            :
                <Button mode="contained" buttonColor={MODEL_COLORS.main} onPress={_handleShowInput} style={{ margin:10 }}>Ajouter</Button>
            }
            {goals.map(goal => (
                <Card key={goal.id} style={{ marginTop:10 }} onPress={() => _handleDeleteGoal(goal.id)}>
                    <Card.Title title={goal.title} />
                </Card>
            ))}

        </ScrollView>
    )
}

export default GoalsScreen

