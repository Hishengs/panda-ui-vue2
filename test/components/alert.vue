<template>
  <div id="Alert">
    <h2>Alert 警告</h2>
    
    <h3>类型 type</h3>
    <p>info</p>
    <panda-alert type="info">这是一条信息提示</panda-alert>
    <p>success</p>
    <panda-alert type="success">这是一条成功提示</panda-alert>
    <p>warning</p>
    <panda-alert type="warning">这是一条警告提示</panda-alert>
    <p>danger</p>
    <panda-alert type="danger">这是一条危险提示</panda-alert>
    <h3>可关闭的 closable</h3>
    <p><panda-alert type="info" closable>这是一条信息提示</panda-alert></p>
    <p><panda-alert type="success" closable>这是一条信息提示</panda-alert></p>
    <h3>带标题 title</h3>
    <p>
      <panda-alert type="info" title="这是标题">
        这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
    </panda-alert>
    </p>
    <p>
      <panda-alert type="success" title="这是标题" closable>
        这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
    </panda-alert>
    </p>
    <p>
      <panda-alert type="warning" title="这是标题">
        这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
    </panda-alert>
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