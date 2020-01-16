<template>
  <div id="Radio">
    <h2>Radio 单选框</h2>
    
    <h3>默认</h3>
    <p>喜欢的饮料，你选择了：{{ drink }}</p>
    <panda-radio v-model="drink" label="果汁">果汁</panda-radio>
    <panda-radio v-model="drink" label="咖啡">咖啡</panda-radio>
    <panda-radio v-model="drink" label="牛奶">牛奶</panda-radio>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;panda-radio v-model="drink" label="果汁"&gt;果汁&lt;/panda-radio&gt;
        &lt;panda-radio v-model="drink" label="咖啡"&gt;咖啡&lt;/panda-radio&gt;
        &lt;panda-radio v-model="drink" label="牛奶"&gt;牛奶&lt;/panda-radio&gt;
      </code>
    </pre>
    <h3>禁用</h3>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;panda-radio value="果汁" label="果汁" disabled&gt;果汁&lt;/panda-radio&gt;
      </code>
    </pre>
    <panda-radio value="果汁" label="果汁" disabled>果汁</panda-radio>
  </div>
</template>

<script>
  export default {
    name: 'radio-preview',
    data (){
      return {
        drink: ''
      };
    },
  };
</script>