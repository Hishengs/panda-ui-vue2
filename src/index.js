import Icon from './components/icon/index.js';
import Button from './components/button/index.js';
import Tag from './components/tag/index.js';
import Badge from './components/badge/index.js';
import Alert from './components/alert/index.js';
import Input from './components/input/index.js';
import Textarea from './components/textarea/index.js';

const components = {
  Icon,
  Button,
  Tag,
  Badge,
  Alert,
  Input,
  Textarea,
};

console.log(components);

const install = function(Vue, options){
  const componentKeys = Object.keys(components);
  for(const key of componentKeys){
    console.log('>>> key: ', key);
    Vue.component(key, components[key]);
  }
};

export default {
  install,
  ...components,
};