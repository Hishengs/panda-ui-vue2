<template>
  <div id="Popover">
    <h2>Popover 文字提示</h2>
    
    <h3>默认</h3>
    <Popover content="这是内容"><Button type="primary">主要按钮</Button></Popover>

    <h3>触发方式</h3>
    <Popover title="这是标题" content="这是内容"><Button type="primary">hover</Button></Popover>
    <Popover title="这是标题" content="这是内容" trigger="click"><Button type="primary">click</Button></Popover>
    <Popover title="这是标题" content="这是内容" trigger="focus"><Button type="primary">focus</Button></Popover>
    <Popover title="这是标题" content="这是内容" trigger="focus">
      <Input placeholder="focus 触发" value=""></Input>
    </Popover>

    <h3>方向</h3>
    <p>支持 12 个方向</p>
    <Popover content="Popover 文字提示" placement="top-start"><Button type="primary">Top Start</Button></Popover>
    <Popover content="Popover 文字提示" placement="top"><Button type="primary">Top</Button></Popover>
    <Popover content="Popover 文字提示" placement="top-end"><Button type="primary">Top End</Button></Popover>
    <Popover content="Popover 文字提示" placement="left-start"><Button type="primary">Left Start</Button></Popover>
    <Popover content="Popover 文字提示" placement="left"><Button type="primary">Left</Button></Popover>
    <Popover content="Popover 文字提示" placement="left-end"><Button type="primary">Left End</Button></Popover>
    <Popover content="Popover 文字提示" placement="right-start"><Button type="primary">Right Start</Button></Popover>
    <Popover content="Popover 文字提示" placement="right"><Button type="primary">Right</Button></Popover>
    <Popover content="Popover 文字提示" placement="right-end"><Button type="primary">Right End</Button></Popover>
    <Popover content="Popover 文字提示" placement="bottom-start"><Button type="primary">Bottom Start</Button></Popover>
    <Popover content="Popover 文字提示" placement="bottom"><Button type="primary">Bottom</Button></Popover>
    <Popover content="Popover 文字提示" placement="bottom-end"><Button type="primary">Bottom End</Button></Popover>
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