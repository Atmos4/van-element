import van, { type State } from "vanjs-core";
import { define } from "../src/van-element";

const { button, dialog, div, h2, i, input, p, pre, slot, span, style } =
  van.tags;

// Tutorial

// #region isolatedStyles
define("hello-world", ({ attr }) => {
  const color = attr("color", "red");
  const size = attr("size", "20px");
  return [
    // Styles won't leak out! // [!code highlight:2]
    style(() => `*{color:${color.val};font-size:${size.val}}`),
    span(slot()),
  ];
});
// #endregion isolatedStyles

// #region tuto4
const RangePicker = (min: number, max: number, value: State<number>) =>
  input({
    type: "range",
    min,
    max,
    value,
    oninput: (e) => (value.val = e.target.value),
  });

define("tutorial-wrapper", () => {
  const color = van.state(0);
  const size = van.state(20);
  return div(
    div("Hue: ", RangePicker(0, 360, color), () => ` ${color.val}deg`),
    div("Size: ", RangePicker(20, 40, size), () => ` ${size.val / 20}em`),
    p(
      van.tags["hello-world"](
        {
          color: () => `hsl(${color.val} 100% 50%)`,
          size: () => `${size.val / 20}em`,
        },
        slot()
      )
    )
  );
});
// #endregion tuto4

// #region tuto5
define("computed-size", ({ attr }) => {
  const color = attr("color", "red");
  const size = attr("size", "20px");
  const dom = slot();
  return [
    style(
      () => `
      * {
        color: ${color.val};
        font-size: ${size.val};
      }
    `
    ),
    span(dom),
    window.getComputedStyle(dom, null).fontSize,
  ];
});
// #endregion tuto5

// #region tuto5fixed
define("computed-size-fixed", ({ attr, mount }) => {
  const color = attr("color", "red");
  const size = attr("size", "20px");
  const dom = slot();
  const computedFontSize = van.state(""); // [!code ++:4]
  mount(() => {
    computedFontSize.val = window.getComputedStyle(dom, null).fontSize;
  });
  return [
    style(
      () => `
      * {
        color: ${color.val};
        font-size: ${size.val};
      }
    `
    ),
    span(dom),
    computedFontSize,
  ];
});
// #endregion tuto5fixed

// #region selfReference
define("final-element", ({ attr, mount, $this }) => {
  if ($this.childElementCount || !$this.innerHTML.trim())
    return span({ style: "color:red" }, "ERROR - only text allowed");
  const color = attr("color", "red");
  const size = attr("size", "20px");
  const dom = slot();
  const computedFontSize = van.state("");
  mount(() => {
    computedFontSize.val = window.getComputedStyle(dom, null).fontSize;
  });
  return [
    style(
      () => `
      * {
        color: ${color.val};
        font-size: ${size.val};
      }
    `
    ),
    span(dom),
    computedFontSize,
  ];
});
// #endregion selfReference

// #region getstarted
define("custom-element", () =>
  p(
    "I am a Van Element 🎉 ",
    button({ onclick: () => alert("Hello from VanJS 🍦") }, "Click me")
  )
);
// #endregion getstarted

// #region shadowButton
define("shadow-button", () => button("Shadow DOM"));
// #endregion shadowButton

// #region basic
define("custom-counter", () => {
  const counter = van.state(0);
  return p(
    div("Counter: ", counter),
    button({ onclick: () => ++counter.val }, "+"),
    button({ onclick: () => --counter.val }, "-"),
    button({ onclick: () => (counter.val = 0) }, "Reset")
  );
});
// #endregion basic

// VanJS minigame!
// #region minigame
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Run = (sleepMs: number, icon: string) => {
  const steps = van.state(0);
  (async () => {
    for (; steps.val < 40; ++steps.val) await sleep(sleepMs);
  })();
  return pre(
    () => `${" ".repeat(40 - steps.val)}${icon}${"_".repeat(steps.val)}`
  );
};

const Hello = () => {
  const dom = div();
  return p(
    dom,
    button({ onclick: () => van.add(dom, Run(2000, "🐌")) }, "Hello 🐌"),
    button({ onclick: () => van.add(dom, Run(500, "🐢")) }, "Hello 🐢"),
    button({ onclick: () => van.add(dom, Run(100, "🚶‍♂️")) }, "Hello 🚶‍♂️"),
    button({ onclick: () => van.add(dom, Run(10, "🏎️")) }, "Hello 🏎️"),
    button({ onclick: () => van.add(dom, Run(2, "🚀")) }, "Hello 🚀")
  );
};
// #endregion minigame

