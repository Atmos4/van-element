import t from"vanjs-core";function s(s,e,i=!0){window.customElements.define(s,class extends HTMLElement{constructor(){super(),this.attrs=[],this.dismount}setAttribute(t,s){super.setAttribute(t,s),this.attrs[t]&&(this.attrs[t].val=s)}connectedCallback(){let s;t.add(i?this.attachShadow({mode:"open"}):this,e({attr:s=>(this.attrs[s]??=t.state(this.getAttribute(s))).val,mount:t=>s=t,$this:this})),this.dismount=s?.()}disconnectedCallback(){this.dismount?.()}})}export{s as define};