<template>
  <div id="Alert">
    <h2>Alert 警告</h2>
    
    <h3>类型 type</h3>
    <p>info</p>
    <Alert type="info">这是一条信息提示</Alert>
    <p>success</p>
    <Alert type="success">这是一条成功提示</Alert>
    <p>warning</p>
    <Alert type="warning">这是一条警告提示</Alert>
    <p>danger</p>
    <Alert type="danger">这是一条危险提示</Alert>
    <h3>可关闭的 closable</h3>
    <p><Alert type="info" closable>这是一条信息提示</Alert></p>
    <p><Alert type="success" closable>这是一条信息提示</Alert></p>
    <h3>带标题 title</h3>
    <p>
      <Alert type="info" title="这是标题">
        这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
    </Alert>
    </p>
    <p>
      <Alert type="success" title="这是标题" closable>
        这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
    </Alert>
    </p>
    <p>
      <Alert type="warning" title="这是标题">
        这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
    </Alert>
    </p>

    <h4>Props</h4>
    <table>
      <tr>
        <th>名称</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>type</td>
        <td>类型，info, success, warning, danger</td>
        <td>String</td>
        <td>info</td>
      </tr>
      <tr>
        <td>closable</td>
        <td>是否可关闭</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
    </table>
  </div>
</template>