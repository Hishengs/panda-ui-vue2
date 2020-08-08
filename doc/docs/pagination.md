# Pagination 分页

分页是一种分解数据的控件

## 示例


```vue
<panda-pagination :total="1000" :current.sync="current1" @change="onChange"></panda-pagination>
```


## 尺寸大小


```vue
<panda-pagination size="small" :total="1000" :current.sync="current2"></panda-pagination>
```


## 逻辑示例
> 最多显示 7 个分页按钮，超出以 ... 分割展示，具体逻辑如下


```vue
<h4>总页数为 N，N 小于等于 7 时</h4>
<panda-pagination :total="70" :current.sync="current3"></panda-pagination>
<h4>N 大于 7 时</h4>
<panda-pagination :total="200" :current.sync="current4"></panda-pagination>
<h4>N 大于 7，当前页处于 [1, 5] 之间时</h4>
<panda-pagination :total="1000" :current.sync="current5"></panda-pagination>
<h4>N 大于 7，当前页 大于 5 且 小于等于 N-5</h4>
<panda-pagination :total="200" :current.sync="current6"></panda-pagination>
<h4>N 大于 7，当前页处于 (N-5, N] 之间时</h4>
<panda-pagination :total="1000" :current.sync="current7"></panda-pagination>
```



## Pagination Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| total | 总条目数 | Number | — | — |
| current | 当前页数, 支持 `.sync` 修饰符 | Number | — | — |
| page-size | 每页显示条目个数 | Number  | — | 10 |
| size | 尺寸 | Number | small | — |

<!-- | page-count | 页码按钮的数量，当总页数超过该值时会折叠 | Number | 大于等于 5 且小于等于 21 的奇数 | 7 | -->

## Pagination Events

| 名称 | 介绍 | 回调参数 |
|------|------|-------|
| change | 当前页更改时触发事件 | 页数 |

<script>
export default {
  data () {
    return {
      current1: 1,
      current2: 1,
      current3: 1,
      current4: 1,
      current5: 5,
      current6: 6,
      current7: 96,
    }
  },
  methods: {
    onChange (val) {
      console.log('>>> onChange', val);
    }
  }
}
</script>
