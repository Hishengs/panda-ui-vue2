import './carousel.less';
import Carousel from './carousel.vue';
import CarouselItem from './carousel-item.vue';

Carousel.install = function (Vue) {
  Vue.component(Carousel.name, Carousel);
  Vue.component(CarouselItem.name, CarouselItem);
}

export {
  Carousel,
  CarouselItem
};

export default Carousel;
