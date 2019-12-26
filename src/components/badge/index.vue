<template>
  <div class="panda-badge" :class="cClass">
    <slot></slot>
    <span class="panda-badge-content" @click="onClick">{{ value }}</span>
  </div>
</template>

<script>
  export default {
    name: 'badge',
    props: {
      value: [Number, String],
      type: {
        type: String,
        default: 'default',
        validator: type => {
          return ['default', 'dot'].includes(type);
        },
      },
      /*size: {
        type: String,
        default: 'default',
        validator: size => {
          return ['mini', 'small', 'default', 'large'].includes(size);
        },
      },*/
      color: {
        type: String,
        default: '',
      },
    },
    computed: {
      cClass () {
        return [
          this.$slots.default ? 'has-slot' : 'no-slot',
          this.type,
          this.color ? this.color : '',
        ].filter(cls => cls !== '').join(' ');
      }
    },
    methods: {
      onClick (e) {
        this.$emit('click', e);
      }
    },
  };
</script>

