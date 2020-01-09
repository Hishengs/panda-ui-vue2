<template>
  <div class="panda-table_common-table">
    <!-- 表格头部 -->
    <div class="panda-table_common-table_head" v-show="!hideHeader">
      <div class="panda-table_common-table_head_inner" ref="headScrollArea">
        <table>
          <colgroup>
            <!-- 选择 -->
            <col width="20px" v-if="selectable"></col>
            <col v-for="i in columns.length" :key="i-1" :width="`${columnWidths[i-1]}px`"></col>
            <!-- 滚动条的宽度 -->
            <col v-if="showScrollCell" :width="scrollbarWidth + 'px'"></col>
          </colgroup>
          <thead>
            <tr>
              <!-- 选择 -->
              <th width="20px" v-if="selectable">
                <Checkbox :value="allChecked" @change="toggleAllChecked"></Checkbox>
              </th>
              <th v-for="(column, i) in columns" :key="i">
                <div class="inner" :style="{width: column.width ? parseFloat(column.width, 10) + 'px' : ''}">
                  {{ typeof column.title === 'function' ? column.title() : column.title }}
                </div>
              </th>
              <!-- 滚动条的宽度 -->
              <th v-if="showScrollCell">
                <div :style="{ width: scrollbarWidth + 'px' }"></div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <!-- 表格主体 -->
    <div
      class="panda-table_common-table_body"
      :class="{ virtual: this.virtual }"
      :style="bodyStyle"
      ref="body"
      @mouseover="mouseEnter = true"
      @mouseleave="mouseEnter = false"
    >
      <div class="padding-area"
        v-if="virtual"
        :style="paddingAreaStyle"
      ></div>
      <div class="table-area" :style="tableAreaStyle">
        <table class="panda-table_common-table">
          <colgroup>
            <!-- 选择 -->
            <col width="20px" v-if="selectable"></col>
            <col v-for="i in columns.length" :key="i-1" :width="`${columnWidths[i-1]}px`"></col>
            <!-- 滚动条的宽度 -->
            <!-- <col v-if="showScrollCell" :width="scrollbarWidth + 'px'"></col> -->
            <col v-if="showScrollCell" width="0"></col>
          </colgroup>
          <tbody>
            <tr
              v-for="(item, i) in data"
              :key="i"
              :class="[item.className, i === hoverIndex ? 'row-hover' : '']"
              @mouseover="onEnterRow($event, i)"
              @mouseout="onLeaveRow($event, i)"
              ref="rows"
            >
              <!-- 选择 -->
              <td width="20px" v-if="selectable">
                <Checkbox :value="item._checked" @change="e => onRowChecked(e, item, i)"></Checkbox>
              </td>
              <td
                v-for="(column, j) in columns" 
                :key="i+'-'+j"
                :class="column.className"
              >
                <div class="inner" :style="{width: column.width ? parseFloat(column.width, 10) + 'px' : ''}">
                  <template v-if="column.render">
                    <cell-render :render="column.render" :column="column" :row="item" :index="i"></cell-render>
                  </template>
                  <template v-else>{{ item[column['key']] }}</template>
                </div>
              </td>
              <!-- 滚动条的宽度 -->
              <!-- <td v-if="showScrollCell">
                <div :style="{ width: (scrollbarWidth - 1) + 'px' }"></div>
              </td> -->
              <td v-if="showScrollCell"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import { debounce } from '../../../utils/index.js';
  import { getScrollBarWidth } from '../../../utils/dom.js';
  import Checkbox from '../../checkbox';

  const CellRender = {
    functional: true,
    props: {
      render: Function,
      row: Object,
      column: Object,
      index: Number,
    },
    render (h, context) {
      return context.props.render.call(context, h, {
        row: context.props.row,
        column: context.props.column,
        index: context.props.index,
      });
    },
  };

  export default {
    name: 'panda-table-common-table',
    components: {
      Checkbox,
      CellRender,
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
      columnWidths: {
        type: Array,
        default: [],
      },
      height: {
        type: [Number, String],
      },
      maxHeight: {
        type: [Number, String],
      },
      // 隐藏表头
      hideHeader: Boolean,
      // 是否可选择
      selectable: Boolean,
      hoverIndex: Number,
      virtual: Boolean,
      virtualOptions: Object,
    },
    data () {
      return {
        // 是否存在 x 轴滚动条
        hasScrollBarX: false,
        // 是否存在 y 轴滚动条
        hasScrollBarY: false,
        // 统一滚动条的宽度
        scrollbarWidth: getScrollBarWidth(),
        // 鼠标是否进入当前表格
        mouseEnter: false,
        allChecked: false,
      };
    },
    computed: {
      showScrollCell () {
        return this.hasScrollBarY && this.scrollbarWidth > 0;
      },
      bodyStyle () {
        return {
          height: this.height || '',
          maxHeight: this.maxHeight || '',
        };
      },
      paddingAreaStyle () {
        return this.virtual ? {
          height: `${this.virtualOptions.tableHeight}px`,
        } : {};
      },
      tableAreaStyle () {
        return this.virtual ? {
          transform: `translate3d(0,${this.virtualOptions.topOffset}px,0)`,
        } : {};
      },
    },
    mounted () {
      // 检测是否存在滚动条
      this.detectHasScrollBar();
      if (this.hasScrollBarX || this.hasScrollBarY) {
        this.$refs.body.addEventListener('scroll', this.onTableScroll);
      }
    },
    beforeDestroy () {
      this.$refs.body.removeEventListener('scroll', this.onTableScroll);
    },
    methods: {
      // 判断是否出现滚动条
      detectHasScrollBar () {
        this.hasScrollBarY = this.$refs.body.scrollHeight > this.$refs.body.offsetHeight;
        this.hasScrollBarX = this.$refs.body.scrollWidth > this.$refs.body.offsetWidth;
      },
      onTableScroll: debounce(function (e) {
        const { scrollLeft, scrollTop } = e.target;
        // 表格头部跟随移动
        this.$refs.headScrollArea.scrollLeft = scrollLeft;
        this.$emit('scroll', e, scrollTop);
      }, 5),
      onEnterRow (e, index) {
        this.$emit('row-hover', index);
      },
      onLeaveRow (e, index) {
        // 设置为 -1，一个不存在的 index
        this.$emit('row-hover', -1);
      },
      onRowChecked (e, row, index) {
        if (row._disabled) return;
        const { checked } = e.target;
        row._checked = checked;
        this.allChecked = this.data.every(item => item._checked);
        this.$emit('select', row, checked, this.data.filter(item => item._checked));
      },
      toggleAllChecked (e) {
        const { checked } = e.target;
        this.data.forEach(row => {
          row._checked = checked;
        });
        this.allChecked = checked;
        this.$emit('select-all', checked);
      },
    },
  };
</script>
