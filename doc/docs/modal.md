# Modal 弹窗

## 默认
```vue
<template>
  <panda-modal v-model="showModal" title="测试标题">人生，最重要的就是快乐嘛～</panda-modal>
  <panda-button @click="showModal=true" type="primary">显示 panda-modal</panda-button>
</template>
```

## closable
```vue
<template>
  <panda-modal v-model="showModal1" title="测试标题" :closable="false">人生，最重要的就是快乐嘛～</panda-modal>
  <panda-button @click="showModal1=true" type="primary">无关闭按钮，点击遮罩关闭</panda-button>
</template>
```

## mask-closable
```vue
<template>
  <panda-modal v-model="showModal2" title="测试标题" :mask-closable="false">人生，最重要的就是快乐嘛～</panda-modal>
  <panda-button @click="showModal2=true" type="primary">点击遮罩不可关闭</panda-button>
</template>
```

## 自定义 footer
```vue
<template>
  <panda-modal v-model="showModal3" title="测试标题">
    人生，最重要的就是快乐嘛～
    <div slot="footer">
      <panda-button @click="showModal3=false" type="text" style="float: right;">取消</panda-button>
      <panda-button @click="showModal3=false" type="primary" style="float: right;">确定</panda-button>
      <div style="clear: both;"></div>
    </div>
  </panda-modal>
  <panda-button @click="showModal3=true" type="primary">自定义 footer</panda-button>
</template>
```

<script>
export default {
  data () {
    return {
      showModal: false,
      showModal1: false,
      showModal2: false,
      showModal3: false,
    };
  }
};
</script>