<template>
  <table>
    <colgroup>
      <col v-for="(width, i) in columnWidths" :key="i" :width="width"></col>
      <!-- 滚动条的宽度 -->
      <col v-if="hasScrollbar" :width="scrollBarWidth + 'px'"></col>
    </colgroup>
    <thead>
      <tr>
        <th v-for="(column, i) in columns" :key="i">
          <div class="inner" :style="{width: column.width ? parseInt(column.width, 10) + 'px' : ''}">
            {{ typeof column.title === 'function' ? column.title() : column.title }}
          </div>
        </th>
        <th v-if="hasScrollbar" :width="(scrollBarWidth-1) + 'px'"></th>
      </tr>
    </thead>
  </table>
</template>

<script>
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
      // 是否有滚动条
      hasScrollbar: Boolean,
    },
    data (){
      return {
        scrollBarWidth: 17,
      };
    },
  };
</script>
