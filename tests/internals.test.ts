import van from "vanjs-core";
import { beforeEach, describe, expect, it, jest, mock } from "bun:test";
import { define } from "../src/van-element";
import { useFakeTimers } from "sinon";

const { button, div, slot } = van.tags;

const mountFn = mock();
const unmountFn = mock();
const secondMount = mock();
const secondUnmount = mock();
const clickFn = mock();
const fakeTimer = useFakeTimers();

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
  beforeEach(() => {
    fakeTimer.reset();
    jest.clearAllMocks();
  });

  it("has VanJS behavior", async () => {
    mountComponent();
    queryInShadow("button")?.click();
    expect(clickFn).toHaveBeenCalled();
    await flushUpdates();
    expect(queryInShadow("button")?.textContent).toContain("1");
  });

  it("has attribute reactivity", async () => {
    mountComponent("Jack");
    expect(queryInShadow("div")?.textContent).toContain("Jack");
    getComponent()!.setAttribute("attribute", "John");
    await flushUpdates();
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
    const spyClick = mock();
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

// helper functions
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

async function flushUpdates() {
  await fakeTimer.runAllAsync();
}
