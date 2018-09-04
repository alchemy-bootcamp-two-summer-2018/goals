import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Goals from './components/Goals.vue';
import Auth from './components/Auth.vue';
import Users from './components/Users.vue';

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/auth', component: Auth },
    { path: '/goals', component: Goals },
    { path: '/users', component: Users },
    { path: '*', redirect: '/' }
  ]
});