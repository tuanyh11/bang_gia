import axios from "axios";
import jwtDecode from "jwt-decode";

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});


api.interceptors.request.use( (config: any) => {
    const token = JSON.parse(localStorage.getItem('user') as string)?.token
    const currentDate = new Date()
    if( token && jwtDecode<any>(token)?.exp * 1000 < currentDate.getTime()) {
        localStorage.clear()
        return config
    }
    config.headers.authorization =  token ? `Bearer ${token}` : ''
    return config
})

export default api

