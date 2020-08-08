# Checkbox 复选框

## 默认

```vue
<template>
  <panda-row>
    <panda-col span="6">
      <h4>UnChecked</h4>
      <panda-checkbox v-model="radioVal.value1" @change="onChange">Option 1</panda-checkbox>
    </panda-col>
    <panda-col span="6">
      <h4>Checked</h4>
      <panda-checkbox v-model="radioVal.value2">Option 2 bla bla bla bla bla bla bla bla bla</panda-checkbox>
    </panda-col>
    <panda-col span="6">
      <h4>Solo</h4>
      <panda-checkbox v-model="radioVal.value1"></panda-checkbox>
    </panda-col>
    <panda-col span="6">
      <h4>Indeterminate</h4>
      <panda-checkbox v-model="radioVal.value1" indeterminate></panda-checkbox>
    </panda-col>
  </panda-row>
</template>
```

> `indeterminate` 一般用于多选组半选中状态，勿单独使用

## 禁用状态
```vue
<template>
  <panda-row>
    <panda-col span="6">
      <h4>UnChecked Disabled</h4>
      <panda-checkbox v-model="radioVal.value3" disabled>Option Text</panda-checkbox>
    </panda-col>
    <panda-col span="6">
      <h4>Checked Disabled</h4>
      <panda-checkbox v-model="radioVal.value4" disabled>Option 2 bla bla bla bla bla bla bla bla bla</panda-checkbox>
    </panda-col>
    <panda-col span="6">
      <h4>Solo</h4>
      <panda-checkbox v-model="radioVal.value1" disabled></panda-checkbox>
    </panda-col>
    <panda-col span="6">
      <h4>Indeterminate Disabled</h4>
      <panda-checkbox v-model="radioVal.value1" indeterminate disabled>Option Text</panda-checkbox>
    </panda-col>
  </panda-row>
</template>
```

## 大小 Size
> 在正常尺寸之外提供一种 small 尺寸

```vue
<template>
  <panda-row>
    <panda-col span="6">
      <h4>UnChecked</h4>
      <panda-checkbox v-model="radioVal.value1" size="small">Option 1</panda-checkbox>
    </panda-col>
    <panda-col span="6">
      <h4>Checked</h4>
      <panda-checkbox v-model="radioVal.value2" size="small">Option 2</panda-checkbox>
    </panda-col>
    <panda-col span="6">
      <h4>Solo</h4>
      <panda-checkbox v-model="radioVal.value1" size="small"></panda-checkbox>
    </panda-col>
    <panda-col span="6">
      <h4>Indeterminate</h4>
      <panda-checkbox v-model="radioVal.value1" indeterminate size="small"></panda-checkbox>
    </panda-col>
  </panda-row>

  <panda-row>
    <panda-col span="6">
      <h4>UnChecked Disabled</h4>
      <panda-checkbox v-model="radioVal.value3" disabled size="small">Option Text</panda-checkbox>
    </panda-col>
    <panda-col span="6">
      <h4>Checked Disabled</h4>
      <panda-checkbox v-model="radioVal.value4" disabled size="small">Option Text</panda-checkbox>
    </panda-col>
    <panda-col span="6">
      <h4>Indeterminate Disabled</h4>
      <panda-checkbox v-model="radioVal.value1" indeterminate disabled size="small">Option Text</panda-checkbox>
    </panda-col>
  </panda-row>
</template>
```

## 多选框组

```vue
<template>
  <panda-row>
    <panda-col span="12">
      <h4>Default</h4>
      <panda-checkbox-group v-model="groupVal" @change="onChange">
        <panda-checkbox :group-value="1">Option 1</panda-checkbox>
        <panda-checkbox :group-value="2">Option 2</panda-checkbox>
        <panda-checkbox :group-value="3">Option 3</panda-checkbox>
      </panda-checkbox-group>
    </panda-col>
    <panda-col span="12">
      <h4>Size Small</h4>
      <panda-checkbox-group v-model="groupVal" size="small">
        <panda-checkbox :group-value="1">Option 1</panda-checkbox>
        <panda-checkbox :group-value="2">Option 2</panda-checkbox>
        <panda-checkbox :group-value="3">Option 3</panda-checkbox>
      </panda-checkbox-group>
    </panda-col>
  </panda-row>

  <panda-row>
    <panda-col span="12">
      <h4>Disabled</h4>
      <panda-checkbox-group v-model="groupVal" disabled>
        <panda-checkbox :group-value="1">Option 1</panda-checkbox>
        <panda-checkbox :group-value="2">Option 2</panda-checkbox>
        <panda-checkbox :group-value="3">Option 3</panda-checkbox>
      </panda-checkbox-group>
    </panda-col>
    <panda-col span="12">
      <h4>Multi Lines</h4>
      <panda-checkbox-group v-model="groupVal">
        <panda-checkbox :group-value="1">Option 1</panda-checkbox>
        <panda-checkbox :group-value="2">Option 2 bla</panda-checkbox>
        <panda-checkbox :group-value="4">Option 4</panda-checkbox>
        <panda-checkbox :group-value="5" disabled>Option 5 blabla</panda-checkbox>
        <panda-checkbox :group-value="6">Option 6 bla bla</panda-checkbox>
      </panda-checkbox-group>
    </panda-col>
  </panda-row>
</template>
```

