import React, { useState } from 'react'
import { ref, set, onValue, push, remove, update } from 'firebase/database'
import database from '../firebase/FirebaseConfig'

const useFirebase = () => {
    const [pomodoro, setPomodoro] = useState([]) 
    const [meditation, setMeditation] = useState([])
    const [motivations, setMotivations] = useState([])
    const [goals, setGoals] = useState([])
    const [rewards, setRewards] = useState([])

    // POMODORO
    const _readPomodoro = (user) => {
        setPomodoro([])
        const starCountRef = ref(database, `devperso/${user}/pomodoro`)
        try {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val()
                const dataList = []
                for (let id in data) {
                  dataList.push({id,...data[id]})
                }
                setPomodoro(dataList)
            })
        } catch {
            alert('il y a une erreur dans la lecture',)
        }
    }

    // MEDITATION
    const _readMeditation = (user) => {
        setMeditation([])
        const starCountRef = ref(database, `devperso/${user}/meditation`) 
        try {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val()
                const dataList = []
                for (let id in data) {
                  dataList.push({id,...data[id]})
                }
                setMeditation(dataList)
            })
        } catch {
            alert('il y a une erreur dans la lecture',)
        }
    }

    // MOTIVATIONS
    const _readMotivations = (user) => {
        setMotivations([])
        const starCountRef = ref(database, `devperso/${user}/motivations`) 
        try {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val()
                const dataList = []
                for (let id in data) {
                  dataList.push({id,...data[id]})
                }
                setMotivations(dataList)
            })
        } catch {
            alert('il y a une erreur dans la lecture',)
        }
    }

    // GOALS 
    const _readGoals = (user) => {
        setGoals([])
        const starCountRef = ref(database, `devperso/${user}/goals`) 
        try {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val()
                const dataList = []
                for (let id in data) {
                  dataList.push({id,...data[id]})
                }
                setGoals(dataList)
            })
        } catch {
            alert('il y a une erreur dans la lecture',)
        }
    }

    // REWARDS  
    const _readRewards = (user) => {
        setRewards([])
        const starCountRef = ref(database, `devperso/${user}/rewards`) 
        try {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val()
                const dataList = []
                for (let id in data) {
                  dataList.push({id,...data[id]})
                }
                setRewards(dataList)
            })
        } catch {
            alert('il y a une erreur dans la lecture',)
        }
    }

    // WRITE DATA 
    const _writeData = (id,data) => {
        try {
            const postListRef = ref(database, `${id}`)
            const newPostRef = push(postListRef)
            set(newPostRef, data)
        } catch (error) {
            console.log('Il y a une erreur dans l ecriture', error)
        }
    }

    // DELETE DATA 
    const _deleteData = (id) => {
        const todoRef = ref(database, 'devperso/' + id)
        remove(todoRef)  
    }

    // UPDATE DATA 
    const _updateData = (id,data) => {
        // console.log('userFirebase updateData ')
        const todoRef = ref(database, 'devperso/' + id)
        update(todoRef, data)
    }

    return {
        // POMODORO
        pomodoro,
        _readPomodoro,
        _writeData,
        _updateData,
        _deleteData,
        // MEDITATION
        _readMeditation,
        meditation,
        // MOTIVATIONS 
        _readMotivations,
        motivations,
        // GOALS 
        _readGoals,
        goals,
        // REWARDS 
        _readRewards,
        rewards,
    }
}

export default useFirebase