import{j as e,$ as i,r as l}from"./index-45d13f74.js";import{g}from"./api-7abb0bc2.js";import{T as f}from"./index-5869aa34.js";const{Text:p}=f;function m(t,r){const[s,u]=l.useState(null),[o,c]=l.useState(null);if(l.useEffect(()=>{let n=null;return g(t,r).then(a=>{n=URL.createObjectURL(a),u(n)}).catch(a=>{c(a)}),()=>{n!=null&&URL.revokeObjectURL(n)}},[t,r]),o!=null)throw o;return s}function x({manga:t,pageIndex:r}){const s=m(t.id,r);return s==null?e.jsx(i,{}):e.jsxs(e.Fragment,{children:[e.jsx("img",{src:s,alt:`page ${r}`,width:"75%"}),e.jsxs(p,{type:"secondary",children:[r+1," / ",t.numOfPages]})]})}export{x as M};
