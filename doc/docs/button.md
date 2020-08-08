# Button 按钮

## Button 按钮

## 类型

```vue
<template>
  <panda-button type="default">默认按钮{{title}}</panda-button>
  <panda-button type="primary">主要按钮</panda-button>
  <panda-button type="success">成功按钮</panda-button>
  <panda-button type="info">提示按钮</panda-button>
  <panda-button type="warning">警告按钮</panda-button>
  <panda-button type="danger">危险按钮</panda-button>
  <panda-button type="text">文字按钮</panda-button>
</template>

<script>
  export default {
    data () {
      return {
        title: 'hello world',
      };
    }
  };
</script>

<style>
  .ttt {
    color: red;
  }
</style>
```

## 大小

```vue
<panda-button type="primary" size="mini">mini 按钮</panda-button>
<panda-button type="primary" size="small">small 按钮</panda-button>
<panda-button type="primary" size="normal">normal 按钮</panda-button>
<panda-button type="primary" size="large">large 按钮</panda-button>
```

## 块级按钮

```vue
<panda-button type="primary" block>块级按钮</panda-button>
```

## 禁用

```vue
<panda-button type="default" disabled>默认按钮</panda-button>
<panda-button type="primary" disabled>主要按钮</panda-button>
<panda-button type="success" disabled>成功按钮</panda-button>
<panda-button type="info" disabled>提示按钮</panda-button>
<panda-button type="warning" disabled>警告按钮</panda-button>
<panda-button type="danger" disabled>错误按钮</panda-button>
<panda-button type="text" disabled>文字按钮</panda-button>
```

## 圆角

```vue
<panda-button type="primary" size="mini" round>mini 按钮 round</panda-button>
<panda-button type="primary" size="small" round>small 按钮 round</panda-button>
<panda-button type="primary" size="normal" round>normal 按钮 round</panda-button>
<panda-button type="primary" size="large" round>large 按钮 round</panda-button>
```

## 图标

```vue
<panda-button type="primary" icon="book">书籍</panda-button>
<panda-button type="success" icon="cloud" size="mini">多云</panda-button>
<panda-button type="primary" icon="upload"></panda-button>
```

## 加载中

```vue
<panda-button type="primary" loading>加载中</panda-button>
```

<style lang="less" scoped>
  .panda-button {
    margin-right: 10px;
  }
</style>

## Counter Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 可通过 v-model 绑定 | Number | — | 0 |
| size | 尺寸 | String | small | - |
| disabled | 是否禁用 | Boolean | — | false |
| min | 最小值 | Number | — | 0 |
| max | 最大值 | Number | — | Infinity |
| step | 步进 | Number | — | — |
| precision | 精度 | Number | — | — |
| autofocus | 是否自动聚焦 | Boolean | — | false |

<!-- | placeholder | 输入框默认 placeholder | String | — | — | -->

## Counter Events

| 名称 | 介绍 | 参数 |
|-----|------|-----|
| change | 值改变时触发 | (value) |
| focus | 在组件 Input 获得焦点时触发 | (event: Event) |
| blur | 在组件 Input 失去焦点时触发 | (event: Event) |