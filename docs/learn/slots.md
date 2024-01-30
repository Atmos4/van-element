# Slots

Slots are like children in VanJS, but for Web Components.

::: tip

You can also use the `children` property.

- When using Shadow DOM, it will be an `HTMLSlotElement`.
- With Shadow DOM disabled, it will be the custom element's `childNodes` and will behave the same way!

:::

::: code-group

<<< @/components.ts#slots {javascript} [slot]

```javascript [children]
define("slot-demo", ({ children }) => p("Hello ", children));
```

:::

```html
<slot-demo><strong>Robert</strong> and <i>Marie</i></slot-demo>
```

<fieldset>
    <legend>Result</legend>
    <slot-demo>
        <strong>Robert</strong> and <i>Marie</i>
    </slot-demo>
</fieldset>

Slots can have names, which allows you to customize many different places in the Van Element.

<<< @/components.ts#slotsNames {javascript}

```html
<slot-names>
  <span slot="title">The title</span>
  <p>The paragraph</p>
</slot-names>
```

<fieldset>
    <legend>Result</legend>
    <slot-names>
        <span slot="title">The title</span>
        <p>The paragraph</p>
    </slot-names>
</fieldset>

::: info Note

This feature is only available when using the Shadow DOM.

A polyfill could be built to support named slots without the Shadow DOM, if you are interested feel free to post an issue or submit a PR! 🫡

:::

You will find more examples in the [Examples](../examples) section.
