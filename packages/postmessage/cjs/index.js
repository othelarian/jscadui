var w=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var P=Object.prototype.hasOwnProperty;var k=(e,t)=>{for(var d in t)w(e,d,{get:t[d],enumerable:!0})},T=(e,t,d,f)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of N(t))!P.call(e,a)&&a!==d&&w(e,a,{get:()=>t[a],enumerable:!(f=p(t,a))||f.enumerable});return e};var q=e=>T(w({},"__esModule",{value:!0}),e);var A={};k(A,{initMessaging:()=>_,messageProxy:()=>C,withTransferable:()=>z});module.exports=q(A);var v=1,m=new Map,E="__RESPONSE__",x=Symbol.for("__transferable__"),z=(e,t)=>(e[x]=t,e),M=e=>e?e.map(t=>t.buffer||t):[],_=(e,t,{onJobCount:d}={})=>{let f=e.postMessage?e:e.controller,a=(o,s)=>{let r=o?.[x];r&&delete o[x];try{f.postMessage({method:E,params:o,id:s},M(r))}catch(n){throw console.error("failed to send ",o,r),n}},g=(o,s)=>{try{let r=o.stack;f.postMessage({method:E,error:o,stack:r,id:s})}catch(r){throw console.error("failed to send ",r),r}},y=(o,s=[],r=[])=>{f.postMessage({method:o,params:s},M(r))},u=(o,s=[],r=[],n)=>{let l=v++;return f.postMessage({method:o,params:s,id:l},M(r)),new Promise((h,c)=>{m.set(l,[h,c]),d?.(m.size),n&&setTimeout(()=>{c("timeout")},n)})},i=async o=>{let{method:s,params:r,id:n,error:l,stack:R}=o.data;if(n&&s===E){let c=m.get(n);if(!c)return console.error(`req ${n} not found`,n,o.data,o);m.delete(n),d?.(m.size);let[S,b]=c;l?(l.stack=R,b(l)):S(r);return}let h=t[s];if(!h){let c="no handler for type: "+s;throw console.error(c,o),new Error(c)}try{let c=await h(...r);n&&a(c,n)}catch(c){console.error(`error executing command ${s}`,r,c),g(c,n)}};return e.addEventListener?.("message",i),{sendCmd:u,sendNotify:y,sendResponse:a,sendError:g,listener:i,self:e,getRpcJobCount:()=>m.size}},C=(e,t,{sender:d,onJobCount:f})=>{let{sendCmd:a,sendNotify:g,getRpcJobCount:y}=d||_(e,t,{onJobCount:f});return new Proxy({getRpcJobCount:y},{get(u,i,o){return i in u?u[i]:i.startsWith("on")?u[i]=function(...s){g(i,s)}:u[i]=function(...s){return a(i,s)}}})};
//# sourceMappingURL=index.js.map