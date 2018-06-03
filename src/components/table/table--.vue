// 待实现的功能
// 固定表头（老大难问题）
// 可选 select
// 筛选 filter
// 排序 sort
// 搜索 search
// 定义高度宽度
// 固定列
// 多级表头
// 展开行 expand
// 指定各列的宽度
</script>

<template>
	<div class="panda-table" :class="cClass" :style="cStyle">
    <!-- head -->
    <base-table
      :columns="columns" 
      :data="data" 
      :height="height"
      :min-height="minHeight"
      :max-height="maxHeight"
      :show-header="showHeader"
    ></base-table>
	</div>
</template>

<script>
  import baseTable from './base-table.vue';
  export default {
    name: 'panda-table',
    components: {
      baseTable,
    },
    props: {
      columns: {
        type: Array,
        default: () => [],
      },
      data: {
        type: Array,
        default: () => [],
      },
      height: {
        type: [Number, String],
      },
      minHeight: {
        type: [Number, String],
      },
      maxHeight: {
        type: [Number, String],
      },
      // 斑马纹
      stripe: Boolean,
      // 边框
      border: Boolean,
      // 加载中
      loading: Boolean,
      // 大小
      size: {
        type: String,
        validator: (size) => {
          return ['normal', 'large', 'small', 'mini'].includes(size);
        },
      },
      // 对齐方式
      align: {
        type: String,
        validator: (align) => {
          return ['center', 'left', 'right'].includes(align);
        },
      },
      // 是否显示表头
      showHeader: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      cClass (){
        return [
          this.size,
          this.stripe ? 'stripe' : '',
          this.border ? 'border' : '',
          this.align ? `align-${this.align}` : '',
          this.height ? 'height' : '',
          this.loading ? 'loading' : '',
        ].filter(cls => cls !== '').join(' ').trim();
      },
      cStyle (){
        return {
          paddingLeft: `${this.leftFixedWidth}px`,
        };
      },
      // left fixed columns
      leftFixedColumns (){
        return this.columns.filter(col => {
          return col.fixed === 'left';
        });
      },
      // main columns
      mainColumns (){
        const notFixedColumns = this.columns.filter(col => {
          return !['left', 'right'].includes(col.fixed);
        });
        return this.leftFixedColumns.concat(notFixedColumns).concat(this.rightFixedColumns);
      },
      // right fixed columns
      rightFixedColumns (){
        return this.columns.filter(col => {
          return col.fixed === 'right';
        });
      },
    },
    data (){
      return {
        leftFixedWidth: 0,
      };
    },
    mounted (){
      //
    },
    methods: {
      //
    },
  };
</script>
