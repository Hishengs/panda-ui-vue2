import { default as Drawer } from './index.vue';

Drawer.install = function (Vue) {
  Vue.component(Drawer.name, Drawer);
}

export default Drawer;