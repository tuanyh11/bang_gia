import {InitReducer, } from '../interface'
import Constants from './Constants'

const user = localStorage.getItem('user') ? localStorage.getItem('user') : localStorage.clear();

const initState: InitReducer = {
    user: user,
    users: [],
    products: []
} 

const reducer = (state: InitReducer, action: any) => {
    switch(action.type) {
        case Constants.SET_USERS: 
            return {
                ...state,
                user: action.payload
            }
        case Constants.LOGOUT: 
            return {
                ...state,
                user: action.payload
            }    
        default:
            return state
    }
    
}

export {initState}

export default reducer