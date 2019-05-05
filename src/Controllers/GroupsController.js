import {PropertyRequiredError, handledResponse} from "../classes/errors.js"

const validationGetGroupJSON = data => {
    if (!data.hasOwnProperty('data'))       throw new PropertyRequiredError('data')
    console.log('GetGroup:data:',data)
    return data.data
}

const validationAddGroupJSON = data => {
    console.log('AddGroup:data:',data)
    return data
}

export default class GroupsController {
    constructor() {

    }

    static async get (url, username, token) {
        try {          
            console.log('getGroup')
            return await fetch (url, {
                    method: 'GET',
                    //mode:"cors",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Basic ${btoa(`${username}:${token}`)}` 
                    }
            })
            .then (handledResponse)
            .then (validationGetGroupJSON)
        } catch (error) {
            console.log('getGroup:error',error)
            throw new Error(`getGroup: Group info not read: ${error}`)
        }
    }    

    static async add (url, username, token, group) {
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
    
    static async put (url, username, token, changes) {
        try {          
            console.log('Save Group', changes)
            return await fetch (url, {
                    method: 'PUT',
                    //mode:"cors",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Basic ${btoa(`${username}:${token}`)}` 
                    },
                    body: JSON.stringify(changes)
            })
            .then (handledResponse)
            .then (validationAddGroupJSON)
        } catch (error) {
            console.log('addGroup:error',error)
            throw new Error(`saveGroup.Group data not changed: ${error}`)
        }
    }

    static async delete (url, username, token) {
        try {          
            console.log('deleteGroup', url)
            return await fetch (url, {
                    method: 'DELETE',
                    //mode:"cors",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Basic ${btoa(`${username}:${token}`)}` 
                    }
            })
            .then (handledResponse)
            //.then (validationAddGroupJSON)
        } catch (error) {
            console.log('deleteGroup:error',error)
            throw new Error(`deleteGroup.Group not deleted: ${error}`)
        }
    }     
}