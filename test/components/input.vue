<template>
  <div class="input">
    <h3>基本输入框</h3>
    <p><i>使用 v-model 双向绑定</i></p>
    <!-- <textarea class="code" disabled>
    <Input placeholder="基本输入框" v-model="val"></Input>
    </textarea> -->
    <Input placeholder="基本输入框" v-model="val"></Input>
    <h3>禁用输入框 disabled</h3>
    <Input placeholder="禁用输入框" disabled></Input>
    <h3>只读输入框 readonly</h3>
    <Input placeholder="只读输入框 readonly" readonly></Input>
    <h3>输入框尺寸 size</h3>
    <p>small</p>
    <Input placeholder="输入框尺寸 small" size="small"></Input>
    <p>normal</p>
    <Input placeholder="输入框尺寸 normal" size="normal"></Input>
    <p>large</p>
    <Input placeholder="输入框尺寸 large" size="large"></Input>
    <h3>可清空 clearable</h3>
    <Input placeholder="可清空" clearable></Input>
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