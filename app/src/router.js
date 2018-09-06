import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Auth from './components/Auth.vue';
import GoalsList from './components/GoalsList.vue';
import GoalDetail from './components/GoalDetail.vue';
import NewGoal from './components/NewGoal.vue';

export default new VueRouter({
  routes: [
    { path: '/', components: Home },
    { path: '/auth', component: Auth },
    { 
      path: '/goals', 
      component: GoalDetail,
      children: [
        { path: 'list', component: GoalsList },
        { path: 'new', component: NewGoal },
        { path: '', redirect: 'list' }
      ]
    },
    { path: '*', redirect: '/' }
  ]
});