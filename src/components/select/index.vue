/* 
待实现功能：
1. 禁用
  1.1 个别子选项禁用
2. 多选
3. 可清空
4. 支持自定义模板
5. 分组显示选项
6. 可搜索
7. 远程搜索
*/

<template>
  <span class="panda-select" :class="cClass" ref="self">
    <span class="selector" @click="onSelectorClick" ref="selector">
      <span class="multi-container" v-if="isMulti">
        <!-- <span class="multi-container-item"></span> -->
        <span v-if="showLabel && showLabel.length">
          <span class="multi-container-item" v-for="(item, i) in showLabel" :key="i">
            {{ item }}
            <Icon name="x" class="clear-icon" @click.native="clear(i)"></Icon>
          </span>
        </span>
        <span class="placeholder" v-else>{{ placeholder }}</span>
      </span>
      <input type="text" :readonly="readonly" :value="showLabel" :placeholder="showLabel ? '' : placeholder" ref="input" @input="onInput" v-else>
      <span class="icon">
        <Icon :name="`chevron-${expand ? 'up' : 'down'}`" class="direction-icon"></Icon>
        <Icon name="x" v-if="showClear" class="clear-icon" @click.native="clear"></Icon>
      </span>
    </span>
    <ul class="options" v-show="expand" ref="options">
      <slot></slot>
    </ul>
  </span>
</template>

<script>
  import Icon from '../icon';

  export default {
    name: 'panda-select',
    components: {
      Icon
    },
    props: {
      name: String,
      value: {
        type: [Array, String, Number],
        default: null,
      },
      multiple: Boolean,
      disabled: Boolean,
      clearable: Boolean,
      searchable: Boolean,
      remote: Boolean,
      placeholder: String,
    },
    data () {
      return {
        expand: false,
        showLabel: '',
      };
    },
    computed: {
      cClass () {
        return [
          this.expand ? 'expand' : '',
          this.multiple ? 'multiple' : '',
          this.disabled ? 'disabled' : '',
          this.showClear ? 'clearable' : '',
          this.searchable ? 'searchable' : '',
          this.remote ? 'remote' : '',
        ].filter(cls => cls !== '').join(' ');
      },
      readonly () {
        return !this.searchable || (this.searchable && !this.expand);
      },
      showClear () {
        return this.clearable && this.showLabel;
      },
      // 是否是多选
      isMulti () {
        return this.multiple && Array.isArray(this.value);
      },
    },
    watch: {
      value () {
        this.updateOptions();
        if (this.isMulti) {
          this.$nextTick(this.resetOptionsTop);
        }
      },
    },
    mounted () {
      /* global document */
      document.addEventListener('click', this.onOuterClick);
      document.addEventListener('scroll', this.resetOptionsTop);
      this.updateOptions();
    },
    beforeDestroy () {
      document.removeEventListener('click', this.onOuterClick);
      document.removeEventListener('scroll', this.resetOptionsTop);
    },
    methods: {
      onOuterClick (e) {
        if (e.target !== this.$refs.self && !this.$refs.self.contains(e.target)) {
          this.expand = false;
        }
      },
      onSelectorClick (/* e */) {
        if (this.disabled) {
          return;
        }
        this.expand = !this.expand;
        if (this.searchable && this.expand) {
          this.$refs.input.focus();
          this.$refs.input.select();
        }
        console.log('>>> onSelectorClick', this.expand);
      },
      updateOptions () {
        if (this.$children && this.$children.length) {
          if (this.isMulti) {
            const labels = [];
            this.$children.forEach(child => {
              if (child.$options.name === 'panda-option') {
                if (child.value && this.value.includes(child.value)) {
                  labels.push(child.label || child.value);
                }
                child.onParentValueChange(this.value);
              }
            });
            this.showLabel = labels;
          } else {
            this.$children.forEach(child => {
              if (child.$options.name === 'panda-option') {
                if (child.value && child.value === this.value) {
                  this.showLabel = child.label || child.value;
                }
                child.onParentValueChange(this.value);
              }
            });
          }
        }
      },
      onOptionClick (value, label) {
        if (this.isMulti) {
          let newVal = [];
          if (this.value.includes(value)) {
            newVal = this.value.filter(item => item !== value);
          } else {
            newVal = this.value.concat(value);
          }
          this.$emit('input', newVal);
        } else {
          if (value === this.value) return;
          this.showLabel = label || value;
          this.$emit('input', value);
        }
      },
      clear (index) {
        if (this.isMulti) {
          this.$emit('input', this.value.filter((item, i) => i !== index));
        } else {
          this.$emit('input', null);
          this.showLabel = '';
        }
      },
      onInput (e) {
        const { value } = e.target;
        if (this.$children && this.$children.length) {
          this.$children.forEach(child => {
            if (child.$options.name === 'panda-option') {
              child.onParentSearch(value);
            }
          });
        }
      },
      resetOptionsTop () {
        if (!this.expand) return;
        /* const selectorHeight = parseInt(document.defaultView.getComputedStyle(this.$refs.selector).height, 10);
        const optionsHeight = parseInt(document.defaultView.getComputedStyle(this.$refs.options).height, 10);
        const rect = this.$refs.selector.getBoundingClientRect();
        const margin = 5;
        const { top, bottom } = rect;
        const outTop = top < selectorHeight + optionsHeight + margin;
        const outBottom = (bottom + optionsHeight + margin) > document.documentElement.clientHeight;
        if (outTop && this.$refs.options.style.bottom !== 'inherit') {
          this.$refs.options.style.bottom = 'inherit';
          this.$refs.options.style.top = `${(selectorHeight + margin)}px`;
        } else if (outBottom && this.$refs.options.style.top !== 'inherit') {
          this.$refs.options.style.top = 'inherit';
          this.$refs.options.style.bottom = `-${(selectorHeight + margin)}px`;
        }
        console.log('>>> resetOptionsTop', selectorHeight, optionsHeight, top, bottom, document.documentElement.clientHeight); */
      },
    },
  };
</script>
