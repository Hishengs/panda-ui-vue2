<template>
  <div id="Checkbox">
    <h2>Checkbox 单选框</h2>
    
    <h3>默认</h3>
    <p>单选</p>
    <Checkbox v-model="checked">果汁</Checkbox>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;Checkbox v-model="checked"&gt;果汁&lt;/Checkbox&gt;
      </code>
    </pre>
    <h3>禁用</h3>
    <Checkbox v-model="checked"  :disabled="true">果汁</Checkbox>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;Checkbox :disabled="true"&gt;果汁&lt;/Checkbox&gt;
      </code>
    </pre>
    <h3>多选组</h3>
    <CheckboxGroup v-model="selected">
      <Checkbox value="果汁">果汁</Checkbox>
      <Checkbox value="可乐">可乐</Checkbox>
      <Checkbox value="红茶">红茶</Checkbox>
    </CheckboxGroup>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;CheckboxGroup v-model="selected"&gt;
          &lt;Checkbox value="果汁"&gt;果汁&lt;/Checkbox&gt;
          &lt;Checkbox value="可乐"&gt;可乐&lt;/Checkbox&gt;
          &lt;Checkbox value="红茶"&gt;红茶&lt;/Checkbox&gt;
        &lt;/CheckboxGroup&gt;
      </code>
    </pre>
    <h4>多选组-禁用</h4>
    <CheckboxGroup v-model="selected" :disabled="true">
      <Checkbox value="果汁">果汁</Checkbox>
      <Checkbox value="可乐">可乐</Checkbox>
      <Checkbox value="红茶">红茶</Checkbox>
    </CheckboxGroup>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;CheckboxGroup v-model="selected" :disabled="true"&gt;
          &lt;Checkbox value="果汁"&gt;果汁&lt;/Checkbox&gt;
          &lt;Checkbox value="可乐"&gt;可乐&lt;/Checkbox&gt;
          &lt;Checkbox value="红茶"&gt;红茶&lt;/Checkbox&gt;
        &lt;/CheckboxGroup&gt;
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