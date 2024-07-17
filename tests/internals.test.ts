import van from "vanjs-core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { define } from "../src/van-element";

const { button, div, slot } = van.tags;

const mountFn = vi.fn();
const unmountFn = vi.fn();
const secondMount = vi.fn();
const secondUnmount = vi.fn();
const clickFn = vi.fn();

define("internals-test", ({ attr, $this, mount }) => {
  const attribute = attr("attribute", "default");

  const count = van.state(0);

  mount(() => {
    mountFn();
    return unmountFn;
  });

  mount(() => {
    secondMount();
    return secondUnmount;
  });

  const onClick = () => {
    clickFn();
    count.val++;
    $this.dispatchEvent(new CustomEvent("count", { detail: count.val }));
  };
  return [
    div("Attribute: ", attribute),
    button({ onclick: () => onClick() }, "Count: ", count),
    slot(),
  ];
});

describe("check that a Van Element", async () => {
  function getComponent() {
    return document.body.querySelector("internals-test");
  }

  function queryInShadow<K extends keyof HTMLElementTagNameMap>(
    selector: K
  ): HTMLElementTagNameMap[K] | null | undefined {
    return getComponent()?.shadowRoot?.querySelector(selector);
  }

  function mountComponent(name = "Peter", children = "") {
    document.body.innerHTML = `<internals-test attribute="${name}">${children}</internals-test>`;
  }

  beforeEach(() => {
    // Because VanJS uses setTimeout() to queue procedures in the event loop, we need to fake that otherwise the updates don't render.
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  it("has VanJS behavior", async () => {
    mountComponent();
    queryInShadow("button")?.click();
    expect(clickFn).toHaveBeenCalled();
    vi.runAllTimers();
    expect(queryInShadow("button")?.textContent).toContain("1");
  });

  it("has attribute reactivity", () => {
    mountComponent("Jack");
    expect(queryInShadow("div")?.textContent).toContain("Jack");
    getComponent()!.setAttribute("attribute", "John");
    vi.runAllTimers();
    expect(queryInShadow("div")?.textContent).toContain("John");
  });

  it("mounts and unmounts properly", () => {
    expect(mountFn).not.toHaveBeenCalled();
    mountComponent();
    expect(mountFn).toHaveBeenCalled();
    getComponent()!.remove();
    expect(unmountFn).toHaveBeenCalled();
  });

  it("propagates events out", () => {
    const spyClick = vi.fn();
    mountComponent();
    getComponent()!.addEventListener("count", spyClick);
    queryInShadow("button")?.click();
    expect(spyClick).toHaveBeenCalled();
  });

  it("has a main slot", () => {
    mountComponent("Bob", "Hi mom");
    const slotted = queryInShadow("slot")?.assignedNodes();
    expect(slotted?.[0].textContent).toContain("Hi mom");
  });

  it("multiple mount callbacks", () => {
    mountComponent();
    expect(mountFn).toHaveBeenCalled();
    expect(secondMount).toHaveBeenCalled();
    getComponent()!.remove();
    expect(unmountFn).toHaveBeenCalled();
    expect(secondUnmount).toHaveBeenCalled();
  });
});
