var Ie=Object.defineProperty;var Oe=Object.getOwnPropertyDescriptor;var h=(i,e,t,r)=>{for(var o=r>1?void 0:r?Oe(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(o=(r?n(e,t,o):n(o))||o);return r&&o&&Ie(e,t,o),o};var K=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),de=new Map,B=class{constructor(e,t){if(this._$cssResult$=!0,t!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=de.get(this.cssText);return K&&e===void 0&&(de.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}},ce=i=>new B(typeof i=="string"?i:i+"",Y),m=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((r,o,s)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[s+1],i[0]);return new B(t,Y)},Z=(i,e)=>{K?i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{let r=document.createElement("style"),o=window.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=t.cssText,i.appendChild(r)})},F=K?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return ce(t)})(i):i;var X,he=window.trustedTypes,je=he?he.emptyScript:"",ue=window.reactiveElementPolyfillSupport,Q={toAttribute(i,e){switch(e){case Boolean:i=i?je:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},pe=(i,e)=>e!==i&&(e==e||i==i),G={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:pe},x=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach((t,r)=>{let o=this._$Eh(r,t);o!==void 0&&(this._$Eu.set(o,r),e.push(o))}),e}static createProperty(e,t=G){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let r=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,r,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(o){let s=this[e];this[t]=o,this.requestUpdate(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||G}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let t=this.properties,r=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let o of r)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let o of r)t.unshift(F(o))}else e!==void 0&&t.push(F(e));return t}static _$Eh(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,r;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)===null||r===void 0||r.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Z(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostConnected)===null||r===void 0?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostDisconnected)===null||r===void 0?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ES(e,t,r=G){var o,s;let n=this.constructor._$Eh(e,r);if(n!==void 0&&r.reflect===!0){let d=((s=(o=r.converter)===null||o===void 0?void 0:o.toAttribute)!==null&&s!==void 0?s:Q.toAttribute)(t,r.type);this._$Ei=e,d==null?this.removeAttribute(n):this.setAttribute(n,d),this._$Ei=null}}_$AK(e,t){var r,o,s;let n=this.constructor,d=n._$Eu.get(e);if(d!==void 0&&this._$Ei!==d){let a=n.getPropertyOptions(d),l=a.converter,b=(s=(o=(r=l)===null||r===void 0?void 0:r.fromAttribute)!==null&&o!==void 0?o:typeof l=="function"?l:null)!==null&&s!==void 0?s:Q.fromAttribute;this._$Ei=d,this[d]=b(t,a.type),this._$Ei=null}}requestUpdate(e,t,r){let o=!0;e!==void 0&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||pe)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),r.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,r))):o=!1),!this.isUpdatePending&&o&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((o,s)=>this[s]=o),this._$Et=void 0);let t=!1,r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),(e=this._$Eg)===null||e===void 0||e.forEach(o=>{var s;return(s=o.hostUpdate)===null||s===void 0?void 0:s.call(o)}),this.update(r)):this._$EU()}catch(o){throw t=!1,this._$EU(),o}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(r=>{var o;return(o=r.hostUpdated)===null||o===void 0?void 0:o.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,r)=>this._$ES(r,this[r],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}};x.finalized=!0,x.elementProperties=new Map,x.elementStyles=[],x.shadowRootOptions={mode:"open"},ue?.({ReactiveElement:x}),((X=globalThis.reactiveElementVersions)!==null&&X!==void 0?X:globalThis.reactiveElementVersions=[]).push("1.3.2");var ee,T=globalThis.trustedTypes,me=T?T.createPolicy("lit-html",{createHTML:i=>i}):void 0,S=`lit$${(Math.random()+"").slice(9)}$`,$e="?"+S,qe=`<${$e}>`,H=document,O=(i="")=>H.createComment(i),j=i=>i===null||typeof i!="object"&&typeof i!="function",_e=Array.isArray,Je=i=>{var e;return _e(i)||typeof((e=i)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ve=/-->/g,fe=/>/g,k=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ge=/'/g,be=/"/g,xe=/^(?:script|style|textarea|title)$/i,Ee=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),g=Ee(1),$=Ee(2),C=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ye=new WeakMap,Se=(i,e,t)=>{var r,o;let s=(r=t?.renderBefore)!==null&&r!==void 0?r:e,n=s._$litPart$;if(n===void 0){let d=(o=t?.renderBefore)!==null&&o!==void 0?o:null;s._$litPart$=n=new M(e.insertBefore(O(),d),d,void 0,t??{})}return n._$AI(i),n},R=H.createTreeWalker(H,129,null,!1),Ve=(i,e)=>{let t=i.length-1,r=[],o,s=e===2?"<svg>":"",n=I;for(let a=0;a<t;a++){let l=i[a],b,c,u=-1,y=0;for(;y<l.length&&(n.lastIndex=y,c=n.exec(l),c!==null);)y=n.lastIndex,n===I?c[1]==="!--"?n=ve:c[1]!==void 0?n=fe:c[2]!==void 0?(xe.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=k):c[3]!==void 0&&(n=k):n===k?c[0]===">"?(n=o??I,u=-1):c[1]===void 0?u=-2:(u=n.lastIndex-c[2].length,b=c[1],n=c[3]===void 0?k:c[3]==='"'?be:ge):n===be||n===ge?n=k:n===ve||n===fe?n=I:(n=k,o=void 0);let J=n===k&&i[a+1].startsWith("/>")?" ":"";s+=n===I?l+qe:u>=0?(r.push(b),l.slice(0,u)+"$lit$"+l.slice(u)+S+J):l+S+(u===-2?(r.push(void 0),a):J)}let d=s+(i[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[me!==void 0?me.createHTML(d):d,r]},P=class{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let s=0,n=0,d=e.length-1,a=this.parts,[l,b]=Ve(e,t);if(this.el=P.createElement(l,r),R.currentNode=this.el.content,t===2){let c=this.el.content,u=c.firstChild;u.remove(),c.append(...u.childNodes)}for(;(o=R.nextNode())!==null&&a.length<d;){if(o.nodeType===1){if(o.hasAttributes()){let c=[];for(let u of o.getAttributeNames())if(u.endsWith("$lit$")||u.startsWith(S)){let y=b[n++];if(c.push(u),y!==void 0){let J=o.getAttribute(y.toLowerCase()+"$lit$").split(S),V=/([.?@])?(.*)/.exec(y);a.push({type:1,index:s,name:V[2],strings:J,ctor:V[1]==="."?re:V[1]==="?"?oe:V[1]==="@"?ie:z})}else a.push({type:6,index:s})}for(let u of c)o.removeAttribute(u)}if(xe.test(o.tagName)){let c=o.textContent.split(S),u=c.length-1;if(u>0){o.textContent=T?T.emptyScript:"";for(let y=0;y<u;y++)o.append(c[y],O()),R.nextNode(),a.push({type:2,index:++s});o.append(c[u],O())}}}else if(o.nodeType===8)if(o.data===$e)a.push({type:2,index:s});else{let c=-1;for(;(c=o.data.indexOf(S,c+1))!==-1;)a.push({type:7,index:s}),c+=S.length-1}s++}}static createElement(e,t){let r=H.createElement("template");return r.innerHTML=e,r}};function U(i,e,t=i,r){var o,s,n,d;if(e===C)return e;let a=r!==void 0?(o=t._$Cl)===null||o===void 0?void 0:o[r]:t._$Cu,l=j(e)?void 0:e._$litDirective$;return a?.constructor!==l&&((s=a?._$AO)===null||s===void 0||s.call(a,!1),l===void 0?a=void 0:(a=new l(i),a._$AT(i,t,r)),r!==void 0?((n=(d=t)._$Cl)!==null&&n!==void 0?n:d._$Cl=[])[r]=a:t._$Cu=a),a!==void 0&&(e=U(i,a._$AS(i,e.values),a,r)),e}var te=class{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;let{el:{content:r},parts:o}=this._$AD,s=((t=e?.creationScope)!==null&&t!==void 0?t:H).importNode(r,!0);R.currentNode=s;let n=R.nextNode(),d=0,a=0,l=o[0];for(;l!==void 0;){if(d===l.index){let b;l.type===2?b=new M(n,n.nextSibling,this,e):l.type===1?b=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(b=new se(n,this,e)),this.v.push(b),l=o[++a]}d!==l?.index&&(n=R.nextNode(),d++)}return s}m(e){let t=0;for(let r of this.v)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},M=class{constructor(e,t,r,o){var s;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cg=(s=o?.isConnected)===null||s===void 0||s}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),j(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==C&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):Je(e)?this.S(e):this.$(e)}M(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.M(e))}$(e){this._$AH!==p&&j(this._$AH)?this._$AA.nextSibling.data=e:this.k(H.createTextNode(e)),this._$AH=e}T(e){var t;let{values:r,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=P.createElement(o.h,this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===s)this._$AH.m(r);else{let n=new te(s,this),d=n.p(this.options);n.m(r),this.k(d),this._$AH=n}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new P(e)),t}S(e){_e(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,o=0;for(let s of e)o===t.length?t.push(r=new M(this.M(O()),this.M(O()),this,this.options)):r=t[o],r._$AI(s),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)===null||r===void 0||r.call(this,!1,!0,t);e&&e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},z=class{constructor(e,t,r,o,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,o){let s=this.strings,n=!1;if(s===void 0)e=U(this,e,t,0),n=!j(e)||e!==this._$AH&&e!==C,n&&(this._$AH=e);else{let d=e,a,l;for(e=s[0],a=0;a<s.length-1;a++)l=U(this,d[r+a],t,a),l===C&&(l=this._$AH[a]),n||(n=!j(l)||l!==this._$AH[a]),l===p?e=p:e!==p&&(e+=(l??"")+s[a+1]),this._$AH[a]=l}n&&!o&&this.C(e)}C(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},re=class extends z{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===p?void 0:e}},Ke=T?T.emptyScript:"",oe=class extends z{constructor(){super(...arguments),this.type=4}C(e){e&&e!==p?this.element.setAttribute(this.name,Ke):this.element.removeAttribute(this.name)}},ie=class extends z{constructor(e,t,r,o,s){super(e,t,r,o,s),this.type=5}_$AI(e,t=this){var r;if((e=(r=U(this,e,t,0))!==null&&r!==void 0?r:p)===C)return;let o=this._$AH,s=e===p&&o!==p||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==p&&(o===p||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;typeof this._$AH=="function"?this._$AH.call((r=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&r!==void 0?r:this.element,e):this._$AH.handleEvent(e)}},se=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}};var we=window.litHtmlPolyfillSupport;we?.(P,M),((ee=globalThis.litHtmlVersions)!==null&&ee!==void 0?ee:globalThis.litHtmlVersions=[]).push("2.2.3");var ne,ae;var v=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;let r=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=r.firstChild),r}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return C}};v.finalized=!0,v._$litElement$=!0,(ne=globalThis.litElementHydrateSupport)===null||ne===void 0||ne.call(globalThis,{LitElement:v});var Ae=globalThis.litElementPolyfillSupport;Ae?.({LitElement:v});((ae=globalThis.litElementVersions)!==null&&ae!==void 0?ae:globalThis.litElementVersions=[]).push("3.2.0");var _=i=>e=>typeof e=="function"?((t,r)=>(window.customElements.define(t,r),r))(i,e):((t,r)=>{let{kind:o,elements:s}=r;return{kind:o,elements:s,finisher(n){window.customElements.define(t,n)}}})(i,e);var Fe=(i,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,i)}};function D(i){return(e,t)=>t!==void 0?((r,o,s)=>{o.constructor.createProperty(s,r)})(i,e,t):Fe(i,e)}var L=({finisher:i,descriptor:e})=>(t,r)=>{var o;if(r===void 0){let s=(o=t.originalKey)!==null&&o!==void 0?o:t.key,n=e!=null?{kind:"method",placement:"prototype",key:s,descriptor:e(t.key)}:{...t,key:s};return i!=null&&(n.finisher=function(d){i(d,s)}),n}{let s=t.constructor;e!==void 0&&Object.defineProperty(t,r,e(r)),i?.(s,r)}};function f(i,e){return L({descriptor:t=>{let r={get(){var o,s;return(s=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(i))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0};if(e){let o=typeof t=="symbol"?Symbol():"__"+t;r.get=function(){var s,n;return this[o]===void 0&&(this[o]=(n=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(i))!==null&&n!==void 0?n:null),this[o]}}return r}})}var le,Pt=((le=window.HTMLSlotElement)===null||le===void 0?void 0:le.prototype.assignedElements)!=null?(i,e)=>i.assignedElements(e):(i,e)=>i.assignedNodes(e).filter(t=>t.nodeType===Node.ELEMENT_NODE);function*ke(i,e){if(i!==void 0){let t=0;for(let r of i)yield e(r,t++)}}import{ShowNotification as We}from"https://paragon.pages.dev/js/paragon.js";var W=$`<svg class="ionicon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m350.5 148.7-26.6-42A28.8 28.8 0 0 0 302 96h-92c-8.6 0-16.3 4-22 10.6l-26.5 42c-5.7 6.6-12.9 11.4-21.5 11.4H80a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h352a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32h-59c-8.7 0-16.9-4.8-22.5-11.3z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" style="stroke:#323232"/><circle cx="256" cy="272" r="80" fill="none" stroke-miterlimit="10" stroke-width="32" style="stroke:#323232"/><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M124 158v-22h-24v22" style="stroke:#323232"/></svg>`;var Ce=m`:host {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: black;
}

video {
    width: 100%;
    height: 100%;
}

button {
    border: none;
    background: none;
    cursor: pointer;
}

button * {
    cursor: pointer;
}

.scan {
    position: absolute;
    bottom: 1rem;
    left: calc(50% - 2rem);

    width: 5rem;
    height: 5rem;

    background-color: var(--surface2);

    border-radius: 100%;
    border: solid 0.5rem var(--surface4);

    box-shadow: hsl(var(--main-hue) 10% 10%) var(--shadow-x) var(--shadow-y) var(--shadow-spread);
}

.scan > svg {
    width: 3rem;
    height: 3rem;
}`;var A=class extends v{constructor(){super();this.barcodeDetector=new BarcodeDetector({formats:["code_128"]});this.Scan()}static async Scan(){let t=document.createElement("barcode-scanner");document.body.appendChild(t);let r=await t.Scan();return t.remove(),r}Scan(){return new Promise(async(t,r)=>{let o=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:!1}).catch(()=>r());o!==void 0&&(this.cameraVideo.srcObject=o,await this.cameraVideo.play(),this.barcodeResolve=t)})}async ResolveScan(){let t=await this.barcodeDetector.detect(this.cameraVideo);this.barcodeResolve(t[0].rawValue)}render(){return g`
        <video id="camera"></video>
        <button title="Scan" class="scan" @click="${this.ResolveScan}">
            ${W}
        </button>
        `}};A.styles=[Ce],h([f("#camera",!0)],A.prototype,"cameraVideo",2),A=h([_("barcode-scanner")],A);var Pe=$`<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#323232" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M304 96h112v112m-10.2-101.8L112 400m96 16H96V304"/></svg>`;var Me=$`<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#323232" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M110 387.5 251 496l141-108.5M251 16v476.7"/></svg>`;var Le=$`<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m432 144-28.7 275.7a32 32 0 0 1-31.8 28.3h-231a32 32 0 0 1-31.8-28.3L80 144" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" stroke="#323232"/><rect x="32" y="64" width="448" height="80" rx="16" ry="16" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" stroke="#323232"/><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" stroke="#323232" d="M312 240 200 352m112 0L200 240"/></svg>`;var Re=m`:where(img, svg) {
    filter: invert(var(--img-invert)) hue-rotate(var(--hue-rotate));
    cursor: default;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}

