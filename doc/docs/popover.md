# Popover

## 默认
```vue
<panda-popover content="Your details are safe with us. ">
  <panda-button color="primary">查看内容</panda-button>
</panda-popover>

<panda-popover title="Klook Price Guarantee">
  <panda-button color="primary">带标题</panda-button>
  <p slot="content">
    Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!
  </p>
</panda-popover>

<panda-popover content="Your details are safe with us. " :arrow="false">
  <panda-button color="primary">无箭头</panda-button>
</panda-popover>

<!-- <panda-popover title="当前时间" trigger="click" closable placement="bottom-start" :width="330">
  <panda-button color="primary">查看时间</panda-button>
  <panda-date-picker :date.sync="date" slot="content"></panda-date-picker>
</panda-popover> -->
```

### Dark 暗黑
```vue
<panda-popover content="Your details are safe with us. " :dark="true">
  <panda-button color="primary">查看内容</panda-button>
</panda-popover>

<panda-popover title="Klook Price Guarantee" :dark="true" trigger="click">
  <panda-button color="primary">带标题</panda-button>
  <p slot="content">
    Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!
  </p>
</panda-popover>
```

### 触发方式
```vue
<panda-popover title="This is title" content="Your details are safe with us. ">
  <panda-button color="primary">hover</panda-button>
</panda-popover>

<panda-popover title="Klook Price Guarantee" content="Find a cheaper ticket, tour or activity and we'll refund Double the difference!" trigger="click">
  <panda-button color="primary">click</panda-button>
</panda-popover>

<panda-popover title="This is title" content="Your details are safe with us. " trigger="focus">
  <panda-button color="primary">focus</panda-button>
</panda-popover>

<panda-popover title="This is title" content="Your details are safe with us. " trigger="focus">
  <panda-input placeholder="focus 触发" value=""></panda-input>
</panda-popover>

<panda-button color="primary" @click="show=!show">
  手动激活右侧 Poptip
</panda-button>

<panda-popover content="Your details are safe with us. " v-model="show" trigger="none">
  <panda-button color="primary">查看内容</panda-button>
</panda-popover>
```

### 可关闭
```vue
<panda-popover content="Find a cheaper ticket, tour or activity and we'll refund Double the difference!" trigger="click" closable>
  <panda-button color="primary">可关闭</panda-button>
</panda-popover>

<panda-popover content="Find a cheaper ticket, tour or activity and we'll refund Double the difference!" trigger="click" closable :dark="true">
  <panda-button color="primary">可关闭(Dark)</panda-button>
</panda-popover>

<!-- <panda-popover trigger="click" closable placement="top-start">
  <template #content>
    <panda-popover content="Your details are safe with us. " trigger="click" closable placement="top">
      <panda-button color="primary">查看内容</panda-button>
    </panda-popover>
  </template>
  <panda-button color="primary">可关闭</panda-button>
</panda-popover> -->
```

### 方向
支持 12 个方向

```vue
<div class="poptip-placement">
  <panda-popover content="Your details are safe with us. " placement="top-start">
    <panda-button color="primary">Top Start</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="top">
    <panda-button color="primary">Top</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="top-end">
    <panda-button color="primary">Top End</panda-button>
  </panda-popover>
</div>

<div class="poptip-placement">
  <panda-popover content="Your details are safe with us. " placement="left-start">
    <panda-button color="primary">Left Start</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="left">
    <panda-button color="primary">Left</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="left-end">
    <panda-button color="primary">Left End</panda-button>
  </panda-popover>
</div>

<div class="poptip-placement">
  <panda-popover content="Your details are safe with us. " placement="right-start">
    <panda-button color="primary">Right Start</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="right">
    <panda-button color="primary">Right</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="right-end">
    <panda-button color="primary">Right End</panda-button>
  </panda-popover>
</div>

<div class="poptip-placement">
  <panda-popover content="Your details are safe with us. " placement="bottom-start">
    <panda-button color="primary">Bottom Start</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="bottom">
    <panda-button color="primary">Bottom</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="bottom-end">
    <panda-button color="primary">Bottom End</panda-button>
  </panda-popover>
</div>
```

</br>

dark

```vue
<div class="poptip-placement">
  <panda-popover content="Your details are safe with us. " placement="top-start" :dark="true">
    <panda-button color="primary">Top Start</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="top" :dark="true">
    <panda-button color="primary">Top</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="top-end" :dark="true">
    <panda-button color="primary">Top End</panda-button>
  </panda-popover>
</div>

<div class="poptip-placement">
  <panda-popover content="Your details are safe with us. " placement="left-start" :dark="true">
    <panda-button color="primary">Left Start</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="left" :dark="true">
    <panda-button color="primary">Left</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="left-end" :dark="true">
    <panda-button color="primary">Left End</panda-button>
  </panda-popover>
</div>

<div class="poptip-placement">
  <panda-popover content="Your details are safe with us. " placement="right-start" :dark="true">
    <panda-button color="primary">Right Start</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="right" :dark="true">
    <panda-button color="primary">Right</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="right-end" :dark="true">
    <panda-button color="primary">Right End</panda-button>
  </panda-popover>
</div>

<div class="poptip-placement">
  <panda-popover content="Your details are safe with us. " placement="bottom-start" :dark="true">
    <panda-button color="primary">Bottom Start</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="bottom" :dark="true">
    <panda-button color="primary">Bottom</panda-button>
  </panda-popover>

  <panda-popover content="Your details are safe with us. " placement="bottom-end" :dark="true">
    <panda-button color="primary">Bottom End</panda-button>
  </panda-popover>
</div>
```


## Poptip Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 是否显示，可通过 v-model 控制 | Boolean | — | false |
| title | 标题 | String | — | - |
| content | 内容 | String | — | — |
| placement | 弹出位置  | String | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | top |
| trigger | 触发方式 | String | hover, click, focus, none | hover |
| offset | 偏移 | Number | — | 10 |
| width | popper 宽度 | Number | — | - |
| max-width | popper 最大宽度 | Number | — | 360 |
| height | popper 高度 | Number | — | - |
| max-height | popper 最大高度 | Number | — | 152 |
| closable | 可关闭 | Boolean | — | false |
| z-index | popper 层级 | Number | — | - |
| dark | 黑色风格 | Boolean | — | false |
| append-to-body | 附加到 body | Boolean | — | false |


## Poptip Slots

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| content | 内容 | Slot | — | - |


<script>
  export default {
    data () {
      return {
        date: new Date(),
        show: false,
      };
    }
  };
</script>

<style lang="less" scoped>
  .panda-popover {
    margin: 10px;
  }
  .poptip-placement {
    margin: 0 auto;
    width: 500px;
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    .panda-button {
      width: 150px;
    }
  }
</style>
