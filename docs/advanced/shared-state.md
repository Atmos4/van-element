# How to share state accross Van Elements

There are a few techniques we can use to share state across different Van Elements

## Global state

The simplest way to share state is to create a `van.state` object in the global scope, and share it between different Van Elements. You can even use [VanX.reactive](https://vanjs.org/x#reactive-object) to create a store.

Here is a simple example:

<<< @/components.ts#sharedState

Now this state can be modified in one place:

```html
<increment-state></increment-state>
```

<fieldset>
    <legend>Result</legend>
    <increment-state></increment-state>
</fieldset>

And displayed in a different place in the DOM!

```html
<display-state></display-state>
```

<fieldset>
    <legend>Result</legend>
    <display-state></display-state>
</fieldset>

One downside of this approach is that the state is truly global. Try to click on another item in the sidebar then back here: the counter shoud still display the same value.

Usually, it is not a big issue as global state is often suitable.

## Local state

In order to achieve local shared state, we have to implement a _context_, similar to React Context. The context will serve state to its children (provider), which can then read its value (consumers).

Fortunately, there is a context specification we can use to turn our Van Elements into context providers / consumers. Since it's a spec, it can even allow interaction with other contexts like Lit Context.

::: info Note
I have not worked extensively on this solution since I don't think it is as useful. All I have is this [very raw CodePen](https://codepen.io/atmos4/pen/NWJNVNz) and some draft code on my computer somewhere.

If this is of interest to you, feel free to create an issue and I will polish whatever code I have to turn it into a reusable package!
:::
