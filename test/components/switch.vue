<template>
  <div id="Switch">
    <h2>Switch 开关</h2>
    
    <h3>默认</h3>
    <panda-switch v-model="checked"></panda-switch>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;panda-switch v-model="checked"&gt;&lt;/panda-switch&gt;
      </code>
    </pre>
    <h3>禁用</h3>
    <panda-switch :disabled="true"></panda-switch>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;panda-switch :disabled="true"&gt;&lt;/panda-switch&gt;
      </code>
    </pre>
    <h3>大小</h3>
    小 <panda-switch v-model="checked" size="small"></panda-switch>
    正常 <panda-switch v-model="checked"></panda-switch>
    大 <panda-switch v-model="checked" size="large"></panda-switch>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;panda-switch size="small"&gt;&lt;/panda-switch&gt;
        &lt;panda-switch size="default"&gt;&lt;/panda-switch&gt;
        &lt;panda-switch size="large"&gt;&lt;/panda-switch&gt;
      </code>
    </pre>
  </div>
</template>

<script>
  export default {
    name: 'switch-preview',
    data (){
      return {
        checked: false,
      };
    },
  };
</script>