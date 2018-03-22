<template>
  <button class="panda-button" :class="cClass" :disabled="disabled" @click="onclick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'default',
        validator: type => {
          return ['default', 'primary', 'success', 'info', 'warning', 'error', 'text'].includes(type);
        },
      },
      size: {
        type: String,
        default: 'normal',
        validator: size => {
          return ['mini', 'small', 'normal', 'large'].includes(size);
        },
      },
      round: Boolean,
      block: Boolean,
      loading: Boolean,
    },
    computed: {
      cClass (){
        return [
          this.type,
          this.disabled ? 'disabled' : '',
          this.round ? 'round' : '',
          this.block ? 'block' : '',
          this.loading ? 'loading' : '',
        ].filter(cls => cls !== '').join(' ');
      },
    },
    methods: {
      onclick (e){
        this.$emit('click', e);
      },
    },
    watch: {
      disabled (val){
        console.log('>>> disabled <<<', val);
      },
    },
  };
</script>

