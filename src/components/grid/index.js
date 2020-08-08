import Row from './row.vue';
import Col from './col.vue';

const Grid = {};

Grid.install = function (Vue) {
  Vue.component(Row.name, Row);
  Vue.component(Col.name, Col);
};

export default Grid;