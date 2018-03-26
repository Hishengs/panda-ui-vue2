<template>
  <div id="app">
    <h1>Panda UI </h1>

    <div class="component">
      <h2>Icon 图标</h2>
      <IconPreview></IconPreview>
    </div>

    <div class="component">
      <h2>Button 按钮</h2>
      <ButtonPreview></ButtonPreview>
    </div>

    <div class="component">
      <h2>Tag 标签</h2>
      <TagPreview></TagPreview>
    </div>

    <div class="component">
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

    <div class="component">
      <h2>Textarea 多行文本输入框</h2>
      <TextareaPreview></TextareaPreview>
    </div>

  </div>
</template>

<script>
  import IconPreview from './components/icon.vue';
  import ButtonPreview from './components/button.vue';
  import TagPreview from './components/tag.vue';
  import BadgePreview from './components/badge.vue';
  import AlertPreview from './components/alert.vue';
  import InputPreview from './components/input.vue';
  import TextareaPreview from './components/textarea.vue';
  export default {
    name: 'app',
    components: {
      IconPreview,
      ButtonPreview,
      TagPreview,
      BadgePreview,
      AlertPreview,
      InputPreview,
      TextareaPreview,
    },
  };
</script>

<style lang= "less">
  #app {
    padding: 20px;
    color: #444;
    width: 800px;
    margin: 0 auto;
    .component {
      margin-top: 50px;
      margin-bottom: 150px;
      h2 {
        margin-bottom: 40px;
        padding-top: 40px;
        border-top: 1px solid #dedede;
      }
      h3 {
        margin-top: 30px;
      }
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

