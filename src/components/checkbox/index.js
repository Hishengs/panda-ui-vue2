// import './checkbox.less';
import Checkbox from './Checkbox.vue';
import CheckboxGroup from './CheckboxGroup.vue';

Checkbox.install = function (Vue) {
  Vue.component(Checkbox.name, Checkbox);
  Vue.component(CheckboxGroup.name, CheckboxGroup);
};

export {
  Checkbox,
  CheckboxGroup,
};

export default Checkbox;
