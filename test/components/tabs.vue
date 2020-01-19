<template>
  <div id="Tabs">
    <h2>Tabs 标签页</h2>
    
    <h3>默认</h3>
    <panda-tabs>
      <panda-tab name="tab1">This is tab1</panda-tab>
      <panda-tab name="tab2">This is tab2</panda-tab>
      <panda-tab name="tab3" disabled>This is tab3</panda-tab>
      <panda-tab name="tab4">This is tab4</panda-tab>
    </panda-tabs>
  </div>
</template>

<script>
  export default {
    name: 'tab-preview',
    data (){
      return {
        //
      };
    },
  };
</script>