import{r,C as oe,c as X,W as ne,A as he,q as be,o as Te,X as Ce,Y as Ue,Z as ze,a as pe,B as Ze,d as Je,$ as Le,h as Ve,m as et,a0 as ye,k as Ie,_ as Q,s as tt,a1 as nt,a2 as ot,a3 as rt,a4 as lt,a5 as it,a6 as at,a7 as We,a8 as Y,a9 as st,t as ct,w as Oe,aa as ut,ab as dt,ac as mt,ad as ft,ae as gt,af as pt,ag as ht,ah as bt,ai as Ct,aj as qe,ak as yt,al as vt,am as xt,an as $t,i as St,ao as wt,ap as Et,aq as It}from"./index-b408d044.js";import{u as Ot,a as Pt,I as ve,b as Ft}from"./index-4f287563.js";import{S as Mt,C as Ae,R as Nt}from"./row-cc856a02.js";import{g as jt}from"./collapse-97de76d4.js";import{T as Rt}from"./index-6ab5106a.js";const Pe=e=>typeof e=="object"&&e!=null&&e.nodeType===1,Fe=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",fe=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const n=getComputedStyle(e,null);return Fe(n.overflowY,t)||Fe(n.overflowX,t)||(o=>{const l=(i=>{if(!i.ownerDocument||!i.ownerDocument.defaultView)return null;try{return i.ownerDocument.defaultView.frameElement}catch{return null}})(o);return!!l&&(l.clientHeight<o.scrollHeight||l.clientWidth<o.scrollWidth)})(e)}return!1},se=(e,t,n,o,l,i,a,s)=>i<e&&a>t||i>e&&a<t?0:i<=e&&s<=n||a>=t&&s>=n?i-e-o:a>t&&s<n||i<e&&s>n?a-t+l:0,_t=e=>{const t=e.parentElement;return t??(e.getRootNode().host||null)},Me=(e,t)=>{var n,o,l,i;if(typeof document>"u")return[];const{scrollMode:a,block:s,inline:c,boundary:d,skipOverflowHiddenElements:f}=t,m=typeof d=="function"?d:V=>V!==d;if(!Pe(e))throw new TypeError("Invalid target");const N=document.scrollingElement||document.documentElement,b=[];let g=e;for(;Pe(g)&&m(g);){if(g=_t(g),g===N){b.push(g);break}g!=null&&g===document.body&&fe(g)&&!fe(document.documentElement)||g!=null&&fe(g,f)&&b.push(g)}const $=(o=(n=window.visualViewport)==null?void 0:n.width)!=null?o:innerWidth,w=(i=(l=window.visualViewport)==null?void 0:l.height)!=null?i:innerHeight,{scrollX:C,scrollY:u}=window,{height:h,width:v,top:p,right:y,bottom:I,left:M}=e.getBoundingClientRect();let F=s==="start"||s==="nearest"?p:s==="end"?I:p+h/2,E=c==="center"?M+v/2:c==="end"?y:M;const L=[];for(let V=0;V<b.length;V++){const S=b[V],{height:O,width:T,top:W,right:G,bottom:H,left:B}=S.getBoundingClientRect();if(a==="if-needed"&&p>=0&&M>=0&&I<=w&&y<=$&&p>=W&&I<=H&&M>=B&&y<=G)return L;const x=getComputedStyle(S),j=parseInt(x.borderLeftWidth,10),A=parseInt(x.borderTopWidth,10),q=parseInt(x.borderRightWidth,10),P=parseInt(x.borderBottomWidth,10);let R=0,_=0;const D="offsetWidth"in S?S.offsetWidth-S.clientWidth-j-q:0,k="offsetHeight"in S?S.offsetHeight-S.clientHeight-A-P:0,U="offsetWidth"in S?S.offsetWidth===0?0:T/S.offsetWidth:0,J="offsetHeight"in S?S.offsetHeight===0?0:O/S.offsetHeight:0;if(N===S)R=s==="start"?F:s==="end"?F-w:s==="nearest"?se(u,u+w,w,A,P,u+F,u+F+h,h):F-w/2,_=c==="start"?E:c==="center"?E-$/2:c==="end"?E-$:se(C,C+$,$,j,q,C+E,C+E+v,v),R=Math.max(0,R+u),_=Math.max(0,_+C);else{R=s==="start"?F-W-A:s==="end"?F-H+P+k:s==="nearest"?se(W,H,O,A,P+k,F,F+h,h):F-(W+O/2)+k/2,_=c==="start"?E-B-j:c==="center"?E-(B+T/2)+D/2:c==="end"?E-G+q+D:se(B,G,T,j,q+D,E,E+v,v);const{scrollLeft:Z,scrollTop:z}=S;R=Math.max(0,Math.min(z+R/J,S.scrollHeight-O/J+k)),_=Math.max(0,Math.min(Z+_/U,S.scrollWidth-T/U+D)),F+=z-R,E+=Z-_}L.push({el:S,top:R,left:_})}return L},Tt=e=>e===!1?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&Object.keys(t).length!==0)(e)?e:{block:"start",inline:"nearest"};function zt(e,t){if(!e.isConnected||!(l=>{let i=l;for(;i&&i.parentNode;){if(i.parentNode===document)return!0;i=i.parentNode instanceof ShadowRoot?i.parentNode.host:i.parentNode}return!1})(e))return;const n=(l=>{const i=window.getComputedStyle(l);return{top:parseFloat(i.scrollMarginTop)||0,right:parseFloat(i.scrollMarginRight)||0,bottom:parseFloat(i.scrollMarginBottom)||0,left:parseFloat(i.scrollMarginLeft)||0}})(e);if((l=>typeof l=="object"&&typeof l.behavior=="function")(t))return t.behavior(Me(e,t));const o=typeof t=="boolean"||t==null?void 0:t.behavior;for(const{el:l,top:i,left:a}of Me(e,Tt(t))){const s=i-n.top+n.bottom,c=a-n.left+n.right;l.scroll({top:s,left:c,behavior:o})}}const Lt=e=>{const{getPrefixCls:t,direction:n}=r.useContext(oe),{prefixCls:o,className:l}=e,i=t("input-group",o),a=t("input"),[s,c]=Ot(a),d=X(i,{[`${i}-lg`]:e.size==="large",[`${i}-sm`]:e.size==="small",[`${i}-compact`]:e.compact,[`${i}-rtl`]:n==="rtl"},c,l),f=r.useContext(ne),m=r.useMemo(()=>Object.assign(Object.assign({},f),{isFormItemInput:!1}),[f]);return s(r.createElement("span",{className:d,style:e.style,onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,onFocus:e.onFocus,onBlur:e.onBlur},r.createElement(ne.Provider,{value:m},e.children)))},Vt=Lt;var Wt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"}},{tag:"path",attrs:{d:"M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"}}]},name:"eye-invisible",theme:"outlined"};const qt=Wt;var At=function(t,n){return r.createElement(he,be({},t,{ref:n,icon:qt}))};const Ht=r.forwardRef(At);var Bt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"};const Dt=Bt;var kt=function(t,n){return r.createElement(he,be({},t,{ref:n,icon:Dt}))};const Xt=r.forwardRef(kt);var Gt=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,o=Object.getOwnPropertySymbols(e);l<o.length;l++)t.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(e,o[l])&&(n[o[l]]=e[o[l]]);return n};const Qt=e=>e?r.createElement(Xt,null):r.createElement(Ht,null),Yt={click:"onClick",hover:"onMouseOver"},Kt=r.forwardRef((e,t)=>{const{visibilityToggle:n=!0}=e,o=typeof n=="object"&&n.visible!==void 0,[l,i]=r.useState(()=>o?n.visible:!1),a=r.useRef(null);r.useEffect(()=>{o&&i(n.visible)},[o,n]);const s=Pt(a),c=()=>{const{disabled:p}=e;p||(l&&s(),i(y=>{var I;const M=!y;return typeof n=="object"&&((I=n.onVisibleChange)===null||I===void 0||I.call(n,M)),M}))},d=p=>{const{action:y="click",iconRender:I=Qt}=e,M=Yt[y]||"",F=I(l),E={[M]:c,className:`${p}-icon`,key:"passwordIcon",onMouseDown:L=>{L.preventDefault()},onMouseUp:L=>{L.preventDefault()}};return r.cloneElement(r.isValidElement(F)?F:r.createElement("span",null,F),E)},{className:f,prefixCls:m,inputPrefixCls:N,size:b}=e,g=Gt(e,["className","prefixCls","inputPrefixCls","size"]),{getPrefixCls:$}=r.useContext(oe),w=$("input",N),C=$("input-password",m),u=n&&d(C),h=X(C,f,{[`${C}-${b}`]:!!b}),v=Object.assign(Object.assign({},Te(g,["suffix","iconRender","visibilityToggle"])),{type:l?"text":"password",className:h,prefixCls:w,suffix:u});return b&&(v.size=b),r.createElement(ve,Object.assign({ref:Ce(t,a)},v))}),Ut=Kt;var Zt=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,o=Object.getOwnPropertySymbols(e);l<o.length;l++)t.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(e,o[l])&&(n[o[l]]=e[o[l]]);return n};const Jt=r.forwardRef((e,t)=>{const{prefixCls:n,inputPrefixCls:o,className:l,size:i,suffix:a,enterButton:s=!1,addonAfter:c,loading:d,disabled:f,onSearch:m,onChange:N,onCompositionStart:b,onCompositionEnd:g}=e,$=Zt(e,["prefixCls","inputPrefixCls","className","size","suffix","enterButton","addonAfter","loading","disabled","onSearch","onChange","onCompositionStart","onCompositionEnd"]),{getPrefixCls:w,direction:C}=r.useContext(oe),u=r.useRef(!1),h=w("input-search",n),v=w("input",o),{compactSize:p}=Ue(h,C),y=ze(x=>{var j;return(j=i??p)!==null&&j!==void 0?j:x}),I=r.useRef(null),M=x=>{x&&x.target&&x.type==="click"&&m&&m(x.target.value,x,{source:"clear"}),N&&N(x)},F=x=>{var j;document.activeElement===((j=I.current)===null||j===void 0?void 0:j.input)&&x.preventDefault()},E=x=>{var j,A;m&&m((A=(j=I.current)===null||j===void 0?void 0:j.input)===null||A===void 0?void 0:A.value,x,{source:"input"})},L=x=>{u.current||d||E(x)},V=typeof s=="boolean"?r.createElement(Mt,null):null,S=`${h}-button`;let O;const T=s||{},W=T.type&&T.type.__ANT_BUTTON===!0;W||T.type==="button"?O=pe(T,Object.assign({onMouseDown:F,onClick:x=>{var j,A;(A=(j=T==null?void 0:T.props)===null||j===void 0?void 0:j.onClick)===null||A===void 0||A.call(j,x),E(x)},key:"enterButton"},W?{className:S,size:y}:{})):O=r.createElement(Ze,{className:S,type:s?"primary":void 0,size:y,disabled:f,key:"enterButton",onMouseDown:F,onClick:E,loading:d,icon:V},s),c&&(O=[O,pe(c,{key:"addonAfter"})]);const G=X(h,{[`${h}-rtl`]:C==="rtl",[`${h}-${y}`]:!!y,[`${h}-with-button`]:!!s},l),H=x=>{u.current=!0,b==null||b(x)},B=x=>{u.current=!1,g==null||g(x)};return r.createElement(ve,Object.assign({ref:Ce(I,t),onPressEnter:L},$,{size:y,onCompositionStart:H,onCompositionEnd:B,prefixCls:v,addonAfter:O,suffix:a,onChange:M,className:G,disabled:f}))}),en=Jt,le=ve;le.Group=Vt;le.Search=en;le.TextArea=Ft;le.Password=Ut;const Un=le;function ce(e){const[t,n]=r.useState(e);return r.useEffect(()=>{const o=setTimeout(()=>{n(e)},e.length?0:10);return()=>{clearTimeout(o)}},[e]),t}const tn=e=>{const{componentCls:t}=e,n=`${t}-show-help`,o=`${t}-show-help-item`;return{[n]:{transition:`opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`,"&-appear, &-enter":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}},[o]:{overflow:"hidden",transition:`height ${e.motionDurationSlow} ${e.motionEaseInOut},
                     opacity ${e.motionDurationSlow} ${e.motionEaseInOut},
                     transform ${e.motionDurationSlow} ${e.motionEaseInOut} !important`,[`&${o}-appear, &${o}-enter`]:{transform:"translateY(-5px)",opacity:0,"&-active":{transform:"translateY(0)",opacity:1}},[`&${o}-leave-active`]:{transform:"translateY(-5px)"}}}}},nn=tn,on=e=>({legend:{display:"block",width:"100%",marginBottom:e.marginLG,padding:0,color:e.colorTextDescription,fontSize:e.fontSizeLG,lineHeight:"inherit",border:0,borderBottom:`${e.lineWidth}px ${e.lineType} ${e.colorBorder}`},label:{fontSize:e.fontSize},'input[type="search"]':{boxSizing:"border-box"},'input[type="radio"], input[type="checkbox"]':{lineHeight:"normal"},'input[type="file"]':{display:"block"},'input[type="range"]':{display:"block",width:"100%"},"select[multiple], select[size]":{height:"auto"},"input[type='file']:focus,\n  input[type='radio']:focus,\n  input[type='checkbox']:focus":{outline:0,boxShadow:`0 0 0 ${e.controlOutlineWidth}px ${e.controlOutline}`},output:{display:"block",paddingTop:15,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight}}),Ne=(e,t)=>{const{formItemCls:n}=e;return{[n]:{[`${n}-label > label`]:{height:t},[`${n}-control-input`]:{minHeight:t}}}},rn=e=>{const{componentCls:t}=e;return{[e.componentCls]:Object.assign(Object.assign(Object.assign({},Ve(e)),on(e)),{[`${t}-text`]:{display:"inline-block",paddingInlineEnd:e.paddingSM},"&-small":Object.assign({},Ne(e,e.controlHeightSM)),"&-large":Object.assign({},Ne(e,e.controlHeightLG))})}},ln=e=>{const{formItemCls:t,iconCls:n,componentCls:o,rootPrefixCls:l,labelRequiredMarkColor:i,labelColor:a,labelFontSize:s,labelHeight:c,labelColonMarginInlineStart:d,labelColonMarginInlineEnd:f,itemMarginBottom:m}=e;return{[t]:Object.assign(Object.assign({},Ve(e)),{marginBottom:m,verticalAlign:"top","&-with-help":{transition:"none"},[`&-hidden,
        &-hidden.${l}-row`]:{display:"none"},"&-has-warning":{[`${t}-split`]:{color:e.colorError}},"&-has-error":{[`${t}-split`]:{color:e.colorWarning}},[`${t}-label`]:{flexGrow:0,overflow:"hidden",whiteSpace:"nowrap",textAlign:"end",verticalAlign:"middle","&-left":{textAlign:"start"},"&-wrap":{overflow:"unset",lineHeight:`${e.lineHeight} - 0.25em`,whiteSpace:"unset"},"> label":{position:"relative",display:"inline-flex",alignItems:"center",maxWidth:"100%",height:c,color:a,fontSize:s,[`> ${n}`]:{fontSize:e.fontSize,verticalAlign:"top"},[`&${t}-required:not(${t}-required-mark-optional)::before`]:{display:"inline-block",marginInlineEnd:e.marginXXS,color:i,fontSize:e.fontSize,fontFamily:"SimSun, sans-serif",lineHeight:1,content:'"*"',[`${o}-hide-required-mark &`]:{display:"none"}},[`${t}-optional`]:{display:"inline-block",marginInlineStart:e.marginXXS,color:e.colorTextDescription,[`${o}-hide-required-mark &`]:{display:"none"}},[`${t}-tooltip`]:{color:e.colorTextDescription,cursor:"help",writingMode:"horizontal-tb",marginInlineStart:e.marginXXS},"&::after":{content:'":"',position:"relative",marginBlock:0,marginInlineStart:d,marginInlineEnd:f},[`&${t}-no-colon::after`]:{content:'"\\a0"'}}},[`${t}-control`]:{"--ant-display":"flex",flexDirection:"column",flexGrow:1,[`&:first-child:not([class^="'${l}-col-'"]):not([class*="' ${l}-col-'"])`]:{width:"100%"},"&-input":{position:"relative",display:"flex",alignItems:"center",minHeight:e.controlHeight,"&-content":{flex:"auto",maxWidth:"100%"}}},[t]:{"&-explain, &-extra":{clear:"both",color:e.colorTextDescription,fontSize:e.fontSize,lineHeight:e.lineHeight},"&-explain-connected":{width:"100%"},"&-extra":{minHeight:e.controlHeightSM,transition:`color ${e.motionDurationMid} ${e.motionEaseOut}`},"&-explain":{"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning}}},[`&-with-help ${t}-explain`]:{height:"auto",opacity:1},[`${t}-feedback-icon`]:{fontSize:e.fontSize,textAlign:"center",visibility:"visible",animationName:Le,animationDuration:e.motionDurationMid,animationTimingFunction:e.motionEaseOutBack,pointerEvents:"none","&-success":{color:e.colorSuccess},"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning},"&-validating":{color:e.colorPrimary}}})}},an=e=>{const{componentCls:t,formItemCls:n}=e;return{[`${t}-horizontal`]:{[`${n}-label`]:{flexGrow:0},[`${n}-control`]:{flex:"1 1 0",minWidth:0},[`${n}-label[class$='-24'], ${n}-label[class*='-24 ']`]:{[`& + ${n}-control`]:{minWidth:"unset"}}}}},sn=e=>{const{componentCls:t,formItemCls:n}=e;return{[`${t}-inline`]:{display:"flex",flexWrap:"wrap",[n]:{flex:"none",marginInlineEnd:e.margin,marginBottom:0,"&-row":{flexWrap:"nowrap"},[`> ${n}-label,
        > ${n}-control`]:{display:"inline-block",verticalAlign:"top"},[`> ${n}-label`]:{flex:"none"},[`${t}-text`]:{display:"inline-block"},[`${n}-has-feedback`]:{display:"inline-block"}}}}},te=e=>({padding:e.verticalLabelPadding,margin:e.verticalLabelMargin,whiteSpace:"initial",textAlign:"start","> label":{margin:0,"&::after":{visibility:"hidden"}}}),cn=e=>{const{componentCls:t,formItemCls:n,rootPrefixCls:o}=e;return{[`${n} ${n}-label`]:te(e),[t]:{[n]:{flexWrap:"wrap",[`${n}-label, ${n}-control`]:{[`&:not([class*=" ${o}-col-xs"])`]:{flex:"0 0 100%",maxWidth:"100%"}}}}}},un=e=>{const{componentCls:t,formItemCls:n,rootPrefixCls:o}=e;return{[`${t}-vertical`]:{[n]:{"&-row":{flexDirection:"column"},"&-label > label":{height:"auto"},[`${t}-item-control`]:{width:"100%"}}},[`${t}-vertical ${n}-label,
      .${o}-col-24${n}-label,
      .${o}-col-xl-24${n}-label`]:te(e),[`@media (max-width: ${e.screenXSMax}px)`]:[cn(e),{[t]:{[`.${o}-col-xs-24${n}-label`]:te(e)}}],[`@media (max-width: ${e.screenSMMax}px)`]:{[t]:{[`.${o}-col-sm-24${n}-label`]:te(e)}},[`@media (max-width: ${e.screenMDMax}px)`]:{[t]:{[`.${o}-col-md-24${n}-label`]:te(e)}},[`@media (max-width: ${e.screenLGMax}px)`]:{[t]:{[`.${o}-col-lg-24${n}-label`]:te(e)}}}},He=(e,t)=>et(e,{formItemCls:`${e.componentCls}-item`,rootPrefixCls:t}),xe=Je("Form",(e,t)=>{let{rootPrefixCls:n}=t;const o=He(e,n);return[rn(o),ln(o),nn(o),an(o),sn(o),un(o),jt(o),Le]},e=>({labelRequiredMarkColor:e.colorError,labelColor:e.colorTextHeading,labelFontSize:e.fontSize,labelHeight:e.controlHeight,labelColonMarginInlineStart:e.marginXXS/2,labelColonMarginInlineEnd:e.marginXS,itemMarginBottom:e.marginLG,verticalLabelPadding:`0 0 ${e.paddingXS}px`,verticalLabelMargin:0}),{order:-1e3}),je=[];function ge(e,t,n){let o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return{key:typeof e=="string"?e:`${t}-${o}`,error:e,errorStatus:n}}const dn=e=>{let{help:t,helpStatus:n,errors:o=je,warnings:l=je,className:i,fieldId:a,onVisibleChanged:s}=e;const{prefixCls:c}=r.useContext(ye),d=`${c}-item-explain`,[,f]=xe(c),m=r.useMemo(()=>Ie(c),[c]),N=ce(o),b=ce(l),g=r.useMemo(()=>t!=null?[ge(t,"help",n)]:[].concat(Q(N.map((w,C)=>ge(w,"error","error",C))),Q(b.map((w,C)=>ge(w,"warning","warning",C)))),[t,n,N,b]),$={};return a&&($.id=`${a}_help`),r.createElement(tt,{motionDeadline:m.motionDeadline,motionName:`${c}-show-help`,visible:!!g.length,onVisibleChanged:s},w=>{const{className:C,style:u}=w;return r.createElement("div",Object.assign({},$,{className:X(d,C,i,f),style:u,role:"alert"}),r.createElement(nt,Object.assign({keys:g},Ie(c),{motionName:`${c}-show-help-item`,component:!1}),h=>{const{key:v,error:p,errorStatus:y,className:I,style:M}=h;return r.createElement("div",{key:v,className:X(I,{[`${d}-${y}`]:y}),style:M},p)}))})},Be=dn,mn=["parentNode"],fn="form_item";function re(e){return e===void 0||e===!1?[]:Array.isArray(e)?e:[e]}function De(e,t){if(!e.length)return;const n=e.join("_");return t?`${t}_${n}`:mn.includes(n)?`${fn}_${n}`:n}function ke(e,t,n,o,l,i){let a=o;return i!==void 0?a=i:n.validating?a="validating":e.length?a="error":t.length?a="warning":(n.touched||l&&n.validated)&&(a="success"),a}function Re(e){return re(e).join("_")}function Xe(e){const[t]=ot(),n=r.useRef({}),o=r.useMemo(()=>e??Object.assign(Object.assign({},t),{__INTERNAL__:{itemRef:l=>i=>{const a=Re(l);i?n.current[a]=i:delete n.current[a]}},scrollToField:function(l){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=re(l),s=De(a,o.__INTERNAL__.name),c=s?document.getElementById(s):null;c&&zt(c,Object.assign({scrollMode:"if-needed",block:"nearest"},i))},getFieldInstance:l=>{const i=Re(l);return n.current[i]}}),[e,t]);return[o]}var gn=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,o=Object.getOwnPropertySymbols(e);l<o.length;l++)t.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(e,o[l])&&(n[o[l]]=e[o[l]]);return n};const pn=(e,t)=>{const n=r.useContext(rt),{getPrefixCls:o,direction:l,form:i}=r.useContext(oe),{prefixCls:a,className:s,rootClassName:c,size:d,disabled:f=n,form:m,colon:N,labelAlign:b,labelWrap:g,labelCol:$,wrapperCol:w,hideRequiredMark:C,layout:u="horizontal",scrollToFirstError:h,requiredMark:v,onFinishFailed:p,name:y,style:I,feedbackIcons:M}=e,F=gn(e,["prefixCls","className","rootClassName","size","disabled","form","colon","labelAlign","labelWrap","labelCol","wrapperCol","hideRequiredMark","layout","scrollToFirstError","requiredMark","onFinishFailed","name","style","feedbackIcons"]),E=ze(d),L=r.useContext(lt),V=r.useMemo(()=>v!==void 0?v:i&&i.requiredMark!==void 0?i.requiredMark:!C,[C,v,i]),S=N??(i==null?void 0:i.colon),O=o("form",a),[T,W]=xe(O),G=X(O,`${O}-${u}`,{[`${O}-hide-required-mark`]:V===!1,[`${O}-rtl`]:l==="rtl",[`${O}-${E}`]:E},W,i==null?void 0:i.className,s,c),[H]=Xe(m),{__INTERNAL__:B}=H;B.name=y;const x=r.useMemo(()=>({name:y,labelAlign:b,labelCol:$,labelWrap:g,wrapperCol:w,vertical:u==="vertical",colon:S,requiredMark:V,itemRef:B.itemRef,form:H,feedbackIcons:M}),[y,b,$,w,u,S,V,H,M]);r.useImperativeHandle(t,()=>H);const j=(q,P)=>{if(q){let R={block:"nearest"};typeof q=="object"&&(R=q),H.scrollToField(P,R)}},A=q=>{if(p==null||p(q),q.errorFields.length){const P=q.errorFields[0].name;if(h!==void 0){j(h,P);return}i&&i.scrollToFirstError!==void 0&&j(i.scrollToFirstError,P)}};return T(r.createElement(it,{disabled:f},r.createElement(at,{size:E},r.createElement(We,Object.assign({},{validateMessages:L}),r.createElement(Y.Provider,{value:x},r.createElement(st,Object.assign({id:y},F,{name:y,onFinishFailed:A,form:H,style:Object.assign(Object.assign({},i==null?void 0:i.style),I),className:G})))))))},hn=r.forwardRef(pn),bn=hn;function Cn(e){if(typeof e=="function")return e;const t=ct(e);return t.length<=1?t[0]:t}const Ge=()=>{const{status:e,errors:t=[],warnings:n=[]}=r.useContext(ne);return{status:e,errors:t,warnings:n}};Ge.Context=ne;const yn=Ge;function vn(e){const[t,n]=r.useState(e),o=r.useRef(null),l=r.useRef([]),i=r.useRef(!1);r.useEffect(()=>(i.current=!1,()=>{i.current=!0,Oe.cancel(o.current),o.current=null}),[]);function a(s){i.current||(o.current===null&&(l.current=[],o.current=Oe(()=>{o.current=null,n(c=>{let d=c;return l.current.forEach(f=>{d=f(d)}),d})})),l.current.push(s))}return[t,a]}function xn(){const{itemRef:e}=r.useContext(Y),t=r.useRef({});function n(o,l){const i=l&&typeof l=="object"&&l.ref,a=o.join("_");return(t.current.name!==a||t.current.originRef!==i)&&(t.current.name=a,t.current.originRef=i,t.current.ref=Ce(e(o),i)),t.current.ref}return n}const $n=e=>{const{formItemCls:t}=e;return{"@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)":{[`${t}-control`]:{display:"flex"}}}},Sn=ut(["Form","item-item"],(e,t)=>{let{rootPrefixCls:n}=t;const o=He(e,n);return[$n(o)]}),wn=e=>{const{prefixCls:t,status:n,wrapperCol:o,children:l,errors:i,warnings:a,_internalItemRender:s,extra:c,help:d,fieldId:f,marginBottom:m,onErrorVisibleChanged:N}=e,b=`${t}-item`,g=r.useContext(Y),$=o||g.wrapperCol||{},w=X(`${b}-control`,$.className),C=r.useMemo(()=>Object.assign({},g),[g]);delete C.labelCol,delete C.wrapperCol;const u=r.createElement("div",{className:`${b}-control-input`},r.createElement("div",{className:`${b}-control-input-content`},l)),h=r.useMemo(()=>({prefixCls:t,status:n}),[t,n]),v=m!==null||i.length||a.length?r.createElement("div",{style:{display:"flex",flexWrap:"nowrap"}},r.createElement(ye.Provider,{value:h},r.createElement(Be,{fieldId:f,errors:i,warnings:a,help:d,helpStatus:n,className:`${b}-explain-connected`,onVisibleChanged:N})),!!m&&r.createElement("div",{style:{width:0,height:m}})):null,p={};f&&(p.id=`${f}_extra`);const y=c?r.createElement("div",Object.assign({},p,{className:`${b}-extra`}),c):null,I=s&&s.mark==="pro_table_render"&&s.render?s.render(e,{input:u,errorList:v,extra:y}):r.createElement(r.Fragment,null,u,v,y);return r.createElement(Y.Provider,{value:C},r.createElement(Ae,Object.assign({},$,{className:w}),I),r.createElement(Sn,{prefixCls:t}))},En=wn;var In={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"};const On=In;var Pn=function(t,n){return r.createElement(he,be({},t,{ref:n,icon:On}))};const Fn=r.forwardRef(Pn);var Mn=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,o=Object.getOwnPropertySymbols(e);l<o.length;l++)t.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(e,o[l])&&(n[o[l]]=e[o[l]]);return n};function Nn(e){return e?typeof e=="object"&&!r.isValidElement(e)?e:{title:e}:null}const jn=e=>{let{prefixCls:t,label:n,htmlFor:o,labelCol:l,labelAlign:i,colon:a,required:s,requiredMark:c,tooltip:d}=e;var f;const[m]=dt("Form"),{vertical:N,labelAlign:b,labelCol:g,labelWrap:$,colon:w}=r.useContext(Y);if(!n)return null;const C=l||g||{},u=i||b,h=`${t}-item-label`,v=X(h,u==="left"&&`${h}-left`,C.className,{[`${h}-wrap`]:!!$});let p=n;const y=a===!0||w!==!1&&a!==!1;y&&!N&&typeof n=="string"&&n.trim()!==""&&(p=n.replace(/[:|：]\s*$/,""));const M=Nn(d);if(M){const{icon:V=r.createElement(Fn,null)}=M,S=Mn(M,["icon"]),O=r.createElement(Rt,Object.assign({},S),r.cloneElement(V,{className:`${t}-item-tooltip`,title:""}));p=r.createElement(r.Fragment,null,p,O)}const F=c==="optional",E=typeof c=="function";E?p=c(p,{required:!!s}):F&&!s&&(p=r.createElement(r.Fragment,null,p,r.createElement("span",{className:`${t}-item-optional`,title:""},(m==null?void 0:m.optional)||((f=mt.Form)===null||f===void 0?void 0:f.optional))));const L=X({[`${t}-item-required`]:s,[`${t}-item-required-mark-optional`]:F||E,[`${t}-item-no-colon`]:!y});return r.createElement(Ae,Object.assign({},C,{className:v}),r.createElement("label",{htmlFor:o,className:L,title:typeof n=="string"?n:""},p))},Rn=jn,_n={success:ft,warning:gt,error:pt,validating:ht};function Qe(e){let{children:t,errors:n,warnings:o,hasFeedback:l,validateStatus:i,prefixCls:a,meta:s,noStyle:c}=e;const d=`${a}-item`,{feedbackIcons:f}=r.useContext(Y),m=ke(n,o,s,null,!!l,i),{isFormItemInput:N,status:b}=r.useContext(ne),g=r.useMemo(()=>{var $;let w;if(l){const h=l!==!0&&l.icons||f,v=m&&(($=h==null?void 0:h({status:m,errors:n,warnings:o}))===null||$===void 0?void 0:$[m]),p=m&&_n[m];w=v!==!1&&p?r.createElement("span",{className:X(`${d}-feedback-icon`,`${d}-feedback-icon-${m}`)},v||r.createElement(p,null)):null}let C=!0,u=m||"";return c&&(C=N,u=(m??b)||""),{status:u,errors:n,warnings:o,hasFeedback:!!l,feedbackIcon:w,isFormItemInput:C}},[m,l,c,N,b]);return r.createElement(ne.Provider,{value:g},t)}var Tn=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,o=Object.getOwnPropertySymbols(e);l<o.length;l++)t.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(e,o[l])&&(n[o[l]]=e[o[l]]);return n};function zn(e){const{prefixCls:t,className:n,rootClassName:o,style:l,help:i,errors:a,warnings:s,validateStatus:c,meta:d,hasFeedback:f,hidden:m,children:N,fieldId:b,required:g,isRequired:$,onSubItemMetaChange:w}=e,C=Tn(e,["prefixCls","className","rootClassName","style","help","errors","warnings","validateStatus","meta","hasFeedback","hidden","children","fieldId","required","isRequired","onSubItemMetaChange"]),u=`${t}-item`,{requiredMark:h}=r.useContext(Y),v=r.useRef(null),p=ce(a),y=ce(s),I=i!=null,M=!!(I||a.length||s.length),F=!!v.current&&bt(v.current),[E,L]=r.useState(null);Ct(()=>{if(M&&v.current){const W=getComputedStyle(v.current);L(parseInt(W.marginBottom,10))}},[M,F]);const V=W=>{W||L(null)},O=function(){let W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const G=W?p:d.errors,H=W?y:d.warnings;return ke(G,H,d,"",!!f,c)}(),T=X(u,n,o,{[`${u}-with-help`]:I||p.length||y.length,[`${u}-has-feedback`]:O&&f,[`${u}-has-success`]:O==="success",[`${u}-has-warning`]:O==="warning",[`${u}-has-error`]:O==="error",[`${u}-is-validating`]:O==="validating",[`${u}-hidden`]:m});return r.createElement("div",{className:T,style:l,ref:v},r.createElement(Nt,Object.assign({className:`${u}-row`},Te(C,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol","validateDebounce"])),r.createElement(Rn,Object.assign({htmlFor:b},e,{requiredMark:h,required:g??$,prefixCls:t})),r.createElement(En,Object.assign({},e,d,{errors:p,warnings:y,prefixCls:t,status:O,help:i,marginBottom:E,onErrorVisibleChanged:V}),r.createElement(qe.Provider,{value:w},r.createElement(Qe,{prefixCls:t,meta:d,errors:d.errors,warnings:d.warnings,hasFeedback:f,validateStatus:O},N)))),!!E&&r.createElement("div",{className:`${u}-margin-offset`,style:{marginBottom:-E}}))}const Ln="__SPLIT__",Vn=r.memo(e=>{let{children:t}=e;return t},(e,t)=>e.value===t.value&&e.update===t.update&&e.childProps.length===t.childProps.length&&e.childProps.every((n,o)=>n===t.childProps[o]));function Wn(e){return e!=null}function _e(){return{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}}function qn(e){const{name:t,noStyle:n,className:o,dependencies:l,prefixCls:i,shouldUpdate:a,rules:s,children:c,required:d,label:f,messageVariables:m,trigger:N="onChange",validateTrigger:b,hidden:g,help:$}=e,{getPrefixCls:w}=r.useContext(oe),{name:C}=r.useContext(Y),u=Cn(c),h=typeof u=="function",v=r.useContext(qe),{validateTrigger:p}=r.useContext(yt),y=b!==void 0?b:p,I=Wn(t),M=w("form",i),[F,E]=xe(M),L=r.useContext(vt),V=r.useRef(),[S,O]=vn({}),[T,W]=xt(()=>_e()),G=P=>{const R=L==null?void 0:L.getKey(P.name);if(W(P.destroy?_e():P,!0),n&&$!==!1&&v){let _=P.name;if(P.destroy)_=V.current||_;else if(R!==void 0){const[D,k]=R;_=[D].concat(Q(k)),V.current=_}v(P,_)}},H=(P,R)=>{O(_=>{const D=Object.assign({},_),U=[].concat(Q(P.name.slice(0,-1)),Q(R)).join(Ln);return P.destroy?delete D[U]:D[U]=P,D})},[B,x]=r.useMemo(()=>{const P=Q(T.errors),R=Q(T.warnings);return Object.values(S).forEach(_=>{P.push.apply(P,Q(_.errors||[])),R.push.apply(R,Q(_.warnings||[]))}),[P,R]},[S,T.errors,T.warnings]),j=xn();function A(P,R,_){return n&&!g?r.createElement(Qe,{prefixCls:M,hasFeedback:e.hasFeedback,validateStatus:e.validateStatus,meta:T,errors:B,warnings:x,noStyle:!0},P):r.createElement(zn,Object.assign({key:"row"},e,{className:X(o,E),prefixCls:M,fieldId:R,isRequired:_,errors:B,warnings:x,meta:T,onSubItemMetaChange:H}),P)}if(!I&&!h&&!l)return F(A(u));let q={};return typeof f=="string"?q.label=f:t&&(q.label=String(t)),m&&(q=Object.assign(Object.assign({},q),m)),F(r.createElement($t,Object.assign({},e,{messageVariables:q,trigger:N,validateTrigger:y,onMetaChange:G}),(P,R,_)=>{const D=re(t).length&&R?R.name:[],k=De(D,C),U=d!==void 0?d:!!(s&&s.some(z=>{if(z&&typeof z=="object"&&z.required&&!z.warningOnly)return!0;if(typeof z=="function"){const ie=z(_);return ie&&ie.required&&!ie.warningOnly}return!1})),J=Object.assign({},P);let Z=null;if(Array.isArray(u)&&I)Z=u;else if(!(h&&(!(a||l)||I))){if(!(l&&!h&&!I))if(St(u)){const z=Object.assign(Object.assign({},u.props),J);if(z.id||(z.id=k),$||B.length>0||x.length>0||e.extra){const ee=[];($||B.length>0)&&ee.push(`${k}_help`),e.extra&&ee.push(`${k}_extra`),z["aria-describedby"]=ee.join(" ")}B.length>0&&(z["aria-invalid"]="true"),U&&(z["aria-required"]="true"),wt(u)&&(z.ref=j(D,u)),new Set([].concat(Q(re(N)),Q(re(y)))).forEach(ee=>{z[ee]=function(){for(var $e,Se,ue,we,de,Ee=arguments.length,me=new Array(Ee),ae=0;ae<Ee;ae++)me[ae]=arguments[ae];(ue=J[ee])===null||ue===void 0||($e=ue).call.apply($e,[J].concat(me)),(de=(we=u.props)[ee])===null||de===void 0||(Se=de).call.apply(Se,[we].concat(me))}});const Ke=[z["aria-required"],z["aria-invalid"],z["aria-describedby"]];Z=r.createElement(Vn,{value:J[e.valuePropName||"value"],update:u,childProps:Ke},pe(u,z))}else h&&(a||l)&&!I?Z=u(_):Z=u}return A(Z,k,U)}))}const Ye=qn;Ye.useStatus=yn;const An=Ye;var Hn=globalThis&&globalThis.__rest||function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,o=Object.getOwnPropertySymbols(e);l<o.length;l++)t.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(e,o[l])&&(n[o[l]]=e[o[l]]);return n};const Bn=e=>{var{prefixCls:t,children:n}=e,o=Hn(e,["prefixCls","children"]);const{getPrefixCls:l}=r.useContext(oe),i=l("form",t),a=r.useMemo(()=>({prefixCls:i,status:"error"}),[i]);return r.createElement(Et,Object.assign({},o),(s,c,d)=>r.createElement(ye.Provider,{value:a},n(s.map(f=>Object.assign(Object.assign({},f),{fieldKey:f.key})),c,{errors:d.errors,warnings:d.warnings})))},Dn=Bn;function kn(){const{form:e}=r.useContext(Y);return e}const K=bn;K.Item=An;K.List=Dn;K.ErrorList=Be;K.useForm=Xe;K.useFormInstance=kn;K.useWatch=It;K.Provider=We;K.create=()=>{};const Zn=K;export{Zn as F,Un as I};
