<template>
  <div id="app" class="layout">  
    <login-form        v-if = "page == 'login'" ></login-form>
    <groups-form  v-else-if = "page == 'groups'"></groups-form>
    <campany-form v-else-if = "page == 'campany'"></campany-form>
  </div>
</template>


<script>
//Login Page
import loginForm   from './components/pages/loginForm.vue'
//Groups Page
import GroupsForm from './components/pages/GroupsForm.vue'
//Campany Page
import CampanyForm from './components/pages/CampanyForm.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to HR-BOT Vue.js App'
    }
  },
  computed: {
    page(){
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
