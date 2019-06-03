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
        <div class="left-fixed" ref="leftFixedHead" v-if="hasLeftFixed" :class="{ scrolled: !!scrollLeft }">
          <table-head :columns="leftFixedColumns"></table-head>
        </div>
        <!-- main table head -->
        <table-head
          ref="mainHead"
          :columns="columns"
          :column-widths="columnWidths"
          :scrollbar="{
            x: hasScrollBarX,
            y: hasScrollBarY,
            width: scrollBarWidth
          }"
        ></table-head>
        <!-- right fixed head -->
        <div class="right-fixed" ref="rightFixedHead" v-if="hasRightFixed"  :class="{ scrolled: !!scrollLeft }">
          <table-head
            :columns="rightFixedColumns"
            :scrollbar="{
              x: hasScrollBarX,
              y: hasScrollBarY,
              width: scrollBarWidth
            }"
          ></table-head>
        </div>
      </div>
      <!-- body -->
      <div class="body" ref="body" :style="bodyStyle">
        <!-- left fixed body -->
        <div
          class="left-fixed" ref="leftFixedBody"
          v-if="hasLeftFixed"
          :class="{ scrolled: !!scrollLeft }"
          :style="{ width: `${leftFixedWidth}px`, top: `${this.border ? headHeight + 1 : headHeight}px` }"
        >
          <table-body :columns="leftFixedColumns" :data="showData" :style="{ height: `${bodyHeight}px` }"></table-body>
        </div>
        <!-- main table body -->
        <table-body
          ref="mainBody"
          :columns="columns"
          :column-widths="columnWidths"
          :data="showData"
          :scrollbar="{
            x: hasScrollBarX,
            y: hasScrollBarY,
            width: scrollBarWidth
          }"
          :style="tableStyle"
        ></table-body>
        <!-- right fixed body -->
        <div
          class="right-fixed" ref="rightFixedBody"
          v-if="hasRightFixed"
          :class="{ scrolled: !!scrollLeft }"
          :style="{ width: `${rightFixedWidth}px`, top: `${this.border ? headHeight + 1 : headHeight}px` }"
        >
          <table-body :columns="rightFixedColumns" :data="showData" :style="{ height: `${bodyHeight}px` }"></table-body>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import tableHead from './table-head.vue';
  import tableBody from './table-body.vue';
  import { getComputedStyle } from '../../utils/dom.js';

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
        default: 'normal',
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
      // 是否启用数据片段进行大数据量优化
      enableSegment: Boolean,
      // 是否懒加载
      lazyLoad: Boolean,
    },
    computed: {
      cClass () {
        return [
          this.size,
          this.stripe ? 'stripe' : '',
          this.border ? 'border' : '',
          this.align ? `align-${this.align}` : '',
          this.height ? 'height' : '',
          this.loading ? 'loading' : '',
          this.hasScrollBarX ? 'scroll-x' : '',
          this.hasScrollBarY ? 'scroll-y' : '',
        ].filter(cls => cls !== '').join(' ').trim();
      },
      headStyle () {
        return {
          // paddingLeft: `${this.leftFixedWidth}px`,
          // paddingRight: `${this.rightFixedWidth}px`,
          // marginBottom: this.hasScrollBarX ? `-${this.scrollBarWidth}px` : '',
        };
      },
      bodyStyle () {
        return {
          height: this.height,
          maxHeight: this.maxHeight || this.height,
          minHeight: this.minHeight,
          // paddingLeft: `${this.leftFixedWidth}px`,
          // paddingRight: `${this.rightFixedWidth}px`,
          // paddingRight: this.hasScrollBarY ? `${this.rightFixedWidth - this.scrollBarWidth}px` : `${this.rightFixedWidth}px`,
          marginRight: `-${this.hasScrollBarX ? this.scrollBarWidth : 0}px`,
        };
      },
      tableStyle () {
        return {
          marginTop: `${this.segment.enabled ? this.segment.marginTop : 0}px`,
          marginBottom: `${this.segment.enabled ? this.segment.marginBottom : 0}px`,
          height: `${this.bodyHeight}px`,
        };
      },
      // 固定于左边的表格
      leftFixedColumns () {
        return this.columns.filter(col => {
          return col.fixed === 'left';
        });
      },
      hasLeftFixed () {
        return this.leftFixedColumns.length !== 0;
      },
      // 主表格
      mainColumns () {
        const notFixedColumns = this.columns.filter(col => {
          return !['left', 'right'].includes(col.fixed);
        });
        return notFixedColumns;
      },
      // 固定于右边的表格
      rightFixedColumns () {
        return this.columns.filter(col => {
          return col.fixed === 'right';
        });
      },
      hasRightFixed () {
        return this.rightFixedColumns.length !== 0;
      },
      rowHeight () {
        return {
          normal: 42,
          large: 45,
          small: 33,
          mini: 29,
        }[this.size];
      },
      // 当前显示的数据
      showData () {
        return this.lazyLoad ? this.data.slice(this.lazyLoadConfig.offsetLeft, this.lazyLoadConfig.offsetRight) : this.data;
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
        // 是否有Y轴滚动条
        hasScrollBarY: false,
        // 是否有X轴滚动条
        hasScrollBarX: false,
        // 数据片段
        segment: {
          enabled: false, // 是否启用
          data: [], // 显示的片段数据
          marginTop: 0, // 上外边距代替未显示数据空间
          marginBottom: 0, // 下外边距代替未显示数据空间
          marginTotal: 0, // 总的边距
          offset: 0, // 偏移量
          cursorTop: 0,
          cursorBottom: 0,
          lastUpdate: (new Date()).getTime(),
        },
        lazyLoadConfig: {
          lastScrollTop: 0,
          offsetLeft: 0,
          offsetRight: 0,
        },
      };
    },
    watch: {
      data (newData){
        this.$nextTick(() => {
          this.rerender();
        });
      },
    },
    created () {
      /* if (this.enableSegment) {
        this.initSegment();
      } */
      if (this.lazyLoad) {
        this.lazyLoadConfig.offsetRight = this.height ? Math.ceil(parseInt(this.height, 10) / this.rowHeight) * 2 : 20;
      }
    },
    mounted () {
      this.rerender();
    },
    beforeDestroy () {
      this.$refs.body.removeEventListener('scroll', this.onTableScroll);
    },
    methods: {
      // 设置数据片段
      initSegment () {
        if (this.height) {
          // 计算出在确定高度下，可显示的行数
          const showRows = Math.ceil(parseInt(this.height, 10) / this.rowHeight);
          const dataLen = this.data.length;
          if (dataLen / showRows >= 5) { // 达到一定数据量才使用数据片段优化
            console.log('>>> 开始结束数据', this.data[0], this.data[this.data.length - 2], this.data[this.data.length - 1]);
            // 其它未显示的计算出 margin 空间
            this.segment.marginTotal = (dataLen - showRows) * this.rowHeight;
            this.segment.marginTop = 0;
            this.segment.marginBottom = this.segment.marginTotal;
            // 记录数据的 slice 游标
            this.segment.cursorTop = 0;
            this.segment.cursorBottom = showRows;
            this.segment.data = this.data.slice(this.segment.cursorTop, this.segment.cursorBottom);
            this.segment.enabled = true;
          } else this.segment.enabled = false;
        } else this.segment.enabled = false;
      },
      // 更新数据片段
      updateSegment (scrollTop) {
        // 防止过快地更新
        /* const now = (new Date()).getTime();
        if (now - this.segment.lastUpdate <= 50) {
          this.segment.lastUpdate = now;
          return;
        } else this.segment.lastUpdate = now; */
        const distance = scrollTop - this.segment.marginTop;
        if (Math.abs(distance) >= this.rowHeight) {
          const direction = distance > 0 ? 'bottom' : 'top';
          const moveOffset = parseInt(distance / this.rowHeight, 10);
          // const leftDistance = distance % this.rowHeight;
          this.segment.cursorTop = this.segment.cursorTop + moveOffset;
          this.segment.cursorBottom = this.segment.cursorBottom + moveOffset;
          this.segment.data = this.data.slice(this.segment.cursorTop, this.segment.cursorBottom);
          this.segment.marginTop = this.segment.marginTop + (moveOffset * this.rowHeight);
          this.segment.marginBottom = this.segment.marginBottom - (moveOffset * this.rowHeight);
          console.log(direction, distance, moveOffset * this.rowHeight, this.segment.marginTop, this.segment.marginBottom);
        }
      },
      rerender () {
        this.detectHasScrollBar();
        // 添加表格滚动事件
        this.$refs.body.removeEventListener('scroll', this.onTableScroll);
        if (this.hasScrollBarY) {
          this.$refs.body.addEventListener('scroll', this.onTableScroll);
        }
        // 计算各列的实际宽度
        this.calculateColumnsWidth();
        // 如果有左右固定
        if (this.hasLeftFixed || this.hasRightFixed) {
          this.setFixedTableStyle();
          this.syncRowHeight();
        }
      },
      // 判断是否出现滚动条
      detectHasScrollBar () {
        if (this.$refs.body) {
          this.hasScrollBarY = this.$refs.body.scrollHeight > this.$refs.body.offsetHeight;
          this.hasScrollBarX = this.$refs.body.scrollWidth > this.$refs.body.offsetWidth;
        } else {
          this.hasScrollBarY = false;
          this.hasScrollBarX = false;
        }
      },
      // table 滚动事件
      onTableScroll (e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.lazyLoad) {
          const distance = e.target.scrollTop - this.lazyLoadConfig.lastScrollTop;
          const halfRowHeight = parseInt(this.rowHeight / 1.15, 10);
          console.log('>>> lazyLoad', e.target.scrollTop, this.lazyLoadConfig.lastScrollTop, distance, halfRowHeight);
          if (Math.abs(distance) >= halfRowHeight) {
            const offset = parseInt(distance / halfRowHeight, 10);
            /* const offsetLeft = this.lazyLoadConfig.offsetLeft + offset;
            this.lazyLoadConfig.offsetLeft = offsetLeft >= 0 ? offsetLeft : 0; */
            const offsetRight = this.lazyLoadConfig.offsetRight + offset;
            this.lazyLoadConfig.offsetRight = offsetRight < this.data.length ? offsetRight : this.data.length - 1;
            this.lazyLoadConfig.lastScrollTop = e.target.scrollTop;
          }
        }
        /* const distanceToBottom = e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight);
        if (this.enableSegment && this.segment.enabled) {
          this.updateSegment(e.target.scrollTop);
        } */
        // 同步左右固定表格滚动事件
        // 保持表格头部与表格一起滚动
        this.$refs.head.scrollLeft = this.$refs.body.scrollLeft;
        if (this.hasLeftFixed || this.hasRightFixed){
          // 左右固定表格跟随主表格滚动
          if (this.hasLeftFixed){
            this.$refs.leftFixedBody.scrollTop = this.$refs.body.scrollTop;
          }
          if (this.hasRightFixed){
            this.$refs.rightFixedBody.scrollTop = this.$refs.body.scrollTop;
          }
          this.scrollLeft = this.$refs.body.scrollLeft;
        }
      },
      /**
      * 根据主表格第一行计算出各列的宽度
      */
      calculateColumnsWidth () {
        const tds = this.$refs.body.querySelector('tr:first-child').querySelectorAll('td');
        for (let i = 0, len = tds.length; i < len; i++) {
          const td = tds[i];
          const style = getComputedStyle(td);
          const width =
            parseFloat(style.borderLeftWidth)
            + parseFloat(style.paddingLeft)
            + parseFloat(style.width)
            + parseFloat(style.paddingRight);
          this.columnWidths.push(width);
        }
      },
      // 设置左右固定表格的样式
      setFixedTableStyle () {
        // 主表格表头高度
        const mHeadHeight = this.$refs.mainHead ? parseInt(getComputedStyle(this.$refs.mainHead.$el, 'height'), 10) : 0;
        let maxHeadHeight = mHeadHeight;

        // 主表格主体高度
        const mBodyHeight = this.$refs.mainBody ? parseInt(getComputedStyle(this.$refs.mainBody.$el, 'height'), 10) : 0;
        let maxBodyHeight = mBodyHeight;

        if (this.hasLeftFixed) {
          const lHeadHeight = this.$refs.leftFixedHead ? parseInt(getComputedStyle(this.$refs.leftFixedHead, 'height'), 10) : 0;
          maxHeadHeight = this.getMaxOf([maxHeadHeight, lHeadHeight]);
          const lBodyHeight = this.$refs.leftFixedBody ? parseInt(getComputedStyle(this.$refs.leftFixedBody.querySelector('table'), 'height'), 10) : 0;
          maxBodyHeight = this.getMaxOf([maxBodyHeight, lBodyHeight]);
          // 设置左表格的宽度
          this.leftFixedWidth = this.$refs.leftFixedHead ? parseInt(getComputedStyle(this.$refs.leftFixedHead, 'width'), 10) : 0;
        }
        if (this.hasRightFixed) {
          const rHeadHeight = this.$refs.rightFixedHead ? parseInt(getComputedStyle(this.$refs.rightFixedHead, 'height'), 10) : 0;
          maxHeadHeight = this.getMaxOf([maxHeadHeight, rHeadHeight]);
          const rBodyHeight = this.$refs.rightFixedBody ? parseInt(getComputedStyle(this.$refs.rightFixedBody.querySelector('table'), 'height'), 10) : 0;
          maxBodyHeight = this.getMaxOf([maxBodyHeight, rBodyHeight]);
          // 设置右表格的宽度
          this.rightFixedWidth = this.$refs.rightFixedHead ? parseInt(getComputedStyle(this.$refs.rightFixedHead, 'width'), 10) : 0;
        }
        // 设置表格头部高度
        this.headHeight = maxHeadHeight;
        this.bodyHeight = maxBodyHeight;
      },
      getStyle (el, style) {
        return style ? global.document.defaultView.getComputedStyle(el)[style] : global.document.defaultView.getComputedStyle(el);
      },
      getMaxOf (nums) {
        let max = 0;
        for (const num of nums){
          if (num > max){
            max = num;
          }
        }
        return max;
      },
      // 同步各行高度
      syncRowHeight () {
        let maxHeight = 0;
        if (this.hasLeftFixed && this.$refs.leftFixedBody) {
          const leftMaxRowHeight = Array.from(this.$refs.leftFixedBody.querySelectorAll('table tr')).map(tr => {
            return parseInt(getComputedStyle(tr, 'height'), 10);
          }).sort((a, b) => {
            return a > b ? -1 : 1;
          })[0];
          maxHeight = this.getMaxOf([maxHeight, leftMaxRowHeight]);
        }
        if (this.hasRightFixed && this.$refs.rightFixedBody) {
          const rightMaxRowHeight = Array.from(this.$refs.rightFixedBody.querySelectorAll('table tr')).map(tr => {
            return parseInt(getComputedStyle(tr, 'height'), 10);
          }).sort((a, b) => {
            return a > b ? -1 : 1;
          })[0];
          maxHeight = this.getMaxOf([maxHeight, rightMaxRowHeight]);
        }
        if (this.$refs.mainBody) {
          const mainMaxRowHeight = Array.from(this.$refs.mainBody.$el.querySelectorAll('table tr')).map(tr => {
            return parseInt(getComputedStyle(tr, 'height'), 10);
          }).sort((a, b) => {
            return a > b ? -1 : 1;
          })[0];
          maxHeight = this.getMaxOf([maxHeight, mainMaxRowHeight]);
        }
        // 补上 1px 的 border
        ++maxHeight;
        if (this.$refs.leftFixedBody) {
          this.$refs.leftFixedBody.querySelectorAll('table tr').forEach(tr => {
            const $tr = tr;
            $tr.style.height = `${maxHeight}px`;
          });
        }
        if (this.$refs.rightFixedBody) {
          this.$refs.rightFixedBody.querySelectorAll('table tr').forEach(tr => {
            const $tr = tr;
            $tr.style.height = `${maxHeight}px`;
          });
        }
        if (this.$refs.mainBody) {
          this.$refs.mainBody.$el.querySelectorAll('table tr').forEach(tr => {
            const $tr = tr;
            $tr.style.height = `${maxHeight}px`;
          });
        }
      },
    },
  };
</script>
