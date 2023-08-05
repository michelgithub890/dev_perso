import React, { useContext, useEffect, useState } from 'react'
// REACT NATIVE 
import { View, Text, StyleSheet } from 'react-native' 
// REACT NATIVE PAPER 
import { Button, IconButton, Modal, Portal } from 'react-native-paper'
// CONTEXT 
import { AppContext } from '../../../App'
// FIREBASE
import useFirebase from '../../firebase/useFirebase'
// DATE FNS 
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
// MODELS 
import { MODEL_COLORS } from '../../models/modelColors'
// SOUND 
import sound1 from '../../sound/sound1.wav'
import { Audio } from 'expo-av'

// SOUND 
const soundObject = new Audio.Sound()

const MeditationScreen = () => {
    // USER 
    const { user } = useContext(AppContext) 
    // FIREBASE
    const { _writeData, _readMeditation, meditation } = useFirebase() 
    // CONST 
    const [time, setTime] = useState(null)
    const [currentDate, setCurrentDate] = useState()
    const [isActive, setIsActive] = useState(false)
    const [buttonsTimes, setButtonsTimes] = useState(true)
    const [buttonStart, setButtonStart] = useState(false)
    const [buttonBreak, setButtonBreak] = useState(false)
    const [buttonOff, setButtonOff] = useState(false)
    const [buttonSound, setButtonSound] = useState(false)
    const [timeSelected, setTimeSelected] = useState()
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true)
    const hideModal = () => setVisible(false)

    // READ FIREBASE + CURRENT DATE
    useEffect(() => {
        _readMeditation(user.uid) 
        let date = format(new Date(), 'dd/MM/yyyy')
        setCurrentDate(date)
    },[])

    // START AND STOP TIMER 
    useEffect(() => {
        let interval = null
        if (isActive) {
            interval = setInterval(() => {
                setTime(time => {
                    if (time === 1) {
                        console.log("zen time end", timeSelected)
                        setButtonSound(true)
                        setButtonBreak(false)
                        _handleSound()
                        _handlesetTimeout()
                        let currentDate = format(new Date(), 'dd/MM/yyyy')
                        let data = {
                            date:currentDate,
                            time:timeSelected
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

    // START SOUND 
    const _handleSound = async () => {
        try {
            // await soundObject.loadAsync(require('./path/to/your/sound/file'))
            await soundObject.loadAsync(sound1)
            await soundObject.playAsync()
            console.log("PomodoroScreen _handleSound ")
            // Votre son est en train de jouer !
          
            // Pour pauser le son :
            // await soundObject.pauseAsync();
        } catch (error) {
            console.log("PomodoroScreen _handleSound ",error)
            // Une erreur s'est produite
        }
    }

    // STOP SOUND 
    const _stopSound = async () => {
        try {
            await soundObject.stopAsync()
            await soundObject.unloadAsync()
        } catch (error) {
            // An error occurred
        }
        setButtonSound(false)
        setButtonsTimes(true)
    }

    // FIREBASE WRITE   
    const _myTest = () => {
        _writeData(`devperso/${user.uid}/meditation`, {michel: "Juliet"})
    }

    // FORMAT DATE 
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time - minutes * 60

        return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
    }

    // CHOICE TIME DURATION 
    const _handleTimeSelection = (minutes) => {
        console.log('_handleTimeSelection ', minutes)
        // off buttons time selected
        setButtonsTimes(false)
        // on button start 
        setButtonStart(true)
        setTimeSelected(minutes)
        setTime(minutes * 60)
    }

    // START MEDITATION
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

    // BREAK MEDITATION
    const _handleBreak = () => {
        // off button break 
        setButtonBreak(false)
        // on button continuer pause
        setButtonOff(true) 
        setIsActive(false)
    }

    // STOP MEDITATION 
    const _handleStop = () => {
        // off button continuer pause  
        setButtonOff(false)
        // on button selected time 
        setButtonsTimes(true)
        setIsActive(false)
        setTime(null)
    }

    // TIME OUT 
    const _handlesetTimeout = () => {
        setTimeout(() => {
            _stopSound()
        }, 10000) // Le temps est en millisecondes, donc 10000 millisecondes équivalent à 10 secondes.
        
    }

    // HISTORY MEDIATION => NOT FINISH
    const _historyMeditation = () => {

        let array = []

        // let dataByDay = meditation?.reduce((acc, obj) => {
        //     const date = obj.date.split('/').reverse().join('-')
        //     if (!acc[date]) acc[date] = []
        //     acc[date].push(obj.time)
        //     return acc
        // })

        const result = meditation?.reduce((accumulator, currentValue) => {
            // Si la clé date n'existe pas encore dans l'accumulateur, ajoutez-la avec la valeur de time.
            console.log("zen history current date ", currentDate, accumulator, "=>" ,currentValue.date)
            if (!accumulator[currentValue.date]) {
                console.log("zen history current date if", currentDate, accumulator, "=>" ,currentValue.date)
                accumulator[currentValue.date] = currentValue.time
            }
            // Sinon, ajoutez la valeur de time à la clé date existante.
            else {
                accumulator[currentValue.date] += currentValue.time
            }
        
            // Renvoyez l'accumulateur pour le prochain tour de boucle.
            return accumulator
        }, {})
        
        console.log(result)
        

        console.log("zen _historyMeditation ", )
        
        // function getSumOfLastDays(arr, days) {
        //     const cutOff = new Date();
        //     cutOff.setDate(cutOff.getDate() - days);
          
        //     // Organisez les données par jour
        //     const dataByDay = arr.reduce((acc, obj) => {
        //         const date = obj.date.split('/').reverse().join('-');
        //         if (!acc[date]) acc[date] = [];
        //         acc[date].push(obj.time);
        //         return acc;
        //     }, {});
            
        //     // Calculez la somme des temps pour chaque jour
        //     const sumsByDay = Object.entries(dataByDay)
        //         .filter(([date,]) => new Date(date) >= cutOff)
        //         .reduce((acc, [date, times]) => {
        //             acc[date] = times.reduce((acc, time) => acc + time, 0);
        //             return acc;
        //         }, {});
            
        //     return sumsByDay;
        // }
        
        // const sumLast10Days = getSumOfLastDays(meditation, 10);
        // console.log(sumLast10Days);
        
    }

    // TEST
    const _testMethode = () => {
            const dataArray = [
                {date:'23/07/2023', time:10},
                {date:'22/07/2023', time:10},
                {date:'22/07/2023', time:5},
                {date:'21/07/2023', time:5},
                // more data here
            ];
        
            function formatDate(dateString) {
                const [month, day, year] = dateString.split('/')
                return `${year}-${month}-${day}`
            }
        
            function getSumOfLastDays(arr, days) {
                const cutOff = new Date()
                cutOff.setDate(cutOff.getDate() - days)

        
                const dataByDay = arr.reduce((acc, obj) => {
                    const date = formatDate(obj.date)
                    // const date = obj.date
                    // console.log('cutOff', acc[date])
                    if (!acc[date]) acc[date] = []
                    acc[date].push(obj.time)
                    return acc
                }, {})
        
                const sumsByDay = Object.entries(dataByDay)
                .filter(([date,]) => new Date(date).setHours(0,0,0,0) >= cutOff.setHours(0,0,0,0))
                .map(([date, times]) => {
                    const sumTime = times.reduce((acc, time) => acc + time, 0)
                    return {
                        date,
                        time: Math.floor(sumTime)
                    }
                })
        
                return sumsByDay
            }
        
            const sumLast10Days = getSumOfLastDays(meditation, 10)
            console.log("sum as 10 days",sumLast10Days)

            return sumLast10Days
        
    }

    return (
        <View style={styles.container}>

            {/* CURRENT DATE */}
            <Text style={styles.timer}>{formatTime(time)}</Text>

            {/* BUTTON CHOICE DURATION */}
            {buttonsTimes &&
                <View style={styles.viewButton}>
                    <Button mode='outlined' style={styles.buttonTime} onPress={() => _handleTimeSelection(5)} textColor={MODEL_COLORS.main}>5</Button>
                    <Button mode='outlined' style={styles.buttonTime} onPress={() => _handleTimeSelection(10)} textColor={MODEL_COLORS.main}>10</Button>
                    <Button mode='outlined' style={styles.buttonTime} onPress={() => _handleTimeSelection(20)} textColor={MODEL_COLORS.main}>20</Button>
                </View>
            }

            {/* BUTTON START */}
            {buttonStart && 
                <Button mode='contained' onPress={_handleStart} style={styles.buttonStart} buttonColor={MODEL_COLORS.main}>start</Button>
            }

            {/* BUTTON BREAK */}
            {buttonBreak && 
                <Button mode='outlined' onPress={_handleBreak} style={styles.buttonStart} textColor={MODEL_COLORS.main}>pause</Button>
            }

            {/* BUTTON START END */}
            {buttonOff && 
                <View style={styles.viewButton}>
                    <Button mode='outlined' onPress={_handleStart} textColor={MODEL_COLORS.main} style={styles.buttonTime}>continuer</Button>
                    <Button mode='outlined' onPress={_handleStop} textColor={MODEL_COLORS.main} style={styles.buttonTime}>arreter</Button>
                </View>
            }

            {/* BUTTON STOP */}
            {buttonSound && 
                <Button mode='contained' onPress={_stopSound} style={styles.buttonStart} buttonColor={MODEL_COLORS.main}>stop</Button>
            }

            <IconButton size={40} icon="history" iconColor={MODEL_COLORS.main} onPress={showModal} style={styles.element}/>

            {/* MODAL TIMER + BACKGROUND IMAGE */}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <Text>This is a modal</Text>
                    <Button mode="contained" onPress={_testMethode}>press me</Button>
                    {_testMethode().map((history,i) => (
                        <View key={i}>
                            <Text>{history.date} : {history.time}</Text>
                        </View>
                    ))}
                    <IconButton size={40} icon="close" iconColor={MODEL_COLORS.main} onPress={hideModal} style={styles.close}/>
                </Modal>
            </Portal>
           
        </View>
    )
}

export default MeditationScreen

// STYLE DESIGN 
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
    },
    element: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight:20,
        marginBottom:20,
    },
    modal: {
        backgroundColor: 'white', 
        height:"100%",
        width:"100%",
    },
    close: {
        position: 'absolute',
        right: 0,
        top: 0,
    }
})


