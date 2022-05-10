### Basic usage

Basic button usage.

<source-block>
  <template slot="comp">
    <press-row>
      <el-button>Default button</el-button>
      <el-button type="primary">primary button</el-button>
      <el-button type="success">Success button</el-button>
      <el-button type="info">Information button</el-button>
      <el-button type="warning">Warning button</el-button>
      <el-button type="danger">Dangerous button</el-button>
    </press-row>
    <press-row>
      <el-button plain>Plain button</el-button>
      <el-button type="primary" plain>Primary button</el-button>
      <el-button type="success" plain>Success button</el-button>
      <el-button type="info" plain>Information button</el-button>
      <el-button type="warning" plain>Warning button</el-button>
      <el-button type="danger" plain>Danger button</el-button>
    </press-row>
    <press-row>
      <el-button round>Round button</el-button>
      <el-button type="primary" round>Primary button</el-button>
      <el-button type="success" round>Success button</el-button>
      <el-button type="info" round>Information button</el-button>
      <el-button type="warning" round>Warning button</el-button>
      <el-button type="danger" round>Danger button</el-button>
    </press-row>
    <press-row>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </press-row>
  </template>

  <template slot="code">
  
Use the `type`, `plain`, `round` and `circle` properties to define the style of the Button.

```html
<el-row>
  <el-button>Default button</el-button>
  <el-button type="primary">primary button</el-button>
  <el-button type="success">Success button</el-button>
  <el-button type="info">Information button</el-button>
  <el-button type="warning">Warning button</el-button>
  <el-button type="danger">Dangerous button</el-button>
</el-row>

<el-row>
  <el-button plain>Plain button</el-button>
  <el-button type="primary" plain>Primary button</el-button>
  <el-button type="success" plain>Success button</el-button>
  <el-button type="info" plain>Information button</el-button>
  <el-button type="warning" plain>Warning button</el-button>
  <el-button type="danger" plain>Danger button</el-button>
</el-row>

<el-row>
  <el-button round>Round button</el-button>
  <el-button type="primary" round>Primary button</el-button>
  <el-button type="success" round>Success button</el-button>
  <el-button type="info" round>Information button</el-button>
  <el-button type="warning" round>Warning button</el-button>
  <el-button type="danger" round>Danger button</el-button>
</el-row>

<el-row>
  <el-button icon="el-icon-search" circle></el-button>
  <el-button type="primary" icon="el-icon-edit" circle></el-button>
  <el-button type="success" icon="el-icon-check" circle></el-button>
  <el-button type="info" icon="el-icon-message" circle></el-button>
  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
  <el-button type="danger" icon="el-icon-delete" circle></el-button>
</el-row>
```

  </template>
</source-block>

### Disabled state

The button is unavailable.

<source-block>
  <template slot="comp">
    <press-row>
      <el-button disabled>Default button</el-button>
      <el-button type="primary" disabled>Primary button</el-button>
      <el-button type="success" disabled>Success button</el-button>
      <el-button type="info" disabled>Information button</el-button>
      <el-button type="warning" disabled>Warning button</el-button>
      <el-button type="danger" disabled>Dangerous button</el-button>
    </press-row>
    <press-row>
      <el-button plain disabled>Plain button</el-button>
      <el-button type="primary" plain disabled>Primary button</el-button>
      <el-button type="success" plain disabled>Success button</el-button>
      <el-button type="info" plain disabled>Information button</el-button>
      <el-button type="warning" plain disabled>Warning button</el-button>
      <el-button type="danger" plain disabled>Dangerous button</el-button>
    </press-row>
  </template>

  <template slot="code">
  
You can use the `disabled` attribute to define whether the button is enabled, which accepts a `Boolean` value.

```html
<el-row>
  <el-button disabled>Default button</el-button>
  <el-button type="primary" disabled>Primary button</el-button>
  <el-button type="success" disabled>Success button</el-button>
  <el-button type="info" disabled>Information button</el-button>
  <el-button type="warning" disabled>Warning button</el-button>
  <el-button type="danger" disabled>Dangerous button</el-button>
</el-row>

<el-row>
  <el-button plain disabled>Plain button</el-button>
  <el-button type="primary" plain disabled>Primary button</el-button>
  <el-button type="success" plain disabled>Success button</el-button>
  <el-button type="info" plain disabled>Information button</el-button>
  <el-button type="warning" plain disabled>Warning button</el-button>
  <el-button type="danger" plain disabled>Dangerous button</el-button>
</el-row>
```

  </template>
