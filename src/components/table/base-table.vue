<template>
	<div class="wrapper">
    <!-- head -->
    <div class="head" ref="head" v-if="showHeader">
      <table>
        <colgroup>
          <col v-for="(width, i) in columnsWidth" :key="i" :width="width"></col>
          <!-- 滚动条的宽度 -->
          <col v-if="height" :width="scrollBarWidth + 'px'"></col>
        </colgroup>
        <thead>
          <tr>
            <th v-for="(column, i) in columns" :key="i">
              <div class="inner" :style="{width: column.width ? parseFloat(column.width) + 'px' : ''}">
                {{ typeof column.title === 'function' ? column.title() : column.title }}
              </div>
            </th>
            <th v-if="height" :width="(scrollBarWidth-1) + 'px'"></th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- body -->
    <div class="body" ref="body" :style="cStyle">
      <table>
        <tbody>
          <tr v-for="(item, i) in data" :key="i">
            <td
              v-for="(column, j) in columns" 
              :key="i+'-'+j" 
            >
              <div class="inner" :style="{width: column.width ? parseFloat(column.width) + 'px' : ''}">
                {{ item[columns[j]['key']] }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
	</div>
</template>

<script>
  export default {
    name: 'panda-table',
    props: {
      columns: {
        type: Array,
        default: () => [],
      },
      data: {
        type: Array,
        default: () => [],
      },
      // 是否显示表头
      showHeader: {
        type: Boolean,
        default: true,
      },
      // 设置表格高度
      height: {
        type: [Number, String],
      },
      // 设置表格最小高度
      minHeight: {
        type: [Number, String],
      },
      // 设置表格最大高度
      maxHeight: {
        type: [Number, String],
      },
    },
    computed: {
      cStyle (){
        return {
          height: this.height,
          maxHeight: this.maxHeight,
          minHeight: this.minHeight,
        };
      },
    },
    data (){
      return {
        // 计算出来的各列的宽度
        columnsWidth: [],
        // 滚动条的宽度
        scrollBarWidth: 17,
      };
    },
    mounted (){
      this.calculateColumnsWidth();
      // 保持表格头部与表格一起滚动
      this.$refs.body.addEventListener('scroll', e => {
        this.$refs.head.scrollLeft = this.$refs.body.scrollLeft;
      });
    },
    methods: {
      // 计算各列的宽度
      calculateColumnsWidth (){
        const tds = this.$refs.body.querySelector('tr:first-child').querySelectorAll('td');
        for (let i = 0, len = tds.length; i < len; i++){
          const td = tds[i];
          const style = global.getComputedStyle(td);
          const width =
            parseFloat(style.borderLeftWidth)
            + parseFloat(style.paddingLeft)
            + parseFloat(style.width)
            + parseFloat(style.paddingRight)
            + ((this.height && i === len - 1) ? parseFloat(style.borderRightWidth) : 0);
          this.columnsWidth.push(width);
        }
      },
    },
  };
</script>