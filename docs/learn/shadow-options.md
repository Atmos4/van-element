# Options

Internally, Van Elements use `attachShadow` to attach a Shadow root to the element. You can change `attachShadow`'s options with an extra argument to the `define` function.

```js
define("my-element", () => p("Closed root, delegating focus 🎉"), {
  mode: "closed",
  delegatesFocus: true,
});
```

You can read more about [the Shadow root options on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#parameters).

## Disable Shadow DOM

Instead of the `options` object, you can pass `false` as third argument to disable the Shadow DOM completely.

```js
define(
  "van-element",
  () => p("I don't like isolation 🤗"),
  false // Passing false as 3rd argument will disable the Shadow DOM
);
```

Things that will **stop working**:

- DOM and style isolation
- slots

Everything else **will work the exact same**, including:

- `$this`, `mount` and `attr`
- all VanJS logic
- hydration and reusability

## Shadow DOM or not?

**You can safely disable the Shadow DOM if:**

- All you want is easy hydration
- Isolation gets in the way
- You don't need slots (attributes are enough)

**You _should not_ disable it if:**

- You are building isolated components (component library, design system)
- You need slots for more complex logic
