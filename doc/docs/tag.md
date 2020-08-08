# Tag

## 默认标签
```vue
<panda-tag>默认标签</panda-tag>
```

## 内置颜色标签
```vue
<panda-tag color="red">红色标签</panda-tag>
<panda-tag color="orange">橙色标签</panda-tag>
<panda-tag color="yellow">黄色标签</panda-tag>
<panda-tag color="green">绿色标签</panda-tag>
<panda-tag color="cyan">青色标签</panda-tag>
<panda-tag color="blue">蓝色标签</panda-tag>
<panda-tag color="purple">紫色标签</panda-tag>
```

## 圆角标签 round
```vue
<panda-tag color="red" round>红色标签</panda-tag>
<panda-tag color="orange" round>橙色标签</panda-tag>
```

## 可关闭标签 closable
```vue
<panda-tag closable>默认标签</panda-tag>
<panda-tag color="red" closable>红色标签</panda-tag>
```

## 带三角的标签 triangle
```vue
<panda-tag triangle round>带三角的标签</panda-tag>
<panda-tag color="red" triangle closable>首单减15</panda-tag>
<panda-tag color="orange" triangle round closable>橙色标签</panda-tag>
<panda-tag color="yellow" triangle>新品</panda-tag>
<panda-tag color="green" triangle>环保认证</panda-tag>
<panda-tag color="cyan" triangle>清真食品</panda-tag>
<panda-tag color="blue" triangle>海鲜</panda-tag>
<panda-tag color="purple" triangle>烤串排挡</panda-tag>
```

## 三角方向
```vue
<panda-tag triangle  triangle-direction="right">带三角的标签</panda-tag>
<panda-tag color="red" triangle closable  triangle-direction="right">首单减15</panda-tag>
```

<style lang="less">
  .panda-tag {
    margin-right: 10px;
  }
</style>