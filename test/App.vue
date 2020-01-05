<template>
  <div id="app" ref="app">

    <img src="./kongfu-panda.png" alt="" class="kongfu-panda">

    <img src="./corner-panda.jpeg" alt="" class="panda-at-conner">

    <div id="nav">
      <div class="inner">
        <h1 id="logo">
          <a href="javascript:;" @click="onNav('logo')">Panda UI <img src="./panda-nuddle.jpeg"></a>
        </h1>
      </div>
    </div>

    <div id="main" ref="main">
      <div class="component">
        <component :is="selected"></component>
      </div>

    </div>

    <div class="site-info">
      <p>Created and Design with ❤️ by Hisheng.</p>
    </div>

    <!-- 菜单 -->
    <ul id="menu">
      <a
        href="javascript:;"
        v-for="(menu,i ) in menus"
        :key="i"
        @click="onNav(menu.id)"
        :class="{
          selected: menu.id === selected
        }"
      >
        <li>{{ menu.name }}</li>
      </a>
    </ul>

  </div>
</template>

<script>
  import Intro from './intro.vue';
  import Updates from './updates.vue';
  import Start from './get-started.vue';
  import Icon from './components/icon.vue';
  import Button from './components/button.vue';
  import Tag from './components/tag.vue';
  import Badge from './components/badge.vue';
  import Alert from './components/alert.vue';
  import Input from './components/input.vue';
  import NumberInput from './components/number-input.vue';
  import Select from './components/select.vue';
  import Textarea from './components/textarea.vue';
  import Radio from './components/radio.vue';
  import Checkbox from './components/checkbox.vue';
  import iSwitch from './components/switch.vue';
  import Slider from './components/slider.vue';
  import TagInput from './components/tag-input.vue';
  import Table from './components/table.vue';
  import Modal from './components/modal.vue';
  import Drawer from './components/drawer.vue';
  import Notice from './components/notice.vue';
  import Collapse from './components/collapse.vue';
  import Divider from './components/divider.vue';
  import Message from './components/message.vue';
  import Tooltip from './components/tooltip.vue';

  export default {
    name: 'app',
    components: {
      Intro,
      Updates,
      Start,
      Icon,
      Button,
      Tag,
      Badge,
      Alert,
      Input,
      NumberInput,
      Select,
      Textarea,
      Radio,
      Checkbox,
      iSwitch,
      Slider,
      TagInput,
      Table,
      Modal,
      Drawer,
      Notice,
      Collapse,
      Divider,
      Message,
      Tooltip,
    },
    data () {
      return {
        selected: 'Intro',
        menus: [
          { id: 'Intro', name: '介绍' },
          { id: 'Start', name: '起步' },
          { id: 'Updates', name: '更新日志' },
          { id: 'Icon', name: 'Icon（图标）' },
          { id: 'Button', name: 'Button（按钮）' },
          { id: 'Badge', name: 'Badge（徽标）' },
          { id: 'Tag', name: 'Tag（标签）' },
          { id: 'Input', name: 'Input（输入框）' },
          { id: 'NumberInput', name: 'NumberInput（数字输入框）' },
          { id: 'Select', name: 'Select（下拉框）' },
          { id: 'Textarea', name: 'Textarea（文本输入框）' },
          { id: 'Radio', name: 'Radiobox（单选）' },
          { id: 'Checkbox', name: 'Checkbox（多选）' },
          { id: 'iSwitch', name: 'Switch（开关）' },
          { id: 'Slider', name: 'Slider（滑块）' },
          { id: 'Alert', name: 'Alert（提示）' },
          { id: 'TagInput', name: 'TagInput（标签输入框）' },
          { id: 'Table', name: 'Table（表格）' },
          { id: 'Modal', name: 'Modal（弹窗）' },
          { id: 'Drawer', name: 'Drawer（抽屉）' },
          { id: 'Notice', name: 'Notice（通知）' },
          { id: 'Collapse', name: 'Collapse（折叠面板）' },
          { id: 'Divider', name: 'Divider（分割线）' },
          { id: 'Message', name: 'Message（消息提示）' },
          { id: 'Tooltip', name: 'Tooltip（文字提示）' }
        ],
      };
    },
    mounted () {
      const id = location.href.split('#')[1];
      if (id) {
        this.selected = id;
      }
    },
    methods: {
      onNav (id) {
        this.selected = id;
        /* global document */
        document.getElementById('app').scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        let url = location.href.split('#')[0];
        url += `#${id}`;
        location.href = url;
      }
    }
  };
</script>

<style lang="less">
  .kongfu-panda {
    position: fixed;
    top: 200px;
    left: 0;
    width: 150px;
  }
  .panda-at-conner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100px;
  }
  body {
    height: 100vh;
  }
  #app {
    height: 100%;
    overflow: auto;
    position: relative;
    padding: 0 20px;
    color: #555;
    #nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      /* background-color: white; */
      background-color: #f5f5f5;
      z-index: 999;
      border-bottom: 1px solid #eee;
      box-shadow: 1px 5px 10px rgba(0,0,0,.1);
      /* color: white; */
      /* background: linear-gradient(to right, #ffa39e 0%, #69c0ff 100%); */
      padding: 0 160px;
      .inner {
        /* width: 800px; */
        margin: 0 auto;
        a {
          text-decoration: none;
          color: inherit;
        }
        #logo {
          line-height: 40px;
          img {
            height: 40px;
            transform: scale(2, 2);
            margin-left: 20px;
            display: inline-block;
            vertical-align: middle;
            margin-top: -5px;
          }
        }
      }
    }
    #main {
      position: relative;
      background: white;
      max-width: 900px;
      margin: 0;
      margin-left: calc(50% - 430px);
      margin-top: 100px;
      min-height: calc(100% - 160px);
    }
    .site-info {
      text-align: center;
    }
    #menu {
      background: rgba(255,255,255,.9);
      position: fixed;
      top: 100px;
      bottom: 20px;
      right: calc(50% + 470px);
      margin: 0;
      padding: 0;
      overflow-y: auto;
      list-style: none;
      border: 1px solid #eee;
      box-shadow: 1px 5px 10px rgba(0,0,0,.1);
      a {
        text-decoration: none;
        color: inherit;
        &:hover {
          color: #0084fe;
        }
        li {
          font-size: 14px;
          padding: 15px 20px;
          &:hover {
            background-color: #f5f5f5;
          }
        }
      }
      a.selected {
        color: #0084fe;
      }
    }
    .component {
      height: 100%;
      /* margin-bottom: 50px; */
      border: 1px solid #eee;
      padding: 20px 30px 30px 30px;
      box-shadow: 1px 5px 20px rgba(0,0,0,.1);
      > div > h2 {
        margin-top: 0;
        margin-bottom: 40px;
      }
      > div > h3:not(:first-child) {
        margin-top: 80px;
        margin-bottom: 30px;
      }
      > div > h4 {
        margin-top: 30px;
        margin-bottom: 20px;
      }
      > div > h2 {
        &::after {
          display: block;
          content: '';
          width: 150px;
          height: 22px;
          margin-top: -22px;
          background-color: #ffd45e;
        }
      }
      > div > h3 {
        &::after {
          display: block;
          content: '';
          width: 250px;
          height: 18px;
          margin-top: -18px;
          background-color: #ffbb96;
        }
      }
      > div > h4 {
        &::after {
          display: block;
          content: '';
          width: 150px;
          height: 16px;
          margin-top: -16px;
          background-color: #d9f7be;
        }
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

