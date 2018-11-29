<template>
  <div class="container p20p20">
    <p class="inline-center m20 c-secondary font-size-24">
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
            type="email"
            v-model.lazy = "email"
            placeholder="email"
            c
          >
          <input
            type="password"
            v-model.lazy = "password"
            placeholder="password"
          >
          <button
            class="__button bgc-success width-100pr"
            @click="tryLogin()"
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
  name: 'app',
  data () {
    return {
      msg: ''
    }
  },
  methods:{
    tryLogin(){
      //this.$store.state.wrongLogin = !this.$store.state.wrongLogin;
      this.$store.dispatch('tryLogin',{delay:3000});
    }
  },
  computed: {
    wrongLogin () {
      return this.$store.getters.wrongLogin;
    },
    loading () {//индикатор загрузки
      return this.$store.getters.loading;
    },
    email:{
      get() {
        return this.$store.state.email;
      },
      set (value) {
        this.$store.commit('updateEmail', value);
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

  .loading {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.02);
  }

  /*для img вложенного в элемент с классом loading */
  .loading img {
    filter:alpha(Opacity=25);
    opacity:0.35;
    height:100%;
    display: block;
    margin: 0 auto;
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

  button.__button {
    box-sizing: border-box; /* Ширина блока с полями */
    color: #fff; /* цвет текста */
    user-select: none; /* убирать выделение текста */
    padding: .0em 1.5em;/*.7em 1.5em; /* отступ от текста */
    height: 40px;/*текст будет по центру*/
    opacity: 0.9;
    font-size: 16px;
    border-radius: 4px;
  } 
  button.__button:hover { /* при наведении курсора мышки */
    opacity: 1.0; 
    } 
  button.__button:active { /* при нажатии */
    opacity: 0.5; 
  } 

  /*анимация появления надписи Неправильный логин-пароль*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }

</style>
