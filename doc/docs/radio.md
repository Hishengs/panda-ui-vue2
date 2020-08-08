# Radio 单选框

## 默认
> 单选框在单独使用时一般用于 **未选中 => 选中** 状态的切换，选中后无法取消


```vue
<panda-row>
  <panda-col span="6">
    <h4>UnChecked</h4>
    <panda-radio v-model="radioVal.value1" @change="onChange">Option 1</panda-radio>
  </panda-col>
  <panda-col span="6">
    <h4>Checked</h4>
    <panda-radio v-model="radioVal.value2">Option 2</panda-radio>
  </panda-col>
  <panda-col span="6">
    <h4>Solo</h4>
    <panda-radio v-model="radioVal.value1"></panda-radio>
  </panda-col>
  <panda-col span="6">
    <h4>Multi Lines</h4>
    <panda-radio v-model="radioVal.value1">Option 1 bla bla bla bla bla bla bla bla</panda-radio>
  </panda-col>
</panda-row>

<script>
export default {
  data () {
    return {
      radioVal: {
        value1: false,
        value2: true,
        value3: false,
        value4: true,
      }
    }
  }
}
</script>
```

## 禁用状态

```vue
<panda-row>
  <panda-col span="8">
    <h4>UnChecked Disabled</h4>
    <panda-radio v-model="radioVal.value3" disabled>Option Text</panda-radio>
  </panda-col>
  <panda-col span="8">
    <h4>Checked Disabled</h4>
    <panda-radio v-model="radioVal.value4" disabled>Option Text</panda-radio>
  </panda-col>
  <panda-col span="8">
    <h4>Solo Disabled</h4>
    <panda-radio v-model="radioVal.value1" disabled></panda-radio>
  </panda-col>
</panda-row>
```


## 大小 Size
> 在正常尺寸之外提供一种 small 尺寸


```vue
<panda-row>
  <panda-col span="12">
    <h4>Off</h4>
    <panda-radio v-model="radioVal.value1" size="small">Option Text</panda-radio>
  </panda-col>
  <panda-col span="12">
    <h4>On</h4>
    <panda-radio v-model="radioVal.value2" size="small">Option Text</panda-radio>
  </panda-col>
</panda-row>

<panda-row>
  <panda-col span="12">
    <h4>Off Disabled</h4>
    <panda-radio v-model="radioVal.value3" disabled size="small">Option Text</panda-radio>
  </panda-col>
  <panda-col span="12">
    <h4>On Disabled</h4>
    <panda-radio v-model="radioVal.value4" disabled size="small">Option Text</panda-radio>
  </panda-col>
</panda-row>
```


## 单选组
> 当单选框在组合中使用时，会产生互斥作用，只有一个选项能被选中


```vue
<panda-row>
  <panda-col span="12">
    <h4>Default</h4>
    <panda-radio-group v-model="groupVal" @change="onChange">
      <panda-radio :group-value="1">Option 1</panda-radio>
      <panda-radio :group-value="2">Option 2</panda-radio>
      <panda-radio :group-value="3">Option 3</panda-radio>
    </panda-radio-group>
  </panda-col>
  <panda-col span="12">
    <h4>Size Small</h4>
    <panda-radio-group v-model="groupVal" size="small">
      <panda-radio :group-value="1">Option 1</panda-radio>
      <panda-radio :group-value="2">Option 2</panda-radio>
      <panda-radio :group-value="3">Option 3</panda-radio>
    </panda-radio-group>
  </panda-col>
</panda-row>

<panda-row>
  <panda-col span="12">
    <h4>Disabled</h4>
    <panda-radio-group v-model="groupVal" disabled>
      <panda-radio :group-value="1">Option 1</panda-radio>
      <panda-radio :group-value="2">Option 2</panda-radio>
      <panda-radio :group-value="3">Option 3</panda-radio>
    </panda-radio-group>
  </panda-col>
  <panda-col span="12">
    <h4>Multi Lines</h4>
    <panda-radio-group v-model="groupVal">
      <panda-radio :group-value="1">Option 1</panda-radio>
      <panda-radio :group-value="2">Option 2 bla</panda-radio>
      <panda-radio :group-value="4">Option 4</panda-radio>
      <panda-radio :group-value="5" disabled>Option 5 blabla</panda-radio>
      <panda-radio :group-value="6">Option 6 blabla blabla</panda-radio>
    </panda-radio-group>
  </panda-col>
</panda-row>
```


## Radio Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 是否选中，可通过 v-model 绑定 | String, Number, Boolean | — | (=false-value) |
| true-value | 选中时的值 | String, Number, Boolean	| true |
| false-value | 没有选中时的值 | String, Number, Boolean | false |
| group-value | 用于单选框组合的给定值 | String, Number | — | - |
| disabled | 是否禁用 | Boolean | — | false |
| size | 尺寸 | String | small | - |
| name | radio 对应的 name 属性	 | String | - | - |

## Radio Events

| 名称 | 介绍 | 参数 |
|-----|------|-----|
| change | 值改变时触发 | (value) |

## RadioGroup Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 选中值，可通过 v-model 绑定 | Array | — | - |
| disabled | 是否禁用 | Boolean | — | false |
| size | 尺寸 | String | small | - |

## RadioGroup Events

| 名称 | 介绍 | 参数 |
|-----|------|-----|
| change | 值改变时触发 | (value) |


<script>
export default {
  data () {
    return {
      groupVal: 1,
      normal: {
        checkbox: true,
        radio: 1,
        radio: false
      },
      checkbox: {
        value1: [],
        value2: false,
        value3: false
      },
      radio: {
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
      tfVal: '',
    }
  },
  computed: {
    checkAll () {
      return this.checkbox.value1.length > 0;
    }
  },
  methods: {
    onChange (val) {
      console.log('>>> onChange', val);
    },
    toggleTFVal () {
      this.tfVal = this.tfVal === 'apple' ? false : 'apple';
    }
  }
}
</script>
