import Vue from 'vue'
import Vuex from 'vuex'
import AuthController from "../Controllers/AuthController.js";
const URLs = require('./urls.js');

Vue.use(Vuex)

export const store = new Vuex.Store({  
    state: {
        pages: "login", //login, groups, campany
        //имя и пароль пользователя
        user:"Gerasim",
        email:"dialix@yandex.ru",
        password:"qwerty",
        //
        wrongLogin: false,//неправильный логин пароль
        loggedIn: false,//пользователь в системе
        loading:false,//индикатор загрузки
        //
        groups: [], //группы
        campany: {} //кампания
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
      },
      updatePassword(state, value){
        state.password = value;
      },
      updateGroups(state, value){
        state.groups = value;
      },
      /**
       * enterToGroups
       * @param {*} state 
       * @param {*} value - state.groups: [] - массив группы
       */
      enterToGroups(state, value) {//Группы загружены, требуется их отобразить
        state.loading = false;
        console.log('enterToGroups:', value);
        state.groups = value;//загрузить массив групп
        getGroupStatus(state.groups);//опредедить статусы загруженных групп
        state.wrongLogin = false;
        state.loggedIn = true;
        state.pages = 'groups';//следующая страница - группы!
      },
      enterToCampany(state, value) {//вход в Кампанию
        console.log('enterToCampany:', value);
        state.campany= value;//загрузить массив групп
        state.pages = 'campany';//следующая страница - кампания!
      },
      logOut(state, value) {//разлогинится
        state.groups = [];
        state.loading = false;
        state.wrongLogin = false;
        state.loggedIn = false;
        state.pages = 'login';//следующая страница - группы!
      },
      backToGroups(state,value){
        state.pages = 'groups';//следующая страница - группы!
      },
      updateGroupEmployer(state, value){
        state.campany.Employer = value;
      },
      updateGroupPosition(state, value){
        state.campany.Position = value;
      },
      updateGroupSkills(state, value){
        state.campany.Skills = value;
      },
      updateGroupMessageTemplate(state, value){
        state.campany.MessageTemplate = value;
      },
      updateGroupLocation(state, value){
        state.campany.Location = value;
      },
      updateGroupCircles(state, value){
        state.campany.Circles = value;
      },
      updateGroupExceptions(state, value){
        state.campany.Exceptions = value;
      }
    },
    actions: {
      /**
      * Попытка залогинится на сервере, с передачёй логина и пароля
      * @param {*} param0 
      * @param {*} data 
      */
      tryLogin ({commit}, data) {
        const url = 'user';
        AuthController.getGroups(URLs.getURL(url), this.state.user, this.state.password)
          .then(result => {
            console.log('tryLogin:', result)
            this.state.loading = true;
            commit('enterToGroups',result);
          })
          .catch((error) => {//отрабатываю ошибку коннекта
            console.log('getGroups failed', error);
            this.state.loading = false;
            this.state.wrongLogin = true;
            this.state.loggedIn = false;
            commit('updatePages', 'login');
        });
      },
      logOut({commit}, value) {//разлогинится
        commit('logOut', '');
      },
      backToGroups({commit}, value){
        commit('backToGroups', '');//следующая страница - группы
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

      /**
       * После загрузки групп, надо определить их статус:
       *  1) New - ещё не нажата кнопка "выполнить поиск кандидатов"
       *  2) Search - робот ищет кандидатов. Признаки:
       *              1. Поле SearchParams не пустое
       *              2. Поле Candidates пустое (не нашёл ещё никого)
       *  3) Active - кандидаты найдены (Поле Candidates содержит список id кандидатов)
       *              на этом этапе работает HR с предоставленной выборкой
       *  4) Done - кампания закрыта, требуемые кадры наняты 
       * 
       * @param {*} groups массив групп (кампаний)
       */
      var getGroupStatus = (groups) =>{
        groups.forEach(element => {
          if ((element.SearchParams.length != 0) &&
              (element.Candidates.length == 0)) {
                element.Status = "Search";
                return true;
              }
          if (element.Candidates.length != 0) {
            element.Status = `Active: ${element.Candidates.length}`;
            return true;
          }
          if (element.Visible == false) {
            element.Status = "Done";
          }
          element.Status = "New";//значение по умолчанию
        });
      }

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