import van from "vanjs-core";

export function define(name, element, options) {
  window.customElements.define(
    name,
    class extends HTMLElement {
      static observedAttributes = options?.observed;
      constructor() {
        super();
        this.attrs = {};
        this.dismount;
      }
      connectedCallback() {
        for (let a of this.attributes) {
          this.attrs[
            a.name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
          ] = van.state(a.value);
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
        this.dismount = mount?.();
      }
      attributeChangedCallback(name, _, newValue) {
        if (this.attrs[name]) this.attrs[name].val = newValue;
      }
      disconnectedCallback() {
        this.dismount?.();
      }
    }
  );
}
