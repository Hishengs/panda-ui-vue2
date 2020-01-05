<template>
  <div class="panda-divider" :class="cClass">
    <div class="panda-divider_content" v-if="showContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'panda-divider',
    props: {
      align: {
        type: String,
        validator (val) {
          return ['left', 'center', 'right'].includes(val);
        },
        default: 'center'
      },
      dashed: Boolean,
    },
    data () {
      return {
        showContent: true,
      };
    },
    computed: {
      cClass () {
        return {
          [this.align]: true,
          dashed: this.dashed
        };
      }
    },
    mounted () {
      this.showContent = this.$slots.default !== undefined;
    }
  };
</script>
