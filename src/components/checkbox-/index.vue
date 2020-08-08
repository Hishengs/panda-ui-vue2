<template>
  <span class="panda-checkbox" :class="cClass" @click="onClick">
    <input type="checkbox" :name="name" :disabled="isDisabled" :checked="checked" @change="onChange" ref="input">
    <span class="panda-checkbox-inner">
      <Icon name="check" v-if="checked" color="white"></Icon>
    </span>
    <slot></slot>
  </span>
</template>

<script>
  import Icon from '../icon';

  export default {
    name: 'panda-checkbox',
    components: {
      Icon,
    },
    props: {
      name: String,
      value: {
        type: [String, Boolean, Number],
        default: null,
      },
      disabled: Boolean,
    },
    data () {
      return {
        checked: this.value,
        isGroup: false,
      };
    },
    watch: {
      value (checked) {
        if (!this.isGroup) {
          this.checked = checked;
        }
      }
    },
    computed: {
      cClass () {
        return [
          this.checked ? 'checked' : '',
          this.isDisabled ? 'disabled' : '',
        ].filter(cls => cls !== '').join(' ');
      },
      isDisabled () {
        return this.isGroup ? this.$parent.disabled : this.disabled;
      },
    },
    methods: {
      onGroupValueChange (groupValue) {
        if (this.isGroup) {
          this.checked = groupValue.includes(this.value);
        }
      },
      onChange (e) {
        if (this.isDisabled) {
          return;
        }
        const { checked } = this.$refs.input;
        // console.log('>>> panda-radio.onChange', e, checked);
        if (this.isGroup) {
          this.$parent.onChildValueChange(this.value, checked);
        } else {
          this.$emit('input', checked);
          this.$emit('change', e);
        }
        this.checked = checked;
      },
      onClick (/* e */) {
        if (this.isDisabled) {
          return;
        }
        if (this.$refs.input) {
          this.$refs.input.click();
        }
      },
    },
  };
</script>

