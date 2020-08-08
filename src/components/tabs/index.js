import Tabs from './index.vue';
import TabPane from './tab-pane.vue';

Tabs.install = function (Vue) {
  Vue.component(Tabs.name, Tabs);
  Vue.component(TabPane.name, TabPane);
};

export {
  Tabs,
  TabPane,
};

export default Tabs;