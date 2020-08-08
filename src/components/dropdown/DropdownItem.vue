<template>
  <div :class="cClass" @click="onClick">
    <span class="klk-dropdown-item-prepend" v-if="!!icon || !!$slots.prepend">
      <slot name="prepend">
        <Icon :type="icon" v-if="!!icon"></Icon>
      </slot>
    </span>
    <span class="klk-dropdown-item-text">
      <slot></slot>
    </span>
    <span class="klk-dropdown-item-append" v-if="!!$slots.append">
      <slot name="append"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Icon from '../Icon';
import { findComponentUpward } from '../../utils';

@Component({
  components: {
    Icon: Icon as any,
  },
})
export default class KlkDropdownItem extends Vue {

  @Prop()
  readonly name!: string;

  @Prop({
    default: false,
  })
  readonly disabled!: boolean;

  @Prop()
  readonly icon!: string;

  parent: any = findComponentUpward(this, 'KlkDropdown');

  get checked () {
    return this.name && this.parent.selected === this.name;
  }

  get cClass () {
    return {
      'klk-dropdown-item': true,
      'klk-dropdown-item-disabled': this.disabled,
      'klk-dropdown-item-checked': this.checked,
    };
  }

  onClick (): void {
    if (this.disabled) return;
    this.parent.onItemClick(this);
    // this.$emit('click', this.name);
  }
}
</script>
