<template>
  <div class="panda-table" :class="cClass">
    <p>数据：{{ totalRows }}</p>
    <div class="panda-table_wrapper">
      <!-- 左 -->
      <div class="panda-table_left-fixed" ref="leftFixed" v-if="hasLeftFixed">
        <common-table
          ref="leftFixedTable"
          :columns="leftFixedColumns"
          :data="data"
          :height="height"
          :max-height="maxHeight"
          @row-enter="index => setRowHover(index, true)"
          @row-leave="index => setRowHover(index, false)"
          @scroll="(e, scrollTop) => {
            this.$refs.mainTable.$refs.body.scrollTop = scrollTop;
            this.$refs.rightFixedTable.$refs.body.scrollTop = scrollTop;
            this.onTableScroll(e);
          }"
          :virtual="virtual"
          :virtual-options="virtualOptions"
        ></common-table>
      </div>
      <!-- 中 -->
      <div class="panda-table_main" ref="main">
        <common-table
          ref="mainTable"
          :columns="columns"
          :data="data"
          :height="height"
          :max-height="maxHeight"
          @row-enter="index => setRowHover(index, true)"
          @row-leave="index => setRowHover(index, false)"
          @scroll="(e, scrollTop) => {
            if (this.$refs.leftFixedTable) {
              this.$refs.leftFixedTable.$refs.body.scrollTop = scrollTop;
            }
            if (this.$refs.rightFixedTable) {
              this.$refs.rightFixedTable.$refs.body.scrollTop = scrollTop;
            }
            const { scrollLeft, clientWidth, scrollWidth } = e.target;
            this.scrollerOnStart = scrollLeft === 0;
            this.scrollerOnEnd = scrollLeft + clientWidth === scrollWidth;
            this.onTableScroll(e);
          }"
          :virtual="virtual"
          :virtual-options="virtualOptions"
        ></common-table>
      </div>
      <!-- 右 -->
      <div class="panda-table_right-fixed" ref="rightFixed" v-if="hasRightFixed">
        <common-table
          ref="rightFixedTable"
          :columns="rightFixedColumns"
          :data="data"
          :height="height"
          :max-height="maxHeight"
          @row-enter="index => setRowHover(index, true)"
          @row-leave="index => setRowHover(index, false)"
          @scroll="(e, scrollTop) => {
            this.$refs.leftFixedTable.$refs.body.scrollTop = scrollTop;
            this.$refs.mainTable.$refs.body.scrollTop = scrollTop;
            this.onTableScroll(e);
          }"
          :virtual="virtual"
          :virtual-options="virtualOptions"
        ></common-table>
      </div>
    </div>
  </div>
</template>

