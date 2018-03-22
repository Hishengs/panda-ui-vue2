import Button from './components/button/index.js';

const components = {
  Button,
};

const install = function(Vue, options){
  const componentKeys = Object.keys(components);
  for(const key of componentKeys){
    Vue.component(key, components[key]);
  }
};

export default {
  install,
  ...components,
};