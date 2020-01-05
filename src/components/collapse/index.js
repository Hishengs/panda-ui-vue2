import { default as Collapse } from './index.vue';
import Panel from './panel.vue';

Collapse.install = function (Vue) {
  Vue.component(Collapse.name, Collapse);
  Vue.component(Panel.name, Panel);
}

export const CollapsePanel = Panel;
export default Collapse;