<template>
  <div id="app" class="layout">
    <i-header></i-header>
    <login-form></login-form>
  </div>
</template>

<script>
  import IHeader from './components/IHeader.vue'
  import loginForm   from './components/loginForm.vue'

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
    loginForm
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
