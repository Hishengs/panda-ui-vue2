<template>
  <div
    v-if="itemsNum"
    class="panda-announcement"
    :style="cStyle"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @click="onClick"
  >
    <div class="panda-announcement-main" :style="mainStyle">
      <Icon class="panda-announcement-warning-icon" name="alert-circle" size="20"></Icon>
      <span class="panda-announcement-count" v-if="itemsNum > 1">
        ({{ showCurIndex+1 }}/{{ itemsNum }})
      </span>
      <div class="panda-announcement-content">
        <p v-for="(item, i) in showItems" :key="i" class="panda-announcement-item" :class="{
          'panda-announcement-item-current': i === curIndex,
          'panda-announcement-item-next': isNext(i),
        }">
          {{ item.content }}
        </p>
      </div>
      <Icon class="panda-announcement-link-icon" name="chevron-right" size="20"></Icon>
    </div>
  </div>
</template>

<script>
  import Icon from '../icon';

  const TRANSITION_TIME = 3000;

  export default {
    name: 'panda-announcement',
    components: {
      Icon,
    },
    props: {
      items: {
        type: Array,
        default: () => []
      },
      maxContentWidth: {
        type: [String, Number],
        default: '100%',
      },
      /* hideArrow: {
        type: Boolean,
        default: false,
      }, */
      fixed: Boolean,
      offsetTop: {
        type: Number,
        default: 0,
      },
    },
    data () {
      return {
        curIndex: 0,
        autoplayTimer: null,
        hovering: false,
      };
    },
    computed: {
      cStyle () {
        return {
          position: this.fixed ? 'fixed' : '',
          top: this.fixed ? `${this.offsetTop}px` : '',
          left: this.fixed ? 0 : '',
          right: this.fixed ? 0 : '',
        };
      },
      mainStyle () {
        const maxWidth = typeof this.maxContentWidth === 'number'
          ? `${this.maxContentWidth}px`
          : this.maxContentWidth;
        return {
          maxWidth,
        };
      },
      itemsNum () {
        return this.items.length;
      },
      showItems () {
        return this.itemsNum === 2 ? [...this.items, ...this.items] : this.items;
      },
      showCurIndex () {
        if (this.itemsNum === 2 && this.curIndex >= 2) {
          return this.curIndex - 2;
        }
        return this.curIndex
      },
    },
    watch: {
      items (val) {
        if (val.length > 1) {
          this.startAutoplay();
        } else this.stopAutoplay();
      }
    },
    mounted () {
      this.startAutoplay();
    },
    beforeDestroy () {
      this.stopAutoplay();
    },
    methods: {
      startAutoplay () {
        if (this.itemsNum <= 1) return;
        // clear previous timer
        this.stopAutoplay();
        this.autoplay();
      },
      stopAutoplay () {
        if (this.autoplayTimer) {
          clearTimeout(this.autoplayTimer);
          this.autoplayTimer = null;
        }
      },
      autoplay () {
        this.autoplayTimer = setTimeout(() => {
          this.curIndex = this.getNextIndex();
          this.autoplay();
        }, TRANSITION_TIME);
      },
      getNextIndex () {
        const len = this.itemsNum;
        const max = len === 2 ? 3 : len - 1;
        let index = this.curIndex + 1;
        return index > max ? 0 : index;
      },
      onClick () {
        const item = this.items[this.curIndex];
        if (item && item.link) {
          window.open(item.link);
        }
      },
      isNext (i) {
        const len = this.showItems.length;
        return len > 1 && i === (this.curIndex + 1) % len;
      }
    },
  };
</script>
