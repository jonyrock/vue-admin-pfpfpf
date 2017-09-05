<template>
  <tr v-if="!isEdit">
    <td>{{ user.id }}</td>
    <td>{{ user.fullname }}</td>
    <td>{{ user.username }}</td>
    <td>{{ user.email }}</td>
    <td>
      <button class="btn btn-primary btn-micro" v-on:click="edit(user.id)">
        <div class="icon">
          <span aria-hidden="true" class="fa fa-edit"></span>
        </div>
      </button>
      <button class="btn btn-primary btn-micro" v-on:click="remove(user.id)">
        <div class="icon">
          <span aria-hidden="true" class="fa fa-remove"></span>
        </div>
      </button>
    </td>
  </tr>
  <tr v-else>
    <td> {{ user.id }} </td>
    <td>
      <div :class="{ 'form-group': true, 'has-error': errors.has('fullname') }">
        <div class="input-group">
          <input
            type="text" id="fullname" name="fullname" required="required"
            v-model="user.fullname" v-validate="'required|alpha_spaces'"
          />
          <i class="bar"></i>
        </div>
      </div>
    </td>
    <td> 
      <div :class="{ 'form-group': true, 'has-error': errors.has('username') }">
        <div class="input-group">
          <input
            type="text" id="username" name="username" required="required"
            v-model="user.username" v-validate="'required|user.username:' + user.id"
          />
          <i class="bar"></i>
        </div>
      </div>
    </td>
    <td>
      <div :class="{ 'form-group': true, 'has-error': errors.has('email') }">
        <div class="input-group">
          <input
            type="text" id="email" name="email" required="required"
            v-model="user.email" v-validate="'required|user.email:' + user.id"
          />
          <i class="bar"></i>
        </div>
      </div>
    </td>
    <td>
      <button class="btn btn-primary btn-micro" v-on:click="saveEdit(user.id)">
        <div class="icon">
          <span aria-hidden="true" class="fa fa-check"></span>
        </div>
      </button>
      <button class="btn btn-primary btn-micro" v-on:click="unedit(user.id)">
        <div class="icon">
          <span aria-hidden="true" class="fa fa-ban"></span>
        </div>
      </button>
    </td>
  </tr>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      },
      isEdit: {
        type: Boolean,
        required: true
      }
    },
    mounted() {
    },
    methods: {
      remove(id) {
        this.$emit('remove', id)
      },
      saveEdit(id, user) {
        this.$emit('saveEdit', id, user);
      },
      edit(id) {
        this.$emit('edit', id);
      },
      unedit(id) {
        this.$emit('unedit', id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-group {
    margin: 0
  }
</style>
