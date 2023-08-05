import React, { useState, useEffect, useContext } from 'react'
// REACT NATIVE 
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
// REACT NATIVE PAPER 
import { Button, Portal, Modal, IconButton } from 'react-native-paper'
// CONTEXT 
import { AppContext } from '../../../App'
// DATE FNS 
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
// MODELS 
import { MODEL_COLORS } from '../../models/modelColors'
// FIREBASE 
import useFirebase from '../../firebase/useFirebase' 
// SOUND 
import alarm from '../../sound/alarme.wav'
import metronome from '../../sound/metronome.wav'
import { Audio } from 'expo-av'
// IMAGE 
import cebu5 from '../../../assets/image913.png'

// SOUND 
const soundAlarm = new Audio.Sound()
const soundMetronome = new Audio.Sound()

const PomodoroScreen = () => {
    // CONTEXT 
    const { user } = useContext(AppContext) 
    // FIREBASE 
    const { _readPomodoro, pomodoro } = useFirebase()
    // CONST 
    const [day, setDay] = useState()
    const [isFinish, setIsFinish] = useState(false)
    const [time, setTime] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [selectedTime, setSelectedTime] = useState(25 * 60)
    // MODAL 
    const [modalVisible, setModalVisible] = useState(false)
    let playCount = 0

    // AT BUILD PAGE
    useEffect(() => {
        let currentDate = format(new Date(), 'eeee d MMMM yyyy', { locale: fr })
        setDay(currentDate)
        _readPomodoro(user.uid)
        console.log("PomodoroScreen useEffect", user.uid)
    },[])

    // START TIMER => END TIMER
    useEffect(() => {
        let interval = null
        if (isActive) {
            interval = setInterval(() => { 
                setTime(time => {
                    if (time === 1) {
                        console.log("zen time end")
                        // le time est fini 
                        setIsFinish(true)
                        _startAlarm()
                        _stopMetronome()
                        clearInterval(interval)
                    }
                    return time - 1
                })
            }, 1000)
        // } else if (!isActive && time !== 0) {
        } else if (!isActive) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive])

    // CHOICE TIME DURATION 
    const handleTimeSelection = (minutes) => {
        setSelectedTime(minutes * 60) // Conversion en secondes
        setTime(minutes * 60) 
        setModalVisible(!modalVisible)
        _handleStartPomodoro()
        if (minutes === 25) {
            _startSound()
        }
    }

    // FORMAT TIME 
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time - minutes * 60

        return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
    }

    // ADD POMODORO FIREBASE
    const _handlePomodoro = () => {
        console.log("PomodoroScreen _handlePomodoro", )
        setModalVisible(true)
        // const data = {
        //     mydata:"michel"
        // }
        // _writeData(`devperso/${user.uid}/pomodoro`, data)
    } 
    
    // const _handleNewPomodoro = () => {
    //     const data = {
    //         date:day,
    //     }
    //     console.log('pomorodo ', day)
    //     _writeData(`devperso/${user.uid}/pomodoro`, data)
    // }

    // START SOUND => AND REPEAT SOUND
    const _startSound = async () => {
        setIsActive(true)
        try {
            // await soundObject.loadAsync(alarme)
            const status = await soundMetronome.getStatusAsync()
            if (status.isLoaded) {
                await soundMetronome.playAsync()
            } else {
                await soundMetronome.loadAsync(metronome)
                await soundMetronome.playAsync()
            }
            // This function will be called whenever the playback status changes
            soundMetronome.setOnPlaybackStatusUpdate(async (status) => {
            if (status.didJustFinish) {
                    playCount++
                    if (playCount < 50) {
                    await soundMetronome.stopAsync()
                    await soundMetronome.playAsync()
                } else {
                setIsActive(false)
                }
            }
            });
        
            // Start the first playback
            await soundMetronome.playAsync()
        } catch (error) {
            console.log("PomodoroScreen _handleSound ", error)
        }
    }
      
    // SUSPEND SOUND
    const _supendSound = async () => {
        try {
            await soundObject.pauseAsync(sound1)
        } catch (error) {
            console.log("PomodoroScreen _handleSound ",error)
        }
    }

    // START METRONOME
    const _handleStartPomodoro = () => {
        console.log('_handleStartPomodoro', selectedTime, time)
        setIsActive(true)
    }
    
    // STOP METRONOME
    const _stopMetronome = async () => {
        try {
            await soundMetronome.stopAsync(metronome)
        } catch (error) {
            console.log("PomodoroScreen _stopMetronome ",error)
        }
    }
    
    // START ALARM
    const _startAlarm = async () => {
        try {
            const status = await soundAlarm.getStatusAsync()
            if (status.isLoaded) {
                await soundAlarm.playAsync()
            } else {
                await soundAlarm.loadAsync(alarm)
                await soundAlarm.playAsync()
            }
        } catch (error) {
            console.log('pomorodo _startAlarme', error)
        }
    }
    
    // STOP ALARM 
    const _stopAlarm = async () => {
        setIsFinish(false)
        // await soundObject.loadAsync()
        try {
            await soundAlarm.stopAsync(alarm)
        } catch (error) {
            console.log("PomodoroScreen _stopAlarm ",error)
        }
    }

    // CLOSE MODAL => STOP SOUND
    const _closeModal = async () => {
        setIsFinish(false)
        setModalVisible(!modalVisible)
        try {
            await soundMetronome.stopAsync(metronome)
        } catch {}
        try {
            await soundAlarm.stopAsync(alarm)
        } catch {}
    }

    return (
        <View>

            <Text style={styles.date}>{day}</Text>

            {/* {pomodoro.filter(pomo => pomo.date === day).length > 0 ? null : 
                <Button mode='contained' style={{ marginStart:20, marginEnd:20 }} buttonColor={MODEL_COLORS.main} onPress={_handleNewPomodoro}>Nouvelle journée</Button>
            } */}

            {/* SHOW POMODORO */}
            {pomodoro.filter(pomo => pomo.date === day).map(pomo => (
                <View key={pomo.id} style={styles.viewBox}>
                    <TouchableOpacity /* key={startId + i} */ style={styles.box} onPress={() => _handlePomodoro(startId + i)} />
                </View>
            ))}

            <View style={{ height:50 }} />

            {/* BOX SELECTED TIME DURATION */}
            <View style={styles.viewBox}>
                <Button 
                    onPress={() => handleTimeSelection(25)} 
                    mode="contained" 
                    style={styles.boxAdd}
                    labelStyle={{ fontSize: 20, color: 'white' }}
                >25
                </Button>

                <Button 
                    onPress={() => handleTimeSelection(5)} 
                    mode="contained" 
                    style={styles.box5}
                    labelStyle={{ fontSize: 20, color: 'white' }}
                >5
                </Button>

                <Button 
                    onPress={() => handleTimeSelection(15)} 
                    mode="contained" 
                    style={styles.box15}
                    labelStyle={{ fontSize: 20, color: 'white' }}
                >15
                </Button>
            </View>

            {/* MODAL + TIMER + BACKGROUND IMAGE */}
            <Portal>
                <Modal visible={modalVisible} onDismiss={_closeModal} contentContainerStyle={[styles.modal, { justifyContent: "flex-start", padding: 0 }]}>
                    <ImageBackground source={cebu5} style={styles.backgroundImage}>
                        <View style={styles.overlay}>
                            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                <IconButton onPress={_closeModal} icon="close" size={30} iconColor="white" />
                            </View>
                            <Text style={styles.modalTime}>{formatTime(time)}</Text>
                            {isFinish && 
                                <View style={{ marginTop:20 }}>
                                    <Button mode="outlined" buttonColor='white' onPress={_stopAlarm}>Stop</Button>
                                </View> 
                            }
                        </View> 
                    </ImageBackground>
                </Modal>
            </Portal>
            
        </View>
    )
}

export default PomodoroScreen

// STYLES DESIGN 
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
    },
    boxAdd: {
        backgroundColor: MODEL_COLORS.purple,
        width: 75,
        height: 75,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",    // Align items along the vertical axis
        justifyContent: "center" // Align items along the horizontal axis
    },    
    box5: {
        backgroundColor:MODEL_COLORS.orange,
        width:75,
        height:75,
        borderRadius:10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",    // Align items along the vertical axis
        justifyContent: "center" // Align items along the horizontal axis
    },
    box15: {
        backgroundColor:MODEL_COLORS.main,
        width:75,
        height:75,
        borderRadius:10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",    // Align items along the vertical axis
        justifyContent: "center" // Align items along the horizontal axis
    },
    textButton: {
        color:"white",
        fontSize:30,
    }
})




