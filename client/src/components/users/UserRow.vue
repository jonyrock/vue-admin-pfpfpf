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
    <td> <input type="text" v-model="user.fullname" /> </td>
    <td> <input type="text" v-model="user.username" /> </td>
    <td> <input type="text" v-model="user.email" /> </td>
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
      console.log('hey mount');
      console.log(this.errors);
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

<style lang="scss">
</style>
