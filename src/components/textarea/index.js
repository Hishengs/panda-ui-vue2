import { default as Textarea } from './index.vue';

Textarea.install = function (Vue) {
  Vue.component(Textarea.name, Textarea);
}

export default Textarea;