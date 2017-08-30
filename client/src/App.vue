<template>
  <div id="app" class="app">
    <static-preloader v-if="isAuth === undefined"/>
    <center-placer v-if="isAuth === false" width="342px" :box="true">
      <login></login>
    </center-placer>
    <layout v-if="isAuth === true"></layout>
  </div>
</template>

<script>

  import Layout from 'components/layout/Layout'
  import Login from 'components/auth/login/Login'

  import StaticPreloader from 'components/ui/StaticPreloader'
  import CenterPlacer from 'components/ui/CenterPlacer'
  import AuthStore from 'vuex-store/modules/auth'

  export default {
    name: 'app',
    components: {
      StaticPreloader,
      CenterPlacer,
      Login,
      Layout
    },
    computed: {
      isAuth() {
        //return undefined;
        return AuthStore.state.isAuth;
      }
    },
    mounted() {
      this.$store.dispatch('checkLogin');
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
