<template>
  <div class="panda-slider" ref="slider">
    <div class="panda-slider-inner" :style="innerStyle">
      <span class="panda-slider-handler" ref="handler"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'panda-slider',
    props: {
      value: Number,
      default: 0,
    },
    data () {
      return {
        sliderWidth: this.value,
        percentOnePixel: 0,
        track: false,
        lastPageX: 0,
        offset: 0,
      };
    },
    computed: {
      innerStyle () {
        return {
          width: `${this.value}%`,
        };
      },
    },
    watch: {
      offset (newOffset) {
        const newValue = this.value + (newOffset * this.percentOnePixel);
        if (newValue < 0) {
          this.$emit('input', 0);
        } else if (newValue > 100) {
          this.$emit('input', 100);
        } else this.$emit('input', newValue);
      },
    },
    mounted () {
      this.calculateSliderWidth();
      /* global document */
      document.addEventListener('mousedown', this.onMouseDown);
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
    },
    beforeDestroy () {
      document.removeEventListener('mousedown', this.onMouseDown);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);
    },
    methods: {
      calculateSliderWidth () {
        /* global window */
        const { width } = window.getComputedStyle(this.$refs.slider);
        this.sliderWidth = parseFloat(width, 10);
        this.percentOnePixel = 100 / this.sliderWidth;
      },
      onMouseDown (e) {
        if (e.target === this.$refs.handler) {
          console.log('>>> panda-slider.onMouseDown', e);
          this.lastPageX = e.pageX;
          this.track = true;
        } else this.track = false;
      },
      onMouseUp (e) {
        if (this.track) {
          console.log('>>> panda-slider.onMouseUp', e);
          this.track = false;
        }
      },
      onMouseMove (e) {
        if (this.track) {
          this.offset = e.pageX - this.lastPageX;
          this.lastPageX = e.pageX;
          console.log('>>> panda-slider.onMouseMove', e, this.offset, this.lastPageX);
        } else {
          this.lastPageX = 0;
          this.offset = 0;
        }
      },
    },
  };
</script>