svg {
    width: inherit;
    height: inherit;
}`;var Te=m`:where(input[type=search]) {
    border: none;
    border-bottom: solid 0.05rem var(--text2);
    border-radius: 0;

    background-color: var(--surface2);
    color: var(--text1);

    font-size: 1rem;
    font-family: monospace;

    height: 2rem;

    user-select: text;
}

:where(input[type=search]:focus-visible) {
    box-shadow: 0 0 0 0.4rem var(--surface4), var(--shadow);
    border-radius: 0.1rem;
    outline: none;
}

:where(input[type=search])::-webkit-input-placeholder {
    color: var(--text3);
}

:where(input[type=search])::-moz-placeholder {
    color: var(--text3);
}

:where(input[type=search])::-webkit-search-cancel-button {
    -webkit-appearance: none;
}`;var He=m`:host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    padding: 2rem;
    border-radius: 1rem;
    box-shadow: var(--shadow);
}

.barcode-container {
    position: relative;
    width: 100%;
    height: 8.5rem
}

#barcode {
    width: 100%;
    height: 100%;
    filter: contrast(5);
}

.barcode-container:hover > #barcode,
.barcode-container:focus > #barcode,
.barcode-container:focus-within > #barcode {
    filter: blur(5px);
}

.button-container {
    position: absolute;
    top: 0;
    left: 0;

    display: none;
    align-items: center;
    justify-content: space-around;

    width: 100%;
    height: 100%;
}

