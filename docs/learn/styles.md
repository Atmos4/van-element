# Styles

There are several ways to style a Van Element

## Inline styles

The simplest way to style Van Elements is inline styles

<<< @/components.ts#inlineStyles

```html
<inline-styles></inline-styles>
```

<fieldset>
<legend>Result</legend>
<inline-styles></inline-styles>
</fieldset>

Inline styles are often frowned upon for good reasons. However, in an isolated environment like the Shadow DOM, they can work really well if complex styling is not needed.

## `style` tag

If you want more complex styling, using a `style` tag is a very good option. The reason it works is because the Shadow DOM will isolate these styles from the rest of the DOM so it won't leak out!

::: tip

You can use the CSS selector `::slotted` to apply specific styles to the slotted element.

:::

<<< @/components.ts#styleTag

```html
<style-tag><p>Paragraph in the slot</p></style-tag>
<p>Paragraph in normal DOM</p>
```

<fieldset>
<legend>Result</legend>
<style-tag><p>Paragraph in the slot</p></style-tag>
<p>Paragraph in normal DOM</p>
</fieldset>

## Adopted stylesheets

The third method revolves around creating a `CSSStyleSheet` and add it to the Shadow Root.

<<< @/components.ts#adoptedStyle

```html
<adopted-style>Adopted styles!</adopted-style>
```

<fieldset>
<legend>Result</legend>
<adopted-style>Adopted styles!</adopted-style>
</fieldset>

::: warning

This method currently lacks testing and support. It is also a bit more awkward to use, so the `style` tag method is preferred.

However it has benefits, the major one being that you can _merge two style sheets_ without conflicts or _share them between components_.

If you would like more support for this, feel free to create an issue or even to contribute 🙂

:::
