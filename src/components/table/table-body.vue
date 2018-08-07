<template>
  <table>
    <tbody>
      <tr v-for="(item, i) in data" :key="i">
        <td
          v-for="(column, j) in columns" 
          :key="i+'-'+j" 
        >
          <div class="inner" :style="{width: column.width ? parseInt(column.width, 10) + 'px' : ''}">
            {{ item[columns[j]['key']] }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'table-body',
    props: {
      columns: {
        type: Array,
        default: () => [],
      },
      data: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>
