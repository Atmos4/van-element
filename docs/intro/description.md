# What is Van Element

A Van Element is a VanJS Web Component. You can create one with the `define` method:

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

Each Van Element can be reused anywhere in your HTML. All you need is to define your element, and it will automatically hydrate in the page.

### Portability

Van Elements are standard Web Components. They can work with any framework or templating language. You can use them in backend framework templating as a way to add reactivity to your HTML or inside frontend libraries like React, Vue or Svelte to build independent components.

### Isolation

Thanks to the Shadow DOM, Van Elements benefit from style encapsulation and won't conflict with existing styles or other Web Components.

### Control

Van Elements can access the [custom element lifecycle](../learn/lifecycle) and manipulate Shadow DOM utilities like [slots](../learn/slots) to make it easier to build interactive components.
