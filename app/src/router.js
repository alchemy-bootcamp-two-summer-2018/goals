import VueRouter from 'vue-router';
import Home from './components/Home';
import Auth from './components/Auth';
import Goals from './components/Goals';
// import GoalForm from './components/GoalForm';
import NewGoal from './components/NewGoal';
import Users from './components/Users';

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/auth', component: Auth },
    { path: '/goals', component: Goals },
    { path: '/goals/add', component: NewGoal },
    { path: '/users', component: Users },
    { path: '*', redirect: '/' }
  ]
});