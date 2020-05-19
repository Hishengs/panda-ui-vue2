<template>
  <div class="panda-tab" v-show="active">
    <slot>{{ content }}</slot>
  </div>
</template>

<script>
  export default {
    name: 'panda-tab',
    props: {
      disabled: Boolean,
      name: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
    },
    data () {
      return {
        active: false,
      };
    }
  };
</script>