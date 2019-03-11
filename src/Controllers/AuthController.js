export default class AuthController {
    constructor() {
        console.log('AuthController created');
    }

    //вход и получение данных о группах (компаниях пользователя)
    static async getGroups (url, username, password) {
        let header = {//Заголовок
                method: 'PATCH', //заменить на POST!!!
                body: JSON.stringify({
                        username,
                        password
                    }),
                headers: new Headers({'Content-Type': 'application/json'}),
                credentials:'same-origin'
            }
        try {
            let response = await fetch(url,header)
            switch (response.status) {
                case 400: throw new Error ('Bad request')
                case 401: throw new Error ('User unauthorised')                        
                case 404: throw new Error ('Url not found')
            }
            let data = await response.json()
            console.log(data)
            if (typeof data['user'] === "undefined")            throw new Error('USER key is`t found');
            //if (data.user === 'User with such name not found')  throw new Error('User with such name not found');
            //if (data.user === 'Incorrect password')             throw new Error('Incorrect password');
            //Данные приняты. Если есть поле группы - загружаю группы
            if (typeof data['Groups'] === "undefined") data.Groups=[]
            return data.Groups
        } catch(error) {
            throw new Error(`AuthController.login: ${error}`)
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
