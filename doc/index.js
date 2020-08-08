import Vue from 'vue';
import PandaUI from '../src/index.js';
import './markdown.css';
import '../src/components/style/index.less';
import App from './app.vue';
import CodeView from './code-view.vue';
import DemoView from './demo-view.vue';
import router from './router.js';

Vue.use(PandaUI);
Vue.component(CodeView.name, CodeView);
Vue.component(DemoView.name, DemoView);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
});