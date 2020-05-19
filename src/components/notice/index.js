import Vue from 'vue';
import Notice from './index.vue';

const NoticeCtr = Vue.extend(Notice);

let nid = 0;
const instances = [];

let noticeTrack;
function createTrack () {
  if (noticeTrack) return;
  /* global document */
  noticeTrack = document.createElement('div');
  noticeTrack.className = 'panda-notice-track';
  const styles = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    padding: '20px',
    overflow: 'auto',
    zIndex: '9999',
    display: 'flex',
    flexDirection: 'column-reverse',
  };
  for (const key of Object.keys(styles)) {
    noticeTrack.style[key] = styles[key];
  }
  document.body.appendChild(noticeTrack);
}

const defaultOpt = {
  duration: 5 * 1000,
  type: 'default',
  title: '',
  content: ''
};
function notify (options) {
  options = Object.assign({}, defaultOpt, options);
  if (!options.content) return null;
  const noticeIns = new NoticeCtr({
    propsData: {
      value: true,
      title: options.title,
      content: options.content,
    }
  });
  noticeIns.$mount();
  noticeIns.id = ++nid;
  instances.push(noticeIns);
  noticeIns.$el.className += ` panda-notice-${nid}`;
  if (!noticeTrack) createTrack();
  noticeTrack.insertBefore(noticeIns.$el, noticeTrack.firstChild);
  noticeIns.$on('close', () => {
    notify.close(noticeIns);
  });
  // auto close
  if (options.duration > 0) {
    setTimeout(() => {
      notify.close(noticeIns);
    }, options.duration);
  }
  return noticeIns;
}
notify.close = function (noticeIns) {
  if (!(noticeIns instanceof NoticeCtr)) return;
  const index = instances.indexOf(noticeIns);
  if (index === -1) return;
  instances.splice(index, 1);
  noticeTrack.removeChild(noticeIns.$el);
};

export default {
  install (_Vue) {
    _Vue.prototype.$notify = notify;
  }
};