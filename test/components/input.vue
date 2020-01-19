<template>
  <div id="Input">
    <h2>Input 输入框</h2>
    
    <h3>基本输入框</h3>
    <p><i>使用 v-model 双向绑定</i> {{ val }}</p>
    <!-- <textarea class="code" disabled>
    <panda-input placeholder="基本输入框" v-model="val"></panda-input>
    </textarea> -->
    <panda-input placeholder="基本输入框" v-model="val"></panda-input>
    <h3>禁用输入框 disabled</h3>
    <panda-input placeholder="禁用输入框" disabled></panda-input>
    <h3>只读输入框 readonly</h3>
    <panda-input placeholder="只读输入框 readonly" readonly></panda-input>
    <h3>输入框尺寸 size</h3>
    <p>small</p>
    <panda-input placeholder="输入框尺寸 small" size="small"></panda-input>
    <p>normal</p>
    <panda-input placeholder="输入框尺寸 normal" size="normal"></panda-input>
    <p>large</p>
    <panda-input placeholder="输入框尺寸 large" size="large"></panda-input>
    <h3>可清空 clearable</h3>
    <panda-input placeholder="可清空" clearable></panda-input>
  </div>
</template>

<script>
  export default {
    name: 'input-preview',
    data (){
      return {
        val: '',
      };
    },
  };
</script>