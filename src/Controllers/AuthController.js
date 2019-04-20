import {PropertyRequiredError, handledResponse} from "../classes/errors.js"

/* AUTH */
const validationAuthJSON = data => {
    //console.log('getAuth:data:',data)
    if (!data.hasOwnProperty('data'))       throw new PropertyRequiredError('data')
    if (!data.data.hasOwnProperty('token')) throw new PropertyRequiredError('token')
    return data.data.token
}

/*GROUPS*/
const validationGroupsGetJSON = data => {
    //console.log('getGroups:data:',data)
    if (!data.hasOwnProperty('data'))        throw new PropertyRequiredError('data')
    if (!data.data.hasOwnProperty('Groups')) throw new PropertyRequiredError('Groups')
    return data.data.Groups
}

export default class AuthController {
    constructor() {
        //console.log('AuthController created');
    }

    //идентификация
    static async getAuth (url, username, password) {
        try {
            return await fetch(url,{
                method: "POST",
                //mode:"cors",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Basic ${btoa(`${username}:${password}`)}`                
                }
            })
            .then (handledResponse)
            .then (validationAuthJSON)
        } catch(error) {
            //console.log('getAuth:error',error)
            throw new Error(`getAuth.login: ${error}`)
        }        
    }

    //вход и получение данных о группах (компаниях пользователя)
    static async getUserGroups (url, username, token) {
        try {          
            return await fetch (url, {
                    method: 'GET',
                    //mode:"cors",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Basic ${btoa(`${username}:${token}`)}` 
                    }
            })
            .then (handledResponse)
            .then (validationGroupsGetJSON)
        } catch (error) {
            console.log('getGroups:error',error)
            throw new Error(`getGroups.no Data: ${error}`)
        }
    }

    //регистрация нового пользователя
    static async registration (text) {
        console.log('AuthController registration')
    }

    //изменение данных пользователя
    static async chahge() {
        return;
    }
}

/*
ДЛЯ ПРОВЕРКИ В БРАУЗЕРЕ

fetch('http://localhost:5000/auth',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                //mode: 'no-cors',
                //mode:"cors",
                //credentials:'same-origin',
                body: JSON.stringify({
                    username:'Gerasim',
                    password:'qwerty'
                })
            })
			.then (result => result.json())
			.then(result => {console.warn(result)})
			.catch(error => {console.error(error)})

*/