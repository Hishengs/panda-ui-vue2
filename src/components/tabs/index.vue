<template>
  <div class="panda-tabs">
    <div :class="headerClass" :style="headerStyle">
      <div ref="items" class="panda-tabs-items" :style="itemsStyle">
        <div
          v-for="(pane, i) in panes"
          :key="i"
          :class="getItemClass(pane)"
          :style="getItemStyle(pane)"
          @click="onTabClick(pane)"
        >
          <LabelRender :pane="pane">
            <Icon v-if="pane.icon" :name="pane.icon"></Icon>
            <span>{{ pane.label }}</span>
          </LabelRender>
        </div>
      </div>
      <div class="panda-tabs-control">
        <div :class="prevClass" @click="showPrev">
          <Icon name="chevron-left" size="18"></Icon>
        </div>
        <div :class="nextClass" @click="showNext">
          <Icon name="chevron-right" size="18"></Icon>
        </div>
      </div>
    </div>
    <div class="panda-tabs-body">
      <div class="panda-tabs-body-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../icon';
import { parseWidth } from '../../utils';

const LabelRender = {
  functional: true,
  props: {
    pane: Object,
  },
  render (h, ctx) {
    const { pane } = ctx.props;
    return pane.$slots.label
      ? pane.$slots.label
      : ctx.children;
  }
};

export default {
  name: 'panda-tabs',
  components: {
    Icon,
    LabelRender,
  },
  props: {
    value: String,
    backgroundColor: String,
    underline: Boolean,
  },
  data () {
    return {
      panes: [],
      curValue: this.value || 0,
      isOverflow: false,
      itemsTransformX: 0,
      itemsClientWidth: 0,
      itemsScrollWidth: 0,
    };
  },
  computed: {
    headerClass () {
      return {
        'panda-tabs-header': true,
        'panda-tabs-header-overflow': this.isOverflow,
      };
    },
    headerStyle () {
      return {
        backgroundColor: this.backgroundColor,
        borderBottom: this.underline ? '1px solid #eee' : '',
      };
    },
    itemsStyle () {
      return {
        transform: `translateX(${-this.itemsTransformX}px)`
      };
    },
    prevDisabled () {
      return this.itemsTransformX <= 0;
    },
    nextDisabled () {
      const { itemsScrollWidth, itemsClientWidth } = this;
      return this.itemsTransformX >= itemsScrollWidth - itemsClientWidth;
    },
    prevClass () {
      return {
        'panda-tabs-prev-btn': true,
        'panda-tabs-prev-btn-disabled': this.prevDisabled,
      };
    },
    nextClass () {
      return {
        'panda-tabs-next-btn': true,
        'panda-tabs-next-btn-disabled': this.nextDisabled,
      };
    },
  },
  watch: {
    value (val) {
      this.curValue = val;
      this.$nextTick(() => {
        const pane = this.panes.find(p => p.active);
        pane && this.scrollIntoView(pane);
      });
    },
    curValue (val) {
      this.$emit('input', val);
      this.$nextTick(() => {
        this.$emit('change', val);
      });
    },
  },
  mounted () {
    this.onUpdate();
    window.addEventListener('resize', this.onUpdate);
  },
  updated () {
    this.onUpdate();
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onUpdate);
  },
  methods: {
    onUpdate () {
      const { clientWidth, scrollWidth } = this.$refs.items;
      this.isOverflow = scrollWidth > clientWidth;
      this.itemsClientWidth = clientWidth;
      this.itemsScrollWidth = scrollWidth;
      this.updateItemIndex();
    },
    updateItemIndex () {
      for (let i=0, len=this.panes.length; i<len; i++) {
        this.panes[i].index = i;
      }
    },
    onPaneAdd (pane) {
      if (this.panes.includes(pane)) return;
      this.panes.push(pane);
    },
    onPaneRemove (pane) {
      const index = this.panes.indexOf(pane);
      if (index !== -1) this.panes.splice(index, 1);
    },
    onTabClick (pane) {
      this.$emit('tab-click', pane.name);
      if (pane.disabled || this.curValue === pane.name) return;
      this.curValue = pane.name || pane.index;
    },
    scrollIntoView (pane) {
      if (!pane || !this.$refs.items) return;
      const item = this.$refs.items.children[pane.index];
      if (!item) return;
      const { offsetLeft, offsetWidth } = item;
      const { offsetWidth: itemsOffsetWidth } = this.$refs.items;
      const { itemsTransformX } = this;
      const newOffsetLeft = (offsetLeft - itemsTransformX);
      const shouldLeftAlign = newOffsetLeft < 0;
      const shouldRightAlign = (newOffsetLeft + offsetWidth) > itemsOffsetWidth;
      if (shouldLeftAlign) {
        this.itemsTransformX = offsetLeft;
      } else if (shouldRightAlign) {
        const newItemsTransformX = offsetLeft + offsetWidth - itemsOffsetWidth;
        this.itemsTransformX = newItemsTransformX > 0 ? newItemsTransformX : 0;
      }
    },
    getItemClass (pane) {
      return {
        'panda-tabs-item': true,
        'panda-tabs-item-active': pane.active,
        'panda-tabs-item-disabled': pane.disabled,
        'panda-tabs-item-width-specified': pane.width && pane.width !== 'auto',
      };
    },
    getItemStyle (pane) {
      const { width, maxWidth } = pane;
      return {
        width: parseWidth(width),
        maxWidth: parseWidth(maxWidth),
      };
    },
    showPrev () {
      if (this.prevDisabled) return;
      let { itemsClientWidth, itemsTransformX } = this;
      itemsTransformX = itemsTransformX - itemsClientWidth;
      this.itemsTransformX = itemsTransformX >= 0 ? itemsTransformX : 0;
    },
    showNext () {
      if (this.nextDisabled) return;
      let { itemsClientWidth, itemsScrollWidth, itemsTransformX } = this;
      itemsTransformX = itemsTransformX + itemsClientWidth;
      const max = itemsScrollWidth - itemsClientWidth;
      this.itemsTransformX = itemsTransformX > max ? max : itemsTransformX;
      // console.log({ itemsClientWidth, itemsScrollWidth, itemsTransformX });
    },
  }
};
</script>
