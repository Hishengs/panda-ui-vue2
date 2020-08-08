<template>
  <div :class="cClass" :style="cStyle">
    <!-- prev -->
    <div
      @click="onPrev"
      v-if="!hideControllers"
      v-show="showPrevBtn"
      :class="prevCls"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot name="prev" :disabled="prevDisabled">
        <button class="pd-carousel-prev-btn">
          <Icon type="chevron-left" :size="20"></Icon>
        </button>
      </slot>
    </div>
    <!-- items wrapper -->
    <div class="pd-carousel-items-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <!-- items -->
      <div class="pd-carousel-items" ref="items" :style="itemsStyle">
        <slot></slot>
      </div>
    </div>
    <!-- next -->
    <div
      @click="onNext"
      v-if="!hideControllers"
      v-show="showNextBtn"
      :class="nextCls"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot name="next" :disabled="nextDisabled">
        <button class="pd-carousel-next-btn">
          <Icon type="chevron-right" :size="20"></Icon>
        </button>
      </slot>
    </div>
    <!-- indicators -->
    <div class="pd-carousel-indicators" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" v-if="showIndicators">
      <slot name="indicators" :items="items" :current="currentIndex">
        <span
          class="pd-carousel-indicator"
          :class="{
            'pd-carousel-indicator-active': currentIndex === i
          }"
          v-for="(item, i) in items"
          :key="i"
          @click="onIndicatorClick(i)"
          @mouseenter="onIndicatorHover(i)"
        ></span>
      </slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Icon from '../icon';
import { on, off } from '../../utils/dom';
import _debounce from 'lodash/debounce';
import _throttle from 'lodash/throttle';

const prefixCls = 'pd-carousel';

