import Announcement from './index.vue';

Announcement.install = function (Vue) {
  Vue.component(Announcement.name, Announcement);
};

export {
  Announcement,
};

export default Announcement;