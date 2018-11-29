import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
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
        }, data.delay)
      }
    },
    getters: {
      wrongLogin (state) {
        return state.wrongLogin;
      },
      loading (state) {
        return state.loading;
      }
    }
})