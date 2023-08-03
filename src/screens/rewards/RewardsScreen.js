import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Alert, ScrollView } from 'react-native'
import { Button, TextInput, Card  } from 'react-native-paper'
import useFirebase from '../../hooks/useFirebase'
import { AppContext } from '../../../App'
import { MODEL_COLORS } from '../../models/modelColors'

const RewardsScreen = () => {
    const { user } = useContext(AppContext) 
    const { _readRewards, rewards, _writeData, _deleteData } = useFirebase()
    const [title, setTitle] = useState('')
    const [linkImage, setLinkImage] = useState('')
    const [showInput, setShowInput] = useState(false)

    useEffect(() => {
        _readRewards(user.uid)
    },[])

    const _handleAddReward = () => {
        const data = {
            title:title,
            linkImage:linkImage
        }
        _writeData(`devperso/${user.uid}/rewards`, data)
        _handleShowInput()
        setTitle()
    }

    const _handleDeleteReward = (idReward) => {
        Alert.alert(
            "Supprimer la Récompense",
            "",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Annulation pressée"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => _deleteData(`${user.uid}/rewards/${idReward}`) }
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
                    <TextInput label='image' value={linkImage} textColor={MODEL_COLORS.main} onChangeText={setLinkImage} name='title' style={{ margin:10 }} />
                    <View style={{ display:"flex", flexDirection:"row", justifyContent:"center" }}>
                        <Button mode="contained" disabled={title ? false : true} buttonColor={MODEL_COLORS.main} onPress={_handleAddReward} style={{ margin:10 }}>Enregistrer</Button>
                        <Button mode="contained" buttonColor={MODEL_COLORS.orange} onPress={_handleShowInput} style={{ margin:10 }}>Annuler</Button>
                    </View>
                </View>
            :
                <Button mode="contained" buttonColor={MODEL_COLORS.main} onPress={_handleShowInput} style={{ margin:10 }}>Ajouter</Button>
            }
            {rewards.map(reward => (
                <Card key={reward.id} style={{ marginTop:10, marginStart:10, marginEnd:10 }} onPress={() => _handleDeleteReward(reward.id)}>
                    <Card.Title title={reward.title} />
                    <Card.Cover source={{ uri: reward.linkImage }} />
                </Card>
            ))}

        </ScrollView>
    )
}

export default RewardsScreen

