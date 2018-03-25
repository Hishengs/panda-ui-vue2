<template>
  <div id="app">
    <h1>Panda UI 测试</h1>

    <div class="component">
      <h2>Button 按钮</h2>
      <ButtonPreview></ButtonPreview>
    </div>

    <div class="component x800">
      <h2>Tag 标签</h2>
      <TagPreview></TagPreview>
    </div>

    <div class="component x800">
      <h2>Badge 徽标</h2>
      <BadgePreview></BadgePreview>
    </div>

    <div class="component">
      <h2>Alert 警告</h2>
      <AlertPreview></AlertPreview>
    </div>

    <div class="component">
      <h2>Input 输入框</h2>
      <InputPreview></InputPreview>
    </div>
  </div>
</template>

<script>
  import ButtonPreview from './components/button.vue';
  import TagPreview from './components/tag.vue';
  import BadgePreview from './components/badge.vue';
  import AlertPreview from './components/alert.vue';
  import InputPreview from './components/input.vue';
  export default {
    name: 'app',
    components: {
      ButtonPreview,
      TagPreview,
      BadgePreview,
      AlertPreview,
      InputPreview,
    },
  };
</script>

<style lang= "less">
  #app {
    padding: 20px;
    color: #444;
    .component {
      width: 600px;
      margin-top: 40px;
      margin-bottom: 100px;
      h2 {
        margin-top: 20px;
        margin-bottom: 30px;
        padding-top: 20px;
        border-top: 1px solid #dedede;
      }
      h3 {
        margin-top: 30px;
      }
    }
    .x800 {
      width: 800px;
    }
    .code {
      color: #ffffff;
      background-color: #333;
      width: 100%;
      padding: 10px 0;
      margin: 10px 0;
      resize: none;
      border-radius: 3px;
      line-height: 1.5;
      font-family: 'Microsoft Yahei';
      &:hover, &:focus {
        outline: none;
      }
    }
  }
</style>

