<template>
  <div id="app" class="app">
    <static-preloader v-if="isAuth === undefined"/>
    <layout v-if="isAuth === true"></layout>
    <center-placer v-if="isAuth === 'login'" width="342px" :box="true">
      <login v-on:success="onLoginSuccess"></login>
      <div class="bottomLink">
        <a href="#" v-on:click="screenName = 'signup'"> Create account </a>
      </div>
    </center-placer>
    <center-placer v-if="isAuth === 'signup'" width="342px" :box="true">
      <signup v-on:success="onSignupSuccess"></signup>
      <div class="bottomLink">
        <a href="#" v-on:click="screenName = 'login'"> Login </a>
      </div>
    </center-placer>
  </div>
</template>

<script>

  import Layout from 'components/layout/Layout';
  import Login from 'components/auth/Login';
  import Signup from 'components/auth/Signup';

  import StaticPreloader from 'components/ui/StaticPreloader';
  import CenterPlacer from 'components/ui/CenterPlacer';
  import AuthStore from 'vuex-store/modules/auth';

  export default {
    name: 'app',
    components: {
      StaticPreloader,
      CenterPlacer,
      Login,
      Signup,
      Layout
    },
    data() {
      return {
        screenName: 'login'
      }
    },
    computed: {
      isAuth() {
        if(AuthStore.state.isAuth === undefined) {
          return undefined;
        }
        if(AuthStore.state.isAuth === true) {
          return true;
        }
        return this.screenName;
      }
    },
    mounted() {
      this.$store.dispatch('checkLogin');
    },
    methods: {
      onSignupSuccess() {
        this.screenName = 'login';
      },
      onLoginSuccess() {
        console.log('good login');
        this.$store.dispatch('checkLogin');
      }
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
  .bottomLink {
    margin-top: 20px;
    text-align: center;
  }
</style>
