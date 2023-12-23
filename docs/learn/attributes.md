# Attributes

You can retrieve attributes with the provided `attr` method.

Example:

<<< @/components.ts#attributes {javascript}

```html
<attributes-demo name="Bob"></attributes-demo>
<attributes-demo name="Jimmy"></attributes-demo>
```

<fieldset>
    <legend>Result</legend>
    <attributes-demo name="Bob"></attributes-demo>
    <attributes-demo name="Jimmy"></attributes-demo>
</fieldset>

::: tip Note

This method is a wrapper around `van.val` and `van.state`. Because of this, you will need to use [state derivation](https://vanjs.org/tutorial#state-derived-prop) in places you want to be reactive.

```js
define("not-reactive", ({ attr }) => p(attr("name")));

define("very-reactive", ({ attr }) => p(() => attr("name")));
```

:::

## Attribute reactivity

First I'll let in on a little secret: you can create Van Elements from other Van Elements :tada:

```javascript
define("my-parent", () =>
  p(
    van.tags["my-element"]() // I am a custom element inside VanJS!  // [!code highlight]
  )
);
```

We can provide attributes to our previous `attributes-demo` just like we would a normal HTML tag. The `attr` method will make them reactive to changes.

<<< @/components.ts#observed {javascript}

```html
<observed-parent></observed-parent>
```

<fieldset>
    <legend>Result</legend>
    <observed-parent></observed-parent>
</fieldset>

::: tip Note

You can use `kebab-case-attributes` on HTML elements.

```js
const element = van.tags["some-element"]({ "data-text": "hello" });
```

Resulting HTML:

```html
<some-element data-text="hello"></some-element>
```

However you cannot use `camelCaseAttributes` :pleading_face: HTML won't be happy and will turn them into lowercase.

:::