// #region minigameBind
define("vanjs-game", Hello);
// #endregion minigameBind

// #region fontPreview

// #endregion fontPreview

// #region attributes
define("attributes-demo", ({ attr }) =>
  p(
    "Hello ",
    attr(
      "name", // attribute name // [!code highlight]
      "Max" // optional default value // [!code highlight]
    )
  )
);
// #endregion attributes

// #region composition
define("my-parent", () =>
  p(
    van.tags["attributes-demo"]({ name: "John" }) // Injected attributes  // [!code highlight]
  )
);
// #endregion composition

// #region observed
define("reactive-attribute", ({ attr }) => p("Hello ", attr("name")));

define("attribute-parent", () => {
  const name = van.state("John");
  return p(
    "Type your name: ",
    input({
      type: "text",
      value: name,
      oninput: (e) => (name.val = e.target.value),
    }),
    van.tags["reactive-attribute"]({ name }) // nested Van Element // [!code highlight]
  );
});
// #endregion observed

// #region slots
define("slot-demo", () => p("Hello ", slot()));
// #endregion slots

// #region slotsNames
define("slot-names", () =>
  div(
    h2(slot({ name: "title" })), // Named slot // [!code highlight]
    i("The Van Element 🍦"),
    slot() // Default slot // [!code highlight]
  )
);
// #endregion slotsNames

// #region mountExample
define("connect-example", () => {
  const dom = slot();
  return div(dom, pre("Items in slot - ", dom.assignedElements().length));
});
// #endregion mountExample

// #region mountShowcase
define("mount-showcase", ({ mount }) => {
  const dom = slot();
  const slotCount = van.state(dom.assignedElements().length);
  mount(() => {
    slotCount.val = dom.assignedElements().length;
  });
  return div(dom, pre("Items in slot - ", slotCount));
});
// #endregion mountShowcase

// Styles

// #region inlineStyles
define("inline-styles", () => p({ style: "color:red" }, "I am red"));
// #endregion inlineStyles

// #region styleTag
define("style-tag", () => [
  style(`
    p {
      color: red;
    }
    ::slotted(p) {
      color: orange;
    }
  `),
  slot(),
  p("Paragraph in Shadow DOM"),
]);
// #endregion styleTag

// #region adoptedStyle
define("adopted-style", ({ $this }) => {
  const css = new CSSStyleSheet();
  css.replaceSync(`
    * {
      color: orange;
    }
  `);
  $this.shadowRoot?.adoptedStyleSheets.push(css);
  return p(slot());
});
// #endregion adoptedStyle

// EXAMPLES

// #region confirmationModal
define("confirmation-modal", ({ attr, $this }) => {
  const confirmLabel = attr("confirm");
  const cancelLabel = attr("cancel", "Close");
  const onConfirm = () => {
    modal.close();
    $this.dispatchEvent(new Event("submit"));
  };
  const modal = dialog(
    div({ class: "mainContent" }, slot()),
    div(
      { class: "actions" },
      button({ onclick: () => modal.close() }, cancelLabel),
      () => confirmLabel.val && button({ onclick: onConfirm }, confirmLabel.val)
    )
  );
  return [
    slot({ name: "trigger", onclick: () => modal.showModal() }),
    modal,
    // Some styles
    style(`
      dialog{
        padding: 2rem;
      }
      dialog::backdrop{
        backdrop-filter:blur(5px);
      }
      .mainContent{
        text-align: center;
      }
      .actions{
        display: flex;
        justify-content: space-around;
      }
      button{
        border:1px solid;
        font: inherit;
        padding: .5rem 1rem;
        background: transparent;
        cursor: pointer;
      }`),
  ];
});
// #endregion confirmationModal

// #region sharedState
const sharedState = van.state(0);

define("increment-state", () =>
  button({ onclick: () => sharedState.val++ }, "Increment (", sharedState, ")")
);

define("display-state", () =>
  div(
    sharedState,
    " ",
    button({ onclick: () => (sharedState.val = 0) }, "Reset")
  )
);
// #endregion sharedState
