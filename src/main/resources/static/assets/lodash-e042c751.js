var T=typeof global=="object"&&global&&global.Object===Object&&global;const j=T;var l=typeof self=="object"&&self&&self.Object===Object&&self,m=j||l||Function("return this")();const S=m;var I=S.Symbol;const c=I;var u=Object.prototype,O=u.hasOwnProperty,d=u.toString,f=c?c.toStringTag:void 0;function h(t){var r=O.call(t,f),n=t[f];try{t[f]=void 0;var o=!0}catch{}var e=d.call(t);return o&&(r?t[f]=n:delete t[f]),e}var $=Object.prototype,A=$.toString;function x(t){return A.call(t)}var E="[object Null]",F="[object Undefined]",a=c?c.toStringTag:void 0;function p(t){return t==null?t===void 0?F:E:a&&a in Object(t)?h(t):x(t)}function N(t){return t!=null&&typeof t=="object"}var w="[object Symbol]";function G(t){return typeof t=="symbol"||N(t)&&p(t)==w}var M=/\s/;function P(t){for(var r=t.length;r--&&M.test(t.charAt(r)););return r}var _=/^\s+/;function R(t){return t&&t.slice(0,P(t)+1).replace(_,"")}function b(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}var y=0/0,k=/^[-+]0x[0-9a-f]+$/i,B=/^0b[01]+$/i,L=/^0o[0-7]+$/i,X=parseInt;function C(t){if(typeof t=="number")return t;if(G(t))return y;if(b(t)){var r=typeof t.valueOf=="function"?t.valueOf():t;t=b(r)?r+"":r}if(typeof t!="string")return t===0?t:+t;t=R(t);var n=B.test(t);return n||L.test(t)?X(t.slice(2),n?2:8):k.test(t)?y:+t}var g=1/0,U=17976931348623157e292;function q(t){if(!t)return t===0?t:0;if(t=C(t),t===g||t===-g){var r=t<0?-1:1;return r*U}return t===t?t:0}function H(t){var r=q(t),n=r%1;return r===r?n?r-n:r:0}var W="[object AsyncFunction]",Y="[object Function]",D="[object GeneratorFunction]",J="[object Proxy]";function K(t){if(!b(t))return!1;var r=p(t);return r==Y||r==D||r==W||r==J}var Q=9007199254740991,V=/^(?:0|[1-9]\d*)$/;function Z(t,r){var n=typeof t;return r=r??Q,!!r&&(n=="number"||n!="symbol"&&V.test(t))&&t>-1&&t%1==0&&t<r}function v(t,r){return t===r||t!==t&&r!==r}var z=9007199254740991;function tt(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=z}function rt(t){return t!=null&&tt(t.length)&&!K(t)}function nt(t,r,n){if(!b(n))return!1;var o=typeof r;return(o=="number"?rt(n)&&Z(r,n.length):o=="string"&&r in n)?v(n[r],t):!1}function et(t,r,n){var o=-1,e=t.length;r<0&&(r=-r>e?0:e+r),n=n>e?e:n,n<0&&(n+=e),e=r>n?0:n-r>>>0,r>>>=0;for(var i=Array(e);++o<e;)i[o]=t[o+r];return i}var ot=Math.ceil,it=Math.max;function ft(t,r,n){(n?nt(t,r,n):r===void 0)?r=1:r=it(H(r),0);var o=t==null?0:t.length;if(!o||r<1)return[];for(var e=0,i=0,s=Array(ot(o/r));e<o;)s[i++]=et(t,e,e+=r);return s}export{ft as c};