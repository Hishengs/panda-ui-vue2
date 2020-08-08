# Alert 警告

## 类型

```vue
<panda-alert type="info">这是一条信息提示</panda-alert>
<panda-alert type="success">这是一条成功提示</panda-alert>
<panda-alert type="warning">这是一条警告提示</panda-alert>
<panda-alert type="danger">这是一条危险提示</panda-alert>
```

## 可关闭的

```vue
<panda-alert type="info" closable>这是一条信息提示</panda-alert>
<panda-alert type="success" closable>这是一条信息提示</panda-alert>
```

## 带标题

```vue
<panda-alert type="info" title="这是标题">
  这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
</panda-alert>

<panda-alert type="success" title="这是标题" closable>
  这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
</panda-alert>

<panda-alert type="warning" title="这是标题">
  这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示，这是一条带标题提示。
</panda-alert>
```

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

<style lang="less" scoped>
  .panda-alert {
    margin-bottom: 10px;
  }
</style>