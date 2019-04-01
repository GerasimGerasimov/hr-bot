import Vue from 'vue'
import Vuex from 'vuex'
import AuthController from "../Controllers/AuthController.js"
import GroupsController from "../Controllers/GroupsController.js"
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
      setLoggedIn(state){//установь состояние входа в систему
        this.state.isLoading = false
        this.state.wrongLogin = false
        this.state.loggedIn = true
      },
      setWrongLogin(state){//установить состояние некорректного входа
        this.state.isLoading = false
        this.state.loggedIn = false
        //показываю юзеру отрицательный результат
        this.state.wrongLogin = true
      },
      enterToGroups(state, value) {//Группы загружены, требуется их отобразить
        console.log('enterToGroups:', value);
        state.groups = []
        //надо преобразовать список объектов data/groups/1
        //в массив key:data/groups/1 value=
        for (let item in value) {
          console.log(item)
          value[item].uri = item //сразу запишу путь до информации о группе
          state.groups.push(value[item])  
        }
        console.log(state.groups)
        getGroupStatus(state.groups);//опредедить статусы загруженных групп
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
        try {
          this.state.isLoading = true//показать индикатор загрузки
            this.state.token = await AuthController.getAuth(
              URLs.getURL(ApiRouts.AUTH_GET_TOKEN), 
                this.state.username, 
                  this.state.password)
            commit('setLoggedIn')//установить состояние входа в систему
            commit('setPageGroups')//и перейти на стр ГРУППЫ
        } catch(error) {//отрабатываю ошибку коннекта
            console.log('GET_AUTH_ERROR:', error)
            commit('setWrongLogin')//состояние ошибки при логине
            commit('updatePages', 'login')           
        };
      },
      //передаю имя, пароль и токен (после логина) получаю группы (кампании) этого пользователя
      async GET_USER_GROUPS ({commit, dispatch}, payload) {
        try {
          this.state.isLoading = true//показать индикатор загрузки
          let groups =  await AuthController.getUserGroups(
            URLs.getURL(ApiRouts.GROUPS_GET_GROUPS), 
              this.state.username, 
                this.state.token)
          console.log('GET_GROUPS:', groups)
          this.state.isLoading = false//скрыть индикатор загрузки
          commit('enterToGroups',groups);
        } catch(error) {//отрабатываю ошибку коннекта
            console.log('GET_GROUPS failed', error);
            commit('setWrongLogin')//состояние ошибки при логине
            commit('updatePages', 'login');
        }
      },
      async CREATE_GROUP ({commit, dispatch}, payload) {
        try {
          console.log('CREATE_GROUP:')
          await GroupsController.addGroup(
            URLs.getURL(ApiRouts.GROUPS_ADD_GROUP), 
              this.state.username, 
                this.state.token,
                  this.state.campany)
        } catch(error) {//отрабатываю ошибку коннекта
            console.log('CREATE_GROUP failed', error);
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
       *              2. Поле candidates_count пустое или = НУЛЮ (не нашёл ещё никого)
       *  3) Active - кандидаты найдены (Поле candidates_count содержит кол-во кандидатов)
       *              на этом этапе работает HR с предоставленной выборкой
       *  4) Done - кампания закрыта, требуемые кадры наняты 
       * 
       * @param {*} groups массив групп (кампаний)
       */
      var getGroupStatus = (groups) =>{
        groups.forEach(element => {
          if ((element.SearchParams.length != 0) &&
              (element.candidates_count == 0)) {
                element.Status = "Search";
                return true;
              }
          if (element.candidates_count != 0) {
            element.Status = `Active: ${element.candidates_count}`;
            return true;
          }
          if (element.Visible == false) {
            element.Status = "Done";
          }
          element.Status = "New";//значение по умолчанию
        });
      }