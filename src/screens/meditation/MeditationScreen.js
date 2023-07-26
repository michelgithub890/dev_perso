import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    AppState,
} from 'react-native' 
import { Button } from 'react-native-paper'
import { AppContext } from '../../../App'
import useFirebase from '../../hooks/useFirebase'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MODEL_COLORS } from '../../models/modelColors'
import sound1 from '../../sound/sound1.wav'
import { Audio } from 'expo-av'

const soundObject = new Audio.Sound()

const MeditationScreen = () => {
    const { user } = useContext(AppContext) 
    const { _writeData, _deleteData, _updateData, _readPomodoro, _readMeditation, meditation } = useFirebase() 
    const [time, setTime] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [buttonsTimes, setButtonsTimes] = useState(true)
    const [buttonStart, setButtonStart] = useState(false)
    const [buttonBreak, setButtonBreak] = useState(false)
    const [buttonOff, setButtonOff] = useState(false)
    const [timeSelected, setTimeSelected] = useState()
    const [startTime, setStartTime] = useState(null)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [appState, setAppState] = useState(AppState.currentState)

    useEffect(() => {
        _readMeditation(user.uid) 
        let currentDate = format(new Date(), 'dd/MM/yyyy',)
        console.log("zen useeffect 1 ", currentDate)
        // Récupérer les valeurs stockées au lancement de l'application
        // (async () => {
        //     const storedStartTime = await AsyncStorage.getItem('meditationStartTime')
        //     const storedElapsedTime = await AsyncStorage.getItem('meditationElapsedTime')
    
        //     if (storedStartTime) setStartTime(Number(storedStartTime))
        //     if (storedElapsedTime) setElapsedTime(Number(storedElapsedTime))
        // })();
    },[])

    // useEffect(() => {
    //     // Récupérer les valeurs stockées au lancement de l'application
    //     (async () => {
    //         const storedStartTime = await AsyncStorage.getItem('meditationStartTime');
    //         const storedElapsedTime = await AsyncStorage.getItem('meditationElapsedTime');
        
    //         if (storedStartTime) setStartTime(Number(storedStartTime));
    //         if (storedElapsedTime) setElapsedTime(Number(storedElapsedTime));
    //     })()
    //   }, [])

    // useEffect(() => {
    //     AppState.addEventListener('change', _handleAppStateChange)
    
    //     return () => {
    //         AppState.removeEventListener('change', _handleAppStateChange)
    //     }
    //   }, [])
    
    //   const _handleAppStateChange = (nextAppState) => {
    //     if (appState.match(/inactive|background/) && nextAppState === 'active' && startTime) {
    //         const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
    //         setElapsedTime(elapsedTime + elapsedSeconds)
        
    //         // Enregistrer les valeurs dans le stockage local
    //         AsyncStorage.setItem('meditationStartTime', startTime.toString())
    //         AsyncStorage.setItem('meditationElapsedTime', (elapsedTime + elapsedSeconds).toString())
    //     }
    //     else if (nextAppState.match(/inactive|background/) && isActive) {
    //         setStartTime(Date.now())
    //     }
    //     setAppState(nextAppState)
    //   }

    // useEffect(() => {
    //     console.log("zen useeffect 2")
    //     AppState.addEventListener('change', _handleAppStateChange);
        
    //     return () => {
    //         // console.log("zen useeffect 3")
    //         AppState.removeEventListener('change', _handleAppStateChange);
    //     };
    // }, []);


    useEffect(() => {
        let interval = null
        if (isActive) {
            interval = setInterval(() => {
                setTime(time => {
                    if (time === 1) {
                        console.log("zen time end", )
                        let currentDate = format(new Date(), 'dd/MM/yyyy')
                        let data = {
                            date:{currentDate},
                            time:{timeSelected}
                        }
                        _writeData(`devperso/${user.uid}/meditation`, data)
                        setIsActive(false)
                    }
                    return time - 1
                })
            }, 1000)
        // } else if (!isActive && time !== 0) {
        } else if (!isActive) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive, time])

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

    // const _handleAppStateChange = (nextAppState) => {
    //     if (appState.match(/inactive|background/) && nextAppState === 'active' && startTime) {
    //         const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
    //         setElapsedTime(elapsedTime + elapsedSeconds)
        
    //         // Enregistrer les valeurs dans le stockage local
    //         AsyncStorage.setItem('meditationStartTime', startTime.toString())
    //         AsyncStorage.setItem('meditationElapsedTime', (elapsedTime + elapsedSeconds).toString())
    //     }
    //     else if (nextAppState.match(/inactive|background/) && isActive) {
    //         setStartTime(Date.now())
    //     }
    //         setAppState(nextAppState)
    // }

    // TEST  
    const _myTest = () => {
        _writeData(`devperso/${user.uid}/meditation`, {michel: "Juliet"});
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time - minutes * 60

        return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
    }

    const _handleTimeSelection = (minutes) => {
        // off buttons time selected
        setButtonsTimes(false)
        // on button start 
        setButtonStart(true)
        setTimeSelected(minutes)
        setTime(minutes * 60)
    }

    const _handleStart = () => { 
        // off button start  
        setButtonStart(false)
        // on button break  
        setButtonBreak(true)
        // off button off 
        setButtonOff(false)
        // setTime(selectedTime)
        setIsActive(true)
    }

    const _handleBreak = () => {
        // off button break 
        setButtonBreak(false)
        // on button continuer pause
        setButtonOff(true) 
        setIsActive(false)
    }

    const _handleStop = () => {
        // off button continuer pause  
        setButtonOff(false)
        // on button selected time 
        setButtonsTimes(true)
        setIsActive(false)
        setTime(null)
    }

    return (
        <View style={styles.container}>

            <Text>Current app state is: {appState}</Text>

            <Text style={styles.timer}>{formatTime(time)}</Text>

            {buttonsTimes &&
                <View style={styles.viewButton}>
                    <Button mode='outlined' style={styles.buttonTime} onPress={() => _handleTimeSelection(1)} textColor={MODEL_COLORS.main}>5</Button>
                    <Button mode='outlined' style={styles.buttonTime} onPress={() => _handleTimeSelection(10)} textColor={MODEL_COLORS.main}>10</Button>
                    <Button mode='outlined' style={styles.buttonTime} onPress={() => _handleTimeSelection(20)} textColor={MODEL_COLORS.main}>20</Button>
                </View>
            }

            {buttonStart && 
                <Button mode='contained' onPress={_handleStart} style={styles.buttonStart} buttonColor={MODEL_COLORS.main}>start</Button>
            }

            {buttonBreak && 
                <Button mode='outlined' onPress={_handleBreak} style={styles.buttonStart} textColor={MODEL_COLORS.main}>pause</Button>
            }

            {buttonOff && 
                <View style={styles.viewButton}>
                    <Button mode='outlined' onPress={_handleStart} textColor={MODEL_COLORS.main} style={styles.buttonTime}>continuer</Button>
                    <Button mode='outlined' onPress={_handleStop} textColor={MODEL_COLORS.main} style={styles.buttonTime}>arreter</Button>
                </View>
            }

            <Button icon="camera" mode="contained" onPress={_handleSound}></Button>

        </View>
    )
}

export default MeditationScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonTime: {
        marginStart:5,
        marginEnd:5,
    },
    timer: {
        textAlign: 'center',
        marginBottom:20,
        fontSize:80,
        color:MODEL_COLORS.main
    },
    buttonStart: {
        paddingStart:30,
        paddingEnd:30,
    }
})


