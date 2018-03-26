<template>
  <span class="panda-input-wrapper">
    <input class="panda-input" :class="cClass" :placeholder="placeholder" :disabled="disabled" :value="value" @input="onValueUpdate" ref="input" />
    <Icon name="x" class="clear-btn" v-if="clearable" @click.native="clearValue"></Icon>
  </span>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'default',
        validator: type => {
          return ['default', 'primary', 'success', 'info', 'warning', 'danger', 'text'].includes(type);
        },
      },
      size: {
        type: String,
        default: 'normal',
        validator: size => {
          return ['mini', 'small', 'normal', 'large'].includes(size);
        },
      },
      value: {
        type: String,
      },
      placeholder: {
        type: String,
      },
      clearable: Boolean,
    },
    computed: {
      cClass (){
        return [
          this.type,
          this.size,
          this.disabled ? 'disabled' : '',
        ].filter(cls => cls !== '').join(' ');
      },
    },
    // watch: {
    //   value (newVal){
    //     console.log('>>> panda-input.watch value: ', newVal);
    //   },
    // },
    methods: {
      onValueUpdate (e){
        const newVal = e.target.value;
        // console.log('>>> panda-input.onValueUpdate value: ', newVal);
        this.$emit('input', newVal);
      },
      clearValue (){
        this.$emit('input', '');
        this.$refs.input.value = '';
      },
    },
  };
</script>

