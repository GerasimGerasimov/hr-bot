import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pages: "groups", //login, groups, group
        //имя и пароль пользователя
        user:"Gerasim",
        email:"dialix@yandex.ru",
        password:"qwerty",
        wrongLogin: false,//неправильный логин пароль
        loggedIn: false,//пользователь в системе
        //
        loading:false,//индикатор загрузки
        counter: ""
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
      }
    },
    actions: {
      /**
      * Попытка залогинится на сервере, с передачёй логина и пароля
      * @param {*} param0 
      * @param {*} data 
      */
      tryLogin ({commit}, data) {
        this.state.loading = true;
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
      }
    }
})