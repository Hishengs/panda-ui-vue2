<template>
  <textarea class="panda-textarea" :class="cClass" :style="cStyle" :rows="cRows" v-model="val" :disabled="disabled" :autofocus="autofocus" @input="onEnter"></textarea>
</template>

<script>
  export default {
    name: 'panda-textarea',
    props: {
      value: String,
      disabled: {
        type: Boolean,
        default: false,
      },
      minRows: Number,
      maxRows: Number,
      rows: Number,
      autosize: Boolean,
      autofocus: Boolean,
    },
    computed: {
      cClass (){
        return [
          this.disabled ? 'disabled' : '',
        ].filter(cls => cls !== '').join(' ');
      },
      cRows (){
        return this.minRows ? (
          this.rows ? (
            this.minRows < this.rows ? this.rows : this.minRows
          ) : this.minRows
        ) : (this.rows || 2);
      },
    },
    data (){
      return {
        val: this.value,
        heightPerRow: 19,
        cStyle: {
          width: '100%',
        },
      };
    },
    watch: {
      val (newVal){
        console.log('>>> panda-textarea.watch val', newVal);
        this.$emit('input', newVal);
        this.resize();
      }
    },
    mounted (){
      //
    },
    methods: {
      onEnter (e){
        console.log('>>> panda-textarea.methods onEnter', e);
        this.resize();
      },
      resize (){
        console.log('>>> panda-textarea.methods resize');
        const currentRows = this.val.split('\n').length;
        if(this.autosize){
          this.cStyle.height = this.heightPerRow * currentRows + 'px';
          return;
        }
        if(this.minRows && this.maxRows && this.minRows <= this.maxRows){
          if(currentRows >= this.minRows && currentRows <= this.maxRows){
            this.cStyle.height = this.heightPerRow * currentRows + 'px';
          }else if(currentRows < this.minRows){
            this.cStyle.height = this.heightPerRow * this.minRows + 'px';
          }else if(currentRows > this.maxRows){
            this.cStyle.height = this.heightPerRow * this.maxRows + 'px';
          }
        }else if(this.minRows && !this.maxRows){
          console.log('x1');
          if(currentRows >= this.minRows){
            console.log('x11');
            this.cStyle.height = this.heightPerRow * currentRows + 'px';
          }else {
            this.cStyle.height = this.heightPerRow * this.minRows + 'px';
            console.log('x12', this.minRows, this.cStyle);
          }
        }else if(!this.minRows && this.maxRows){
          if(currentRows <= this.maxRows){
            this.cStyle.height = this.heightPerRow * currentRows + 'px';
          }else {
            this.cStyle.height = this.heightPerRow * this.maxRows + 'px';
          }
        }
      },
    },
  };
</script>