# Tooltip

## 默认
```vue
<panda-tooltip content="Your details are safe with us. ">
  <panda-button color="primary">查看内容</panda-button>
</panda-tooltip>
```

## 方向

支持 12 个方向

```vue
<div class="tooltip-placement">
  <panda-tooltip content="Your details are safe with us. " placement="top-start" :dark="true">
    <panda-button color="primary">Top Start</panda-button>
  </panda-tooltip>

  <panda-tooltip content="Your details are safe with us. " placement="top" :dark="true">
    <panda-button color="primary">Top</panda-button>
  </panda-tooltip>

  <panda-tooltip content="Your details are safe with us. " placement="top-end" :dark="true">
    <panda-button color="primary">Top End</panda-button>
  </panda-tooltip>
</div>

<div class="tooltip-placement">
  <panda-tooltip content="Your details are safe with us. " placement="left-start" :dark="true">
    <panda-button color="primary">Left Start</panda-button>
  </panda-tooltip>

  <panda-tooltip content="Your details are safe with us. " placement="left" :dark="true">
    <panda-button color="primary">Left</panda-button>
  </panda-tooltip>

  <panda-tooltip content="Your details are safe with us. " placement="left-end" :dark="true">
    <panda-button color="primary">Left End</panda-button>
  </panda-tooltip>
</div>

<div class="tooltip-placement">
  <panda-tooltip content="Your details are safe with us. " placement="right-start" :dark="true">
    <panda-button color="primary">Right Start</panda-button>
  </panda-tooltip>

  <panda-tooltip content="Your details are safe with us. " placement="right" :dark="true">
    <panda-button color="primary">Right</panda-button>
  </panda-tooltip>

  <panda-tooltip content="Your details are safe with us. " placement="right-end" :dark="true">
    <panda-button color="primary">Right End</panda-button>
  </panda-tooltip>
</div>

<div class="tooltip-placement">
  <panda-tooltip content="Your details are safe with us. " placement="bottom-start" :dark="true">
    <panda-button color="primary">Bottom Start</panda-button>
  </panda-tooltip>

  <panda-tooltip content="Your details are safe with us. " placement="bottom" :dark="true">
    <panda-button color="primary">Bottom</panda-button>
  </panda-tooltip>

  <panda-tooltip content="Your details are safe with us. " placement="bottom-end" :dark="true">
    <panda-button color="primary">Bottom End</panda-button>
  </panda-tooltip>
</div>
```

<style lang="less" scoped>
  .panda-tooltip {
    margin: 10px;
  }
  .tooltip-placement {
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