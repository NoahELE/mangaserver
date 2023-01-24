import{r as g,g as j}from"./react-46429a99.js";const w=e=>{let t;const n=new Set,o=(s,p)=>{const c=typeof s=="function"?s(t):s;if(!Object.is(c,t)){const a=t;t=p??typeof c!="object"?c:Object.assign({},t,c),n.forEach(S=>S(t,a))}},r=()=>t,f={setState:o,getState:r,subscribe:s=>(n.add(s),()=>n.delete(s)),destroy:()=>{({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&console.warn("[DEPRECATED] The destroy method will be unsupported in the future version. You should use unsubscribe function returned by subscribe. Everything will be garbage collected if store is garbage collected."),n.clear()}};return t=e(o,r,f),f},R=e=>e?w(e):w;var y={},V={get exports(){return y},set exports(e){y=e}},b={},x={},$={get exports(){return x},set exports(e){x=e}},O={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=g;function P(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var _=typeof Object.is=="function"?Object.is:P,A=v.useState,B=v.useEffect,C=v.useLayoutEffect,L=v.useDebugValue;function M(e,t){var n=t(),o=A({inst:{value:n,getSnapshot:t}}),r=o[0].inst,u=o[1];return C(function(){r.value=n,r.getSnapshot=t,h(r)&&u({inst:r})},[e,n,t]),B(function(){return h(r)&&u({inst:r}),e(function(){h(r)&&u({inst:r})})},[e]),L(n),n}function h(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!_(e,n)}catch{return!0}}function T(e,t){return t()}var k=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?T:M;O.useSyncExternalStore=v.useSyncExternalStore!==void 0?v.useSyncExternalStore:k;(function(e){e.exports=O})($);/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=g,q=x;function I(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var U=typeof Object.is=="function"?Object.is:I,W=q.useSyncExternalStore,z=E.useRef,F=E.useEffect,Y=E.useMemo,G=E.useDebugValue;b.useSyncExternalStoreWithSelector=function(e,t,n,o,r){var u=z(null);if(u.current===null){var l={hasValue:!1,value:null};u.current=l}else l=u.current;u=Y(function(){function s(i){if(!p){if(p=!0,c=i,i=o(i),r!==void 0&&l.hasValue){var d=l.value;if(r(d,i))return a=d}return a=i}if(d=a,U(c,i))return d;var m=o(i);return r!==void 0&&r(d,m)?d:(c=i,a=m)}var p=!1,c,a,S=n===void 0?null:n;return[function(){return s(t())},S===null?void 0:function(){return s(S())}]},[t,n,o,r]);var f=W(e,u[0],u[1]);return F(function(){l.hasValue=!0,l.value=f},[f]),G(f),f};(function(e){e.exports=b})(V);const H=j(y),{useSyncExternalStoreWithSelector:J}=H;function K(e,t=e.getState,n){const o=J(e.subscribe,e.getState,e.getServerState||e.getState,t,n);return g.useDebugValue(o),o}const D=e=>{({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&typeof e!="function"&&console.warn('[DEPRECATED] Passing a vanilla store will be unsupported in the future version. Please use `import { useStore } from "zustand"` to use the vanilla store in React.');const t=typeof e=="function"?R(e):e,n=(o,r)=>K(t,o,r);return Object.assign(n,t),n},Q=e=>e?D(e):D;export{Q as c};