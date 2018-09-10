import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Auth from './components/Auth.vue';
import GoalsList from './components/GoalsList.vue';
import About from './components/About.vue';

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/auth', component: Auth },
    { path: '/goals', component: GoalsList },
    { path: '/about', component: About },
    { path: '*', redirect: '/' }
  ]
});