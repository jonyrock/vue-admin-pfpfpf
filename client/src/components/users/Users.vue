<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <widget headerText="Users">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding users-table">
              <thead>
                <tr>
                  <td>id</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <template v-for="user in users">
                  <userRow 
                    :user="editId === user.id ? userEditCopy : user" 
                    :isEdit="editId === user.id"
                    v-on:remove="onRemove"
                    v-on:edit="onEdit"
                    v-on:saveEdit="onSaveEdit"
                    v-on:unedit="onUnedit"
                  />
                </template>
              </tbody>
            </table>
          </div>
        </widget>
      </div>
    </div>

  </div>
</template>

<script>
  import Widget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import UserRow from './UserRow';
  
  import * as Users from '../../services/users';
  
  import _ from 'lodash';
  
  export default {
    components: {
      Widget,
      UserRow
    },
    name: 'Users',
    data() {
      return {
        users: undefined,
        editId: undefined,
        userEditCopy: undefined
      }
    },
    methods: {
      onRemove(id) {
        Users
          .remove(id)
          .then(r => {
            var { index } = this.userById(id);
            this.users.splice(index, 1);
          });
      },
      onEdit(id) {
        var { user } = this.userById(id);
        this.userEditCopy = _.clone(user);
        this.editId = id;
      },
      onUnedit(id) {
        this.editId = undefined;
        this.userEditCopy = undefined;
      },
      onSaveEdit(id) {
        Users
          .update(id, this.userEditCopy)
          .then(r => {
            var { index, user } = this.userById(id);
            this.users[index] = this.userEditCopy;
            this.userEditCopy = undefined;
            this.editId = undefined;
          });
      },
      userById(id) {
        var index = _.findIndex(this.users, u => u.id == id);
        return {
          index: index,
          user: this.users[index]
        };
      }
    },
    created() {
      Users
        .getList()
        .then(res => {
          this.users = res;
        });
    },
    
  }
</script>

<style lang="scss">

  .color-icon-label-table {
    td:first-child {
      width: 1rem;
    }
  }
  
  .users-table {
    .btn-micro {
      span {
        font-size: 12px;
      }
      width: 10px;
      padding-left: 10px;
      padding-right: 20px;
    }
  }
</style>
