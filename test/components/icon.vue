<template>
  <div id="Icon">
    <h2>Icon 图标</h2>
    <div class="search">
      <Input placeholder="搜索图标" v-model="searchKey" clearable></Input>
    </div>
    <span class="container" v-for="(name, i) in icons" :key="i" @click="copyIcon(name)">
      <Icon :name="name" size="24"></Icon>
      <label class="name">{{ name }}</label>
    </span>
    <h3>Props</h3>
    <table>
      <tr>
        <th>名称</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>name</td>
        <td>icon 名称</td>
        <td>String</td>
        <td>--</td>
      </tr>
      <tr>
        <td>size</td>
        <td>icon 大小</td>
        <td>Number</td>
        <td>--</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { icons } from './icon-tags.js';
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
        // window.copy(`<Icon name="${name}"></Icon>`);
        // alert('已复制');
      }
    },
  };
</script>

<style lang= "less" scoped>
  #Icon {
    padding: 0 10px;
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
  }
</style>