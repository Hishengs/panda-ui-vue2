import { default as Divider } from './index.vue';

Divider.install = function (Vue) {
  Vue.component(Divider.name, Divider);
}

export default Divider;