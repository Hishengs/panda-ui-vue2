<template>
  <div class="panda-tabs">
    <div class="panda-tabs-header" v-if="tabs.length">
      <div
        class="panda-tab-header"
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ active: selected === tab.name, disabled: tab.disabled }"
        @click="onSelect(tab)"
      >{{ tab.name }}</div>
    </div>
    <div class="panda-tabs-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'panda-tabs',
    props: {
      type: {
        type: String,
        validator (val) {
          return ['normal', 'card'].includes(val);
        },
        default: 'normal'
      },
    },
    data () {
      return {
        selected: null,
        tabs: [],
      };
    },
    mounted () {
      if (this.$slots.default && Array.isArray(this.$slots.default) && this.$slots.default.length) {
        this.tabs = this.$slots.default.map(vnode => {
          const tab = vnode.componentInstance;
          const { name, disabled } = tab;
          return {
            name,
            disabled,
          };
        });
        this.onSelect(this.tabs[0]);
      }
    },
    methods: {
      onSelect (tab) {
        if (tab.disabled) return;
        this.selected = tab.name;
        for (const t of this.$slots.default) {
          const tab = t.componentInstance;
          if (tab.name === this.selected) {
            tab.active = true;
          } else {
            tab.active = false;
          }
        }
      }
    }
  };
</script>