<template>
  <div
    class="panda-popover"
    ref="popover"
    :class="cClass"
    :data-placement="placement"
    v-click-outside="onClickOutside"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <div
      class="panda-popover-reference"
      ref="reference"
      @click="onClick"
      @mousedown="onFocus(false)"
      @mouseup="onBlur(false)"
    >
      <slot></slot>
    </div>
    <div class="panda-popover-popper" ref="popper" v-show="showPopper">
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
  import Vue from 'vue';
  import { createPopper } from '@popperjs/core';
  import clickOutside from '../../utils/directives/click-outside.js';
  import { on, off } from '../../utils/dom.js';

  const isServer = Vue.prototype.$isServer;

  export default {
    name: 'panda-popover',
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
          return ['hover', 'click', 'focus'].includes(val);
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
    },
    directives: { clickOutside },
    data () {
      return {
        showPopper: false,
        popperIns: null,
        // for focus trigger
        inputEl: null,
      };
    },
    computed: {
      cClass () {
        return {};
      }
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
          this.update();
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
      this.$nextTick(() => this.update());
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
    },
    methods: {
      update () {
        if (isServer) return;
        if (!this.popperIns) {
          this.createPopper();
        }
        this.popperIns.update();
      },
      createPopper () {
        if (isServer) return;
        if (this.popperIns) return;
        const reference = this.referenceEl || this.$refs.reference;
        const popper = this.popperEl || this.$refs.popper;
        if (!reference || !popper) return;
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
            }
          ],
          strategy: 'fixed'
        };
        this.popperIns = createPopper(reference, popper, options);
        // console.log('>>> createPopper', this.popperIns);
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
      shouldResponse (trigger = '') {
        return !(isServer || this.disabled || this.trigger !== trigger);
      },
      onClick () {
        if (this.shouldResponse('click')) {
          this.showPopper = !this.showPopper;
        }
      },
      onClickOutside () {
        if (this.shouldResponse('click')) {
          this.showPopper = false;
        }
      },
      onMouseenter () {
        if (this.shouldResponse('hover')) {
          this.showPopper = true;
        }
      },
      onMouseleave () {
        if (this.shouldResponse('hover')) {
          this.showPopper = false;
        }
      },
      onFocus (fromInput = true) {
        if (this.inputEl && !fromInput) return;
        if (this.shouldResponse('focus')) {
          this.showPopper = true;
        }
      },
      onBlur (fromInput = true) {
        if (this.inputEl && !fromInput) return;
        if (this.shouldResponse('focus')) {
          this.showPopper = false;
        }
      },
    },
  };
</script>