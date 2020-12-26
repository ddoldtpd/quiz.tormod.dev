(this["webpackJsonpquiz-app-frontend"]=this["webpackJsonpquiz-app-frontend"]||[]).push([[0],{37:function(e,t,a){e.exports=a(70)},46:function(e,t,a){},47:function(e,t,a){},69:function(e,t,a){},70:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(14),o=a.n(s),l=(a(42),a(45),a(46),a(3)),c=a(6),u=(a(47),Object(r.createContext)()),m=Object(r.createContext)(),i=a(1),p=a.n(i),d=a(2),f=a(8),v=a.n(f);v.a.defaults.withCredentials=!1,console.log("ENV: ","production"),v.a.defaults.baseURL="https://quiz.tormod.dev/api/v1";var g=function(){var e=Object(d.a)(p.a.mark((function e(t){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.a.get("/users/does-email-exist/".concat(t));case 3:return a=e.sent,e.abrupt("return",a.data);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=Object(d.a)(p.a.mark((function e(t){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.a.get("/users/does-username-exist/".concat(t));case 3:return a=e.sent,e.abrupt("return",a.data);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(d.a)(p.a.mark((function e(t){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.a.get("/questions/does-question-exist",{title:t},{withCredentials:!0,headers:{"Access-Control-Allow-Origin":"https://quiz.tormod.dev","Content-Type":"application/json"}});case 3:return a=e.sent,e.abrupt("return",a.data);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(d.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.a.get("/users/me/questions",{withCredentials:!0,"Content-Type":"application/json"});case 3:return t=e.sent,e.abrupt("return",t.data);case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(d.a)(p.a.mark((function e(t,a,r,n,s){var o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("Sending",t,a,r,n,s),e.next=4,v.a.post("/questions",{title:t,question:a,correctAnswer:r,answerOptions:n,difficulty:s},{withCredentials:!0,headers:{"Access-Control-Allow-Origin":"https://quiz.tormod.dev","Content-Type":"application/json"}});case 4:return o=e.sent,e.abrupt("return",o.data);case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,a,r,n,s){return e.apply(this,arguments)}}(),y=function(){var e=Object(d.a)(p.a.mark((function e(t,a,r,n){var s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("signup"),e.next=4,v.a.post("/users/signup",t,a,r,n);case 4:return s=e.sent,e.abrupt("return",s.data);case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,a,r,n){return e.apply(this,arguments)}}(),x=function(){var e=Object(d.a)(p.a.mark((function e(t,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.a.post("/users/login",{email:t,password:a},{withCredentials:!0,headers:{"Access-Control-Allow-Origin":"https://quiz.tormod.dev","Content-Type":"application/json"}});case 3:return r=e.sent,e.abrupt("return",r.data);case 7:return e.prev=7,e.t0=e.catch(0),console.log("API not responding"),console.log(e.t0),e.abrupt("return",{status:"failed"});case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,a){return e.apply(this,arguments)}}(),C=function(){var e=Object(d.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.a.get("/questions/random");case 3:return t=e.sent,e.abrupt("return",t.data);case 7:return e.prev=7,e.t0=e.catch(0),console.log("API not responding"),console.log(e.t0),e.abrupt("return",{status:"failed"});case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(d.a)(p.a.mark((function e(t,a,r){var n,s,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:"Bearer ".concat(r)}},s={answer:t},e.prev=2,e.next=5,v.a.post("/questions/".concat(a),s,n);case 5:return o=e.sent,e.abrupt("return",o.data);case 9:return e.prev=9,e.t0=e.catch(2),console.log("API not responding"),console.log(e.t0),e.abrupt("return",{status:"failed"});case 14:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t,a,r){return e.apply(this,arguments)}}(),O=function(e){var t=Object(r.useContext)(u),a=Object(r.useState)(""),s=Object(l.a)(a,2),o=s[0],m=s[1],i=Object(r.useState)(""),f=Object(l.a)(i,2),v=f[0],g=f[1],h=function(){var e=Object(d.a)(p.a.mark((function e(a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.next=3,x(o,v);case 3:"success"===(r=e.sent).status&&(t({type:"login",value:{username:r.data.user.name,email:r.data.user.email,id:r.data.user._id}}),t({type:"flashMessage",value:"Successfully logged out!"}),console.log("logged in"));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return n.a.createElement("form",{onSubmit:h,className:"mb-0 pt-2 pt-md-0"},n.a.createElement("div",{className:"row align-items-center"},n.a.createElement("div",{className:"col-md mr-0 pr-md-0 mb-3 mb-md-0"},n.a.createElement("input",{type:"text",onChange:function(e){return m(e.target.value)},name:"Username",value:o,className:"form-control form-control-sm input-dark",placeholder:"Username",autoComplete:"off"})),n.a.createElement("div",{className:"col-md mr-0 pr-md-0 mb-3 mb-md-0"},n.a.createElement("input",{type:"password",name:"password",onChange:function(e){return g(e.target.value)},value:v,className:"form-control form-control-sm input-dark",placeholder:"Password"})),n.a.createElement("div",{className:"col-md-auto mr-0 pr-md-0 mb-3 mb-md-0"},n.a.createElement("button",{className:"btn btn-success btn-sm"},"Sign In")),n.a.createElement("div",{className:"col-md-auto"},n.a.createElement(c.b,{className:"btn btn-secondary btn-sm",to:"/sign-up"},"Sign Up"))))},j=function(){var e=Object(r.useContext)(u),t=function(){var t=Object(d.a)(p.a.mark((function t(a){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a.preventDefault(),e({type:"logout"}),e({type:"flashMessage",value:"Successfully logged in!"});case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return n.a.createElement("div",{className:"flex-row my-3 my-md-0"},n.a.createElement(c.b,{className:"btn btn-sm btn-success mr-2",to:"/create-question"},"Create Question")," ",n.a.createElement(c.b,{className:"btn btn-sm btn-success mr-2",to:"/profile"},"Profile")," ",n.a.createElement("button",{onClick:t,className:"btn btn-sm btn-secondary"},"Sign out"))},k=function(){Object(r.useContext)(u);var e=Object(r.useContext)(m);return n.a.createElement("header",{className:"header-bar bg-primary mb-3"},n.a.createElement("div",{className:"container d-flex flex-column flex-md-row align-items-center p-3"},n.a.createElement("h4",{className:"my-0 mr-md-auto font-weight-normal"},n.a.createElement(c.b,{to:"/",className:"text-white"},"QuizApp")),e.loggedIn?n.a.createElement(j,null):n.a.createElement(O,null)))};var q=function(){return n.a.createElement("footer",{className:"border-top text-center small text-muted py-3"},n.a.createElement("p",null,n.a.createElement(c.b,{to:"/",className:"mx-1"},"Home")," ","|",n.a.createElement(c.b,{className:"mx-1",to:"/about-us"},"About Us")," ","|",n.a.createElement(c.b,{className:"mx-1",to:"/terms"},"Terms")),n.a.createElement("p",{className:"m-0"},"Copyright \xa9 2020"," ",n.a.createElement("a",{href:"/",className:"text-muted"},"Quiz App"),". All rights reserved."))},I=a(17),S={height:"100%",width:"100%",border:"1px"},A={height:"100%",width:"100%",border:"1px",background:"green"},z=function(e){var t=e.checked,a=e.onClick;return r.createElement("div",{onClick:a,style:t?A:S})},U={diplay:"flex",width:"120px",height:"50px",flexDirection:"row"},D=function(e){var t=e.options,a=e.onClick,s=Object(r.useState)(""),o=Object(l.a)(s,2),c=o[0],u=o[1],m=function(e){a&&a(e),u(e)};return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{style:U},t.map((function(e){return n.a.createElement(z,{key:e,onClick:function(){return m(e)},checked:c===e})}))))},M={margin:"10px auto auto auto",height:"20%",width:"80%"},F={margin:"10px auto auto auto",textAlign:"center",fontSize:"3rem",background:"red"},T={margin:"20px auto auto auto",height:"60%",width:"80%",background:"blue"},P={margin:"50px auto 50px auto",height:"500px",width:"800px",background:"grey"},Q={display:"flex",height:"100%",width:"100%"},V=function(){Object(r.useContext)(u);var e=Object(r.useContext)(m),t=Object(r.useState)(""),a=Object(l.a)(t,2),s=a[0],o=a[1];Object(r.useEffect)((function(){(function(){var e=Object(d.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C();case 2:(t=e.sent)&&o(t.data.data[0]);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var c=function(){var t=Object(d.a)(p.a.mark((function t(a){var r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(a),console.log(s._id),console.log(e.user.token),t.next=5,N(a,s._id,e.user.token);case 5:r=t.sent,console.log(r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{style:Q},n.a.createElement("div",{style:P},n.a.createElement("div",{style:F},s.title),n.a.createElement("div",{style:T},s.question),n.a.createElement("div",{style:M},s.answerOptions&&n.a.createElement(D,{onClick:c,options:s.answerOptions})))))},R=function(){var e=Object(r.useState)([]),t=Object(l.a)(e,2);t[0],t[1];return n.a.createElement("div",null,n.a.createElement(V,null))},B=a(4);var _=function(e){return n.a.createElement("div",{className:"container py-md-5 "+(e.wide?"":"container--narrow")},e.children)};var W=function(e){return Object(r.useEffect)((function(){document.title="".concat(e.title," | ComplexApp"),window.scrollTo(0,0)}),[e.title]),n.a.createElement(_,{wide:e.wide},e.children)},$=function(){Object(r.useContext)(u);var e=Object(r.useContext)(m),t=Object(r.useState)([]),a=Object(l.a)(t,2),s=(a[0],a[1]);return Object(r.useEffect)((function(){(function(){var e=Object(d.a)(p.a.mark((function e(){var t,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:(t=e.sent)?(a=t.data.data,console.log("Questions",a),a.forEach((function(e){s(a.concat(e))}))):console.log("no questions for this user");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),n.a.createElement(W,{title:"Profile Screen"},n.a.createElement("h2",null,e.user.username),n.a.createElement("div",{className:"profile-nav nav nav-tabs pt-2 mb-4"},n.a.createElement(c.c,{exact:!0,to:"#",className:"nav-item nav-link"},"Questions: "),n.a.createElement(c.c,{to:"#",className:"nav-item nav-link"},"Answered Questions: ")),n.a.createElement(B.c,null,n.a.createElement(B.a,{exact:!0,path:"/profile/:username"}),n.a.createElement(B.a,{path:"/profile/:username/followers"}),n.a.createElement(B.a,{path:"/profile/:username/following"})))};var H=function(e){var t=e.selectItem;return n.a.createElement("div",{className:"row mb-3"},n.a.createElement("div",{className:"col-md-4"},n.a.createElement("select",{onChange:function(e){e.preventDefault(),t(e.target.value)},className:"custom-select my-select"},n.a.createElement("option",{defaultValue:!0},"Choose..."),n.a.createElement("option",{value:"easy"},"Easy"),n.a.createElement("option",{value:"medium"},"Medium"),n.a.createElement("option",{value:"hard"},"Hard"))))},J=a(35);var K=function(e){var t=e.items,a=e.setItems;return n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"col-md-12 mb-3"},t.map((function(e,r){return n.a.createElement("div",{className:"row",key:r},n.a.createElement("div",{className:"col mb-2"},e),n.a.createElement("div",{className:"col mb-2"},n.a.createElement("button",{className:"btn btn-danger",disabled:0===t.length,onClick:function(){return function(e){var r=Object(J.a)(t);r.splice(r.findIndex((function(t){return t.id===e})),1),a(r)}(r)}},"X")))}))))};var L=Object(B.f)((function(e){var t=Object(r.useState)(),a=Object(l.a)(t,2),s=a[0],o=a[1],c=Object(r.useState)(),i=Object(l.a)(c,2),f=i[0],v=i[1],g=Object(r.useState)("Easy"),h=Object(l.a)(g,2),E=h[0],y=h[1],x=Object(r.useState)(""),C=Object(l.a)(x,2),N=C[0],O=C[1],j=Object(r.useState)([]),k=Object(l.a)(j,2),q=k[0],I=k[1],S=Object(r.useState)(""),A=Object(l.a)(S,2),z=A[0],U=A[1],D=Object(r.useContext)(u);function M(){return(M=Object(d.a)(p.a.mark((function e(t){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault();try{a=b(s),console.log(a),w(s,f,N,q,E),D({type:"flashMessage",value:"Congrats, you created a new post."}),console.log("New post was created.")}catch(t){console.log("There was a problem.")}case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(r.useContext)(m),n.a.createElement(W,{title:"Create New Question"},n.a.createElement("form",{onSubmit:function(e){return M.apply(this,arguments)}},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"question-title",className:"text-muted mb-1"},n.a.createElement("small",null,"Title")),n.a.createElement("input",{onChange:function(e){return o(e.target.value)},autoFocus:!0,name:"title",id:"question-title",className:"form-control form-control-lg form-control-title",type:"text",placeholder:"",autoComplete:"off"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"post-body",className:"text-muted mb-1 d-block"},n.a.createElement("small",null,"Question")),n.a.createElement("textarea",{onChange:function(e){return v(e.target.value)},name:"body",id:"post-body",className:"body-content tall-textarea form-control",type:"text"})),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"correct-answer",className:"text-muted mb-1"},n.a.createElement("small",null,"Correct Answer")),n.a.createElement("input",{onChange:function(e){return O(e.target.value)},autoFocus:!0,name:"Correct Answer",id:"correct-answer",className:"form-control form-control-lg form-control-title",type:"text",placeholder:"",autoComplete:"off"})),n.a.createElement("label",{htmlFor:"correct-answer",className:"text-muted mb-1"},n.a.createElement("small",null,"Difficulty")),n.a.createElement(H,{selectItem:y}),n.a.createElement("label",{htmlFor:"correct-answer",className:"text-muted mb-1"},n.a.createElement("small",null,"Answer alternatives")),n.a.createElement(K,{items:q,setItems:I}),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"answer-options",className:"text-muted mb-1"},n.a.createElement("small",null,"Add an answer option")),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col mb-2"},n.a.createElement("input",{onChange:function(e){return U(e.target.value)},autoFocus:!0,name:"Answer Option",id:"answer-options",className:"form-control form-control-lg form-control-title",type:"text",placeholder:"",autoComplete:"off"})),n.a.createElement("div",{className:"col mb-2"},n.a.createElement("button",{className:"btn btn-success",disabled:0===z.length,onClick:function(e){e.preventDefault(),I(q.concat(z)),document.getElementById("answer-options").value=""}},"+")))),n.a.createElement("button",{className:"btn btn-primary"},"Create New Question")))})),X=(a(69),a(72));var Z=function(){var e=Object(r.useContext)(u),t=Object(I.a)((function(e,t){switch(t.type){case"usernameImmediately":e.username.hasErrors=!1,e.username.value=t.value,e.username.value.length>30&&(e.username.hasErrors=!0,e.username.message="Username to long"),e.username.value&&!/^([a-zA-Z0-9]+)$/.test(e.username.value)&&(e.username.hasErrors=!0,e.username.message="Username can only contain letters and numbers");break;case"usernameAfterDelay":e.username.value.length<3&&(e.username.hasErrors=!0,e.username.message="needs more than 3 chars"),e.hasErrors||t.noRequest||e.username.checkCount++;break;case"usernameUniqueResults":t.value?(e.username.hasErrors=!0,e.username.isUnique=!1,e.username.message="user exist"):e.username.isUnique=!0;break;case"emailImmediately":e.email.hasErrors=!1,e.email.value=t.value;break;case"emailAfterDelay":/^\S+@\S+$/.test(e.email.value)||(e.email.hasErrors=!0,e.email.message="Invalid email"),e.email.hasErrors||t.noRequest||e.email.checkCount++;break;case"emailUniqueResults":t.value?(e.email.hasErrors=!0,e.email.isUnique=!1,e.email.message="Email is already in use"):e.email.isUnique=!0;break;case"passwordImmediately":e.password.hasErrors=!1,e.password.value=t.value,e.password.value.length>12&&(e.password.hasErrors=!0,e.password.message="Password to long");break;case"passwordAfterDelay":e.password.value.length<6&&(e.password.hasErrors=!0,e.password.message="password to short");break;case"passwordConfirmImmediately":e.passwordConfirm.hasErrors=!1,e.passwordConfirm.value=t.value,e.passwordConfirm.value.length>12&&(e.passwordConfirm.hasErrors=!0,e.passwordConfirm.message="Password to long");break;case"passwordConfirmAfterDelay":e.passwordConfirm.value.length<6?(e.passwordConfirm.hasErrors=!0,e.passwordConfirm.message="password to short"):e.passwordConfirm.value!==e.password.value&&(e.passwordConfirm.hasErrors=!0,e.passwordConfirm.message="passwords do not match!");break;case"submitForm":e.username.hasErrors||!e.username.isUnique||e.email.hasErrors||!e.email.isUnique||e.password.hasErrors||e.passwordConfirm.hasErrors||e.submitCount++}}),{username:{value:"",hasErrors:!1,message:"",isUnique:!1,checkCount:0},email:{value:"",hasErrors:!1,message:"",isUnique:!1,checkCount:0},password:{value:"",hasErrors:!1,message:""},passwordConfirm:{value:"",hasErrors:!1,message:""},submitCount:0}),a=Object(l.a)(t,2),s=a[0],o=a[1];return Object(r.useEffect)((function(){if(s.username.value){var e=setTimeout((function(){return o({type:"usernameAfterDelay"})}),800);return function(){return clearTimeout(e)}}}),[s.username.value]),Object(r.useEffect)((function(){if(s.email.value){var e=setTimeout((function(){return o({type:"emailAfterDelay"})}),800);return function(){return clearTimeout(e)}}}),[s.email.value]),Object(r.useEffect)((function(){if(s.password.value){var e=setTimeout((function(){return o({type:"passwordAfterDelay"})}),800);return function(){return clearTimeout(e)}}}),[s.password.value]),Object(r.useEffect)((function(){if(s.passwordConfirm.value){var e=setTimeout((function(){return o({type:"passwordConfirmAfterDelay"})}),800);return function(){return clearTimeout(e)}}}),[s.passwordConfirm.value]),Object(r.useEffect)((function(){s.username.checkCount&&function(){var e=Object(d.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h(s.username.value);case 2:t=e.sent,console.log("hello"),o({type:"usernameUniqueResults",value:"OK"!==t.data.message});case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[s.username.checkCount]),Object(r.useEffect)((function(){s.email.checkCount&&function(){var e=Object(d.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(s.email.value);case 2:t=e.sent,o({type:"emailUniqueResults",value:"OK"!==t.data.message});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[s.email.checkCount]),Object(r.useEffect)((function(){s.submitCount&&function(){var t=Object(d.a)(p.a.mark((function t(){var a;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y({name:s.username.value,email:s.email.value,password:s.password.value,passwordConfirm:s.passwordConfirm.value});case 2:"success"===(a=t.sent).status&&(e({type:"login",value:{username:a.data.user.name,email:a.data.user.email,id:a.data.user._id}}),e({type:"flashMessage",value:"Welcome to your new account!"}));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()}),[s.submitCount]),n.a.createElement(W,{title:"Sign up",wide:!1},n.a.createElement("div",{className:"row align-items-center"},n.a.createElement("div",{className:"col-lg-7 py-3 py-md-5"},n.a.createElement("h2",null,"Sign up!"),n.a.createElement("p",{className:"lead text-muted"},"Create a user to create questions on your own and keep track of your score!")),n.a.createElement("div",{className:"col-lg-5 pl-lg-5 pb-3 py-lg-5"},n.a.createElement("form",{onSubmit:function(e){e.preventDefault(),o({type:"usernameImmediately",value:s.username.value}),o({type:"usernameAfterDelay",value:s.username.value,noRequest:!0}),o({type:"emailImmediately",value:s.email.value}),o({type:"emailAfterDelay",value:s.email.value,noRequest:!0}),o({type:"passwordImmediately",value:s.password.value}),o({type:"passwordAfterDelay",value:s.password.value}),o({type:"passwordConfirmImmediately",value:s.passwordConfirm.value}),o({type:"passwordConfirmAfterDelay",value:s.passwordConfirm.value}),o({type:"submitForm"})}},n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"username-register",className:"text-muted mb-1"},n.a.createElement("small",null,"Username")),n.a.createElement("input",{onChange:function(e){return o({type:"usernameImmediately",value:e.target.value})},id:"username-register",name:"username",className:"form-control",type:"text",placeholder:"Pick a username",autoComplete:"off"}),n.a.createElement(X.a,{in:s.username.hasErrors,timeout:330,classNames:"liveValidateMessage",unmountOnExit:!0},n.a.createElement("div",{className:"alert alert-danger small liveValidateMessage"},s.username.message))),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"email-register",className:"text-muted mb-1"},n.a.createElement("small",null,"Email")),n.a.createElement("input",{onChange:function(e){return o({type:"emailImmediately",value:e.target.value})},id:"email-register",name:"email",className:"form-control",type:"text",placeholder:"you@example.com",autoComplete:"off"}),n.a.createElement(X.a,{in:s.email.hasErrors,timeout:330,classNames:"liveValidateMessage",unmountOnExit:!0},n.a.createElement("div",{className:"alert alert-danger small liveValidateMessage"},s.email.message))),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"password-register",className:"text-muted mb-1"},n.a.createElement("small",null,"Password")),n.a.createElement("input",{onChange:function(e){return o({type:"passwordImmediately",value:e.target.value})},id:"password-register",name:"password",className:"form-control",type:"password",placeholder:"Create a password"}),n.a.createElement(X.a,{in:s.password.hasErrors,timeout:330,classNames:"liveValidateMessage",unmountOnExit:!0},n.a.createElement("div",{className:"alert alert-danger small liveValidateMessage"},s.password.message))),n.a.createElement("div",{className:"form-group"},n.a.createElement("label",{htmlFor:"password-register-confirm",className:"text-muted mb-1"},n.a.createElement("small",null,"Password Confirm")),n.a.createElement("input",{onChange:function(e){return o({type:"passwordConfirmImmediately",value:e.target.value})},id:"password-register-confirm",name:"password",className:"form-control",type:"password",placeholder:"Confirm password"}),n.a.createElement(X.a,{in:s.passwordConfirm.hasErrors,timeout:330,classNames:"liveValidateMessage",unmountOnExit:!0},n.a.createElement("div",{className:"alert alert-danger small liveValidateMessage"},s.passwordConfirm.message))),n.a.createElement("button",{type:"submit",className:"py-3 mt-4 btn btn-lg btn-success btn-block"},"Sign up for QuizApp")))))};var G=function(e){return n.a.createElement("div",{className:"floating-alerts"},e.messages.map((function(e,t){return n.a.createElement("div",{key:t,className:"alert alert-success text-center floating-alert shadow-sm"},e)})))},Y=function(){var e={loggedIn:Boolean(localStorage.getItem("quizappUsername")),flashMessages:[],user:{token:localStorage.getItem("quizappToken"),username:localStorage.getItem("quizappUsername"),email:localStorage.getItem("quizappEmail"),id:localStorage.getItem("quizappId"),avatar:localStorage.getItem("quizappAvatar")}};var t=Object(I.a)((function(e,t){switch(t.type){case"login":e.user.username=t.value.username,e.user.email=t.value.email,e.user.id=t.value.id,e.loggedIn=!0;break;case"logout":e.loggedIn=!1;break;case"flashMessage":e.flashMessages.push(t.value);break;default:console.log("nutin")}}),e),a=Object(l.a)(t,2),s=a[0],o=a[1];return Object(r.useEffect)((function(){s.loggedIn?(localStorage.setItem("quizappUsername",s.user.username),localStorage.setItem("quizappId",s.user.id),localStorage.setItem("quizappEmail",s.user.email)):(localStorage.removeItem("quizappUsername"),localStorage.removeItem("quizappId"),localStorage.removeItem("quizappEmail"))}),[s.loggedIn]),n.a.createElement(m.Provider,{value:s},n.a.createElement(u.Provider,{value:o},n.a.createElement(c.a,null,n.a.createElement(G,{messages:s.flashMessages}),n.a.createElement(k,null),n.a.createElement(B.c,null,n.a.createElement(B.a,{path:"/",exact:!0},n.a.createElement(R,null)),n.a.createElement(B.a,{path:"/create-question"},n.a.createElement(L,null)),n.a.createElement(B.a,{path:"/profile"},n.a.createElement($,null)),n.a.createElement(B.a,{path:"/sign-up"},n.a.createElement(Z,null))),n.a.createElement(q,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.4e303dfb.chunk.js.map