<template>
  <div :class="cClass" :style="cStyle" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'pd-carousel-item',
  data () {
    return {
      translateX: 0,
      isVisible: true,
      isPrev: false,
      isCurrent: false,
      isNext: false,
      isAnimating: false,
    }
  },
  computed:{
    cClass () {
      return {
        'pd-carousel-item': true,
        'pd-carousel-item-unvisible': !this.isVisible,
        'pd-carousel-item-prev': this.isPrev,
        'pd-carousel-item-current': this.isCurrent,
        'pd-carousel-item-next': this.isNext,
        'pd-carousel-item-animating': this.isAnimating,
      };
    },
    cStyle () {
      return {
        transform: `translate(${this.translateX}px, 0)`
      };
    }
  },
  mounted () {
    this.$parent && this.$parent.addItem(this);
  },
  beforeDestroy () {
    this.$parent && this.$parent.removeItem(this);
  },
  methods: {
    onClick (e) {
      this.$emit('click', e);
    },
  }
}
</script>

