<template>
  <div class="icon-preview">
    <div class="search">
      <Input placeholder="搜索图标" v-model="searchKey" clearable></Input>
    </div>
    <span class="container" v-for="name,i in icons" @click="copyIcon(name)">
      <Icon :name="name" size="20"></Icon>
      <label class="name">{{ name }}</label>
    </span>
  </div>
</template>

<script>
  import iconTags from './icon-tags.js';
  const iconNames = Object.keys(iconTags);
  export default {
    name: 'icon-preview',
    data (){
      return {
        searchKey: '',
        iconNames,
      };
    },
    computed: {
      icons (){
        return this.searchKey.trim() ? this.iconNames.filter(name => {
          return name.includes(this.searchKey.trim());
        }) : this.iconNames;
      }
    },
    methods: {
      copyIcon (name){
        // window.copy(`<Icon name="${name}"></Icon>`);
        // alert('已复制');
      }
    },
  };
</script>

<style lang= "less" scoped>
  .icon-preview {
    padding: 0 10px;
    .container {
      display: inline-block;
      margin: 10px 0;
      padding: 30px 0;
      width: 110px;
      text-align: center;
      &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
      }
      label {
        display: block;
        margin-top: 8px;
      }
    }
  }
</style>