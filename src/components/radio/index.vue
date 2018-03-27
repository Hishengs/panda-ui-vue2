<template>
  <span class="panda-radio" :class="cClass" @click.prevent="onCheck">
    <span class="panda-radio-wrapper">
      <input type="radio" :checked="value">
    </span>
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'panda-radio',
    props: {
      value: Boolean,
    },
    computed: {
      cClass (){
        return [
          this.value ? 'checked' : '',
        ].filter(cls => cls !== '').join(' ');
      },
    },
    methods: {
      onCheck (e){
        console.log('>>> panda-radio.onCheck', e);
        this.$emit('input', !this.value);
      }
    },
  };
</script>