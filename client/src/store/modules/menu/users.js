import lazyLoading from './lazyLoading.js'


export default {
  name: 'users',
  meta: {
    title: 'Users',
    iconClass: 'vuestic-icon vuestic-icon-users'
  },
  path: '/users',
  component: lazyLoading('users/Users')
}
