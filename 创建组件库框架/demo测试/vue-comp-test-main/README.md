### 前提

开始之前请先 clone [`element-ui`](https://github.com/ElemeFE/element)，并自行使用 Vuecli 创建一个项目。

示例：
```bash
git clone https://github.com/ElemeFE/element.git

vue create vue-cmop-base
```

### 改造项目目录

1，去除脚手架叫原有的 `src` 下 `assets` `components` ，新增 `src` 平级的 `packages` 目录

2，复制 `element-ui` 中 `button` ，`card` 组件（`element-ui` 包文件位置 `packages/`）；以及配套的样式，在 `packages` 中新增 `theme` 文件夹用于存放样式；

3，尽量保持样式层级不变，只复制有用到的样式（`element-ui` 样式文件位置 `pockages/theme-chalk/src/`） ；目前用到的样式包括

- `common/var.scss`；

- `fonts` 目录下所有文件；

- `mixins` 目录下所有文件；

- `theme-chalk/button.scss`，`theme-chalk/card.scss`，`theme-chalk/icon.scss`，`theme-chalk/index.scss`

完成之后大概是下面这样子。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d335057864f44f04b51c7ecfd06fd8b5~tplv-k3u1fbpfcp-watermark.image?)

4，`packages` 中新增 `index.js` 作为所有组件的统一出口；

```javascript
import Button from './button';
import Card from './card';

const components = [Button, Card];

const install = function (Vue) {
  // 批量注册
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

// 注入 Vue
if (typeof window.Vue !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出 install Vue.use() 前提必须实现 install 方法；
  install,
  // 组件导出
  Button,
  Card
};
```

### 测试组件是否可用

- `src/main.js` 中新增注册组件相关代码；

```javascript
// ... ...
import testComp from '../packages';
import '../packages/theme/index.scss';

Vue.use(testComp);
// ... ...
```

