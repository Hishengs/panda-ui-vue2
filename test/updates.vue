<template>
  <div id="Updates">
    <h2>更新日志</h2>
    <h4>已实现组件：20</h4>
    <div class="done">
      <Tag color="blue">Icon</Tag>
      <Tag color="blue">Button</Tag>
      <Tag color="blue">Badge</Tag>
      <Tag color="blue">Tag</Tag>
      <Tag color="blue">Input</Tag>
      <Tag color="blue">NumberInput</Tag>
      <Tag color="blue">Select</Tag>
      <Tag color="blue">Textarea</Tag>
      <Tag color="blue">Radio</Tag>
      <Tag color="blue">Checkbox</Tag>
      <Tag color="blue">Switch</Tag>
      <Tag color="blue">Slider</Tag>
      <Tag color="blue">TagInput</Tag>
      <Tag color="blue">Table</Tag>
      <Tag color="blue">Modal</Tag>
      <Tag color="blue">Drawer</Tag>
      <Tag color="blue">Notice</Tag>
      <Tag color="blue">Collapse</Tag>
      <Tag color="blue">Divider</Tag>
      <Tag color="blue">Message</Tag>
    </div>
    <h4>待实现组件：16</h4>
    <div class="todo">
      <Tag>Upload</Tag>
      <Tag>Cascader</Tag>
      <Tag>DatePicker</Tag>
      <Tag>TimePicker</Tag>
      <Tag>Progress</Tag>
      <Tag>Menu</Tag>
      <Tag>Dropdown</Tag>
      <Tag>Tabs</Tag>
      <Tag>Pagination</Tag>
      <Tag>Grid</Tag>
      <Tag>Panel</Tag>
      <Tag>Timeline</Tag>
      <Tag>Popover</Tag>
      <Tag>Tooltip</Tag>
      <Tag>Tree</Tag>
      <Tag>Form</Tag>
    </div>
  </div>
</template>

<script>
import Tag from '../src/components/tag';

export default {
  components: {
    Tag
  }
};
</script>

<style>
.done .panda-tag, .todo .panda-tag {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>