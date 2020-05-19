<template>
  <div id="Slider">
    <h2>Slider 滑块</h2>
    
    <h3>默认</h3>
    <p>进度：{{ progress }}%</p>
    <panda-slider v-model="progress"></panda-slider>
    <!-- code -->
    <!-- <pre>
      <code class="html">
        &lt;Checkbox v-model="checked"&gt;果汁&lt;/Checkbox&gt;
      </code>
    </pre> -->
  </div>
</template>

<script>
  export default {
    name: 'checkbox-preview',
    data (){
      return {
        progress: 10,
      };
    },
  };
</script>