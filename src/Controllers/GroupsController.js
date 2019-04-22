import {PropertyRequiredError, handledResponse} from "../classes/errors.js"

const validationAddGroupJSON = data => {
    console.log('AddGroup:data:',data)
    return data
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
    static async saveGroup (url, username, token, changes) {
        try {          
            console.log('saveGroup', changes)
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
    static async deleteGroup (url, username, token) {
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