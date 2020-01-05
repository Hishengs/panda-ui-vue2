<template>
  <div class="panda-collapse">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'panda-collapse',
    props: {
      value: {
        type: [String, Number, Array],
      },
      // 手风琴模式
      accordion: Boolean,
    },
    data () {
      return {};
    },
    mounted () {
      const panels = (this.$slots.default || []).map(p => p.componentInstance);
      for (const panel of panels) {
        panel.collapsed = (this.value === null || this.value === undefined)
          ? true
          : Array.isArray(this.value)
            ? !this.value.includes(panel.value)
            : this.value !== panel.value;

        panel.$on('collapsed', (collapsed) => {
          let val;
          if (Array.isArray(this.value)) {
            val = panels.filter(p => !p.collapsed).map(p => p.value);
          } else {
            if (!collapsed) {
              val = panel.value;
            }
          }
          if (val !== undefined) {
            this.$emit('input', val);
            this.$emit('change', val);
          }
          // 手风琴模式将其他 panel 收起
          if (!collapsed && this.accordion) {
            for (const pl of panels) {
              if (pl !== panel) pl.collapsed = true;
            }
          }
        });
      }
    },
  };
</script>
