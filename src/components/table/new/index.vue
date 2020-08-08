<template>
  <div class="panda-table" :class="cClass">
    <div class="panda-table_loading-mask" v-show="loading">
      <slot name="loading">
        <panda-icon name="rotate-cw" size="24"></panda-icon>
      </slot>
    </div>
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
          :style="{ marginRight: `${-scrollBarWidth-1}px` }"
          @select="onSelect"
          @select-all="onSelectAll"
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
          :selectable="selectable"
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
          @select="onSelect"
          @select-all="onSelectAll"
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
  import Icon from '../../icon';
  import { getComputedStyle, getScrollBarWidth } from '../../../utils/dom.js';
  import { getMaxOf, debounce } from '../../../utils/index.js';

  export default {
    name: 'panda-table',
    components: {
      commonTable,
      [Icon.name]: Icon,
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
      // 可选择
      selectable: Boolean,
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
        // 滚动条宽度
        scrollBarWidth: getScrollBarWidth(),
        // 表格 tbody
        tbody: null,
        // 虚拟列表相关参数
        startIndex: 0,
        endIndex: this.data.length,
        visibleHeight: 0,
        visibleRows: 20,
        rowHeight: 0,
        topOffset: 0,
        // 存储每一个列表项的高度信息
        rowHeights: [],
        bufferRows: 20,
      };
    },
    computed: {
      cClass () {
        return [
          this.size,
          this.stripe ? 'stripe' : '',
          this.border ? 'panda-table-border' : '',
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
      showData () {
        // return this.data.slice(Math.max(0, this.startIndex-this.bufferRows), Math.min(this.endIndex+this.bufferRows, this.data.length));
        return this.data.slice(this.startIndex, Math.min(this.endIndex, this.data.length));
      },
      tableHeight () {
        return this.data.length * this.rowHeight;
        // return this.rowHeights.length ? this.rowHeights[this.rowHeights.length-1].bottom : 0;
      },
      virtualOptions () {
        return {
          tableHeight: this.tableHeight,
          topOffset: this.topOffset,
          visibleHeight: this.visibleHeight,
        };
      }
    },
    created () {
      if (this.virtual) {
        this.endIndex = this.visibleRows;
      }
    },
    mounted () {
      this.calcMainTableColumnWidths();
      this.setFixedStyle();
      if (this.hasLeftFixed || this.hasRightFixed) {
        // 同步一下左中右三个表格表头的高度
        this.syncHeadHeightWithFixed();
        // 同步一下左中右三个表格各行的高度
        this.syncBodyRowHeightWithFixed();
      }
      if (this.virtual) {
        this.initVirtual();
      }
    },
    /* updated () {
      this.recalculateRowHeights();
    }, */
    methods: {
      setFixedStyle () {
        if (this.$refs.leftFixed && this.$refs.mainTable.hasScrollBarX) {
          this.$refs.leftFixed.style.bottom = `${this.scrollBarWidth}px`;
        }
        if (this.$refs.rightFixed && this.$refs.mainTable.hasScrollBarX) {
          this.$refs.rightFixed.style.bottom = `${this.scrollBarWidth}px`;
        }
      },
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
      // 虚拟列表初始化
      initVirtual () {
        if (!this.tbody) {
          this.tbody = this.$refs.main.querySelector('table tbody');
        }
        this.visibleHeight = Math.round(parseFloat(getComputedStyle(this.tbody, 'height')));
        // 根据表格高度计算出大概每一项的高度
        this.rowHeight = Math.round(this.visibleHeight / this.visibleRows);
        /* this.rowHeights = this.data.map((item, index) => {
          return {
            index,
            height: this.rowHeight,
            top: index * this.rowHeight,
            bottom: (index + 1) * this.rowHeight,
          };
        }); */
      },
      onVirtualTableScroll: debounce(function (e) {
        if (!this.virtual) return;
        const { scrollTop } = e.target;
        this.startIndex = Math.floor(scrollTop / this.rowHeight);
        // this.startIndex = this.rowHeights.find(r => r.bottom > scrollTop)['index'];
        this.endIndex = this.startIndex + this.visibleRows;
        this.topOffset = scrollTop - (scrollTop % this.rowHeight);
        /* if (this.startIndex > 0) {
          this.topOffset = this.rowHeights[this.startIndex-1]['bottom'];
        } else this.topOffset = 0; */
      }, 10),
      // 重新动态计算列表项高度
      recalculateRowHeights () {
        if (!this.rowHeights.length) return;
        this.$refs.mainTable.$refs.rows.map((el, i) => {
          const rect = el.getBoundingClientRect();
          const { height } = rect;
          const index = this.startIndex + i;
          const row = this.rowHeights[index];
          const offsetHeight = height - row.height;
          if (offsetHeight) {
            row.height = height;
            row.bottom += offsetHeight;
            for (let j=index+1; j<this.rowHeights.length; j++) {
              const curRow = this.rowHeights[j];
              curRow.top = this.rowHeights[j-1].bottom;
              curRow.bottom += offsetHeight;
            }
          }
        });
      },
      onSelect (row, selected, selection) {
        this.$emit('select', row, selected, selection);
      },
      onSelectAll (selected) {
        this.$emit('select-all', selected);
      }
    },
  };
</script>