.barcode-container:hover > .button-container,
.barcode-container:focus > .button-container,
.barcode-container:focus-within > .button-container {
    display: flex;
}

button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
}

button * {
    cursor: pointer;
}

a, a * {
    cursor: pointer;
}

.preview-option {
    width: 3rem;
    height: 3rem;

    background-color: var(--surface2);

    border-radius: 1.5rem;

    padding: 0.5rem;
    box-sizing: border-box;
    
    box-shadow: hsl(var(--main-hue) 10% 10%) var(--shadow-x) var(--shadow-y) var(--shadow-spread);
}

.preview-option > svg {
    width: 100%;
    height: 100%;
}

.preview-option:focus-visible {
    box-shadow: 0 0 0 0.4rem var(--surface4), var(--shadow),
                hsl(var(--main-hue) 10% 10%) var(--shadow-x) var(--shadow-y) var(--shadow-spread);
    outline: none;
}

.barcode-input-container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    width: 100%;
    margin-top: 0.5rem;
}

#barcode-input {
    flex: 1;
    min-width: 0;
}

#scan {
    width: 2rem;
    height: 2rem;
}`;var w=class extends v{constructor(){super(...arguments);this.supportsBarcodeDetector="BarcodeDetector"in window}InputBarcode(t){let r=t.target.value,o=JSON.parse(localStorage.getItem("Barcodes")||"[]");o.splice(this.index,1,r),localStorage.setItem("Barcodes",JSON.stringify(o)),document.getElementById("barcodes").requestUpdate()}Show(){if(this.barcode==""){We("cant-open-barcode","You must enter a barcode first!");return}let t=document.getElementById("barcode-overlay");t.style.display="block",t.barcode=this.barcode}Delete(){if(!confirm(`Do you want to delete ${this.barcode.trim()==""?"this empty barcode":`the barcode for ${this.barcode}`}?`))return;let t=JSON.parse(localStorage.getItem("Barcodes")||"[]");t.splice(this.index,1),localStorage.setItem("Barcodes",JSON.stringify(t)),document.getElementById("barcodes").requestUpdate()}async Scan(){let t=await A.Scan();this.barcode=t,this.barcodeInput.value=t;let r=JSON.parse(localStorage.getItem("Barcodes")||"[]");r.splice(this.index,1,t),localStorage.setItem("Barcodes",JSON.stringify(r))}updated(){if(this.barcodeInput.value=this.barcode,this.barcode=="")this.barcodeCanvas.style.display="none";else if(typeof JsBarcode=="function"){this.barcodeCanvas.removeAttribute("style"),JsBarcode(this.barcodeCanvas,this.barcode,{displayValue:!1,margin:0});let t=this.barcodeCanvas.toDataURL("image/png");if(this.downloadLink===null)return;this.downloadLink.href=t,this.downloadLink.download=`${this.barcode} Barcode.png`}}render(){return g`
        <div class="barcode-container" tabindex="0">
            <canvas id="barcode" width="20" height="20"></canvas>

            <div class="button-container">
                <button class="preview-option" title="Show" @click="${this.Show}">${Pe}</button>
                <a id="download-link" class="preview-option" title="Download">${Me}</a>
                <button class="preview-option" title="Delete" @click="${this.Delete}">${Le}</button>
            </div>
        </div>

        <div class="barcode-input-container">
            <input id="barcode-input" type="search" value="${this.barcode}" @input="${this.InputBarcode}">
            ${this.supportsBarcodeDetector?g`<button title="scan" id="scan" @click="${this.Scan}">
                ${W}
            </button>`:p}
        </div>
        `}};w.styles=[Re,Te,He],h([D()],w.prototype,"barcode",2),h([D({type:Number})],w.prototype,"index",2),h([f("#download-link")],w.prototype,"downloadLink",2),h([f("#barcode",!0)],w.prototype,"barcodeCanvas",2),h([f("#scan",!0)],w.prototype,"scanButton",2),h([f("#barcode-input")],w.prototype,"barcodeInput",2),w=h([_("barcode-preview")],w);var Ue=$`<svg width="210" height="210" viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg"><path d="M5 105a100 100 0 1 1 200 0 100 100 0 0 1-200 0Z" fill="none" stroke="var(--text3)" stroke-width="5"/><text style="fill:var(--text3);font-family:Arial,sans-serif;font-size:200px;white-space:pre" x="41.6" y="167.3" transform="translate(5 5)">+</text></svg>`;var ze=m`:root {
    font-size: var(--font-size);
    font-weight: 400;
    color: var(--text1);
    cursor: default;

    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}

