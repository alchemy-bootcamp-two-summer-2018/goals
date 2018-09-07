import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Auth from './components/Auth.vue';
import Goals from './components/Goals.vue';
import AddGoals from './components/AddGoals.vue';
import GoalComplete from './components/GoalComplete.vue';
import AllUsers from './components/AllUsers.vue';

export default new VueRouter ({
  routes: [
    { path: '/', component: Home },
    { path: '/auth', component: Auth },
    { path: '/goals', component: Goals },
    { path: '/add', component: AddGoals},
    { path: '/status', component: GoalComplete},
    { path: '/compare', component: AllUsers},
    { path: '*', redirect: '/' }
  ]
});