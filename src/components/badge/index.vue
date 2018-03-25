<template>
  <span class="panda-badge" :class="cClass" :style="cStyle">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'badge',
    props: {
      type: {
        type: String,
        default: 'default',
        validator: type => {
          return ['default', 'dot'].includes(type);
        },
      },
      /*size: {
        type: String,
        default: 'default',
        validator: size => {
          return ['mini', 'small', 'default', 'large'].includes(size);
        },
      },*/
      color: {
        type: String,
        default: '',
      },
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
  };
</script>

