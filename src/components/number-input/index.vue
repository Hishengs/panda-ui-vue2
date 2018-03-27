<template>
  <span class="panda-number-input">
    <span class="panda-input-wrapper" :class="cClass">
      <input class="panda-input" :placeholder="placeholder" :disabled="disabled" :readonly="readonly || !editable" :value="value" @input="onUserInput" @keyup="onKeyup" />
      <Icon name="x" class="clear-btn" v-if="clearable" @click.native="clearValue"></Icon>
    </span>
    <div class="actions">
      <Icon name="chevron-up" @click.native="calculate(true)"></Icon>
      <Icon name="chevron-down" @click.native="calculate(false)"></Icon>
    </div>
  </span>
</template>

<script>
  import Icon from '../icon';
  import inputMixin from '../input/mixin.js';
  export default {
    name: 'panda-number-input',
    components: {
      Icon,
    },
    mixins: [inputMixin],
    props: {
      value: Number,
      min: {
        type: Number,
        default: Number.MIN_SAFE_INTEGER,
      },
      max: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER,
      },
      step: {
        type: Number,
        default: 1,
      },
      precision: Number,
      editable: {
        type: Boolean,
        default: true,
      }
    },
    methods: {
      calculate (add){
        if(this.disabled || this.readonly)return;
        console.log('>>> panda-number-input.calculate', add);
        this.updateValue(this.value + (add ? (this.step) : -(this.step)));
      },
      updateValue (newVal){
        if(newVal >= this.min && newVal <= this.max){
          if(this.precision){
            newVal = Number(newVal.toFixed(this.precision));
          }
          this.$emit('input', newVal);
          return true;
        }else return false;
      },
      onUserInput (e){
        console.log('>>> panda-number-input.onUserInput', e.target.value);
        const newVal = Number(e.target.value);
        if(newVal){
          if(!this.updateValue(newVal)){ // 如果更新不成功则将值重置回去
            e.target.value = this.value;
          } 
        }else {
          e.target.value = this.value;
        }
      },
      onKeyup (e){
        e.preventDefault();
        console.log('>>> panda-number-input.onUserInput', e);
        if(e.keyCode === 38){
          this.calculate(true);
        }
        if(e.keyCode === 40){
          this.calculate(false);
        }
      },
    },
  };
</script>