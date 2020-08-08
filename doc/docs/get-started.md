# 起步

## 完整引入

```js
import Vue from 'vue';
import PandaUI from 'panda-design';
import 'panda-design/dist/panda-ui.css';
import App from './app.vue';

Vue.use(PandaUI);

new Vue({
  el: '#app',
  render (h) {
    return h(App);
  }
});

```

## 按需引入

借助 `babel-plugin-component`，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 `babel-plugin-component`：

```js
npm install babel-plugin-component -D
```

然后，将 `.babelrc` 修改为：

```js
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "panda-design"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import { Button, Select } from 'panda-design';
import App from './App.vue';

Vue.use(Button);
Vue.use(Select);

new Vue({
  el: '#app',
  render: h => h(App)
});
```