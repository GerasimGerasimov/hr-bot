import {PropertyRequiredError, handledResponse} from "../classes/errors.js"

const validationAddGroupJSON = data => {
    console.log('AddGroup:data:',data)
    //if (!data.hasOwnProperty('data'))       throw new PropertyRequiredError('data')
    //if (!data.data.hasOwnProperty('token')) throw new PropertyRequiredError('token')
    return data//.data.token
}

export default class GroupsController {
    constructor() {

    }

    static async addGroup (url, username, token, group) {
        try {          
            console.log('addGroup')
            return await fetch (url, {
                    method: 'POST',
                    //mode:"cors",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Basic ${btoa(`${username}:${token}`)}` 
                    },
                    body: JSON.stringify(group)
            })
            .then (handledResponse)
            .then (validationAddGroupJSON)
        } catch (error) {
            console.log('addGroup:error',error)
            throw new Error(`addGroup.none Group added: ${error}`)
        }
    }
    static async saveGroup (url, username, token, group) {
        try {          
            console.log('saveGroup', group)
            return await fetch (url, {
                    method: 'PUT',
                    //mode:"cors",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Basic ${btoa(`${username}:${token}`)}` 
                    },
                    body: JSON.stringify(group)
            })
            .then (handledResponse)
            .then (validationAddGroupJSON)
        } catch (error) {
            console.log('addGroup:error',error)
            throw new Error(`addGroup.none Group added: ${error}`)
        }
    }    
}