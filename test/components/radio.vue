<template>
  <div class="radio-preview">
    <h3>默认</h3>
    <Radio v-model="checked">饮料</Radio>
  </div>
</template>

<script>
  export default {
    name: 'radio-preview',
    data (){
      return {
        checked: false,
        drink: 'juice'
      };
    },
  };
</script>