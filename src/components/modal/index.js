import { default as Modal } from './index.vue';

Modal.install = function (Vue) {
  Vue.component(Modal.name, Modal);
}

export default Modal;