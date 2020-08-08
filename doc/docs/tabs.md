# Tabs

## 基础

```vue
<template>
  <panda-tabs v-model="active" @change="onChange" @tab-click="onClick">
    <panda-tab-pane v-for="i in 3" :key="i" :name="`tab${i}`" :label="`Tab ${i}`">
      <div class="demo-content">{{ i }}</div>
    </panda-tab-pane>
  </panda-tabs>
</template>

<script>
export default {
  data () {
    return {
      active: 'tab1',
    };
  },
  methods: {
    onChange (val) {
      console.log('>>> onChange', val);
    },
    onClick (val) {
      console.log('>>> onClick', val);
    }
  }
};
</script>

<style lang="less" scoped>
.demo-content {
  height: 344px;
  border-radius: 4px;
  background-color: #fff4ed;
  font-size: 40px;
  text-align: center;
  color: #ff9c6e;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

## 禁用

```vue
<panda-tabs>
  <panda-tab-pane label="Tab 1">
    <div class="demo-content">1</div>
  </panda-tab-pane>
  <panda-tab-pane label="Tab 2" disabled>
    <div class="demo-content">2</div>
  </panda-tab-pane>
  <panda-tab-pane label="Tab 3">
    <div class="demo-content">3</div>
  </panda-tab-pane>
</panda-tabs>
```

## Tab 下划线

```vue
<panda-tabs underline>
  <panda-tab-pane label="Tab 1">
    <div class="demo-content">1</div>
  </panda-tab-pane>
  <panda-tab-pane label="Tab 2">
    <div class="demo-content">2</div>
  </panda-tab-pane>
  <panda-tab-pane label="Tab 3">
    <div class="demo-content">3</div>
  </panda-tab-pane>
</panda-tabs>
```


## 带图标

```vue
<panda-tabs>
  <panda-tab-pane label="Tab 1" icon="zap">
    <div class="demo-content">1</div>
  </panda-tab-pane>
  <panda-tab-pane label="Tab 2" icon="feather">
    <div class="demo-content">2</div>
  </panda-tab-pane>
  <panda-tab-pane label="Tab 3" icon="tv">
    <div class="demo-content">3</div>
  </panda-tab-pane>
</panda-tabs>
```

## 设置 tab Item 宽度

> 通过为 item 设置 `width` 宽度实现均等切分，设置 `max-width` 最大宽度实现超出省略

```vue
<template>
  <panda-tabs>
    <panda-tab-pane label="Tab 1Tab 1Tab 1Tab 1Tab 1Tab 1Tab 1Tab 1Tab 1Tab 1" name="tab1" width="33.3%" max-width="33.3%" icon="zap">
      <div class="demo-content">1</div>
    </panda-tab-pane>
    <panda-tab-pane label="Tab 2" name="tab2" width="33.3%" max-width="33.3%" icon="truck">
      <div class="demo-content">2</div>
    </panda-tab-pane>
    <panda-tab-pane label="Tab 3" name="tab3" width="33.3%" max-width="33.3%" icon="tv">
      <div class="demo-content">3</div>
    </panda-tab-pane>
  </panda-tabs>
</template>
```

## 超出限制

```vue
<panda-tabs style="width: 400px;">
  <panda-tab-pane label="Tab 1 xsdsfdfxsdsfdf" name="tab1">
    <div class="demo-content">1</div>
  </panda-tab-pane>
  <panda-tab-pane label="Tab 2 xsdsfdfxsdsfdf xsds" name="tab2">
    <div class="demo-content">2</div>
  </panda-tab-pane>
  <panda-tab-pane label="Tab 3 xsdsfdfxsdsfdf" name="tab3">
    <div class="demo-content">3</div>
  </panda-tab-pane>
  <panda-tab-pane label="Tab 4 xsdsfdfxsdsfdf" name="tab4">
    <div class="demo-content">4</div>
  </panda-tab-pane>
</panda-tabs>
```

<br/>

```vue
<panda-tabs>
  <panda-tab-pane v-for="i in 30" :key="i" :name="`tab${i}`" :label="`Tab ${i}`">
    <div class="demo-content">{{ i }}</div>
  </panda-tab-pane>
</panda-tabs>
```

## Tabs Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 通过 v-model 绑定 name | String | — | — |
| background-color | tab 背景色 | String | — | — |
| underline | 是否显示 tab 下划线 | Boolean | — | false |

## Tabs Events

| 参数 | 介绍 | 回调参数 |
|------|------|-------|
| change | 当 Tab 切换时触发事件 | (name) |
| tab-click | 当 Tab 被点击时触发事件 | (name) |

## TabPane Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| label | tab pane 标签名称 | String | — | — |
| disabled | 是否禁用 | Boolean | — | false |
| name | 用于控制是否激活的 name | String | — | — |
| icon | tab 显示的左侧图标 | — | — | — |
| width | tab 宽度 | Number, String | — | — |
| max-width | tab 最大宽度 | Number, String | — | — |

## TabPane Slots

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| default | 默认 | Slot | — | - |
| label | 标签 | Slot | — | - |