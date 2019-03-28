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

    /**
    *   POST http://localhost:5000/auth
    *   BODY: {"username":"test","password":"test"}
    * @param {*} url 
    * @param {*} username 
    * @param {*} password 
    * @description 
    * POST запрос возвращает:
    * SUCCESS:
        {
            "data": {
                "signature": "$pbkdf2-sha256$29000$cq7Vurd2bq2Vco5xrpWSEg$7jqKYez24totET6cOs3v5xnXKcirjOq9qQIzZhOwTwU"
            },
            "success": true
        }
        Значение signature является по сути токеном и его необходимо использовать
        при всех дальнейших запросах.
        FAILED:
        {
            "error": {
                "code": 401,
                "message": "Failed auth"
            },
            "success": false
        }
    */
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
    static async getGroups (url, username, token) {
        try {
            //let sBase64 = btoa(JSON.stringify({username, token}))
            //console.log(`sBase64: ${sBase64}`) //показать закодированную строку
            //console.log(`JSON string: ${atob(sBase64)}`) //раскодировать и показать
            
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
        /*
        try {
            let response = await fetch(url,header)
            switch (response.status) {
                case 400: throw new Error ('Bad request')
                case 401: throw new Error ('User unauthorised')                        
                case 404: throw new Error ('Url not found')
            }
            let data = await response.json()
            console.log(data)
            //if (typeof data['user'] === "undefined")            throw new Error('USER key is`t found');
            //if (data.user === 'User with such name not found')  throw new Error('User with such name not found');
            //if (data.user === 'Incorrect password')             throw new Error('Incorrect password');
            //Данные приняты. Если есть поле группы - загружаю группы
            //if (typeof data['Groups'] === "undefined") data.Groups=[]
            return data //.Groups
        } catch(error) {
            throw new Error(`AuthController.login: ${error}`)
        }
        */
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