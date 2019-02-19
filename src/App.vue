<template>
  <div id="app" class="layout">
    
    <login-form        v-if = "page == 'login'" ></login-form>
    <groups-form  v-else-if = "page == 'groups'"></groups-form>
    <campany-form v-else-if = "page == 'campany'"></campany-form>
  </div>
</template>

<script>
  //Login Page
  import loginForm   from './components/login/loginForm.vue'
  //Groups Page
  import GroupsForm from './components/groups/GroupsForm.vue'
  //Campany Page
  import CampanyForm from './components/campany/CampanyForm.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to HR-BOT Vue.js App'
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
    GroupsForm,
    CampanyForm
  }
}
</script>

<style>
</style>
