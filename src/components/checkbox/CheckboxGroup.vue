<template>
  <div :class="cClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'panda-checkbox-group',
  props: {
    value: Array,
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
      children: [],
    };
  },
  computed: {
    cClass () {
      return {
        'panda-checkbox-group': true,
        'panda-checkbox-group-disabled': this.disabled,
        [`panda-checkbox-group-${this.size}`]: !!this.size,
      };
    },
  },
  methods: {
    onChildAdd (child) {
      child.inGroup = true;
      this.children.push(child);
    },
    onChildRemove (child) {
      const index = this.children.indexOf(child);
      if (index !== -1) {
        this.children.splice(index, 1);
      }
    },
    onChildChange (child) {
      const index = this.value.indexOf(child.groupValue);
      const newVal = index !== -1 ? this.value.filter(val => val !== child.groupValue) : [...this.value, child.groupValue];
      this.$emit('input', newVal);
      this.$emit('change', newVal);
    }
  }
};
</script>
