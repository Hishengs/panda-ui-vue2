# Icon

```vue
<template>
  <div class="search">
    <panda-input placeholder="搜索图标" v-model="searchKey" clearable></panda-input>
  </div>
  <span class="container" v-for="(name, i) in icons" :key="i" @click="copyIcon(name)">
    <panda-icon :name="name" size="24"></panda-icon>
    <label class="name">{{ name }}</label>
  </span>
</template>

<script>
  import { icons } from '../icon-tags.js';
  // const iconNames = Object.keys(iconTags);
  export default {
    name: 'icon-preview',
    data (){
      return {
        searchKey: '',
        // iconNames,
        iconList: icons,
      };
    },
    computed: {
      icons (){
        return this.searchKey.trim() ? this.iconList.filter(name => {
          return name.includes(this.searchKey.trim());
        }) : this.iconList;
      }
    },
    methods: {
      copyIcon (name){
        // window.copy(`<panda-icon name="${name}"></panda-icon>`);
        // alert('已复制');
      }
    },
  };
</script>

<style lang= "less" scoped>
  .search {
    margin-bottom: 20px;
  }
  .container {
    display: inline-block;
    margin: 12px 16px;
    padding: 35px 0;
    width: 130px;
    text-align: center;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    &:hover {
      cursor: pointer;
      background-color: #f5f5f5;
    }
    label {
      display: block;
      margin-top: 8px;
    }
  }
</style>
```

## Icon Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 图标名称 | String | — | — |
| size | 图标大小 | String, Number | — | — |
| color | 图标的颜色 | String | — | — |