import{r as o,A as he,b as be,C as ne,d as K,ac as oe,o as ze,M as Ce,ab as Qe,ad as Te,e as ge,B as Ye,g as Ue,m as Je,ao as Le,c as Ve,ap as ye,aq as Oe,_ as Q,f as Ze,ar as ke,as as et,ae as tt,at as nt,au as rt,av as ot,aw as We,ax as Z,ay as lt,w as Ie,am as it,az as st,aA as at,Y as ct,aB as Ae,aC as ut,aD as dt,a9 as mt,aa as ft,$ as pt,aE as gt,aF as ht,aG as bt,aH as Ct,aI as yt,ah as vt,aJ as xt,aK as $t}from"./index-50bb302d.js";import{u as wt,d as St,I as ve,e as Et}from"./index-82a3652f.js";import{S as Ot,C as qe,R as It}from"./row-32c75244.js";import{g as Pt}from"./collapse-97de76d4.js";import{T as Nt}from"./index-a399152d.js";const Pe=e=>typeof e=="object"&&e!=null&&e.nodeType===1,Ne=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",fe=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const r=getComputedStyle(e,null);return Ne(r.overflowY,t)||Ne(r.overflowX,t)||(n=>{const l=(i=>{if(!i.ownerDocument||!i.ownerDocument.defaultView)return null;try{return i.ownerDocument.defaultView.frameElement}catch{return null}})(n);return!!l&&(l.clientHeight<n.scrollHeight||l.clientWidth<n.scrollWidth)})(e)}return!1},ae=(e,t,r,n,l,i,c,s)=>i<e&&c>t||i>e&&c<t?0:i<=e&&s<=r||c>=t&&s>=r?i-e-n:c>t&&s<r||i<e&&s>r?c-t+l:0,Ft=e=>{const t=e.parentElement;return t??(e.getRootNode().host||null)},Fe=(e,t)=>{var r,n,l,i;if(typeof document>"u")return[];const{scrollMode:c,block:s,inline:u,boundary:d,skipOverflowHiddenElements:m}=t,S=typeof d=="function"?d:q=>q!==d;if(!Pe(e))throw new TypeError("Invalid target");const R=document.scrollingElement||document.documentElement,b=[];let f=e;for(;Pe(f)&&S(f);){if(f=Ft(f),f===R){b.push(f);break}f!=null&&f===document.body&&fe(f)&&!fe(document.documentElement)||f!=null&&fe(f,m)&&b.push(f)}const E=(n=(r=window.visualViewport)==null?void 0:r.width)!=null?n:innerWidth,O=(i=(l=window.visualViewport)==null?void 0:l.height)!=null?i:innerHeight,{scrollX:C,scrollY:a}=window,{height:y,width:x,top:v,right:p,bottom:$,left:F}=e.getBoundingClientRect();let w=s==="start"||s==="nearest"?v:s==="end"?$:v+y/2,I=u==="center"?F+x/2:u==="end"?p:F;const T=[];for(let q=0;q<b.length;q++){const h=b[q],{height:N,width:L,top:D,right:M,bottom:A,left:H}=h.getBoundingClientRect();if(c==="if-needed"&&v>=0&&F>=0&&$<=O&&p<=E&&v>=D&&$<=A&&F>=H&&p<=M)return T;const g=getComputedStyle(h),j=parseInt(g.borderLeftWidth,10),z=parseInt(g.borderTopWidth,10),B=parseInt(g.borderRightWidth,10),P=parseInt(g.borderBottomWidth,10);let V=0,_=0;const X="offsetWidth"in h?h.offsetWidth-h.clientWidth-j-B:0,G="offsetHeight"in h?h.offsetHeight-h.clientHeight-z-P:0,U="offsetWidth"in h?h.offsetWidth===0?0:L/h.offsetWidth:0,k="offsetHeight"in h?h.offsetHeight===0?0:N/h.offsetHeight:0;if(R===h)V=s==="start"?w:s==="end"?w-O:s==="nearest"?ae(a,a+O,O,z,P,a+w,a+w+y,y):w-O/2,_=u==="start"?I:u==="center"?I-E/2:u==="end"?I-E:ae(C,C+E,E,j,B,C+I,C+I+x,x),V=Math.max(0,V+a),_=Math.max(0,_+C);else{V=s==="start"?w-D-z:s==="end"?w-A+P+G:s==="nearest"?ae(D,A,N,z,P+G,w,w+y,y):w-(D+N/2)+G/2,_=u==="start"?I-H-j:u==="center"?I-(H+L/2)+X/2:u==="end"?I-M+B+X:ae(H,M,L,j,B+X,I,I+x,x);const{scrollLeft:J,scrollTop:W}=h;V=Math.max(0,Math.min(W+V/k,h.scrollHeight-N/k+G)),_=Math.max(0,Math.min(J+_/U,h.scrollWidth-L/U+X)),w+=W-V,I+=J-_}T.push({el:h,top:V,left:_})}return T},jt=e=>e===!1?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&Object.keys(t).length!==0)(e)?e:{block:"start",inline:"nearest"};function Mt(e,t){if(!e.isConnected||!(n=>{let l=n;for(;l&&l.parentNode;){if(l.parentNode===document)return!0;l=l.parentNode instanceof ShadowRoot?l.parentNode.host:l.parentNode}return!1})(e))return;if((n=>typeof n=="object"&&typeof n.behavior=="function")(t))return t.behavior(Fe(e,t));const r=typeof t=="boolean"||t==null?void 0:t.behavior;for(const{el:n,top:l,left:i}of Fe(e,jt(t)))n.scroll({top:l,left:i,behavior:r})}var _t={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"}},{tag:"path",attrs:{d:"M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"}}]},name:"eye-invisible",theme:"outlined"};const Rt=_t;var zt=function(t,r){return o.createElement(he,be({},t,{ref:r,icon:Rt}))};const Tt=o.forwardRef(zt);var Lt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"};const Vt=Lt;var Wt=function(t,r){return o.createElement(he,be({},t,{ref:r,icon:Vt}))};const At=o.forwardRef(Wt);var qt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"};const Ht=qt;var Bt=function(t,r){return o.createElement(he,be({},t,{ref:r,icon:Ht}))};const Dt=o.forwardRef(Bt),Xt=e=>{const{getPrefixCls:t,direction:r}=o.useContext(ne),{prefixCls:n,className:l}=e,i=t("input-group",n),c=t("input"),[s,u]=wt(c),d=K(i,{[`${i}-lg`]:e.size==="large",[`${i}-sm`]:e.size==="small",[`${i}-compact`]:e.compact,[`${i}-rtl`]:r==="rtl"},u,l),m=o.useContext(oe),S=o.useMemo(()=>Object.assign(Object.assign({},m),{isFormItemInput:!1}),[m]);return s(o.createElement("span",{className:d,style:e.style,onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,onFocus:e.onFocus,onBlur:e.onBlur},o.createElement(oe.Provider,{value:S},e.children)))},Gt=Xt;var Kt=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,n=Object.getOwnPropertySymbols(e);l<n.length;l++)t.indexOf(n[l])<0&&Object.prototype.propertyIsEnumerable.call(e,n[l])&&(r[n[l]]=e[n[l]]);return r};const Qt=e=>e?o.createElement(At,null):o.createElement(Tt,null),Yt={click:"onClick",hover:"onMouseOver"},Ut=o.forwardRef((e,t)=>{const{visibilityToggle:r=!0}=e,n=typeof r=="object"&&r.visible!==void 0,[l,i]=o.useState(()=>n?r.visible:!1),c=o.useRef(null);o.useEffect(()=>{n&&i(r.visible)},[n,r]);const s=St(c),u=()=>{const{disabled:v}=e;v||(l&&s(),i(p=>{var $;const F=!p;return typeof r=="object"&&(($=r.onVisibleChange)===null||$===void 0||$.call(r,F)),F}))},d=v=>{const{action:p="click",iconRender:$=Qt}=e,F=Yt[p]||"",w=$(l),I={[F]:u,className:`${v}-icon`,key:"passwordIcon",onMouseDown:T=>{T.preventDefault()},onMouseUp:T=>{T.preventDefault()}};return o.cloneElement(o.isValidElement(w)?w:o.createElement("span",null,w),I)},{className:m,prefixCls:S,inputPrefixCls:R,size:b}=e,f=Kt(e,["className","prefixCls","inputPrefixCls","size"]),{getPrefixCls:E}=o.useContext(ne),O=E("input",R),C=E("input-password",S),a=r&&d(C),y=K(C,m,{[`${C}-${b}`]:!!b}),x=Object.assign(Object.assign({},ze(f,["suffix","iconRender","visibilityToggle"])),{type:l?"text":"password",className:y,prefixCls:O,suffix:a});return b&&(x.size=b),o.createElement(ve,Object.assign({ref:Ce(t,c)},x))}),Jt=Ut;var Zt=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,n=Object.getOwnPropertySymbols(e);l<n.length;l++)t.indexOf(n[l])<0&&Object.prototype.propertyIsEnumerable.call(e,n[l])&&(r[n[l]]=e[n[l]]);return r};const kt=o.forwardRef((e,t)=>{const{prefixCls:r,inputPrefixCls:n,className:l,size:i,suffix:c,enterButton:s=!1,addonAfter:u,loading:d,disabled:m,onSearch:S,onChange:R,onCompositionStart:b,onCompositionEnd:f}=e,E=Zt(e,["prefixCls","inputPrefixCls","className","size","suffix","enterButton","addonAfter","loading","disabled","onSearch","onChange","onCompositionStart","onCompositionEnd"]),{getPrefixCls:O,direction:C}=o.useContext(ne),a=o.useRef(!1),y=O("input-search",r),x=O("input",n),{compactSize:v}=Qe(y,C),p=Te(g=>{var j;return(j=i??v)!==null&&j!==void 0?j:g}),$=o.useRef(null),F=g=>{g&&g.target&&g.type==="click"&&S&&S(g.target.value,g),R&&R(g)},w=g=>{var j;document.activeElement===((j=$.current)===null||j===void 0?void 0:j.input)&&g.preventDefault()},I=g=>{var j,z;S&&S((z=(j=$.current)===null||j===void 0?void 0:j.input)===null||z===void 0?void 0:z.value,g)},T=g=>{a.current||d||I(g)},q=typeof s=="boolean"?o.createElement(Ot,null):null,h=`${y}-button`;let N;const L=s||{},D=L.type&&L.type.__ANT_BUTTON===!0;D||L.type==="button"?N=ge(L,Object.assign({onMouseDown:w,onClick:g=>{var j,z;(z=(j=L==null?void 0:L.props)===null||j===void 0?void 0:j.onClick)===null||z===void 0||z.call(j,g),I(g)},key:"enterButton"},D?{className:h,size:p}:{})):N=o.createElement(Ye,{className:h,type:s?"primary":void 0,size:p,disabled:m,key:"enterButton",onMouseDown:w,onClick:I,loading:d,icon:q},s),u&&(N=[N,ge(u,{key:"addonAfter"})]);const M=K(y,{[`${y}-rtl`]:C==="rtl",[`${y}-${p}`]:!!p,[`${y}-with-button`]:!!s},l),A=g=>{a.current=!0,b==null||b(g)},H=g=>{a.current=!1,f==null||f(g)};return o.createElement(ve,Object.assign({ref:Ce($,t),onPressEnter:T},E,{size:p,onCompositionStart:A,onCompositionEnd:H,prefixCls:x,addonAfter:N,suffix:c,onChange:F,className:M,disabled:m}))}),en=kt,le=ve;le.Group=Gt;le.Search=en;le.TextArea=Et;le.Password=Jt;const Dn=le;function ce(e){const[t,r]=o.useState(e);return o.useEffect(()=>{const n=setTimeout(()=>{r(e)},e.length?0:10);return()=>{clearTimeout(n)}},[e]),t}const tn=e=>{const{componentCls:t}=e,r=`${t}-show-help`,n=`${t}-show-help-item`;return{[r]:{transition:`opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`,"&-appear, &-enter":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}},[n]:{overflow:"hidden",transition:`height ${e.motionDurationSlow} ${e.motionEaseInOut},
                     opacity ${e.motionDurationSlow} ${e.motionEaseInOut},
                     transform ${e.motionDurationSlow} ${e.motionEaseInOut} !important`,[`&${n}-appear, &${n}-enter`]:{transform:"translateY(-5px)",opacity:0,"&-active":{transform:"translateY(0)",opacity:1}},[`&${n}-leave-active`]:{transform:"translateY(-5px)"}}}}},nn=tn,rn=e=>({legend:{display:"block",width:"100%",marginBottom:e.marginLG,padding:0,color:e.colorTextDescription,fontSize:e.fontSizeLG,lineHeight:"inherit",border:0,borderBottom:`${e.lineWidth}px ${e.lineType} ${e.colorBorder}`},label:{fontSize:e.fontSize},'input[type="search"]':{boxSizing:"border-box"},'input[type="radio"], input[type="checkbox"]':{lineHeight:"normal"},'input[type="file"]':{display:"block"},'input[type="range"]':{display:"block",width:"100%"},"select[multiple], select[size]":{height:"auto"},"input[type='file']:focus,\n  input[type='radio']:focus,\n  input[type='checkbox']:focus":{outline:0,boxShadow:`0 0 0 ${e.controlOutlineWidth}px ${e.controlOutline}`},output:{display:"block",paddingTop:15,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight}}),je=(e,t)=>{const{formItemCls:r}=e;return{[r]:{[`${r}-label > label`]:{height:t},[`${r}-control-input`]:{minHeight:t}}}},on=e=>{const{componentCls:t}=e;return{[e.componentCls]:Object.assign(Object.assign(Object.assign({},Ve(e)),rn(e)),{[`${t}-text`]:{display:"inline-block",paddingInlineEnd:e.paddingSM},"&-small":Object.assign({},je(e,e.controlHeightSM)),"&-large":Object.assign({},je(e,e.controlHeightLG))})}},ln=e=>{const{formItemCls:t,iconCls:r,componentCls:n,rootPrefixCls:l}=e;return{[t]:Object.assign(Object.assign({},Ve(e)),{marginBottom:e.marginLG,verticalAlign:"top","&-with-help":{transition:"none"},[`&-hidden,
        &-hidden.${l}-row`]:{display:"none"},"&-has-warning":{[`${t}-split`]:{color:e.colorError}},"&-has-error":{[`${t}-split`]:{color:e.colorWarning}},[`${t}-label`]:{display:"inline-block",flexGrow:0,overflow:"hidden",whiteSpace:"nowrap",textAlign:"end",verticalAlign:"middle","&-left":{textAlign:"start"},"&-wrap":{overflow:"unset",lineHeight:`${e.lineHeight} - 0.25em`,whiteSpace:"unset"},"> label":{position:"relative",display:"inline-flex",alignItems:"center",maxWidth:"100%",height:e.controlHeight,color:e.colorTextHeading,fontSize:e.fontSize,[`> ${r}`]:{fontSize:e.fontSize,verticalAlign:"top"},[`&${t}-required:not(${t}-required-mark-optional)::before`]:{display:"inline-block",marginInlineEnd:e.marginXXS,color:e.colorError,fontSize:e.fontSize,fontFamily:"SimSun, sans-serif",lineHeight:1,content:'"*"',[`${n}-hide-required-mark &`]:{display:"none"}},[`${t}-optional`]:{display:"inline-block",marginInlineStart:e.marginXXS,color:e.colorTextDescription,[`${n}-hide-required-mark &`]:{display:"none"}},[`${t}-tooltip`]:{color:e.colorTextDescription,cursor:"help",writingMode:"horizontal-tb",marginInlineStart:e.marginXXS},"&::after":{content:'":"',position:"relative",marginBlock:0,marginInlineStart:e.marginXXS/2,marginInlineEnd:e.marginXS},[`&${t}-no-colon::after`]:{content:'"\\a0"'}}},[`${t}-control`]:{display:"flex",flexDirection:"column",flexGrow:1,[`&:first-child:not([class^="'${l}-col-'"]):not([class*="' ${l}-col-'"])`]:{width:"100%"},"&-input":{position:"relative",display:"flex",alignItems:"center",minHeight:e.controlHeight,"&-content":{flex:"auto",maxWidth:"100%"}}},[t]:{"&-explain, &-extra":{clear:"both",color:e.colorTextDescription,fontSize:e.fontSize,lineHeight:e.lineHeight},"&-explain-connected":{width:"100%"},"&-extra":{minHeight:e.controlHeightSM,transition:`color ${e.motionDurationMid} ${e.motionEaseOut}`},"&-explain":{"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning}}},[`&-with-help ${t}-explain`]:{height:"auto",opacity:1},[`${t}-feedback-icon`]:{fontSize:e.fontSize,textAlign:"center",visibility:"visible",animationName:Le,animationDuration:e.motionDurationMid,animationTimingFunction:e.motionEaseOutBack,pointerEvents:"none","&-success":{color:e.colorSuccess},"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning},"&-validating":{color:e.colorPrimary}}})}},sn=e=>{const{componentCls:t,formItemCls:r,rootPrefixCls:n}=e;return{[`${t}-horizontal`]:{[`${r}-label`]:{flexGrow:0},[`${r}-control`]:{flex:"1 1 0",minWidth:0},[`${r}-label.${n}-col-24 + ${r}-control`]:{minWidth:"unset"}}}},an=e=>{const{componentCls:t,formItemCls:r}=e;return{[`${t}-inline`]:{display:"flex",flexWrap:"wrap",[r]:{flex:"none",marginInlineEnd:e.margin,marginBottom:0,"&-row":{flexWrap:"nowrap"},"&-with-help":{marginBottom:e.marginLG},[`> ${r}-label,
        > ${r}-control`]:{display:"inline-block",verticalAlign:"top"},[`> ${r}-label`]:{flex:"none"},[`${t}-text`]:{display:"inline-block"},[`${r}-has-feedback`]:{display:"inline-block"}}}}},te=e=>({padding:`0 0 ${e.paddingXS}px`,whiteSpace:"initial",textAlign:"start","> label":{margin:0,"&::after":{visibility:"hidden"}}}),cn=e=>{const{componentCls:t,formItemCls:r}=e;return{[`${r} ${r}-label`]:te(e),[t]:{[r]:{flexWrap:"wrap",[`${r}-label,
          ${r}-control`]:{flex:"0 0 100%",maxWidth:"100%"}}}}},un=e=>{const{componentCls:t,formItemCls:r,rootPrefixCls:n}=e;return{[`${t}-vertical`]:{[r]:{"&-row":{flexDirection:"column"},"&-label > label":{height:"auto"},[`${t}-item-control`]:{width:"100%"}}},[`${t}-vertical ${r}-label,
      .${n}-col-24${r}-label,
      .${n}-col-xl-24${r}-label`]:te(e),[`@media (max-width: ${e.screenXSMax}px)`]:[cn(e),{[t]:{[`.${n}-col-xs-24${r}-label`]:te(e)}}],[`@media (max-width: ${e.screenSMMax}px)`]:{[t]:{[`.${n}-col-sm-24${r}-label`]:te(e)}},[`@media (max-width: ${e.screenMDMax}px)`]:{[t]:{[`.${n}-col-md-24${r}-label`]:te(e)}},[`@media (max-width: ${e.screenLGMax}px)`]:{[t]:{[`.${n}-col-lg-24${r}-label`]:te(e)}}}},xe=Ue("Form",(e,t)=>{let{rootPrefixCls:r}=t;const n=Je(e,{formItemCls:`${e.componentCls}-item`,rootPrefixCls:r});return[on(n),ln(n),nn(n),sn(n),an(n),un(n),Pt(n),Le]}),Me=[];function pe(e,t,r){let n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return{key:typeof e=="string"?e:`${t}-${n}`,error:e,errorStatus:r}}function He(e){let{help:t,helpStatus:r,errors:n=Me,warnings:l=Me,className:i,fieldId:c,onVisibleChanged:s}=e;const{prefixCls:u}=o.useContext(ye),d=`${u}-item-explain`,[,m]=xe(u),S=o.useMemo(()=>Oe(u),[u]),R=ce(n),b=ce(l),f=o.useMemo(()=>t!=null?[pe(t,"help",r)]:[].concat(Q(R.map((O,C)=>pe(O,"error","error",C))),Q(b.map((O,C)=>pe(O,"warning","warning",C)))),[t,r,R,b]),E={};return c&&(E.id=`${c}_help`),o.createElement(Ze,{motionDeadline:S.motionDeadline,motionName:`${u}-show-help`,visible:!!f.length,onVisibleChanged:s},O=>{const{className:C,style:a}=O;return o.createElement("div",Object.assign({},E,{className:K(d,C,i,m),style:a,role:"alert"}),o.createElement(ke,Object.assign({keys:f},Oe(u),{motionName:`${u}-show-help-item`,component:!1}),y=>{const{key:x,error:v,errorStatus:p,className:$,style:F}=y;return o.createElement("div",{key:x,className:K($,{[`${d}-${p}`]:p}),style:F},v)}))})}const dn=["parentNode"],mn="form_item";function re(e){return e===void 0||e===!1?[]:Array.isArray(e)?e:[e]}function Be(e,t){if(!e.length)return;const r=e.join("_");return t?`${t}_${r}`:dn.includes(r)?`${mn}_${r}`:r}function _e(e){return re(e).join("_")}function De(e){const[t]=et(),r=o.useRef({}),n=o.useMemo(()=>e??Object.assign(Object.assign({},t),{__INTERNAL__:{itemRef:l=>i=>{const c=_e(l);i?r.current[c]=i:delete r.current[c]}},scrollToField:function(l){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const c=re(l),s=Be(c,n.__INTERNAL__.name),u=s?document.getElementById(s):null;u&&Mt(u,Object.assign({scrollMode:"if-needed",block:"nearest"},i))},getFieldInstance:l=>{const i=_e(l);return r.current[i]}}),[e,t]);return[n]}var fn=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,n=Object.getOwnPropertySymbols(e);l<n.length;l++)t.indexOf(n[l])<0&&Object.prototype.propertyIsEnumerable.call(e,n[l])&&(r[n[l]]=e[n[l]]);return r};const pn=(e,t)=>{const r=o.useContext(tt),{getPrefixCls:n,direction:l,form:i}=o.useContext(ne),{prefixCls:c,className:s,rootClassName:u,size:d,disabled:m=r,form:S,colon:R,labelAlign:b,labelWrap:f,labelCol:E,wrapperCol:O,hideRequiredMark:C,layout:a="horizontal",scrollToFirstError:y,requiredMark:x,onFinishFailed:v,name:p,style:$}=e,F=fn(e,["prefixCls","className","rootClassName","size","disabled","form","colon","labelAlign","labelWrap","labelCol","wrapperCol","hideRequiredMark","layout","scrollToFirstError","requiredMark","onFinishFailed","name","style"]),w=Te(d),I=o.useContext(nt),T=o.useMemo(()=>x!==void 0?x:i&&i.requiredMark!==void 0?i.requiredMark:!C,[C,x,i]),q=R??(i==null?void 0:i.colon),h=n("form",c),[N,L]=xe(h),D=K(h,`${h}-${a}`,{[`${h}-hide-required-mark`]:T===!1,[`${h}-rtl`]:l==="rtl",[`${h}-${w}`]:w},L,i==null?void 0:i.className,s,u),[M]=De(S),{__INTERNAL__:A}=M;A.name=p;const H=o.useMemo(()=>({name:p,labelAlign:b,labelCol:E,labelWrap:f,wrapperCol:O,vertical:a==="vertical",colon:q,requiredMark:T,itemRef:A.itemRef,form:M}),[p,b,E,O,a,q,T,M]);o.useImperativeHandle(t,()=>M);const g=(z,B)=>{if(z){let P={block:"nearest"};typeof z=="object"&&(P=z),M.scrollToField(B,P)}},j=z=>{if(v==null||v(z),z.errorFields.length){const B=z.errorFields[0].name;if(y!==void 0){g(y,B);return}i&&i.scrollToFirstError!==void 0&&g(i.scrollToFirstError,B)}};return N(o.createElement(rt,{disabled:m},o.createElement(ot,{size:w},o.createElement(We,{validateMessages:I},o.createElement(Z.Provider,{value:H},o.createElement(lt,Object.assign({id:p},F,{name:p,onFinishFailed:j,form:M,style:Object.assign(Object.assign({},i==null?void 0:i.style),$),className:D})))))))},gn=o.forwardRef(pn),hn=gn,Xe=()=>{const{status:e,errors:t=[],warnings:r=[]}=o.useContext(oe);return{status:e,errors:t,warnings:r}};Xe.Context=oe;const bn=Xe;function Cn(e){const[t,r]=o.useState(e),n=o.useRef(null),l=o.useRef([]),i=o.useRef(!1);o.useEffect(()=>(i.current=!1,()=>{i.current=!0,Ie.cancel(n.current),n.current=null}),[]);function c(s){i.current||(n.current===null&&(l.current=[],n.current=Ie(()=>{n.current=null,r(u=>{let d=u;return l.current.forEach(m=>{d=m(d)}),d})})),l.current.push(s))}return[t,c]}function yn(){const{itemRef:e}=o.useContext(Z),t=o.useRef({});function r(n,l){const i=l&&typeof l=="object"&&l.ref,c=n.join("_");return(t.current.name!==c||t.current.originRef!==i)&&(t.current.name=c,t.current.originRef=i,t.current.ref=Ce(e(n),i)),t.current.ref}return r}const vn=e=>{const{prefixCls:t,status:r,wrapperCol:n,children:l,errors:i,warnings:c,_internalItemRender:s,extra:u,help:d,fieldId:m,marginBottom:S,onErrorVisibleChanged:R}=e,b=`${t}-item`,f=o.useContext(Z),E=n||f.wrapperCol||{},O=K(`${b}-control`,E.className),C=o.useMemo(()=>Object.assign({},f),[f]);delete C.labelCol,delete C.wrapperCol;const a=o.createElement("div",{className:`${b}-control-input`},o.createElement("div",{className:`${b}-control-input-content`},l)),y=o.useMemo(()=>({prefixCls:t,status:r}),[t,r]),x=S!==null||i.length||c.length?o.createElement("div",{style:{display:"flex",flexWrap:"nowrap"}},o.createElement(ye.Provider,{value:y},o.createElement(He,{fieldId:m,errors:i,warnings:c,help:d,helpStatus:r,className:`${b}-explain-connected`,onVisibleChanged:R})),!!S&&o.createElement("div",{style:{width:0,height:S}})):null,v={};m&&(v.id=`${m}_extra`);const p=u?o.createElement("div",Object.assign({},v,{className:`${b}-extra`}),u):null,$=s&&s.mark==="pro_table_render"&&s.render?s.render(e,{input:a,errorList:x,extra:p}):o.createElement(o.Fragment,null,a,x,p);return o.createElement(Z.Provider,{value:C},o.createElement(qe,Object.assign({},E,{className:O}),$))},xn=vn;var $n=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,n=Object.getOwnPropertySymbols(e);l<n.length;l++)t.indexOf(n[l])<0&&Object.prototype.propertyIsEnumerable.call(e,n[l])&&(r[n[l]]=e[n[l]]);return r};function wn(e){return e?typeof e=="object"&&!o.isValidElement(e)?e:{title:e}:null}const Sn=e=>{let{prefixCls:t,label:r,htmlFor:n,labelCol:l,labelAlign:i,colon:c,required:s,requiredMark:u,tooltip:d}=e;var m;const[S]=it("Form"),{vertical:R,labelAlign:b,labelCol:f,labelWrap:E,colon:O}=o.useContext(Z);if(!r)return null;const C=l||f||{},a=i||b,y=`${t}-item-label`,x=K(y,a==="left"&&`${y}-left`,C.className,{[`${y}-wrap`]:!!E});let v=r;const p=c===!0||O!==!1&&c!==!1;p&&!R&&typeof r=="string"&&r.trim()!==""&&(v=r.replace(/[:|：]\s*$/,""));const F=wn(d);if(F){const{icon:I=o.createElement(Dt,null)}=F,T=$n(F,["icon"]),q=o.createElement(Nt,Object.assign({},T),o.cloneElement(I,{className:`${t}-item-tooltip`,title:""}));v=o.createElement(o.Fragment,null,v,q)}u==="optional"&&!s&&(v=o.createElement(o.Fragment,null,v,o.createElement("span",{className:`${t}-item-optional`,title:""},(S==null?void 0:S.optional)||((m=st.Form)===null||m===void 0?void 0:m.optional))));const w=K({[`${t}-item-required`]:s,[`${t}-item-required-mark-optional`]:u==="optional",[`${t}-item-no-colon`]:!p});return o.createElement(qe,Object.assign({},C,{className:x}),o.createElement("label",{htmlFor:n,className:w,title:typeof r=="string"?r:""},v))},En=Sn;var On=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,n=Object.getOwnPropertySymbols(e);l<n.length;l++)t.indexOf(n[l])<0&&Object.prototype.propertyIsEnumerable.call(e,n[l])&&(r[n[l]]=e[n[l]]);return r};const In={success:ut,warning:dt,error:mt,validating:ft};function Pn(e){const{prefixCls:t,className:r,rootClassName:n,style:l,help:i,errors:c,warnings:s,validateStatus:u,meta:d,hasFeedback:m,hidden:S,children:R,fieldId:b,required:f,isRequired:E,onSubItemMetaChange:O}=e,C=On(e,["prefixCls","className","rootClassName","style","help","errors","warnings","validateStatus","meta","hasFeedback","hidden","children","fieldId","required","isRequired","onSubItemMetaChange"]),a=`${t}-item`,{requiredMark:y}=o.useContext(Z),x=o.useRef(null),v=ce(c),p=ce(s),$=i!=null,F=!!($||c.length||s.length),w=!!x.current&&at(x.current),[I,T]=o.useState(null);ct(()=>{if(F&&x.current){const M=getComputedStyle(x.current);T(parseInt(M.marginBottom,10))}},[F,w]);const q=M=>{M||T(null)},N=function(){let M=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,A="";const H=M?v:d.errors,g=M?p:d.warnings;return u!==void 0?A=u:d.validating?A="validating":H.length?A="error":g.length?A="warning":(d.touched||m&&d.validated)&&(A="success"),A}(),L=o.useMemo(()=>{let M;if(m){const A=N&&In[N];M=A?o.createElement("span",{className:K(`${a}-feedback-icon`,`${a}-feedback-icon-${N}`)},o.createElement(A,null)):null}return{status:N,errors:c,warnings:s,hasFeedback:m,feedbackIcon:M,isFormItemInput:!0}},[N,m]),D=K(a,r,n,{[`${a}-with-help`]:$||v.length||p.length,[`${a}-has-feedback`]:N&&m,[`${a}-has-success`]:N==="success",[`${a}-has-warning`]:N==="warning",[`${a}-has-error`]:N==="error",[`${a}-is-validating`]:N==="validating",[`${a}-hidden`]:S});return o.createElement("div",{className:D,style:l,ref:x},o.createElement(It,Object.assign({className:`${a}-row`},ze(C,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol"])),o.createElement(En,Object.assign({htmlFor:b},e,{requiredMark:y,required:f??E,prefixCls:t})),o.createElement(xn,Object.assign({},e,d,{errors:v,warnings:p,prefixCls:t,status:N,help:i,marginBottom:I,onErrorVisibleChanged:q}),o.createElement(Ae.Provider,{value:O},o.createElement(oe.Provider,{value:L},R)))),!!I&&o.createElement("div",{className:`${a}-margin-offset`,style:{marginBottom:-I}}))}function Nn(e){if(typeof e=="function")return e;const t=pt(e);return t.length<=1?t[0]:t}const Fn="__SPLIT__",jn=o.memo(e=>{let{children:t}=e;return t},(e,t)=>e.value===t.value&&e.update===t.update&&e.childProps.length===t.childProps.length&&e.childProps.every((r,n)=>r===t.childProps[n]));function Mn(e){return e!=null}function Re(){return{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}}function _n(e){const{name:t,noStyle:r,className:n,dependencies:l,prefixCls:i,shouldUpdate:c,rules:s,children:u,required:d,label:m,messageVariables:S,trigger:R="onChange",validateTrigger:b,hidden:f,help:E}=e,{getPrefixCls:O}=o.useContext(ne),{name:C}=o.useContext(Z),a=Nn(u),y=typeof a=="function",x=o.useContext(Ae),{validateTrigger:v}=o.useContext(gt),p=b!==void 0?b:v,$=Mn(t),F=O("form",i),[w,I]=xe(F),T=o.useContext(ht),q=o.useRef(),[h,N]=Cn({}),[L,D]=bt(()=>Re()),M=P=>{const V=T==null?void 0:T.getKey(P.name);if(D(P.destroy?Re():P,!0),r&&E!==!1&&x){let _=P.name;if(P.destroy)_=q.current||_;else if(V!==void 0){const[X,G]=V;_=[X].concat(Q(G)),q.current=_}x(P,_)}},A=(P,V)=>{N(_=>{const X=Object.assign({},_),U=[].concat(Q(P.name.slice(0,-1)),Q(V)).join(Fn);return P.destroy?delete X[U]:X[U]=P,X})},[H,g]=o.useMemo(()=>{const P=Q(L.errors),V=Q(L.warnings);return Object.values(h).forEach(_=>{P.push.apply(P,Q(_.errors||[])),V.push.apply(V,Q(_.warnings||[]))}),[P,V]},[h,L.errors,L.warnings]),j=yn();function z(P,V,_){return r&&!f?P:o.createElement(Pn,Object.assign({key:"row"},e,{className:K(n,I),prefixCls:F,fieldId:V,isRequired:_,errors:H,warnings:g,meta:L,onSubItemMetaChange:A}),P)}if(!$&&!y&&!l)return w(z(a));let B={};return typeof m=="string"?B.label=m:t&&(B.label=String(t)),S&&(B=Object.assign(Object.assign({},B),S)),w(o.createElement(Ct,Object.assign({},e,{messageVariables:B,trigger:R,validateTrigger:p,onMetaChange:M}),(P,V,_)=>{const X=re(t).length&&V?V.name:[],G=Be(X,C),U=d!==void 0?d:!!(s&&s.some(W=>{if(W&&typeof W=="object"&&W.required&&!W.warningOnly)return!0;if(typeof W=="function"){const ie=W(_);return ie&&ie.required&&!ie.warningOnly}return!1})),k=Object.assign({},P);let J=null;if(Array.isArray(a)&&$)J=a;else if(!(y&&(!(c||l)||$))){if(!(l&&!y&&!$))if(yt(a)){const W=Object.assign(Object.assign({},a.props),k);if(W.id||(W.id=G),E||H.length>0||g.length>0||e.extra){const ee=[];(E||H.length>0)&&ee.push(`${G}_help`),e.extra&&ee.push(`${G}_extra`),W["aria-describedby"]=ee.join(" ")}H.length>0&&(W["aria-invalid"]="true"),U&&(W["aria-required"]="true"),vt(a)&&(W.ref=j(X,a)),new Set([].concat(Q(re(R)),Q(re(p)))).forEach(ee=>{W[ee]=function(){for(var $e,we,ue,Se,de,Ee=arguments.length,me=new Array(Ee),se=0;se<Ee;se++)me[se]=arguments[se];(ue=k[ee])===null||ue===void 0||($e=ue).call.apply($e,[k].concat(me)),(de=(Se=a.props)[ee])===null||de===void 0||(we=de).call.apply(we,[Se].concat(me))}});const Ke=[W["aria-required"],W["aria-invalid"],W["aria-describedby"]];J=o.createElement(jn,{value:k[e.valuePropName||"value"],update:a,childProps:Ke},ge(a,W))}else y&&(c||l)&&!$?J=a(_):J=a}return z(J,G,U)}))}const Ge=_n;Ge.useStatus=bn;const Rn=Ge;var zn=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,n=Object.getOwnPropertySymbols(e);l<n.length;l++)t.indexOf(n[l])<0&&Object.prototype.propertyIsEnumerable.call(e,n[l])&&(r[n[l]]=e[n[l]]);return r};const Tn=e=>{var{prefixCls:t,children:r}=e,n=zn(e,["prefixCls","children"]);const{getPrefixCls:l}=o.useContext(ne),i=l("form",t),c=o.useMemo(()=>({prefixCls:i,status:"error"}),[i]);return o.createElement(xt,Object.assign({},n),(s,u,d)=>o.createElement(ye.Provider,{value:c},r(s.map(m=>Object.assign(Object.assign({},m),{fieldKey:m.key})),u,{errors:d.errors,warnings:d.warnings})))},Ln=Tn;function Vn(){const{form:e}=o.useContext(Z);return e}const Y=hn;Y.Item=Rn;Y.List=Ln;Y.ErrorList=He;Y.useForm=De;Y.useFormInstance=Vn;Y.useWatch=$t;Y.Provider=We;Y.create=()=>{};const Xn=Y;export{Xn as F,Dn as I};
