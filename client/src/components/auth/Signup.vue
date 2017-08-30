<template>
  <div class="signup">
    <h2>Create New Account</h2>
    <form method="post" action="/auth/signup" name="signup">
    <div class="form-group">
        <div class="input-group">
          <input type="text" id="fullname" required="required"/>
          <label class="control-label" for="fullname">Full name</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="username" required="required"/>
          <label class="control-label" for="username">Username</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" required="required"/>
          <label class="control-label" for="password">Password</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="passwordrepeat" required="required"/>
          <label class="control-label" for="passwordrepeat">Password repeat</label><i class="bar"></i>
        </div>
      </div>
      <div class="text-center">
        <button class="btn btn-primary" type="submit">
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'signup'
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
