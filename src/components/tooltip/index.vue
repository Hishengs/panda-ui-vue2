<template>
  <Popover
    dark
    trigger="hover"
    :placement="placement"
    :content="content"
  >
    <slot></slot>
  </Popover>
</template>

<script>
  import Popover from '../popover';

  export default {
    name: 'panda-tooltip',
    components: {
      Popover,
    },
    props: {
      content: String,
      placement: {
        type: String,
        default: 'top',
        validator (val) {
          return [
            'top-start', 'top', 'top-end',
            'left-start', 'left', 'left-end',
            'right-start', 'right', 'right-end',
            'bottom-start', 'bottom', 'bottom-end'
          ].includes(val);
        },
      },
    }
  };
</script>