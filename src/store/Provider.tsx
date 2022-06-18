import {useReducer} from 'react'
import Context from "./Context";
import  reducer ,{initState} from './Reducer'


interface Props {
    children: React.ReactNode
}



const Provider:React.FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider