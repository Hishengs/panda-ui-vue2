<template>
  <div id="Badge">
    <h2>Badge 徽标</h2>

    <h3>单独使用</h3>
    <Badge value="2"></Badge>
    <Badge value="新"></Badge>
    <Badge value="999+"></Badge>
    
    <h3>默认徽标</h3>
    <Badge :value="2"><Button type="primary">CES</Button></Badge>
    <Badge value="23"><Button type="primary">CES</Button></Badge>
    <Badge value="233"><Button type="primary">CES</Button></Badge>
    <Badge value="999+"><Button type="primary">CES</Button></Badge>
    <Badge value="新"><Button type="primary">CES</Button></Badge>
    <Badge value="折"><Button type="primary">CES</Button></Badge>
    <h3>内置颜色</h3>
    <Badge color="red" value="new"><Button type="primary">CES</Button></Badge>
    <Badge color="orange" value="hot"><Button type="primary">CES</Button></Badge>
    <Badge color="yellow" value="sold"><Button type="primary">CES</Button></Badge>
    <Badge color="green" :value="999"><Button type="primary">CES</Button></Badge>
    <Badge color="cyan" :value="999"><Button type="primary">CES</Button></Badge>
    <Badge color="blue" :value="999"><Button type="primary">CES</Button></Badge>
    <Badge color="purple" :value="999"><Button type="primary">CES</Button></Badge>
    <h3>小圆点 dot</h3>
    <Badge type="dot"><Button type="primary">CES</Button></Badge>
    <Badge color="orange" type="dot"><Button type="primary">CES</Button></Badge>
    <Badge color="blue" type="dot"><Button type="primary">CES</Button></Badge>
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