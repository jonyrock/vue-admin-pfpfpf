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
      <validate-input
        name="fullname" v-model="user.fullname"
        rule="x-fullname-form"
      />
    </td>
    <td> 
      <validate-input
        name="username" v-model="user.username"
        :rule="'x-username:' + user.id"
      />
    </td>
    <td>
      <validate-input
        name="email" v-model="user.email"
        :rule="'x-email:' + user.id"
      />
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
        Promise.resolve()
          .then(() => this.$validator.validateAll())
          .then(result => {
            if(!result) {
              return Promise.reject();
            }
          })
          .then(() => this.$emit('saveEdit', id, user))
          .catch(() => {});
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
    margin: 0;
    position: relative;
    left: -2px;
    top: -2px;
  }
</style>
