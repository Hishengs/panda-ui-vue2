import Icon from './components/icon/index.js';
import Button from './components/button/index.js';
import Tag from './components/tag/index.js';
import Badge from './components/badge/index.js';
import Alert from './components/alert/index.js';
import Input from './components/input/index.js';
import NumberInput from './components/number-input/index.js';
import { Select, Option } from './components/select/index.js';
import Textarea from './components/textarea/index.js';
import Radio from './components/radio/index.js';
import Checkbox from './components/checkbox/index.js';
import CheckboxGroup from './components/checkbox-group/index.js';
import Switch from './components/switch/index.js';
import Slider from './components/slider/index.js';
import TagInput from './components/tag-input/index.js';
import Table from './components/table/index.js';

const components = {
  Icon,
  Button,
  Tag,
  Badge,
  Alert,
  Input,
  NumberInput,
  iSelect: Select,
  iOption: Option,
  Textarea,
  Radio,
  Checkbox,
  CheckboxGroup,
  iSwitch: Switch,
  Slider,
  TagInput,
  Table,
};

console.log(components);

function install(Vue) {
  const componentKeys = Object.keys(components);
  for (const key of componentKeys) {
    console.log('>>> key: ', key);
    Vue.component(key, components[key]);
  }
}

export default {
  install,
  ...components,
};
