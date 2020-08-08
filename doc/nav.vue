<template>
  <div class="nav">
    <h1 class="title">Panda UI</h1>
    <ul>
      <li class="nav-item" v-for="item in guideItems" :key="item.name" :class="{
        'nav-item-active': `/${item.name}` === $route.path,
      }">
        <router-link :to="`/${item.name}`">{{ transformName(item.name) }} {{ item.zhName }}</router-link>
      </li>
    </ul>
    <h1>组件({{ items.length }})</h1>
    <ul>
      <li class="nav-item" v-for="item in items" :key="item.name" :class="{
        'nav-item-active': `/${item.name}` === $route.path,
      }">
        <router-link :to="`/${item.name}`">{{ transformName(item.name) }} {{ item.zhName }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  /**
   * Camelize a hyphen-delimited string.
   */
  const camelizeRE = /-(\w)/g;
  const camelize = str => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
  };

  /**
   * Capitalize a string.
   */
  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  export default {
    data () {
      return {
        guideItems: [
          { name: 'intro', zhName: '介绍', },
          { name: 'installation', zhName: '安装', },
          { name: 'get-started', zhName: '快速上手', },
          { name: 'i18n', zhName: '国际化', },
          { name: 'changlog', zhName: '更新日志', },
          { name: 'comp-progress', zhName: '组件进度', },
        ],
        items: [
          { name: 'alert', zhName: '警告提示', },
          { name: 'announcement', zhName: '公告', },
          { name: 'badge', zhName: '徽标', },
          { name: 'button', zhName: '按钮', },
           { name: 'bottom-sheet', zhName: '底部面板', },
          // { name: 'calendar', zhName: '日历', },
          { name: 'carousel', zhName: '走马灯', },
          { name: 'checkbox', zhName: '复选框', },
          { name: 'collapse', zhName: '折叠面板', },
          { name: 'divider', zhName: '分割线', },
          // { name: 'dropdown', zhName: '下拉菜单', },
          // { name: 'form', zhName: '表单', },
          { name: 'grid', zhName: '网格', },
          { name: 'icon', zhName: '图标', },
          { name: 'input', zhName: '输入框', },
          // { name: 'loading', zhName: '加载', },
          { name: 'message', zhName: '消息提示', },
          { name: 'modal', zhName: '对话框', },
          { name: 'notice', zhName: '通知', },
          { name: 'number-input', zhName: '数字输入框', },
          { name: 'pagination', zhName: '分页', },
          { name: 'popover', zhName: '浮层', },
          // { name: 'progress', zhName: '进度条', },
          { name: 'radio', zhName: '单选框', },
          // { name: 'select', zhName: '下拉框', },
          { name: 'slider', zhName: '滑块选择', },
          { name: 'switch', zhName: '开关', },
          { name: 'table', zhName: '表格', },
          { name: 'tabs', zhName: '标签页', },
          { name: 'tag', zhName: '标签', },
          { name: 'tag-input', zhName: '标签输入框', },
          { name: 'textarea', zhName: '文本输入框', },
          // { name: 'timeline', zhName: '时间轴', },
          { name: 'tooltip', zhName: '文字提示', },
          // { name: 'tree', zhName: '树形控件', },
          // { name: 'upload', zhName: '上传', },
        ],
      };
    },
    methods: {
      transformName (name) {
        return capitalize(camelize(name));
      }
    },
  };
</script>

<style lang="less">
  .nav {
    flex-basis: 240px;
    border-right: 1px solid #eee;
    h1, h2, h3 {
      // font-weight: normal;
      padding: 20px 15px;
      margin: 0;
      border-bottom: 1px solid #eee;
    }
    h1 {
      font-size: 16px;
    }
    .title {
      font-weight: 600;
      font-size: 20px;
    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    .nav-item {
      padding: 0;
      font-size: 14px;
      margin: 0;
      border-bottom: 1px solid #eee;
      &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
        color: #0084fe;
      }
      > a {
        text-decoration: none;
        color: currentColor;
        display: inline-block;
        width: 100%;
        padding: 10px 15px;
      }
      &-active {
        color: #0084fe;
        background-color: rgb(230, 247, 255);
        // color: white;
        /* position: relative;
        &::after {
          position: absolute;
          display: block;
          content: '';
          height: .3em;
          top: 30px;
          left: 15px;
          right: 15px;
          width: 60%;
          background:
              linear-gradient(135deg, transparent, transparent 45%, #ffd45e, transparent 55%, transparent 100%),
              linear-gradient(45deg, transparent, transparent 45%, #ffd45e, transparent 55%, transparent 100%);
          background-size: .6em .6em;
          background-repeat: repeat-x, repeat-x;
        } */
      }
    }
  }
</style>