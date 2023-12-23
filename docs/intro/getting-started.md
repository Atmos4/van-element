# Getting started

In order to use Van Elements, you will need:

- Some understanding of Web Components ([Web Components MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).)
- Basic knowledge of VanJS syntax ([VanJS docs](https://vanjs.org/))

## Install

### Package manager

::: code-group

```sh [npm]
$ npm add vanjs-core vanjs-element
```

```sh [pnpm]
$ pnpm add vanjs-core vanjs-element
```

```sh [yarn]
$ yarn add vanjs-core vanjs-element
```

```sh [bun]
$ bun add vanjs-core vanjs-element
```

:::

```ts
import van from "vanjs-core";
import { define } from "vanjs-element";
```

### Browser

Since Van Element doesn't require a build step, it can be loaded from a CDN or stored in a local file ([download on jsDelivr](https://cdn.jsdelivr.net/npm/vanjs-element@0.1.5/dist/)).

::: code-group

```html [CDN]
<script src="https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-latest.nomodule.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vanjs-element@latest/dist/van-element.browser.js"></script>
```

```html [Local files]
<script src="/path/to/vanjs"></script>
<script src="/path/to/van-element"></script>
```

```html [Import maps]
<!-- import maps are now baseline 🎉 -->
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

  ...
</script>
```

:::

When imported in the global scope, you can use the global object `vanE`.

```javascript
vanE.define(...);
```

::: warning Note:

Since it uses `window.customElements`, Van Element only works in the browser and should not be used during SSR. Refer to the documentation of your framework to prevent it from defining Van Elements on the server.

:::
