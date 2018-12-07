<template>
  <div id="app" class="layout">
    
    <login-form      v-if = "page == 'login'" ></login-form>
    <group-form v-else-if = "page == 'groups'"></group-form>
  </div>
</template>

<script>
  //Object.definePrototype(Vue.prototype, '$AppTests', { value: AppTests });
  //var AppTests = require('./tests/test.js');
  //Login Page
  import loginForm   from './components/login/loginForm.vue'
  //Group Page
  import GroupForm from './components/group/GroupForm.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    //setCounter(event){
    //  console.log(event.target.value)
    //  this.$store.state.counter = event.target.value
    //}
  },
  computed: {
    page(){
      //console.log("DEBUG_MODE", this.$AppTests().DEBUG_MODE);
      //console.log("DEBUG_MODE", AppTests.DEBUG_MODE_TXT);//AppTests.DEBUG_MODE());
      //Tests.data.DEBUG_MODE = true;
      return this.$store.getters.page;
    },
    loggedIn () {//loggedIn = true Пользователь вошёл в систему
      return this.$store.getters.loggedIn;
    }
  },
  components: {
    loginForm,
    GroupForm
  }
}

/*
    <input
      type="email"
      placeholder="e-mail"
      id="email"
      v-model="counter"
      @change=setCounter($event)
    >
*/

</script>

<style>
</style>
