(this["webpackJsonpcommon-time"]=this["webpackJsonpcommon-time"]||[]).push([[0],{154:function(e,t,n){},155:function(e,t,n){},164:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),s=n(46),r=n.n(s),i=(n(154),n(17)),o=n(10),l=(n(155),n(125)),j=n(231),u=n(222),d=n(224),b=n(233),m=n(111),p=n.n(m),O=n(33),h=n(7),x=n(117),f=n(121),g=n(56),v=n(76),S=n(127),y=n(126);function M(e){return Object(S.a)(e,"EEE, MMM. dd")}function D(e){return Object(S.a)(e,"h:mmaaa")}function w(e){return Object(y.a)(e,"EEE, MMM. dd",new Date)}function T(e,t){return Object(y.a)(e+" "+t,"EEE, MMM. dd h:mmaaa",new Date)}var k=n(226),C=n(225),E=n(168),N=n(223),H=n(2),R=Object(h.a)(x.a,{shouldForwardProp:function(e){return"isHighlight"!==e}})((function(e){var t=e.theme,n=e.isHighlight;return Object(O.a)({},n&&{backgroundColor:t.palette.primary.main,color:t.palette.common.white,"&:hover, &:focus":{backgroundColor:t.palette.primary.dark}})}));function A(e){var t=e.selectedDates,n=e.setSelectedDates;return Object(H.jsx)(E.b,{dateAdapter:C.a,children:Object(H.jsx)(N.a,{displayStaticWrapperAs:"desktop",value:null,shouldDisableDate:f.a,allowSameDateSelection:!0,onChange:function(e){var a=M(Object(v.a)(e,{hours:0,minutes:0,seconds:0,milliseconds:0}));console.log("DPkr chg: ",e,a,t.has(a)),t.has(a)?t.delete(a):t.set(a,[]),n((function(e){return new Map(Object(i.a)(t).sort((function(e,t){return Object(g.a)(w(e[0]),w(t[0]))})))}))},renderDay:function(e,n,a){var c=M(e);return 0===t.size?Object(H.jsx)(x.a,Object(O.a)({},a)):null==t.get(c)?Object(H.jsx)(R,Object(O.a)({isHighlight:!1},a)):Object(H.jsx)(R,Object(O.a)({isHighlight:!0},a))},renderInput:function(e){return Object(H.jsx)(k.a,Object(O.a)({},e))},inputFormat:"'Week of' MMM d"})})}var F=n(235),I=n(230),L=n(227),P=n(229),W=n(236),z=n(234),B=n(219),J=n(228),G=Object(h.a)(J.a)((function(e){var t=e.theme;return{color:(t.palette.mode,"#3880ff"),height:2,padding:"15px 0","& .MuiSlider-valueLabel":{fontSize:12,fontWeight:"normal",top:40,backgroundColor:"unset",color:t.palette.text.primary}}}));function q(e){var t=e.timeStep,n=e.setTimeStep,a=e.dayHoursRange,c=e.setDayHoursRange,s=e.resetTimesMap;return Object(H.jsxs)(H.Fragment,{children:[Object(H.jsxs)(F.a,{sx:{width:"20vw"},children:[Object(H.jsx)(B.a,{component:"legend",children:"Hours Range"}),Object(H.jsx)(G,{getAriaLabel:function(){return"Day Hours Range"},value:a,onChange:function(e,t,n){Array.isArray(t)&&c(0===n?[Math.min(t[0],a[1]-1),a[1]]:[a[0],Math.max(t[1],a[0]+1)])},valueLabelDisplay:"on",disableSwap:!0,min:0,max:24,size:"small"})]}),Object(H.jsxs)(z.a,{component:"fieldset",children:[Object(H.jsx)(B.a,{component:"legend",children:"Time Step"}),Object(H.jsxs)(P.a,{row:!0,"aria-label":"Time Step",name:"timestep-opt",value:t,onChange:function(e){return n(e.target.value)},children:[Object(H.jsx)(W.a,{value:60,label:"60",control:Object(H.jsx)(L.a,{})}),Object(H.jsx)(W.a,{value:30,label:"30",control:Object(H.jsx)(L.a,{})}),Object(H.jsx)(W.a,{value:15,label:"15",control:Object(H.jsx)(L.a,{})})]})]}),Object(H.jsx)(I.a,{variant:"contained",onClick:function(){s()},children:"Reset"}),Object(H.jsx)("span",{children:" "}),"  "]})}var K=n(128),Q=n(122),U=n(53),V=n(79),X=n(124),Y=n(123),Z={minutes:0,seconds:0,milliseconds:0};function $(e,t){if(null==e||null==t||null==e.start||null==t.start||null==e.end||null==t.end)return!1;var n={start:Object(V.a)(e.start,{seconds:-10}),end:Object(V.a)(e.end,{seconds:10})},a={start:Object(V.a)(t.start,{seconds:-10}),end:Object(V.a)(t.end,{seconds:10})};return Object(Q.a)(n,a)}function _(e,t,n){if(console.log("(D): DateTimes Entries: ",n,e,t),0===t.length)return[e,["NA"]];for(var a=T(e,t[0]),c=[{start:a,end:Object(U.a)(a,n)}],s=0,r=1;r<t.length;r++){var i=T(e,t[r]),o={start:i,end:Object(U.a)(i,n)};$(c[s],o)?(c[s].start=Object(Y.a)([c[s].start,o.start]),c[s].end=Object(X.a)([c[s].end,o.end])):(s++,c.push(o))}return[e,c.map((function(e){return"".concat(D(e.start),"-").concat(D(e.end))})).join("; ")]}function ee(e){var t=e.time,n=e.isSelected,a=e.setIsSelected,c=n?"time-block-selected":"time-block";return Object(H.jsx)("div",{onClick:function(e){a(t)},className:c,children:Object(H.jsx)("span",{children:t})})}function te(e){var t=e.date,n=e.timeRange,a=e.timeStep,c=e.selectedTimes,s=e.setSelectedTimes,r=function(e){var n=c.get(t),a=n.indexOf(e);if(a>=0)n.splice(a,1);else{n.push(e);var r=n.map((function(e){return T(t,e)})).sort().map((function(e){return D(e)}));c.set(t,r),console.log("(D): times: ",t,n,r,c)}s((function(e){return new Map(c)}))},i=Object(K.a)({start:Object(v.a)(w(t),Object(O.a)(Object(O.a)({},Z),{},{hours:n.start})),end:Object(v.a)(w(t),Object(O.a)(Object(O.a)({},Z),{},{hours:n.end}))},{step:a});return Object(H.jsxs)("div",{className:"time-column",children:[Object(H.jsx)("h2",{children:t}),i.map((function(e){return Object(H.jsx)(ee,{time:D(e),isSelected:c.get(t).includes(D(e)),setIsSelected:r},t+e)}))]})}function ne(e){var t=e.dateTimes,n=e.timeStep;console.log("(D): Render Groups...");var a=Object(i.a)(t.entries()).map((function(e){return _(e[0],e[1],n)}));return Object(H.jsx)("div",{className:"app-column",children:a.map((function(e){return Object(H.jsxs)("span",{className:"app-row",children:[Object(H.jsx)("span",{style:{fontWeight:"bold"},children:e[0]}),Object(H.jsx)("span",{style:{fontFamily:"monospace"},children:e[1]})]},e[0])}))})}var ae=function(){var e=a.useState(new Map),t=Object(o.a)(e,2),n=t[0],c=t[1],s=a.useState(60),r=Object(o.a)(s,2),m=r[0],O=r[1],h=a.useState(null),x=Object(o.a)(h,2),f=x[0],g=x[1],v=a.useState([8,17]),S=Object(o.a)(v,2),y=S[0],M=S[1],D=Object(l.a)({palette:{mode:"dark"}}),w=function(e){var t=function(e,t){return Object(i.a)(t.entries()).map((function(t){var n=_(t[0],t[1],e),a=Object(o.a)(n,2),c=a[0],s=a[1];return"".concat(c,":  ").concat(s)})).join("\n")}(m,n);console.log("(D): copyText: ",t),null!=navigator.clipboard?navigator.clipboard.writeText(t).then(null,(function(e){g("Copied failed")})):g("unable to copy")};return Object(H.jsxs)("div",{className:"App",children:[Object(H.jsx)("header",{className:"app-header",children:Object(H.jsxs)(j.a,{theme:D,children:[Object(H.jsxs)(u.a,{direction:"row",spacing:1,children:[Object(H.jsx)("span",{className:"app-title",children:"Common Time"}),Object(H.jsx)(d.a,{title:"Copy",children:Object(H.jsx)(b.a,{"aria-label":"copy",onClick:w,children:Object(H.jsx)(p.a,{})})})]}),Object(H.jsx)(q,{timeStep:m,setTimeStep:O,dayHoursRange:y,setDayHoursRange:M,resetTimesMap:function(){c(new Map)}})]})}),Object(H.jsxs)("main",{className:"app-content",children:[Object(H.jsxs)("div",{className:"app-row",children:[Object(H.jsx)("div",{className:"app-column",children:Object(H.jsx)(A,{selectedDates:n,setSelectedDates:c})}),Object(i.a)(n.keys()).map((function(e){return Object(H.jsx)(te,{date:e,timeRange:{start:y[0],end:y[1]},timeStep:m,selectedTimes:n,setSelectedTimes:c},e)}))]}),Object(H.jsxs)("div",{children:[Object(H.jsxs)(u.a,{direction:"row",spacing:1,children:[Object(H.jsx)("h2",{children:"Available times"}),Object(H.jsx)(d.a,{title:"Copy",children:Object(H.jsx)(b.a,{"aria-label":"copy",onClick:w,children:Object(H.jsx)(p.a,{})})}),null!=f&&Object(H.jsx)("span",{style:{color:"red"},children:f})]}),Object(H.jsx)(ne,{dateTimes:n,timeStep:m})]}),Object(H.jsx)("br",{})]})]})},ce=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,238)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),s(e),r(e)}))};r.a.render(Object(H.jsx)(c.a.StrictMode,{children:Object(H.jsx)(ae,{})}),document.getElementById("root")),ce()}},[[164,1,2]]]);
//# sourceMappingURL=main.068be0b5.chunk.js.map