<template>
  <span class="panda-switch" :class="cClass" @click="onClick">
    <span class="panda-switch-circle"></span>
  </span>
</template>

<script>
  export default {
    name: 'panda-switch',
    props: {
      value: Boolean,
      disabled: Boolean,
      size: {
        type: String,
        validator: size => {
          return ['mini', 'small', 'normal', 'default', 'large'].includes(size);
        },
        default: 'default',
      },
    },
    computed: {
      cClass () {
        return [
          this.size,
          this.value ? 'checked' : '',
          this.disabled ? 'disabled' : '',
        ].filter(cls => cls !== '').join(' ');
      },
    },
    methods: {
      onClick (e) {
        if (this.disabled) {
          return;
        }
        const newValue = !this.value;
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      }
    },
  };
</script>

