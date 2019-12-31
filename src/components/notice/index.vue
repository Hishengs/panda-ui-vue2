<template>
  <div class="panda-notice" :class="cClass" v-if="show">
    <div class="panda-notice-inner">
      <div class="panda-notice-header" v-if="title">
        <h3>{{ title }}</h3>
      </div>
      <span class="close-btn" v-if="closable" @click="onClose">
        <Icon name="x" size="20"></Icon>
      </span>
      <div class="panda-notice-body">
        <slot>
          {{ content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '../icon';

  export default {
    name: 'panda-notice',
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
        console.log('>>> panda-notice@close');
        this.$emit('close', e);
        this.show = false;
      },
    },
  };
</script>
