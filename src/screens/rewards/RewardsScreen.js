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
    linkImage:'',
}

const RewardsScreen = () => {
    // USER
    const { user } = useContext(AppContext) 
    // FIREBASE 
    const { _readRewards, rewards, _writeData, _deleteData } = useFirebase()
    // FORMULAIRE 
    const { _handleChange, values } = useForm(INITIAL_STATE)
    // CONST 
    const [showInput, setShowInput] = useState(false)

    // GET REWARDS 
    useEffect(() => {
        _readRewards(user.uid)
    },[])

    // ADD REWARD 
    const _handleAddReward = () => {
        const data = {
            title:values.title,
            linkImage:values.linkImage
        }
        _writeData(`devperso/${user.uid}/rewards`, data)
        _handleShowInput()
    }

    // DELETE REWARDS 
    const _handleDeleteReward = (idReward) => {
        // ALERT CONFIRM / CANCEL 
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

    // SHOW / HIDE TEXT INPUT 
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

                    {/* INPUT LINK */}
                    <TextInput 
                        label='image' 
                        value={values.linkImage} 
                        textColor={MODEL_COLORS.main} 
                        onChangeText={(text) => _handleChange('linkImage', text)} 
                        style={styles.input} 
                    />

                    <View style={styles.viewButton}>

                        {/* BUTTON ADD */}
                        <Button 
                            mode="contained" 
                            disabled={values.title ? false : true} 
                            buttonColor={MODEL_COLORS.main} 
                            onPress={_handleAddReward} 
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
                // SHOW INPUT TEXT  
                <Button 
                    mode="contained" 
                    buttonColor={MODEL_COLORS.main} 
                    onPress={_handleShowInput} 
                    style={{ margin:10 }}
                >Ajouter</Button>
            }

            {/* LIST REWARDS */}
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
