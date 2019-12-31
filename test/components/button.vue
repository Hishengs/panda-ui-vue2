<template>
  <div id="Button">
    <h2>Button 按钮</h2>
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
    <h3>6. 图标按钮 icon</h3>
    <Button type="primary" icon="book">书籍</Button>
    <Button type="success" icon="cloud" size="mini">多云</Button>
    <Button type="primary" icon="upload"></Button>
    <h3>7. 加载中 loading</h3>
    <Button type="primary" loading>加载中</Button>
    <h3>Props</h3>
    <table>
      <tr>
        <th>名称</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>type</td>
        <td>按钮类型，default, primary, info, warning, danger</td>
        <td>String</td>
        <td>default</td>
      </tr>
      <tr>
        <td>size</td>
        <td>按钮大小，mini, small, normal, large</td>
        <td>String</td>
        <td>normal</td>
      </tr>
      <tr>
        <td>block</td>
        <td>是否为块级按钮</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>是否禁用</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>round</td>
        <td>是否为圆角</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>loading</td>
        <td>加载中</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.panda-button {
  margin-right: 10px !important;
}
</style>