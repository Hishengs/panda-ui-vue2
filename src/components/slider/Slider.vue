<template>
  <div
    class="panda-slider"
    role="slider"
    v-bind="ariaInfo"
  >
    <div
      class="panda-slider-track"
      :class="{ 'panda-slider-track-disabled': sliderDisabled }"
      @click="onSliderClick"
      ref="sliderTrack"
    >
      <div class="panda-slider-bar" :style="barStyle"></div>
      <slider-handle v-model="firstValue" ref="handle1"></slider-handle>
      <slider-handle v-model="secondValue" ref="handle2" v-if="range"></slider-handle>
      <template v-if="showStops">
        <div
          class="panda-slider-stop"
          v-for="(stop, key) in stops"
          :key="key"
          :style="getStopStyle(stop)"
        >
        </div>
      </template>
      <template v-if="markList.length > 0">
        <div>
          <div
            v-for="(item, key) in markList"
            :key="key"
            :style="getStopStyle(item.position)"
            class="panda-slider-stop panda-slider-marks-stop"
          >
          </div>
        </div>
        <div class="panda-slider-marks">
          <slider-marker
            v-for="(item, key) in markList"
            :key="key"
            :mark="item.mark"
            :style="getStopStyle(item.position)">
          </slider-marker>
        </div>
      </template>
    </div>
  </div>
</template>

