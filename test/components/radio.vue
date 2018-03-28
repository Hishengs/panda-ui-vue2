<template>
  <div class="radio-preview">
    <h3>默认</h3>
    <p>喜欢的饮料，你选择了：{{ drink }}</p>
    <Radio v-model="drink" label="果汁">果汁</Radio>
    <Radio v-model="drink" label="咖啡">咖啡</Radio>
    <Radio v-model="drink" label="牛奶">牛奶</Radio>
    <h3>禁用</h3>
    <Radio value="果汁" label="果汁" disabled>果汁</Radio>
  </div>
</template>

<script>
  export default {
    name: 'radio-preview',
    data (){
      return {
        drink: ''
      };
    },
  };
</script>