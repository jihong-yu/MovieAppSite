import axios from 'axios';
import {LOGIN_USER,REGISTER_USER,AUTH_USER} from './type.js';
export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login',dataToSubmit)
    .then(response => response.data) //백엔드에서 데이터를 request에 반환

    return {
        type:LOGIN_USER,payload:request
    }

}

export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register',dataToSubmit)
    .then(response => response.data) //백엔드에서 데이터를 request에 반환

    return {
        type:REGISTER_USER,payload:request
    }
}

export function auth(){
    const request = axios.get(`/api/users/auth`)
    .then(response => response.data) //백엔드에서 데이터를 request에 반환

    return {
        type:AUTH_USER,payload:request
    }
}