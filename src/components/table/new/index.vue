<template>
  <div class="panda-table" :class="cClass">
    <div class="panda-table_wrapper">
      <!-- 左 -->
      <div class="panda-table_left-fixed" ref="leftFixed" v-if="hasLeftFixed">
        <common-table
          ref="leftFixedTable"
          :columns="leftFixedColumns"
          :data="showData"
          :column-widths="columnWidths"
          :height="height"
          :max-height="maxHeight"
          :hover-index="hoverIndex"
          :hide-header="hideHeader"
          @row-hover="index => hoverIndex = index"
          @scroll="(e, scrollTop) => {
            this.$refs.mainTable.$refs.body.scrollTop = scrollTop;
            if (this.$refs.rightFixedTable) {
              this.$refs.rightFixedTable.$refs.body.scrollTop = scrollTop;
            }
            if (this.virtual) {
              this.onVirtualTableScroll(e);
            }
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
          :data="showData"
          :column-widths="columnWidths"
          :height="height"
          :max-height="maxHeight"
          :hide-header="hideHeader"
          :hover-index="hoverIndex"
          @row-hover="index => hoverIndex = index"
          @scroll="(e, scrollTop) => {
            if (this.$refs.leftFixedTable) {
              this.$refs.leftFixedTable.$refs.body.scrollTop = scrollTop;
            }
            if (this.$refs.rightFixedTable) {
              this.$refs.rightFixedTable.$refs.body.scrollTop = scrollTop;
            }
            const { scrollLeft, clientWidth, scrollWidth } = e.target;
            this.scrollerAtStart = scrollLeft === 0;
            this.scrollerAtEnd = scrollLeft + clientWidth === scrollWidth;
            if (this.virtual) {
              this.onVirtualTableScroll(e);
            }
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
          :data="showData"
          :column-widths="columnWidths"
          :height="height"
          :max-height="maxHeight"
          :hide-header="hideHeader"
          :hover-index="hoverIndex"
          @row-hover="index => hoverIndex = index"
          @scroll="(e, scrollTop) => {
            if (this.$refs.leftFixedTable) {
              this.$refs.leftFixedTable.$refs.body.scrollTop = scrollTop;
            }
            this.$refs.mainTable.$refs.body.scrollTop = scrollTop;
            if (this.virtual) {
              this.onVirtualTableScroll(e);
            }
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
  import { getComputedStyle/* , addClass, removeClass */ } from '../../../utils/dom.js';
  import { getMaxOf, debounce } from '../../../utils/index.js';

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
      // 隐藏表头
      hideHeader: Boolean,
      // 虚拟列表
      virtual: Boolean,
    },
    data () {
      return {
        // 当前 hover 的行索引
        hoverIndex: -1,
        // 当前滚动条（x 轴）是否在起点
        scrollerAtStart: true,
        // 当前滚动条（x 轴）是否在终点
        scrollerAtEnd: false,
        // 计算得出主表格的各列宽度
        columnWidths: [],
        // 虚拟表格配置
        virtualOptions: {
          // 可见节点数
          visibleNum: 20,
          offsetNum: 10,
          topOffset: 0,
          bottomOffset: 0,
          // 记录表格所占高度空间
          tableHeight: 0,
          // 计算得到的平均行高
          rowHeight: 0,
          // 向上补齐的高度空间
          paddingTop: 0,
          // 向下补齐的高度空间
          paddingBottom: 0,
          // 当前数据项的偏移起点
          startIndex: 0,
          // 记录上次 scrollTop
          scrollTop: 0,
        },
        // 表格 tbody
        tbody: null,
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
          this.scrollerAtStart ? 'scroller-at-start' : '',
          this.scrollerAtEnd ? 'scroller-at-end' : '',
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
      // 总的行数
      totalRows () {
        return this.data.length;
      },
      tableRows () {
        const { topOffset, bottomOffset, visibleNum } = this.virtualOptions;
        return topOffset + visibleNum + bottomOffset;
      },
      showData () {
        if (this.virtual) {
          const { startIndex } = this.virtualOptions;
          const endIndex = startIndex + this.tableRows;
          return this.data.slice(startIndex, endIndex);
        } else return this.data;
      },
    },
    mounted () {
      this.calcMainTableColumnWidths();
      if (this.hasLeftFixed || this.hasRightFixed) {
        // 同步一下左中右三个表格表头的高度
        this.syncHeadHeightWithFixed();
        // 同步一下左中右三个表格各行的高度
        this.syncBodyRowHeightWithFixed();
      }
      if (this.virtual) {
        // 计算虚拟表格平均行高
        this.calcVirtualRowHeight();
        // 计算需要向下补齐的空间
        this.adjustVirtualPaddingBottom();
      }
    },
    methods: {
      // 同步表头高度
      syncHeadHeightWithFixed () {
        let leftHeadHeight = 0;
        let leftHeadTr;
        if (this.hasLeftFixed && this.$refs.leftFixedTable) {
          leftHeadTr = this.$refs.leftFixedTable.$el.querySelector('thead tr');
          leftHeadHeight = parseInt(getComputedStyle(leftHeadTr, 'height'), 10);
        }
        let rightHeadHeight = 0;
        let rightHeadTr;
        if (this.hasRightFixed && this.$refs.rightFixedTable) {
          rightHeadTr = this.$refs.rightFixedTable.$el.querySelector('thead tr');
          rightHeadHeight = parseInt(getComputedStyle(rightHeadTr, 'height'), 10);
        }
        const mainHeadTr = this.$refs.mainTable.$el.querySelector('thead tr');
        const mainHeadHeight = parseInt(getComputedStyle(mainHeadTr, 'height'), 10);
        // 补上 1px 的 border
        const maxHeadHeight = getMaxOf([leftHeadHeight, mainHeadHeight, rightHeadHeight]) + 1;
        if (leftHeadTr) {
          leftHeadTr.style.height = `${maxHeadHeight}px`;
        }
        if (rightHeadTr) {
          rightHeadTr.style.height = `${maxHeadHeight}px`;
        }
        mainHeadTr.style.height = `${maxHeadHeight}px`;
      },
      // 同步表体各行高度
      syncBodyRowHeightWithFixed () {
        // 各行最高
        let leftRowsHeight = [];
        let rightRowsHeight = [];
        let mainRowsHeight = [];
        if (this.hasLeftFixed && this.$refs.leftFixedTable) {
          leftRowsHeight = Array.from(this.$refs.leftFixedTable.$el.querySelectorAll('tbody tr')).map(tr => {
            return parseInt(getComputedStyle(tr, 'height'), 10);
          });
        }
        if (this.hasRightFixed && this.$refs.rightFixedTable) {
          rightRowsHeight = Array.from(this.$refs.rightFixedTable.$el.querySelectorAll('tbody tr')).map(tr => {
            return parseInt(getComputedStyle(tr, 'height'), 10);
          });
        }
        if (this.$refs.mainTable) {
          mainRowsHeight = Array.from(this.$refs.mainTable.$el.querySelectorAll('tbody tr')).map(tr => {
            return parseInt(getComputedStyle(tr, 'height'), 10);
          });
        }
        // 循环得出最高
        if (!mainRowsHeight.length) return;
        for (let i = 0, len = mainRowsHeight.length; i < len; i++) {
          const maxHeight = getMaxOf([
            leftRowsHeight[i] || 0,
            mainRowsHeight[i],
            rightRowsHeight[i] || 0,
          ]);
          // 补上 1px 的 border
          mainRowsHeight[i] = maxHeight + 1;
        }
        if (this.$refs.leftFixedTable) {
          this.$refs.leftFixedTable.$el.querySelectorAll('tbody tr').forEach((tr, index) => {
            const $tr = tr;
            $tr.style.height = `${mainRowsHeight[index]}px`;
          });
        }
        if (this.$refs.rightFixedTable) {
          this.$refs.rightFixedTable.$el.querySelectorAll('tbody tr').forEach((tr, index) => {
            const $tr = tr;
            $tr.style.height = `${mainRowsHeight[index]}px`;
          });
        }
        if (this.$refs.mainTable) {
          this.$refs.mainTable.$el.querySelectorAll('tbody tr').forEach((tr, index) => {
            const $tr = tr;
            $tr.style.height = `${mainRowsHeight[index]}px`;
          });
        }
      },
      // 计算出主表格表头各列宽度
      calcMainTableColumnWidths () {
        const tds = this.$refs.mainTable.$el.querySelectorAll('tbody tr:first-child td');
        // debugger;
        for (let i = 0, len = tds.length; i < len; i++) {
          const td = tds[i];
          const style = getComputedStyle(td);
          // td 盒子宽度
          const width =
            parseFloat(style.borderLeftWidth)
            + parseFloat(style.paddingLeft)
            + parseFloat(style.width)
            + parseFloat(style.paddingRight);
          this.columnWidths.push(width);
        }
      },
      // 计算出当前显示的列表行的平均高度
      calcVirtualRowHeight () {
        if (!this.tbody) {
          this.tbody = this.$refs.main.querySelector('table tbody');
        }
        this.virtualOptions.tableHeight = Math.round(parseFloat(getComputedStyle(this.tbody, 'height')));
        this.virtualOptions.rowHeight = Math.round(this.virtualOptions.tableHeight / this.tableRows);
      },
      // 修正 paddingBottom
      adjustVirtualPaddingBottom () {
        // 计算出表格总共需要的高度空间
        const totalHeight = this.virtualOptions.rowHeight * this.totalRows;
        const paddingBottom = totalHeight - this.virtualOptions.paddingTop - this.virtualOptions.tableHeight;
        this.virtualOptions.paddingBottom = paddingBottom >= 0 ? paddingBottom : 0;
      },
      onVirtualTableScroll: debounce(function (e) {
        if (!this.virtual) return;
        const { scrollTop } = e.target;
        const { rowHeight, /* topOffset, bottomOffset, visibleNum,  */startIndex } = this.virtualOptions;
        // 计算出滚动距离（相距上次）（scrollDistance 可正可负，代表方向）
        const scrollDistance = scrollTop - this.virtualOptions.scrollTop;
        // 计算补齐空间
        let padding = scrollDistance;
        console.log('===== 1 onVirtualTableScroll.scrollDistance', scrollDistance);
        console.log('===== 2 onVirtualTableScroll.rowHeight', rowHeight);
        // 滚动距离不足一行时
        if (Math.abs(scrollDistance) < rowHeight) {
          this.virtualOptions.paddingTop += padding;
          this.virtualOptions.paddingBottom -= padding;
        } else {
          this.virtualOptions.scrollTop = scrollTop;
          // 计算偏移行数
          const offsetRows = (scrollDistance >= 0 ? 1 : -1) * Math.floor(Math.abs(scrollDistance) / rowHeight);
          console.log('===== 3 onVirtualTableScroll.offsetRows', offsetRows);
          // padding = scrollDistance - (offsetRows * rowHeight);
          // console.log('===== 4 onVirtualTableScroll.padding', padding);
          this.virtualOptions.paddingTop += scrollDistance;
          this.virtualOptions.paddingBottom -= scrollDistance;
          // 重新设置 index
          const newStartIndex = startIndex + offsetRows;
          const endIndex = newStartIndex + this.tableRows;
          console.log('===== 5 onVirtualTableScroll.[startIndex, endIndex]', newStartIndex, endIndex);
          this.virtualOptions.startIndex = endIndex > this.totalRows ? startIndex : newStartIndex;
          console.log('===== 6 onVirtualTableScroll.virtualOptions', this.virtualOptions);
        }
        // 在下一次 tick 修正行高和 paddingBottom 大小，ps：此时各行已经被渲染出来，因此可以计算真实行高
        /* this.$nextTick(() => {
          // 计算出实际行的平均高度
          this.calcVirtualRowHeight();
          // 修正 paddingBottom
          this.adjustVirtualPaddingBottom();
        }); */
      }, 200),
      onVirtualTableScroll2: debounce(function (e) {
        if (!this.virtual) return;
        const { scrollTop } = e.target;
        const { rowHeight, offsetNum, /* topOffset, bottomOffset, visibleNum,  */startIndex } = this.virtualOptions;
        // 判断滚动距离是否超过允许偏移行高度
        const offsetDistance = scrollTop - (offsetNum * rowHeight);
        if (offsetDistance >= rowHeight) {
          const offsetRows = Math.floor(offsetDistance / rowHeight);
          this.virtualOptions.paddingTop += offsetDistance;
          this.virtualOptions.paddingBottom -= offsetDistance;
          const newStartIndex = this.virtualOptions.startIndex + offsetRows;
          const endIndex = newStartIndex + this.tableRows;
          this.virtualOptions.startIndex = endIndex > this.totalRows ? startIndex : newStartIndex;
        }
      }, 200),
    },
  };
</script>

