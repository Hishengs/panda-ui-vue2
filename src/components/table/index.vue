// 待实现的功能
// 可选 select
// 筛选 filter
// 排序 sort
// 搜索 search
// 定义高度宽度
// 多级表头
// 展开行 expand
</script>

<template>
	<div class="panda-table" :class="cClass">
    <div class="main table-wrapper">
      <!-- head -->
      <div class="head" ref="head" :style="headStyle" v-if="showHeader">
        <!-- left fixed head -->
        <div class="left-fixed" ref="leftFixedHead" v-if="hasLeftFixed" :class="{ scrolled: !!scrollLeft }" :style="{ height: `${headHeight}px` }">
          <table-head :columns="leftFixedColumns"></table-head>
        </div>
        <table-head :columns="mainColumns" :column-widths="columnWidths" :has-scrollbar="hasScrollbar"></table-head>
        <!-- right fixed head -->
        <div class="right-fixed" ref="rightFixedHead" v-if="hasRightFixed"  :class="{ scrolled: !!scrollLeft }" :style="{ height: `${headHeight}px` }">
          <table-head :columns="rightFixedColumns"></table-head>
        </div>
      </div>
      <!-- body -->
      <div class="body" ref="body" :style="bodyStyle">
        <!-- left fixed body -->
        <div class="left-fixed" ref="leftFixedBody" v-if="hasLeftFixed" :class="{ scrolled: !!scrollLeft }" :style="{ width: `${leftFixedWidth}px`, top: `${headHeight}px` }">
          <table-body :columns="leftFixedColumns" :data="data" :style="{ height: `${bodyHeight}px` }"></table-body>
        </div>
        <table-body ref="mainBody" :columns="mainColumns" :data="data" :style="{ height: `${bodyHeight}px` }"></table-body>
        <!-- right fixed body -->
        <div class="right-fixed" ref="rightFixedBody" v-if="hasRightFixed" :class="{ scrolled: !!scrollLeft }" :style="{ width: `${rightFixedWidth}px`, top: `${headHeight}px` }">
          <table-body :columns="rightFixedColumns" :data="data" :style="{ height: `${bodyHeight}px` }"></table-body>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import tableHead from './table-head.vue';
  import tableBody from './table-body.vue';
  export default {
    name: 'panda-table',
    components: {
      tableHead,
      tableBody,
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
      headStyle (){
        return {
          paddingLeft: `${this.leftFixedWidth}px`,
          paddingRight: `${this.rightFixedWidth}px`,
        };
      },
      bodyStyle (){
        return {
          height: this.height,
          maxHeight: this.maxHeight,
          minHeight: this.minHeight,
          paddingLeft: `${this.leftFixedWidth}px`,
          paddingRight: `${this.rightFixedWidth}px`,
        };
      },
      // 是否有滚动条
      hasScrollbar (){
        return !!this.height;
      },
      // 固定于左边的表格
      leftFixedColumns (){
        return this.columns.filter(col => {
          return col.fixed === 'left';
        });
      },
      hasLeftFixed (){
        return this.leftFixedColumns.length !== 0;
      },
      // 主表格
      mainColumns (){
        const notFixedColumns = this.columns.filter(col => {
          return !['left', 'right'].includes(col.fixed);
        });
        return notFixedColumns;
      },
      // 固定于右边的表格
      rightFixedColumns (){
        return this.columns.filter(col => {
          return col.fixed === 'right';
        });
      },
      hasRightFixed (){
        return this.rightFixedColumns.length !== 0;
      },
    },
    data (){
      return {
        // 计算出来的各列的宽度
        columnWidths: [],
        // 滚动条的宽度
        scrollBarWidth: 17,
        // 表格头部的高度
        headHeight: 0,
        // 表格主体的高度
        bodyHeight: 0,
        scrollLeft: 0,
        // 左表格的宽度
        leftFixedWidth: 0,
        // 右表格的宽度
        rightFixedWidth: 0,
      };
    },
    watch: {
      data (newData){
        this.$nextTick(() => {
          this.resize();
        });
      },
    },
    mounted (){
      this.calculateColumnsWidth();
      this.syncScroll();
      this.resize();
    },
    methods: {
      resize (){
        // 主表格表头高度
        const mHeadHeight = this.$refs.head ? parseInt(this.getStyle(this.$refs.head, 'height'), 10) : 0;
        let maxHeadHeight = mHeadHeight;

        // 主表格主体高度
        const mBodyHeight = this.$refs.body ? parseInt(this.getStyle(this.$refs.body.querySelector('table'), 'height'), 10) : 0;
        let maxBodyHeight = mBodyHeight;

        if (this.hasLeftFixed){
          const lHeadHeight = this.$refs.leftFixedHead ? parseInt(this.getStyle(this.$refs.leftFixedHead, 'height'), 10) : 0;
          maxHeadHeight = this.getMaxOf([maxHeadHeight, lHeadHeight]);
          const lBodyHeight = this.$refs.leftFixedBody ? parseInt(this.getStyle(this.$refs.leftFixedBody.querySelector('table'), 'height'), 10) : 0;
          maxBodyHeight = this.getMaxOf([maxBodyHeight, lBodyHeight]);
          // 设置左表格的宽度
          this.leftFixedWidth = this.$refs.leftFixedHead ? parseInt(this.getStyle(this.$refs.leftFixedHead, 'width'), 10) : 0;
        }
        if (this.hasRightFixed){
          const rHeadHeight = this.$refs.rightFixedHead ? parseInt(this.getStyle(this.$refs.rightFixedHead, 'height'), 10) : 0;
          maxHeadHeight = this.getMaxOf([maxHeadHeight, rHeadHeight]);
          const rBodyHeight = this.$refs.rightFixedBody ? parseInt(this.getStyle(this.$refs.rightFixedBody.querySelector('table'), 'height'), 10) : 0;
          maxBodyHeight = this.getMaxOf([maxBodyHeight, rBodyHeight]);
          // 设置右表格的宽度
          this.rightFixedWidth = this.$refs.rightFixedHead ? parseInt(this.getStyle(this.$refs.rightFixedHead, 'width'), 10) : 0;
        }
        // 设置表格头部高度
        this.headHeight = maxHeadHeight;
        this.bodyHeight = maxBodyHeight;
      },
      // 同步滚动事件
      syncScroll (){
        if (!this.hasLeftFixed && !this.hasRightFixed){
          return;
        }
        // 主表格的滚动
        this.$refs.body.addEventListener('scroll', e => {
          // console.log(e.target);
          // 保持表格头部与表格一起滚动
          this.$refs.head.scrollLeft = this.$refs.body.scrollLeft;
          // 左右固定表格跟随主表格滚动
          if (this.hasLeftFixed){
            this.$refs.leftFixedBody.scrollTop = this.$refs.body.scrollTop;
          }
          if (this.hasRightFixed){
            this.$refs.rightFixedBody.scrollTop = this.$refs.body.scrollTop;
          }
          this.scrollLeft = this.$refs.body.scrollLeft;
        });
        // 左表格滚动
        // if (this.hasLeftFixed){
        //   this.$refs.leftFixedBody.addEventListener('scroll', e => {
        //     this.$refs.body.scrollTop = this.$refs.leftFixedBody.scrollTop;
        //   });
        // }
        // 右表格滚动
        // if (this.hasRightFixed){
        //   this.$refs.rightFixedBody.addEventListener('scroll', e => {
        //     this.$refs.body.scrollTop = this.$refs.rightFixedBody.scrollTop;
        //   });
        // }
      },
      // 计算各列的宽度
      calculateColumnsWidth (){
        const tds = this.$refs.body.querySelector('tr:first-child').querySelectorAll('td');
        for (let i = 0, len = tds.length; i < len; i++){
          const td = tds[i];
          const style = global.getComputedStyle(td);
          const width =
            parseFloat(style.borderLeftWidth)
            + parseFloat(style.paddingLeft)
            + parseFloat(style.width)
            + parseFloat(style.paddingRight)
            + ((this.height && i === len - 1) ? parseFloat(style.borderRightWidth) : 0);
          this.columnWidths.push(width);
        }
      },
      getStyle (el, style){
        return global.document.defaultView.getComputedStyle(el)[style];
      },
      getMaxOf (nums){
        let max = 0;
        for (const num of nums){
          if (num > max){
            max = num;
          }
        }
        return max;
      },
    },
  };
</script>
