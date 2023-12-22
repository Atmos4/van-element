var n = Object.defineProperty;
var u = (s, a, t) => a in s ? n(s, a, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[a] = t;
var h = (s, a, t) => (u(s, typeof a != "symbol" ? a + "" : a, t), t);
import l from "vanjs-core";
function f(s, a, t) {
  var r;
  window.customElements.define(
    s,
    (r = class extends HTMLElement {
      constructor() {
        super(), this.attrs = {}, this.dismount;
      }
      connectedCallback() {
        for (let d of this.attributes)
          this.attrs[d.name.replace(/-([a-z])/g, (i, c) => c.toUpperCase())] = l.state(d.value);
        let e;
        l.add(
          t != null && t.disableShadow ? this : this.attachShadow({ mode: "open" }),
          a({
            ...this.attrs,
            onMount: (d) => e = d,
            element: this
          })
        ), this.dismount = e == null ? void 0 : e();
      }
      attributeChangedCallback(e, d, i) {
        this.attrs[e] && (this.attrs[e].val = i);
      }
      disconnectedCallback() {
        var e;
        (e = this.dismount) == null || e.call(this);
      }
    }, h(r, "observedAttributes", t == null ? void 0 : t.observed), r)
  );
}
export {
  f as define
};
