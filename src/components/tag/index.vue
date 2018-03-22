<template>
  <button class="panda-tag" :class="cClass">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'Tag',
    props: {
      type: {
        type: String,
        default: 'default',
        validator: type => {
          return ['default', 'dot'].includes(type);
        },
      },
      size: {
        type: String,
        default: 'normal',
        validator: size => {
          return ['mini', 'small', 'normal', 'large'].includes(size);
        },
      },
      closable: Boolean,
    },
    computed: {
      cClass (){
        return [
          this.type,
          this.closable ? 'closable' : '',
        ].filter(cls => cls !== '').join(' ');
      },
    },
    methods: {
      onClose (e){
        this.$emit('close', e);
      },
    },
  };
</script>

