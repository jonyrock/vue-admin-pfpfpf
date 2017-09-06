<template>
  <div class="login">
    <h2>Login</h2>
    <validate-input
      name="username" v-model="login.username"
      rule="required|alpha_num" label="Username"
    />
    <validate-input
      name="password" v-model="login.password"
      rule="required" label="Password"
      type="password"
    />
    <div class="text-center">
      <button class="btn btn-primary" type="submit" v-on:click="post"> Log In </button>
    </div>
  </div>
</template>

<script>

  import { Validator } from 'vee-validate';
  import * as Auth from 'services/auth';

  export default {
    name: 'login',
    data: function() {
      return {
        login: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      post: function() {
        Promise.resolve()
          .then(() => this.$validator.validateAll())
          .then(result => {
            if(!result) {
              return Promise.reject();
            }
          })
          .then(() => Auth.login(this.login))
          .then(() => this.$emit('success'))
          .catch(error => {
            if(res.error === 'ERROR_NO_USERSERNAME') {
              this.errors.add('username', 'No such username');
            }
            if(res.error === 'ERROR_WRONG_PASSWORD') {
              this.errors.add('password', 'Wrong password');
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../sass/variables';
  @import '../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import '../../../node_modules/bootstrap/scss/variables';
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 3.125rem;
    }
  }
</style>
