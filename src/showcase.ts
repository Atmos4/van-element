import van from "vanjs-core";
import { define } from "./van-element";

const {
  button,
  dialog,
  input,
  option,
  select,
  slot,
  span,
  style,
  div,
  p,
  pre,
} = van.tags;

define("theme-switch", () => {
  const mode = localStorage.getItem("colorScheme");
  const darkMode = van.state(
    (mode && mode === "dark") ??
      window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );
  van.derive(() => {
    const mode = darkMode.val ? "dark" : "light";
    document
      .querySelector('meta[name="color-scheme"]')
      ?.setAttribute("content", mode);
    localStorage.setItem("colorScheme", mode);
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
});

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

const animals = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"];

function getRandomAnimal() {
  return animals[Math.floor(Math.random() * animals.length)];
}

define("mount-demo", ({ onMount, element: el }) => {
  const animal = getRandomAnimal();
  onMount(() => {
    const parent = el.parentElement?.getElementsByTagName("pre")?.[0];
    parent?.append(div(`${animal} mounted`));
    return () => {
      parent?.append(div(`${animal} dismounted`));
    };
  });
  return div(`${animal} `, button({ onclick: () => el.remove() }, "💀"));
});

define("mount-showcase", ({ element: el, onMount }) => {
  const console = pre({ slot: "console" });
  onMount(() => {
    van.add(el, console);
  });
  return div(
    {
      style:
        "display:grid;grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));gap:1rem",
    },
    style("button{font:inherit}"),
    div(
      button(
        { onclick: () => el.append(van.tags["mount-demo"]()) },
        "Add animal"
      ),
      slot()
    ),
    div(
      "Console: ",
      button({ onclick: () => (console.textContent = "") }, "Clear"),
      slot({ name: "console" })
    )
  );
});

define("demo-component", () => {
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
      {
        oninput: (e) => (color.val = e.target.value),
        value: color,
        style: "font:inherit",
      },
      ["green", "black", "blue", "red", "brown"].map((c) =>
        option({ value: c }, c)
      )
    ),
    div(van.tags["font-preview"]({ size: size, color: color }, "Hello 🍦VanJS"))
  );
});

define("custom-modal", () => {
  const modal = dialog(
    {
      style: "padding:0;border-radius: 10px",
      onclick: (e) => e.target === modal && modal.close(),
    },
    div(
      { style: "padding:1rem 2rem;position:relative" },
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
    dialog::backdrop {
      background-color: rgb(0 0 0 / 0);
      transition: all 0.2s allow-discrete;
    }
    dialog[open]::backdrop {
      background-color: rgb(0 0 0 / 0.25);
    }
    @starting-style {
      dialog[open]::backdrop {
        background-color: rgb(0 0 0 / 0);
      }
    }
    `),
    slot({ name: "open-button", onclick: () => modal.showModal() }),
    modal,
  ];
});

define("tab-panel", ({ onMount, element: el }) => {
  const tabButtons = div({
    style: "display:flex;gap:0.2rem",
  });
  const selectedTab = van.state("");
  const tabContent = slot({ name: "tab" }, p("No tab selected"));
  onMount(() =>
    Array.from(el.children).forEach((p, i) => {
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
