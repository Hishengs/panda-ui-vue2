import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const r = require.context('./docs', true, /\.md$/);

const routes = r.keys().map(k => {
  return {
    path: k.slice(k.lastIndexOf('/'), -3),
    component: r(k).default,
  };
});

console.log('>>> routes', routes);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/intro',
    },
    ...routes,
  ],
});