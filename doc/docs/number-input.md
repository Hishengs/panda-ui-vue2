# NumberInput 数字输入框

## 默认
```vue
<template>
  <panda-number-input placeholder="数字输入框" v-model="val"></panda-number-input>
</template>
```

## 禁用
```vue
<template>
  <panda-number-input placeholder="数字输入框" v-model="val" disabled></panda-number-input>
</template>
```

## 只读
```vue
<template>
  <panda-number-input placeholder="数字输入框" v-model="val" readonly></panda-number-input>
</template>
```

## 步长 step 2
```vue
<template>
  <panda-number-input placeholder="数字输入框" v-model="val" :step="2"></panda-number-input>
</template>
```

## 保留精度 precision 4
```vue
<template>
  <panda-number-input placeholder="数字输入框" v-model="val" :step="0.2" :precision="4"></panda-number-input>
</template>
```

## 是否可编辑 editable
```vue
<template>
  <panda-number-input placeholder="是否可编辑 editable" v-model="val" :editable="false"></panda-number-input>
</template>
```

<script>
  export default {
    name: 'number-input-preview',
    data (){
      return {
        val: 1,
      };
    },
  };
</script>