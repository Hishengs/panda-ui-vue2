<template>
  <div class="panda-tooltip-wrapper" ref="wrapper" style="display: inline-block;">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Tooltip from './tooltip.vue';
  import { on, off } from '../../utils/index.js';

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
        validator (p) {
          return [
            'top-left', 'top', 'top-right',
            'left-top', 'left', 'left-bottom',
            'right-top', 'right', 'right-bottom',
            'bottom-left', 'bottom', 'bottom-right'
          ].includes(p);
        },
      },
    },
    data () {
      return {
        show: false,
        tooltip: null,
        contentHeight: 40,
        contentWidth: 100,
        styleSet: false,
      };
    },
    computed: {
      cStyle () {
        return {
          'top-left': {
            top: `-${this.contentHeight}px`,
            left: 0,
          },
          /* eslint-disable quote-props */
          'top': {
            top: `-${this.contentHeight}px`,
            left: '50%',
            marginLeft: `-${this.contentWidth / 2}px`
          },
          'top-right': {
            top: `-${this.contentHeight}px`,
            right: 0
          },
          'left-top': {
            top: 0,
            left: `-${this.contentWidth}px`
          },
          'left': {
            top: '50%',
            marginTop: `-${this.contentHeight / 2}px`,
            left: `-${this.contentWidth}px`
          },
          'left-bottom': {
            bottom: 0,
            left: `-${this.contentWidth}px`
          },
          'right-top': {
            top: 0,
            right: `-${this.contentWidth}px`
          },
          'right': {
            top: '50%',
            marginTop: `-${this.contentHeight / 2}px`,
            right: `-${this.contentWidth}px`
          },
          'right-bottom': {
            bottom: 0,
            right: `-${this.contentWidth}px`
          },
          'bottom-left': {
            bottom: `-${this.contentHeight}px`,
            left: 0,
          },
          'bottom': {
            bottom: `-${this.contentHeight}px`,
            left: '50%',
            marginLeft: `-${this.contentWidth / 2}px`
          },
          'bottom-right': {
            bottom: `-${this.contentHeight}px`,
            right: 0,
          },
        }[this.placement];
      }
    },
    created () {
      this.createTooltip();
    },
    mounted () {
      on(this.$refs.wrapper, 'mouseenter', this.onShow);
      on(this.$refs.wrapper, 'mouseleave', this.onHide);
    },
    beforeDestroy () {
      off(this.$refs.wrapper, 'mouseenter', this.onShow);
      off(this.$refs.wrapper, 'mouseleave', this.onHide);
    },
    methods: {
      createTooltip () {
        if (this.tooltip) return;
        this.tooltip = new (Vue.extend(Tooltip))({
          propsData: {
            content: this.content,
            value: this.show,
          }
        }).$mount();
        /* global document */
        document.body.appendChild(this.tooltip.$el);
      },
      onShow () {
        this.show = true;
        console.log('>> onShow', this.show, this.tooltip);
      },
      onHide () {
        this.show = false;
        console.log('>> onHide', this.show);
      },
    },
  };
</script>