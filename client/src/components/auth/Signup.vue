<template>
  <div class="signup">
    <h2>Create New Account</h2>
    <div :class="{ 'form-group': true, 'has-error': errors.has('fullname') }">
      <div class="input-group">
        <input
          type="text" id="fullname" name="fullname" required="required"
          v-model="user.fullname" v-validate="'required'"
        />
        <label class="control-label" for="fullname">Full Name</label>
        <i class="bar"></i>
      </div>
    </div>
    <div :class="{ 'form-group': true, 'has-error': errors.has('username') }">
      <div class="input-group">
        <input
          type="text" id="username" name="username" required="required"
          v-model="user.username" v-validate="'required|usernameUnique'"
        />
        <label class="control-label" for="username">Username</label>
        <i class="bar"></i>
      </div>
    </div>
    <div :class="{ 'form-group': true, 'has-error': errors.has('email') }">
      <div class="input-group">
        <input
          type="text" id="email" name="email" required="required"
          v-model="user.email" v-validate="'required|email|emailUnique'"
        />
        <label class="control-label" for="email">Email</label>
        <i class="bar"></i>
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <input type="password" id="password" required="required" v-model="user.password" />
        <label class="control-label" for="password">Password</label>
        <i class="bar"></i>
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <input type="password" id="passwordrepeat" required="required"/>
        <label class="control-label" for="passwordrepeat">Password repeat</label>
        <i class="bar"></i>
      </div>
    </div>
    <div class="text-center">
      <button class="btn btn-primary" v-on:click="post">
        Sign Up
      </button>
    </div>
  </div>
</template>

<script>

  import { Validator } from 'vee-validate';
  import { usernameExists, emailExists } from 'services/auth';

  Validator.extend('usernameUnique', {
    getMessage: field => 'The name is exists',
    validate: value => usernameExists(value).then(res => !res)
  });
  
  Validator.extend('emailUnique', {
    getMessage: field => 'The name is exists',
    validate: value => emailExists(value).then(res => !res)
  });

  export default {
    name: 'signup',
    data: function() {
      return {
        user: {}
      }
    },
    methods: {
      post: function() {
        this.$emit('success');
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
