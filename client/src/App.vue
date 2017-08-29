<template>
  <div id="app" class="app">
    <static-preloader v-if="isAuth === undefined"/>
    <login  v-if="isAuth === false"></login>
    <layout v-if="isAuth === true"></layout>
  </div>
</template>

<script>

  import Layout from 'components/layout/Layout'
  import Login from 'components/auth/login/Login'

  import StaticPreloader from 'components/ui/StaticPreloader';
  
  import authStore from 'vuex-store/modules/auth'
  import store from 'vuex-store';
  

  export default {
    name: 'app',
    components: {
      StaticPreloader,
      Login,
      Layout
    },
    computed: {
      isAuth() {
        return authStore.state.isAuth;
      }
    },
    mounted() {
      console.log('hey mounted');
      store.dispatch('sayHi');
    }
  }
</script>

<style lang="scss">
  @import "sass/main";
  body {
    height: 100%;
    .app {
      height: 100%;
    }
  }
</style>
