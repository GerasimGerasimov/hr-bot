/**
* @description Форма входа в приложение и регистрации
*
*/

<template>
  <div class="container p20p20">
    <div class="header">
      <div>
        <span
          class="font-size-48 font-weight-900"
        >
        HR-BOT
        </span>
      </div>
      <div><span>Поиск и работа с кандидатами в LinkedIn</span></div>
    </div>
    <p class="linkedIn inline-center m20 c-secondary font-size-24">
      Войдите чтобы продолжить работу
    </p>
    <div class="form">
        <span>
          <transition name="fade">
            <p
              v-show="wrongLogin"
              class="inline-center p20 c-error font-size-16"
            >
              Неправильный логин или пароль! Попробуйте ещё раз
            </p>
          </transition>
          <input
            type="text"
            v-model.lazy = "username"
            placeholder="username"
          >
          <input
            type="password"
            v-model.lazy = "password"
            placeholder="password"
          >
          <button
            class="__button bgc-success width-100pr"
            @click="login()"
            >
            НАЧАТЬ РАБОТУ
          </button>
        </span>
        <div class="loading" v-show="loading">
          <img
            src="/img/spinner-icon-0.gif"
            alt="">
        </div>
    </div>
    <div class="form">
      <span>
        <a class="inline-center c-secondary p20" href="">Не можете войти?</a>
        <p class="inline-center m20 c-secondary">Обратитесь в службу поддержки для восстановления пароля или регистрации</p>
        <button class="__button bgc-accent width-100pr" style="margin=auto">РЕГИСТРАЦИЯ</button>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: ''
    }
  },
  //Методы
  methods:{
    /**
     * tryLogin попытка логина, запускается с кнопки "НАЧАТЬ РАБОТУ"
    */
    login(){
      this.$store.dispatch('AUTH');
    }
  },
  //Вычисляемые свойства
  computed: {
    //wrongLogin = true - индикатор что пара логин/пароль отвергнута сервером
    wrongLogin () {
      return this.$store.getters.wrongLogin;
    },
    //loading = true - запускает спиннер ожидания ответа сервера
    loading () {//индикатор загрузки
      return this.$store.getters.loading;
    },
    //email 
    username:{
      get() {
        return this.$store.state.username;
      },
      set (value) {
        this.$store.commit('updateUsername', value);
      }
    },
    password:{
      get() {
        return this.$store.state.password;
      },
      set (value) {
        this.$store.commit('updatePassword', value);
      }
    }
  },
}
</script>

<style scoped>
  .linkedIn::after {
    color:#0073b1;
    font-family: 'FontAwesome';
    font-weight: 900;
    content: "\f0e1";
  }

  .header {
    /*background-color: lightgray;*/
    /*background: repeating-radial-gradient(circle, var(--info-color), var(--accent-color) 10px, var(--accent-color) 10px, var(--accent-color) 20px);*/
    grid-column: 1/15;
    text-align: center;
    color: var(--secondary-color);
    background-image: radial-gradient(ellipse farthest-corner at right bottom, var(--primary-color) 0%, var(--accent-color) 50%, var(--info-color) 100%);
  }

  .container {
    background: white;
    grid-column: 1/15;
    position: relative;
  }
  
  .form {
    width: 400px;
     /*центрую форму относительно родительского блока*/
    margin: auto;/*выравниваю по центру*/
    box-shadow: 0px 5px 10px 1px rgba(0,0,0,0.1);/* Параметры тени */
    border-radius: 4px;
    position: relative;
  }

  .form + div.form{
    margin-top: 20px;
  }

  span {
    margin-left: 20px;
    margin-right: 20px;
    display: block;
  }

/*
  input[type=email],
  input[type=password] {
    width: 100%
  }
  */
  /*элементы input растянуты на всю ширину контейнера*/
  input {
    width: 100%;
  }

  /*цвет текста элементов ввода*/
  input {
    color: var(--secondary-color);
  }

  /*элементы ввода и кнопки растянуты на весь контейнер*/
  input, button{
    border-style:none;
    box-sizing: border-box;
    padding: .0em 1.5em;/*отступы текста внутри элемента*/
    height: 40px;/*текст будет по центру*/
    margin-bottom: 10px;
    margin-top: 20px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.1); /* Параметры тени */
  }
  
  /*центрирование по горизонтали*/
  .inline-center {
    display: block;
    text-align: center;
  }

  /*анимация появления надписи Неправильный логин-пароль*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }

</style>
