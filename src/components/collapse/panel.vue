<template>
  <div class="panda-collapse-panel" :class="cClass">
    <div class="panda-collapse-panel_header">
      <Icon :name="collapsed ? 'chevron-right' : 'chevron-down'" @click.native="onCollapse"></Icon>
      <slot name="title">
        <h5>{{ title }}</h5>
      </slot>
    </div>
    <div class="panda-collapse-panel_content" v-show="!collapsed">
      <slot>
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script>
  import Icon from '../icon';

  export default {
    name: 'panda-collapse-panel',
    components: {
      Icon,
    },
    props: {
      title: String,
      content: String,
      value: [String, Number]
    },
    data () {
      return {
        collapsed: false,
      };
    },
    computed: {
      cClass () {
        return {
          collapsed: this.collapsed,
        };
      },
    },
    methods: {
      onCollapse () {
        this.collapsed = !this.collapsed;
        this.$emit('collapsed', this.collapsed);
      },
    }
  };
</script>
