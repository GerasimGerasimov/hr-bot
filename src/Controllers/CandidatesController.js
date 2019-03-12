export default class CandidatesController {
    constructor () {
    }

    //загрузка списка кандидатов
    //idList - список id кандидатов, по id надо всех кандидатов выгрести из базы
    //если будут ошибки то в выборку попадают те кто загрузился без ошибок
    static async getList(url, idList) {
        url+='/Candidates'
        console.log('CandidatesController.getList.url:',url)
        console.log('CandidatesController.getList:',idList)
        let header = {//Заголовок
            method: 'GET', //заменить на POST!!!
            //body: JSON.stringify({
            //        username,
            //        password
            //    }),
            //headers: new Headers({'Content-Type': 'application/json'}),
            //credentials:'same-origin'
        }
        try {
            let response = await fetch(url,header)
            let data = await response.json()
            console.log(data)
            return data
        } catch(error) {
            throw new Error(`AuthController.login: ${error}`)
        }
    }

    //добавление нового кандидата (это функция бота, но сделаю для теста)
    static async add () {

    }

    //получение данных конкретного кандидата
    static async get () {

    }    

    //изменение данных пользователя
    static async chahge () {

    }       
}