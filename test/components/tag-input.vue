<template>
  <div id="TagInput">
    <h2>TagInput 标签输入框</h2>
    
    <h3>默认</h3>
    <TagInput v-model="tags" :recommend-tags="recommendTags"></TagInput>
    <h4>Props</h4>
    <table>
      <tr>
        <th>名称</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>value</td>
        <td>标签数组，可以通过 v-model 双向绑定</td>
        <td>Array</td>
        <td>[]</td>
      </tr>
      <tr>
        <td>recommend-tags</td>
        <td>推荐的数组，将在输入框下显示</td>
        <td>Array</td>
        <td>[]</td>
      </tr>
      <tr>
        <td>tag-style</td>
        <td>标签的样式</td>
        <td>Object</td>
        <td>--</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'tag-input-preview',
    data (){
      return {
        tags: [],
        recommendTags: ['大宝剑', '马杀鸡'],
      };
    },
  };
</script>