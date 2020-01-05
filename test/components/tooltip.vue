<template>
  <div id="Tooltip">
    <h2>Tooltip 文字提示</h2>
    
    <h3>默认</h3>
    <Tooltip content="Tooltip 文字提示"><Button type="primary">主要按钮</Button></Tooltip>

    <h3>方向</h3>
    <p>支持 12 个方向</p>
    <Tooltip content="Tooltip 文字提示" placement="top-left"><Button type="primary">Top Left</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="top"><Button type="primary">Top</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="top-right"><Button type="primary">Top Right</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="left-top"><Button type="primary">Left</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="left"><Button type="primary">Left Top</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="left-bottom"><Button type="primary">Left Bottom</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="right-top"><Button type="primary">Right Top</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="right"><Button type="primary">Right</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="right-bottom"><Button type="primary">Right Bottom</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="bottom-left"><Button type="primary">Bottom Left</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="bottom"><Button type="primary">Bottom</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="bottom-right"><Button type="primary">Bottom Right</Button></Tooltip>
  </div>
</template>

<script>
  export default {
    name: 'tooltip-preview',
  };
</script>

<style lang="less" scoped>
  .panda-tooltip {
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>