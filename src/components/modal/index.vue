<template>
  <div class="panda-modal" :class="cClass" v-if="show" @click.self="onClickMask">
    <div class="panda-modal-inner">
      <div class="panda-modal-header">
        <h3>{{ title }}</h3>
        <span class="close-btn" v-if="closable" @click="onClose">
          <Icon name="x" size="20"></Icon>
        </span>
      </div>
      <div class="panda-modal-body">
        <slot></slot>
      </div>
      <div class="panda-modal-footer" v-if="showFooter">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '../icon';

  export default {
    name: 'panda-modal',
    components: {
      Icon,
    },
    props: {
      value: Boolean,
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
        ].filter(cls => cls !== '').join(' ');
      },
    },
    mounted () {
      this.showFooter = !!this.$slots.footer;
    },
    methods: {
      onClose (e){
        console.log('>>> panda-modal@close');
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
