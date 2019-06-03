<template>
  <table ref="self">
    <colgroup>
      <!-- 选择 -->
      <col width="20px"></col>
      <col v-for="(width, i) in columnWidths" :key="i" :width="width"></col>
      <!-- 滚动条的宽度 -->
      <!-- <col v-if="scrollbar && scrollbar" :width="scrollbar.width + 'px'"></col> -->
    </colgroup>
    <tbody>
      <tr v-for="(item, i) in data" :key="i" :class="item.className">
        <!-- 选择 -->
        <td width="20px"><input type="checkbox"></td>
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
        <td v-if="scrollbar && scrollbar.x" :style="{ width: scrollbar.width + 'px' }"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { getComputedStyle } from '../../utils/dom.js';

  export default {
    name: 'table-body',
    props: {
      columns: {
        type: Array,
        default: () => [],
      },
      columnWidths: {
        type: Array,
        default: () => [],
      },
      data: {
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
          this.$refs.self.style.width = this.scrollbar && this.scrollbar.x ? `${width - this.scrollbar.width}px` : `${width}px`;
        }
      },
    },
  };
</script>
