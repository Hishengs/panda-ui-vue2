<template>
  <div id="Tooltip">
    <h2>Tooltip 文字提示</h2>
    
    <h3>默认</h3>
    <panda-tooltip content="panda-tooltip 文字提示"><panda-button type="primary">主要按钮</panda-button></panda-tooltip>

    <h3>触发方式 trigger</h3>
    <panda-tooltip content="panda-tooltip 文字提示"><panda-button type="primary">hover</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" trigger="click"><panda-button type="primary">click</panda-button></panda-tooltip>

    <h3>方向</h3>
    <p>支持 12 个方向</p>
    <panda-tooltip content="panda-tooltip 文字提示" placement="top-start"><panda-button type="primary">Top Start</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" placement="top"><panda-button type="primary">Top</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" placement="top-end"><panda-button type="primary">Top End</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" placement="left-start"><panda-button type="primary">Left Start</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" placement="left"><panda-button type="primary">Left</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" placement="left-end"><panda-button type="primary">Left End</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" placement="right-start"><panda-button type="primary">Right Start</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" placement="right"><panda-button type="primary">Right</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" placement="right-end"><panda-button type="primary">Right End</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" placement="bottom-start"><panda-button type="primary">Bottom Start</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" placement="bottom"><panda-button type="primary">Bottom</panda-button></panda-tooltip>
    <panda-tooltip content="panda-tooltip 文字提示" placement="bottom-end"><panda-button type="primary">Bottom End</panda-button></panda-tooltip>
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