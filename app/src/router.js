import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Auth from './components/Auth.vue';
import GoalsList from './components/GoalsList.vue';
import NewGoal from './components/NewGoal.vue';

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/auth', component: Auth },
    { path: '*', redirect: '/' }
  ]
});