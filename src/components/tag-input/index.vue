<template>
  <div class="tag-input-wrapper">
    <div class="tag-input">
      <span class="tag" :style="tagStyle" v-for="(tag,i) in value" :key="i">
        {{ tag }} 
        <Icon name="x" @click="removeTag(tag)"></Icon>
      </span>
      <input type="text" v-model="editTag" @keyup.enter="addTag(editTag)" autofocus="autofocus" placeholder="输入标签">
    </div>
    <div class="recommend-tags" v-if="recommendTags && recommendTags.length">
      <span>推荐：</span><span class="tag triangle" :style="tagStyle" v-for="(tag,i) in recommendTags" :key="i" @click="addTag(tag)">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
  import Icon from '../icon';

  export default {
    name: 'panda-tag-input',
    components: {
      Icon,
    },
    props: {
      value: {
        type: Array,
        default: () => [],
      },
      recommendTags: {
        type: Array,
        default: () => [],
      },
      tagStyle: Object,
    },
    data (){
      return {
        // tags: ['大宝剑', '马杀鸡'],
        editTag: '',
      };
    },
    methods: {
      addTag (newTag){
        newTag = newTag.trim();
        if(!this.value.includes(newTag)){
          this.$emit('input', this.value.concat([newTag]));
          this.editTag = '';
        }
      },
      removeTag (removedTag){
        this.$emit('input', this.value.filter(tag => {
          return tag !== removedTag;
        }));
      },
    },
  };
</script>

