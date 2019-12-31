<template>
  <span class="panda-tag" :class="cClass" :style="cStyle" v-if="show">
    <!-- <div class="triangle-mark" v-if="triangle"></div> -->
    <span class="text">
      <slot></slot>
    </span>
    <!-- <span class="closable-btn" v-if="closable" @click="onClose"></span> -->
    <Icon name="x" class="closable-btn" v-if="closable" @click.native="onClose"></Icon>
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
        default: 'default',
        validator: size => {
          return ['mini', 'small', 'default', 'large'].includes(size);
        },
      },
      color: {
        type: String,
        default: '',
      },
      closable: Boolean,
      triangle: Boolean,
      // 三角形指向
      triangleDirection: {
        type: String,
        default: 'left',
        validator: direction => {
          return ['left', 'top', 'right', 'bottom'].includes(direction);
        },
      },
      round: Boolean,
    },
    data (){
      return {
        show: true,
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
          this.triangle && this.triangleDirection ? ('triangle-' + this.triangleDirection) : '',
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
        this.show = false;
        this.$emit('close', e);
      },
    },
  };
</script>

