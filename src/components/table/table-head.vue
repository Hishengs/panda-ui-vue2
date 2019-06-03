<template>
  <table ref="self">
    <colgroup>
      <!-- 选择 -->
      <col width="20px"></col>
      <col v-for="(width, i) in columnWidths" :key="i" :width="width"></col>
      <!-- 滚动条的宽度 -->
      <col v-if="scrollbar && scrollbar.y" :width="(scrollbar.width - 1) + 'px'"></col>
    </colgroup>
    <thead>
      <tr>
        <!-- 选择 -->
        <th width="20px"><input type="checkbox"></th>
        <th v-for="(column, i) in columns" :key="i">
          <div class="inner" :style="{width: column.width ? parseInt(column.width, 10) + 'px' : ''}">
            {{ typeof column.title === 'function' ? column.title() : column.title }}
          </div>
        </th>
        <!-- 滚动条的宽度 -->
        <th v-if="scrollbar && scrollbar.y">
          <div :style="{ width: (scrollbar.width - 1) + 'px' }"></div>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
  import { getComputedStyle } from '../../utils/dom.js';

  export default {
    name: 'table-head',
    props: {
      columns: {
        type: Array,
        default: () => [],
      },
      columnWidths: {
        type: Array,
        default: () => [],
      },
      // 滚动条信息
      scrollbar: {
        type: Object,
        validator (bar) {
          return bar.x !== undefined && bar.y !== undefined && bar.width !== undefined;
        },
      },
    },
    mounted () {
      /* this.$nextTick(() => {
        this.setTableWidth();
      }); */
    },
    methods: {
      setTableWidth () {
        const width = parseInt(getComputedStyle(this.$refs.self, 'width'), 10);
        if (width) {
          this.$refs.self.style.width = `${width}px`;
        }
      },
    },
  };
</script>
