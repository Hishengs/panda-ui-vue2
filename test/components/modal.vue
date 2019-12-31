<template>
  <div id="Modal">
    <h2>Modal 弹窗</h2>
    
    <h3>默认</h3>
    <Modal v-model="showModal" title="测试标题">人生，最重要的就是快乐嘛～</Modal>
    <Button @click="showModal=true" type="primary">显示 Modal</Button>

    <h3>closable</h3>
    <Modal v-model="showModal1" title="测试标题" :closable="false">人生，最重要的就是快乐嘛～</Modal>
    <Button @click="showModal1=true" type="primary">无关闭按钮，点击遮罩关闭</Button>

    <h3>mask-closable</h3>
    <Modal v-model="showModal2" title="测试标题" :mask-closable="false">人生，最重要的就是快乐嘛～</Modal>
    <Button @click="showModal2=true" type="primary">点击遮罩不可关闭</Button>

    <h3>自定义 footer</h3>
    <Modal v-model="showModal3" title="测试标题">
      人生，最重要的就是快乐嘛～
      <div slot="footer">
        <Button @click="showModal3=false" type="text" style="float: right;">取消</Button>
        <Button @click="showModal3=false" type="primary" style="float: right;">确定</Button>
        <div style="clear: both;"></div>
      </div>
    </Modal>
    <Button @click="showModal3=true" type="primary">自定义 footer</Button>

    <h4>Props</h4>
    <table>
      <tr>
        <th>名称</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
      <tr>
        <td>value</td>
        <td>通过 v-model 控制显示隐藏</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>closable</td>
        <td>是否可通过按钮关闭</td>
        <td>Boolean</td>
        <td>true</td>
      </tr>
      <tr>
        <td>mask-closable</td>
        <td>是否可通过点击遮罩层关闭</td>
        <td>Boolean</td>
        <td>true</td>
      </tr>
    </table>
  </div>
</template>

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