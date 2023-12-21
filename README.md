# Van Element

## WebComponents with VanJS

Simple function to create a VanJS web component.

## Usage

```bash
npm i vanjs-core
npm i vanjs-element
```

```javascript
import van from "vanjs-core";
import { define } from "vanjs-element";
const { button, div, slot } = van.tags;

define("custom-counter", () => {
  const counter = van.state(0);
  return div(
    slot(),
    " ",
    counter,
    " ",
    button({ onclick: () => ++counter.val }, "+"),
    button({ onclick: () => --counter.val }, "-")
  );
});
```

and usage in HTML

```html
<custom-counter>❤️</custom-counter>

<custom-counter>👌</custom-counter>
```

if you don't use a package manager, copy the files from dist. You can then either use it with module syntax:

```html
<script src="/vanjs-**version**.min.js"></script>
<script src="/vanjs-element.min.js"></script>
```

You can also use a UMD version:

```html
<script src="/vanjs-**version**.nomodule.min.js"></script>
<script src="/vanjs-element.nomodule.min.js"></script>
```

## Why would I use this

Hydration in VanJS is not convenient. This small function makes it trivial to have reusable van components. It also pairs very well with VanUI.

## Advanced

The `define` function takes an optional third parameter with two options:

### 1. `observed`: Create custom elements from VanJS

> The `observed` option takes an array of attributes. The component will re-render when those attributes change.

You can create a custom element inside VanJS with this syntax:

```javascript
const someComponent = van.tags["custom-counter"];
```

If it is a Van Element, it will then hydrate properly. `observed` attributes will be transformed into State objects and are reactive to attribute changes.

```javascript
define("custom-counter", ({ count }) => span(slot(), count), {
  observed: ["count"], // observed attribute
});

define("hello-world", () => {
  const count = van.state(0);
  return div(
    // every time the count attribute changes, the counter updates!
    van.tags["custom-counter"]({ count }, "Count: "),
    button({ onclick: () => ++count.val }, "+")
  );
});
```

> More reading: [attributeChangedCallback](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes) method.

### 2. Disable Shadow DOM

> To disable the shadow DOM, use the option `disableShadow`.

Custom elements can be used without the shadow DOM. This has a few implications:

- the element's structure will be exposed to the normal DOM, so styling will not be scoped
- it will not accept children nodes and doesn't support slots.

If you don't want style encapsulation or slots, this is a very good option 👌
