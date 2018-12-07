import Vue from 'vue'
import Vuex from 'vuex'
//import Urls from './urls.js'
var URLs = require('./urls.js');

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pages: "login", //login, groups, group
        //имя и пароль пользователя
        user:"Gerasim",
        email:"dialix@yandex.ru",
        password:"qwerty",
        wrongLogin: false,//неправильный логин пароль
        loggedIn: false,//пользователь в системе
        //
        loading:false,//индикатор загрузки
        //
        groups: [] //группы
    },
    mutations: {
      updatePages(state, page){
        state.pages = page;
      },
      touggleWrongLogin(state){
        state.wrongLogin =!state.wrongLogin;
      },
      updateEmail(state, value){
        state.email = value;
        console.log("updateEmail",value)
      },
      updatePassword(state, value){
        state.password = value;
        console.log("updatePasswor",value)
      },
      updateGroups(state, value){
        state.groups = value;
        //console.log("updateGroups:",value)
      },
      enterToGroups(state, value) {//вход в приложение
        state.loading = false;
        console.log('enterToGroups:', value);
        state.groups = value;//загрузить массив групп
        state.wrongLogin = false;
        state.loggedIn = true;
        state.pages = 'groups';//следующая страница - группы!
      }
    },
    actions: {
      /**
      * Попытка залогинится на сервере, с передачёй логина и пароля
      * @param {*} param0 
      * @param {*} data 
      */
      tryLogin ({commit}, data) {
        var self = this;
        self.state.loading = true;
        //
        var url = 'user';
        fetch(URLs.getURL(url),//URL
          //Заголовок
          {
            method: 'PATCH', //заменить на POST!!!
            body: JSON.stringify(
                {
                  login:    self.state.user,
                  email:    self.state.email,
                  password: self.state.password
                }
            ),
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
            credentials:'same-origin'
          })
          //ожидание ответа сервера
          .then (response => {
            console.log("response",response);
            if (response.status != 200)
              throw new Error('Page '+url+' Not Found ' + response.status);
            //путь существует, смотрю что пришло
            let data = response.json();
            return data;
          })//ответный JSON распарсен без ошибок... но что же в нём?
          .then (data => { //выделяю юзера, если такого поля нет то неправильный JSON
            if (typeof data['user'] === "undefined") throw new Error('USER key is`t found');
            console.log("data.user:",data.user);
            return data;
          })//сюда прихожу если в принятом JSON есть поле user
          .then (data => {
            if (data.user === 'User with such name not found')  throw new Error('User with such name not found');
            if (data.user === 'Incorrect password')             throw new Error('Incorrect password');
            //Данные приняты. Если есть поле группы - загружаю группы
            if (typeof data['groups'] !== "undefined") {
              console.log("data.groups:",data.groups);
              commit('enterToGroups',data.groups);
            }
          })
          .catch((error) => {//отрабатываю ошибку коннекта
              console.log('request failed', error);
              self.state.loading = false;
              self.state.wrongLogin = true;
              self.state.loggedIn = false;
              commit('updatePages', 'login');
          });
      }
    },
    getters: {
      page(state){//на какой странице находится приложение
        return state.pages;
      },
      wrongLogin (state) {
        return state.wrongLogin;
      },
      loading (state) {
        return state.loading;
      },
      loggedIn (state) {
        return state.loggedIn;
      },
      user (state) {
        return state.user;
      }
    }
})

/*
        setTimeout(() => {
          commit('touggleWrongLogin', '');
          this.state.loading = false;
          if ((this.state.email == "dialix@yandex.ru") &&
                (this.state.password == "qwerty")) {
                  //есть вход!
                  this.state.wrongLogin = false;
                  this.state.loggedIn = true;
                  //следующая страница - группы!
                  commit('updatePages', 'groups');
                }
                else {
                  this.state.wrongLogin = true;
                  this.state.loggedIn = false;
                  commit('updatePages', 'login');
                }
        }, data.delay)
*/

          /*
          .then (function(response) {
              //получил какой-то ответ от сервера, может быть и 404-й ответ (жду 200-й)
              console.log("responses:",response);
              if(response.ok) {
                //запрошенная страница есть
                //теперь надо проверить что ответил сервер, если юзер не авторизован то есть
                //два варианта ответа:
                //1.  {user: 'Incorrect password'}  или юзер есть но в пароле ошибся
                //2.  {user: 'User with such name not found'} юзера нет, нада регаться
                console.log("samedata is reading", response);//какие-то данные прочитаны, значит есть коннект
                response.json()
                .then(function(json) {
                  console.log("json content:",json);
                  console.log("json user:",json.user, self.state.user);
                  if (json.user == self.state.user) {
                    console.log(self.state.user + 'is autorized uzer');
                    this.state.wrongLogin = false;
                    this.state.loggedIn = true;
                  }
                });
              } else {
                console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
              }
            })*/