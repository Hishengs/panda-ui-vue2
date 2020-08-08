import './index.less';
import Radio from './Radio.vue';
import RadioGroup from './RadioGroup.vue';

Radio.install = function (Vue) {
  Vue.component(Radio.name, Radio);
  Vue.component(RadioGroup.name, RadioGroup);
};

export {
  Radio,
  RadioGroup,
};

export default Radio;
