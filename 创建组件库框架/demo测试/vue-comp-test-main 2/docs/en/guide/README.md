---
sidebarDepth: 2
---

This component library is based on secondary development of `element-ui`. Just learn to use.

:tada: Supports importing on demand.

:100: Compatible with IE 12+. :fire::fire::fire:

## Install

::: warning
Don't try to download without uploading npm friends.
:::

```bash
npm install test-component -S
```

```bash
yarn add test-component -S
```

## use

```js
import testComp from 'test-component';
import 'test-component/lib/theme/index.css';

Vue.use(testComp);
```

### Import on demand

With the help of `babel-plugin-componet`, we can introduce only the required components to reduce the size of the project.

First, install the `babel-plugin-component`:

```bash
npm install babel-plugin-component -D
```

Added in `.babel.config.js`

```js
plugins: [
  [
    'component',
    {
      libraryName: 'test-component',
      styleLibrary: {
        name: 'theme',
        base: false
      }
    }
  ]
];
```

## UMD use

There is currently no mixed packaging, and direct import is not supported for the time being. Please [make the lib package after the clone project](https://github.com/ShuQingX/vue-comp-test/blob/main/package.json)

```js
"build:lib": "vue-cli-service build --target lib --dest lib --name test-comp-base packages/index.js"
```
