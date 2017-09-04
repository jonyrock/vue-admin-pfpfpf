<template>
  <nav class="navbar app-navbar navbar-toggleable-md">
    <div class="navbar-brand-container d-flex align-items-center justify-content-start">
      <a class="navbar-brand" href="#">
        <i class="i-vuestic"></i>
      </a>
    </div>

    <div class="row navbar-container">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="menu-icon-container d-flex align-items-center justify-content-center justify-content-lg-start col">
        <a class="menu-icon i-menu-expanded" href="#" @click.prevent="toggleSidebar(false)" v-if="sidebarOpened"></a>
        <a class="menu-icon i-menu-collapsed" href="#" @click.prevent="toggleSidebar(true)" v-else></a>
      </div>

      <div class="offset-lg-8"></div>
      
      <div class="col nav-item d-flex align-items-center justify-content-center">
        <a href="#/users" v-on:click="logout()" class="sidebar-link">
          <i class="sidebar-menu-item-icon vuestic-icon vuestic-icon-logout"></i>Logout
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'navbar',

    computed: mapGetters([
      'sidebarOpened',
      'toggleWithoutAnimation'
    ]),
    methods: {
      logout() {
        this.$store.dispatch('logout');
      },
      ...mapActions([
        'toggleSidebar',
        'toggleDropdown',
        'isToggleWithoutAnimation'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
  @import "../../../../node_modules/bootstrap/scss/variables";
  
  .sidebar-menu-item-icon {
    font-size: 19px;
    margin-right: 10px;
    position: relative;
    top: 3px
  }
  
  a:hover {
    color:white;
    text-decoration: none;
  }

  .navbar.app-navbar {
    .navbar-container {
      width: 100%;
      height: 100%;
      margin: 0;
    }

    height: $top-nav-height;
    padding-left: $nav-padding-left;
    padding-right: $nav-padding-right;
    background-color: $top-nav-bg;

    
    .menu-icon-container {
      padding: 0;
      font-size: $font-size-base;
    }

    .navbar-brand-container {
      position: absolute;
      z-index: 3;
      height: 100%;
      left: $navbar-brand-container-left;
      top: 0;
    }

    .nav-item {
      padding: 0;
      height: 100%;
    }

  }
</style>
