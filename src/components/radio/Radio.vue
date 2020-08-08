<template>
  <span
    :class="cClass"
    :tabIndex="tabIndex"
    role="radio"
    aria-label="radio"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
  >
    <span class="panda-radio-base">
      <input
        type="radio"
        :name="name"
        :value="isChecked"
        :checked="isChecked"
        :disabled="isDisabled"
        @change="onCheck"
        @focus="onFocus"
        @blur="onBlur"
        ref="input"
        aria-hidden="true"
        tabIndex="-1"
      />
    </span>
    <span class="panda-radio-label" @click="onClick">
      <slot></slot>
    </span>
  </span>
</template>

<script>
import { findComponentUpward } from '../../utils';

export default {
  name: 'panda-radio',
  props: {
    name: String,
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    groupValue: {
      type: [String, Number],
    },
    disabled: Boolean,
    size: {
      type: String,
      default: 'normal',
      validator (val) {
        return ['normal', 'small'].includes(val);
      }
    },
  },
  data () {
    return {
      checked: false,
      inGroup: false,
      parent: findComponentUpward(this, 'panda-radio-group'),
    };
  },
  computed: {
    cClass () {
      return {
        'panda-radio': true,
        'panda-radio-checked': this.isChecked,
        'panda-radio-disabled': this.isDisabled,
        [`panda-radio-${this.cSize}`]: !!this.cSize,
      };
    },
    groupChecked () {
      return this.inGroup && this.parent && this.parent.value === this.groupValue;
    },
    isChecked () {
      return this.inGroup ? this.groupChecked : this.checked;
    },
    isDisabled () {
      return this.inGroup ? this.parent && this.parent.disabled || this.disabled : this.disabled;
    },
    cSize () {
      return this.inGroup ? this.parent && this.parent.size || this.size : this.size;
    },
    tabIndex () {
      return (this.isDisabled || (this.inGroup && !this.isChecked)) ? -1 : 0;
    },
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateChecked();
      } else {
        throw 'value should be true-value or false-value.';
      }
    }
  },
  mounted () {
    this.parent && this.parent.onChildAdd(this);
    this.updateChecked();
  },
  beforeDestroy () {
    this.parent && this.parent.onChildRemove(this);
  },
  methods: {
    updateChecked () {
      this.checked = this.value === this.trueValue;
    },
    onCheck (e) {
      if (this.isDisabled) return false;
      const { checked } = e.target;
      this.checked = checked;

      const value = checked ? this.trueValue : this.falseValue;
      this.$emit('input', value);

      if (this.inGroup) {
        this.parent && this.parent.onChildChange(this);
      } else {
        this.$emit('change', value);
      }
    },
    onClick () {
      this.$refs.input.click();
    },
    focus () {
      if (this.disabled) return;
      this.$refs.input.focus();
    },
    blur () {
      if (this.disabled) return;
      this.$refs.input.blur();
    },
    onFocus (e) {
      this.$emit('focus', e);
    },
    onBlur (e) {
      this.$emit('blur', e);
    },
  },
};
</script>
