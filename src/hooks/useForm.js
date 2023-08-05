import { useState } from 'react'

const useForm = (initialState) => {
    const [values, setValues] = useState(initialState)

    const _handleChange = (name, value) => {
        setValues(prevValues => ({ 
            ...prevValues,
            [name]: value,
        }))
    }

    return {
        _handleChange,
        values,
        setValues,
    }
}

export default useForm
