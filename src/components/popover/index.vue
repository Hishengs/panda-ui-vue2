<template>
  <div class="panda-popover" ref="popover" :class="cClass">
    <div class="panda-popover-reference" ref="reference">
      <slot></slot>
    </div>
    <div class="panda-popover-popper" ref="popper" v-show="show">
      <div class="panda-popover-popper-inner">
        <div class="panda-popover-popper-arrow"></div>
        <div class="panda-popover-popper-title" v-if="title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="panda-popover-popper-content">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { createPopper } from '@popperjs/core';
  import { on, off } from '../../utils/index.js';

  export default {
    name: 'panda-popover',
    props: {
      title: {
        type: String,
        default: ''
      },
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
    computed: {
      cClass () {
        return {
          [`placement-${this.placement}`]: true
        };
      }
    },
    mounted () {
      this.popper = createPopper(this.$refs.reference, this.$refs.popper, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: ({ placement, reference, popper }) => {
                // 添加间距
                return [0, 10];
              },
            }
          }
        ]
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