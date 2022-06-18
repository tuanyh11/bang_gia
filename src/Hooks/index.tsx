import {useContext} from 'react'
import {Context } from '../store'


const useStore = () => {
    const [state, dispatch] = useContext(Context)
    return [state, dispatch]
}


export {
    useStore, 
}
