import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Alert } from 'react-native'
import { Button, TextInput, Card  } from 'react-native-paper'
import useFirebase from '../../hooks/useFirebase'
import { AppContext } from '../../../App'
import { MODEL_COLORS } from '../../models/modelColors'

const IASreen = () => {
    const { user } = useContext(AppContext) 
    const { _readMotivations, motivations, _writeData, _deleteData } = useFirebase()
    const [title, setTitle] = useState('')
    const [showInput, setShowInput] = useState(false)

    useEffect(() => {
        _readMotivations(user.uid)
    },[])

    const _handleAddMotivation = () => {
        const data = {
            title:title
        }
        _writeData(`devperso/${user.uid}/motivations`, data)
        _handleShowInput()
        setTitle()
    }

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

    const _handleShowInput = () => {
        setShowInput(!showInput)
    }

    return (
        <View>
            {showInput ? 
                <View>
                    <TextInput label='titre' value={title} textColor={MODEL_COLORS.main} onChangeText={setTitle} name='title' style={{ margin:10 }} />
                    <View style={{ display:"flex", flexDirection:"row", justifyContent:"center" }}>
                        <Button mode="contained" disabled={title ? false : true} buttonColor={MODEL_COLORS.main} onPress={_handleAddMotivation} style={{ margin:10 }}>Enregistrer</Button>
                        <Button mode="contained" buttonColor={MODEL_COLORS.orange} onPress={_handleShowInput} style={{ margin:10 }}>Annuler</Button>
                    </View>
                </View>
            :
                <Button mode="contained" buttonColor={MODEL_COLORS.main} onPress={_handleShowInput} style={{ margin:10 }}>Ajouter</Button>
            }
            {motivations.map(motivation => (
                <Card key={motivation.id} style={{ marginTop:10 }} onPress={() => _handleDeleteMotivation(motivation.id)}>
                    <Card.Title title={motivation.title} />
                </Card>
            ))}

        </View>
    )
}

export default IASreen

