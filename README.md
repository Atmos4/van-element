# Van Element - WebComponents with VanJS

This package is a simple function to create a VanJS web component. [See it in action](https://codepen.io/atmos4/pen/ZEPEvvB)

## Usage

### 1. Package manager

npm (or yarn/pnpm/bun)

```bash
npm i vanjs-core
npm i vanjs-element
```

```javascript
// Javascript/Typescript file
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

In your HTML:

```html
<custom-counter>❤️</custom-counter>

<custom-counter>👌</custom-counter>
```

### 2. Script tag

if you don't use a package manager, you can import directly from a CDN or from your local files.

```html
<script src="https://cdn.jsdelivr.net/npm/vanjs-core@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/vanjs-element@latest"></script>
```

Then you can use `vanE.define` to define your Van Elements.

```html
<custom-counter>❤️</custom-counter>
<custom-counter>👌</custom-counter>

<script>
  const { button, div, slot } = van.tags;

  vanE.define("custom-counter", () => {
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
</script>
```

### 3. Import maps

Since 2023, [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) are widely supported. [See it live](https://codepen.io/atmos4/pen/MWxWPgm).

```html
<custom-counter>❤️</custom-counter>
<custom-counter>👌</custom-counter>

<script type="importmap">
  {
    "imports": {
      "vanjs-core": "https://esm.sh/vanjs-core",
      "vanjs-element": "https://esm.sh/vanjs-element"
    }
  }
</script>
<script type="module">
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
</script>
```

## Why use this

- automatic hydration of VanJS inside your HTML
- reusable components without extra boilerplate
- isolated styles and slots with Web components
- only 40 lines of code (600b min+gzip)

## Advanced

The `define` function takes an optional third parameter with two options:

- `observed` : `string[]`
- `shadow` : `boolean` (defaults to `true`).

Below are two use cases for those options.

### Van Element attributes and `observed`

_The `observed` option takes an array of attributes. The component will re-render when those attributes change._

A Van Element's attributes will be injected inside the VanJS functional component directly as State objects:

You can create a custom element in VanJS with this syntax:

```javascript
van.add(document.body, van.tags["my-text"]());
// adds <my-text></my-text> to the body
```

If that custom element is a Van Element, it will hydrate properly. `observed` attributes will be transformed into State objects and are reactive to attribute changes.

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

More reading: [attributeChangedCallback documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes)

### 2. Disable Shadow DOM

_To disable the shadow DOM, set the `shadow` option to `false`._

Custom elements can be used without the shadow DOM. This has a few implications:

- The nodes will be added to the normal DOM.
- Styling will not be scoped.
- it will not accept children nodes and doesn't support slots.

If you don't want style encapsulation or slots, this is a very good option 👌

```js
define("my-component", MyComponent, { shadow: false });
// This component will be rendered in the normal DOM
```

The above is _almost_ the same as writing the following VanJS code.

```javascript
for (const el of document.getElementsByTagName("my-component")) {
  van.add(el, MyComponent());
}
// If another my-component is added to the HTML after this code has run, it won't be hydrated
```

Using Van Elements will allow smooth hydration and reusability without extra boilerplate!