<script>
  import commonTable from './common-table.vue';
  import { getComputedStyle, addClass, removeClass } from '../../../utils/dom.js';

  export default {
    name: 'panda-table',
    components: {
      commonTable,
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
      // 虚拟列表
      virtual: Boolean,
    },
    data () {
      return {
        scrollerOnStart: false,
        scrollerOnEnd: false,
        virtualOptions: {
          visibleNum: 20,
          /* topPadNum: 5,
          bottomPadNum: 5, */
          tableHeight: 0,
          rowHeight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          offset: 0,
        },
      };
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
          this.scrollerOnStart ? 'scroller-on-start' : '',
          this.scrollerOnEnd ? 'scroller-on-end' : '',
        ].filter(cls => cls !== '').join(' ').trim();
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
      // 固定于右边的表格
      rightFixedColumns () {
        return this.columns.filter(col => {
          return col.fixed === 'right';
        });
      },
      hasRightFixed () {
        return this.rightFixedColumns.length !== 0;
      },
      totalRows () {
        return this.data.length;
      },
    },
    mounted () {
      if (this.hasLeftFixed || this.hasRightFixed) {
        this.scrollerOnStart = true;
        this.syncRowHeight();
      }
      if (this.virtual) {
        this.calcVirtualRowHeight();
        this.calcVirtualPaddingBottom();
      }
    },
    methods: {
      // 左右固定的表格与主表格保持一致的 hover 效果
      setRowHover (rowIndex, hover = true) {
        function setHover (targetRow) {
          if (hover) {
            addClass(targetRow, 'row-hover');
          } else removeClass(targetRow, 'row-hover');
        }
        const mainRows = this.$refs.main.querySelectorAll('tbody tr');
        setHover(mainRows[rowIndex]);
        if (this.$refs.leftFixed) {
          const leftFixedRows = this.$refs.leftFixed.querySelectorAll('tbody tr');
          setHover(leftFixedRows[rowIndex]);
        }
        if (this.$refs.rightFixed) {
          const rightFixedRows = this.$refs.rightFixed.querySelectorAll('tbody tr');
          setHover(rightFixedRows[rowIndex]);
        }
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
        if (this.hasLeftFixed && this.$refs.leftFixedTable) {
          const leftMaxRowHeight = Array.from(this.$refs.leftFixedTable.$el.querySelectorAll('tbody tr')).map(tr => {
            return parseInt(getComputedStyle(tr, 'height'), 10);
          }).sort((a, b) => {
            return a > b ? -1 : 1;
          })[0];
          maxHeight = this.getMaxOf([maxHeight, leftMaxRowHeight]);
        }
        if (this.hasRightFixed && this.$refs.rightFixedTable) {
          const rightMaxRowHeight = Array.from(this.$refs.rightFixedTable.$el.querySelectorAll('tbody tr')).map(tr => {
            return parseInt(getComputedStyle(tr, 'height'), 10);
          }).sort((a, b) => {
            return a > b ? -1 : 1;
          })[0];
          maxHeight = this.getMaxOf([maxHeight, rightMaxRowHeight]);
        }
        if (this.$refs.mainTable) {
          const mainMaxRowHeight = Array.from(this.$refs.mainTable.$el.querySelectorAll('tbody tr')).map(tr => {
            return parseInt(getComputedStyle(tr, 'height'), 10);
          }).sort((a, b) => {
            return a > b ? -1 : 1;
          })[0];
          maxHeight = this.getMaxOf([maxHeight, mainMaxRowHeight]);
        }
        // 补上 1px 的 border
        ++maxHeight;
        if (this.$refs.leftFixedTable) {
          this.$refs.leftFixedTable.$el.querySelectorAll('tbody tr').forEach(tr => {
            const $tr = tr;
            $tr.style.height = `${maxHeight}px`;
          });
        }
        if (this.$refs.rightFixedTable) {
          this.$refs.rightFixedTable.$el.querySelectorAll('tbody tr').forEach(tr => {
            const $tr = tr;
            $tr.style.height = `${maxHeight}px`;
          });
        }
        if (this.$refs.mainTable) {
          this.$refs.mainTable.$el.querySelectorAll('tbody tr').forEach(tr => {
            const $tr = tr;
            $tr.style.height = `${maxHeight}px`;
          });
        }
      },
      // 计算出当前显示的列表行的平均高度
      calcVirtualRowHeight () {
        const tbody = this.$refs.main.querySelector('table tbody');
        this.virtualOptions.tableHeight = Math.round(parseFloat(getComputedStyle(tbody, 'height')));
        this.virtualOptions.rowHeight =  Math.round(this.virtualOptions.tableHeight / this.virtualOptions.visibleNum);
      },
      calcVirtualPaddingBottom () {
        const totalHeight = this.virtualOptions.rowHeight * this.totalRows;
        const paddingBottom = totalHeight - this.virtualOptions.paddingTop - this.virtualOptions.tableHeight;
        this.virtualOptions.paddingBottom = paddingBottom >= 0 ? paddingBottom : 0;
      },
      onTableScroll (e) {
        // 1. 先算出 paddingTop
        const { scrollTop } = e.target;
        const totalHeight = this.virtualOptions.rowHeight * this.totalRows;
        this.virtualOptions.paddingTop = scrollTop > totalHeight ? this.virtualOptions.paddingTop : scrollTop;
        // 2. 计算出偏移
        const offset = Math.floor(this.virtualOptions.paddingTop / this.virtualOptions.rowHeight);
        const maxOffset = this.totalRows - this.virtualOptions.visibleNum;
        this.virtualOptions.offset = offset > maxOffset ? maxOffset : offset;
        // 3. 计算出实际行的平均高度
        this.$nextTick(() => {
          this.calcVirtualRowHeight();
          // 4. 计算出实际向下的 paddingBottom 的值
          this.calcVirtualPaddingBottom();
        });
      },
    },
  };
</script>

