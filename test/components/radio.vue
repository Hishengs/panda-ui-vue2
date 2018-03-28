<template>
  <div id="Radiobox">
    <h2>Radio 单选框</h2>
    
    <h3>默认</h3>
    <p>喜欢的饮料，你选择了：{{ drink }}</p>
    <Radio v-model="drink" label="果汁">果汁</Radio>
    <Radio v-model="drink" label="咖啡">咖啡</Radio>
    <Radio v-model="drink" label="牛奶">牛奶</Radio>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;Radio v-model="drink" label="果汁"&gt;果汁&lt;/Radio&gt;
        &lt;Radio v-model="drink" label="咖啡"&gt;咖啡&lt;/Radio&gt;
        &lt;Radio v-model="drink" label="牛奶"&gt;牛奶&lt;/Radio&gt;
      </code>
    </pre>
    <h3>禁用</h3>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;Radio value="果汁" label="果汁" disabled&gt;果汁&lt;/Radio&gt;
      </code>
    </pre>
    <Radio value="果汁" label="果汁" disabled>果汁</Radio>
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