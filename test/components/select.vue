<template>
  <div id="Select">
    <h2>Select 下拉框</h2>
    
    <h3>默认</h3>
    <panda-select v-model="selected" placeholder="最喜欢的饮料">
      <panda-option value="可乐">可乐</panda-option>
      <panda-option value="咖啡">咖啡</panda-option>
      <panda-option value="乌龙茶">乌龙茶</panda-option>
    </panda-select>
    <!-- code -->
    <!-- <pre>
      <code class="html">
        &lt;Radio v-model="drink" label="果汁"&gt;果汁&lt;/Radio&gt;
        &lt;Radio v-model="drink" label="咖啡"&gt;咖啡&lt;/Radio&gt;
        &lt;Radio v-model="drink" label="牛奶"&gt;牛奶&lt;/Radio&gt;
      </code>
    </pre> -->
    <h3>禁用</h3>
    <panda-select v-model="selected" placeholder="最喜欢的饮料" disabled>
      <panda-option value="可乐">可乐</panda-option>
      <panda-option value="咖啡">咖啡</panda-option>
      <panda-option value="乌龙茶">乌龙茶</panda-option>
    </panda-select>
    <h3>可清空</h3>
    <panda-select v-model="selected" placeholder="最喜欢的饮料" clearable>
      <panda-option value="可乐">可乐</panda-option>
      <panda-option value="咖啡">咖啡</panda-option>
      <panda-option value="乌龙茶">乌龙茶</panda-option>
    </panda-select>
    <h3>可搜索</h3>
    <panda-select v-model="selected" placeholder="最喜欢的饮料" searchable>
      <panda-option value="可乐">可乐</panda-option>
      <panda-option value="咖啡">咖啡</panda-option>
      <panda-option value="乌龙茶">乌龙茶</panda-option>
    </panda-select>
    <h3>多选</h3>
    <panda-select v-model="multiSelected" placeholder="最喜欢的饮料" multiple>
      <panda-option value="可乐">可乐</panda-option>
      <panda-option value="咖啡">咖啡</panda-option>
      <panda-option value="乌龙茶">乌龙茶</panda-option>
    </panda-select>
  </div>
</template>

<script>
  export default {
    name: 'select-preview',
    data (){
      return {
        selected: '',
        multiSelected: [],
      };
    },
  };
</script>