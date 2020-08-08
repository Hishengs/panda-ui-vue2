<template>
  <div class="klk-dropdown-menu">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class KlkDropdownMenu extends Vue {
  // name: string = 'klk-dropdown-menu';
}
</script>
