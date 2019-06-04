<template>
  <div id="Switch">
    <h2>Switch 开关</h2>
    
    <h3>默认</h3>
    <i-switch v-model="checked"></i-switch>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;i-switch v-model="checked"&gt;&lt;/i-switch&gt;
      </code>
    </pre>
    <h3>禁用</h3>
    <i-switch :disabled="true"></i-switch>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;i-switch :disabled="true"&gt;&lt;/i-switch&gt;
      </code>
    </pre>
    <h3>大小</h3>
    小 <i-switch v-model="checked" size="small"></i-switch>
    正常 <i-switch v-model="checked"></i-switch>
    大 <i-switch v-model="checked" size="large"></i-switch>
    <!-- code -->
    <pre>
      <code class="html">
        &lt;i-switch size="small"&gt;&lt;/i-switch&gt;
        &lt;i-switch size="default"&gt;&lt;/i-switch&gt;
        &lt;i-switch size="large"&gt;&lt;/i-switch&gt;
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