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
    <Table :columns="columns" :data="data" align="center"></Table>
    <Table :columns="columns" :data="data" align="right"></Table>
    <h3>5. 设置高度 固定表头</h3>
    <h4>height(300px)</h4>
    <Table :columns="columns" :data="hugeData(100)" height="300px" border></Table>
    <h4>max-height(500px)</h4>
    <Table :columns="columns" :data="hugeData(300)" max-height="500px"></Table>
    <h3>6. 大小 size="normal | large | small | mini"</h3>
    <h4>mini</h4>
    <Table :columns="columns" :data="data" size="mini"></Table>
    <h4>small</h4>
    <Table :columns="columns" :data="data" size="small"></Table>
    <h4>normal</h4>
    <Table :columns="columns" :data="data" size="normal"></Table>
    <h4>large</h4>
    <Table :columns="columns" :data="data" size="large"></Table>
    <h3>7. 隐藏表头 hide-header</h3>
    <Table :columns="columns" :data="data" stripe hide-header></Table>
    <h3>8. 超出外层宽度</h3>
    <h4>x 轴超出</h4>
    <Table :columns="widthColumns" :data="lessData" height="300px" stripe border></Table>
    <h4>x, y 轴超出</h4>
    <Table :columns="widthColumns" :data="moreData" height="300px" stripe border></Table>
    <h3>9. 固定列</h3>
    <h4>左侧单列固定</h4>
    <Table :columns="leftFixedOneColumns" :data="moreData" height="300px" stripe border></Table>
    <h4>左侧多列固定</h4>
    <Table :columns="leftFixedColumns" :data="moreData" height="300px" stripe border></Table>
    <h4>左右侧固定</h4>
    <Table :columns="fixedColumns" :data="moreData" height="300px" stripe border></Table>
    <h3>10. 虚拟表格</h3>
    <h4>数据量：{{ vData.length }}</h4>
    <Table :columns="columns" :data="vData" height="500px" border virtual></Table>
    <!-- <h4>左右侧固定的虚拟表格</h4> -->
    <!-- <Table :columns="fixedColumns" :data="hugeData(50)" height="300px" stripe border virtual></Table> -->
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
            className: 'education',
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
        leftFixedOneColumns: [
          {
            title: '姓名',
            key: 'name',
            fixed: 'left',
            width: 120,
          },
          {
            title: '年龄',
            key: 'age',
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
            width: 100,
          },
        ],
        leftFixedColumns: [
          {
            title: '姓名',
            key: 'name',
            fixed: 'left',
            width: 120,
          },
          {
            title: '年龄',
            key: 'age',
            fixed: 'left',
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
            width: 100,
          },
        ],
        fixedColumns: [
          {
            title: '姓名',
            key: 'name',
            fixed: 'left',
            // width: 120,
          },
          {
            title: '年龄',
            key: 'age',
            fixed: 'left',
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
          { name: '张小帅', age: 21, education: '小学', address: '北京朝阳区幸福里小区7栋', className: '张小帅' },
          { name: '王大锤', age: 25, education: '本科', address: '上海陆家嘴商贸大厦16层5B', },
          { name: '周星星', age: 33, education: '中学', address: '尘世中的一只迷途小羔羊', },
          { name: '匿名者', age: 29, education: '未知', address: '海底两万里', },
        ],
        lessData: [
          { name: '张小帅', age: 21, education: '小学', address: '北京朝阳区幸福里小区7栋', },
        ],
        moreData: [
          { name: '张小帅', age: 21, education: '小学', address: '北京朝阳区幸福里小区7栋，北京朝阳区幸福里小区7栋', },
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
        vData: Object.freeze(this.hugeData(1000000)),
      };
    },
    methods: {
      hugeData (len) {
        const startTime = new Date().getTime();
        console.log('==== 开始模拟数据', startTime);
        const data = [];
        for (let i = 0; i < len; i++){
          // const id = Math.random().toString().slice(2, 8);
          data.push({ name: `张小帅${i}`, age: i, education: `小学${i}`, address: `北京朝阳区幸福里小区${i}栋`, });
          // data.push({ name: '张小帅' + i, age: i, education: '小学' + i, address: '北京朝阳区幸福里小区' + i + '栋', });
        }
        const endTime = new Date().getTime();
        console.log('==== 结束模拟数据', endTime, data.length, '条数据', '花了 ', (endTime - startTime) / 1000, 's');
        return data;
      },
    },
  };
</script>
