import { default as TagInput } from './index.vue';

TagInput.install = function (Vue) {
  Vue.component(TagInput.name, TagInput);
}

export default TagInput;