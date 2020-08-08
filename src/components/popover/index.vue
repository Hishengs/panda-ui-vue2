<template>
  <div
    ref="popover"
    v-click-outside="e => onClickOutside(e)"
    :class="cClass"
    :data-placement="placement"
  >
    <div
      ref="reference"
      class="panda-popover-reference"
      @click="onClick"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
      @mousedown="onFocus(false)"
      @mouseup="onBlur(false)"
    >
      <slot></slot>
    </div>
    <!-- <panda-fade-transition> -->
      <div
        v-show="showPopper && (!!title || $slots.title || !!content || $slots.content)"
        ref="popper"
        class="panda-popover-popper"
        :style="{
          zIndex: popperZIndex,
        }"
        @click.stop="() => {}"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
      >
        <div class="panda-popover-popper-inner">
          <div v-show="arrow" class="panda-popover-popper-arrow"></div>
          <Icon v-if="closable" class="panda-popover-popper-close-btn" name="x" @click.native="close"></Icon>
          <div class="panda-popover-popper-main" :style="mainStyle">
            <div v-if="title || $slots.title" class="panda-popover-popper-title">
              <slot name="title">{{ title }}</slot>
            </div>
            <div class="panda-popover-popper-content">
              <slot name="content">{{ content }}</slot>
            </div>
          </div>
        </div>
      </div>
    <!-- </panda-fade-transition> -->
  </div>
</template>

<script>
  import Vue from 'vue';
  import { createPopper } from '@popperjs/core';
  import { isServer } from '../../utils';
  import clickOutside from '../../directives/v-click-outside.js';
  import { on, off } from '../../utils/dom.js';
  import Icon from '../icon';
  // import Helpers from '../Helpers';

  // Vue.use(Helpers);

  let index = 1024;

  function getIndex () {
    return ++index;
  }

  export default {
    name: 'panda-popover',
    components: {
      Icon,
    },
    directives: { clickOutside },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
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
          return ['hover', 'click', 'focus', 'none'].includes(val);
        },
        default: 'hover'
      },
      offset: {
        type: Number,
        default: 10,
      },
      popperEl: Object,
      referenceEl: Object,
      disabled: Boolean,
      arrow: {
        type: Boolean,
        default: true
      },
      closable: Boolean,
      width: Number,
      maxWidth: {
        type: Number,
        default: 360,
      },
      height: Number,
      maxHeight: {
        type: Number,
        default: 152,
      },
      zIndex: Number,
      dark: Boolean,
      appendToBody: Boolean,
    },
    data () {
      return {
        showPopper: this.value,
        popperIns: null,
        // for focus trigger
        inputEl: null,
        popperZIndex: this.zIndex === undefined ? getIndex() : this.zIndex,
        popperClicked: false,
      };
    },
    computed: {
      cClass () {
        return {
          'panda-popover': true,
          'panda-popover-dark': this.dark,
          'panda-popover-closable': this.closable,
        };
      },
      mainStyle () {
        return {
          width: `${this.width}px`,
          maxWidth: `${this.maxWidth}px`,
          height: `${this.height - 24}px`,
          maxHeight: `${this.maxHeight - 24}px`,
        };
      },
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          this.showPopper = val;
          this.$emit('input', val);
        }
      },
      showPopper (show) {
        if (show) {
          this.updatePopper();
          this.$emit('show');
        } else {
          this.$emit('hide');
        }
        this.$emit('input', show);
      }
    },
    mounted () {
      this.initFocus();
    },
    updated (){
      this.$nextTick(() => this.updatePopper());
    },
    beforeDestroy () {
      if (this.inputEl) {
        off(this.inputEl, 'focus', this.onFocus);
        off(this.inputEl, 'blur', this.onBlur);
      }
      if (!isServer && this.popperIns) {
        this.popperIns.destroy();
        this.popperIns = null;
      }
      if (this.appendToBody) {
        const popperEl = this.getPopperEl();
        if (popperEl && popperEl.parentNode === document.body) {
          document.body.removeChild(popperEl);
        }
      }
    },
    methods: {
      updatePopper () {
        if (isServer) return;
        if (!this.popperIns) {
          this.createPopper();
        } else this.popperIns.update();
      },
      createPopper () {
        if (isServer) return;
        if (this.popperIns) return;
        const reference = this.referenceEl || this.$refs.reference;
        const popper = this.getPopperEl();
        if (!reference || !popper) return;
        if (this.appendToBody) document.body.appendChild(popper);
        const options = {
          placement: this.placement,
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: (/* { placement, reference, popper } */) => {
                  // 添加偏移
                  return [0, this.offset];
                },
              }
            },
            {
              name: 'flip',
              enabled: false,
            },
            {
              name: 'preventOverflow',
              enabled: false,
            }
          ],
        };
        this.popperIns = createPopper(reference, popper, options);
      },
      initFocus () {
        if (this.shouldResponse('focus')) {
          this.$nextTick(() => {
            const input = this.$refs.reference.querySelectorAll('input');
            const textarea = this.$refs.reference.querySelectorAll('textarea');
            this.inputEl = input ? input[0] : textarea ? textarea[0] : null;
            if (this.inputEl) {
              on(this.inputEl, 'focus', this.onFocus);
              on(this.inputEl, 'blur', this.onBlur);
            }
          });
        }
      },
      getPopperEl () {
        return this.popperEl || this.$refs.popper;
      },
      shouldResponse (trigger = '') {
        return !(isServer || this.disabled || this.trigger !== trigger);
      },
      onClick () {
        if (this.shouldResponse('click')) {
          this.showPopper = !this.showPopper;
        }
      },
      onClickOutside (e) {
        if (this.appendToBody) {
          const popperEl = this.getPopperEl();
          if (e && (e.target === popperEl || popperEl.contains(e.target))) {
            this.popperClicked = true;
          } else this.popperClicked = false;
        } else this.popperClicked = false;

        if (this.shouldResponse('click')) {
          this.close();
        }
      },
      onMouseenter () {
        if (this.shouldResponse('hover')) {
          this.open();
        }
      },
      onMouseleave () {
        if (this.shouldResponse('hover')) {
          this.close();
        }
      },
      onFocus (fromInput = true) {
        if (this.inputEl && !fromInput) return;
        if (this.shouldResponse('focus')) {
          this.open();
        }
      },
      onBlur (fromInput = true) {
        if (this.inputEl && !fromInput) return;
        if (this.shouldResponse('focus')) {
          this.close();
        }
      },
      open () {
        this.showPopper = true;
      },
      close () {
        if (this.appendToBody && this.popperClicked && ['click'].includes(this.trigger)) {
          return;
        }
        this.showPopper = false;
      }
    },
  };
</script>
