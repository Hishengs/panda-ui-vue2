import { default as NumberInput } from './index.vue';

NumberInput.install = function (Vue) {
  Vue.component(NumberInput.name, NumberInput);
}

export default NumberInput;