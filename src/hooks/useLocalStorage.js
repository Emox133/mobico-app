import {useState, useEffect} from 'react'

const PREFIX = 'mobico-app-'

const useLocalStorage = (key, initialValue) => {
    let prefixed_key = `${PREFIX}${key}`

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixed_key)
        
        if(jsonValue != null) return JSON.parse(jsonValue)
        if(typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixed_key, JSON.stringify(value))
    }, [prefixed_key, value])

    return [value, setValue]
}

export default useLocalStorage
