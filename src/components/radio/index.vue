<template>
  <span class="panda-radio" :class="cClass" @click.prevent="onCheck">
    <span class="panda-radio-wrapper">
      <input type="radio" :name="name" :checked="checked" :disabled="disabled">
    </span>
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'panda-radio',
    props: {
      name: String,
      value: {
        type: [String, Boolean, Number],
        default: null,
      },
      label: {
        type: [String, Boolean, Number],
        default: null,
      },
      disabled: Boolean,
    },
    computed: {
      checked (){
        return this.value && this.label && (this.value === this.label);
      },
      cClass (){
        return [
          this.checked ? 'checked' : '',
          this.disabled ? 'disabled' : '',
        ].filter(cls => cls !== '').join(' ');
      },
    },
    methods: {
      onCheck (e) {
        if (this.disabled) {
          return;
        }
        console.log('>>> panda-radio.onCheck', e, this.value, this.label);
        if (this.label && !(this.checked)) {
          this.$emit('input', this.label);
        }
      }
    },
  };
</script>