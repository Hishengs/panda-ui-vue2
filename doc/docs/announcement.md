# Announcement 公告

## 默认

```vue
<panda-announcement :items="items.slice(0, 1)"></panda-announcement>
```

## 多条轮播

```vue
<panda-announcement :items="items.slice(0, 2)"></panda-announcement>
<p></p>
<panda-announcement :items="items.slice(0, 3)"></panda-announcement>
<p></p>
<panda-announcement :items="items"></panda-announcement>
```

## 设置内容区域宽度

```vue
<panda-announcement :items="items" max-content-width="70%"></panda-announcement>
```

## 固定顶部

```vue
已固定到顶部

<panda-announcement :items="items" fixed :max-content-width="1000"></panda-announcement>
```

## 顶部偏移

```vue
已固定到顶部

<panda-announcement :items="items" fixed :max-content-width="1000" :offset-top="50"></panda-announcement>
```

## Announcement Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| items | 通知条目 | Array&lt;Item&gt; | — | — |
| max-content-width | 最大内容区域宽度 | String, Number | — | — |
| fixed | 是否固定在顶部 | Boolean | — | false |
| offset-top | fixed 时，距离顶部偏移 | Number | — | 0 |

<!-- | hide-arrow | 是否隐藏箭头 | Boolean | — | false | -->

```js
type Item {
  content: string; // 通知内容
  link: string;    // 通知跳转链接
}
```

<script>
  const content = 'This is the content of the notification';
  const content2 = 'This is the content of the notification, This is the content of the notification, This is the content of the notification, This is the content of the notification, This is the content of the notification';
  const link = 'https://www.sogo.com';

  export default {
    data () {
      return {
        items: [
          { content: content + '-1', link, },
          { content: content + '-2', link, },
          { content: content + '-3', link, },
          { content: content2, link, },
        ]
      };
    },
  };
</script>
