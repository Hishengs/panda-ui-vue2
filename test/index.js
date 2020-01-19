import Vue from 'vue';
import PandaUI from '../src/index.js';
import '../src/components/style/index.less';
import App from './App.vue';

Vue.use(PandaUI);

new Vue({
  el: '#app',
  render: h => h(App),
});