:where(h1, h2, h3, h4, h5, h6, p) {
    margin: 0;
}

:where(*) {
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    cursor: inherit;

    user-select: var(--user-select, inherit);
    -ms-user-select: var(--user-select, inherit);
    -moz-user-select: var(--user-select, inherit);
    -webkit-user-select: var(--user-select, inherit);
}

:where(h1) {
    font-size: 2rem;
}

:where(h2) {
    font-size: 1.5rem;
}

:where(h3) {
    font-size: 1.4rem;
}

:where(h4) {
    font-size: 1.3rem;
}

:where(h5) {
    font-size: 1.2rem;
}

:where(h6) {
    font-size: 1rem;
}

:where(b, strong) {
    font-weight: 600;
}

:where(.a) {
    all: unset;
}

:where(a, .a) {
    color: var(--text2);
    text-decoration: none;
    cursor: pointer;
}

:where(a:hover, .a:hover) {
    text-decoration: underline;
}

:where(a:focus-visible, .a:focus-visible) {
    box-shadow: 0 0 0 0.4rem var(--surface4);
    border-radius: 0.05rem;
    outline: none;
}

:where(blockquote) {
    border-left: calc(var(--font-size) / 2) solid var(--surface4);
    margin: 0;
    padding-left: calc(var(--font-size) / 4 * 3);
}`;var De=m`:host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 2rem;
    border-radius: 1rem;
    border: dashed 0.1rem var(--text3);

    cursor: pointer;

    --user-select: none;
}

