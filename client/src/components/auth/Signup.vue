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
          v-model="user.username" v-validate="'required|user.username'"
        />
        <label class="control-label" for="username">Username</label>
        <i class="bar"></i>
      </div>
    </div>
    <div :class="{ 'form-group': true, 'has-error': errors.has('email') }">
      <div class="input-group">
        <input
          type="text" id="email" name="email" required="required"
          v-model="user.email" v-validate="'required|user.email'"
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
          .then(res => {
            var user = this.user;
            user.id = res.id;
            this.user = {};
            this.$emit('success', user);
          });
      }
    }
  }
</script>

<style lang="scss">

</style>
