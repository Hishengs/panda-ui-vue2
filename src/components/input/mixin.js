// common mixin for input and number-input

export default {
  props: {
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'default',
      validator: type => {
        return ['default', 'primary', 'success', 'info', 'warning', 'danger', 'text'].includes(type);
      },
    },
    size: {
      type: String,
      default: 'normal',
      validator: size => {
        return ['mini', 'small', 'normal', 'large'].includes(size);
      },
    },
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    clearable: Boolean,
  },
  computed: {
    cClass (){
      return [
        this.size,
        this.disabled ? 'disabled' : '',
        this.readonly ? 'readonly' : '',
      ].filter(cls => cls !== '').join(' ');
    },
  },
};