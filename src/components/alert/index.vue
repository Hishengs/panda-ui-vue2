<template>
  <div class="panda-alert" :class="cClass" v-if="show">
    <h5 class="title" v-if="title">
      {{ title }}
    </h5>
    <slot></slot>
    <span class="closable-btn" v-if="closable" @click="onClose"></span>
  </div>
</template>

<script>
  export default {
    name: 'panda-alert',
    props: {
      type: {
        type: String,
        default: 'info',
        validator: type => {
          return ['info', 'success', 'warning', 'danger'].includes(type);
        },
      },
      closable: Boolean,
      title: {
        type: String,
        default: '',
      },
    },
    data (){
      return {
        show: true,
      };
    },
    computed: {
      cClass (){
        return [
          this.type,
          this.closable ? 'closable' : '',
        ].filter(cls => cls !== '').join(' ');
      },
    },
    methods: {
      onClose (e){
        console.log('>>> panda-alert@close');
        this.$emit('close', e);
        this.show = false;
      },
    },
  };
</script>
