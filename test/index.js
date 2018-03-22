import panda from '../src/index.js';
import Vue from 'vue';
// import '../src/components/style/index.less';
import App from './App.vue';

Vue.use(panda);

new Vue({
  el: '#app',
  render: h => h(App),
});