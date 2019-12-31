<template>
  <div class="panda-drawer" :class="cClass" v-if="show" @click.self="onClickMask">
    <div class="panda-drawer-inner">
      <span class="close-btn" v-if="closable" @click="onClose">
        <Icon name="x" size="20"></Icon>
      </span>
      <div class="panda-drawer-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="panda-drawer-body">
        <slot></slot>
      </div>
      <div class="panda-drawer-footer" v-if="showFooter">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '../icon';

  export default {
    name: 'panda-drawer',
    components: {
      Icon,
    },
    props: {
      value: Boolean,
      position: {
        type: String,
        validator (pos) {
          return ['left', 'right'].includes(pos);
        },
        default: 'right'
      },
      closable: {
        type: Boolean,
        default: true,
      },
      maskClosable: {
        type: Boolean,
        default: true,
      },
      title: {
        type: String,
        default: '',
      },
    },
    data (){
      return {
        show: this.value,
        showFooter: false,
      };
    },
    watch: {
      show (isShow) {
        this.$emit('input', isShow);
      },
      value (val) {
        this.show = val;
      }
    },
    computed: {
      cClass (){
        return [
          this.closable ? 'closable' : '',
          this.position ? `fixed-${this.position}` : ''
        ].filter(cls => cls !== '').join(' ');
      },
    },
    mounted () {
      this.showFooter = !!this.$slots.footer;
    },
    methods: {
      onClose (e){
        console.log('>>> panda-drawer@close');
        this.$emit('close', e);
        this.show = false;
      },
      onClickMask () {
        if (!this.maskClosable) return;
        this.show = false;
      },
    },
  };
</script>
