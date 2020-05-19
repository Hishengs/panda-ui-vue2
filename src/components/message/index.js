import Vue from 'vue';
import Message from './index.vue';

const MessageCtr = Vue.extend(Message);

let nid = 0;
const instances = [];

let messageTrack;
function createTrack () {
  if (messageTrack) return;
  /* global document */
  messageTrack = document.createElement('div');
  messageTrack.className = 'panda-message-track';
  const styles = {
    position: 'fixed',
    top: '0',
    right: 'calc(50% - 160px)',
    width: '320px',
    padding: '20px',
    overflow: 'auto',
    zIndex: '9999',
    display: 'flex',
    flexDirection: 'column-reverse',
  };
  for (const key of Object.keys(styles)) {
    messageTrack.style[key] = styles[key];
  }
  document.body.appendChild(messageTrack);
}

const defaultOpt = {
  duration: 2 * 1000,
  type: 'default',
  title: '',
  content: ''
};
function message (options) {
  options = Object.assign({}, defaultOpt, options);
  if (!options.content) return null;
  const messageIns = new MessageCtr({
    propsData: {
      value: true,
      title: options.title,
      content: options.content,
    }
  });
  messageIns.$mount();
  messageIns.id = ++nid;
  instances.push(messageIns);
  messageIns.$el.className += ` panda-message-${nid}`;
  if (!messageTrack) createTrack();
  messageTrack.insertBefore(messageIns.$el, messageTrack.firstChild);
  messageIns.$on('close', () => {
    message.close(messageIns);
  });
  // auto close
  if (options.duration > 0) {
    setTimeout(() => {
      message.close(messageIns);
    }, options.duration);
  }
  return messageIns;
}
message.close = function (messageIns) {
  if (!(messageIns instanceof MessageCtr)) return;
  const index = instances.indexOf(messageIns);
  if (index === -1) return;
  instances.splice(index, 1);
  messageTrack.removeChild(messageIns.$el);
};

export default {
  install (_Vue) {
    _Vue.prototype.$message = message;
  }
};