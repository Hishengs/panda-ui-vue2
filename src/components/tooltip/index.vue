<template>
  <div class="panda-tooltip" ref="tooltip">
    <div class="panda-tooltip-reference" ref="reference">
      <slot></slot>
    </div>
    <div class="panda-tooltip-popper" ref="popper" v-show="show">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
  import Popper from 'popper.js';
  import { on, off } from '../../utils/dom.js';

  export default {
    name: 'panda-tooltip',
    props: {
      content: {
        type: String,
        default: ''
      },
      placement: {
        type: String,
        default: 'top',
        validator (val) {
          return [
            'top-start', 'top', 'top-end',
            'left-start', 'left', 'left-end',
            'right-start', 'right', 'right-end',
            'bottom-start', 'bottom', 'bottom-end'
          ].includes(val);
        },
      },
      trigger: {
        type: String,
        validator (val) {
          return ['hover', 'click'].includes(val);
        },
        default: 'hover'
      }
    },
    data () {
      return {
        show: true,
        popper: null,
      };
    },
    mounted () {
      this.popper = new Popper(this.$refs.reference, this.$refs.popper, {
        placement: this.placement
      });
      setTimeout(() => {
        this.show = false;
      }, 100);
      if (this.trigger === 'hover') {
        on(this.$refs.reference, 'mouseenter', this.onShow);
        on(this.$refs.reference, 'mouseleave', this.onHide);
      } else if (this.trigger === 'click') {
        on(this.$refs.reference, 'click', this.onShow);
        on(this.$refs.reference, 'click', this.onHide);
      }
    },
    beforeDestroy () {
      if (this.trigger === 'hover') {
        off(this.$refs.reference, 'mouseenter', this.onShow);
        off(this.$refs.reference, 'mouseleave', this.onHide);
      } else if (this.trigger === 'click') {
        off(this.$refs.reference, 'click', this.onShow);
        off(this.$refs.reference, 'click', this.onHide);
      }
    },
    methods: {
      onShow () {
        this.show = true;
      },
      onHide () {
        this.show = false;
      }
    },
  };
</script>