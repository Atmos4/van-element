import van from "vanjs-core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { define } from "./van-element";

const { button, h1, style } = van.tags;

define("my-button", ({ attr, $this, children }) => {
  const name = attr("name", "World");

  const count = van.state(0);

  const onClick = () => {
    count.val++;
    $this.dispatchEvent(new CustomEvent("count", { detail: count.val }));
  };
  return [
    style(`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `),
    h1("Hello, ", name),
    button(
      { onclick: () => onClick(), role: "button" },
      "Click count: ",
      count
    ),
    // Just a slot!
    children,
  ];
});

// I am lazy so this is copy pasted from lit
describe("Button with increment", async () => {
  function getInsideButton(): HTMLElement | null | undefined {
    return document.body
      .querySelector("my-button")
      ?.shadowRoot?.querySelector("button");
  }

  beforeEach(() => {
    // Because VanJS uses setTimeout() to queue procedures in the event loop, we need to fake that otherwise the updates don't render.
    vi.useFakeTimers();
    document.body.innerHTML = '<my-button name="Peter"></my-button>';
  });

  it("should increment the count on each click", async () => {
    getInsideButton()?.click();
    vi.runAllTimers();
    expect(getInsideButton()?.textContent).toContain("1");
  });

  it("should show name props", () => {
    getInsideButton();
    expect(
      document.body.querySelector("my-button")?.shadowRoot?.innerHTML
    ).toContain("Peter");
  });

  it("should dispatch count event on button click", () => {
    const spyClick = vi.fn();

    document.querySelector("my-button")!.addEventListener("count", spyClick);

    getInsideButton()?.click();

    expect(spyClick).toHaveBeenCalled();
  });
});
