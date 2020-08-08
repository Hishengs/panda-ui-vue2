<template>
  <div :class="cClass" v-click-outside="onClickOutside">
    <Poptip
      v-model="showPoptip"
      :placement="placement"
      :trigger="trigger === 'contextmenu' ? 'none' : trigger"
      :arrow="arrow"
      :max-height="2048"
      :max-width="2048"
    >
      <div class="klk-dropdown-reference" ref="reference">
        <slot></slot>
      </div>
      <div class="klk-dropdown-list" slot="content" :style="listStyle">
        <slot name="list"></slot>
      </div>
    </Poptip>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Poptip from '../Poptip';
import clickOutside from '../../directives/click-outside.js';
import { parseWidth } from '../../utils';

@Component({
  components: {
    Poptip: Poptip as any,
  },
  directives: {
    clickOutside,
  },
})
export default class KlkDropdown extends Vue {
  @Prop()
  readonly value!: string;

  @Prop({
    default: false,
  })
  readonly checkable!: boolean;

  @Prop({
    default: true,
  })
  readonly arrow!: boolean;

  @Prop({
    default: 'bottom',
    validator (val) {
      return [
        'top-start', 'top', 'top-end',
        'bottom-start', 'bottom', 'bottom-end'
      ].includes(val);
    },
  })
  readonly placement!: string;

  @Prop({
    default: 'hover',
    validator (val) {
      // TODO: 右键触发暂不需要，隐藏
      return ['hover', 'click', 'none'/* , 'contextmenu' */].includes(val);
    },
  })
  readonly trigger!: string;

  @Prop({
    default: 320,
  })
  readonly maxWidth!: string | number;

  @Prop({
    default: 320,
  })
  readonly maxHeight!: string | number;

  @Prop({
    default: false,
  })
  readonly visible!: boolean;

  @Prop({
    default: false,
  })
  readonly hideDivider!: boolean;

  minWidth: number = 120;
  showPoptip: boolean | null = this.visible || null;
  selected: string | null = this.value || null;

  get cClass () {
    return {
      'klk-dropdown': true,
      'klk-dropdown-checkable': this.checkable,
      'klk-dropdown-hide-divider': this.hideDivider,
    };
  }

  get listStyle () {
    return {
      minWidth: parseWidth(this.minWidth),
      maxWidth: parseWidth(this.maxWidth),
      maxHeight: parseWidth(this.maxHeight),
    };
  }

  @Watch('value')
  onValueChange (val: string | null) {
    this.selected = val;
  }
  @Watch('selected')
  onSelectedChange (val: string | null) {
    this.$emit('input', val);
    this.$emit('change', val);
  }
  @Watch('visible')
  onVisibleChange (val: boolean) {
    this.showPoptip = val;
  }
  @Watch('showPoptip')
  onShowPoptipChange (val: boolean) {
    this.$emit('update:visible', val);
  }

  mounted () {
    const ref: Element = this.$refs.reference as Element;
    const width = ref.clientWidth;
    if (width >= this.minWidth) {
      this.minWidth = width;
    }
    if (this.trigger === 'contextmenu') {
      ref.addEventListener('contextmenu', this.onContextMenu);
    }
  }
  beforeDestroy () {
    if (this.trigger === 'contextmenu') {
      const ref: Element = this.$refs.reference as Element;
      ref.removeEventListener('contextmenu', this.onContextMenu);
    }
  }

  onContextMenu (e: Event) {
    e.preventDefault();
    this.showPoptip = true;
  }
  onClickOutside () {
    if (this.trigger === 'contextmenu') {
      this.showPoptip = false;
    }
  }
  onItemClick (item: typeof Vue) {
    if (item.name && this.checkable) {
      this.selected = item.name;
    }
    this.showPoptip = false;
    this.$emit('click', item.name);
  }
}
</script>
