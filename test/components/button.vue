<template>
  <div id="Button">
    <h2>Button 按钮</h2>
    <h3>1. 按钮种类 type</h3>
    <panda-button type="default">默认按钮</panda-button>
    <panda-button type="primary">主要按钮</panda-button>
    <panda-button type="success">成功按钮</panda-button>
    <panda-button type="info">提示按钮</panda-button>
    <panda-button type="warning">警告按钮</panda-button>
    <panda-button type="danger">危险按钮</panda-button>
    <panda-button type="text">文字按钮</panda-button>
    <h3>2. 按钮大小 size</h3>
    <panda-button type="primary" size="mini">mini 按钮</panda-button>
    <panda-button type="primary" size="small">small 按钮</panda-button>
    <panda-button type="primary" size="normal">normal 按钮</panda-button>
    <panda-button type="primary" size="large">large 按钮</panda-button>
    <h3>3. 块级按钮 block</h3>
    <p><panda-button type="primary" block>块级按钮</panda-button></p>
    <h3>4. 按钮不可用 disabled</h3>
    <panda-button type="default" disabled>默认按钮</panda-button>
    <panda-button type="primary" disabled>主要按钮</panda-button>
    <panda-button type="success" disabled>成功按钮</panda-button>
    <panda-button type="info" disabled>提示按钮</panda-button>
    <panda-button type="warning" disabled>警告按钮</panda-button>
    <panda-button type="danger" disabled>错误按钮</panda-button>
    <panda-button type="text" disabled>文字按钮</panda-button>
    <h3>5. 圆角按钮 round</h3>
    <panda-button type="primary" size="mini" round>mini 按钮 round</panda-button>
    <panda-button type="primary" size="small" round>small 按钮 round</panda-button>
    <panda-button type="primary" size="normal" round>normal 按钮 round</panda-button>
    <panda-button type="primary" size="large" round>large 按钮 round</panda-button>
    <h3>6. 图标按钮 icon</h3>
    <panda-button type="primary" icon="book">书籍</panda-button>
    <panda-button type="success" icon="cloud" size="mini">多云</panda-button>
    <panda-button type="primary" icon="upload"></panda-button>
    <h3>7. 加载中 loading</h3>
    <panda-button type="primary" loading>加载中</panda-button>
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