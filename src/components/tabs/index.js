import { default as Tabs } from './index.vue';
import { default as Tab } from './tab.vue';

Tabs.install = function (Vue) {
  Vue.component(Tab.name, Tab);
  Vue.component(Tabs.name, Tabs);
};

export {
  Tabs,
  Tab,
};

export default Tabs;