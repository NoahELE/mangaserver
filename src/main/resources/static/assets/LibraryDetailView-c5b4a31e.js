import{l as w,n as t,r as o,V as M,B as v}from"./index-b408d044.js";import{c as L,d as I,u as P,e as $,s as A}from"./utils-2dc66e36.js";import{C as d,a as T}from"./Pagination-7e88c486.js";import{b as g,c as V,l as k}from"./store-5b870d98.js";import{E as z,D}from"./index-1b210b1b.js";import{C as N,R}from"./row-cc856a02.js";import{T as B}from"./index-4f287563.js";import"./EllipsisOutlined-5d178ca6.js";import"./index-6ab5106a.js";function F({manga:s}){const a=w(),r=()=>{a(`/manga/${s.id}`)},n=L(s.id,0);return t.jsx(t.Fragment,{children:t.jsx(d,{hoverable:!0,onClick:r,cover:t.jsx("img",{src:n,alt:`cover of ${s.name}`}),children:t.jsx(d.Meta,{title:s.name,description:s.path})})})}const{Title:O}=B;function U(s,[a,r]){return`${a}-${r} of ${s} items`}function Z(){const s=I("libraryId"),a=g(V),r=g(k);o.useEffect(()=>{a("library"),r(s)},[s,a,r]);const[n,p]=o.useState(0),[c,f]=o.useState(20),[l,x]=o.useState(),h=()=>{A(s).catch(e=>{x(e)})},j=(e,b)=>{p(e),f(b)},u=P(),{data:i,error:m,isLoading:C}=$(s,n,c);if(l!=null&&u(l),m!=null&&u(m),C)return t.jsx(M,{});if(i==null)return t.jsx(z,{className:"m-10"});const y=i.content,E=i.totalElements,S=y.map(e=>t.jsx(N,{span:4,children:t.jsx(F,{manga:e})},e.id));return t.jsxs(t.Fragment,{children:[t.jsx(O,{children:"Manga List"}),t.jsx(v,{type:"default",onClick:h,children:"Scan Manga"}),t.jsx(D,{}),t.jsxs(R,{gutter:[16,16],children:[...S]}),t.jsx("div",{className:"flex justify-center items-center",children:t.jsx(T,{current:n,total:E,showTotal:U,pageSize:c,showSizeChanger:!0,onChange:j})})]})}export{Z as default};