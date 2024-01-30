# Hello and welcome 👋

Here you can learn about Van Elements in different ways:

- Read the following introduction for a brief summary.
- Take a more hands-on approach with [the tutorial](./tutorial)
- Browse [the examples](../examples) for concrete real-world applications
- Dive in [the API overview](../learn/overview) if you like to read 🤓

## What is a Van Element

A Van Element is a [VanJS](https://vanjs.org/) Web Component. You can create one with the `define` method:

<<< @/components.ts#getstarted {javascript}

Then this element can be used anywhere in HTML

```html
<custom-element></custom-element>
```

<fieldset>
    <legend>Result</legend>
    <custom-element></custom-element>
</fieldset>

## Why Van Element

[VanJS](https://vanjs.org/) is a fantastic ultra-lightweight option for building reactive UI. However, hydrating VanJS inside HTML can feel a bit awkward.

A Van Element leverages native custom elements to automatically hydrate HTML with VanJS reactivity. It retains all the [benefits from VanJS](https://vanjs.org/#why-vanjs) with a few extra ones:

### Reusability

Once defined, Van Elements can be added, removed and reused anywhere in your HTML with a simple custom tag.

### Portability

Van Elements are standard Web Components that can work with any framework or templating language. You can use them in backend templating or inside frontend libraries like React, Vue or Svelte.

### Isolation

Thanks to the Shadow DOM, Van Elements benefit from style encapsulation and won't conflict with existing styles or other Web Components.

### Control

Van Elements can access the [custom element lifecycle](../learn/lifecycle) and manipulate Shadow DOM utilities like [slots](../learn/slots) to make it easier to build interactive components.

## Web Components = 💩?

> But why would I ever use Web Components? They are so hard to work with, I hate the Shadow DOM.

The term `Web Components` is not a technical unity like React, but more of a concept regrouping two main APIs:

- `custom elements`, the central part of Van Elements that enables hydration and lifecycle callbacks.
- the `Shadow DOM`, a DOM and CSS isolation mechanism.

Because the Shadow DOM isolates styles from the outside, it is very hard to work with when integrating with CSS frameworks, existing design systems or tools like Tailwind.

Fortunately, **you can use Van Elements [without the Shadow DOM](../learn/shadow-options#disable-shadow-dom) and retain most of its benefits 🔥**
