(this["webpackJsonptweetme2-web"]=this["webpackJsonptweetme2-web"]||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n(1),r=n.n(o),i=n(5),a=n.n(i);n(15);function s(e,t,n,c){var o={};c&&(o=JSON.stringify(c));var r=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var o=n[c].trim();if(o.substring(0,e.length+1)===e+"="){t=decodeURIComponent(o.substring(e.length+1));break}}return t}("csrftoken"),i=new XMLHttpRequest,a="http://localhost:8000/api".concat(t);i.responseType="json",i.open(e,a),i.setRequestHeader("Content-Type","application/json"),r&&(i.setRequestHeader("X-Requested-With","XMLHttpRequest"),i.setRequestHeader("X-CSRFToken",r)),i.onload=function(){403===i.status&&("Authentication credentials were not provided."===i.response.detail&&(window.location.href="/login/?showLoginRequired=true"));n(i.response,i.status)},i.onerror=function(){alert("Sorry, a serious error occured")},i.send(o)}var l=function(e){var t=e.singleTweet,n=e.action,o=e.tweetActionDidPerform,r=t.likes,i="like"===n?"btn-primary":"unlike"===n?"btn-outline-secondary":"btn-outline-success",a={like:"".concat(r," likes"),unlike:"unlike",retweet:"retweet"};function l(e,t){200!==t&&201!==t||o(e,t)}return Object(c.jsx)("button",{className:"btn ".concat(i," mx-1"),onClick:function(e){e.preventDefault(),function(e,t,n){s("POST","/tweets/action/",e,{id:t,action:n})}(l,t.id,n)},children:a[n]})},u=n(7),d=n(2),j=n(9),b=function(e){var t=e.singleTweet,n=t.content,r=(t.likes,t.id,e.handleDidRetweet),i=e.singleTweet.parent,a=Object(o.useState)(e.singleTweet),s=Object(d.a)(a,2),u=s[0],b=s[1],m=w(u);function w(e){var t=window.location.pathname,n=Object(j.a)(/([0-9]+)/,{tweetId:1}),c=t.match(n),o=c?c.groups.tweetId:-1;return"".concat(e.id)==="".concat(o)}var O=function(e){e.preventDefault(),window.location.href="".concat(u.id)},h=function(e,t){200===t?b(e):201===t&&r(e)};return Object(c.jsxs)("div",{className:"col-10 py-5 my-3 border-bottom",children:[Object(c.jsx)("h3",{children:n}),i&&Object(c.jsx)("div",{children:Object(c.jsx)(f,{tweet:i,checkIfDetailView:w,handleLink:O})}),Object(c.jsxs)("div",{className:"btn btn-group",children:[Object(c.jsx)(l,{singleTweet:u,action:"like",tweetActionDidPerform:h}),Object(c.jsx)(l,{singleTweet:u,action:"unlike",tweetActionDidPerform:h}),Object(c.jsx)(l,{singleTweet:u,action:"retweet",tweetActionDidPerform:h}),!m&&Object(c.jsx)("button",{className:"btn btn-outline-secondary mx-2",onClick:O,children:"View"})]})]})},f=function(e){var t=e.checkIfDetailView,n=e.handleLink,o=e.tweet.content,r=t(e.tweet);return Object(c.jsxs)("div",{className:"col-9 mx-auto border rounded py-1 mb-2",style:{background:"#e8eef4"},children:[Object(c.jsx)("p",{className:"mb-0 text-muted small",children:"Retweet"}),Object(c.jsx)("h3",{children:o}),!r&&Object(c.jsx)("button",{className:"btn btn-link",onClick:n,children:"View"})]})};function m(e){var t=Object(o.useState)([]),n=Object(d.a)(t,2),r=n[0],i=n[1],a=e.createdTweet;Object(o.useEffect)((function(){i([a].concat(Object(u.a)(r)))}),[a]),Object(o.useEffect)((function(){!function(e,t){var n="/tweets/";e&&(n="/tweets/?username=".concat(e)),s("GET",n,t)}(e.username,(function(e,t){200===t&&(i(e),r||i([{id:1,content:"hey"},{id:2,content:"heysup"},{id:3,content:"sup"}]))}))}),[]);var l=function(e){i([e].concat(Object(u.a)(r)))};return Object(c.jsx)("div",{className:"container align-center",children:r.map((function(e,t){var n=e.id;e.content,e.likes;return Object(c.jsx)("div",{children:Object(c.jsx)(b,{singleTweet:e,handleDidRetweet:l})},"".concat(t,"-").concat(n))}))})}var w=n(8),O=function(e){var t=e.didTweet,n=(e.canTweet,Object(o.useRef)()),r=Object(o.useState)({}),i=Object(d.a)(r,2);i[0],i[1];return Object(c.jsx)("div",{className:"col-12 my-4",children:Object(c.jsxs)("form",{onSubmit:function(e){e.preventDefault();var c=n.current.value;console.log(c);s("POST","/tweets/create/",(function(e,n){201===n&&t(e)}),{content:c}),n.current.value=""},children:[Object(c.jsx)("textarea",{ref:n,required:!0,className:"form-control"}),Object(c.jsx)("button",{type:"submit",className:"btn btn-primary mt-2",children:"Tweet"})]})})},h=function(e){var t="false"!==e.canTweet,n=Object(o.useState)({}),r=Object(d.a)(n,2),i=r[0],a=r[1];return Object(c.jsxs)("div",{className:"col-12 my-4",children:[t&&Object(c.jsx)(O,{didTweet:function(e){a(e)}}),Object(c.jsx)(m,Object(w.a)({createdTweet:i},e))]})},p=function(e){console.log(e);var t=e.tweetId,n=Object(o.useState)(),r=Object(d.a)(n,2),i=r[0],a=r[1],l=function(e,t){200===t?(a(Object(w.a)({},e)),console.log(i)):alert("Sorry, a serious error occured")};return Object(o.useEffect)((function(){!function(e,t){s("GET","/tweets/".concat(e),t)}(t,l)}),[t]),Object(c.jsx)("div",{className:"mx-auto",children:i&&Object(c.jsx)(b,{singleTweet:i})})},v=n.p+"static/media/logo.6ce24c58.svg";n(16);var x=function(){return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsxs)("header",{className:"App-header",children:[Object(c.jsx)("img",{src:v,className:"App-logo",alt:"logo"}),Object(c.jsxs)("p",{children:["Edit ",Object(c.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(c.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]}),Object(c.jsx)("div",{className:"container align-center",children:Object(c.jsx)(h,{})})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),o(e),r(e),i(e)}))};document.getElementById("root")&&a.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(x,{})}),document.getElementById("root"));var k=document.getElementById("tweetme-2"),T=r.a.createElement;k&&a.a.render(T(h,k.dataset),k),document.querySelectorAll(".tweetme-2-detail").forEach((function(e){a.a.render(T(p,e.dataset),e)})),g()}},[[17,1,2]]]);
//# sourceMappingURL=main.f8084a81.chunk.js.map