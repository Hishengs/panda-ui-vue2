<template>
  <li class="panda-option" :class="cClass" @click="onClick" v-show="show">
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'panda-option',
    props: {
      value: {
        type: [String, Number],
        default: null,
      },
      label: String,
      disabled: Boolean,
    },
    data () {
      return {
        selected: false,
        show: true,
      };
    },
    computed: {
      cClass () {
        return [
          this.selected ? 'selected' : '',
        ].filter(cls => cls !== '').join(' ');
      },
    },
    methods: {
      onClick (/* e */) {
        if (this.disabled || this.$parent.disabled) {
          return;
        }
        this.$parent.onOptionClick(this.value, this.label);
      },
      onParentValueChange (value) {
        if (Array.isArray(value)) {
          this.selected = value.includes(this.value);
        } else this.selected = value === this.value;
      },
      onParentSearch (value) {
        this.show = (this.label && this.label.includes(value)) || (this.value && this.value.includes(value));
      },
    },
  };
</script>

