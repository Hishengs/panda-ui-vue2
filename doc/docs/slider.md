# Slider 滑块选择器

通过拖动滑块在一个固定区间内进行选择

## 基础
```vue
<template>
  <h4>默认：{{ val1 }}</h4>
  <panda-slider v-model="val1"></panda-slider>
  <h4>带初始值：{{ val2 }}</h4>
  <panda-slider v-model="val2" @change="onChange" @input="onInput"></panda-slider>
</template>
```

## 双向区间选择
```vue
<template>
  <h4>数值：￥{{ val3[0] }}-￥{{ val3[1] }}</h4>
  <panda-slider v-model="val3" range></panda-slider>
</template>
```

## 禁用
```vue
<template>
  <panda-slider :value="30" disabled></panda-slider>
  <panda-slider :value="[0, 100]" range disabled></panda-slider>
</template>
```

## 步长
```vue
<template>
  <h4>步长 5：{{ val4 }}</h4>
  <panda-slider v-model="val4" :step="5"></panda-slider>
  <h4>显示间断点</h4>
  <panda-slider v-model="val4" :step="5" show-stops></panda-slider>
</template>
```

<script>
  export default {
    data () {
      return {
        val1: 0,
        val2: 30,
        val3: [0, 50],
        val4: 20,
      };
    },
    methods: {
      onChange (val) {
        console.log('>>> onChange', val);
      },
      onInput (val) {
        console.log('>>> onInput', val);
      }
    },
  };
</script>

## slider Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 绑定值，可通过 v-model 控制 | Number, Number[] | — | - |
| min | 范围最小值 | Number | — | 0 |
| max | 范围最大值 | Number | — | 100 |
| disabled | 禁用 | Boolean | — | false |
| range | 是否区间选择 | Boolean | — | false |

<!-- | step | 步长 | Number | — | 1 |
| show-stops | 是否显示间断点 | Boolean | — | false | -->

## slider Events

| 名称 | 介绍 | 参数 |
|-----|------|-----|
| change | 值改变时触发，鼠标松开触发 | (value) |
| input | 值改变时触发，拖动过程触发 | (value) |
