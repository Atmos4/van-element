# Van Element - WebComponents with VanJS

A simple function to create VanJS web components. [See it in action](https://codepen.io/atmos4/pen/ZEPEvvB).

## Documentation

https://van-element.pages.dev/.

## Usage

```javascript
import van from "vanjs-core";
import { define } from "vanjs-element";

const { button, div, slot } = van.tags;

define("custom-counter", () => {
  const counter = van.state(0);
  return div(
    slot(),
    counter,
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

## Why use this

- automatic hydration of VanJS inside your HTML
- reusable components without extra boilerplate
- isolated styles and slots with Web components
- only 40 lines of code (300b min+gzip)
