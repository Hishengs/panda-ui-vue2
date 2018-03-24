<template>
  <div id="app">
    <h1>Panda UI 测试</h1>

    <h2>一、Button 按钮</h2>
    <h3>1. 按钮种类 type</h3>
    <Button type="default">默认按钮</Button>
    <Button type="primary">主要按钮</Button>
    <Button type="success">成功按钮</Button>
    <Button type="info">提示按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
    <Button type="text">文字按钮</Button>
    <h3>2. 按钮大小 size</h3>
    <Button type="primary" size="mini">mini 按钮</Button>
    <Button type="primary" size="small">small 按钮</Button>
    <Button type="primary" size="normal">normal 按钮</Button>
    <Button type="primary" size="large">large 按钮</Button>
    <h3>3. 块级按钮 block</h3>
    <p><Button type="primary" block>块级按钮</Button></p>
    <h3>4. 按钮不可用 disabled</h3>
    <Button type="default" disabled>默认按钮</Button>
    <Button type="primary" disabled>主要按钮</Button>
    <Button type="success" disabled>成功按钮</Button>
    <Button type="info" disabled>提示按钮</Button>
    <Button type="warning" disabled>警告按钮</Button>
    <Button type="danger" disabled>错误按钮</Button>
    <Button type="text" disabled>文字按钮</Button>
    <h3>5. 圆角按钮 round</h3>
    <Button type="primary" size="mini" round>mini 按钮 round</Button>
    <Button type="primary" size="small" round>small 按钮 round</Button>
    <Button type="primary" size="normal" round>normal 按钮 round</Button>
    <Button type="primary" size="large" round>large 按钮 round</Button>

    <h2>二、Tag 标签</h2>
    <Tag>默认标签</Tag>
    <h3>内置颜色标签</h3>
    <Tag color="red">红色标签</Tag>
    <Tag color="orange">橙色标签</Tag>
    <Tag color="yellow">黄色标签</Tag>
    <Tag color="green">绿色标签</Tag>
    <Tag color="cyan">青色标签</Tag>
    <Tag color="blue">蓝色标签</Tag>
    <Tag color="purple">紫色标签</Tag>
    <h3>圆角标签</h3>
    <Tag color="red" round>红色标签</Tag>
    <Tag color="orange" round>橙色标签</Tag>
    <h3>可关闭标签</h3>
    <Tag closable>默认标签</Tag>
    <Tag color="red" closable>红色标签</Tag>
    <h3>带三角的标签</h3>
    <Tag triangle round>带三角的标签</Tag>
    <Tag color="red" triangle closable>带三角的标签</Tag>
    <Tag color="orange" triangle round closable>橙色标签</Tag>
    <Tag color="yellow" triangle>黄色标签</Tag>
    <Tag color="green" triangle>绿色标签</Tag>
    <Tag color="cyan" triangle>青色标签</Tag>
    <Tag color="blue" triangle>蓝色标签</Tag>
    <Tag color="purple" triangle>紫色标签</Tag>

    <h2>三、Alert 警告</h2>
    <h3>type 类型</h3>
    <p><Alert type="info">这是一条信息提示</Alert></p>
    <p><Alert type="success">这是一条成功提示</Alert></p>
    <p><Alert type="warning">这是一条警告提示</Alert></p>
    <p><Alert type="danger">这是一条危险提示</Alert></p>
    <h3>closable 可关闭的</h3>
    <p><Alert type="info" closable>这是一条信息提示</Alert></p>
    <p><Alert type="success" closable>这是一条信息提示</Alert></p>
    <h3>title 带标题</h3>
    <p><Alert type="info" title="这是标题">
        这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
    </Alert></p>
    <p><Alert type="success" title="这是标题" closable>
        这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
    </Alert></p>
    <p><Alert type="warning" title="这是标题">
        这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
    </Alert></p>
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
    h2 {
      margin-top: 20px;
      padding: 30px 0;
      border-top: 1px solid #dedede;
      h3:not(first-child) {
        margin-top: 20px;
      }
    }
  }
</style>

