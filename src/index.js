import Vue from 'vue';
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
import Table from './components/table/new/index.js';
import Modal from './components/modal/index.js';
import Notice from './components/notice/index.js';
import Drawer from './components/drawer/index.js';
import Divider from './components/divider/index.js';
import { default as Collapse, CollapsePanel } from './components/collapse/index.js';
import Message from './components/message/index.js';
import Tooltip from './components/tooltip/index.js';
import Popover from './components/popover/index.js';

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
  Modal,
  Drawer,
  Divider,
  Collapse,
  CollapsePanel,
  Tooltip,
  Popover,
};

Vue.use(Notice);
Vue.use(Message);

function install(Vue) {
  const componentKeys = Object.keys(components);
  for (const key of componentKeys) {
    Vue.component(key, components[key]);
  }
}

export default {
  install,
  ...components,
};
