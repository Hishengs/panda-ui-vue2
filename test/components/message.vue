<template>
  <div id="Message">
    <h2>Message 通知</h2>
    
    <h3>使用</h3>
    <Button type="primary" @click="showMessage">显示 Message</Button>
  </div>
</template>

<script>
  let id = 0;
  const intro = `来自 Panda-UI 的问候～`;
  export default {
    methods: {
      showMessage () {
        this.$message({
          title: `测试标题${++id}`,
          content: intro,
          duration: 3000,
        });
      }
    }
  };
</script>