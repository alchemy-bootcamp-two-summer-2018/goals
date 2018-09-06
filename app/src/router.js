import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Goals from './components/Goals.vue';
import GoalsList from './components/GoalsList.vue';
import NewGoal from './components/NewGoal.vue';
import Auth from './components/Auth.vue';
import Users from './components/Users.vue';
import LogOut from './components/LogOut.vue';


export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
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
    { path: '/logout', component: LogOut },
    { path: '*', redirect: '/' }
  ]
});