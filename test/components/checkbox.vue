<template>
  <div id="Checkbox">
    <h2>Checkbox 单选框</h2>
    
    <h3>默认</h3>
    <p>单选</p>
    <panda-checkbox v-model="checked">果汁</panda-checkbox>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;panda-checkbox v-model="checked"&gt;果汁&lt;/panda-checkbox&gt;
      </code>
    </pre>
    <h3>禁用</h3>
    <panda-checkbox v-model="checked"  :disabled="true">果汁</panda-checkbox>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;panda-checkbox :disabled="true"&gt;果汁&lt;/panda-checkbox&gt;
      </code>
    </pre>
    <h3>多选组</h3>
    <panda-checkbox-group v-model="selected">
      <panda-checkbox value="果汁">果汁</panda-checkbox>
      <panda-checkbox value="可乐">可乐</panda-checkbox>
      <panda-checkbox value="红茶">红茶</panda-checkbox>
    </panda-checkbox-group>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;panda-checkbox-group v-model="selected"&gt;
          &lt;panda-checkbox value="果汁"&gt;果汁&lt;/panda-checkbox&gt;
          &lt;panda-checkbox value="可乐"&gt;可乐&lt;/panda-checkbox&gt;
          &lt;panda-checkbox value="红茶"&gt;红茶&lt;/panda-checkbox&gt;
        &lt;/panda-checkbox-group&gt;
      </code>
    </pre>
    <h4>多选组-禁用</h4>
    <panda-checkbox-group v-model="selected" :disabled="true">
      <panda-checkbox value="果汁">果汁</panda-checkbox>
      <panda-checkbox value="可乐">可乐</panda-checkbox>
      <panda-checkbox value="红茶">红茶</panda-checkbox>
    </panda-checkbox-group>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;panda-checkbox-group v-model="selected" :disabled="true"&gt;
          &lt;panda-checkbox value="果汁"&gt;果汁&lt;/panda-checkbox&gt;
          &lt;panda-checkbox value="可乐"&gt;可乐&lt;/panda-checkbox&gt;
          &lt;panda-checkbox value="红茶"&gt;红茶&lt;/panda-checkbox&gt;
        &lt;/panda-checkbox-group&gt;
      </code>
    </pre>
  </div>
</template>

<script>
  export default {
    name: 'checkbox-preview',
    data (){
      return {
        checked: false,
        selected: ['果汁'],
      };
    },
  };
</script>