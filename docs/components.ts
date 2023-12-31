import van from "vanjs-core";
import { define } from "../src/van-element";

const { button, div, h2, i, input, p, pre, slot } = van.tags;

// #region getstarted
define("custom-element", () =>
  p(
    "I am a Van Element 🎉 ",
    button({ onclick: () => alert("Hello from VanJS 🍦") }, "Click me")
  )
);
// #endregion getstarted

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

const Run = ({ sleepMs }: { sleepMs: number }) => {
  const steps = van.state(0);
  (async () => {
    for (; steps.val < 40; ++steps.val) await sleep(sleepMs);
  })();
  return pre(
    () =>
      `${" ".repeat(40 - steps.val)}🚐💨Hello VanJS!${"_".repeat(steps.val)}`
  );
};

define("mini-game", () => {
  const dom = div();
  return p(
    dom,
    button({ onclick: () => van.add(dom, Run({ sleepMs: 2000 })) }, "Hello 🐌"),
    button({ onclick: () => van.add(dom, Run({ sleepMs: 500 })) }, "Hello 🐢"),
    button({ onclick: () => van.add(dom, Run({ sleepMs: 100 })) }, "Hello 🚶‍♂️"),
    button({ onclick: () => van.add(dom, Run({ sleepMs: 10 })) }, "Hello 🏎️"),
    button({ onclick: () => van.add(dom, Run({ sleepMs: 2 })) }, "Hello 🚀")
  );
});
// #endregion minigame

// #region attributes
define(
  "attributes-demo",
  ({ attr }) => p("Hello ", attr("name"))
  // matches the value of attribute "name"
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
define("observed-demo", ({ attr }) =>
  p(
    "Hello ",
    () => attr("name") // This needs to be a derived state // [!code highlight]
  )
);

define("observed-parent", () => {
  const name = van.state("John");
  return p(
    input({
      type: "text",
      value: name,
      oninput: (e) => (name.val = e.target.value),
    }),
    van.tags["observed-demo"]({ name }) // Shorthand for { name: name } // [!code highlight]
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