export default {
  name: "pd-carousel",
  components: {
    Icon,
  },
  props: {
    active: {
      type: Number,
      default: 0,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    // 自动切换间隔
    autoplayInterval: {
      type: Number,
      default: 5000,
      validator (val) {
        return val >= 0;
      }
    },
    indicatorsOutside: Boolean,
    // 指示器触发方式
    indicatorsTrigger: {
      type: String,
      default: 'click',
      validator (val) {
        return ['click', 'hover', 'none'].includes(val);
      },
    },
    hideIndicators: Boolean,
    controllersOutside: {
      type: Boolean,
      default: true,
    },
    hideControllers: Boolean,
    size: {
      type: String,
      default: 'normal',
      validator (val) {
        return ['normal', 'small'].includes(val);
      },
    },
    width: {
      type: [Number, String],
      default: '',
    },
    height: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      currentIndex: this.active,
      items: [],
      translateX: 0,
      clientWidth: 0,
      scrollWidth: 0,
      autoplayTimer: null,
      isHovering: false,
      // mobile swipe support
      swiping: false,
      pageX: 0,
      swipeDistance: 0,
      // current arrow direction
      ctrlDirection: 'next',
    };
  },
  computed: {
    cClass () {
      return {
        'pd-carousel': true,
        [`pd-carousel-${this.size}`]: !!this.size,
        'pd-carousel-indicators-outside': this.indicatorsOutside,
        'pd-carousel-controllers-outside': this.controllersOutside,
        'pd-carousel-swiping': this.swiping,
      };
    },
    cStyle () {
      return {
        height: typeof this.height === 'string' ? this.height : `${this.height}px`,
        width: typeof this.width === 'string' ? this.width : `${this.width}px`,
      };
    },
    itemsStyle () {
      const translateX = -(this.translateX - this.swipeDistance);
      return {
        transform: `translateX(${translateX}px)`,
      };
    },
    prevCls() {
      return {
        [`${prefixCls}-prev`]: true,
        [`${prefixCls}-prev-disabled`]: this.prevDisabled
      };
    },
    nextCls() {
      return {
        [`${prefixCls}-next`]: true,
        [`${prefixCls}-next-disabled`]: this.nextDisabled
      };
    },
    showPrevBtn () {
      return !this.prevDisabled && this.items.length > 1;
    },
    showNextBtn () {
      return !this.nextDisabled && this.items.length > 1;
    },
    nextDisabled() {
      return this.loop
        ? false
        : this.currentIndex === this.items.length - 1;
    },
    prevDisabled() {
      return this.loop
        ? false
        : this.currentIndex === 0;
    },
    showIndicators () {
      return !this.hideIndicators && this.items.length > 1;
    },
  },
  watch: {
    active (val) {
      this.slideTo(val);
    },
    autoplay (val) {
      if (val) {
        this.startAutoplay();
      } else this.stopAutoplay();
    },
    currentIndex (index, oldIndex) {
      this.setItemsTranslate(index, oldIndex);
      this.$emit('change', index);
      this.$emit('update:active', index);
    }
  },
  mounted () {
    on(this.$el, 'touchstart', this.onSwipeStart);
    on(this.$el, 'touchmove', this.onSwiping);
    on(this.$el, 'touchend', this.onSwipeEnd);
    on(this.$el, 'touchcancel', this.onSwipeCancel);

    setTimeout(() => {
      this.updateWidth();
      this.setItemsTranslate(this.currentIndex, this.currentIndex);
    }, 0);

    if (this.autoplay) {
      this.startAutoplay();
    }
  },
  beforeDestroy () {
    off(this.$el, 'touchstart', this.onSwipeStart);
    off(this.$el, 'touchmove', this.onSwiping);
    off(this.$el, 'touchend', this.onSwipeEnd);
    off(this.$el, 'touchcancel', this.onSwipeCancel);

    if (this.autoplay) {
      this.stopAutoplay();
    }
  },
  methods: {
    getTranslate (index, newIndex) {
      const len = this.items.length;
      const item = this.items[index];
      const { offsetLeft: itemOffsetLeft } = item.$el
      if (newIndex === index) {
        return -itemOffsetLeft;
      } else {
        const onLeft = -(itemOffsetLeft + (newIndex - index) * this.clientWidth);
        const onRight = -(itemOffsetLeft - (index - newIndex) * this.clientWidth);
        // fix: 只有两项的时候切换存在问题
        if (len === 2) {
          return this.ctrlDirection === 'next' ? onLeft : onRight;
        }
        if (newIndex === 0) {
          return index === len - 1
            ? -itemOffsetLeft - this.clientWidth
            : index < newIndex
              ? onLeft
              : onRight;
        } else if (newIndex === len - 1) {
          return index === 0
            ? -itemOffsetLeft + this.clientWidth
            : index < newIndex
              ? onLeft
              : onRight;
        } else {
          return index < newIndex
            ? onLeft
            : onRight;
        }
      }
    },
    getPrevIndex (index) {
      const len = this.items.length;
      const prevIndex = index - 1;
      return prevIndex < 0
        ? this.loop
          ? len - 1
          : 0
        : prevIndex;
    },
    getNextIndex (index) {
      const len = this.items.length;
      const nextIndex = index + 1;
      return nextIndex > len - 1
        ? this.loop
          ? 0
          : len - 1
        : nextIndex;
    },
    setItemsTranslate (newIndex, oldIndex) {
      const len = this.items.length;

      for (let [index, item] of Object.entries(this.items)) {
        index = Number(index);
        item.isAnimating = (index === newIndex) || (index === oldIndex);
        item.isCurrent = index === newIndex;
        item.isPrev = this.loop
          ? (newIndex === 0 ? index === len - 1 : newIndex - 1 === index)
          : index === newIndex - 1;
        item.isNext = this.loop
          ? (newIndex === len - 1 ? index === 0 : newIndex + 1 === index)
          : index === newIndex + 1;

        const isItemOverTranslate = !(oldIndex === 0 && newIndex === len - 1 || oldIndex === len - 1 && newIndex === 0)
          && (index === len - 1 && index === this.getPrevIndex(oldIndex) || index === 0 && index === this.getNextIndex(oldIndex))
          && Math.abs(newIndex - oldIndex) > 1;

        // set item unvisible when slide over Carousel
        // TODO: this is not a good solution
        if (isItemOverTranslate) {
          item.isVisible = false;
          setTimeout(() => {
            item.isVisible = true;
          }, 500);
        }

        const translateX = this.getTranslate(index, newIndex);
        this.$nextTick(() => {
          item.translateX = translateX;
        });
      }
    },
    startAutoplay () {
      if (!this.autoplay) return;
      // clear previous timer
      this.stopAutoplay();
      this.autoplayTimer = setInterval(this.next, this.autoplayInterval);
    },
    stopAutoplay () {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    },
    setIndex (index) {
      const len = this.items.length;
      if (index < 0) {
        this.currentIndex = this.loop ? len - 1 : 0;
      } else if (index > len - 1) {
        this.currentIndex = this.loop ? 0 : len - 1;
      } else this.currentIndex = index;
    },
    onPrev: _throttle(function () {
      this.prev();
    }, 300),
    prev () {
      if (this.prevDisabled) return;
      this.ctrlDirection = 'prev';
      this.setIndex(this.currentIndex - 1);
    },
    onNext: _throttle(function () {
      this.next();
    }, 300),
    next () {
      if (this.nextDisabled) return;
      this.ctrlDirection = 'next';
      this.setIndex(this.currentIndex + 1);
    },
    slideTo (index) {
      if (typeof index !== 'number') return;
      if (!(index >= 0 && index < this.items.length)) return;
      if (this.currentIndex === index) return;
      this.setIndex(index);
    },
    onMouseEnter () {
      this.isHovering = true;
      this.stopAutoplay();
    },
    onMouseLeave () {
      this.isHovering = false;
      this.startAutoplay();
    },
    onIndicatorClick (i) {
      if (this.currentIndex === i || this.indicatorsTrigger !== 'click') return;
      this.slideTo(i);
    },
    onIndicatorHover (i) {
      if (this.currentIndex === i || this.indicatorsTrigger !== 'hover') return;
      this.slideTo(i);
    },
    addItem (item) {
      this.items.push(item);
      this.$nextTick(this.updateWidth);
    },
    removeItem (item) {
      const index = this.items.indexOf(item);
      if (index >= 0) {
        this.items.splice(index, 1);
      }
      this.$nextTick(this.updateWidth);
    },
    updateWidth () {
      if (!this.$refs.items) return;
      const { clientWidth, scrollWidth } = this.$refs.items;
      this.clientWidth = clientWidth;
      this.scrollWidth = scrollWidth;
    },
    onSwipeStart (e) {
      this.swiping = true;
      this.swipeDistance = 0;
      const touche = e.targetTouches[0];
      const { pageX } = touche;
      this.pageX = pageX;
      this.stopAutoplay();
    },
    onSwiping (e) {
      e.preventDefault();
      const touche = e.targetTouches[0];
      const { pageX } = touche;
      this.swipeDistance = pageX - this.pageX;
      // console.log('>>> onSwiping', pageX, this.pageX, this.swipeDistance);
    },
    onSwipeEnd (e) {
      const swipeDistance = this.swipeDistance;
      // trigger next or prev when swipe over half width
      if (this.clientWidth/2 <= Math.abs(swipeDistance)) {
        // console.info('>>> onSwipeEnd.should slide', swipeDistance);
        this.$nextTick(() => {
          if (swipeDistance > 0) {
            this.prev();
          } else this.next();
        });
      }
      this.onSwipeCancel(e);
    },
    onSwipeCancel (e) {
      // reset
      this.swiping = false;
      this.swipeDistance = 0;
      this.pageX = 0;
      this.startAutoplay();
    }
  }
};
</script>
