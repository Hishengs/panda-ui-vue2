<template>
  <span class="panda-input-wrapper" :class="cClass">
    <input class="panda-input" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :value="value" @input="onValueUpdate" ref="input" />
    <Icon name="x" class="clear-btn" v-if="clearable" @click.native="clearValue"></Icon>
  </span>
</template>

<script>
  import inputMixin from './mixin.js';
  import Icon from '../icon';
  export default {
    name: 'panda-input',
    components: {
      Icon,
    },
    mixins: [inputMixin],
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

