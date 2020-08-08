import BottomSheet from './index.vue';

BottomSheet.install = function (Vue) {
  Vue.component(BottomSheet.name, BottomSheet);
};

export {
  BottomSheet,
};

export default BottomSheet;