export default class AuthController {
    constructor() {
        console.log('AuthController created');
    }
    //вход с идентификацией
    /*
    async login (url, username, email, password) {
        console.log(`AuthController.login: ${url}`)
        let header = {//Заголовок
                method: 'PATCH', //заменить на POST!!!
                body: JSON.stringify(
                    {
                        username,
                        email,
                        password
                    }
                ),
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                credentials:'same-origin'
            }
        try {
            let response = await fetch(url,header)
            let data = await response.json()
            if (typeof data['user'] === "undefined")            throw new Error('USER key is`t found');
            if (data.user === 'User with such name not found')  throw new Error('User with such name not found');
            if (data.user === 'Incorrect password')             throw new Error('Incorrect password');
            //Данные приняты. Если есть поле группы - загружаю группы
            if (typeof data['Groups'] == "undefined")
                data.Groups=[]
            console.log("data.groups:",data.Groups)
            return data.Groups
        } catch(e) {
            throw new Error(`AuthController.login: ${e}`)
        }
    }
    */
    //регистрация нового пользователя
    static async registration (text) {
        console.log('AuthController registration')
        //let a = await 42;
        //console.log('AuthController registration', a);
        //return a;
        
        // Создаётся объект promise
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // переведёт промис в состояние fulfilled с результатом "result"
                console.log('resolve:',text)
                resolve("result");
            }, 1000);
  
        });
        
        
    }

    //изменение данных пользователя
    /*
    async chahge() {
        return;
    }
    */
}
