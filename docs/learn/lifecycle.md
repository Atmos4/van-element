# Lifecycle

Sometimes, you want to execute code only when a Van Element has mounted to the DOM. The most typical use case is when you try to access `assignedElements` from a slot:

<<< @/components.ts#mountExample

```html
<connect-example><p>I am in the slot</p></connect-example>
```

<fieldset>
    <legend>Result</legend>
    <connect-example><p>I am in the slot</p></connect-example>
</fieldset>

Here, the number of items in the slot is `0` :thinking: that is because slots will only get populated _after_ the Web Component has mounted. And that happens right after we have defined our Van Element...

## `mount`

Fortunately, we can define a `mount` callback:

<<< @/components.ts#mountShowcase

```html
<mount-showcase><p>I am in the slot</p></mount-showcase>
```

<fieldset>
    <legend>Result</legend>
    <mount-showcase><p>I am in the slot</p></mount-showcase>
</fieldset>

## `dismount`

The `mount` function can return another callback that triggers when the component is dismounted

```js
mount(() => {
  console.log("mounted");
  return () => console.log("dismounted");
});
```

This can be useful for unsubscribing to certain events, keeping tracks of mounted elements, etc.

::: tip Note

In most cases, you won't have to use `mount`. However, there are cases where you need it and it will then be very useful!

:::
