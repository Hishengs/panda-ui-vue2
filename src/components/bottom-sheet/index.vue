<template>
  <div :class="cClass" :style="cStyle" v-show="!actuallyHide">
    <div class="panda-bottom-sheet-mask" @click.self.stop="onMaskClick"></div>
    <div ref="inner" class="panda-bottom-sheet-inner" :style="innerStyle">
      <div class="panda-bottom-sheet-header" v-if="showHeader">
        <slot name="header">
          <div class="panda-bottom-sheet-header-left" v-if="showClose || !!$slots['header-left']">
            <slot name="header-left">
              <Icon
                v-if="showClose"
                class="panda-bottom-sheet-close-btn"
                name="x"
                size="24"
                @click.native="hide"
              ></Icon>
            </slot>
          </div>
          <div class="panda-bottom-sheet-header-title" v-if="title || !!$slots['header-title']">
            <slot name="header-title">
              <h1>{{ title }}</h1>
            </slot>
          </div>
          <div class="panda-bottom-sheet-header-right" v-if="!!$slots['header-right']">
            <slot name="header-right"></slot>
          </div>
        </slot>
      </div>
      <div class="panda-bottom-sheet-body">
        <slot></slot>
      </div>
      <div class="panda-bottom-sheet-footer" v-if="!!$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import _once from 'lodash/once';
import Icon from '../icon';
import { isServer } from '../../utils';
import { on, off, lockOuterScroll, unlockOuterScroll } from '../../utils/dom';
import Touch from '../../utils/touch';

let index = 1000;
function getIndex () {
  return index++;
}

const ANIMATION_TIME = 350;

export default {
  name: 'panda-bottom-sheet',
  components: {
    Icon,
  },
  props: {
    visible: Boolean,
    title: String,
    showClose: Boolean,
    maskClosable: {
      type: Boolean,
      default: true
    },
    canPullClose: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      show: this.visible,
      actuallyHide: !this.visible,
      zIndex: getIndex(),
      transformY: 0,
      touch: null,
    };
  },
  computed: {
    swiping () {
      return this.touch && this.touch.swiping;
    },
    cClass () {
      return {
        'panda-bottom-sheet': true,
        'panda-bottom-sheet-hidden': !this.show,
        'panda-bottom-sheet-swiping': this.swiping,
      };
    },
    cStyle () {
      return {
        zIndex: this.zIndex,
      };
    },
    innerStyle () {
      return {
        transform: this.show ? `translateY(${this.transformY}px)` : 'translateY(100%)'
      };
    },
    showHeader () {
      return !!this.title
        || this.showClose
        || !!this.$slots.header
        || !!this.$slots['header-left']
        || !!this.$slots['header-title']
        || !!this.$slots['header-right'];
    },
  },
  watch: {
    visible (val) {
      if (val) {
        this.actuallyHide = false;
        setTimeout(() => {
          this.show = true;
        }, 0);
      } else {
        this.show = false;
        setTimeout(() => {
          this.actuallyHide = true;
        }, ANIMATION_TIME);
      }
    },
    show (val) {
      this.$emit('update:visible', val);
      if (val) {
        this.$nextTick(this.bindSwipe);
        lockOuterScroll(this.$refs.inner, false);
      } else {
        unlockOuterScroll(this.$refs.inner, false);
      }
    }
  },
  mounted () {
    this.touch = new Touch(this.$el, true);
    this.bindSwipe = _once(this.bindSwipe);
  },
  beforeDestroy () {
    this.unbindSwipe();
  },
  methods: {
    bindSwipe () {
      // no need to bind if unvisible
      if (!this.$refs.inner || !this.show) return;
      on(this.$refs.inner, 'touchstart', this.onSwipeStart);
      on(this.$refs.inner, 'touchmove', this.onSwiping);
      on(this.$refs.inner, 'touchend', this.onSwipeEnd);
      on(this.$refs.inner, 'touchcancel', this.onSwipeCancel);
    },
    unbindSwipe () {
      if (!this.$refs.inner) return;
      off(this.$refs.inner, 'touchstart', this.onSwipeStart);
      off(this.$refs.inner, 'touchmove', this.onSwiping);
      off(this.$refs.inner, 'touchend', this.onSwipeEnd);
      off(this.$refs.inner, 'touchcancel', this.onSwipeCancel);
    },
    onMaskClick () {
      if (!this.maskClosable) return;
      this.hide();
    },
    hide () {
      this.show = false;
      this.$emit('close');
    },
    onSwipeStart (e) {
      this.touch.touchstart(e);
    },
    onSwiping (e) {
      this.touch.touchmove(e);

      const { scrollableEl, scrollableElInfo, swipeDistance } = this.touch;

      const scrollable = !!scrollableEl;
      const { atTop, atBottom } = scrollableElInfo;
      if (swipeDistance > 0) {
        if (this.canPullClose && (!scrollable || atTop)) {
          this.transformY = swipeDistance;
        }
      }

      const shouldPrevent = !this.$refs.inner.contains(e.target) || !scrollable
        || scrollable && atTop && swipeDistance > 0
        || scrollable && atBottom && swipeDistance < 0;

      if (e.cancelable && shouldPrevent) {
        e.preventDefault();
      }
    },
    onSwipeEnd (e) {
      const transformY = this.transformY;
      if (transformY <= 0) {
        this.onSwipeCancel(e);
        return;
      }
      if (this.canPullClose) {
        const { clientHeight } = this.$refs.inner;
        const speedEnough = (transformY / (Date.now() - this.touch.swipeStartTime)) >= 0.8;
        const distanceEnough = transformY >= clientHeight / 2;
        if (speedEnough || distanceEnough) {
          this.$nextTick(this.hide);
        }
      }
      this.onSwipeCancel(e);
    },
    onSwipeCancel (e) {
      this.transformY = 0;
      this.touch.touchcancel(e);
    },
  }
}
</script>
