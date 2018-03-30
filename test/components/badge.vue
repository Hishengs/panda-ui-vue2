<template>
  <div id="Badge">
    <h2>Badge 徽标</h2>
    
    <h3>默认徽标</h3>
    <Badge>2</Badge> <Badge>23</Badge> <Badge>233</Badge> <Badge>999+</Badge> <Badge>新</Badge> <Badge>折</Badge>
    <h3>内置颜色</h3>
    <Badge color="red">999</Badge> <Badge color="orange">999</Badge> <Badge color="yellow">999</Badge>
    <Badge color="green">999</Badge> <Badge color="cyan">999</Badge> <Badge color="blue">999</Badge> <Badge color="purple">999</Badge>
    <h3>小圆点 dot</h3>
    <Badge type="dot"></Badge> <Badge color="orange" type="dot"></Badge> <Badge color="blue" type="dot"></Badge>
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