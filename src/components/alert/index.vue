<template>
  <div class="panda-alert">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'panda-alert',
    props: {
      type: {
        type: String,
        default: 'info',
        validator: type => {
          return ['info', 'success', 'warning', 'error'].includes(type);
        },
      },
      closable: Boolean,
    },
  };
</script>
