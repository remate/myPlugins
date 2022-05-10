### Basic usage

Contains title, content and action.

<source-block>
  <template slot="comp">
    <card-demo1/>
  </template>

  <template slot="code">
  
The Card component includes `header` and `body` sections. The `header` section is required to be dispatched with an explicitly named slot, and is optional.

<<< @/docs/.vuepress/components/card/demo1.vue

  </template>
</source-block>

### Simple Card

Cards can only have content areas.

<source-block>
  <template slot="comp">
    <card-demo2/>
  </template>

  <template slot="code">

<<< @/docs/.vuepress/components/card/demo2.vue

  </template>
</source-block>

### with pictures

Configurable to define richer content display.

<source-block>
  <template slot="comp">
    <card-demo3 />
  </template>

  <template slot="code">

Configure the `body-style` property to customize the `style` of the `body` section, we also use the layout component.

<<< @/docs/.vuepress/components/card/demo3.vue

  </template>
</source-block>

### Card Shadow

The display of shadows can be configured.

<source-block>
  <template slot="comp">
    <card-demo4 />
  </template>

  <template slot="code">

Use the `shadow` property to set when the card shadow appears: `always`, `hover` or `never`.

<<< @/docs/.vuepress/components/card/demo4.vue

  </template>
</source-block>

### Attributes

| parameter  | description                                      | type   | optional value         | default value       |
| ---------- | ------------------------------------------------ | ------ | ---------------------- | ------------------- |
| header     | Set the header, or pass in DOM via `slot#header` | string | —                      | —                   |
| body-style | Set the style of the body                        | object | —                      | { padding: '20px' } |
| shadow     | Set shadow display timing                        | string | always / hover / never | always              |
