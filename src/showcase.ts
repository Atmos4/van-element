import van from "vanjs-core";
import { define } from "./van-element";

const { button, dialog, input, option, select, slot, span, style, div, p } =
  van.tags;

define(
  "theme-switch",
  () => {
    const darkMode = van.state(
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    van.derive(() => {
      document
        .querySelector('meta[name="color-scheme"]')
        ?.setAttribute("content", darkMode.val ? "dark" : "light");
    });
    return [
      button(
        {
          style: "font-size: 1.2em",
          onclick: () => (darkMode.val = !darkMode.val),
        },
        () => (darkMode.val ? "☀️" : "😎")
      ),
      () => ` Toggle ${darkMode.val ? "light" : "dark"} mode`,
    ];
  },
  { disableShadow: true }
);

define(
  "font-preview",
  ({ size, color }) =>
    span(
      {
        style: () =>
          `font-size: ${Number(size.val) / 8}em; color: ${color.val};`,
      },
      slot()
    ),
  { observed: ["size", "color"] }
);

define(
  "demo-component",
  () => {
    const size = van.state(10),
      color = van.state("green");
    return span(
      "Size: ",
      input({
        type: "range",
        min: 5,
        max: 20,
        value: size,
        oninput: (e) => (size.val = e.target.value),
      }),
      " Color: ",
      select(
        { oninput: (e) => (color.val = e.target.value), value: color },
        ["green", "black", "blue", "red", "brown"].map((c) =>
          option({ value: c }, c)
        )
      ),
      " ",
      van.tags["font-preview"]({ size: size, color: color }, "Hello 🍦VanJS")
    );
  },
  { disableShadow: true }
);

define("custom-modal", () => {
  const modal = dialog(
    {
      style: "padding:0;border-radius: 10px",
      onclick: (e) => e.target === modal && modal.close(),
    },
    div(
      { style: "padding: 1em;position:relative" },
      button(
        {
          onclick: () => modal.close(),
          style: "position:absolute;top:10px;right:10px;line-height:1.2rem",
        },
        "❌"
      ),
      slot()
    )
  );

  return [
    // Some nice styles for the dialog
    style(`
    dialog[open] {
        opacity: 1;
        transform: scale(1);
    }
    dialog {
        opacity: 0;
        transform: scale(0.5);
        transition: all 0.2s allow-discrete;
    }
    @starting-style {
        dialog[open] {
            opacity: 0;
            transform: scale(0.5);
        }
    }
    dialog::backdrop{backdrop-filter: blur(4px)}
    `),
    slot({ name: "open-button", onclick: () => modal.showModal() }),
    modal,
  ];
});

define("tab-panel", ({ onMount }) => {
  const tabButtons = div({
    style: "display:flex;gap:0.2rem",
  });
  const selectedTab = van.state("");
  const tabContent = slot({ name: "tab" }, p("No tab selected"));
  onMount((dom) =>
    Array.from(dom.children).forEach((p, i) => {
      const tabTitle = p.getAttribute("data-tab") || `Tab ${i + 1}`;
      if (p.getAttribute("slot")) {
        selectedTab.val = tabTitle;
      }
      van.add(
        tabButtons,
        button(
          {
            onclick: () => {
              tabContent.assignedElements()[0]?.removeAttribute("slot");
              p.setAttribute("slot", "tab");
              selectedTab.val = tabTitle;
            },
            style: () =>
              `border-bottom:2px solid${
                selectedTab.val == tabTitle ? "" : " transparent"
              }`,
          },
          tabTitle
        )
      );
    })
  );
  return [
    style(
      "button{font:inherit;padding: 0.5rem;border: none}#tab-area{min-height:200px}"
    ),
    div(tabButtons, div({ id: "tab-area" }, tabContent)),
  ];
});
