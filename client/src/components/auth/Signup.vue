<template>
  <div class="signup">
    <h2>Create New Account</h2>
    <validate-input
      name="fullname" v-model="user.fullname"
      rule="required|alpha_spaces" label="Full Name"
    />
    <validate-input
      name="username" v-model="user.username"
      rule="required|user.username" label="Username"
    />
    <validate-input
      name="email" v-model="user.email" 
      rule="required|user.email" label="Email"
    />
    <validate-input
      type="password"
      name="password" v-model="user.password" 
      rule="required|confirmed:password_repeat" label="Password"
    />
    <validate-input
      type="password"
      name="password_repeat" v-model="password_repeat" 
      rule="required|confirmed:password_repeat" label="Password Repeat"
    />
    <div class="text-center">
      <button class="btn btn-primary" v-on:click="post"> Create </button>
    </div>
  </div>
</template>

<script>

  import * as Auth from 'services/auth'
  
  export default {
    name: 'signup',
    data: function() {
      return {
        user: {
          fullname: '',
          username: '',
          email: '',
          password: ''
        },
        password_repeat: ''
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
          .then(() => Auth.createNewUser(this.user))
          .then(res => {
            var user = this.user;
            user.id = res.id;
            this.user = {};
            this.$emit('success', user);
          })
          .catch(() => {});
      }
    }
  }
</script>

<style lang="scss">

</style>
