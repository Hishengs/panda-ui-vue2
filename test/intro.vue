<template>
  <div id="Intro">
    <h2>介绍</h2>
    <Test></Test>
    <Divider></Divider>
    <p>
      基于 Vue 开发的一个轻量级组件库。因为我特别喜欢熊猫 🐼，所以组件库取名为 Panda UI.
    </p>
  </div>
</template>

<script>
import Test from './test.md';
console.log('>>> Test', Test);

export default {
  components: {
    Test,
  }
};
</script>