"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9670],{5149:function(e,s,i){i.d(s,{Z:function(){return h}});i(2791);var a=i(1087),n=i(1213),d=i(8820),r=i(3853),l=i(6856),c=i(4651),t=i(458),o=i(184),h=function(e){var s=e.active,i=e.setActive;return(0,o.jsxs)("div",{className:"adminSidebar__main",children:[(0,o.jsx)("div",{onClick:function(){return i(1)},className:1===s?"adminSidebar__row active":"adminSidebar__row",children:(0,o.jsx)(a.rU,{to:"/admin-dashboard",children:(0,o.jsxs)("div",{className:"sidebar__header",children:[(0,o.jsx)("div",{className:"icon",children:(0,o.jsx)(n.toC,{})}),(0,o.jsx)("div",{className:"icon_text",children:"Dashboard"})]})})}),(0,o.jsx)("div",{onClick:function(){return i(2)},className:2===s?"adminSidebar__row active":"adminSidebar__row",children:(0,o.jsx)(a.rU,{to:"/admin-all-products",children:(0,o.jsxs)("div",{className:"sidebar__header",children:[(0,o.jsx)("div",{className:"icon",children:(0,o.jsx)(d.A6B,{})}),(0,o.jsx)("div",{className:"icon_text",children:"All Product"})]})})}),(0,o.jsx)("div",{onClick:function(){return i(3)},className:3===s?"adminSidebar__row active":"adminSidebar__row",children:(0,o.jsx)(a.rU,{to:"/admin-all-orders",children:(0,o.jsxs)("div",{className:"sidebar__header",children:[(0,o.jsx)("div",{className:"icon",children:(0,o.jsx)(r.x8h,{})}),(0,o.jsx)("div",{className:"icon_text",children:"All Orders"})]})})}),(0,o.jsx)("div",{onClick:function(){return i(4)},className:4===s?"adminSidebar__row active":"adminSidebar__row",children:(0,o.jsx)(a.rU,{to:"/admin-all-sellers",children:(0,o.jsxs)("div",{className:"sidebar__header",children:[(0,o.jsx)("div",{className:"icon",children:(0,o.jsx)(r.zFh,{})}),(0,o.jsx)("div",{className:"icon_text",children:"All Seller"})]})})}),(0,o.jsx)("div",{className:5===s?"adminSidebar__row active":"adminSidebar__row",children:(0,o.jsx)(a.rU,{to:"/admin-all-users",children:(0,o.jsxs)("div",{className:"sidebar__header",children:[(0,o.jsx)("div",{className:"icon",children:(0,o.jsx)(l.HUb,{})}),(0,o.jsx)("div",{className:"icon_text",children:"All Users"})]})})}),(0,o.jsx)("div",{className:6===s?"adminSidebar__row active":"adminSidebar__row",children:(0,o.jsx)(a.rU,{to:"/admin-all-events",children:(0,o.jsxs)("div",{className:"sidebar__header",children:[(0,o.jsx)("div",{className:"icon",children:(0,o.jsx)(c.CI7,{})}),(0,o.jsx)("div",{className:"icon_text",children:"All Event"})]})})}),(0,o.jsx)("div",{className:7===s?"adminSidebar__row active":"adminSidebar__row",children:(0,o.jsx)(a.rU,{to:"/admin-withdraw-request",children:(0,o.jsxs)("div",{className:"sidebar__header",children:[(0,o.jsx)("div",{className:"icon",children:(0,o.jsx)(t.Zkf,{})}),(0,o.jsx)("div",{className:"icon_text",children:"Withdraw Request"})]})})}),(0,o.jsx)("div",{className:8===s?"adminSidebar__row active":"adminSidebar__row",children:(0,o.jsx)(a.rU,{to:"/admin-setting",children:(0,o.jsxs)("div",{className:"sidebar__header",children:[(0,o.jsx)("div",{className:"icon",children:(0,o.jsx)(t.H$w,{})}),(0,o.jsx)("div",{className:"icon_text",children:"Setting"})]})})})]})}},9670:function(e,s,i){i.r(s),i.d(s,{default:function(){return v}});var a=i(4165),n=i(5861),d=i(9439),r=i(2791),l=i(5149),c=i(9434),t=i(1243),o=i(9893),h=i(4270),u=i(184),v=function(){var e=(0,c.v9)((function(e){return e.withdraw})),s=e.withdraw,i=e.isLoading,v=(0,r.useState)(7),x=(0,d.Z)(v,2),m=x[0],j=x[1],_=(0,r.useState)(null),p=(0,d.Z)(_,2),N=p[0],w=p[1],b=(0,r.useState)(null),f=(0,d.Z)(b,2),S=f[0],g=f[1],Z=(0,r.useState)(!1),k=(0,d.Z)(Z,2),C=k[0],A=k[1],U=(0,r.useState)("Processing"),q=(0,d.Z)(U,2),y=q[0],W=q[1],I=(0,c.I0)(),P=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.Z.put("/api/v2/update-withdraw-request/".concat(N),{shopId:S},{withCredentials:!0}).then((function(e){alert("Updated"),!0===e.data.success&&A(!1)})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,r.useEffect)((function(){I(function(){var e=(0,n.Z)((0,a.Z)().mark((function e(s){var i,n,d,r,l;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s({type:"getAllWithdrawRequest"}),e.next=4,t.Z.get("/api/v2/get-all-withdraw-request",{withCredentials:!0});case 4:i=e.sent,n=i.data,s({type:"getAllWithdrawSuccess",payload:n.withdraws}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),s({type:"getAllWithdrawFail",payload:null===e.t0||void 0===e.t0||null===(d=e.t0.response)||void 0===d||null===(r=d.data)||void 0===r||null===(l=r.error)||void 0===l?void 0:l.message});case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(s){return e.apply(this,arguments)}}())}),[I]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(h.q,{children:[(0,u.jsx)("meta",{charSet:"utf-8"}),(0,u.jsx)("title",{children:"Withdraw"})]}),i?(0,u.jsx)(o.Z,{}):(0,u.jsx)("div",{className:"admin__container",children:(0,u.jsx)("div",{className:"container",children:(0,u.jsxs)("div",{className:"dashboard__row",children:[(0,u.jsx)("div",{className:"col__2 dashboard__sidebar",children:(0,u.jsx)(l.Z,{active:m,setActive:j})}),(0,u.jsxs)("div",{className:"col__2 admin__withdraw__requset",children:[null===s||void 0===s?void 0:s.map((function(e,s){var i,a,n,d;return(0,u.jsxs)("div",{className:"withdraw__rows",children:[(0,u.jsxs)("div",{className:"cols",children:[(0,u.jsxs)("p",{children:["Withdraw ID : ",(0,u.jsx)("span",{children:null===e||void 0===e?void 0:e._id})]}),(0,u.jsxs)("p",{children:["Shop Name : ",(0,u.jsx)("span",{children:null===e||void 0===e||null===(i=e.seller)||void 0===i?void 0:i.shopName})]}),(0,u.jsxs)("p",{children:["Email : ",(0,u.jsx)("span",{children:null===e||void 0===e||null===(a=e.seller)||void 0===a?void 0:a.email})]}),(0,u.jsxs)("p",{children:["Phone : ",(0,u.jsx)("span",{children:null===e||void 0===e||null===(n=e.seller)||void 0===n?void 0:n.phone})]})]}),(0,u.jsxs)("div",{className:"cols amount",children:[(0,u.jsx)("p",{children:"Amount"}),(0,u.jsx)("span",{children:null===e||void 0===e?void 0:e.amount})]}),(0,u.jsxs)("div",{className:"cols",children:[(0,u.jsx)("p",{children:"Request Date"}),(0,u.jsx)("span",{children:null===e||void 0===e||null===(d=e.createdAt)||void 0===d?void 0:d.slice(0,10)})]}),(0,u.jsxs)("div",{className:"cols select__btn",children:[(0,u.jsx)("p",{children:"Status"}),(0,u.jsx)("span",{children:null===e||void 0===e?void 0:e.status}),"Succeed"!==(null===e||void 0===e?void 0:e.status)&&(0,u.jsx)("button",{className:"btn-main",onClick:function(){var s;return A(!0)||w(null===e||void 0===e?void 0:e._id)||g(null===e||void 0===e||null===(s=e.seller)||void 0===s?void 0:s._id)},children:"Update"})]})]},s)})),C&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"set__open",children:[(0,u.jsx)("div",{className:"heading",children:(0,u.jsx)("h2",{children:"Update Status"})}),(0,u.jsxs)("p",{className:"id",children:["Withdraw ID : ",(0,u.jsx)("span",{children:N})]}),(0,u.jsxs)("select",{className:"btn-sel",value:y,onChange:function(e){return W(e.target.value)},children:[(0,u.jsx)("option",{value:"Processing",children:"Processing"}),(0,u.jsx)("option",{value:"Succeed",children:"Succeed"})]}),(0,u.jsx)("button",{className:"btn-main",onClick:function(){return P()},children:"Submit"})]}),(0,u.jsx)("p",{className:"overlay",onClick:function(){return A(!1)}})]}),0===(null===s||void 0===s?void 0:s.length)&&(0,u.jsx)("div",{className:"nowithdraw",children:(0,u.jsx)("p",{children:"No Withdraw Requste"})})]})]})})})]})}}}]);
//# sourceMappingURL=9670.f5eccac2.chunk.js.map