<template>
  <div class="panda-tooltip" ref="tooltip">
    <slot></slot>
    <div class="panda-tooltip-content" ref="content" v-show="show" :style="cStyle">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
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
    mounted () {
      // set style
      this.$refs.tooltip.addEventListener('mouseenter', (/* e */) => {
        this.show = true;
        if (!this.styleSet) {
          this.$nextTick(() => {
            this.setStyle();
          });
        }
      });
      this.$refs.tooltip.addEventListener('mouseleave', (/* e */) => {
        this.show = false;
      });
    },
    methods: {
      setStyle () {
        if (this.styleSet) return;
        this.styleSet = true;
        /* global window */
        const contentStyle = window.getComputedStyle(this.$refs.content);
        if (contentStyle) {
          const { height, borderTopWidth, paddingTop, width, borderLeftWidth, paddingLeft } = contentStyle;
          console.log({ height, borderTopWidth, paddingTop, width, borderLeftWidth, paddingLeft });
          this.contentHeight = parseFloat(height) + parseFloat(borderTopWidth) + parseFloat(paddingTop) + 10;
          this.contentWidth = parseFloat(width) + parseFloat(borderLeftWidth) + parseFloat(paddingLeft);
        }
        console.log('>>> style set', this);
      }
    },
  };
</script>