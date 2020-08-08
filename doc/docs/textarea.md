# Textarea

## 默认
```vue
<template>
<panda-textarea v-model="val"></panda-textarea>
</template>
```

## 禁用
```vue
<template>
  <panda-textarea v-model="val" disabled></panda-textarea>
</template>
```

## 最大行数 maxRows 5
```vue
<template>
  <panda-textarea v-model="val" :maxRows="5"></panda-textarea>
</template>
```

## 最小行数 minRows 3
```vue
<template>
  <panda-textarea v-model="val" :minRows="3"></panda-textarea>
</template>
```

## 自动对焦 autofocus
```vue
<template>
  <panda-textarea v-model="val" autofocus></panda-textarea>
</template>
```

<script>
  export default {
    name: 'textarea-preview',
    data (){
      return {
        val: '世界和平',
      };
    },
    watch: {
      val (newVal){
        console.log('>>> [test]panda-textarea.watch val', newVal);
      }
    },
  };
</script>
