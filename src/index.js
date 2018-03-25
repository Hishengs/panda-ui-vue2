import Button from './components/button/index.js';
import Tag from './components/tag/index.js';
import Alert from './components/alert/index.js';
import Input from './components/input/index.js';

const components = {
  Button,
  Tag,
  Alert,
  Input,
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