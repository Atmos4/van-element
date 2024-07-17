import van from "vanjs-core";
import { define } from "../src/van-element";
import { describe, expect, it } from "vitest";

const { div } = van.tags;

define("light-dom", () => div({ class: "light" }, "Hello"), false);
define("shadow-dom", () => div({ class: "shadow" }, "World"));

describe("Shadow DOM options", () => {
  it("should expose light Van Element", () => {
    document.body.innerHTML = `<light-dom></light-dom>`;
    expect(document.querySelector(".light")).toBeTruthy();
  });

  it("should encapsulate shadow Van Element", () => {
    document.body.innerHTML = `<shadow-dom></shadow-dom>`;
    expect(
      document.querySelector("shadow-dom")?.shadowRoot?.querySelector(".shadow")
    ).toBeTruthy();
    expect(document.querySelector(".shadow")).toBeFalsy();
  });
});
