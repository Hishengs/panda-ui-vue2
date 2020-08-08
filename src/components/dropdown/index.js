import '../../styles/components/dropdown.scss';
import Dropdown from './Dropdown.vue';
import DropdownMenu from './DropdownMenu.vue';
import DropdownItem from './DropdownItem.vue';

Dropdown.install = function (Vue) {
  Vue.component(Dropdown.name, Dropdown);
  Vue.component(DropdownMenu.name, DropdownMenu);
  Vue.component(DropdownItem.name, DropdownItem);
};

export {
  Dropdown,
  DropdownMenu,
  DropdownItem,
};

export default Dropdown;
