# Examples

::: info

This page is under construction.

**Contributions are most welcomed! 🙂**

:::

This page will focus on showing more practical examples that reflect real world problems that can find a solution with Van Elements.

These examples were written with the following philosophy:

- most problems involving reactive UIs can be solved with VanJS
- custom elements are a good fit for hydrating reactive logic into the DOM

::: tip

Shadow DOM can be useful for isolating specific styles. Parts that need to be exposed can just live in the slots.

If it gets in the way, just disable it. It is not as big of a deal as you might think.

:::

## 1. Reusable confirmation modal

This example illustrates how to create a self-contained confirmation modal. It uses a few techniques:

- **slots** to populate a custom trigger
- a custom `submit` event that allows to intercept actions from outside the component
- Shadow DOM isolation

<confirmation-modal cancel="No" confirm="Yes" onsubmit="alert('Confirmed')">
  <button slot="trigger" style="margin:1rem;padding:.8rem;border:1px solid var(--vp-c-text-1)">Click to confirm</button>
  <h3 style="margin:0">Please confirm</h3>
  <p>Are you sure you want to do this?</p>
</confirmation-modal>

::: details Code
<<< @/components.ts#confirmationModal {javascript}
:::

```html
<confirmation-modal cancel="No" confirm="Yes" onsubmit="alert('Confirmed')">
  <button slot="trigger">Click to confirm</button>
  <h3>Confirmation</h3>
  <p>Are you sure you want to do this?</p>
</confirmation-modal>
```

Now, thanks to the power of custom element reusability, we can reuse that confirmation modal anywhere, with custom text and actions.

<confirmation-modal>
  <button slot="trigger" style="margin:1rem;padding:.8rem;border:1px solid var(--vp-c-text-1)">Open tip 💡</button>
  <b>Tip of the day</b>
  <p>Eat vegetables to stay healthy</p>
</confirmation-modal>

```html
<confirmation-modal>
  <button slot="trigger">Open tip 💡</button>
  <b>Tip of the day</b>
  <p>Eat vegetables to stay healthy</p>
</confirmation-modal>
```

## 2. Normal VanJS code

Van Element is just a way to hydrate VanJS. So you could simply take your VanJS code and bind it to a custom element tag, and Van Element will put it in the DOM for you!

As an example, let's shamefully take
