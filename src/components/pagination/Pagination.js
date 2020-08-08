import Icon from '../icon';

export default {
  name: 'panda-pagination',
  props: {
    total: {
      type: Number,
      default: 0,
      validator: (val) => val >= 0
    },
    current: {
      type: Number,
      default: 1,
      validator: (val) => val >= 1
    },
    pageCount: {
      type: Number,
      default: 7,
      validator (val) {
        return val >= 5 && val <= 21 && val % 2 !== 0;
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    raised: Boolean,
    circle: Boolean,
    size: {
      type: String,
      validator (val) {
        return ['small'].includes(val);
      }
    },
  },
  computed: {
    showPageCount () {
      return this.pageCount - 2;
    },
    totalPage () {
      return Math.ceil(this.total / this.pageSize);
    },
    items () {
      let arr = [];
      if (this.total === 0) return arr;
      if (this.totalPage <= 7) {
        for (let i = 1; i <= this.totalPage; i++) {
          arr.push({ text: i, value: i });
        }
        return arr;
      }
      const offset = 5;
      const first = { text: '1', value: 1 };
      const last = { text: `${this.totalPage}`, value: this.totalPage };
      // [1,5]
      if (this.current <= offset) {
        for (let i = 1; i <= 6; i++) {
          arr.push({ text: i, value: i });
        }
        arr.push({ text: '...', value: null });
        arr.push(last);
      } else if (this.current > offset && this.current <= this.totalPage - offset) {
        arr.push(first);
        arr.push({ text: '...', value: null });
        const left = this.current - 2;
        const right = this.current + 2;
        for (let i = left; i <= right; i++) {
          arr.push({ text: i, value: i });
        }
        arr.push({ text: '...', value: null });
        arr.push(last);
      } else if (this.current > this.totalPage - offset) {
        arr.push(first);
        arr.push({ text: '...', value: null });
        const left = this.totalPage - offset;
        const right = this.totalPage;
        for (let i = left; i <= right; i++) {
          arr.push({ text: i, value: i });
        }
      }
      return arr;
    },
    cClass () {
      return {
        'panda-pagination': true,
        [`panda-pagination-${this.size}`]: !!this.size,
      };
    }
  },
  methods: {
    changePage (page) {
      this.$emit('update:current', page);
      this.$emit('change', page);
    },
    createPrevBtn (h) {
      const disabled = this.current <= 1;
      return h('span', {
        staticClass: 'panda-pagination-prev-btn',
        class: {
          'panda-pagination-prev-btn-disabled': disabled,
        },
        on: {
          click: () => {
            if (!disabled) {
              this.changePage(this.current - 1)
            }
          }
        }
      }, [
        h(Icon, {
          props: {
            name: 'chevron-left',
          }
        }),
      ]);
    },
    creatNextBtn (h) {
      const disabled = this.current >= this.totalPage;
      return h('span', {
        staticClass: 'panda-pagination-next-btn',
        class: {
          'panda-pagination-next-btn-disabled': disabled,
        },
        on: {
          click: () => {
            if (!disabled) {
              this.changePage(this.current + 1);
            }
          }
        }
      }, [
        h(Icon, {
          props: {
            name: 'chevron-right',
          }
        }),
      ]);
    },
    createPageList (h) {
      return h('ul', {}, this.items.map(item => {
        const isEllipsis = item.text === '...';
        const btn = h('span', {
          staticClass: 'panda-pagination-item',
          class: {
            'panda-pagination-item-current': this.current === item.value,
            'panda-pagination-item-ellipsis': isEllipsis,
          },
          props: {
            type: 'ghost',
          },
          on: {
            click: () => {
              if (item.value === null) return;
              this.changePage(item.value);
            }
          }
        }, [
          isEllipsis
            ? h(Icon, {
              props: {
                name: 'more-horizontal',
              }
            })
            : item.text
        ]);
        return h('li', {}, [btn]);
      }));
    }
  },
  render (h) {
    return this.totalPage > 1 ? h('div', {
      class: this.cClass
    }, [
      this.createPrevBtn(h),
      this.createPageList(h),
      this.creatNextBtn(h)
    ]) : null;
  }
};
