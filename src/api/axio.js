import axios from "axios";

export default axios.create({
    baseURL: 'http://192.168.0.116:4000',
})


export const axiosPrivate = axios.create({
    baseURL: 'http://192.168.0.116:4000',
    headers: {'content-type':'application/json'},
    withCredentials: true
})