# 标签输入框

```vue
<template>
  <panda-tag-input v-model="tags" :recommend-tags="recommendTags"></panda-tag-input>
</template>

<script>
  export default {
    name: 'tag-input-preview',
    data (){
      return {
        tags: [],
        recommendTags: ['大宝剑', '马杀鸡'],
      };
    },
  };
</script>
```