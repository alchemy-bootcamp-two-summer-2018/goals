import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Auth from './components/Auth.vue';
import About from './components/About.vue';
import Users from './components/Users.vue';
import UserDetail from './components/UserDetail.vue';
import GoalsList from './components/GoalsList.vue';
import GoalsMap from './components/GoalsMap.vue';
import NewGoal from './components/NewGoals.vue';

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/users', component: Users },
    { path: '/auth', component: Auth },
    { 
      path: '/users/:id', 
      component: UserDetail,
      children: [
        { path: 'list', component: GoalsList },
        { path: 'map', component: GoalsMap },
        { path: 'new', component: NewGoal },
        { path: '', redirect: 'list' }
      ]
    },
    { path: '*', redirect: '/' }
  ]
});