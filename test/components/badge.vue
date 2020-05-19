<template>
  <div id="Badge">
    <h2>Badge 徽标</h2>

    <h3>单独使用</h3>
    <panda-badge value="2"></panda-badge>
    <panda-badge value="新"></panda-badge>
    <panda-badge value="999+"></panda-badge>
    
    <h3>默认徽标</h3>
    <panda-badge :value="2"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge value="23"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge value="233"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge value="999+"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge value="新"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge value="折"><panda-button type="primary">CES</panda-button></panda-badge>
    <h3>内置颜色</h3>
    <panda-badge color="red" value="new"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge color="orange" value="hot"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge color="yellow" value="sold"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge color="green" :value="999"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge color="cyan" :value="999"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge color="blue" :value="999"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge color="purple" :value="999"><panda-button type="primary">CES</panda-button></panda-badge>
    <h3>小圆点 dot</h3>
    <panda-badge type="dot"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge color="orange" type="dot"><panda-button type="primary">CES</panda-button></panda-badge>
    <panda-badge color="blue" type="dot"><panda-button type="primary">CES</panda-button></panda-badge>
    <h3>Props</h3>
    <table>
      <tr>
        <th>名称</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>color</td>
        <td>徽标颜色，red, orange, yellow, green, cyan, blue, purple</td>
        <td>String</td>
        <td>red</td>
      </tr>
      <tr>
        <td>dot</td>
        <td>是否显示为圆点</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
    </table>
  </div>
</template>