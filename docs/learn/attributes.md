# Attributes

You can retrieve attributes with the provided `attr` method. It takes an attribute name and an optional default value and returns a VanJS `State` object.

Example:

<<< @/components.ts#attributes {javascript}

```html
<attributes-demo name="Bob"></attributes-demo>
<attributes-demo name="Jimmy"></attributes-demo>
<!-- default value -->
<attributes-demo></attributes-demo>
```

<fieldset>
    <legend>Result</legend>
    <attributes-demo name="Bob"></attributes-demo>
    <attributes-demo name="Jimmy"></attributes-demo>
    <attributes-demo></attributes-demo>
</fieldset>

::: tip Note

This method is a wrapper around `van.state`. Because of this, you will need to use [state derivation](https://vanjs.org/tutorial#state-derived-prop) in places you want to be reactive.

```js
define("not-reactive", ({ attr }) => p(`Hello ${attr("name").val}`));

define("very-reactive", ({ attr }) => p(() => `Hello ${attr("name").val}`));
```

:::

## Attribute reactivity

The `State` obtained from `attr()` is reactive to attribute change. This is useful when nesting Van Elements inside other Van Elements 🤯

<<< @/components.ts#observed {javascript}

```html
<attribute-parent></attribute-parent>
```

<fieldset>
    <legend>Result</legend>
    <attribute-parent></attribute-parent>
</fieldset>

::: tip Note

You can use `kebab-case-attributes`.

```js
const element = van.tags["some-element"]({ "data-text": "hello" });
```

Resulting HTML:

```html
<some-element data-text="hello"></some-element>
```

However you cannot use `camelCaseAttributes` :pleading_face: it is not valid HTML syntax and will be turned into lowercase by the browser.

:::
