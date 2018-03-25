<template>
  <input class="panda-input" :class="cClass" :disabled="disabled" :value="value" @input="onValueUpdate" />
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
    },
  };
</script>