p {
    color: var(--text3);
    margin-bottom: 0;
    margin-top: 2.5rem;
}`;var q=class extends v{constructor(){super(),this.addEventListener("click",this.CreateBarcode),this.addEventListener("keypress",e=>{e.key=="Enter"&&this.CreateBarcode()})}CreateBarcode(){let e=JSON.parse(localStorage.getItem("Barcodes")||"[]");e.push(window.studentId??"test"),localStorage.setItem("Barcodes",JSON.stringify(e)),document.getElementById("barcodes").requestUpdate()}render(){return g`
        ${Ue}
        <p>New Barcode</p>
        `}};q.styles=[ze,De],q=h([_("new-barcode")],q);var Ne=m`#barcodes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    grid-auto-rows: 15rem;
    gap: 3rem;
}`;var N=class extends v{constructor(){super(...arguments);this.barcodes=JSON.parse(localStorage.getItem("Barcodes")??"[]")}renderBarcodes(){for(let t of this.barcodePreviews.children)t.requestUpdate()}render(){return this.barcodes=JSON.parse(localStorage.getItem("Barcodes")??"[]"),g`
        <div id="barcodes">
            ${ke(this.barcodes,(t,r)=>g`<barcode-preview index="${r}" barcode="${t}"></barcode-preview>`)}
            <new-barcode role="button" tabindex="0"></new-barcode>
        </div>
        `}};N.styles=[Ne],h([f("#barcodes",!0)],N.prototype,"barcodePreviews",2),N=h([_("barcodes-display")],N);import{GetDark as Ye,ListenForDark as Ze}from"https://paragon.pages.dev/js/paragon.js";var Be=m`:host {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.5);

    touch-action: none;
}

