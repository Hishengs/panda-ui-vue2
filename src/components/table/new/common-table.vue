<template>
  <div class="panda-table_common-table">
    <div class="panda-table_common-table_head" ref="head" v-show="!hideHeader">
      <table>
        <colgroup>
          <!-- 选择 -->
          <!-- <col width="20px"></col> -->
          <col v-for="i in columns.length" :key="i-1" :width="`${columnWidths[i-1]}px`"></col>
          <!-- 滚动条的宽度 -->
          <col v-if="hasScrollBarY" :width="scrollbarWidth + 'px'"></col>
        </colgroup>
        <thead>
          <tr>
            <!-- 选择 -->
            <!-- <th width="20px"><input type="checkbox"></th> -->
            <th v-for="(column, i) in columns" :key="i">
              <div class="inner" :style="{width: column.width ? parseInt(column.width, 10) + 'px' : ''}">
                {{ typeof column.title === 'function' ? column.title() : column.title }}
              </div>
            </th>
            <!-- 滚动条的宽度 -->
            <th v-if="hasScrollBarY">
              <div :style="{ width: (scrollbarWidth - 1) + 'px' }"></div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div
      class="panda-table_common-table_body"
      :style="bodyStyle"
      ref="body"
      @mouseover="mouseEnter = true"
      @mouseleave="mouseEnter = false"
    >
      <div class="panda-table_common-table_body_inner" :style="paddingStyle">
        <table class="panda-table_common-table">
          <colgroup>
            <!-- 选择 -->
            <!-- <col width="20px"></col> -->
            <col v-for="i in columns.length" :key="i-1" :width="`${columnWidths[i-1]}px`"></col>
            <!-- 滚动条的宽度 -->
            <col v-if="hasScrollBarY" :width="scrollbarWidth + 'px'"></col>
          </colgroup>
          <tbody>
            <tr
              v-for="(item, i) in data"
              :key="i"
              :class="[item.className, i === hoverIndex ? 'row-hover' : '']"
              @mouseover="onEnterRow($event, i)"
              @mouseout="onLeaveRow($event, i)"
            >
              <!-- 选择 -->
              <!-- <td width="20px"><input type="checkbox"></td> -->
              <td
                v-for="(column, j) in columns" 
                :key="i+'-'+j"
                :class="column.className"
              >
                <div class="inner" :style="{width: column.width ? parseInt(column.width, 10) + 'px' : ''}">
                  {{ item[column['key']] }}
                </div>
              </td>
              <!-- 滚动条的宽度 -->
              <td v-if="hasScrollBarY" style="background: white; z-index: 9999; border-top: none;">
                <div :style="{ width: (scrollbarWidth - 1) + 'px' }"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import { getComputedStyle } from '../../../utils/dom.js';
  import { debounce } from '../../../utils/index.js';

  export default {
    name: 'panda-table-common-table',
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
        scrollbarWidth: 17,
        // 鼠标是否进入当前表格
        mouseEnter: false,
      };
    },
    computed: {
      bodyStyle () {
        return {
          height: this.height || '',
          maxHeight: this.maxHeight || '',
        };
      },
      paddingStyle () {
        return this.virtual ? {
          paddingTop: this.virtualOptions.paddingTop + 'px',
          paddingBottom: this.virtualOptions.paddingBottom + 'px',
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
        // if (e.currentTarget !== this.$refs.body || !this.mouseEnter) return;
        // e.preventDefault();
        // e.stopPropagation();
        const { scrollLeft, scrollTop } = e.target;
        // 表格头部跟随移动
        this.$refs.head.scrollLeft = scrollLeft;
        /* if (e.isTrusted) {
          this.$emit('scroll', e, scrollTop);
        } */
        this.$emit('scroll', e, scrollTop);
      }, 10),
      onEnterRow (e, index) {
        this.$emit('row-hover', index);
      },
      onLeaveRow (e, index) {
        // 设置为 -1，一个不存在的 index
        this.$emit('row-hover', -1);
      },
    },
  };
</script>
