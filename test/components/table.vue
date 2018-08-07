<template>
  <div id="Table">
    <h2>Table 表格</h2>
    <h3>1. 默认表格</h3>
    <Table :columns="columns" :data="data"></Table>
    <h3>2. 带边框 border</h3>
    <Table :columns="columns" :data="data" border></Table>
    <h3>3. 斑马纹 stripe</h3>
    <Table :columns="columns" :data="data" stripe></Table>
    <h3>4. 对齐方式 align="left|center|right" 默认居中</h3>
    <Table :columns="columns" :data="data" align="left"></Table>
    <h3>5. 设置高度 固定表头</h3>
    <h4>height</h4>
    <Table :columns="columns" :data="hugeData(100)" height="300px" align="left" border></Table>
    <h4>min-height</h4>
    <Table :columns="columns" :data="lessData" min-height="100px"></Table>
    <h3>6. 大小 size="normal | large | small | mini"</h3>
    <h4>mini</h4>
    <Table :columns="columns" :data="data" size="mini"></Table>
    <h4>small</h4>
    <Table :columns="columns" :data="data" size="small"></Table>
    <h4>normal</h4>
    <Table :columns="columns" :data="data" size="normal"></Table>
    <h4>large</h4>
    <Table :columns="columns" :data="data" size="large"></Table>
    <h3>7. 隐藏表头 show-header="false"</h3>
    <Table :columns="columns" :data="data" stripe :show-header="false"></Table>
    <h3>8. 超出外层宽度</h3>
    <Table :columns="widthColumns" :data="moreData" height="300px" stripe></Table>
    <h3>9. 固定列</h3>
    <Table :columns="fixedColumns" :data="moreData" height="300px" stripe></Table>
    <h3>10. 数据片段（大数据渲染）</h3>
    <Table :columns="widthColumns" :data="hugeData(100)" height="300px" :enable-segment="true" stripe></Table>
  </div>
</template>

<script>
  export default {
    name: 'table-preview',
    data (){
      return {
        columns: [
          {
            title: '姓名',
            key: 'name',
          },
          {
            title: '年龄',
            key: 'age',
          },
          {
            title: '学历',
            key: 'education',
          },
          {
            title: '住址',
            key: 'address',
          },
        ],
        widthColumns: [
          {
            title: '姓名',
            key: 'name',
            width: 180,
          },
          {
            title: '年龄',
            key: 'age',
            width: 180,
          },
          {
            title: '学历',
            key: 'education',
            width: 180,
          },
          {
            title: '住址',
            key: 'address',
            width: 300,
          },
        ],
        fixedColumns: [
          {
            title: '姓名',
            key: 'name',
            fixed: 'left',
            width: 120,
          },
          {
            title: '年龄',
            key: 'age',
            // fixed: 'left',
            width: 150,
          },
          {
            title: '学历',
            key: 'education',
            width: 580,
          },
          {
            title: '住址',
            key: 'address',
            fixed: 'right',
            width: 100,
          },
        ],
        data: [
          { name: '张小帅', age: 21, education: '小学', address: '北京朝阳区幸福里小区7栋', },
          { name: '王大锤', age: 25, education: '本科', address: '上海陆家嘴商贸大厦16层5B', },
          { name: '周星星', age: 33, education: '中学', address: '尘世中的一只迷途小羔羊', },
          { name: '匿名者', age: 29, education: '未知', address: '海底两万里', },
        ],
        lessData: [
          { name: '张小帅', age: 21, education: '小学', address: '北京朝阳区幸福里小区7栋', },
        ],
        moreData: [
          { name: '张小帅', age: 21, education: '小学', address: '北京朝阳区幸福里小区7栋', },
          { name: '王大锤', age: 25, education: '本科', address: '上海陆家嘴商贸大厦16层5B', },
          { name: '周星星', age: 33, education: '中学', address: '尘世中的一只迷途小羔羊', },
          { name: '张小帅', age: 21, education: '小学', address: '北京朝阳区幸福里小区7栋', },
          { name: '王大锤', age: 25, education: '本科', address: '上海陆家嘴商贸大厦16层5B', },
          { name: '周星星', age: 33, education: '中学', address: '尘世中的一只迷途小羔羊', },
          { name: '张小帅', age: 21, education: '小学', address: '北京朝阳区幸福里小区7栋', },
          { name: '王大锤', age: 25, education: '本科', address: '上海陆家嘴商贸大厦16层5B', },
          { name: '周星星', age: 33, education: '中学', address: '尘世中的一只迷途小羔羊', },
          { name: '张小帅', age: 21, education: '小学', address: '北京朝阳区幸福里小区7栋', },
          { name: '王大锤', age: 25, education: '本科', address: '上海陆家嘴商贸大厦16层5B', },
          { name: '周星星', age: 33, education: '中学', address: '尘世中的一只迷途小羔羊', },
        ],
      };
    },
    methods: {
      hugeData (len){
        let data = [];
        for (let i = 0; i < len; i++){
          const id = Math.random().toString().slice(2, 6);
          data = data.concat([
            { name: `张小帅${id}`, age: 21, education: '小学', address: '北京朝阳区幸福里小区7栋', },
            { name: `王大锤${id}`, age: 25, education: '本科', address: '上海陆家嘴商贸大厦16层5B', },
            { name: `周星星${id}`, age: 33, education: '中学', address: '尘世中的一只迷途小羔羊', },
            { name: `匿名者${id}`, age: 29, education: '未知', address: '海底两万里', },
          ]);
        }
        return data;
      },
    },
  };
</script>
