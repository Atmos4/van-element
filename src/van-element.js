import van from "vanjs-core";

function define(name, element, shadow = true) {
  window.customElements.define(
    name,
    class extends HTMLElement {
      constructor() {
        super();
        this.attrs = {};
        this.dismount;
      }
      setAttribute(name, value) {
        super.setAttribute(name, value);
        this.attrs[name] && (this.attrs[name].val = value);
      }
      connectedCallback() {
        let mount;
        van.add(
          shadow ? this.attachShadow({ mode: "open" }) : this,
          element({
            attr: (a) =>
              van.val((this.attrs[a] ??= van.state(this.getAttribute(a)))),
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
