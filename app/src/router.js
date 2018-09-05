
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Auth from './components/Auth.vue';
import Quadrants from './components/Quadrants.vue';
import QuadrantDetail from './components/QuadrantDetail.vue';
import NeighborhoodsList from './components/NeighborhoodsList.vue';
import NeighborhoodsMap from './components/NeighborhoodsMap.vue';
import NewNeighborhood from './components/NewNeighborhood.vue';
import Goals from './components/Goals.vue';
import GoalsList from './components/GoalsList.vue';
import NewGoal from './components/NewGoal.vue';
import Users from './components/Users.vue';

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/quadrants', component: Quadrants },
    { path: '/auth', component: Auth },
    { 
      path: '/quadrants/:id', 
      component: QuadrantDetail,
      children: [
        { path: 'list', component: NeighborhoodsList },
        { path: 'map', component: NeighborhoodsMap },
        { path: 'new', component: NewNeighborhood },
        { path: '', redirect: 'list' }
      ]
    },
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