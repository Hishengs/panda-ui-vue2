<template>
  <div class="panda-message" :class="cClass" v-if="show">
    <div class="icon">
      <Icon name="info" size="16" color="#1890ff"></Icon>
    </div>
    <div class="panda-message-body">
      <slot>
        {{ content }}
      </slot>
    </div>
    <span class="close-btn" v-if="closable" @click="onClose">
      <Icon name="x" size="16"></Icon>
    </span>
  </div>
</template>

<script>
  import Icon from '../icon';

  export default {
    name: 'panda-message',
    components: {
      Icon,
    },
    props: {
      value: Boolean,
      closable: {
        type: Boolean,
        default: false,
      },
      content: {
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
        console.log('>>> panda-message@close');
        this.$emit('close', e);
        this.show = false;
      },
    },
  };
</script>
