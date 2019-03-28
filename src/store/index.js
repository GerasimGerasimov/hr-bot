import Vue from 'vue'
import Vuex from 'vuex'
import AuthController from "../Controllers/AuthController.js"
import CandidatesController from "../Controllers/CandidatesController.js"
import * as ApiRouts from "../Controllers/apirouts.js"
const URLs = require('./urls.js');

Vue.use(Vuex)

export const store = new Vuex.Store({  
    state: {
        pages: "login", //login, groups, campany
        //имя и пароль пользователя
        username:"Gerasim",
        email:"dialix@yandex.ru",
        password:"qwerty",
        token:'',
        //
        wrongLogin: false,//неправильный логин пароль
        loggedIn: false,//пользователь в системе
        isLoading:false,//индикатор загрузки
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
      setPageGroups(state) {
        state.pages = 'groups';//следующая страница - группы!
      },
      enterToGroups(state, value) {//Группы загружены, требуется их отобразить
        state.isLoading = false;
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
        state.isLoading = false;
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
      //передаю имя и пароль, получаю токен
      async AUTH ({commit, dispatch}, payload) {
        this.state.isLoading = true;
        try {
          this.state.token = await AuthController.getAuth(URLs.getURL(ApiRouts.AUTH_GET_TOKEN), this.state.username, this.state.password)
          console.log('GET_AUTH_OK:', this.state.token)
           this.state.isLoading = false
          this.state.wrongLogin = false
          this.state.loggedIn = true
          commit('setPageGroups');
          //let groups =  await AuthController.getGroups(URLs.getURL(ApiRouts.GROUPS_GET_GROUPS), this.state.username, this.state.token)
        } catch(error) {//отрабатываю ошибку коннекта
            console.log('GET_AUTH_ERROR:', error)
            this.state.isLoading = false
            //показываю юзеру отрицательный результат
            this.state.wrongLogin = true
            this.state.loggedIn = false
            commit('updatePages', 'login')           
        };
        /*
        AuthController.getAuth(URLs.getURL(ApiRouts.AUTH_GET_TOKEN), this.state.username, this.state.password)
          .then(result => {
            console.log('GET_AUTH_OK:', result)
            this.state.token = result
            this.state.isLoading = false
            this.state.wrongLogin = false
            this.state.loggedIn = true
            //commit('enterToGroups',result);
            console.log('GET_AUTH_OK: 1-1-1-1-1')
          })
          .then (
            (async () => {
              console.log('getGroups : 2-2-2-2-2')
              AuthController.getGroups(URLs.getURL(ApiRouts.GROUPS_GET_GROUPS), this.state.username, this.state.token)
            })()
          )
          .catch((error) => {//отрабатываю ошибку коннекта
            console.log('GET_AUTH_ERROR:', error)
            this.state.isLoading = false
            //показываю юзеру отрицательный результат
            this.state.wrongLogin = true
            this.state.loggedIn = false
            commit('updatePages', 'login')           
          });
          */
      },
      //передаю имя, пароль и токен (после логина) получаю группы (кампании) этого пользователя
      async GET_GROUPS ({commit, dispatch}, payload) {
        try {
          let groups =  await AuthController.getGroups(URLs.getURL(ApiRouts.GROUPS_GET_GROUPS), this.state.username, this.state.token)
          console.log('GET_GROUPS:', groups)
            this.state.isLoading = true
            commit('enterToGroups',groups);
        } catch(error) {//отрабатываю ошибку коннекта
            console.log('GET_GROUPS failed', error);
            this.state.isLoading = false;
            this.state.wrongLogin = true;
            this.state.loggedIn = false;
            commit('updatePages', 'login');
        }
      },
      //получение списка кандидатов
      GET_CANDIDATES ({commit}, payload) {
          console.log('GET_CANDIDATES:')
          const url = 'user';
          CandidatesController.getList(URLs.getURL(url), this.state.campany.Candidates)
          .then(result => {
            console.log('GET_CANDIDATES :', result)
          })
          .catch((error) => {//отрабатываю ошибку коннекта
            console.log('GET_CANDIDATES  failed', error);
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
        return state.isLoading;
      },
      loggedIn (state) {
        return state.loggedIn;
      },
      user (state) {
        return state.username;
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
          this.state.isLoading = false;
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