<template>
  <i class="panda-icon-wrapper" v-html="svg" v-if="name">
    <!--  -->
  </i>
</template>

<script>
  import feather from 'feather-icons';
  export default {
    name: 'panda-icon',
    props: {
      name: {
        type: String,
        default: '',
      },
      size: {
        type: [String, Number],
      },
      color: {
        type: String,
      },
    },
    computed: {
      svg (){
        const opt = {
          class: `panda-icon panda-icon-${this.name}`,
          width: 14,
          height: 14,
        };
        if(this.color){
          opt.color = this.color.trim();
        }
        if(this.size){
          const size = parseInt(this.size);
          opt.width = size;
          opt.height = size;
        }
        return this.name.trim() ? this.feather.icons[this.name.trim()].toSvg(opt) : '';
      },
    },
    data (){
      return {
        feather,
      };
    },
  };
</script>