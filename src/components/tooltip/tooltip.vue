<template>
  <div class="panda-tooltip" v-show="show">
    <slot>{{ this.content }}</slot>
  </div>
</template>

<script>
  export default {
    name: 'panda-tooltip',
    props: {
      content: String,
      value: Boolean,
    },
    data () {
      return {
        show: this.value
      };
    }
  };
</script>

<style lang="less">
.panda-tooltip {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  color: white;
  background-color: rgba(0, 0, 0, .85);
  padding: 5px 10px;
  border-radius: 3px;
}
</style>