import{a as L,r as n,j as a,S as M,L as w}from"./index-cdbe938b.js";import{s as k,a as P}from"./api-65c8bbdb.js";import{a as I,b as $,u as A,E as F,D as T}from"./utils-f86807ea.js";import{C as g,P as z}from"./Pagination-74e629c7.js";import{u as p,c as D,l as N}from"./store-5323ae68.js";import{C as R,R as V}from"./row-dc2f01f3.js";import{B as _,T as B}from"./index-c05e63e8.js";import"./index-84f0579a.js";import"./index-62157a5e.js";function O({manga:t}){const s=L(),r=n.useCallback(()=>{s(`/manga/${t.id}`)},[t.id,s]),o=I(t.id,0);return a.jsx(a.Fragment,{children:a.jsx(g,{hoverable:!0,onClick:r,cover:o==null?a.jsx(M,{}):a.jsx("img",{src:o,alt:`cover of ${t.name}`}),children:a.jsx(g.Meta,{title:t.name,description:t.path})})})}const q="_pagination_1qo0v_1",H={pagination:q},{Title:U}=B;function G(t,[s,r]){return`${s}-${r} of ${t} items`}function sa(){const t=$("libraryId"),s=p(D),r=p(N);n.useEffect(()=>{s("library"),r(t)},[t,s,r]);const[o,x]=n.useState(0),[l,f]=n.useState(20),[u,h]=n.useState(null),j=n.useCallback(()=>{k(t).catch(e=>{h(e)})},[t]),C=n.useCallback((e,v)=>{x(e),f(v)},[]),[d,i]=A(),{data:c,error:m,isLoading:b}=P(t,o,l);if(u!=null&&d(u),m!=null&&d(m),b)return a.jsxs(a.Fragment,{children:[a.jsx(w,{}),i]});if(c==null)return a.jsxs(a.Fragment,{children:[a.jsx(F,{}),i]});const y=c.content,S=c.totalElements,E=y.map(e=>a.jsx(R,{span:4,children:a.jsx(O,{manga:e})},e.id));return a.jsxs(a.Fragment,{children:[a.jsx(U,{children:"Manga List"}),a.jsx(_,{type:"default",onClick:j,children:"Scan Manga"}),a.jsx(T,{}),a.jsxs(V,{gutter:[16,16],children:[...E]}),a.jsx("div",{className:H.pagination,children:a.jsx(z,{current:o,total:S,showTotal:G,pageSize:l,showSizeChanger:!0,onChange:C})}),i]})}export{sa as default};
