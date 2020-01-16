<template>
  <div id="NumberInput">
    <h2>NumberInput 数字输入框</h2>
    
    <h3>默认</h3>
    <panda-number-input placeholder="数字输入框" v-model="val"></panda-number-input>
    <h3>禁用</h3>
    <panda-number-input placeholder="数字输入框" v-model="val" disabled></panda-number-input>
    <h3>只读</h3>
    <panda-number-input placeholder="数字输入框" v-model="val" readonly></panda-number-input>
    <h3>步长 step 2</h3>
    <panda-number-input placeholder="数字输入框" v-model="val" :step="2"></panda-number-input>
    <h3>保留精度 precision 4</h3>
    <panda-number-input placeholder="数字输入框" v-model="val" :step="0.2" :precision="4"></panda-number-input>
    <h3>是否可编辑 editable</h3>
    <panda-number-input placeholder="是否可编辑 editable" v-model="val" :editable="false"></panda-number-input>
  </div>
</template>

<script>
  export default {
    name: 'number-input-preview',
    data (){
      return {
        val: 1,
      };
    },
  };
</script>