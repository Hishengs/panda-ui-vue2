<template>
  <div id="app" ref="app">

    <div id="nav">
      <div class="inner">
        <h1 id="logo">
          <a href="javascript:;" @click="onNav('logo')">Panda UI <img src="./panda.png"></a>
        </h1>
      </div>
    </div>

    <div id="main" ref="main">
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
        <SelectPreview></SelectPreview>
      </div>

      <div class="component">
        <TextareaPreview></TextareaPreview>
      </div>

      <div class="component">
        <RadioPreview></RadioPreview>
      </div>

      <div class="component">
        <CheckboxPreview></CheckboxPreview>
      </div>

      <div class="component">
        <SwitchPreview></SwitchPreview>
      </div>

      <div class="component">
        <SliderPreview></SliderPreview>
      </div>

      <div class="component">
        <AlertPreview></AlertPreview>
      </div>

      <div class="component">
        <TagInputPreview></TagInputPreview>
      </div>

      <div class="component">
        <TablePreview></TablePreview>
      </div>
    </div>

    <!-- 菜单 -->
    <ul id="menu">
      <a href="javascript:;" @click="onNav('Icon')"><li>Icon（图标）</li></a>
      <a href="javascript:;" @click="onNav('Button')"><li>Button（按钮）</li></a>
      <a href="javascript:;" @click="onNav('Badge')"><li>Badge（徽标）</li></a>
      <a href="javascript:;" @click="onNav('Tag')"><li>Tag（标签）</li></a>
      <a href="javascript:;" @click="onNav('Input')"><li>Input（输入框）</li></a>
      <a href="javascript:;" @click="onNav('NumberInput')"><li>NumberInput（数字输入框）</li></a>
      <a href="javascript:;" @click="onNav('Select')"><li>Select（下拉框）</li></a>
      <a href="javascript:;" @click="onNav('Textarea')"><li>Textarea（文本输入框）</li></a>
      <a href="javascript:;" @click="onNav('Radiobox')"><li>Radiobox（单选）</li></a>
      <a href="javascript:;" @click="onNav('Checkbox')"><li>Checkbox（多选）</li></a>
      <a href="javascript:;" @click="onNav('Switch')"><li>Switch（开关）</li></a>
      <a href="javascript:;" @click="onNav('Slider')"><li>Slider（滑块）</li></a>
      <a href="javascript:;" @click="onNav('Alert')"><li>Alert（提示）</li></a>
      <a href="javascript:;" @click="onNav('TagInput')"><li>TagInput（标签输入框）</li></a>
      <a href="javascript:;" @click="onNav('Table')"><li>Table（表格）</li></a>
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
  import SelectPreview from './components/select.vue';
  import TextareaPreview from './components/textarea.vue';
  import RadioPreview from './components/radio.vue';
  import CheckboxPreview from './components/checkbox.vue';
  import SwitchPreview from './components/switch.vue';
  import SliderPreview from './components/slider.vue';
  import TagInputPreview from './components/tag-input.vue';
  import TablePreview from './components/table.vue';

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
      SelectPreview,
      TextareaPreview,
      RadioPreview,
      CheckboxPreview,
      SwitchPreview,
      SliderPreview,
      TagInputPreview,
      TablePreview,
    },
    methods: {
      onNav (id) {
        /* global document */
        /* document.getElementById(id).scrollIntoView({
          behavior: 'smooth',
        }); */
        this.$refs.main.scrollBy(0, 50);
      }
    }
  };
</script>

<style lang= "less">
  /* body {
    background: #f6ffed;
  } */
  #app {
    color: #555;
    #nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      background-color: white;
      z-index: 999;
      border-bottom: 1px solid #eee;
      box-shadow: 1px 5px 10px rgba(0,0,0,.1);
      color: white;
      background: linear-gradient(to right, #ffa39e 0%, #69c0ff 100%);
      .inner {
        width: 800px;
        margin: 0 auto;
        a {
          text-decoration: none;
          color: inherit;
        }
        #logo {
          line-height: 40px;
          img {
            height: 40px;
            display: inline-block;
            vertical-align: middle;
            margin-top: -5px;
          }
        }
      }
    }
    #main {
      background: white;
      width: 800px;
      margin: 0 auto;
      margin-top: 100px;
    }
    #menu {
      background: white;
      position: fixed;
      top: 100px;
      bottom: 0;
      right: calc(50% + 420px);
      margin: 0;
      padding: 0;
      list-style: none;
      border: 1px solid #eee;
      box-shadow: 1px 5px 10px rgba(0,0,0,.1);
      a {
        text-decoration: none;
        color: inherit;
        &:hover {
          color: #222;
        }
        li {
          font-size: 14px;
          padding: 15px 20px;
          &:hover {
            background-color: #f5f5f5;
          }
        }
      }
    }
    .component {
      margin-bottom: 150px;
      border: 1px solid #eee;
      padding: 20px;
      box-shadow: 1px 5px 20px rgba(0,0,0,.1);
      h2 {
        margin-top: 0;
        margin-bottom: 40px;
      }
      h3:not(:first-child) {
        margin-top: 40px;
        margin-bottom: 20px;
      }
    }
    pre {
      margin: 0;
    }
    code {
      font-family: Consolas, 'Microsoft Yahei';
    }
    h1, h2, h3, h4 {
      font-weight: normal;
    }
    .component > div > table {
      width: 100%;
      border-collapse:collapse;
      border: 1px solid #dfdfdf;
      th, td {
        border: 1px solid #dfdfdf;
        padding: 10px;
        text-align: center;
      }
    }
  }
</style>

