<template>
  <div id="app">
    <h1 id="logo">Panda UI <img src="./panda.png"></h1>

    <div class="component">
      <IconPreview></IconPreview>
    </div>

    <div class="component">
      <ButtonPreview></ButtonPreview>
    </div>

    <div class="component">
      <TagPreview></TagPreview>
    </div>

    <div class="component">
      <BadgePreview></BadgePreview>
    </div>

    <div class="component">
      <InputPreview></InputPreview>
    </div>

    <div class="component">
      <NumberInputPreview></NumberInputPreview>
    </div>

    <div class="component">
      <TextareaPreview></TextareaPreview>
    </div>

    <div class="component">
      <RadioPreview></RadioPreview>
    </div>

    <div class="component">
      <AlertPreview></AlertPreview>
    </div>

    <!-- 菜单 -->
    <ul class="menu">
      <a href="#logo"><li>Panda UI</li></a>
      <a href="#Icon"><li>Icon（图标）</li></a>
      <a href="#Button"><li>Button（按钮）</li></a>
      <a href="#Badge"><li>Badge（徽标）</li></a>
      <a href="#Tag"><li>Tag（标签）</li></a>
      <a href="#Input"><li>Input（输入框）</li></a>
      <a href="#NumberInput"><li>NumberInput（数字输入框）</li></a>
      <a href="#Textarea"><li>Textarea（文本输入框）</li></a>
      <a href="#Radiobox"><li>Radiobox（单选）</li></a>
      <a href="#Alert"><li>Alert（提示）</li></a>
    </ul>
  </div>
</template>

<script>
  import IconPreview from './components/icon.vue';
  import ButtonPreview from './components/button.vue';
  import TagPreview from './components/tag.vue';
  import BadgePreview from './components/badge.vue';
  import AlertPreview from './components/alert.vue';
  import InputPreview from './components/input.vue';
  import NumberInputPreview from './components/number-input.vue';
  import TextareaPreview from './components/textarea.vue';
  import RadioPreview from './components/radio.vue';
  export default {
    name: 'app',
    components: {
      IconPreview,
      ButtonPreview,
      TagPreview,
      BadgePreview,
      AlertPreview,
      InputPreview,
      NumberInputPreview,
      TextareaPreview,
      RadioPreview,
    },
  };
</script>

<style lang= "less">
  #app {
    padding: 20px;
    color: #555;
    width: 800px;
    margin: 0 auto;
    > h1 {
      line-height: 40px;
      img {
        height: 40px;
        display: inline-block;
        vertical-align: middle;
        margin-top: -5px;
      }
    }
    .menu {
      position: fixed;
      top: 25%;
      left: 50%;
      margin-left: -700px;
      width: 300px;
      list-style: none;
      padding: 0;
      a {
        text-decoration: none;
        color: inherit;
        &:hover {
          color: #222;
        }
        li {
          font-size: 14px;
          margin: 15px 0;
        }
      }
    }
    .component {
      margin-top: 50px;
      margin-bottom: 150px;
      h2 {
        margin-bottom: 40px;
        padding-top: 40px;
        border-top: 1px solid #dedede;
      }
      h3 {
        margin-top: 50px;
      }
    }
    code {
      font-family: Consolas, 'Microsoft Yahei';
    }
    h1, h2, h3, h4 {
      font-weight: normal;
    }
  }
</style>

