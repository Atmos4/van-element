import van from "vanjs-core";

function define(name, element, options = { mode: "open" }) {
  window.customElements.define(
    name,
    class extends HTMLElement {
      constructor() {
        super();
        this.attrs = [];
        this.dismount;
      }
      setAttribute(name, value) {
        super.setAttribute(name, value);
        this.attrs[name] && (this.attrs[name].val = value);
      }
      connectedCallback() {
        let mount;
        van.add(
          options ? this.attachShadow(options) : this,
          element({
            attr: (a, v) =>
              (this.attrs[a] ??= van.state(this.getAttribute(a) ?? v)),
            mount: (m) => (mount = m),
            $this: this,
          })
        );
        this.dismount = mount?.();
      }
      disconnectedCallback() {
        this.dismount?.();
      }
    }
  );
}

export { define };
