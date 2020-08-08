
# Switch 开关

## 默认
```vue
<template>
  <panda-switch v-model="checked"></panda-switch>
</template>
```

## 禁用
```vue
<template>
  <panda-switch :disabled="true"></panda-switch>
</template>
```

## 大小
```vue
<template>
  小 <panda-switch v-model="checked" size="small"></panda-switch>
  正常 <panda-switch v-model="checked"></panda-switch>
  大 <panda-switch v-model="checked" size="large"></panda-switch>
</template>
```

<script>
  export default {
    name: 'switch-preview',
    data (){
      return {
        checked: false,
      };
    },
  };
</script>