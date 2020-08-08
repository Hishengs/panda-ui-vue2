<template>
  <div id="app">
    <Nav></Nav>
    <div class="main">
      <div class="markdown-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from './nav.vue';

  export default {
    components: {
      Nav,
    },
  };
</script>

<style lang="less">
  html, body {
    color: #333333;
    height: 100%;
  }
  #app {
    font-size: 1.4rem;
    display: flex;
    height: 100%;
  }
  .main {
    padding: 10px 40px 20px 40px;
    flex: 1;
    .markdown-body {
      max-width: 1024px;
    }
    .vmark > h1 {
      // font-size: 36px;
      &::after {
        display: block;
        content: '';
        width: 150px;
        height: 18px;
        margin-top: -18px;
        background-color: #ffd45e;
      }
    }
    .vmark > h2 {
      // font-size: 28px;
      &::after {
        display: block;
        content: '';
        width: 250px;
        height: 14px;
        margin-top: -14px;
        background-color: #ffbb96;
      }
    }
    .vmark > h3 {
      // font-size: 24px;
      &::after {
        display: block;
        content: '';
        width: 150px;
        height: 12px;
        margin-top: -12px;
        background-color: #d9f7be;
      }
    }
    .vmark {
      > table {
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
      }

      > table th {
        font-weight: 600;
      }

      > table td,
      > table th {
        padding: 6px 13px;
        border: 1px solid #dfe2e5;
      }

      > table tr {
        background-color: #fff;
        border-top: 1px solid #c6cbd1;
      }

      > tr:nth-child(2n) {
        background-color: #f6f8fa;
      }
    }
  }
  .main, .nav {
    max-height: 100%;
    overflow: auto;
  }
</style>