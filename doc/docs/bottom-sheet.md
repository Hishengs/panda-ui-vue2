# BottomSheet

## 默认

```vue
<panda-button @click="visible1=true">显示浮层</panda-button>

<panda-bottom-sheet :visible.sync="visible1" title="测试专用标题">
  <div class="demo-content"></div>
</panda-bottom-sheet>
```

## 显示关闭按钮

```vue
<panda-button @click="visible2=true">显示浮层</panda-button>

<panda-bottom-sheet show-close :visible.sync="visible2" title="测试专用标题" :mask-closable="false">
  <div class="demo-content"></div>
</panda-bottom-sheet>
```

## 自定义头部左右显示

```vue
<panda-button @click="visible3=true">显示浮层</panda-button>

<panda-bottom-sheet :visible.sync="visible3" title="测试专用标题">
  <panda-icon slot="header-left" name="chevron-left" size="24"></panda-icon>
  <panda-button slot="header-right" size="mini" @click="visible3=false">done</panda-button>
  <div class="demo-content"></div>
</panda-bottom-sheet>
```

## 底部操作区

```vue
<panda-button @click="visible4=true">显示浮层</panda-button>

<panda-bottom-sheet :visible.sync="visible4" title="测试专用标题">
  <panda-button slot="footer" block @click="visible4=false">确认</panda-button>
  <div class="demo-content"></div>
</panda-bottom-sheet>
```

## BottomSheet Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| visible | 是否可见，可通过 .sync 绑定 | Boolean | — | false |
| title | 标题 | String | — | — |
| show-close | 显示关闭按钮 | Boolean | — | false |
| mask-closable | 点击遮罩是否可关闭 | Boolean | — | true |
| can-pull-close | 是否允许下拉关闭 | Boolean | — | true |

## BottomSheet Slots

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| default | 默认 | Slot | — | - |
| header-left | 头部左侧 | Slot | — | - |
| header-right | 头部右侧 | Slot | — | - |
| footer | 底部 | Slot | — | - |

## BottomSheet Events

| 事件 | 介绍 | 参数 |
|------|------|------|
| close | 关闭时触发 | — |

<script>
  export default {
    data () {
      return {
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false,
        visible5: false,
        visible6: false,
      };
    }
  };
</script>

<style lang="less" scoped>
  .demo-content {
    background-color: rgba(255, 87, 34, 0.1);
    height: 1200px;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    color: white;
    font-size: 20px;
  }
</style>
