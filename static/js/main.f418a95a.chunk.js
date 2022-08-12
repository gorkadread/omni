(this["webpackJsonpfrontend-boilerplate-react"]=this["webpackJsonpfrontend-boilerplate-react"]||[]).push([[0],{32:function(e,t,n){},33:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(6),c=n.n(a),r=n(24),s=n.n(r),i=(n(32),n(33),n(23)),o=n(25),d=n(14),j=n(0),u=function(){var e=Object(a.useState)(""),t=Object(d.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(""),s=Object(d.a)(r,2),u=s[0],b=s[1],l=Object(a.useState)(""),O=Object(d.a)(l,2),f=O[0],x=O[1],p=function(){var e=Object(o.a)(Object(i.a)().mark((function e(t){return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,fetch("/transactions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({account_id:u,amount:n})}).then((function(e){return e.json().then((function(e){h.emit("TransactionAdded",{data:{data:e}}),b(""),c("")}))}));case 4:e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),x("Something went wrong. Please check your inputs!");case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(j.jsxs)("div",{children:[Object(j.jsx)("header",{className:"bank-child-header",children:"Submit new transaction"}),Object(j.jsx)("div",{className:"error",children:f}),Object(j.jsxs)("form",{onSubmit:p,children:[Object(j.jsxs)("label",{children:["Account ID:",Object(j.jsx)("br",{}),Object(j.jsx)("input",{"data-type":"account-id",onChange:function(e){b(e.target.value),x("")},value:u,placeholder:"Enter account ID"})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{children:["Amount:",Object(j.jsx)("br",{}),Object(j.jsx)("input",{"data-type":"amount",onChange:function(e){c(e.target.value),x("")},value:n,placeholder:"Enter transfer amount"})]}),Object(j.jsx)("br",{}),Object(j.jsx)("input",{"data-type":"transaction-submit",type:"submit"})]})]})},b=function(){var e=Object(a.useState)([]),t=Object(d.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(!0),s=Object(d.a)(r,2),i=s[0],o=s[1],u=function(e){for(var t=0;t<e.length;t++){var n=e[t].amount>0?"to":"from";e[t].fMessage="Transferred ".concat(e[t].amount,"$ ").concat(n," account ").concat(e[t].account_id,".")}c(e),o(!1)};return Object(a.useEffect)((function(){h.on("transactionAddedResponse",(function(e){var t=e.data;u(t)})),fetch("/transactions/").then((function(e){return e.json().then((function(e){u(e)}))}))}),[]),i?Object(j.jsxs)("div",{children:[Object(j.jsx)("header",{className:"bank-child-header",children:"Transaction history"}),"'Loading transactions...'"]}):n.length>0?Object(j.jsxs)("div",{children:[Object(j.jsx)("header",{className:"bank-child-header",children:"Transaction history"}),n.map((function(e){return Object(j.jsxs)("div",{className:"transaction","data-type":"transaction","data-account-id":e.account_id,"data-amount":e.amount,"data-balance":e.balance_after,children:[e.fMessage,Object(j.jsx)("br",{}),"The current account balance is ",e.balance_after,"$."]},e.transaction_id)}))]}):Object(j.jsx)("div",{children:"No transactions yet."})},l=n(27),h=Object(l.a)("http://127.0.0.1:5000");var O=function(){return Object(j.jsxs)("div",{className:"bank",children:[Object(j.jsx)("header",{className:"bank-header",children:Object(j.jsx)("p",{children:"The Bank"})}),Object(j.jsxs)("div",{className:"flex-parent",children:[Object(j.jsx)("div",{className:"flex-child bank-left-side",children:Object(j.jsx)(u,{})}),Object(j.jsx)("div",{className:"flex-child bank-right-side",children:Object(j.jsx)(b,{})})]})]})},f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,41)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};s.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(O,{})}),document.getElementById("root")),f()}},[[40,1,2]]]);
//# sourceMappingURL=main.f418a95a.chunk.js.map