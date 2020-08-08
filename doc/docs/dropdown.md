# Dropdown 下拉菜单

下拉菜单是一个向下弹出的列表，展示在一个临时的容器里

用户的操作如触发一个 link / 按钮 / 输入框等其控件时会弹出下拉菜单，在下拉的列表中选择一个值执行对应的命令

## 默认

```vue
<template>
  <panda-dropdown>
    <a href="javascript:;">
      下拉菜单 <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
    </a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>

  <panda-dropdown>
    <a href="javascript:;">
      下拉菜单(文字较少) <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
    </a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item.slice(0, 5) }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>

  <panda-dropdown>
    <a href="javascript:;">
      下拉菜单(文字较多) <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
    </a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item }} bla blabla bla</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```

## 禁用

```vue
<template>
  <panda-dropdown>
    <a href="javascript:;">
      下拉菜单 <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
    </a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i" :disabled="i===1">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```

## 触发方式

> 默认 `hover` 触发，可通过 `trigger` 修改触发方式

```vue
<template>
  <panda-dropdown>
    <a href="javascript:;">下拉菜单(hover) <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon></a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>

  <panda-dropdown trigger="click">
    <a href="javascript:;">下拉菜单(click) <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon></a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>

  <panda-dropdown trigger="none" :visible="visible">
    <span>
      下拉菜单(主动触发) <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
      <a href="javascript:;" @click="visible=true">点我显示</a>
      <a href="javascript:;" @click="visible=false">点我隐藏</a>
    </span>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```

## 对齐方向

>可通过 `placement` 修改对齐方向，支持 6 个方向

```vue
<template>
  <panda-dropdown placement="top-start">
    <a href="javascript:;">下拉菜单(top-start) <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon></a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>

  <panda-dropdown placement="top">
    <a href="javascript:;">下拉菜单(top) <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon></a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>

  <panda-dropdown placement="top-end">
    <a href="javascript:;">下拉菜单(top-end) <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon></a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>

  <br/>

  <panda-dropdown placement="bottom-start">
    <a href="javascript:;">下拉菜单(bottom-start) <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon></a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>

  <panda-dropdown placement="bottom">
    <a href="javascript:;">下拉菜单(bottom) <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon></a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>

  <panda-dropdown placement="bottom-end">
    <a href="javascript:;">下拉菜单(bottom-end) <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon></a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```

## 分割线

> 通过 `hide-divider` 隐藏分割线

```vue
<template>
  <panda-dropdown :hide-divider="true" trigger="click">
    <a href="javascript:;">
      下拉菜单 <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
    </a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in [...items1, ...items1]" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```

## 隐藏箭头

> 通过 `arrow: false` 隐藏箭头

```vue
<template>
  <panda-dropdown :arrow="false" trigger="click">
    <a href="javascript:;">
      下拉菜单 <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
    </a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in [...items1, ...items1]" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```

## 带图标

```vue
<template>
  <panda-dropdown trigger="click">
    <a href="javascript:;">
      下拉菜单 <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
    </a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i" icon="icon_shopping_shopping_cart">
        {{ item }}
      </panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```

## 前后插槽

```vue
<template>
  <panda-dropdown trigger="click">
    <a href="javascript:;">
      下拉菜单 <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
    </a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">
        <panda-icon type="icon_social_thumbs_on" slot="prepend"></panda-icon>
        {{ item }}
        <panda-icon type="icon_navigation_chevron_right_xs" slot="append"></panda-icon>
      </panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```

## 触发对象

> 触发对象可以是任意自定义内容，一般是链接或者按钮

```vue
<template>
  <panda-dropdown @click="onClick">
    <panda-button type="primary">下拉菜单</panda-button>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i" :name="`item${i}`">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```

## 可选择

> Dropdown 默认不可选择，可通过 `checkable` 设置，结合 `v-model` 绑定选中项

```vue
<template>
  <panda-dropdown v-model="checked" :checkable="true" @change="onChange" @click="onClick">
    <a href="javascript:;">
      下拉菜单 <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
    </a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i" :name="`item${i}`">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```

## 最大宽度

> 最大宽度默认是 320px，可通过 `max-width` 调整最大宽度

```vue
<template>
  <panda-dropdown trigger="click" :max-width="220">
    <a href="javascript:;">
      下拉菜单 <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
    </a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in items1" :key="i">
        <panda-icon type="icon_social_thumbs_on" slot="prepend"></panda-icon>
        {{ item }}
        <panda-icon type="icon_navigation_chevron_right_xs" slot="append"></panda-icon>
      </panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```

## 最大高度

> 最大高度默认是 320px，可通过 `max-height` 调整最大高度

```vue
<template>
  <panda-dropdown :max-height="200" trigger="click">
    <a href="javascript:;">
      下拉菜单 <panda-icon type="icon_navigation_chevron_down_xs"></panda-icon>
    </a>
    <panda-dropdown-menu slot="list">
      <panda-dropdown-item v-for="(item, i) in [...items1, ...items1]" :key="i">{{ item }}</panda-dropdown-item>
    </panda-dropdown-menu>
  </panda-dropdown>
</template>
```


## Dropdown Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| checkable | 是否可选择 | Boolean | — | false |
| value | 在 checkable 时有效，v-model 绑定选中 name 值 | String | — | - |
| placement | 弹出位置 | String | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom |
| trigger | 触发方式 | String | hover, click, none | hover |
| visible | 是否可见，仅在 trigger 为 none 时有效 | Boolean | — | false |
| arrow | 是否显示箭头 | Boolean | — | true |
| hide-divider | 是否隐藏分割线 | Boolean | — | false |
| max-width | 最大宽度 | Number | — | — |
| max-height | 最大高度 | Number | — | 320 |

## Dropdown Events

| 事件 | 介绍 | 参数 |
|------|------|------|
| change | 在 checkable 时有效，选择 item 变化时 | (name) |
| click | 点击 Item 项时触发 | (name) |

## Dropdown Slots

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| default | 默认 | Slot | — | - |
| list | 下拉列表 | Slot | — | - |


## DropdownItem Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | Item name 值，用于绑定 | String | — | - |
| icon | Item 前置图标 | String | — | - |
| disabled | 是否禁用 | Boolean | — | false |

<!-- ## DropdownItem Events

| 事件 | 介绍 | 参数 |
|------|------|------|
| click | 被点击时触发 | (name) | -->

## DropdownItem Slots

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| default | 默认 | Slot | — | - |
| prepend | 前置内容 | Slot | — | - |
| append | 后置内容 | Slot | — | - |

<script>
  export default {
    data () {
      return {
        items1: [
          'Yours Explorer, This is a description',
          'Yours Explorer, This is a description',
          'Yours Explorer, This is a description',
          'Yours Explorer, This is a description',
          'Yours Explorer, This is a description',
          'Yours Explorer, This is a description',
        ],
        visible: false,
        checked: 'item1',
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
  .panda-dropdown {
    margin-right: 20px;
    margin-bottom: 10px;
  }
  a {
    display: inline-flex;
    align-items: center;
    color: #333333;
    &, &:hover {
      text-decoration: none;
    }
    svg {
      font-size: 14px;
      margin-left: 5px;
    }
  }
</style>
