<template>
  <div class="panda-table_common-table">
    <div class="panda-table_common-table_head" ref="head">
      <table>
        <colgroup>
          <!-- 选择 -->
          <!-- <col width="20px"></col> -->
          <col v-for="(width, i) in columnWidths" :key="i" :width="width"></col>
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
            <!-- 滚动条的宽度 -->
            <th v-if="hasScrollBarY">
              <div :style="{ width: (scrollbarWidth - 1) + 'px' }"></div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="panda-table_common-table_body" :style="bodyStyle" ref="body" @mouseover="mouseEnter = true" @mouseleave="mouseEnter = false">
      <div class="panda-table_common-table_body_inner" :style="paddingStyle">
        <table class="panda-table_common-table">
          <colgroup>
            <!-- 选择 -->
            <!-- <col width="20px"></col> -->
            <col v-for="(width, i) in columnWidths" :key="i" :width="width"></col>
          </colgroup>
          <tbody ref="tbody">
            <tr
              v-for="(item, i) in showData"
              :key="i"
              :class="item.className"
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
      height: {
        type: [Number, String],
      },
      maxHeight: {
        type: [Number, String],
      },
      virtual: Boolean,
      virtualOptions: Object,
    },
    data () {
      return {
        columnWidths: [],
        hasScrollBarX: false,
        hasScrollBarY: false,
        scrollbarWidth: 17,
        mouseEnter: false,
      };
    },
    computed: {
      bodyStyle () {
        return {
          height: this.height,
          maxHeight: this.maxHeight || this.height,
        };
      },
      paddingStyle () {
        return {
          paddingTop: this.virtualOptions.paddingTop + 'px',
          paddingBottom: this.virtualOptions.paddingBottom + 'px',
        };
      },
      showData () {
        return this.virtual
          ? this.data.slice(this.virtualOptions.offset, this.virtualOptions.offset + this.virtualOptions.visibleNum)
          : this.data;
      },
    },
    mounted () {
      this.detectHasScrollBar();
      // 计算各列的实际宽度
      this.calculateColumnsWidth();
      if (this.hasScrollBarY) {
        this.$refs.body.removeEventListener('scroll', this.onTableScroll);
        this.$refs.body.addEventListener('scroll', this.onTableScroll);
      }
    },
    beforeDestroy () {
      this.$refs.body.removeEventListener('scroll', this.onTableScroll);
    },
    methods: {
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
      /**
      * 根据主表格第一行计算出各列的宽度
      */
      calculateColumnsWidth () {
        const tds = this.$refs.tbody.querySelector('tr:first-child').querySelectorAll('td');
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
      onTableScroll: debounce(function (e) {
        // if (e.currentTarget !== this.$refs.body || !this.mouseEnter) return;
        e.preventDefault();
        e.stopPropagation();
        this.$refs.head.scrollLeft = this.$refs.body.scrollLeft;
        // console.log('=== onTableScroll scrollTop', e.target.scrollTop);
        if (e.isTrusted) {
          this.$emit('scroll', e, this.$refs.body.scrollTop);
        }
      }, 10),
      onEnterRow (e, index) {
        this.$emit('row-enter', index);
      },
      onLeaveRow (e, index) {
        this.$emit('row-leave', index);
      },
    },
  };
</script>
