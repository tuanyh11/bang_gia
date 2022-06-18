import Actions from "./Constants"
import api from "../axios"

export const setUser = (data: any) => ({
    type: Actions.SET_USERS,
    payload: data
})

export const logoutUser = (data: any) => ({
    type: Actions.LOGOUT,
    payload: data
})