<script type="text/babel">
  import SliderHandle from './handle.vue';
  import Emitter from '../../mixins/emitter';

  const SliderMarker = {
    name: 'panda-slider-marker',
    functional: true,
    props: {
      mark: {
        type: [String, Object]
      }
    },
    render() {
      let label = typeof this.mark === 'string' ? this.mark : this.mark.label;

      return (
        <div class="panda-slider-marks-text" style={ this.mark.style || {} }>
          { label }
        </div>
      );
    }
  };

  export default {
    name: 'panda-slider',
    components: {
      SliderHandle,
      SliderMarker
    },
    mixins: [Emitter],
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      value: {
        type: [Number, Array],
        default: 0
      },
      showStops: {
        type: Boolean,
        default: false
      },
      showTooltip: {
        type: Boolean,
        default: true
      },
      formatTooltip: Function,
      disabled: {
        type: Boolean,
        default: false
      },
      range: {
        type: Boolean,
        default: false
      },
      label: {
        type: String
      },
      marks: Object
    },
    data() {
      return {
        firstValue: null,
        secondValue: null,
        oldValue: null,
        dragging: false,
        sliderSize: 1,
      };
    },
    computed: {
      stops() {
        if (!this.showStops || this.min > this.max) return [];
        if (this.step === 0) {
          process.env.NODE_ENV !== 'production' &&
          console.warn('[KlookUI Warn][Slider]step should not be 0.');
          return [];
        }
        const stopCount = (this.max - this.min) / this.step;
        const stepWidth = 100 * this.step / (this.max - this.min);
        const result = [];
        for (let i = 1; i < stopCount; i++) {
          result.push(i * stepWidth);
        }
        if (this.range) {
          return result.filter(step => {
            return step < 100 * (this.minValue - this.min) / (this.max - this.min) ||
              step > 100 * (this.maxValue - this.min) / (this.max - this.min);
          });
        } else {
          return result.filter(step => step > 100 * (this.firstValue - this.min) / (this.max - this.min));
        }
      },
      markList() {
        if (!this.marks) {
          return [];
        }
        const marksKeys = Object.keys(this.marks);
        return marksKeys.map(parseFloat)
          .sort((a, b) => a - b)
          .filter(point => point <= this.max && point >= this.min)
          .map(point => ({
            point,
            position: (point - this.min) * 100 / (this.max - this.min),
            mark: this.marks[point]
          }));
      },
      minValue() {
        return Math.min(this.firstValue, this.secondValue);
      },
      maxValue() {
        return Math.max(this.firstValue, this.secondValue);
      },
      barSize() {
        return this.range
          ? `${ 100 * (this.maxValue - this.minValue) / (this.max - this.min) }%`
          : `${ 100 * (this.firstValue - this.min) / (this.max - this.min) }%`;
      },
      barStart() {
        return this.range
          ? `${ 100 * (this.minValue - this.min) / (this.max - this.min) }%`
          : '0%';
      },
      precision() {
        let precisions = [this.min, this.max, this.step].map(item => {
          let decimal = ('' + item).split('.')[1];
          return decimal ? decimal.length : 0;
        });
        return Math.max.apply(null, precisions);
      },
      barStyle() {
        return {
          width: this.barSize,
          left: this.barStart
        };
      },
      sliderDisabled() {
        return this.disabled;
      },
      ariaInfo () {
        const valuetext = this.range ? `${this.firstValue}-${this.secondValue}` : this.firstValue;
        // label screen reader
        const ariaLabel = this.label ? this.label : `slider between ${this.min} and ${this.max}`;
        return {
          'aria-valuemin': this.min,
          'aria-valuemax': this.max,
          'aria-disabled': this.sliderDisabled,
          'aria-valuetext': valuetext,
          'aria-label': ariaLabel,
        };
      },
    },
    watch: {
      value(val, oldVal) {
        if (this.dragging ||
          Array.isArray(val) &&
          Array.isArray(oldVal) &&
          val.every((item, index) => item === oldVal[index])) {
          return;
        }
        this.setValues();
      },
      dragging(val) {
        if (!val) {
          this.setValues();
        }
      },
      firstValue(val) {
        if (this.range) {
          this.$emit('input', [this.minValue, this.maxValue]);
        } else {
          this.$emit('input', val);
        }
      },
      secondValue() {
        if (this.range) {
          this.$emit('input', [this.minValue, this.maxValue]);
        }
      },
      min() {
        this.setValues();
      },
      max() {
        this.setValues();
      }
    },
    created () {
      if (this.range) {
        if (Array.isArray(this.value)) {
          this.firstValue = Math.max(this.min, this.value[0]);
          this.secondValue = Math.min(this.max, this.value[1]);
        } else {
          this.firstValue = this.min;
          this.secondValue = this.max;
        }
        this.oldValue = [this.firstValue, this.secondValue];
      } else {
        if (typeof this.value !== 'number' || isNaN(this.value)) {
          this.firstValue = this.min;
        } else {
          this.firstValue = Math.min(this.max, Math.max(this.min, this.value));
        }
        this.oldValue = this.firstValue;
      }
    },
    mounted() {
      this.resetSize();
      window.addEventListener('resize', this.resetSize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resetSize);
    },
    methods: {
      valueChanged() {
        if (this.range) {
          return ![this.minValue, this.maxValue]
            .every((item, index) => item === this.oldValue[index]);
        } else {
          return this.value !== this.oldValue;
        }
      },
      setValues() {
        if (this.min > this.max) {
          console.error('[KlookUI Error][Slider]min should not be greater than max.');
          return;
        }
        const val = this.value;
        if (this.range && Array.isArray(val)) {
          if (val[1] < this.min) {
            this.$emit('input', [this.min, this.min]);
          } else if (val[0] > this.max) {
            this.$emit('input', [this.max, this.max]);
          } else if (val[0] < this.min) {
            this.$emit('input', [this.min, val[1]]);
          } else if (val[1] > this.max) {
            this.$emit('input', [val[0], this.max]);
          } else {
            this.firstValue = val[0];
            this.secondValue = val[1];
            if (this.valueChanged()) {
              this.oldValue = val.slice();
            }
          }
        } else if (!this.range && typeof val === 'number' && !isNaN(val)) {
          if (val < this.min) {
            this.$emit('input', this.min);
          } else if (val > this.max) {
            this.$emit('input', this.max);
          } else {
            this.firstValue = val;
            if (this.valueChanged()) {
              this.oldValue = val;
            }
          }
        }
      },
      setPosition(percent) {
        if (!this.range) {
          this.$refs.handle1.setPosition(percent);
          return;
        }
        const targetValue = this.min + percent * (this.max - this.min) / 100;
        let button;
        if (Math.abs(this.minValue - targetValue) < Math.abs(this.maxValue - targetValue)) {
          button = this.firstValue < this.secondValue ? 'handle1' : 'handle2';
        } else {
          button = this.firstValue > this.secondValue ? 'handle1' : 'handle2';
        }
        this.$refs[button].setPosition(percent);
      },
      onSliderClick(event) {
        if (this.sliderDisabled || this.dragging) return;
        this.resetSize();
        const sliderOffsetLeft = this.$refs.sliderTrack.getBoundingClientRect().left;
        this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderSize * 100);
        this.emitChange();
      },
      resetSize() {
        if (this.$refs.sliderTrack) {
          this.sliderSize = this.$refs.sliderTrack['clientWidth'];
        }
      },
      emitChange() {
        this.$nextTick(() => {
          this.$emit('change', this.range ? [this.minValue, this.maxValue] : this.value);
        });
      },
      getStopStyle(position) {
        return { 'left': position + '%' };
      }
    },
  };
</script>
