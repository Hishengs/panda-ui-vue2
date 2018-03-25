<template>
  <div class="tag">
    <h3>默认标签</h3>
    <Tag>默认标签</Tag>
    <h3>内置颜色标签</h3>
    <Tag color="red">红色标签</Tag> red
    <Tag color="orange">橙色标签</Tag> orange
    <Tag color="yellow">黄色标签</Tag> yellow
    <Tag color="green">绿色标签</Tag> green
    <Tag color="cyan">青色标签</Tag> cyan
    <Tag color="blue">蓝色标签</Tag> blue
    <Tag color="purple">紫色标签</Tag> purple
    <h3>圆角标签 round</h3>
    <Tag color="red" round>红色标签</Tag>
    <Tag color="orange" round>橙色标签</Tag>
    <h3>可关闭标签 closable</h3>
    <Tag closable>默认标签</Tag>
    <Tag color="red" closable>红色标签</Tag>
    <h3>带三角的标签 triangle</h3>
    <Tag triangle round>带三角的标签</Tag>
    <Tag color="red" triangle closable>首单减15</Tag>
    <Tag color="orange" triangle round closable>橙色标签</Tag>
    <Tag color="yellow" triangle>新品</Tag>
    <Tag color="green" triangle>环保认证</Tag>
    <Tag color="cyan" triangle>清真食品</Tag>
    <Tag color="blue" triangle>海鲜</Tag>
    <Tag color="purple" triangle>烤串排挡</Tag>
    <h4>三角方向</h4>
    <Tag triangle  triangle-direction="right">带三角的标签</Tag>
    <Tag color="red" triangle closable  triangle-direction="right">首单减15</Tag>
  </div>
</template>