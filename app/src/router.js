
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Auth from './components/Auth.vue';
import Goals from './components/Goals.vue';
import GoalsList from './components/GoalsList.vue';
import NewGoal from './components/NewGoal.vue';
import Users from './components/Users.vue';

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/auth', component: Auth },
    { 
      path: '/goals', 
      component: Goals,
      children: [
        { path: 'list', component: GoalsList },
        { path: 'new', component: NewGoal },
        { path: '', redirect: 'list' }
      ]
    },
    { path: '/users', component: Users },
    { path: '*', redirect: '/' }
  ]
});