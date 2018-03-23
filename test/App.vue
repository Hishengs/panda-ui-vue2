<template>
  <div id="app">
    <h1>Panda UI 测试</h1>
    <h2>Button 按钮</h2>
    <Button type="default">默认按钮</Button>
    <Button type="primary">主要按钮</Button>
    <Button type="success">成功按钮</Button>
    <Button type="info">提示按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="error">错误按钮</Button>
    <h2>Tag 标签</h2>
    <Tag>默认标签</Tag>
    <Tag color="primary">默认标签</Tag>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style lang= "less">
  #app {
    padding: 20px;
  }
</style>

