"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7444],{7444:function(i,s,e){e.r(s),e.d(s,{default:function(){return v}});var l=e(4165),n=e(5861),c=e(9439),r=e(2791),o=e(5759),t=e(9434),d=e(7689),a=e(1243),u=e(184),v=function(){var i,s,e=(0,t.v9)((function(i){return i.user})).user,v=(0,r.useState)([]),p=(0,c.Z)(v,2),h=p[0],x=p[1],m=(0,r.useState)(1),j=(0,c.Z)(m,2),_=j[0],N=j[1],f=(0,d.s0)();(0,r.useEffect)((function(){var i=JSON.parse(localStorage.getItem("latestOrder"));x(i)}),[]);var g={cart:null===h||void 0===h?void 0:h.data,shippingAddress:null===h||void 0===h?void 0:h.shippingAddress,user:e&&e,shippingPrice:null===h||void 0===h?void 0:h.shippingPrice,discountPrice:null===h||void 0===h?void 0:h.discountPrice,subTotalPrice:null===h||void 0===h?void 0:h.subTotalPrice,totalPrice:null===h||void 0===h?void 0:h.totalPrice},y=function(){var i=(0,n.Z)((0,l.Z)().mark((function i(){return(0,l.Z)().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return g.paymentInfo={type:"Cash On Delivery"},i.next=3,a.Z.post("/api/v2/create-order",g,{headers:{"Content-Type":"application/json"}}).then((function(i){localStorage.setItem("cartItems",JSON.stringify([])),localStorage.setItem("latestOrder",JSON.stringify([])),f("/order/success")}));case 3:case"end":return i.stop()}}),i)})));return function(){return i.apply(this,arguments)}}();return(0,u.jsx)("div",{className:"payment__main",children:(0,u.jsxs)("div",{className:"row",children:[(0,u.jsx)("div",{className:"box payment__col",children:(0,u.jsx)("div",{className:"input__col",children:(0,u.jsxs)("div",{className:"select__box",onClick:function(){return N(2)},children:[(0,u.jsx)("div",{className:"round__box",onClick:y,children:(0,u.jsx)("span",{className:2===_&&"active"})}),(0,u.jsx)("p",{children:"Cash On Delivery"})]})})}),(0,u.jsx)("div",{className:"box coupon__col",children:(0,u.jsxs)("div",{className:"cart__products",children:[(null===h||void 0===h?void 0:h.cart)&&(null===h||void 0===h?void 0:h.cart.map((function(i,s){return(0,u.jsxs)("div",{className:"product__row",children:[(0,u.jsxs)("div",{className:"col img__row",children:[(0,u.jsxs)("div",{className:"img",children:[(0,u.jsx)("img",{src:"".concat(o.M,"/").concat(null===i||void 0===i?void 0:i.images[0]),alt:"df"}),(0,u.jsx)("span",{className:"product__qty",children:null===i||void 0===i?void 0:i.qty})]}),(0,u.jsxs)("div",{className:"product__name",children:[(0,u.jsx)("p",{children:null===i||void 0===i?void 0:i.name}),(0,u.jsxs)("span",{children:[null===i||void 0===i?void 0:i.size," ","/ ".concat(null===i||void 0===i?void 0:i.color)]})]})]}),(0,u.jsx)("div",{className:"col col_price",children:(0,u.jsxs)("p",{children:["\u20b9 ",(null===i||void 0===i?void 0:i.sellingPrice)*(null===i||void 0===i?void 0:i.qty)]})})]},s)}))),(0,u.jsx)("form",{children:(0,u.jsxs)("div",{className:"discount__code",children:[(0,u.jsx)("input",{type:"text",placeholder:"Coupon Code"}),(0,u.jsx)("button",{type:"submit",className:"btn-main",children:"Apply"})]})}),(0,u.jsxs)("div",{className:"price",children:[(0,u.jsxs)("div",{className:"subtotal row",children:[(0,u.jsx)("p",{children:"Subtotal"}),(0,u.jsxs)("p",{children:["\u20b9 ",null===h||void 0===h?void 0:h.subTotalPrice]})]}),(0,u.jsxs)("div",{className:"shipping row",children:[(0,u.jsx)("p",{children:"Shipping "}),(0,u.jsxs)("p",{className:"shipping__price",children:["\u20b9 ",null===h||void 0===h||null===(i=h.shippingPrice)||void 0===i?void 0:i.toLocaleString()]})]}),(0,u.jsxs)("div",{className:"estimate__tax row",children:[(0,u.jsx)("p",{children:"Estimate taxes "}),(0,u.jsx)("p",{children:"\u20b9 0.0"})]}),(0,u.jsxs)("div",{className:"discount row",children:[(0,u.jsx)("p",{children:"Discount"}),(0,u.jsxs)("p",{children:["\u20b9"," ",null!==h&&void 0!==h&&h.discountPrice?null===h||void 0===h||null===(s=h.discountPrice)||void 0===s?void 0:s.toLocaleString():"0.0"]})]}),(0,u.jsxs)("div",{className:"total row",children:[(0,u.jsx)("p",{className:"total__text",children:"Total"}),(0,u.jsxs)("p",{className:"total__price",children:["\u20b9 ",null===h||void 0===h?void 0:h.totalPrice]})]})]})]})})]})})}}}]);
//# sourceMappingURL=7444.1b58d86e.chunk.js.map