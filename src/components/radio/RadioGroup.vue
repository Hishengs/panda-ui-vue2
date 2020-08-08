<template>
  <div :class="cClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'panda-radio-group',
  props: {
    value: {
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
      children: [],
    };
  },
  computed: {
    cClass () {
      return {
        'panda-radio-group': true,
        'panda-radio-group-disabled': this.disabled,
        [`panda-radio-group-${this.size}`]: !!this.size,
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
      this.$emit('input', child.groupValue);
      this.$emit('change', child.groupValue);
    }
  }
};
</script>
