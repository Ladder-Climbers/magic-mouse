(this["webpackJsonpmagic-mouse"]=this["webpackJsonpmagic-mouse"]||[]).push([[0],{89:function(t,e,n){},97:function(t,e,n){"use strict";n.r(e);var i=n(0),a=n.n(i),s=n(10),o=n.n(s),c=(n(89),n(17)),l=n(18),r=n(16),d=n(33),h=n(32),u=n(73),g=n(99),f=n(71),j=n.n(f),b=n(134),p=n(140),m=n(142),y=n(72),v=function(){function t(){Object(c.a)(this,t),this.ITEM_NAME="magic_mouse_config",this.load=this.load.bind(this),this.save=this.save.bind(this),this.theme_avaliable={default:Object(y.a)({}),dark:Object(y.a)({palette:{type:"dark"}})},this.key_mapping_templates={default:{left:["left"],right:["right"],up:["up"],down:["down"],start:["f5"],stop:["esc"],writing:["ctrl","p"],laser:["ctrl","l"],ink:["ctrl","m"]}},this.data_default={debug:!1,version_frontend:.11,api:"ws://10.251.124.73/api/v1/ws",url_config:"/config",used_hand:"right",remote_servers:["http://server.chiro.work:10086"],theme_name:"default",theme_avaliable:["default","dark"],key_mapping_name:"default"},this.data=this.data_default,this.theme=this.theme_avaliable.default,this.key_mapping=this.key_mapping_templates.default,this.load()}return Object(l.a)(t,[{key:"load",value:function(){console.log("Config: loading magic mouse config..."),this.data.debug&&(console.log("Config: load default config."),this.save());try{if(this.data=JSON.parse(localStorage.getItem(this.ITEM_NAME)),!this.data)throw new Error("Null data");if(console.log("Got data:",this.data),!this.data.version_frontend||this.data.version_frontend<this.data_default.version_frontend){for(var t in console.log("Config: update ".concat(this.data.version_frontend," -> ").concat(this.data_default.version_frontend)),this.data.version_frontend=this.data_default.version_frontend,this.data_default)this.data[t]||(console.log("    Config: add value ".concat(t)),this.data[t]=this.data_default[t]);this.save()}}catch(e){console.warn("Can not find ".concat(this.ITEM_NAME," in localStorage, use default config.")),this.data=this.data_default,this.save()}this.theme=this.theme_avaliable[this.data.theme_name],this.theme||(this.theme=this.theme_avaliable.default),this.key_mapping=this.key_mapping_templates[this.data.key_mapping_name],this.key_mapping||(this.key_mapping=this.key_mapping_templates.default)}},{key:"save",value:function(){console.log("Config: saving magic mouse config..."),localStorage.setItem(this.ITEM_NAME,JSON.stringify(this.data))}}]),t}(),x=n(98),O=n(4),k=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).icon=t.icon,i.text=t.text,i.color=t.color?t.color:"primary",i.onClick=t.onClick,i}return Object(l.a)(n,[{key:"render",value:function(){return Object(O.jsxs)("div",{style:{width:"100%",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},children:[Object(O.jsx)(b.a,{"aria-label":"play",color:this.color,onClick:this.onClick,children:Object(O.jsx)(this.icon,{})}),Object(O.jsx)(x.a,{variant:"caption",display:"block",style:{color:"#9e9e9e"},children:this.text})]})}}]),n}(a.a.Component),w=n(139),_=n(141),C=n(68),S=n.n(C),E=n(70),I=n.n(E),B=n(69),M=n.n(B),N=n(67),J=n.n(N),T=n(144),D=n(138),W=n(146);a.a.Component;function z(t,e){if(!e)return{cmd:t};var n={cmd:t,data:e};return"data_angle_frame"!=t&&console.log("DataWrapper: will send",n),n}var A=n(143);function H(t){return Object(O.jsx)(T.a,Object(u.a)({elevation:6,variant:"filled"},t))}var F=function(t){Object(d.a)(n,t);var e=Object(h.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).orientationHandler=function(t){i.state.connected&&i.ws&&("null"!==typeof t.alpha?(i.angleInit||(i.angleInit={alpha:t.alpha,beta:t.beta,gamma:t.gamma}),i.ws.send(JSON.stringify(function(t){return z("data_angle_frame",{alpha:t.alpha,beta:t.beta,gamma:t.gamma})}({alpha:t.alpha-i.angleInit.alpha,beta:t.beta-i.angleInit.beta,gamma:t.gamma-i.angleInit.gamma})))):console.warn("Handle: null event!"))},i.orientationHandler=i.orientationHandler.bind(Object(r.a)(i)),i.render=i.render.bind(Object(r.a)(i)),i.connectStart=i.connectStart.bind(Object(r.a)(i)),i.connectEnd=i.connectEnd.bind(Object(r.a)(i)),i.handleButtons=i.handleButtons.bind(Object(r.a)(i)),i.handleMouseClick=i.handleMouseClick.bind(Object(r.a)(i)),i.handleSettingsClose=i.handleSettingsClose.bind(Object(r.a)(i)),i.config=new v,i.ws=null,i.connecting=!1,i.angleInit=null,i.state={orientation:{},openSettings:!1,connected:!1,playing:!1,writing:!1,laser:!1,ink:!0,test_text:""},window.DeviceOrientationEvent?window.addEventListener("deviceorientation",i.throttle(i.orientationHandler,20,20),!1):console.log("Does not support deviceorientation!"),console.log(i.config),console.log(i.config.theme),i.test_text="",i}return Object(l.a)(n,[{key:"throttle",value:function(t,e,n){var i=null,a=new Date;return function(){var s=this,o=arguments,c=new Date;clearTimeout(i),c-a>=n?(t.apply(s,o),a=c):i=setTimeout((function(){t.apply(s,o)}),e)}}},{key:"connectStart",value:function(){var t=this;this.connecting=!0;try{this.ws=new WebSocket(this.config.data.api),this.ws.onopen=function(){console.log("Ws: connected."),t.ws.send(JSON.stringify(z("start"))),t.setState({connected:!0})},this.ws.onclose=function(){t.setState({connected:!1}),console.log("Ws: closed."),t.ws=null},this.ws.onerror=function(){console.error("Websocket Error!!!")}}catch(e){console.error("Error when trying to connect!",e)}this.connecting=!1,console.log("this.ws",this.ws)}},{key:"connectEnd",value:function(){this.ws&&this.state.connected&&!this.connecting&&(this.ws.close(),this.angleInit=null)}},{key:"connectStop",value:function(){this.ws&&this.state.connected&&!this.connecting&&(this.ws.send(JSON.stringify(z("stop_from_client"))),this.connectEnd())}},{key:"handleButtons",value:function(t){if(console.log("handleButtons:",t),t&&this.state.connected&&this.ws){var e=this.config.key_mapping[t];e&&this.ws.send(JSON.stringify(z("key",{keys:e})))}}},{key:"handleMouseClick",value:function(t){console.log("handleMouseClick:",t),this.state.connected&&this.ws&&this.ws.send(JSON.stringify(z("mouse",{mouse_key:t})))}},{key:"handleSettingsClose",value:function(){this.setState({openSettings:!1}),console.log("Settings: got",document.querySelector("#settings-api").value),this.config.data.api=document.querySelector("#settings-api").value,this.config.save()}},{key:"render",value:function(){var t=this;return Object(O.jsx)("div",{children:Object(O.jsxs)(w.a,{theme:this.config.theme,children:[Object(O.jsxs)(p.a,{maxWidth:"xs",children:[Object(O.jsxs)("div",{style:{width:"100%"},children:[Object(O.jsxs)(_.a,{container:!0,spacing:3,children:[Object(O.jsx)(_.a,{item:!0,xs:4,children:Object(O.jsx)(k,{icon:J.a,text:"\u8bbe\u7f6e",onClick:function(){console.log("Opening settings..."),t.setState({openSettings:!0})}})}),Object(O.jsx)(_.a,{item:!0,xs:1}),Object(O.jsx)(_.a,{item:!0,xs:6,children:Object(O.jsx)(H,{severity:"info",children:"\u6b63\u5728\u8ba1\u65f6..."})})]}),Object(O.jsxs)(_.a,{container:!0,spacing:3,children:[Object(O.jsx)(_.a,{item:!0,xs:4,children:Object(O.jsx)(k,{icon:S.a,color:this.state.connected?"secondary":"default",text:"\u8fde\u63a5",onClick:function(){t.connecting||(t.state.connected?t.connectEnd():t.connectStart())}})}),Object(O.jsx)(_.a,{item:!0,xs:4,children:Object(O.jsx)(k,{icon:M.a,text:"\u8ba1\u65f6"})}),Object(O.jsx)(_.a,{item:!0,xs:4,children:Object(O.jsx)(k,{icon:I.a,text:"\u5173\u95ed",onClick:function(){t.connectStop()}})})]}),Object(O.jsxs)(_.a,{container:!0,spacing:1,children:[Object(O.jsx)(_.a,{item:!0,xs:5,children:Object(O.jsx)("div",{style:{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"},children:Object(O.jsxs)(m.a,{color:"primary",children:[Object(O.jsx)(g.a,{onClick:function(){t.handleButtons("start"),t.setState({playing:!0})},children:"\u5f00\u59cb"}),Object(O.jsx)(g.a,{onClick:function(){t.handleButtons("stop")},children:"\u9000\u51fa"})]})})}),Object(O.jsx)(_.a,{item:!0,xs:7,children:Object(O.jsx)("div",{style:{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"},children:Object(O.jsxs)(m.a,{color:"primary",children:[Object(O.jsx)(g.a,{variant:this.state.writing?"contained":"outlined",disableElevation:!0,onClick:function(){t.handleButtons("writing"),t.setState({writing:!t.state.writing,laser:!t.state.laser&&t.state.laser})},children:"\u4e66\u5199"}),Object(O.jsx)(g.a,{variant:this.state.laser?"contained":"outlined",disableElevation:!0,onClick:function(){t.handleButtons("laser"),t.setState({laser:!t.state.laser,writing:!t.state.writing&&t.state.writing})},children:"\u6fc0\u5149"}),Object(O.jsx)(g.a,{variant:this.state.ink?"contained":"outlined",disableElevation:!0,onClick:function(){t.handleButtons("ink"),t.setState({ink:!t.state.ink})},children:"\u58a8\u8ff9"})]})})})]})]}),Object(O.jsxs)("div",{style:{width:"100%",height:"100%"},children:[Object(O.jsx)("div",{style:{width:"100%",display:"flex",justifyContent:"center"},children:Object(O.jsx)(g.a,{size:"large",color:"primary",style:{width:100},onClick:function(){t.handleButtons("up")},children:"\xb7"})}),Object(O.jsxs)("div",{style:{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"},children:[Object(O.jsx)(g.a,{size:"large",color:"primary",style:{height:100},onClick:function(){t.handleButtons("left")},children:"\xb7"}),Object(O.jsx)(b.a,{"aria-label":"play",style:{height:100,width:100},onClick:function(){t.handleMouseClick(0)},children:Object(O.jsx)(j.a,{style:{height:100,width:100}})}),Object(O.jsx)(g.a,{size:"large",color:"primary",style:{height:100},onClick:function(){t.handleButtons("right")},children:"\xb7"})]}),Object(O.jsx)("div",{style:{width:"100%",display:"flex",justifyContent:"center"},children:Object(O.jsx)(g.a,{size:"large",color:"primary",style:{width:100},onClick:function(){t.handleButtons("down")},children:"\xb7"})})]}),Object(O.jsx)("div",{style:{width:"60%",display:"flex",justifyContent:"flex-end",alignItems:"center",position:"fixed",bottom:"8%",right:"10%"},children:Object(O.jsxs)(m.a,{size:"large",variant:"contained",color:"primary",disableElevation:!0,children:[Object(O.jsx)(g.a,{onClick:function(){t.handleButtons("left")},children:"<  \u540e\u9000"}),Object(O.jsx)(g.a,{onClick:function(){t.handleButtons("right")},children:"\u524d\u8fdb  >"})]})})]}),Object(O.jsxs)(W.a,{onClose:this.handleSettingsClose,open:this.state.openSettings,children:[Object(O.jsx)(D.a,{children:"\u8bbe\u7f6e"}),Object(O.jsx)(A.a,{id:"settings-api",label:"API",variant:"outlined",defaultValue:this.config.data.api})]})]})})}}]),n}(a.a.Component),L=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,148)).then((function(e){var n=e.getCLS,i=e.getFID,a=e.getFCP,s=e.getLCP,o=e.getTTFB;n(t),i(t),a(t),s(t),o(t)}))};o.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(F,{})}),document.getElementById("root")),L()}},[[97,1,2]]]);
//# sourceMappingURL=main.a91a3269.chunk.js.map