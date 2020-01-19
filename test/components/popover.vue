<template>
  <div id="Popover">
    <h2>Popover 文字提示</h2>
    
    <h3>默认</h3>
    <panda-popover title="这是标题" content="这是内容"><panda-button type="primary">主要按钮</panda-button></panda-popover>

    <h3>方向</h3>
    <p>支持 12 个方向</p>
    <panda-popover content="panda-popover 文字提示" placement="top-start"><panda-button type="primary">Top Start</panda-button></panda-popover>
    <panda-popover content="panda-popover 文字提示" placement="top"><panda-button type="primary">Top</panda-button></panda-popover>
    <panda-popover content="panda-popover 文字提示" placement="top-end"><panda-button type="primary">Top End</panda-button></panda-popover>
    <panda-popover content="panda-popover 文字提示" placement="left-start"><panda-button type="primary">Left Start</panda-button></panda-popover>
    <panda-popover content="panda-popover 文字提示" placement="left"><panda-button type="primary">Left</panda-button></panda-popover>
    <panda-popover content="panda-popover 文字提示" placement="left-end"><panda-button type="primary">Left End</panda-button></panda-popover>
    <panda-popover content="panda-popover 文字提示" placement="right-start"><panda-button type="primary">Right Start</panda-button></panda-popover>
    <panda-popover content="panda-popover 文字提示" placement="right"><panda-button type="primary">Right</panda-button></panda-popover>
    <panda-popover content="panda-popover 文字提示" placement="right-end"><panda-button type="primary">Right End</panda-button></panda-popover>
    <panda-popover content="panda-popover 文字提示" placement="bottom-start"><panda-button type="primary">Bottom Start</panda-button></panda-popover>
    <panda-popover content="panda-popover 文字提示" placement="bottom"><panda-button type="primary">Bottom</panda-button></panda-popover>
    <panda-popover content="panda-popover 文字提示" placement="bottom-end"><panda-button type="primary">Bottom End</panda-button></panda-popover>
  </div>
</template>

<script>
  export default {
    name: 'popover-preview',
  };
</script>

<style lang="less" scoped>
  .panda-popover {
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>