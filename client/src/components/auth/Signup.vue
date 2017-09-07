<template>
  <div class="signup">
    <h2>Create New Account</h2>
    <validate-input
      name="fullname" v-model="user.fullname"
      rule="required|alpha_spaces" label="Full Name"
    />
    <validate-input
      name="username" v-model="user.username"
      rule="x-username" label="Username"
    />
    <validate-input
      name="email" v-model="user.email" 
      rule="x-email" label="Email"
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
      clearInput() {
        for(var k in this.user) {
          this.user[k] = '';
        }
        this.password_repeat = '';
      },
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
            if(res === undefined) {
              throw new Error('Expecting a result after user creation');
            }
            if(res.id === undefined) {
              throw new Error('Expecting new user id');
            }
            // small js object instead of Vue's observer
            var user = _.clone(this.user);
            user.id = res.id;
            this.clearInput();
            this.$emit('success', user);
          })
          .catch(error => console.log(error));
      }
    }
  }
</script>

<style lang="scss">

</style>
