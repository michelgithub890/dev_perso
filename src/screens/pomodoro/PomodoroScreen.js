import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { Button, Portal, Modal, IconButton } from 'react-native-paper'
import { AppContext } from '../../../App'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { MODEL_COLORS } from '../../models/modelColors'
import useFirebase from '../../hooks/useFirebase' 
import sound1 from '../../sound/sound1.wav'
import { Audio } from 'expo-av'
import cebu5 from '../../../assets/image913.png'

const soundObject = new Audio.Sound()


// var ding = new Sound('ding.mp3', Sound.MAIN_BUNDLE, (error) => {
//     if (error) {
//       console.log('failed to load the sound', error)
//       return
//     }
//     // when loaded successfully
//     console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels())
// })

// Sound.setCategory('Playback')

const Line = ({ startId }) => (
    <View style={styles.viewBox}>
        {[0, 1, 2, 3].map(i => (
            <TouchableOpacity key={startId + i} style={styles.box} onPress={() => _handlePomodoro(startId + i)} />
        ))}
    </View>
)

const PomodoroScreen = () => {
    const { user } = useContext(AppContext) 
    const [day, setDay] = useState()
    const [lines, setLines] = useState([0])
    const [listPomorodo, setListPomodoro] = useState(0)
    const [time, setTime] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [selectedTime, setSelectedTime] = useState(25 * 60)
    const { _writeData, _deleteData, _updateData, _readPomodoro } = useFirebase()
    // MODAL 
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        let currentDate = format(new Date(), 'eeee d MMMM yyyy', { locale: fr })
        setDay(currentDate)
        if (user.uid) _readPomodoro(user.uid)
        console.log("PomodoroScreen useEffect", user.uid)
    },[])

    useEffect(() => {
        let interval = null
        if (isActive) {
            interval = setInterval(() => {
                setTime(time => {
                    if (time === 1) {
                        // Jouer le son lorsque le chronomètre atteint zéro
                        alarmSound.play((success) => {
                            if (!success) {
                                console.log('Sound did not play')
                            }
                        });
                    }
                    return time - 1
                })
            }, 1000)
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval)
    }, [isActive, time])

    const handleStart = () => {
        setTime(selectedTime)
        setIsActive(true)
    }

    const handleTimeSelection = (minutes) => {
        setSelectedTime(minutes * 60) // Conversion en secondes
        setTime(minutes * 60)
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time - minutes * 60

        return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
    }

    const _handlePomodoro = (id) => {
        console.log("PomodoroScreen _handlePomodoro", user.uid, id)
        setModalVisible(true)
        // const data = {
        //     mydata:"michel"
        // }
        // _writeData(`devperso/${user.uid}/pomodoro`, data)
    }  

    const addLine = () => {
        console.log("pomodoro ", )
        setLines([...lines, lines.length * 4]); // adds a new line starting with next id
    }

    const _handleSound = async () => {
        console.log("PomodoroScreen _handleSound ")
        try {
            // await soundObject.loadAsync(require('./path/to/your/sound/file'))
            await soundObject.loadAsync(sound1)
            await soundObject.playAsync()
            // Votre son est en train de jouer !
          
            // Pour pauser le son :
            // await soundObject.pauseAsync();
          } catch (error) {
            // Une erreur s'est produite
          }
    }

    const _startPomorodo = () => {
        console.log("PomodoroScreen _startPomorodo")
    }

    return (
        <View>

            <Text style={styles.date}>{day}</Text>
            
            {/* {lines.map((startId, index) => <Line key={index} startId={startId} />)} */}

            {lines.map((startId, index) => (
                <View style={styles.viewBox} key={index}>
                    {[0, 1, 2, 3].map(i => (
                        <TouchableOpacity key={startId + i} style={styles.box} onPress={() => _handlePomodoro(startId + i)} />
                    ))}
                </View>
            ))}

            <Button onPress={addLine} mode="contained" style={{ margin:10 }} buttonColor='red'>Ajouter une ligne</Button>

            <Button onPress={_handleSound} mode="contained" style={{ margin:10 }}>handle sound</Button>

            <View>
                <Text>{formatTime(time)}</Text>
                <Button onPress={handleStart}>Démarrer</Button>
                <Button onPress={() => handleTimeSelection(25)} mode="contained" style={{ margin:10 }}>25 minutes</Button>
                <Button onPress={() => handleTimeSelection(15)} mode="contained" style={{ margin:10 }}>15 minutes</Button>
                <Button onPress={() => handleTimeSelection(5)} mode="contained" style={{ margin:10 }}>5 minutes</Button>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text>Afficher le modal</Text>
            </TouchableOpacity>

            <Text>4 pomodoro</Text>
            <Text>pauses 5 et 15 pomodoro</Text>
            <Text>delete - suspendre - reprendre ...</Text>

            <Portal>
                <Modal visible={modalVisible} onDismiss={() => setModalVisible(!modalVisible)} contentContainerStyle={[styles.modal, { justifyContent: "flex-start", padding: 0 }]}>
                    <ImageBackground source={cebu5} style={styles.backgroundImage}>
                        <View style={styles.overlay}>
                            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                <IconButton onPress={() => setModalVisible(!modalVisible)} icon="close" size={30} iconColor="white" />
                            </View>
                            <Text style={styles.modalTime}>{formatTime(time)}</Text>
                            <View style={{ marginTop:20 }}>
                                <Button mode="outlined" buttonColor='white'>Start</Button>
                            </View>
                        </View> 
                    </ImageBackground>
                </Modal>
            </Portal>
            
        </View>
    )
}

export default PomodoroScreen

const styles = StyleSheet.create({
    date:{
        textAlign:"center",
        fontSize:20,
        marginTop:20,
        marginBottom:20,
    }, 
    viewBox:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        marginStart:10,
        marginEnd:10,
        marginBottom:10,
    },
    box:{
        width:75,
        height:75,
        backgroundColor:MODEL_COLORS.green,
        borderRadius:10,
    },
    modal:{
        flex:1,
        width: '100%', // ajout pour prendre toute la largeur
        height: '100%', // ajout pour prendre toute la hauteur
    },
    backgroundImage:{
        flex:1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // ce style créera l'effet d'assombrissement
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalTime:{
        fontSize:60,
        color:"white"
    }
})




