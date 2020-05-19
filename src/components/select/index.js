import { default as Select } from './index.vue';
import { default as Option } from './option.vue';

Select.install = function (Vue) {
  Vue.component(Option.name, Option);
  Vue.component(Select.name, Select);
}

export default Select;

export {
  Select,
  Option,
};