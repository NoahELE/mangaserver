import{r as h,c as X,R as Z}from"./react-46429a99.js";import{u as V,a as N,b as z,c as ee,R as te}from"./router-fcdb626d.js";import{A as re,a as b}from"./axios-c2e7748b.js";import{B as M,T as w,C as F,S as H,a as B,D as O,R as q,F as C,I as A,b as ne,c as K}from"./antd-0a849525.js";import{c as ae}from"./zustand-e7320a0e.js";import{c as W}from"./lodash-e042c751.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerpolicy&&(t.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?t.credentials="include":n.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(n){if(n.ep)return;n.ep=!0;const t=o(n);fetch(n.href,t)}})();var x={},oe={get exports(){return x},set exports(e){x=e}},j={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var se=h,ie=Symbol.for("react.element"),le=Symbol.for("react.fragment"),ce=Object.prototype.hasOwnProperty,ue=se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,de={key:!0,ref:!0,__self:!0,__source:!0};function Y(e,r,o){var a,n={},t=null,l=null;o!==void 0&&(t=""+o),r.key!==void 0&&(t=""+r.key),r.ref!==void 0&&(l=r.ref);for(a in r)ce.call(r,a)&&!de.hasOwnProperty(a)&&(n[a]=r[a]);if(e&&e.defaultProps)for(a in r=e.defaultProps,r)n[a]===void 0&&(n[a]=r[a]);return{$$typeof:ie,type:e,key:t,ref:l,props:n,_owner:ue.current}}j.Fragment=le;j.jsx=Y;j.jsxs=Y;(function(e){e.exports=j})(oe);const P=x.Fragment,s=x.jsx,g=x.jsxs;var k={},J=X;k.createRoot=J.createRoot,k.hydrateRoot=J.hydrateRoot;const{Title:me,Paragraph:fe}=w,D={margin:"20px 10px"};function T(){const e=V(),r=N();let o;return e instanceof re&&e.response&&(o=`${e.name}
${e.message}
${e.response.status}
${e.response.statusText}`),e instanceof Error?o=`${e.name}
${e.message}`:o=e+"",g(P,{children:[s(me,{style:D,children:"Error"}),s(fe,{code:!0,copyable:!0,style:{margin:20},children:o}),s(M,{type:"primary",onClick:()=>r("/login"),style:D,children:"Login"}),s(M,{type:"default",onClick:()=>r(-1),style:D,children:"Return to Last Page"})]})}function he(e){let r;try{r=e()}catch{return}return{getItem:a=>{var n;const t=f=>f===null?null:JSON.parse(f),l=(n=r.getItem(a))!=null?n:null;return l instanceof Promise?l.then(t):t(l)},setItem:(a,n)=>r.setItem(a,JSON.stringify(n)),removeItem:a=>r.removeItem(a)}}const L=e=>r=>{try{const o=e(r);return o instanceof Promise?o:{then(a){return L(a)(o)},catch(a){return this}}}catch(o){return{then(a){return this},catch(a){return L(a)(o)}}}},ge=(e,r)=>(o,a,n)=>{let t={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:i=>i,version:0,merge:(i,u)=>({...u,...i}),...r},l=!1;const f=new Set,p=new Set;let m;try{m=t.getStorage()}catch{}if(!m)return e((...i)=>{console.warn(`[zustand persist middleware] Unable to update item '${t.name}', the given storage is currently unavailable.`),o(...i)},a,n);const E=L(t.serialize),I=()=>{const i=t.partialize({...a()});let u;const d=E({state:i,version:t.version}).then(S=>m.setItem(t.name,S)).catch(S=>{u=S});if(u)throw u;return d},$=n.setState;n.setState=(i,u)=>{$(i,u),I()};const y=e((...i)=>{o(...i),I()},a,n);let v;const c=()=>{var i;if(!m)return;l=!1,f.forEach(d=>d(a()));const u=((i=t.onRehydrateStorage)==null?void 0:i.call(t,a()))||void 0;return L(m.getItem.bind(m))(t.name).then(d=>{if(d)return t.deserialize(d)}).then(d=>{if(d)if(typeof d.version=="number"&&d.version!==t.version){if(t.migrate)return t.migrate(d.state,d.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return d.state}).then(d=>{var S;return v=t.merge(d,(S=a())!=null?S:y),o(v,!0),I()}).then(()=>{u==null||u(v,void 0),l=!0,p.forEach(d=>d(v))}).catch(d=>{u==null||u(void 0,d)})};return n.persist={setOptions:i=>{t={...t,...i},i.getStorage&&(m=i.getStorage())},clearStorage:()=>{m==null||m.removeItem(t.name)},getOptions:()=>t,rehydrate:()=>c(),hasHydrated:()=>l,onHydrate:i=>(f.add(i),()=>{f.delete(i)}),onFinishHydration:i=>(p.add(i),()=>{p.delete(i)})},c(),v||y},pe=(e,r)=>(o,a,n)=>{let t={storage:he(()=>localStorage),partialize:c=>c,version:0,merge:(c,i)=>({...i,...c}),...r},l=!1;const f=new Set,p=new Set;let m=t.storage;if(!m)return e((...c)=>{console.warn(`[zustand persist middleware] Unable to update item '${t.name}', the given storage is currently unavailable.`),o(...c)},a,n);const E=()=>{const c=t.partialize({...a()});return m.setItem(t.name,{state:c,version:t.version})},I=n.setState;n.setState=(c,i)=>{I(c,i),E()};const $=e((...c)=>{o(...c),E()},a,n);let y;const v=()=>{var c;if(!m)return;l=!1,f.forEach(u=>u(a()));const i=((c=t.onRehydrateStorage)==null?void 0:c.call(t,a()))||void 0;return L(m.getItem.bind(m))(t.name).then(u=>{if(u)if(typeof u.version=="number"&&u.version!==t.version){if(t.migrate)return t.migrate(u.state,u.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return u.state}).then(u=>{var d;return y=t.merge(u,(d=a())!=null?d:$),o(y,!0),E()}).then(()=>{i==null||i(y,void 0),l=!0,p.forEach(u=>u(y))}).catch(u=>{i==null||i(void 0,u)})};return n.persist={setOptions:c=>{t={...t,...c},c.storage&&(m=c.storage)},clearStorage:()=>{m==null||m.removeItem(t.name)},getOptions:()=>t,rehydrate:()=>v(),hasHydrated:()=>l,onHydrate:c=>(f.add(c),()=>{f.delete(c)}),onFinishHydration:c=>(p.add(c),()=>{p.delete(c)})},v(),y||$},ye=(e,r)=>"getStorage"in r||"serialize"in r||"deserialize"in r?(({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Please use `storage` option instead."),ge(e,r)):pe(e,r),ve=ye,G=ae()(ve(e=>({jwt:"",setJwt(r){e({jwt:r})}}),{name:"mangaserver-storage"}));b.defaults.baseURL="/api";function _(){const{jwt:e}=G.getState();if(e.length!==0)b.defaults.headers.common.Authorization=`Bearer ${e}`;else throw new Error("jwt is empty")}async function be(e){const{data:r}=await b.post("/user/login",e);return r}async function Se(){_();const{data:e}=await b.get("/library");return e}async function we(e){_();const{data:r}=await b.get(`/library/${e}/listManga`);return r}async function Ee(e){_(),await b.get(`/library/${e}/scanManga`)}async function Ie(e){_();const{data:r}=await b.get(`/manga/${e}`);return r}async function Q(e,r){_();const{data:o}=await b.get(`/manga/${e}/page/${r}`,{responseType:"blob"});return URL.createObjectURL(o)}const{Meta:Re}=F;function xe({manga:e}){const{id:r,name:o,path:a}=e,n=N(),[t,l]=h.useState(null);return h.useEffect(()=>{Q(e.id,0).then(l)},[e.id]),s(F,{hoverable:!0,onClick:()=>n(`/manga/${r}`),cover:t===null?s(H,{}):s("img",{src:t}),children:s(Re,{title:o,description:a})})}const{Title:Le}=w;function Pe(){const{libraryId:e}=z();if(e===void 0)throw new Error("libraryId does not exist");const r=+e;if(isNaN(r))throw new Error("libraryId is not a number");const[o,a]=h.useState([]),[n,t]=h.useState(null);if(n!==null)throw n;h.useEffect(()=>{we(r).then(a).catch(t)},[r]);const l=W(o,4).map(f=>f.map(p=>s(B,{span:6,children:s(xe,{manga:p})},p.id)));return g(P,{children:[s(Le,{children:"Manga List"}),s(M,{type:"default",onClick:()=>Ee(r).catch(t),children:"Scan Manga"}),s(O,{}),g(q,{gutter:[16,16],children:[...l]})]})}function _e({library:{id:e,name:r,path:o}}){const a=N();return s(F,{title:r,hoverable:!0,onClick:()=>a(`/library/${e}`),children:o})}const{Title:$e}=w;function Ce(){const[e,r]=h.useState([]),[o,a]=h.useState(null);if(o!==null)throw o;h.useEffect(()=>{Se().then(r).catch(a)},[]);const n=W(e,4).map(t=>t.map(l=>s(B,{span:6,children:s(_e,{library:l})},l.id)));return g(P,{children:[s($e,{children:"Library List"}),s(O,{}),g(q,{gutter:[16,16],children:[...n]})]})}const{Title:Te}=w;function Me(){const e=N(),r=G(n=>n.setJwt),[o,a]=h.useState(null);if(o!==null)throw o;return g(P,{children:[s(Te,{style:{textAlign:"center",margin:"100px 0"},children:"MangaServer"}),g(C,{labelCol:{span:8},wrapperCol:{span:12},onFinish:n=>{be(n).then(t=>{r(t),e("/")}).catch(a)},style:{margin:"0 400px"},children:[s(C.Item,{name:"username",label:"Username",rules:[{required:!0,message:"please input your username"}],children:s(A,{})}),s(C.Item,{name:"password",label:"Password",rules:[{required:!0,message:"please input your password"}],children:s(A.Password,{})}),s(C.Item,{wrapperCol:{offset:8,span:16},children:s(M,{type:"primary",htmlType:"submit",children:"Login"})})]})]})}function Oe(){return s("div",{style:{position:"absolute",top:0,left:0,bottom:0,right:0,display:"flex",justifyContent:"center",alignItems:"center"},children:s(H,{size:"large"})})}const{Text:Ne}=w;function je({manga:e,pageId:r}){const[o,a]=h.useState(null),[n,t]=h.useState(null);if(n!==null)throw n;return h.useEffect(()=>{Q(e.id,r).then(a).catch(t)},[e.id,r]),o===null?s(H,{}):g("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[s(ne,{alt:`page ${r}`,src:o,width:"75%",preview:!1,placeholder:!0}),g(Ne,{type:"secondary",children:[r+1,"/",e.numOfPages]})]})}const{Title:De}=w,{Item:R}=K;function ke(){const{mangaId:e}=z();if(e===void 0)throw new Error("mangaId does not exist");const r=+e;if(isNaN(r))throw new Error("mangaId is not a number");const[o,a]=h.useState(null),[n,t]=h.useState(null);if(n!==null)throw n;if(h.useEffect(()=>{Ie(r).then(a).catch(t)},[r]),o===null)return s(Oe,{});{const l=[];for(let f=0;f<o.numOfPages;f++)l.push(s(je,{manga:o,pageId:f},f));return g(P,{children:[s(De,{children:o.name}),s(O,{}),g(K,{bordered:!0,column:2,children:[s(R,{label:"Name",children:o.name}),s(R,{label:"Path",children:o.path}),s(R,{label:"Ext",children:o.ext}),s(R,{label:"Number of Pages",children:o.numOfPages}),s(R,{label:"Library",children:o.library.name})]}),s(O,{}),...l]})}}const Fe=ee([{path:"/",element:s(Ce,{}),errorElement:s(T,{})},{path:"/login",element:s(Me,{}),errorElement:s(T,{})},{path:"/library/:libraryId",element:s(Pe,{}),errorElement:s(T,{})},{path:"/manga/:mangaId",element:s(ke,{}),errorElement:s(T,{})}]),U=document.getElementById("root");U!==null&&k.createRoot(U).render(s(Z.StrictMode,{children:s(te,{router:Fe})}));
