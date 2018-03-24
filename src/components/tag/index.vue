<template>
  <span class="panda-tag" :class="cClass" :style="cStyle">
    <!-- <div class="triangle-mark" v-if="triangle"></div> -->
    <slot></slot>
    <span class="closable-btn" v-if="closable" @click="onClose"></span>
  </span>
</template>

<script>
  export default {
    name: 'Tag',
    props: {
      type: {
        type: String,
        default: 'default',
        validator: type => {
          return ['default', 'dot'].includes(type);
        },
      },
      size: {
        type: String,
        default: 'normal',
        validator: size => {
          return ['mini', 'small', 'normal', 'large'].includes(size);
        },
      },
      color: {
        type: String,
        default: '',
      },
      closable: Boolean,
      triangle: Boolean,
      round: Boolean,
    },
    data (){
      return {
        builtInColors: {
          red: '#f5222d',
          orange: '#fa541c',
          yellow: '#f1c911',
          green: '#52c41a',
          cyan: '#13c2c2',
          blue: '#1890ff',
          purple: '#722ed1',
        },
      };
    },
    computed: {
      cClass (){
        return [
          this.type,
          this.closable ? 'closable' : '',
          this.triangle ? 'triangle' : '',
          this.round ? 'round' : '',
          this.builtInColors[this.color] ? this.color : '',
        ].filter(cls => cls !== '').join(' ');
      },
      cStyle (){
        const style = {};
        // compute color
        if(this.color){
          const bgColor = this.builtInColors[this.color] || this.color;
          style['backgroundColor'] = bgColor;
          style['borderColor'] = bgColor;
          style['color'] = 'white';
        }
        return style;
      },
    },
    methods: {
      onClose (e){
        console.log('>>> panda-tag@close');
        this.$emit('close', e);
      },
    },
  };
</script>

