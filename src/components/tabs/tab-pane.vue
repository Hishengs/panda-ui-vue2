<template>
  <div :class="cClass" v-show="active">
    <div class="panda-tab-pane-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { findComponentUpward } from '../../utils/comp';

export default {
  name: 'panda-tab-pane',
  props: {
    label: String,
    disabled: Boolean,
    name: String,
    icon: String,
    width: [String, Number],
    maxWidth: [String, Number]
  },
  data () {
    return {
      index: undefined,
      parent: findComponentUpward(this, 'panda-tabs'),
    };
  },
  computed: {
    active () {
      const { curValue } = this.parent;
      return (this.name && this.name === curValue) || curValue === this.index;
    },
    cClass () {
      return {
        'panda-tab-pane': true,
        'panda-tab-pane-active': this.active,
        'panda-tab-pane-disabled': this.disabled,
      };
    },
  },
  mounted () {
    this.$parent.onPaneAdd(this);
  },
  beforeDestroy () {
    this.$parent.onPaneRemove(this);
  },
};
</script>