</source-block>

### Text button

Buttons without borders and background colors.

<source-block>
  <template slot="comp">
    <el-button type="text">Text button</el-button>
    <el-button type="text" disabled>Text button</el-button>
  </template>

  <template slot="code">

```html
<el-button type="text">Text button</el-button>
<el-button type="text" disabled>Text button</el-button>
```

  </template>
</source-block>

### Icon button

Buttons with icons enhance legibility (with text) or save space (without text).

<source-block>
  <template slot="comp">
    <el-button type="primary" icon="el-icon-edit"></el-button>
    <el-button type="primary" icon="el-icon-share"></el-button>
    <el-button type="primary" icon="el-icon-delete"></el-button>
    <el-button type="primary" icon="el-icon-search">Search</el-button>
    <el-button type="primary">Upload<i class="el-icon-upload el-icon--right"></i></el-button>
  </template>

  <template slot="code">

You can set the `icon` property. For the list of icons, you can refer to the icon component of Element, or you can set the icon to the right of the text. Just use the `i` tag, and you can use a custom icon.

```html
<el-button type="primary" icon="el-icon-edit"></el-button>
<el-button type="primary" icon="el-icon-share"></el-button>
<el-button type="primary" icon="el-icon-delete"></el-button>
<el-button type="primary" icon="el-icon-search">Search</el-button>
<el-button type="primary">Upload<i class="el-icon-upload el-icon--right"></i></el-button>
```

  </template>
</source-block>

### Loading

After the button is clicked, the data loading operation is performed, and the loading status is displayed on the button.

<source-block>
  <template slot="comp">
    <el-button type="primary" :loading="true">Loading</el-button>
  </template>

  <template slot="code">

To set the loading state, just set the `loading` property to `true`.

```html
<el-button type="primary" :loading="true">Loading</el-button>
```

  </template>
</source-block>

### Different sizes

The Button component provides three sizes in addition to the default value, and you can choose the appropriate button size in different scenarios.

<source-block>
  <template slot="comp">
    <press-row>
      <el-button>Default button</el-button>
      <el-button size="medium">Medium button</el-button>
      <el-button size="small">Small button</el-button>
      <el-button size="mini">Extra small button</el-button>
    </press-row>
    <press-row>
      <el-button round>Default button</el-button>
      <el-button size="medium" round>Medium button</el-button>
      <el-button size="small" round>Small button</el-button>
      <el-button size="mini" round>Extra small button</el-button>
    </press-row>
  </template>

  <template slot="code">

Additional sizes: `medium`, `small`, `mini`, configure them by setting the `size` property.

```html
<el-row>
  <el-button>Default button</el-button>
  <el-button size="medium">Medium button</el-button>
  <el-button size="small">Small button</el-button>
  <el-button size="mini">Extra small button</el-button>
</el-row>
<el-row>
  <el-button round>Default button</el-button>
  <el-button size="medium" round>Medium button</el-button>
  <el-button size="small" round>Small button</el-button>
  <el-button size="mini" round>Extra small button</el-button>
</el-row>
```

  </template>
</source-block>

### Attributes

| parameter   | description                  | type    | optional value                                     | default value |
| ----------- | ---------------------------- | ------- | -------------------------------------------------- | ------------- |
| size        | size                         | string  | medium / small / mini                              | —             |
| type        | type                         | string  | primary / success / warning / danger / info / text | —             |
| plain       | whether the button is plain  | boolean | —                                                  | false         |
| round       | Whether to round the button  | boolean | —                                                  | false         |
| circle      | round button or not          | boolean | —                                                  | false         |
| loading     | Whether loading status       | boolean | —                                                  | false         |
| disabled    | Whether to disable the state | boolean | —                                                  | false         |
| icon        | Icon class name              | string  | —                                                  | —             |
| autofocus   | Whether to focus by default  | boolean | —                                                  | false         |
| native-type | native type attribute        | string  | button / submit / reset                            | button        |
