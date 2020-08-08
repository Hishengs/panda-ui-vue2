
# Input 输入框

## 基本输入框
```vue
<panda-input placeholder="基本输入框" v-model="val"></panda-input>
```

## 禁用输入框 disabled
```vue
<panda-input placeholder="禁用输入框" disabled></panda-input>
```

## 只读输入框 readonly
```vue
<panda-input placeholder="只读输入框 readonly" readonly></panda-input>
```

## 输入框尺寸 size
```vue
<p>small</p>
<panda-input placeholder="输入框尺寸 small" size="small"></panda-input>
<p>normal</p>
<panda-input placeholder="输入框尺寸 normal" size="normal"></panda-input>
<p>large</p>
<panda-input placeholder="输入框尺寸 large" size="large"></panda-input>
```

## 可清空 clearable
```vue
<panda-input placeholder="可清空" clearable></panda-input>
```

<script>
  export default {
    name: 'input-preview',
    data (){
      return {
        val: '',
      };
    },
  };
</script>