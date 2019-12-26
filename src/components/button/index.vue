<template>
  <button class="panda-button" :class="cClass" :disabled="disabled" :autofocus="autofocus" @click="onClick">
    <Icon v-if="!loading && icon" :name="icon"></Icon>
    <Icon v-else-if="loading" name="loader"></Icon>
    <slot></slot>
  </button>
</template>

<script>
  import Icon from '../icon';

  export default {
    name: 'Button',
    components: {
      Icon
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'default',
        validator: type => {
          return ['default', 'primary', 'success', 'info', 'warning', 'danger', 'text'].includes(type);
        },
      },
      size: {
        type: String,
        default: 'normal',
        validator: size => {
          return ['mini', 'small', 'normal', 'large'].includes(size);
        },
      },
      icon: String,
      round: Boolean,
      block: Boolean,
      loading: Boolean,
      autofocus: Boolean,
    },
    computed: {
      cClass (){
        return [
          this.type,
          this.size,
          this.disabled ? 'disabled' : '',
          this.round ? 'round' : '',
          this.block ? 'block' : '',
          this.loading ? 'loading' : '',
        ].filter(cls => cls !== '').join(' ');
      },
    },
    methods: {
      onClick (e){
        if (this.loading) return;
        this.$emit('click', e);
      },
    },
  };
</script>

