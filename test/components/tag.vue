<template>
  <div id="Tag">
    <h2>Tag 标签</h2>
    
    <h3>默认标签</h3>
    <panda-tag>默认标签</panda-tag>
    <h3>内置颜色标签</h3>
    <panda-tag color="red">红色标签</panda-tag> red
    <panda-tag color="orange">橙色标签</panda-tag> orange
    <panda-tag color="yellow">黄色标签</panda-tag> yellow
    <panda-tag color="green">绿色标签</panda-tag> green
    <panda-tag color="cyan">青色标签</panda-tag> cyan
    <panda-tag color="blue">蓝色标签</panda-tag> blue
    <panda-tag color="purple">紫色标签</panda-tag> purple
    <h3>圆角标签 round</h3>
    <panda-tag color="red" round>红色标签</panda-tag>
    <panda-tag color="orange" round>橙色标签</panda-tag>
    <h3>可关闭标签 closable</h3>
    <panda-tag closable>默认标签</panda-tag>
    <panda-tag color="red" closable>红色标签</panda-tag>
    <h3>带三角的标签 triangle</h3>
    <panda-tag triangle round>带三角的标签</panda-tag>
    <panda-tag color="red" triangle closable>首单减15</panda-tag>
    <panda-tag color="orange" triangle round closable>橙色标签</panda-tag>
    <panda-tag color="yellow" triangle>新品</panda-tag>
    <panda-tag color="green" triangle>环保认证</panda-tag>
    <panda-tag color="cyan" triangle>清真食品</panda-tag>
    <panda-tag color="blue" triangle>海鲜</panda-tag>
    <panda-tag color="purple" triangle>烤串排挡</panda-tag>
    <h4>三角方向</h4>
    <panda-tag triangle  triangle-direction="right">带三角的标签</panda-tag>
    <panda-tag color="red" triangle closable  triangle-direction="right">首单减15</panda-tag>
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
        <td>标签颜色，red, orange, yellow, green, cyan, blue, purple</td>
        <td>String</td>
        <td>--</td>
      </tr>
      <tr>
        <td>round</td>
        <td>是否显示为圆角</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>closable</td>
        <td>是否可关闭</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>triangle</td>
        <td>是否显示为带三角的标签</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
    </table>
  </div>
</template>