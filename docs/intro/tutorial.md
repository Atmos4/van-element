# Tutorial

Before starting, it is recommended that you take the [VanJS tutorial](https://vanjs.org/tutorial) 🙂

You can follow the tutorial with [this CodePen template](https://codepen.io/pen?template=WNmQwLw), or just read along if you prefer!

## First element

Let's build our first Van Element! It will just be a `span` with inline styles:

```js
define("hello-world", () =>
  span({ style: "color:red;font-size:20px" }, "Hello world!")
);
```

```html
My first Van Element: <hello-world></hello-world>
```

<fieldset>
<legend>Result</legend>
My first Van Element: <hello-world>Hello world</hello-world>
</fieldset>

## Slots

Because they are Web components, Van Elements can use the `slot` tag as a way to inject children HTML elements.

Let's add a `slot` to our Van Element:

```js
define("hello-world", () =>
  span({ style: "color:red;font-size:20px" }, slot())
);
```

```html
Cool discovery: <hello-world>the slot</hello-world>
```

<fieldset>
<legend>Result</legend>
Cool discovery: <hello-world>the slot</hello-world>
</fieldset>

## Attributes

It would be nice if we can change `color` and `font-size` from outside the Van Element, right?

Meet the first property provided by Van Element: `attr()`. It takes an attribute name and an optional default value and returns a VanJS `State` object.

```js
define("hello-world", ({ attr }) => {
  const color = attr(
    "color", // name of the attribute
    "red" // default value (optional)
  );
  const size = attr("size", 20);
  return span(
    { style: () => `color:${color.val};font-size:${size.val}` },
    slot()
  );
});
```

```html
<hello-world color="green" size="16px">I can be green </hello-world>
<hello-world color="orange" size="24px">or orange </hello-world>
<hello-world>or red by default</hello-world>
```

<fieldset>
<legend>Result</legend>
<hello-world color="green" size="16px">I can be green </hello-world>
<hello-world color="orange" size="24px">or orange </hello-world>
<hello-world>or default</hello-world>
</fieldset>

## Isolated styles

There is another way we can style our content instead of inline styles: by using `css` tagged template.

Our Van Element is isolated in the Shadow DOM, so whatever we write in that inner style won't leak out to the rest of the page!

<<< @/components.ts#isolatedStyles {javascript}

```html
The styles in the normal DOM
<hello-world color="green">or in other Van Elements </hello-world>
<hello-world>won't be affected!</hello-world>
```

<fieldset>
<legend>Result</legend>
The styles in the normal DOM
<hello-world color="green">or in other Van Elements </hello-world>
<hello-world>won't be affected!</hello-world>
</fieldset>

## Reactive Van Elements

This tutorial is way too static. Let's add a bit of reactivity.

Something nice about Van Elements is that you can reuse them... inside other Van Elements!

As an example, let's build a way to demonstrate next iterations of the tutorial:

<<< @/components.ts#tuto4 {javascript}

```html
<tutorial-wrapper>Color sample</tutorial-wrapper>
```

<fieldset>
<legend>Result</legend>
<tutorial-wrapper>Color sample</tutorial-wrapper>
</fieldset>

## Lifecycle

Since `em` is not very visual, it would be nice to get the computed `font-size` in pixels. We could use `window.getComputedStyle` for this! Let's try it:

<<< @/components.ts#tuto5

```html
<computed-size size="1.5em">1.5em</computed-size><br />
<computed-size size="1.2em" color="orange">1.2em</computed-size>
```

<fieldset>
<legend>Result</legend>
<computed-size size="1.5em">1.5em</computed-size><br />
<computed-size size="1.2em" color="orange">1.2em</computed-size>
</fieldset>

That doesn't seem to work 🤔 the reason is that slots only get populated _after_ the component has rendered.

For this, there is the `mount` hook: it registers a function that only runs when the component has mounted:

<<< @/components.ts#tuto5fixed

```html
<computed-size-fixed size="1.5em">1.5em</computed-size-fixed><br />
<computed-size-fixed size="1.2em" color="orange">1.2em</computed-size-fixed>
```

<fieldset>
<legend>Result</legend>
<computed-size-fixed size="1.5em">1.5em</computed-size-fixed><br />
<computed-size-fixed size="1.2em" color="orange">1.2em</computed-size-fixed>
</fieldset>

Now we get the proper font sizes!

## Self-reference

There is one last thing we would want to do: we want to make sure our Van Element is used properly!

Currently people can use anything in the slot: plain text, any HTML tags, even script tags 🤔 this might be intended for some components, but here we want to make sure that the only child of our Van Element is:

- plain text
- not white space

We can access the reference of the Van Element using `$this`

<<< @/components.ts#selfReference{2,3}

```html
<final-element color="orange" size="1.2em">Correct usage</final-element><br />
<final-element color="orange" size="1.2em"><p>Wrong usage</p></final-element>
```

<fieldset>
<legend>Result</legend>
<final-element color="orange" size="1.2em">Correct usage</final-element><br />
<final-element color="orange" size="1.2em"><p>Wrong usage</p></final-element>
</fieldset>

## That's it!

You have reached the end of the tutorial! Now you know basically everything there is to know about Van Elements. You can now freely explore the wonders of the Web Component world... or [disable the Shadow DOM](../learn/shadow-options) if you prefer!
