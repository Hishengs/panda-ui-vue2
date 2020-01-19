<template>
  <div id="Textarea">
    <h2>Textarea 多行文本输入框</h2>
    
    <h3>默认</h3>
    <panda-textarea v-model="val"></panda-textarea>
    <h3>禁用</h3>
    <panda-textarea v-model="val" disabled></panda-textarea>
    <h3>最大行数 maxRows 5</h3>
    <panda-textarea v-model="val" :maxRows="5"></panda-textarea>
    <h3>最小行数 minRows 3</h3>
    <panda-textarea v-model="val" :minRows="3"></panda-textarea>
    <h3>自动对焦 autofocus</h3>
    <panda-textarea v-model="val" autofocus></panda-textarea>
  </div>
</template>

<script>
  export default {
    name: 'textarea-preview',
    data (){
      return {
        val: '世界和平',
      };
    },
    watch: {
      val (newVal){
        console.log('>>> [test]panda-textarea.watch val', newVal);
      }
    },
  };
</script>