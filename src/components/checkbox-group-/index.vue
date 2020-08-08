<template>
  <span class="panda-checkbox-group">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'panda-checkbox-group',
    props: {
      value: {
        type: Array,
        default: () => [],
      },
      disabled: Boolean,
    },
    mounted () {
      if (this.$children && this.$children.length) {
        this.$children.forEach(checkbox => {
          checkbox.isGroup = true;
          checkbox.onGroupValueChange(this.value);
        });
      }
    },
    methods: {
      onChildValueChange (childValue, checked) {
        const index = this.value.indexOf(childValue);
        if (checked) {
          if (index === -1) {
            this.value.push(childValue);
          }
        } else {
          if (index !== -1) {
            this.value.splice(index, 1);
          }
        }
        this.$emit('change', this.value);
        console.log('>>> panda-radio-group.onChange', this.value);
      },
    },
  };
</script>

