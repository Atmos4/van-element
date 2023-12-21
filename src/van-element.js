import van from "vanjs-core";

export function define(name, element, options) {
  window.customElements.define(
    name,
    class extends HTMLElement {
      attrs = {};
      static observedAttributes = options?.observed ?? [];
      constructor() {
        super();
      }
      connectedCallback() {
        for (let a of this.attributes) {
          this.attrs[a.name] = van.state(a.value);
        }
        let mount;
        van.add(
          options?.disableShadow ? this : this.attachShadow({ mode: "open" }),
          element({
            ...this.attrs,
            onMount: (m) => (mount = m),
            element: this,
          })
        );
        mount?.(this);
      }
      attributeChangedCallback(name, _, newValue) {
        if (this.attrs[name]) this.attrs[name].val = newValue;
      }
    }
  );
}
