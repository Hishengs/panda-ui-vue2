import { default as Icon } from './index.vue';

Icon.install = function (Vue) {
  Vue.component(Icon.name, Icon);
}

export default Icon;