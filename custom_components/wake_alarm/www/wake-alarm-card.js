function t(t,e,i,s){var a,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(o=(r<3?a(o):r>3?a(e,i,o):a(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}function e(t){return e=>(customElements.get(t)||customElements.define(t,e),e)}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,a)},l=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,_=globalThis,g=_.trustedTypes,v=g?g.emptyScript:"",b=_.reactiveElementPolyfillSupport,f=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(s)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),a=i.litNonce;void 0!==a&&e.setAttribute("nonce",a),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const r=a.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const r=this.constructor;if(!1===s&&(a=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??$)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[f("elementProperties")]=new Map,x[f("finalized")]=new Map,b?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,A=t=>t,E=k.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+T,M=`<${P}>`,z=document,j=()=>z.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,I=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,L=/"/g,q=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),K=new WeakMap,Z=z.createTreeWalker(z,129);function J(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let a,r=2===e?"<svg>":3===e?"<math>":"",o=R;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===R?"!--"===l[1]?o=D:void 0!==l[1]?o=H:void 0!==l[2]?(q.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=I):void 0!==l[3]&&(o=I):o===I?">"===l[0]?(o=a??R,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?I:'"'===l[3]?L:W):o===L||o===W?o=I:o===D||o===H?o=R:(o=I,a=void 0);const h=o===I&&t[e+1].startsWith("/>")?" ":"";r+=o===R?i+M:c>=0?(s.push(n),i.slice(0,c)+C+i.slice(c)+T+h):i+T+(-2===c?e:h)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0;const o=t.length-1,n=this.parts,[l,c]=X(t,e);if(this.el=G.createElement(l,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Z.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[r++],i=s.getAttribute(t).split(T),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?it:"?"===o[1]?st:"@"===o[1]?at:et}),s.removeAttribute(t)}else t.startsWith(T)&&(n.push({type:6,index:a}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(T),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],j()),Z.nextNode(),n.push({type:2,index:++a});s.append(t[e],j())}}}else if(8===s.nodeType)if(s.data===P)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(T,t+1));)n.push({type:7,index:a}),t+=T.length-1}a++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===F)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=Q(t,a._$AS(t,e.values),a,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);Z.currentNode=s;let a=Z.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new tt(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new rt(a,this,t)),this._$AV.push(e),n=i[++o]}r!==n?.index&&(a=Z.nextNode(),r++)}return Z.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),U(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new G(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new tt(this.O(j()),this.O(j()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const a=this.strings;let r=!1;if(void 0===a)t=Q(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const s=t;let o,n;for(t=a[0],o=0;o<a.length-1;o++)n=Q(this,s[i+o],e,o),n===F&&(n=this._$AH[o]),r||=!U(n)||n!==this._$AH[o],n===V?t=V:t!==V&&(t+=(n??"")+a[o+1]),this._$AH[o]=n}r&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class at extends et{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===F)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=k.litHtmlPolyfillSupport;ot?.(G,tt),(k.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new tt(e.insertBefore(j(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}lt._$litElement$=!0,lt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:lt});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:lt}),(nt.litElementVersions??=[]).push("4.2.2");const dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},ht=(t=dt,e,i)=>{const{kind:s,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const mt=n`
  :host {
    --wa-gap: 16px;
    --wa-radius: 12px;
    --wa-chip-size: 44px;
    --wa-section-gap: 20px;
  }

  ha-card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: var(--wa-section-gap);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header .title {
    flex: 1;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .header ha-icon-button {
    --mdc-icon-button-size: 36px;
    color: var(--secondary-text-color);
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--wa-gap);
  }

  .label {
    flex: 1;
    color: var(--primary-text-color);
    font-size: 0.95rem;
  }

  .value {
    font-variant-numeric: tabular-nums;
    color: var(--secondary-text-color);
  }

  button.btn,
  .btn {
    background: var(--ha-card-background, var(--card-background-color));
    border: 1px solid var(--divider-color);
    color: var(--primary-text-color);
    border-radius: var(--wa-radius);
    padding: 8px 16px;
    font-size: 0.95rem;
    cursor: pointer;
    font-family: inherit;
  }
  button.btn:hover {
    background: var(--secondary-background-color);
  }
  button.btn[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  button.btn.primary {
    background: var(--primary-color);
    color: var(--text-primary-color);
    border-color: var(--primary-color);
  }
  button.btn.danger {
    background: rgb(255, 82, 82);
    color: white;
    border-color: rgb(255, 82, 82);
  }

  .error {
    color: var(--error-color, rgb(255, 82, 82));
    padding: 16px;
    font-size: 0.95rem;
  }
  .loading {
    padding: 16px;
    color: var(--secondary-text-color);
  }
`,_t=["mon","tue","wed","thu","fri","sat","sun"],gt={d1_mon:"mon",d2_tue:"tue",d3_wed:"wed",d4_thu:"thu",d5_fri:"fri",d6_sat:"sat",d7_sun:"sun"},vt=["length_min","start_kelvin","target_kelvin","max_brightness_pct","volume","snooze_min","steps_per_min","music_fade_sec","auto_dismiss_min"],bt=["test_light_ramp","cancel_ramp","test_music","test_standard_notification","test_urgent_notification","dismiss","snooze"],ft=["next_alarm","state","media_selection"];class yt extends Error{}let $t=class extends lt{constructor(){super(...arguments),this._adjustError="",this._cancelRamp=()=>{this.hass&&this.related&&this.hass.callService("button","press",{entity_id:this.related.buttons.cancel_ramp})},this._toggleEnabled=()=>{this.hass&&this.related&&this.hass.callService("switch","toggle",{entity_id:this.related.enabled})},this._handleModeTileClick=()=>{if(!this.hass||!this.related)return;const t=this.hass.states[this.related.sensors.state]?.state;t&&"idle"!==t||this._toggleEnabled()},this._clearAdjustment=async()=>{if(this.hass&&this.related)try{await this.hass.callService("wake_alarm","clear_adjustment",{entity_id:this.related.enabled}),this._adjustError=""}catch(t){this._adjustError=t.message??"Could not clear the adjustment"}},this._snooze=()=>{this.hass&&this.related&&this.hass.callService("button","press",{entity_id:this.related.buttons.snooze})},this._dismiss=()=>{this.hass&&this.related&&this.hass.callService("button","press",{entity_id:this.related.buttons.dismiss})},this._goSettings=()=>{this.dispatchEvent(new CustomEvent("navigate-settings",{bubbles:!0,composed:!0}))}}disconnectedCallback(){super.disconnectedCallback(),this._stopTicker()}updated(){"snoozing"===(this.hass&&this.related?this.hass.states[this.related.sensors.state]?.state:void 0)?this._startTicker():this._stopTicker()}_startTicker(){void 0===this._tickInterval&&(this._tickInterval=window.setInterval(()=>this.requestUpdate(),1e3))}_stopTicker(){void 0!==this._tickInterval&&(window.clearInterval(this._tickInterval),this._tickInterval=void 0)}render(){if(!this.hass||!this.related)return B``;const t=this.related,e=this.hass.states[t.enabled],i=this.hass.states[t.sensors.state],s=this.hass.states[t.active],a=this.hass.states[t.alarmTime],r=this.hass.states[t.sensors.next_alarm],o="on"===e?.state,n=i?.state??"idle",l="on"===s?.state,c=kt(r?.attributes?.next_alarm_time??a?.state),d=wt[n]??wt.idle,h=o?function(t){switch(t){case"ramping":return"Ramping";case"playing":return"Playing";case"snoozing":return"Snoozing";default:return"On"}}(n):"Off",p=i?.attributes?.snooze_until,u="snoozing"===n&&p?function(t){const e=new Date(t).getTime();if(Number.isNaN(e))return t;const i=Math.max(0,Math.round((e-Date.now())/1e3)),s=Math.floor(i/60);return`${s}:${At(i%60)}`}(p):null,m=u?`Music in ${u}`:r?.state&&"unknown"!==r.state?function(t,e){const i=new Date(t);if(Number.isNaN(i.getTime()))return"No upcoming alarm";const s="string"==typeof e.timezone?e.timezone:void 0,a=new Intl.DateTimeFormat(void 0,{weekday:"short",timeZone:s}).format(i);return!0===e.adjusted&&e.adjusted_from&&e.adjusted_time?`${a}, adjusted ${e.adjustment_direction} from ${e.adjusted_from} to ${e.adjusted_time}`:new Intl.DateTimeFormat(void 0,{weekday:"short",hour:"2-digit",minute:"2-digit",hour12:!1,timeZone:s}).format(i)}(r.state,r.attributes):"No upcoming alarm";return B`
      <ha-card>
        <div class="header">
          <ha-icon icon="mdi:alarm"></ha-icon>
          <div class="title">${this._instanceName()}</div>
          <ha-icon-button
            label="Settings"
            @click=${this._goSettings}
          >
            <ha-icon icon="mdi:cog"></ha-icon>
          </ha-icon-button>
        </div>

        <div class="mode-tile mode-${o?n:"off"}" @click=${this._handleModeTileClick}>
          <ha-icon icon=${d}></ha-icon>
          <div class="mode-text">
            <div class="mode-label">${h}</div>
            <div class="mode-next">${o?m:"Tap to enable"}</div>
          </div>
        </div>

        <div style="text-align:center; color:var(--secondary-text-color)">Next alarm · one-time adjustment</div>
        <div class="time-picker">
          <div class="time-col">
            <ha-icon-button @click=${()=>this._adjustTime(1,0)}>
              <ha-icon icon="mdi:menu-up"></ha-icon>
            </ha-icon-button>
            <div class="time-num">${At(c.h)}</div>
            <ha-icon-button @click=${()=>this._adjustTime(-1,0)}>
              <ha-icon icon="mdi:menu-down"></ha-icon>
            </ha-icon-button>
          </div>
          <div class="time-sep">:</div>
          <div class="time-col">
            <ha-icon-button @click=${()=>this._adjustTime(0,1)}>
              <ha-icon icon="mdi:menu-up"></ha-icon>
            </ha-icon-button>
            <div class="time-num">${At(c.m)}</div>
            <ha-icon-button @click=${()=>this._adjustTime(0,-1)}>
              <ha-icon icon="mdi:menu-down"></ha-icon>
            </ha-icon-button>
          </div>
        </div>

        <div class="day-chips">
          ${_t.map(t=>this._renderDayChip(t))}
        </div>

        ${this._adjustError?B`<div role="alert">${this._adjustError}</div>`:null}
        ${r?.attributes?.adjusted?B`<button class="reset-adjustment" @click=${this._clearAdjustment}>Use saved daily time</button>`:null}
        ${l?this._renderActiveActions(n):null}
      </ha-card>
    `}_renderDayChip(t){if(!this.hass||!this.related)return B``;const e=this.related.days[t],i="on"===this.hass.states[e]?.state,s=this.hass.states[this.related.sensors.next_alarm]?.attributes?.day_status,a=s?.[t]?.override;return B`
      <div
        class="chip chip-${!0===a?"once-on":!1===a?"once-off":i?"on":"off"}" role="button" tabindex="0"
        aria-label=${`${xt[t]} ${!0===a?"enabled once":!1===a?"disabled once":i?"enabled":"disabled"}`}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleDay(t))}}
        @click=${()=>this._toggleDay(t)}
      >
        <ha-icon icon=${a??i?"mdi:check-circle":"mdi:close-circle-outline"}></ha-icon>
        <span>${xt[t]}</span>
        <span class="day-time">${(this.hass.states[this.related.dayTimes?.[t]??this.related.alarmTime]?.state??"--:--").slice(0,5)}</span>
      </div>
    `}_renderActiveActions(t){return B`
      <div class="action-row">
        ${"ramping"===t?B`
              <button class="action-btn cancel-ramp" @click=${this._cancelRamp}>
                <ha-icon icon="mdi:weather-sunset-down"></ha-icon>
                <span>Cancel ramp</span>
              </button>
            `:null}
        <button class="action-btn snooze" @click=${this._snooze}>
          <ha-icon icon="mdi:alarm-snooze"></ha-icon>
          <span>Snooze</span>
        </button>
        <button class="action-btn dismiss" @click=${this._dismiss}>
          <ha-icon icon="mdi:alarm-off"></ha-icon>
          <span>Dismiss</span>
        </button>
      </div>
    `}_instanceName(){if(!this.hass||!this.related)return"Wake Alarm";const t=this.hass.states[this.related.sensors.next_alarm],e=t?.attributes?.instance_name;return e&&e.trim()?e:"Wake Alarm"}_toggleDay(t){this.hass&&this.related&&this.hass.callService("wake_alarm","toggle_day_once",{entity_id:this.related.enabled,day:t}).catch(t=>{this._adjustError=t.message??"Could not change this day"})}async _adjustTime(t,e){if(!this.hass||!this.related)return;const i=this.hass.states[this.related.sensors.next_alarm],s=kt(i?.attributes?.next_alarm_time);let a=s.h+t,r=s.m+e;r>=60&&(r-=60,a+=1),r<0&&(r+=60,a-=1),a=(a%24+24)%24,this._adjustError="";try{await this.hass.callService("wake_alarm","adjust_next_alarm",{entity_id:this.related.enabled,time:`${At(a)}:${At(r)}:00`,expected_date:i?.attributes?.next_alarm_date})}catch(t){this._adjustError=t.message??"Could not adjust the next alarm"}}};$t.styles=[mt,n`
      .mode-tile {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        border-radius: var(--wa-radius);
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .mode-tile ha-icon {
        --mdc-icon-size: 36px;
      }
      .mode-text { display: flex; flex-direction: column; gap: 2px; }
      .mode-label { font-size: 1rem; font-weight: 500; }
      .mode-next { font-size: 0.85rem; color: var(--secondary-text-color); }

      .mode-off {
        background: var(--ha-card-background, var(--card-background-color));
        border: 1px solid var(--divider-color);
      }
      .mode-off ha-icon { color: var(--disabled-text-color); }
      .mode-idle {
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.12);
      }
      .mode-idle ha-icon { color: var(--primary-color); }
      .mode-ramping {
        background: rgba(255, 165, 0, 0.18);
      }
      .mode-ramping ha-icon { color: rgb(255, 165, 0); }
      .mode-playing {
        background: rgba(76, 175, 80, 0.20);
      }
      .mode-playing ha-icon { color: rgb(76, 175, 80); }
      .mode-snoozing {
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.20);
      }
      .mode-snoozing ha-icon { color: var(--primary-color); }

      .time-picker {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .time-col {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .time-num {
        font-size: 2.2rem;
        font-variant-numeric: tabular-nums;
        font-weight: 500;
        min-width: 64px;
        text-align: center;
      }
      .time-sep {
        font-size: 2.2rem;
        line-height: 2.2rem;
        color: var(--secondary-text-color);
      }

      .day-time { font-size: 0.75rem; font-variant-numeric: tabular-nums; }
      .reset-adjustment { font: inherit; padding: 8px; cursor: pointer; }
      .daily-times { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .daily-time { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
      .daily-time input { font: inherit; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 8px; padding: 8px; min-width: 0; }
      .day-chips {
        display: flex;
        gap: 8px;
        justify-content: space-between;
      }
      .chip {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 4px;
        border-radius: var(--wa-radius);
        cursor: pointer;
        font-size: 0.8rem;
        background: var(--ha-card-background, var(--card-background-color));
        border: 1px solid var(--divider-color);
        user-select: none;
      }
      .chip-on ha-icon { color: rgb(76, 175, 80); }
      .chip-off ha-icon { color: var(--disabled-text-color); }
      .chip-on { border-color: rgba(76, 175, 80, 0.4); }
      .chip-once-on { border-color: var(--primary-color); background: rgba(33,150,243,0.12); }
      .chip-once-on ha-icon { color: rgb(33,150,243); }
      .chip-once-off { border-color: rgb(244,67,54); background: rgba(244,67,54,0.12); }
      .chip-once-off ha-icon { color: rgb(244,67,54); }

      /* Snooze + Dismiss share the mode-tile vibe: tall, prominent,
         half-width each so they line up under the mode tile. */
      .action-row {
        display: flex;
        gap: 12px;
      }
      .action-btn {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 16px;
        border-radius: var(--wa-radius);
        border: 1px solid var(--divider-color);
        background: var(--ha-card-background, var(--card-background-color));
        color: var(--primary-text-color);
        font-size: 1rem;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .action-btn:hover { background: var(--secondary-background-color); }
      .action-btn ha-icon { --mdc-icon-size: 32px; }
      .action-btn.snooze {
        background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.14);
      }
      .action-btn.snooze ha-icon { color: var(--primary-color); }
      .action-btn.dismiss {
        background: rgba(255, 82, 82, 0.14);
        color: rgb(255, 82, 82);
      }
      .action-btn.dismiss ha-icon { color: rgb(255, 82, 82); }
      .action-btn.cancel-ramp {
        background: rgba(255, 165, 0, 0.16);
      }
      .action-btn.cancel-ramp ha-icon { color: rgb(255, 165, 0); }
    `],t([pt({attribute:!1})],$t.prototype,"hass",void 0),t([pt({attribute:!1})],$t.prototype,"related",void 0),t([pt({attribute:!1})],$t.prototype,"_adjustError",void 0),$t=t([e("wake-alarm-main-view")],$t);const wt={idle:"mdi:alarm",ramping:"mdi:weather-sunset-up",playing:"mdi:music-note",snoozing:"mdi:alarm-snooze",off:"mdi:alarm-off"},xt={mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat",sun:"Sun"};function kt(t){if(!t)return{h:7,m:0};const e=/^(\d{1,2}):(\d{1,2})/.exec(t);return e?{h:parseInt(e[1],10),m:parseInt(e[2],10)}:{h:7,m:0}}function At(t){return t.toString().padStart(2,"0")}let Et=class extends lt{constructor(){super(...arguments),this.icon="mdi:music",this._failed=!1,this._onError=()=>{this._failed=!0}}willUpdate(t){(t.has("thumbnail")||t.has("hass"))&&this._resolve()}async _resolve(){const t=this.thumbnail;if(this._failed=!1,this._src=void 0,!t||!this.hass)return;const e=await async function(t,e){let i=e;if(/^https?:\/\//i.test(e)){let t;try{t=new URL(e)}catch{return e}if(!t.pathname.startsWith("/api/"))return e;i=t.pathname+t.search}else if(!e.startsWith("/"))return e;try{return(await t.callWS({type:"auth/sign_path",path:i})).path}catch{return i}}(this.hass,t);this.thumbnail===t&&(this._src=e)}render(){return this._src&&!this._failed?B`<img
        src=${this._src}
        alt=""
        loading="lazy"
        @error=${this._onError}
      />`:B`<div class="placeholder">
      <ha-icon icon=${this.icon}></ha-icon>
    </div>`}};Et.styles=n`
    :host {
      display: block;
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 6px;
      overflow: hidden;
      background: var(--card-background-color);
    }
    img,
    .placeholder {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
    }
  `,t([pt({attribute:!1})],Et.prototype,"hass",void 0),t([pt({attribute:!1})],Et.prototype,"thumbnail",void 0),t([pt()],Et.prototype,"icon",void 0),t([ut()],Et.prototype,"_src",void 0),t([ut()],Et.prototype,"_failed",void 0),Et=t([e("wake-alarm-thumb")],Et);let St=class extends lt{constructor(){super(...arguments),this._children=[],this._path=[],this._loading=!1}firstUpdated(){this._navigate(void 0,void 0,"Library")}async _navigate(t,e,i){if(this.hass&&this.entityId){this._loading=!0,this._error=void 0;try{const s={type:"media_player/browse_media",entity_id:this.entityId,...void 0!==t?{media_content_id:t}:{},...void 0!==e?{media_content_type:e}:{}},a=await this.hass.callWS(s);this._children=a.children??[],this._path=[...this._path,{contentId:t,contentType:e,title:a.title||i}]}catch(t){this._error=`${t}`}finally{this._loading=!1}}}async _back(){if(this._path.length<=1)return;const t=this._path.slice(0,-1),e=t[t.length-1];this._path=t.slice(0,-1),await this._navigate(e.contentId,e.contentType,e.title)}_onItemClick(t){if(t.can_expand)this._navigate(t.media_content_id,t.media_content_type,t.title);else if(t.can_play){const e={media_content_id:t.media_content_id,media_content_type:t.media_content_type,title:t.title,thumbnail:t.thumbnail??void 0};this.dispatchEvent(new CustomEvent("media-picked",{detail:{item:e},bubbles:!0,composed:!0}))}}render(){const t=this._path.map(t=>t.title).join(" › ")||"Library";return B`
      <div class="toolbar">
        <button
          class="back"
          ?disabled=${this._path.length<=1}
          @click=${this._back}
        >
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </button>
        <div class="crumb" title=${t}>${t}</div>
      </div>

      ${this._error?B`<div class="error">Failed to browse: ${this._error}</div>`:null}
      ${this._loading?B`<div class="loading">Loading…</div>`:B`
            <div class="grid">
              ${0===this._children.length?B`<div class="empty">Nothing to show.</div>`:this._children.map(t=>this._renderItem(t))}
            </div>
          `}
    `}_renderItem(t){const e=!!t.can_play,i=!!t.can_expand;return B`
      <div class=${`tile ${e?"playable":""} ${i?"expandable":""}`} @click=${()=>this._onItemClick(t)} role="button" tabindex="0">
        <wake-alarm-thumb
          .hass=${this.hass}
          .thumbnail=${t.thumbnail}
          icon=${i?"mdi:folder-music":"mdi:music"}
        ></wake-alarm-thumb>
        <div class="title" title=${t.title}>${t.title}</div>
      </div>
    `}};St.styles=n`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      /* Opaque so the settings view behind the modal doesn't show through. */
      background: var(--card-background-color);
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-bottom: 1px solid var(--divider-color);
    }
    .toolbar .back {
      background: none;
      border: none;
      cursor: pointer;
      color: inherit;
      padding: 4px;
    }
    .toolbar .back[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .crumb {
      flex: 1;
      font-size: 0.95rem;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
      padding: 12px;
      overflow-y: auto;
      flex: 1;
    }
    .tile {
      display: flex;
      flex-direction: column;
      gap: 6px;
      cursor: pointer;
      border-radius: 8px;
      overflow: hidden;
      background: var(--secondary-background-color);
      padding: 8px;
      user-select: none;
    }
    .tile:hover { background: var(--ha-card-background, var(--card-background-color)); }
    .tile .title {
      font-size: 0.85rem;
      line-height: 1.2;
      max-height: 2.4em;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .tile.playable { outline: 1px solid rgba(76, 175, 80, 0.3); }
    .empty,
    .loading,
    .error {
      padding: 16px;
      color: var(--secondary-text-color);
    }
    .error { color: var(--error-color, rgb(255, 82, 82)); }
  `,t([pt({attribute:!1})],St.prototype,"hass",void 0),t([pt()],St.prototype,"entityId",void 0),t([ut()],St.prototype,"_children",void 0),t([ut()],St.prototype,"_path",void 0),t([ut()],St.prototype,"_loading",void 0),t([ut()],St.prototype,"_error",void 0),St=t([e("wake-alarm-media-browser")],St);const Ct=[{key:"snooze_min",label:"Snooze (min)",description:"How long the snooze pause lasts before music resumes.",min:1,max:30,step:1},{key:"length_min",label:"Length (min)",description:"Total minutes the lights ramp up before the alarm time.",min:1,max:120,step:1},{key:"start_kelvin",label:"Start K",description:"Warm colour temperature at the beginning of the ramp.",min:1500,max:6500,step:50},{key:"target_kelvin",label:"Target K",description:"Cool colour temperature reached at the alarm time.",min:1500,max:6500,step:50},{key:"max_brightness_pct",label:"Max % Brightness",description:"Peak brightness reached at the alarm time.",min:1,max:100,step:1},{key:"volume",label:"Alarm Volume (%)",description:"Final volume the music fades up to. Defaults to a low value so test plays don't blast.",min:0,max:100,step:1,displayMultiplier:100},{key:"music_fade_sec",label:"Music fade (s)",description:"How long the volume takes to fade from 0 to the target volume.",min:0,max:300,step:5},{key:"auto_dismiss_min",label:"Auto-dismiss (min)",description:"Stop everything this long after the music starts (the alarm time) — not the start of the light ramp. 0 disables.",min:0,max:120,step:1}];let Tt=class extends lt{constructor(){super(...arguments),this._showMediaPicker=!1,this._openMediaPicker=()=>{this._showMediaPicker=!0},this._closeMediaPicker=()=>{this._showMediaPicker=!1},this._onMediaPicked=t=>{if(!this.hass||!this.related)return;const e=t.detail?.item;e&&(this.hass.callService("wake_alarm","set_media",{media_content_id:e.media_content_id,media_content_type:e.media_content_type,title:e.title??e.media_content_id,thumbnail:e.thumbnail},{entity_id:this.related.enabled}),this._closeMediaPicker())},this._openOptionsFlow=()=>{this.related&&(history.pushState(null,"","/config/integrations/integration/wake_alarm"),window.dispatchEvent(new Event("location-changed")))},this._goBack=()=>{this.dispatchEvent(new CustomEvent("navigate-back",{bubbles:!0,composed:!0}))}}shouldUpdate(t){return t.has("hass")||t.has("related")||t.has("_showMediaPicker")}_setDailyTime(t,e){const i=e.target.value;i&&this.hass&&this.hass.callService("time","set_value",{entity_id:t,time:`${i}:00`})}render(){if(!this.hass||!this.related)return B``;const t=this.related,e=this.hass.states[t.sensors.state]?.state??"idle",i=this.hass.states[t.sensors.media_selection],s=i?.state??"none",a="none"!==s,r=i?.attributes?.thumbnail,o=this.hass.states[t.sensors.next_alarm],n=o?.attributes?.light_entities??[],l=o?.attributes?.media_player_entities??[],c=o?.attributes?.person_entity,d=function(t){return!!t&&t.length>0}(l);return B`
      <ha-card>
        <div class="header">
          <ha-icon-button label="Back" @click=${this._goBack}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </ha-icon-button>
          <div class="title">Settings</div>
        </div>

        <div class="section">
          <h3>Recurring weekly schedule</h3>
          <p>Saved times and day switches. Main-card changes apply once.</p>
          <label>Set every day <input type="time"
            .value=${this.hass.states[t.alarmTime]?.state.slice(0,5)??"07:00"}
            @change=${e=>this._setDailyTime(t.alarmTime,e)} /></label>
          ${_t.map(e=>B`<div style="display:flex;align-items:center;gap:12px;padding:8px 0">
            <ha-switch .checked=${"on"===this.hass.states[t.days[e]]?.state}
              @change=${()=>this.hass.callService("switch","toggle",{entity_id:t.days[e]})}></ha-switch>
            <label style="flex:1">${e.charAt(0).toUpperCase()+e.slice(1)}
              <input type="time" .value=${this.hass.states[t.dayTimes?.[e]??t.alarmTime]?.state.slice(0,5)??"07:00"}
                @change=${i=>this._setDailyTime(t.dayTimes?.[e]??t.alarmTime,i)} /></label>
          </div>`)}
          ${Ct.map(t=>this._renderSlider(t))}
        </div>

        <div class="section actions">
          <button class="btn" @click=${()=>this._press("test_light_ramp")}>
            Test light ramp
          </button>
          ${"ramping"===e?B`<button class="btn" @click=${()=>this._press("cancel_ramp")}>
                Cancel ramp
              </button>`:null}
          ${d?B`<button class="btn" @click=${()=>this._press("test_music")}>
                Test music
              </button>`:null}
        </div>

        <div class="section">
          <div class="section-title">Notifications</div>
          <div class="notif-item">
            <button
              class="btn"
              @click=${()=>this._press("test_standard_notification")}
            >
              Test standard notification
            </button>
            <div class="slider-desc">
              Sends a mobile notification on this device at alarm time to allow
              easy access to snooze.
            </div>
          </div>
          ${d?B`<div class="notif-item">
                <button
                  class="btn"
                  @click=${()=>this._press("test_urgent_notification")}
                >
                  Test urgent notification
                </button>
                <div class="slider-desc">
                  Sends an urgent mobile notification on this device when
                  speakers are unavailable or no media has been picked, so you
                  should still be woken up — although less pleasantly :-)
                </div>
              </div>`:null}
        </div>

        ${d?B`<div class="section media">
              <div class="section-title">Media</div>
              <div class="media-row" @click=${this._openMediaPicker}>
                ${a?B`
                      <wake-alarm-thumb
                        class="thumb"
                        .hass=${this.hass}
                        .thumbnail=${r??null}
                        icon="mdi:music"
                      ></wake-alarm-thumb>
                      <div class="media-text">
                        <div class="media-title">${s}</div>
                        <div class="media-sub">Tap to change</div>
                      </div>
                    `:B`
                      <wake-alarm-thumb
                        class="thumb"
                        icon="mdi:music-note-plus"
                      ></wake-alarm-thumb>
                      <div class="media-text">
                        <div class="media-title">No media picked</div>
                        <div class="media-sub">Tap to choose</div>
                      </div>
                    `}
              </div>
            </div>`:null}

        <div class="section">
          <div class="section-title">Targets</div>
          <div class="targets">
            <div class="target-row">
              <ha-icon icon="mdi:account"></ha-icon>
              <span>${c??"—"}</span>
            </div>
            <div class="target-row">
              <ha-icon icon="mdi:lightbulb"></ha-icon>
              <span>${n.join(", ")||"—"}</span>
            </div>
            <div class="target-row">
              <ha-icon icon="mdi:speaker"></ha-icon>
              <span>${l.join(", ")||"—"}</span>
            </div>
            <button class="btn small" @click=${this._openOptionsFlow}>
              Edit targets in HA settings
            </button>
          </div>
        </div>

        ${this._showMediaPicker?this._renderMediaPickerDialog():null}
      </ha-card>
    `}_renderSlider(t){if(!this.hass||!this.related)return B``;const e=this.related.numbers[t.key],i=this.hass.states[e]?.state,s=i&&!["unknown","unavailable"].includes(i)?Number(i):t.min/(t.displayMultiplier??1),a=t.displayMultiplier??1,r=s*a,o=t.step>=1?r.toFixed(0):r.toFixed(2);return B`
      <div class="slider-row">
        <div class="slider-head">
          <span class="label">${t.label}</span>
          <span class="value">${o}</span>
        </div>
        <div class="slider-desc">${t.description}</div>
        <input
          type="range"
          min=${t.min}
          max=${t.max}
          step=${t.step}
          .value=${String(r)}
          @change=${t=>this._setNumber(e,t,a)}
        />
      </div>
    `}_setNumber(t,e,i){if(!this.hass)return;const s=Number(e.target.value)/i;this.hass.callService("number","set_value",{entity_id:t,value:s})}_press(t){this.hass&&this.related&&this.hass.callService("button","press",{entity_id:this.related.buttons[t]})}_renderMediaPickerDialog(){if(!this.hass||!this.related)return B``;const t=(this.hass.states[this.related.sensors.next_alarm]?.attributes?.media_player_entities??[])[0];return t?B`
      <div class="modal-backdrop" @click=${this._closeMediaPicker}>
        <div class="modal large" @click=${t=>t.stopPropagation()}>
          <div class="modal-header">
            <div class="title">Pick media</div>
            <ha-icon-button @click=${this._closeMediaPicker}>
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
          </div>
          <wake-alarm-media-browser
            .hass=${this.hass}
            .entityId=${t}
            @media-picked=${this._onMediaPicked}
          ></wake-alarm-media-browser>
        </div>
      </div>
    `:B`
        <div class="modal-backdrop" @click=${this._closeMediaPicker}>
          <div class="modal" @click=${t=>t.stopPropagation()}>
            <div class="modal-header">
              <div class="title">Pick media</div>
              <ha-icon-button @click=${this._closeMediaPicker}>
                <ha-icon icon="mdi:close"></ha-icon>
              </ha-icon-button>
            </div>
            <div class="error">
              No media players are configured for this alarm. Add one in
              Settings → Devices & Services.
            </div>
          </div>
        </div>
      `}};Tt.styles=[mt,n`
      .section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .section-title {
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--secondary-text-color);
      }
      .actions {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
      }

      .notif-item {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .notif-item .btn {
        align-self: flex-start;
      }

      .slider-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .slider-head {
        display: flex;
        align-items: center;
      }
      .slider-row input[type="range"] {
        width: 100%;
        accent-color: var(--primary-color);
      }
      .slider-desc {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        line-height: 1.3;
      }

      .media-row {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 8px;
        border-radius: var(--wa-radius);
        background: var(--ha-card-background, var(--card-background-color));
        border: 1px solid var(--divider-color);
        cursor: pointer;
      }
      .media-row:hover { background: var(--secondary-background-color); }
      .thumb {
        width: 48px;
        border-radius: 8px;
        flex: 0 0 auto;
      }
      .media-text { display: flex; flex-direction: column; gap: 2px; }
      .media-title { font-size: 1rem; font-weight: 500; }
      .media-sub { font-size: 0.85rem; color: var(--secondary-text-color); }

      .targets {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .target-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        color: var(--primary-text-color);
        word-break: break-all;
      }
      .target-row ha-icon {
        --mdc-icon-size: 18px;
        color: var(--secondary-text-color);
      }
      button.btn.small {
        padding: 6px 12px;
        font-size: 0.85rem;
        align-self: flex-start;
      }

      .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
      }
      .modal {
        background: var(--card-background-color, white);
        border-radius: var(--wa-radius);
        max-width: 90vw;
        width: 480px;
        max-height: 90vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .modal.large {
        width: 720px;
        height: 80vh;
      }
      .modal-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--divider-color);
      }
      .modal-header .title {
        flex: 1;
        font-size: 1.1rem;
        font-weight: 500;
      }
      wake-alarm-media-browser {
        flex: 1;
        overflow: auto;
        min-height: 0;
      }
    `],t([pt({attribute:!1})],Tt.prototype,"hass",void 0),t([pt({attribute:!1})],Tt.prototype,"related",void 0),t([ut()],Tt.prototype,"_showMediaPicker",void 0),Tt=t([e("wake-alarm-settings-view")],Tt);let Pt=class extends lt{constructor(){super(...arguments),this._enabledSwitches=[],this._onEntityChange=t=>{const e=t.target.value,i={...this._config??{type:"custom:wake-alarm-card"},entity:e};this._config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}}setConfig(t){this._config=t}firstUpdated(){this._loadEnabledSwitches()}async _loadEnabledSwitches(){if(this.hass)try{const t=await this.hass.callWS({type:"config/entity_registry/list"});if(this._enabledSwitches=t.filter(t=>"wake_alarm"===t.platform&&(t.unique_id??"").endsWith("_enabled")&&t.entity_id.startsWith("switch.")).map(t=>t.entity_id).sort(),this._config?.entity&&!this._enabledSwitches.includes(this._config.entity)){const t={...this._config,entity:""};this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}catch(t){this._loadError=`${t}`}}render(){return this._config?this._loadError?B`<div class="error">Failed to load wake_alarm entities: ${this._loadError}</div>`:B`
      <div class="row">
        <label for="entity">Wake Alarm instance</label>
        <select
          id="entity"
          .value=${this._config.entity??""}
          @change=${this._onEntityChange}
        >
          <option value="" disabled ?selected=${!this._config.entity}>
            Pick a wake_alarm enabled-switch…
          </option>
          ${this._enabledSwitches.map(t=>B`<option value=${t} ?selected=${this._config.entity===t}>${t}</option>`)}
        </select>
      </div>
      ${0===this._enabledSwitches.length?B`<div class="hint">
            No wake_alarm instances yet. Add one in
            Settings → Devices &amp; Services → Add Integration → Wake Alarm.
          </div>`:null}
    `:B``}};var Mt;Pt.styles=n`
    :host { display: block; padding: 12px; }
    .row { display: flex; flex-direction: column; gap: 6px; }
    label { font-size: 0.9rem; color: var(--secondary-text-color); }
    select {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 0.95rem;
    }
    .hint { padding-top: 8px; color: var(--secondary-text-color); font-size: 0.85rem; }
    .error { color: var(--error-color, rgb(255, 82, 82)); }
  `,t([pt({attribute:!1})],Pt.prototype,"hass",void 0),t([ut()],Pt.prototype,"_config",void 0),t([ut()],Pt.prototype,"_enabledSwitches",void 0),t([ut()],Pt.prototype,"_loadError",void 0),Pt=t([e("wake-alarm-card-editor")],Pt);let zt=Mt=class extends lt{constructor(){super(...arguments),this._view="main",this._resolving=!1,this._resolveAttempts=0,this._goMain=()=>{this._view="main"},this._goSettings=()=>{this._view="settings"}}setConfig(t){if(t?.entity&&!t.entity.startsWith("switch."))throw new Error("wake-alarm-card: `entity` must be a switch (the wake_alarm enabled switch).");this._config=t??{type:"custom:wake-alarm-card",entity:""},this._related=void 0,this._resolveError=void 0,this._resolving=!1,this._resolveAttempts=0}getCardSize(){return 6}static getConfigElement(){return document.createElement("wake-alarm-card-editor")}static async getStubConfig(t){if(!t)return{type:"custom:wake-alarm-card",entity:""};try{const e=(await t.callWS({type:"config/entity_registry/list"})).find(t=>"wake_alarm"===t.platform&&(t.unique_id??"").endsWith("_enabled")&&(t.entity_id??"").startsWith("switch."));return{type:"custom:wake-alarm-card",entity:e?.entity_id??""}}catch{return{type:"custom:wake-alarm-card",entity:""}}}willUpdate(t){this.hass&&this._config?.entity&&!this._related&&!this._resolving&&this._resolveAttempts<Mt._MAX_RESOLVE_ATTEMPTS&&(t.has("hass")||t.has("_config"))&&this._resolveRelated()}async _resolveRelated(){if(this.hass&&this._config){this._resolving=!0,this._resolveAttempts+=1;try{const t=await this.hass.callWS({type:"config/entity_registry/list"});this._related=function(t,e){const i=e.find(e=>e.entity_id===t);if(!i)throw new yt(`Entity ${t} is not in the entity registry.`);if("wake_alarm"!==i.platform)throw new yt(`Entity ${t} is not a wake_alarm entity (platform=${i.platform}).`);const s=i.config_entry_id;if(!s)throw new yt(`Entity ${t} has no config_entry_id.`);const a={},r={},o=`${s}_`;for(const t of e){if(t.config_entry_id!==s)continue;if(!t.unique_id||!t.unique_id.startsWith(o))continue;const e=t.unique_id.slice(o.length),i=gt[e];i?r[i]=t.entity_id:a[e]=t.entity_id}const n=t=>{const e=a[t];if(!e)throw new yt(`Wake Alarm entity for "${t}" is missing from the registry. Make sure the integration is fully loaded.`);return e};for(const t of _t)if(!r[t])throw new yt(`Wake Alarm day toggle for "${t}" is missing from the registry. Make sure the integration is fully loaded and migrated to v2+.`);const l={};for(const t of vt)l[t]=n(t);const c={};for(const t of bt)c[t]=n(t);const d={};for(const t of ft)d[t]=n(t);return{configEntryId:s,enabled:n("enabled"),active:n("active"),alarmTime:n("alarm_time"),days:r,dayTimes:Object.fromEntries(Object.entries(gt).map(([t,e])=>[e,a[`alarm_time_${t}`]])),numbers:l,buttons:c,sensors:d}}(this._config.entity,t),this._resolveError=void 0}catch(t){this._resolveError=t instanceof yt?t.message:`Could not resolve wake_alarm entities: ${t}`}finally{this._resolving=!1}}}render(){return this._config?this._config.entity?this._resolveError?B`<ha-card><div class="error">${this._resolveError}</div></ha-card>`:this._related&&this.hass?"settings"===this._view?B`
          <wake-alarm-settings-view
            .hass=${this.hass}
            .related=${this._related}
            @navigate-back=${this._goMain}
          ></wake-alarm-settings-view>
        `:B`
          <wake-alarm-main-view
            .hass=${this.hass}
            .related=${this._related}
            @navigate-settings=${this._goSettings}
          ></wake-alarm-main-view>
        `:B`<ha-card><div class="loading">Loading…</div></ha-card>`:B`<ha-card><div class="loading">
        Pick a Wake Alarm enabled-switch in the visual editor.
      </div></ha-card>`:B``}};zt._MAX_RESOLVE_ATTEMPTS=10,zt.styles=mt,t([pt({attribute:!1})],zt.prototype,"hass",void 0),t([ut()],zt.prototype,"_config",void 0),t([ut()],zt.prototype,"_view",void 0),t([ut()],zt.prototype,"_related",void 0),t([ut()],zt.prototype,"_resolveError",void 0),zt=Mt=t([e("wake-alarm-card")],zt),window.customCards=window.customCards??[],window.customCards.some(t=>"wake-alarm-card"===t.type)||window.customCards.push({type:"wake-alarm-card",name:"Wake Alarm",description:"Wake-up alarm with a gradual light ramp and a music sequence.",preview:!1}),console.info("%c WAKE-ALARM-CARD %c v0.7.1 ","color: white; background: #ff5722; font-weight: 700;","color: #ff5722; background: white; font-weight: 700;");export{zt as WakeAlarmCard};