#point1,
#point2 {
    --size: 1.2rem;

    position: absolute;

    width: var(--size);
    height: var(--size);

    background-color: var(--surface4);
    border-radius: calc(var(--size) / 2);

    transform: translate(-50%, -50%);

    z-index: 3;

    cursor: move;
}

#point1:focus-visible,
#point2:focus-visible {
    outline: none;
    background-color: var(--surface2);
    box-shadow: 0 0 0 0.4rem var(--surface4), var(--shadow);;
}

#point1::after,
#point2::after {
    content: "";

    display: block;

    width: calc(var(--size) * 2);
    height: calc(var(--size) * 2);

    margin: calc(var(--size) / -2);
}

#barcode-canvas {
    position: absolute;

    box-sizing: border-box;

    filter: contrast(5);

    z-index: 2;
}

#barcode-canvas.outline {
    border: solid 1.5rem var(--text1);
}

#save {
    width: 1.7rem;
    height: 1.7rem;
    position: absolute;
    top: 1.25%;
    right: 1.25%;
    border-radius: 0.25rem;
}`;function Xe(i,e){let t;return(...r)=>{clearTimeout(t),t=setTimeout(()=>{i.apply(this,r)},e)}}var E=class extends v{constructor(){super();this.rect=this.getBoundingClientRect();this.draggedElement=null;this.dragging=!1;this.Resize=Xe(()=>{this.rect=this.getBoundingClientRect()},300).bind(this);this.DragPoint=(t=>{if(this.draggedElement!=null&&(t.preventDefault(),!this.dragging)){this.dragging=!0;let r=(t.clientX-this.rect.left)/this.rect.width*100,o=(t.clientY-this.rect.top)/this.rect.height*100;r=Math.max(0,Math.min(100,r)),o=Math.max(0,Math.min(100,o)),this.draggedElement.style.left=`${r}%`,this.draggedElement.style.top=`${o}%`,this.SetBarcodePosition(),this.dragging=!1}}).bind(this);this.addEventListener("click",this.Close),this.addEventListener("pointerup",this.EndDrag),document.addEventListener("pointermove",this.DragPoint),window.addEventListener("resize",this.Resize),Ze(t=>{this.canvas?.classList.toggle("outline",t)})}createRenderRoot(){let t=super.createRenderRoot();return t.addEventListener("click",r=>{console.log(r),r.stopImmediatePropagation()}),t}disconnectedCallback(){document.removeEventListener("pointermove",this.DragPoint),window.removeEventListener("resize",this.Resize)}Close(t){this.EndDrag(),this.style.display="none",t.stopPropagation()}StartDrag(t){t.preventDefault(),this.draggedElement=t.target,this.style.cursor="move"}EndDrag(){this.draggedElement=null,this.style.removeProperty("cursor"),this.SaveBarcodePosition()}MovePointKeys(t){let r=t.target,o=parseFloat(r.style.left.substring(0,r.style.left.length-1)||"0"),s=parseFloat(r.style.top.substring(0,r.style.top.length-1)||"0");t.key=="ArrowLeft"?(o-=2,t.preventDefault()):t.key=="ArrowRight"?(o+=2,t.preventDefault()):t.key=="ArrowUp"?(s-=2,t.preventDefault()):t.key=="ArrowDown"&&(s+=2,t.preventDefault()),o=Math.max(0,Math.min(100,o)),s=Math.max(0,Math.min(100,s)),r.style.left=`${o}%`,r.style.top=`${s}%`,this.SetBarcodePosition(),this.SaveBarcodePosition()}SetBarcodePosition(){if(this.canvas===null)return;let t=parseFloat(this.point1?.style.left.substring(0,this.point1?.style.left.length-1)||"0"),r=parseFloat(this.point1?.style.top.substring(0,this.point1?.style.top.length-1)||"0"),o=parseFloat(this.point2?.style.left.substring(0,this.point2?.style.left.length-1)||"0"),s=parseFloat(this.point2?.style.top.substring(0,this.point2?.style.top.length-1)||"0"),n=Math.max(t,o),d=Math.min(t,o),a=Math.max(r,s),l=Math.min(r,s);this.canvas.style.left=`${d}%`,this.canvas.style.top=`${l}%`,this.canvas.style.width=`${n-d}%`,this.canvas.style.height=`${a-l}%`}RenderBarcode(){this.draggedElement===null&&this.canvas!==null&&this.barcode!==void 0&&typeof JsBarcode=="function"&&JsBarcode(this.canvas,this.barcode,{displayValue:!1,margin:0})}SaveBarcodePosition(){this.point1!==null&&this.point2!==null&&localStorage.setItem("Barcode Points",JSON.stringify([this.point1.style.left,this.point1.style.top,this.point2.style.left,this.point2.style.top]))}updated(){this.SetBarcodePosition(),this.RenderBarcode(),this.rect=this.getBoundingClientRect()}render(){let t=localStorage.getItem("Barcode Points"),r=["10%","10%","90%","50%"];return t&&(r=JSON.parse(t)),g`
        <div id="point1" style="left: ${r[0]}; top: ${r[1]};" tabindex="0" @keydown="${this.MovePointKeys}" @pointerdown="${this.StartDrag}"></div>
        <div id="point2" style="left: ${r[2]}; top: ${r[3]};" tabindex="0" @keydown="${this.MovePointKeys}" @pointerdown="${this.StartDrag}"></div>

        <canvas id="barcode-canvas" class="${Ye()?"outline":""}" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `}};E.styles=[Be],h([D()],E.prototype,"barcode",2),h([f("#barcode-canvas")],E.prototype,"canvas",2),h([f("#point1")],E.prototype,"point1",2),h([f("#point2")],E.prototype,"point2",2),E=h([_("barcode-overlay")],E);import{Init as Ge,GetResource as Qe}from"https://paragon.pages.dev/js/paragon.js";window.studentId=void 0;Ge().then(async()=>{Qe("userinfo",i=>{window.studentId=i.studentId})});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
