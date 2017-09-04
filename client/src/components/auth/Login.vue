<template>
  <div class="login">
    <h2>Login</h2>
    <div :class="{ 'form-group': true, 'has-error': errors.has('username') }">
      <div class="input-group">
        <input
          type="text" required="required" name="username"
          v-model="login.username" v-validate="'required|alpha_num'"
        />
        <label class="control-label" for="login"> Username </label>
        <i class="bar"></i>
      </div>
    </div>
    <div :class="{ 'form-group': true, 'has-error': errors.has('password') }">
      <div class="input-group">
        <input
          type="password" name="password" required="required"
          v-model="login.password" v-validate="'required'"
        />
        <label class="control-label" for="password"> Password </label>
        <i class="bar"></i>
      </div>
    </div>
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
      return { login: { } }
    },
    methods: {
      post: function() {
        Auth
          .login(this.login)
          .then(res => {
            if(res.error !== undefined) {
              if(res.error === 'ERROR_NO_USERSERNAME') {
                this.errors.add('username', 'No such username');
              }
              if(res.error === 'ERROR_WRONG_PASSWORD') {
                this.errors.add('password', 'Wrong password');
              }
            } else {
              this.$emit('success');
            }
          });
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
