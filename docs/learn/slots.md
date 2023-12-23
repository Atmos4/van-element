# Slots

Slots are like children in VanJS, but for Web Components.

<<< @/components.ts#slots {javascript}

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

You will find more examples in the [Examples](../examples) section.
