import Vue from 'vue';
import Router from 'vue-router';
import Login from '../layouts/Login';
import Home from '../pages/Home';
import RatingMessage from '../components/RatingMessage';
import Report from '../components/Report';
import Today from '../components/Today';
import Settings from '../components/Settings';
import Sidebar from '../layouts/Sidebar';
// import authGuard from './navigationGuards';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/ratingMessage',
      name: 'ratingMessage',
      component: RatingMessage,
    },
    {
      path: '/sidebar',
      name: 'sidebar',
      // beforeEnter: authGuard,
      component: Sidebar,
      children: [
        {
          path: '/today',
          name: 'today',
          component: Today,
        },
        {
          path: '/report',
          name: 'report',
          component: Report,
        },
        {
          path: '/settings',
          name: 'settings',
          component: Settings,
        },
      ],
    },
  ],
});
