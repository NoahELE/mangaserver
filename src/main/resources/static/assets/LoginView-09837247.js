import{a as m,j as e,B as p}from"./index-50bb302d.js";import{u,l as c}from"./utils-7dc1bded.js";import{F as s,I as t}from"./index-2ed77ee5.js";import{T as d}from"./index-82a3652f.js";import"./row-32c75244.js";import"./collapse-97de76d4.js";import"./index-a399152d.js";const h="_title_1abkg_1",g="_form_1abkg_6",a={title:h,form:g},{Title:f}=d;function F(){const o=m(),n=u(),i=l=>{c(l).then(r=>{localStorage.setItem("jwt",r),o("/",{replace:!0})}).catch(r=>{n(r)})};return e.jsxs(e.Fragment,{children:[e.jsx(f,{className:a.title,children:"MangaServer"}),e.jsxs(s,{labelCol:{span:8},wrapperCol:{span:16},onFinish:i,className:a.form,children:[e.jsx(s.Item,{name:"username",label:"Username",rules:[{required:!0,message:"please input your username"}],children:e.jsx(t,{})}),e.jsx(s.Item,{name:"password",label:"Password",rules:[{required:!0,message:"please input your password"}],children:e.jsx(t.Password,{})}),e.jsx(s.Item,{wrapperCol:{offset:8,span:16},children:e.jsx(p,{type:"primary",htmlType:"submit",children:"Login"})})]})]})}export{F as default};
