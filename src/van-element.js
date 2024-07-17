import van from "vanjs-core";

// Short prop names because class props are not minified.
function define(name, element, options = { mode: "open" }) {
  window.customElements.define(
    name,
    class extends HTMLElement {
      constructor() {
        super();
        // Attributes
        this.a = [];
      }
      setAttribute(name, value) {
        super.setAttribute(name, value);
        this.a[name] && (this.a[name].val = value);
      }
      connectedCallback() {
        let mount;
        van.add(
          options ? this.attachShadow(options) : this,
          element({
            attr: (i, v) =>
              (this.a[i] ??= van.state(this.getAttribute(i) ?? v)),
            mount: (newMount) => {
              let currentMount = mount;
              mount = () => {
                let currentDismount = currentMount?.();
                let newDismount = newMount();
                return () => {
                  currentDismount?.();
                  newDismount?.();
                };
              };
            },
            $this: this,
          })
        );
        // Dismount
        this.d = mount?.();
      }
      disconnectedCallback() {
        this.d?.();
      }
    }
  );
}

export { define };
