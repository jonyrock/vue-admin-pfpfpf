<template>
  <div class="signup">
    <h2>Create New Account</h2>
    <div :class="{ 'form-group': true, 'has-error': errors.has('fullname') }">
      <div class="input-group">
        <input
          type="text" id="fullname" name="fullname" required="required"
          v-model="user.fullname" v-validate="'required|alpha_spaces'"
        />
        <label class="control-label" for="fullname">Full Name</label>
        <i class="bar"></i>
      </div>
    </div>
    <div :class="{ 'form-group': true, 'has-error': errors.has('username') }">
      <div class="input-group">
        <input
          type="text" id="username" name="username" required="required"
          v-model="user.username" v-validate="'required|alpha_num|username_unique'"
        />
        <label class="control-label" for="username">Username</label>
        <i class="bar"></i>
      </div>
    </div>
    <div :class="{ 'form-group': true, 'has-error': errors.has('email') }">
      <div class="input-group">
        <input
          type="text" id="email" name="email" required="required"
          v-model="user.email" v-validate="'required|email|email_unique'"
        />
        <label class="control-label" for="email">Email</label>
        <i class="bar"></i>
      </div>
    </div>
    <div :class="{ 'form-group': true, 'has-error': errors.has('password') }">
      <div class="input-group">
        <input 
          type="password" id="password" name="password" required="required"
          v-model="user.password" v-validate="'required|confirmed:password_repeat'"
        />
        <label class="control-label" for="password">Password</label>
        <i class="bar"></i>
      </div>
    </div>
    <div :class="{ 'form-group': true, 'has-error': errors.has('password_repeat') }">
      <div class="input-group">
        <input type="password" id="password_repeat" name="password_repeat" required="required" />
        <label class="control-label" for="password_repeat">Password repeat</label>
        <i class="bar"></i>
      </div>
    </div>
    <div class="text-center">
      <button class="btn btn-primary" v-on:click="post"> Create </button>
    </div>
  </div>
</template>

<script>

  import { Validator } from 'vee-validate';
  import * as Auth from 'services/auth';

  Validator.extend('username_unique', {
    getMessage: field => 'The name is exists',
    validate: value => Auth.usernameExists(value).then(res => !res)
  });
  
  Validator.extend('email_unique', {
    getMessage: field => 'The name is exists',
    validate: value => Auth.emailExists(value).then(res => !res)
  });

  export default {
    name: 'signup',
    data: function() {
      return {
        user: { }
      }
    },
    methods: {
      post: function() {
        Auth
          .createNewUser(this.user)
          .then(res => this.$emit('success'));
      }
    }
  }
</script>

<style lang="scss">
  @import '../../sass/variables';
  @import '../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import '../../../node_modules/bootstrap/scss/variables';

  .signup {
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
      margin-top: 2.6875rem;
    }
  }
</style>
