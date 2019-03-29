import xhrRequest from "../utils/xhrRequest"

class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError"
    }
}
  
class PropertyRequiredError extends ValidationError {
    constructor(property) {
      super(`No property: ${property}`)
      this.name = "PropertyRequiredError"
      this.property = property
    }
}

/* AUTH */
class AuthFetchError extends Error {
    constructor(message, code) {
      super(`FetchError: ${code} ${message}`);
      this.name = "AuthFetchError"
      this.code = code
    }
}

const handledAuthResponse = response => {
    //console.log('getAuth:response:',response)
    switch (response.status) {
        case 400: throw new AuthFetchError ('Bad request'   , response.status)
        case 404: throw new AuthFetchError ('Url not found' , response.status)        
        case 401: throw new AuthFetchError (response.message, response.status)                        
    }
    return response.json()
}

const validationAuthJSON = data => {
    console.log('getAuth:data:',data)
    if (!data.hasOwnProperty('data'))           throw new PropertyRequiredError('data')
    if (!data.data.hasOwnProperty('token')) throw new PropertyRequiredError('token')
    return data.data.token
}

/*GROUPS*/
class GroupsGetFetchError extends Error {
    constructor(message, code) {
      super(`FetchError: ${code} ${message}`);
      this.name = "GroupsGetFetchError"
      this.code = code
    }
}

const handledGroupsGetResponse = response => {
    console.log('getGroups:response:',response)
    switch (response.status) {
        case 400: throw new GroupsGetFetchError ('Bad request'   , response.status)
        case 404: throw new GroupsGetFetchError ('Url not found' , response.status)        
        case 401: throw new GroupsGetFetchError (response.message, response.status)                        
    }
    return response.json()
}

const validationGroupsGetJSON = data => {
    console.log('getGroups:data:',data)
    if (!data.hasOwnProperty('data'))        throw new PropertyRequiredError('data')
    if (!data.data.hasOwnProperty('groups')) throw new PropertyRequiredError('groups')
    return data.data.groups
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
            .then (handledAuthResponse)
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
            .then (handledGroupsGetResponse)
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