## indeterminate 状态
> 一般用于多选组中标识处于 **未选 => 全选** 的中间状态

```vue
<template>
  <panda-checkbox
    v-model="checkAll"
    :indeterminate="indeterminate"
    @change="handleCheckAllChange"
  >
    全选
  </panda-checkbox>
  <panda-checkbox-group
    v-model="indeterminateChecked"
    style="margin-top: 20px;"
    @change="handleCheckedChange"
  >
    <panda-checkbox
      :group-value="item"
      v-for="item in indeterminateOptions"
      :key="item"
    >Option {{ item }}</panda-checkbox>
  </panda-checkbox-group>
</template>
```

## 自由布局
> 配合 Grid 可实现自定义布局

```vue
<template>
  <h4>一行四列</h4>
  <panda-checkbox-group v-model="groupVal" @change="onChange">
    <panda-row style="margin-bottom: 20px;">
      <panda-col span="6"><panda-checkbox :group-value="1">Option 1</panda-checkbox></panda-col>
      <panda-col span="6"><panda-checkbox :group-value="2">Option 2</panda-checkbox></panda-col>
      <panda-col span="6"><panda-checkbox :group-value="3">Option 3</panda-checkbox></panda-col>
      <panda-col span="6"><panda-checkbox :group-value="4">Option 4</panda-checkbox></panda-col>
    </panda-row>
    <panda-row style="margin-bottom: 20px;">
      <panda-col span="6"><panda-checkbox :group-value="5">Option 5</panda-checkbox></panda-col>
      <panda-col span="6"><panda-checkbox :group-value="6">Option 6</panda-checkbox></panda-col>
      <panda-col span="6"><panda-checkbox :group-value="7">Option 7</panda-checkbox></panda-col>
      <panda-col span="6"><panda-checkbox :group-value="8">Option 8</panda-checkbox></panda-col>
    </panda-row>
    <panda-row>
      <panda-col span="6"><panda-checkbox :group-value="9">Option 9</panda-checkbox></panda-col>
      <panda-col span="6"><panda-checkbox :group-value="10">Option 10</panda-checkbox></panda-col>
      <panda-col span="6"><panda-checkbox :group-value="11">Option 11</panda-checkbox></panda-col>
    </panda-row>
  </panda-checkbox-group>
</template>
```

## Checkbox Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 是否选中，可通过 v-model 绑定 | String, Number, Boolean | — | (=false-value) |
| true-value | 选中时的值，绑定值与此值相等时选中 | String, Number, Boolean	| true |
| false-value | 没有选中时的值 | String, Number, Boolean | false |
| group-value | 用于单选框组合的给定值 | String, Number | — | - |
| disabled | 是否禁用 | Boolean | — | false |
| size | 尺寸 | String | small | - |
| name | checkbox 对应的 name 属性	 | String | - | - |
| indeterminate | 不确定态，一般用于多选组半选中状态，只起样式作用 | Boolean | — | false |

## Checkbox Events

| 名称 | 介绍 | 参数 |
|-----|------|-----|
| change | 值改变时触发 | (value) |

## CheckboxGroup Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 选中值，可通过 v-model 绑定 | Array | — | - |
| disabled | 是否禁用 | Boolean | — | false |
| size | 尺寸 | String | small | - |

## CheckboxGroup Events

| 名称 | 介绍 | 参数 |
|-----|------|-----|
| change | 值改变时触发 | (value) |


<script>
export default {
  data () {
    return {
      groupVal: [1],
      // indeterminate
      indeterminate: true,
      checkAll: false,
      indeterminateChecked: [1],
      indeterminateOptions: [1,2,3],
      normal: {
        checkbox: true,
        checkbox: 1,
        checkbox: false
      },
      checkbox: {
        value1: [],
        value2: false,
        value3: false
      },
      checkbox: {
        value1: [],
        value2: 'heart',
        value3: 'disable'
      },
      radioVal: {
        value1: false,
        value2: true,
        value3: false,
        value4: true
      },
      tfVal: 'apple',
    }
  },
  methods: {
    onChange (val) {
      console.log('>>> onChange', val);
    },
    handleCheckAllChange(val) {
      this.indeterminateChecked = val ? [...this.indeterminateOptions] : [];
      this.indeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.indeterminateOptions.length;
      this.indeterminate = checkedCount > 0 && checkedCount < this.indeterminateOptions.length;
    },
    toggleTFVal () {
      this.tfVal = this.tfVal === 'apple' ? false : 'apple';
    }
  }
}
</script>

<style scoped>
  .panda-row {
    padding: 0 20px;
  }
  p.tip {
    margin: 0;
    color: #999;
    font-size: 14px;
  }
</style>