- `src/App.vue` 使用组件测试；此时启动服务，肯定会出现报错；解决方案在下一节；[依赖安装](#依赖安装)

```html
<template>
  <!--引入组件 -->
  <el-button size="mini" type="primary">test-btn</el-button>
</template>
<!-- ... ... -->
```

### <a id="依赖安装">依赖安装</a>

vuecli 创建的项目，默认是不能解析 `scss` 文件的，所以需要下载对应的依赖；

直接安装 `sass-loader` 可能会出现以下错误 `Syntax Error: TypeError: this.getOptions is not a function`；这是由于 `sass-loader` 版本过高导致的问题；

```bash
# 安装大版本为7的最新版本
npm intall sass-loader@7 -D
```

然后会再次出现错误 `Syntax Error: Error: Cannot find module 'node-sass'`；此时 如果你直接安装 `npm install node-sass -D` 会出现以下错误；`Syntax Error: Error: Node Sass version 7.0.1 is incompatible with ^4.0.0.`；根据提示我们需要安装 4 版本的 `node-sass`；

```bash
# 安装大版本为4的最新版本
npm install node-sass@4 -D
```

安装完成后重新运行项目会发现又出现一个问题 `Syntax Error: $--group-option-flex: 0 0 math.div(1, 5) * 100% !default;`；
此问题的出现方式主要 `node-sass` 中不支持 `math` [相关语法](https://sass-lang.com/documentation/modules/math)，而 `element-ui` 中使用的是 `sass` 从而不会出现此类问题；当然这也不是此次研究的重点；
解决方案：

- 直接删除这一行代码，因为本示例中没有用到相关样式；`theme/common/var.scss` 中 搜索 `$--group-option-flex` 关键字进行注释；

- 安装 `sass` 解决此问题；`npm install sass -D` ；当然我选择了后者

### 来吧展示！ showtime

![showTime.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36bc7d94c9114852a143740dcd44a0d9~tplv-k3u1fbpfcp-watermark.image?)

至此我们的组件库算是已经实现一半了；再来回头看整个项目；发现会有一些不合理的地方；

- 为什么 `src` 要做为项目的演示目录；其实使用 `examples` 更合理；安排 ~~~

```javascript
// vue.config.js
const path = require('path');

module.exports = {
  // 修改入口 同时 src 目录改名为 examples
  configureWebpack: {
    entry: path.join(__dirname, 'examples/main.js')
  }
};
```

### 项目打包

组件库已经完成，终归还是要打包供别人使用；Vuecli 中提供了一种库模式打包，当然我们也可以自己定义打包方式。

#### 库模式打包

[构建目标](https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%94%E7%94%A8) 首先在 `package.json` 中 `scripts` 中新增一条命令；

`npm run build:lib: "vue-cli-service build --target lib --dest lib --name test-comp-base packages/index.js"`

`vue-cli-service build` 详解：

```
用法：vue-cli-service build [options] [entry|pattern]

选项：

  --mode        指定环境模式 (默认值：production)
  --dest        指定输出目录 (默认值：dist)
  --modern      面向现代浏览器带自动回退地构建应用
  --target      app | lib | wc | wc-async (默认值：app)
  --name        库或 Web Components 模式下的名字 (默认值：package.json 中的 "name" 字段或入口文件名)
  --no-clean    在构建项目之前不清除目标目录
  --report      生成 report.html 以帮助分析包内容
  --report-json 生成 report.json 以帮助分析包内容
  --watch       监听文件变化
```

执行完以上命令，不出意外项目中会出现 `lib` 文件夹；这个就是我们组件库的源码了；

![build.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77ce3f667c044fc5b3190c6df31c9313~tplv-k3u1fbpfcp-watermark.image?)

此时问题出现了；我们发现打包后的代码没有包含我们想要的 `css` 也就是说样式丢了？[库打包](https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93) 。
**其实他是会生成 `css` 文件的；只是这个 `css` 在我们的工程中没有引入**

> 我不确定这个是不是 VueCli 官方认定的最佳实践。还是我得理解有问题；就目前我的理解此种方式打包应该是不能实现 按需引入 组件功能；不过既然支线任务出来了还是要做的。

- 在 `packages/index.js` 中导入 `theme/index.scss` 文件。

- 再次执行打包，可以看出这里打包之后的包就已经包含了 `css` 文件。之后可以走 [托管到 npm](#托管到npm) 流程

![build1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b5a5da11ebf47a69d1b65c1225f2f47~tplv-k3u1fbpfcp-watermark.image?)

- 在 新的 Vue 项目 安装组件并且在 `src/main.js` 中注册组件和 `src/App.vue` 中使用组件；

```javascript
// src/main.js
import testComp from 'test-comp-base';
import 'test-comp-base/lib/test-comp-base.css';

Vue.use(testComp);
// ... ...

// src/App.vue
<template>
  <el-button size="mini" type="primary">
    test-btn
  </el-button>
</template>;
```

#### vue.config.js 构建打包

此种打包方式总的来说就是 规定多个入口逐个打包，最后生成不同的文件方便我们使用 babel 对其做按需加载；

1，根目录新建 components.json 文件：作为 打包的入口配置。

```json
// 后续每次的新增都需要再次配置。
{
  "button": "./packages/button/index.js",
  "card": "./packages/card/index.js",
  "index": "./packages/index.js" // 主文件
}
```

2，删除之前 `vue.config.js` 中所有代码，新增以下代码；（不用删除也可，后续可以根据环境判断使用什么配置，我是图个方便。）

```javascript
const path = require('path');
const components = require('./components.json');

// 获取每个组件的绝对路径
const getComponentEntries = () => {
  const entryKeys = Object.keys(components);

  entryKeys.forEach(key => {
    components[key] = path.join(__dirname, components[key]);
  });

  return components;
};

// { button: '/Users/xxx/packages/button/index.js' }
const componentEntries = getComponentEntries();

module.exports = {
  outputDir: path.join(__dirname, 'lib'),
  configureWebpack: {
    entry: componentEntries,
    output: {
      //  文件名称
      filename: '[name].js',
      //  构建依赖类型
      libraryTarget: 'umd',
      //  库中被导出的项
      libraryExport: 'default',
      //  引用时的依赖名
      library: 'testComp'
    }
  },
  css: {
    // 独立构建 css
    extract: {
      filename: 'theme/[name].css' //在lib文件夹中建立 theme 文件夹中，生成对应的css文件。
    }
  },
  /**
   * 删除splitChunks，因为每个组件是独立打包，不需要抽离每个组件的公共js出来。
   * 删除copy，不要复制public文件夹内容到lib文件夹中。
   * 删除html，只打包组件，不生成html页面。
   * 删除preload以及prefetch，因为不生成html页面，所以这两个也没用。
   * 删除hmr，删除热更新。
   * 删除自动加上的入口App。
   */
  chainWebpack: config => {
    config.optimization.delete('splitChunks');
    config.plugins.delete('copy');
    config.plugins.delete('html');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.plugins.delete('hmr');
    config.entryPoints.delete('app');
  }
};
```

3，然后直接执行我们原有的 `npm run build`。不出意外可能只有一个 `index.css` 文件。

![build2.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70832df3baae47b3b3ed85d111a3744b~tplv-k3u1fbpfcp-watermark.image?)

出现这个问题的原因很简单：之前我们引入了 `index.scss` 文件中；现在已经修改成多入口了，我们需要在每个文件中再做一次引入即可。

解决方案：

- 每个组件在导入一次文件；

```html
<!-- packages/button/src/button.vue -->
<style lang="scss" src="../../theme/button.scss"></style>
```

- css 文件单独打包；参考 `element-ui` 使用 `gulp` 再分开打包

![element-ui.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/245b0a71bb73490a9b421a02253f124b~tplv-k3u1fbpfcp-watermark.image?)

4，如果你完成以上操作之后，再次进行打包出现类似于下面这种文件结构；恭喜你可以进入下一步 [托管到 npm](#托管到npm)，随后我们可以在另一个项目研究按需加载了；

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35174abf376d48d8951d19517adf6032~tplv-k3u1fbpfcp-watermark.image?)

### `babel-plugin-component` 按需引入

总体来说目前主流的组件库按需引入主要 根据 [`babel-plugin-import`](https://www.npmjs.com/package/babel-plugin-import) [`babel-plugin-component`](https://www.npmjs.com/package/babel-plugin-component) 去完成的，下面的示例将会根据目前社区比较火的 `element-ui` `Vant` ，前者只用的是 `babel-plugin-component` 后者则是 `babel-plugin-import` 。

由于咱们的组件库基本仿造 `element-ui` 打包后结构；所以咱们也会使用。`babel-plugin-component`。

1，在新项目中安装插件，并且下载 `babel-plugin-component`。

```bash
npm install test-comp-base
npm install babel-plugin-component
```

2，参考 `element-ui` 中的使用方式。**注意：** 我打包的样式目录是 `theme` 不是 `theme-chalk` 需要修改一下。`libraryName` 则是库名 例如：`test-comp-base`

![babel.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14ba345c510349a38c1b8d6d55ef6755~tplv-k3u1fbpfcp-watermark.image?)

3，新项目的 `src/main.js` 中按需引入组件。

```javascript
// ... ...
import { Button as ElButton } from 'test-comp-base';
import { Card as ElCard } from 'test-comp-base';

Vue.use(ElButton);
Vue.use(ElCard);
```

4，新项目的 `src/App.vue` 中写入测试代码

```html
<el-card>
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button type="primary" size="mini">test-btn</el-button>
  </div>
  <div v-for="o in 4" :key="o">
    {{ '列表内容 ' + o }}
  </div>
</el-card>
```

5，重新启动项目查看结果（非 src 下的文件修改后尽量都重启一下服务）。启动服务后大家可能会遇到一个错误。

![babel2.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3733c9ef5904e728861d984681b6808~tplv-k3u1fbpfcp-watermark.image?)

问题原因：它会默认去查找一个 `base.css` 的文件，为什么 `element-ui` 没问题。（因为人家有这个文件）。

解决方案：这个默认配置项是可以被更改的。我们修改一下配置文件即可。

```javascript
plugins: [
  [
    'component',
    {
      libraryName: 'test-comp-base',
      // 不让他去查找 base
      styleLibrary: {
        name: 'theme',
        base: false
      }
    }
  ]
]
```

#### 为什么不是 `babel-plugin-import`

如果你去他们的官网看下就明白大概了，不过我还是演示一下水一水经验吧。

首先我们把之前已经改好的 `babel.config.js` 中关于 `babel-plugin-component` 中的 `styleLibrary` 中的 `name` 选项还改成 `theme-chalk` 再次重新启动服务。

我们可以通过 在 `node_modules` 中查看这个包结构以及 `console` 中的错误信息结合着看着端倪。 **仔细看图**

![babel3.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4044d5f1e1a412f9869ef1c35c3ce31~tplv-k3u1fbpfcp-watermark.image?)

其实当我们配置好 `babel` 之后，在运行的时候语法会经历以下的转换。

```javascript
import { Button } from 'test-comp-base'

// babel-transform

var button = require('test-comp-base/lib/button')
// 当然这个 theme/ 是看你的 babel 如何配置。
require('test-comp-base/lib/theme/button.css')
```

问题结束，我们在新项目中安装一个 `vant` 来看下 `babel-plugin-import` 是如何查找文件的。

```bash
npm install vant
npm install babel-plugin-import -D
```

![babel4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/615c56cadd514eeea39f0772c4c7ad61~tplv-k3u1fbpfcp-watermark.image?)

此时我们让他故意出点错误。比如把配置中的 `libraryDirectory` 更改为 `xxx`。再次运行项目。 **仔细看图**

![babel5.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6fbff85d666e4bfca597fea76293f608~tplv-k3u1fbpfcp-watermark.image?)

可以看出本来是要在 `es` 里面查找对应的组件中的 `style`，当我们把 `es` 修改之后就找不到了。而且还有一个需要注意的点，**他只是找到 `style` 这层目录，并不是某一个 `.css` 文件**。

这就比较重要了。众所周知如果只导入到目录结构，会默认导入该目录下的 `index.js` so 他的样式引用就放到了 `style/index.js` 中。

按照我们上面的推断，当你配置好 `babel` 时，在运行的时候语法会经历以下的转换。

```javascript
import { Button } from 'vant'

// transform

// 可以看出省略了 index.js 
var _button = require('vant/lib/es/button');
require('vant/lib/es/button/style');
```

**总结：** 并不是你想用哪个就用哪个，提前设计好打包结构，根据需要合适才是最重要的。

### <a id="托管到npm">托管到 npm</a>

关于 npm 发布后续会考虑再开一篇说；这里就不细究了；请按照以下步骤操作：

1， `package.json` 内容补充，以下内容 在 Cli 创建的项目中会有部分缺失；自行补齐。

- `private`： 选项改为 false；当 `private` 为 true 时，是不允许发布到 npm 的。

- `name`： 选项就是你当前应用的名称；换句话说就是库名称。

- `version`： 原则上每次发布版本，版本号都应该是递增的。

- `main`：项目入口文件。例如：`./lib/test-comp-base.umd.min.js`

- `author`： 作者名称。

- `license`：使用哪种开源协议。

2， 新增 `.npmignore` 文件；过滤不需要上传的文件；文件内容规则参考 `.gitignore` 。

3， 注册 npm 账号 -> 登录 npm 账号 -> 发布 npm 包 [参考](https://segmentfault.com/a/1190000015939001)。

![npm.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e93ccf5808b74cd9b359eff1fcf87701~tplv-k3u1fbpfcp-watermark.image?)

4， 使用 cli 新建项目；下载并且下载咱们自己的组件库进行测试。

```bash
vue create comp-demo
npm install test-comp-base
```
