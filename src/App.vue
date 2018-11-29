<template>
  <div id="app" class="layout">
    <i-header></i-header>
    <login-form></login-form>
  </div>
</template>

<script>
  //Login Page
  import IHeader from './components/login/IHeader.vue'
  import loginForm   from './components/login/loginForm.vue'
  //Group Page
  import GroupHeader from './components/group/GroupHeader.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    setCounter(event){
      console.log(event.target.value)
      this.$store.state.counter = event.target.value
    }
  },
  computed: {
    counter (){
      return this.$store.state.counter;
    }
  },
  components: {
    IHeader,
    loginForm,
    GroupHeader
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
