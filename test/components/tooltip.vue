<template>
  <div id="Tooltip">
    <h2>Tooltip 文字提示</h2>
    
    <h3>默认</h3>
    <Tooltip content="Tooltip 文字提示"><Button type="primary">主要按钮</Button></Tooltip>

    <h3>方向</h3>
    <p>支持 12 个方向</p>
    <Tooltip content="Tooltip 文字提示" placement="top-start"><Button type="primary">Top Start</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="top"><Button type="primary">Top</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="top-end"><Button type="primary">Top End</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="left-start"><Button type="primary">Left Start</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="left"><Button type="primary">Left</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="left-end"><Button type="primary">Left End</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="right-start"><Button type="primary">Right Start</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="right"><Button type="primary">Right</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="right-end"><Button type="primary">Right End</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="bottom-start"><Button type="primary">Bottom Start</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="bottom"><Button type="primary">Bottom</Button></Tooltip>
    <Tooltip content="Tooltip 文字提示" placement="bottom-end"><Button type="primary">Bottom End</Button></Tooltip>
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