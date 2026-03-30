import{L as Qf,_ as ul,C as cl,r as $s,F as ll,a as se,b as Oo,d as ci,i as hl,g as Ws,c as $f,e as ht,f as dl,h as fl,j as ml,k as Wf,S as _l}from"./vendor-firebase-core-zZ-5fngm.js";var Gu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ye,pl;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(I,g){function T(){}T.prototype=g.prototype,I.D=g.prototype,I.prototype=new T,I.prototype.constructor=I,I.C=function(E,w,P){for(var y=Array(arguments.length-2),ee=2;ee<arguments.length;ee++)y[ee-2]=arguments[ee];return g.prototype[w].apply(E,y)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(n,e),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,T){T||(T=0);var E=Array(16);if(typeof g=="string")for(var w=0;16>w;++w)E[w]=g.charCodeAt(T++)|g.charCodeAt(T++)<<8|g.charCodeAt(T++)<<16|g.charCodeAt(T++)<<24;else for(w=0;16>w;++w)E[w]=g[T++]|g[T++]<<8|g[T++]<<16|g[T++]<<24;g=I.g[0],T=I.g[1],w=I.g[2];var P=I.g[3],y=g+(P^T&(w^P))+E[0]+3614090360&4294967295;g=T+(y<<7&4294967295|y>>>25),y=P+(w^g&(T^w))+E[1]+3905402710&4294967295,P=g+(y<<12&4294967295|y>>>20),y=w+(T^P&(g^T))+E[2]+606105819&4294967295,w=P+(y<<17&4294967295|y>>>15),y=T+(g^w&(P^g))+E[3]+3250441966&4294967295,T=w+(y<<22&4294967295|y>>>10),y=g+(P^T&(w^P))+E[4]+4118548399&4294967295,g=T+(y<<7&4294967295|y>>>25),y=P+(w^g&(T^w))+E[5]+1200080426&4294967295,P=g+(y<<12&4294967295|y>>>20),y=w+(T^P&(g^T))+E[6]+2821735955&4294967295,w=P+(y<<17&4294967295|y>>>15),y=T+(g^w&(P^g))+E[7]+4249261313&4294967295,T=w+(y<<22&4294967295|y>>>10),y=g+(P^T&(w^P))+E[8]+1770035416&4294967295,g=T+(y<<7&4294967295|y>>>25),y=P+(w^g&(T^w))+E[9]+2336552879&4294967295,P=g+(y<<12&4294967295|y>>>20),y=w+(T^P&(g^T))+E[10]+4294925233&4294967295,w=P+(y<<17&4294967295|y>>>15),y=T+(g^w&(P^g))+E[11]+2304563134&4294967295,T=w+(y<<22&4294967295|y>>>10),y=g+(P^T&(w^P))+E[12]+1804603682&4294967295,g=T+(y<<7&4294967295|y>>>25),y=P+(w^g&(T^w))+E[13]+4254626195&4294967295,P=g+(y<<12&4294967295|y>>>20),y=w+(T^P&(g^T))+E[14]+2792965006&4294967295,w=P+(y<<17&4294967295|y>>>15),y=T+(g^w&(P^g))+E[15]+1236535329&4294967295,T=w+(y<<22&4294967295|y>>>10),y=g+(w^P&(T^w))+E[1]+4129170786&4294967295,g=T+(y<<5&4294967295|y>>>27),y=P+(T^w&(g^T))+E[6]+3225465664&4294967295,P=g+(y<<9&4294967295|y>>>23),y=w+(g^T&(P^g))+E[11]+643717713&4294967295,w=P+(y<<14&4294967295|y>>>18),y=T+(P^g&(w^P))+E[0]+3921069994&4294967295,T=w+(y<<20&4294967295|y>>>12),y=g+(w^P&(T^w))+E[5]+3593408605&4294967295,g=T+(y<<5&4294967295|y>>>27),y=P+(T^w&(g^T))+E[10]+38016083&4294967295,P=g+(y<<9&4294967295|y>>>23),y=w+(g^T&(P^g))+E[15]+3634488961&4294967295,w=P+(y<<14&4294967295|y>>>18),y=T+(P^g&(w^P))+E[4]+3889429448&4294967295,T=w+(y<<20&4294967295|y>>>12),y=g+(w^P&(T^w))+E[9]+568446438&4294967295,g=T+(y<<5&4294967295|y>>>27),y=P+(T^w&(g^T))+E[14]+3275163606&4294967295,P=g+(y<<9&4294967295|y>>>23),y=w+(g^T&(P^g))+E[3]+4107603335&4294967295,w=P+(y<<14&4294967295|y>>>18),y=T+(P^g&(w^P))+E[8]+1163531501&4294967295,T=w+(y<<20&4294967295|y>>>12),y=g+(w^P&(T^w))+E[13]+2850285829&4294967295,g=T+(y<<5&4294967295|y>>>27),y=P+(T^w&(g^T))+E[2]+4243563512&4294967295,P=g+(y<<9&4294967295|y>>>23),y=w+(g^T&(P^g))+E[7]+1735328473&4294967295,w=P+(y<<14&4294967295|y>>>18),y=T+(P^g&(w^P))+E[12]+2368359562&4294967295,T=w+(y<<20&4294967295|y>>>12),y=g+(T^w^P)+E[5]+4294588738&4294967295,g=T+(y<<4&4294967295|y>>>28),y=P+(g^T^w)+E[8]+2272392833&4294967295,P=g+(y<<11&4294967295|y>>>21),y=w+(P^g^T)+E[11]+1839030562&4294967295,w=P+(y<<16&4294967295|y>>>16),y=T+(w^P^g)+E[14]+4259657740&4294967295,T=w+(y<<23&4294967295|y>>>9),y=g+(T^w^P)+E[1]+2763975236&4294967295,g=T+(y<<4&4294967295|y>>>28),y=P+(g^T^w)+E[4]+1272893353&4294967295,P=g+(y<<11&4294967295|y>>>21),y=w+(P^g^T)+E[7]+4139469664&4294967295,w=P+(y<<16&4294967295|y>>>16),y=T+(w^P^g)+E[10]+3200236656&4294967295,T=w+(y<<23&4294967295|y>>>9),y=g+(T^w^P)+E[13]+681279174&4294967295,g=T+(y<<4&4294967295|y>>>28),y=P+(g^T^w)+E[0]+3936430074&4294967295,P=g+(y<<11&4294967295|y>>>21),y=w+(P^g^T)+E[3]+3572445317&4294967295,w=P+(y<<16&4294967295|y>>>16),y=T+(w^P^g)+E[6]+76029189&4294967295,T=w+(y<<23&4294967295|y>>>9),y=g+(T^w^P)+E[9]+3654602809&4294967295,g=T+(y<<4&4294967295|y>>>28),y=P+(g^T^w)+E[12]+3873151461&4294967295,P=g+(y<<11&4294967295|y>>>21),y=w+(P^g^T)+E[15]+530742520&4294967295,w=P+(y<<16&4294967295|y>>>16),y=T+(w^P^g)+E[2]+3299628645&4294967295,T=w+(y<<23&4294967295|y>>>9),y=g+(w^(T|~P))+E[0]+4096336452&4294967295,g=T+(y<<6&4294967295|y>>>26),y=P+(T^(g|~w))+E[7]+1126891415&4294967295,P=g+(y<<10&4294967295|y>>>22),y=w+(g^(P|~T))+E[14]+2878612391&4294967295,w=P+(y<<15&4294967295|y>>>17),y=T+(P^(w|~g))+E[5]+4237533241&4294967295,T=w+(y<<21&4294967295|y>>>11),y=g+(w^(T|~P))+E[12]+1700485571&4294967295,g=T+(y<<6&4294967295|y>>>26),y=P+(T^(g|~w))+E[3]+2399980690&4294967295,P=g+(y<<10&4294967295|y>>>22),y=w+(g^(P|~T))+E[10]+4293915773&4294967295,w=P+(y<<15&4294967295|y>>>17),y=T+(P^(w|~g))+E[1]+2240044497&4294967295,T=w+(y<<21&4294967295|y>>>11),y=g+(w^(T|~P))+E[8]+1873313359&4294967295,g=T+(y<<6&4294967295|y>>>26),y=P+(T^(g|~w))+E[15]+4264355552&4294967295,P=g+(y<<10&4294967295|y>>>22),y=w+(g^(P|~T))+E[6]+2734768916&4294967295,w=P+(y<<15&4294967295|y>>>17),y=T+(P^(w|~g))+E[13]+1309151649&4294967295,T=w+(y<<21&4294967295|y>>>11),y=g+(w^(T|~P))+E[4]+4149444226&4294967295,g=T+(y<<6&4294967295|y>>>26),y=P+(T^(g|~w))+E[11]+3174756917&4294967295,P=g+(y<<10&4294967295|y>>>22),y=w+(g^(P|~T))+E[2]+718787259&4294967295,w=P+(y<<15&4294967295|y>>>17),y=T+(P^(w|~g))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+P&4294967295}n.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var T=g-this.blockSize,E=this.B,w=this.h,P=0;P<g;){if(w==0)for(;P<=T;)s(this,I,P),P+=this.blockSize;if(typeof I=="string"){for(;P<g;)if(E[w++]=I.charCodeAt(P++),w==this.blockSize){s(this,E),w=0;break}}else for(;P<g;)if(E[w++]=I[P++],w==this.blockSize){s(this,E),w=0;break}}this.h=w,this.o+=g},n.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var T=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=T&255,T/=256;for(this.u(I),I=Array(16),g=T=0;4>g;++g)for(var E=0;32>E;E+=8)I[T++]=this.g[g]>>>E&255;return I};function i(I,g){var T=u;return Object.prototype.hasOwnProperty.call(T,I)?T[I]:T[I]=g(I)}function a(I,g){this.h=g;for(var T=[],E=!0,w=I.length-1;0<=w;w--){var P=I[w]|0;E&&P==g||(T[w]=P,E=!1)}this.g=T}var u={};function c(I){return-128<=I&&128>I?i(I,function(g){return new a([g|0],0>g?-1:0)}):new a([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return m;if(0>I)return V(h(-I));for(var g=[],T=1,E=0;I>=T;E++)g[E]=I/T|0,T*=4294967296;return new a(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return V(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var T=h(Math.pow(g,8)),E=m,w=0;w<I.length;w+=8){var P=Math.min(8,I.length-w),y=parseInt(I.substring(w,w+P),g);8>P?(P=h(Math.pow(g,P)),E=E.j(P).add(h(y))):(E=E.j(T),E=E.add(h(y)))}return E}var m=c(0),p=c(1),v=c(16777216);r=a.prototype,r.m=function(){if(x(this))return-V(this).m();for(var I=0,g=1,T=0;T<this.g.length;T++){var E=this.i(T);I+=(0<=E?E:4294967296+E)*g,g*=4294967296}return I},r.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(C(this))return"0";if(x(this))return"-"+V(this).toString(I);for(var g=h(Math.pow(I,6)),T=this,E="";;){var w=G(T,g).g;T=U(T,w.j(g));var P=((0<T.g.length?T.g[0]:T.h)>>>0).toString(I);if(T=w,C(T))return P+E;for(;6>P.length;)P="0"+P;E=P+E}},r.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function C(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function x(I){return I.h==-1}r.l=function(I){return I=U(this,I),x(I)?-1:C(I)?0:1};function V(I){for(var g=I.g.length,T=[],E=0;E<g;E++)T[E]=~I.g[E];return new a(T,~I.h).add(p)}r.abs=function(){return x(this)?V(this):this},r.add=function(I){for(var g=Math.max(this.g.length,I.g.length),T=[],E=0,w=0;w<=g;w++){var P=E+(this.i(w)&65535)+(I.i(w)&65535),y=(P>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);E=y>>>16,P&=65535,y&=65535,T[w]=y<<16|P}return new a(T,T[T.length-1]&-2147483648?-1:0)};function U(I,g){return I.add(V(g))}r.j=function(I){if(C(this)||C(I))return m;if(x(this))return x(I)?V(this).j(V(I)):V(V(this).j(I));if(x(I))return V(this.j(V(I)));if(0>this.l(v)&&0>I.l(v))return h(this.m()*I.m());for(var g=this.g.length+I.g.length,T=[],E=0;E<2*g;E++)T[E]=0;for(E=0;E<this.g.length;E++)for(var w=0;w<I.g.length;w++){var P=this.i(E)>>>16,y=this.i(E)&65535,ee=I.i(w)>>>16,ir=I.i(w)&65535;T[2*E+2*w]+=y*ir,B(T,2*E+2*w),T[2*E+2*w+1]+=P*ir,B(T,2*E+2*w+1),T[2*E+2*w+1]+=y*ee,B(T,2*E+2*w+1),T[2*E+2*w+2]+=P*ee,B(T,2*E+2*w+2)}for(E=0;E<g;E++)T[E]=T[2*E+1]<<16|T[2*E];for(E=g;E<2*g;E++)T[E]=0;return new a(T,0)};function B(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function F(I,g){this.g=I,this.h=g}function G(I,g){if(C(g))throw Error("division by zero");if(C(I))return new F(m,m);if(x(I))return g=G(V(I),g),new F(V(g.g),V(g.h));if(x(g))return g=G(I,V(g)),new F(V(g.g),g.h);if(30<I.g.length){if(x(I)||x(g))throw Error("slowDivide_ only works with positive integers.");for(var T=p,E=g;0>=E.l(I);)T=W(T),E=W(E);var w=j(T,1),P=j(E,1);for(E=j(E,2),T=j(T,2);!C(E);){var y=P.add(E);0>=y.l(I)&&(w=w.add(T),P=y),E=j(E,1),T=j(T,1)}return g=U(I,w.j(g)),new F(w,g)}for(w=m;0<=I.l(g);){for(T=Math.max(1,Math.floor(I.m()/g.m())),E=Math.ceil(Math.log(T)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),P=h(T),y=P.j(g);x(y)||0<y.l(I);)T-=E,P=h(T),y=P.j(g);C(P)&&(P=p),w=w.add(P),I=U(I,y)}return new F(w,I)}r.A=function(I){return G(this,I).h},r.and=function(I){for(var g=Math.max(this.g.length,I.g.length),T=[],E=0;E<g;E++)T[E]=this.i(E)&I.i(E);return new a(T,this.h&I.h)},r.or=function(I){for(var g=Math.max(this.g.length,I.g.length),T=[],E=0;E<g;E++)T[E]=this.i(E)|I.i(E);return new a(T,this.h|I.h)},r.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),T=[],E=0;E<g;E++)T[E]=this.i(E)^I.i(E);return new a(T,this.h^I.h)};function W(I){for(var g=I.g.length+1,T=[],E=0;E<g;E++)T[E]=I.i(E)<<1|I.i(E-1)>>>31;return new a(T,I.h)}function j(I,g){var T=g>>5;g%=32;for(var E=I.g.length-T,w=[],P=0;P<E;P++)w[P]=0<g?I.i(P+T)>>>g|I.i(P+T+1)<<32-g:I.i(P+T);return new a(w,I.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,pl=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Ye=a}).apply(typeof Gu<"u"?Gu:typeof self<"u"?self:typeof window<"u"?window:{});var Cs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var gl,Sr,yl,Us,fo,Tl,Il,El;(function(){var r,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,d){return o==Array.prototype||o==Object.prototype||(o[l]=d.value),o};function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Cs=="object"&&Cs];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=e(this);function s(o,l){if(l)t:{var d=n;o=o.split(".");for(var _=0;_<o.length-1;_++){var R=o[_];if(!(R in d))break t;d=d[R]}o=o[o.length-1],_=d[o],l=l(_),l!=_&&l!=null&&t(d,o,{configurable:!0,writable:!0,value:l})}}function i(o,l){o instanceof String&&(o+="");var d=0,_=!1,R={next:function(){if(!_&&d<o.length){var S=d++;return{value:l(S,o[S]),done:!1}}return _=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}s("Array.prototype.values",function(o){return o||function(){return i(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function c(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function h(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function f(o,l,d){return o.call.apply(o.bind,arguments)}function m(o,l,d){if(!o)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,_),o.apply(l,R)}}return function(){return o.apply(l,arguments)}}function p(o,l,d){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,p.apply(null,arguments)}function v(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var _=d.slice();return _.push.apply(_,arguments),o.apply(this,_)}}function C(o,l){function d(){}d.prototype=l.prototype,o.aa=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(_,R,S){for(var O=Array(arguments.length-2),nt=2;nt<arguments.length;nt++)O[nt-2]=arguments[nt];return l.prototype[R].apply(_,O)}}function x(o){const l=o.length;if(0<l){const d=Array(l);for(let _=0;_<l;_++)d[_]=o[_];return d}return[]}function V(o,l){for(let d=1;d<arguments.length;d++){const _=arguments[d];if(c(_)){const R=o.length||0,S=_.length||0;o.length=R+S;for(let O=0;O<S;O++)o[R+O]=_[O]}else o.push(_)}}class U{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function B(o){return/^[\s\xa0]*$/.test(o)}function F(){var o=u.navigator;return o&&(o=o.userAgent)?o:""}function G(o){return G[" "](o),o}G[" "]=function(){};var W=F().indexOf("Gecko")!=-1&&!(F().toLowerCase().indexOf("webkit")!=-1&&F().indexOf("Edge")==-1)&&!(F().indexOf("Trident")!=-1||F().indexOf("MSIE")!=-1)&&F().indexOf("Edge")==-1;function j(o,l,d){for(const _ in o)l.call(d,o[_],_,o)}function I(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function g(o){const l={};for(const d in o)l[d]=o[d];return l}const T="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,l){let d,_;for(let R=1;R<arguments.length;R++){_=arguments[R];for(d in _)o[d]=_[d];for(let S=0;S<T.length;S++)d=T[S],Object.prototype.hasOwnProperty.call(_,d)&&(o[d]=_[d])}}function w(o){var l=1;o=o.split(":");const d=[];for(;0<l&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function P(o){u.setTimeout(()=>{throw o},0)}function y(){var o=ki;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class ee{constructor(){this.h=this.g=null}add(l,d){const _=ir.get();_.set(l,d),this.h?this.h.next=_:this.g=_,this.h=_}}var ir=new U(()=>new hf,o=>o.reset());class hf{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let or,ar=!1,ki=new ee,Ga=()=>{const o=u.Promise.resolve(void 0);or=()=>{o.then(df)}};var df=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(d){P(d)}var l=ir;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}ar=!1};function me(){this.s=this.s,this.C=this.C}me.prototype.s=!1,me.prototype.ma=function(){this.s||(this.s=!0,this.N())},me.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function St(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}St.prototype.h=function(){this.defaultPrevented=!0};var ff=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};u.addEventListener("test",d,l),u.removeEventListener("test",d,l)}catch{}return o}();function ur(o,l){if(St.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,_=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(W){t:{try{G(l.nodeName);var R=!0;break t}catch{}R=!1}R||(l=null)}}else d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement);this.relatedTarget=l,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:mf[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&ur.aa.h.call(this)}}C(ur,St);var mf={2:"touch",3:"pen",4:"mouse"};ur.prototype.h=function(){ur.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var hs="closure_listenable_"+(1e6*Math.random()|0),_f=0;function pf(o,l,d,_,R){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!_,this.ha=R,this.key=++_f,this.da=this.fa=!1}function ds(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function fs(o){this.src=o,this.g={},this.h=0}fs.prototype.add=function(o,l,d,_,R){var S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);var O=Oi(o,l,_,R);return-1<O?(l=o[O],d||(l.fa=!1)):(l=new pf(l,this.src,S,!!_,R),l.fa=d,o.push(l)),l};function Ni(o,l){var d=l.type;if(d in o.g){var _=o.g[d],R=Array.prototype.indexOf.call(_,l,void 0),S;(S=0<=R)&&Array.prototype.splice.call(_,R,1),S&&(ds(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Oi(o,l,d,_){for(var R=0;R<o.length;++R){var S=o[R];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==_)return R}return-1}var Mi="closure_lm_"+(1e6*Math.random()|0),Fi={};function ja(o,l,d,_,R){if(Array.isArray(l)){for(var S=0;S<l.length;S++)ja(o,l[S],d,_,R);return null}return d=$a(d),o&&o[hs]?o.K(l,d,h(_)?!!_.capture:!1,R):gf(o,l,d,!1,_,R)}function gf(o,l,d,_,R,S){if(!l)throw Error("Invalid event type");var O=h(R)?!!R.capture:!!R,nt=Ui(o);if(nt||(o[Mi]=nt=new fs(o)),d=nt.add(l,d,_,O,S),d.proxy)return d;if(_=yf(),d.proxy=_,_.src=o,_.listener=d,o.addEventListener)ff||(R=O),R===void 0&&(R=!1),o.addEventListener(l.toString(),_,R);else if(o.attachEvent)o.attachEvent(Qa(l.toString()),_);else if(o.addListener&&o.removeListener)o.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return d}function yf(){function o(d){return l.call(o.src,o.listener,d)}const l=Tf;return o}function Ka(o,l,d,_,R){if(Array.isArray(l))for(var S=0;S<l.length;S++)Ka(o,l[S],d,_,R);else _=h(_)?!!_.capture:!!_,d=$a(d),o&&o[hs]?(o=o.i,l=String(l).toString(),l in o.g&&(S=o.g[l],d=Oi(S,d,_,R),-1<d&&(ds(S[d]),Array.prototype.splice.call(S,d,1),S.length==0&&(delete o.g[l],o.h--)))):o&&(o=Ui(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Oi(l,d,_,R)),(d=-1<o?l[o]:null)&&Li(d))}function Li(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[hs])Ni(l.i,o);else{var d=o.type,_=o.proxy;l.removeEventListener?l.removeEventListener(d,_,o.capture):l.detachEvent?l.detachEvent(Qa(d),_):l.addListener&&l.removeListener&&l.removeListener(_),(d=Ui(l))?(Ni(d,o),d.h==0&&(d.src=null,l[Mi]=null)):ds(o)}}}function Qa(o){return o in Fi?Fi[o]:Fi[o]="on"+o}function Tf(o,l){if(o.da)o=!0;else{l=new ur(l,this);var d=o.listener,_=o.ha||o.src;o.fa&&Li(o),o=d.call(_,l)}return o}function Ui(o){return o=o[Mi],o instanceof fs?o:null}var Bi="__closure_events_fn_"+(1e9*Math.random()>>>0);function $a(o){return typeof o=="function"?o:(o[Bi]||(o[Bi]=function(l){return o.handleEvent(l)}),o[Bi])}function Vt(){me.call(this),this.i=new fs(this),this.M=this,this.F=null}C(Vt,me),Vt.prototype[hs]=!0,Vt.prototype.removeEventListener=function(o,l,d,_){Ka(this,o,l,d,_)};function Mt(o,l){var d,_=o.F;if(_)for(d=[];_;_=_.F)d.push(_);if(o=o.M,_=l.type||l,typeof l=="string")l=new St(l,o);else if(l instanceof St)l.target=l.target||o;else{var R=l;l=new St(_,o),E(l,R)}if(R=!0,d)for(var S=d.length-1;0<=S;S--){var O=l.g=d[S];R=ms(O,_,!0,l)&&R}if(O=l.g=o,R=ms(O,_,!0,l)&&R,R=ms(O,_,!1,l)&&R,d)for(S=0;S<d.length;S++)O=l.g=d[S],R=ms(O,_,!1,l)&&R}Vt.prototype.N=function(){if(Vt.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var d=o.g[l],_=0;_<d.length;_++)ds(d[_]);delete o.g[l],o.h--}}this.F=null},Vt.prototype.K=function(o,l,d,_){return this.i.add(String(o),l,!1,d,_)},Vt.prototype.L=function(o,l,d,_){return this.i.add(String(o),l,!0,d,_)};function ms(o,l,d,_){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var R=!0,S=0;S<l.length;++S){var O=l[S];if(O&&!O.da&&O.capture==d){var nt=O.listener,Rt=O.ha||O.src;O.fa&&Ni(o.i,O),R=nt.call(Rt,_)!==!1&&R}}return R&&!_.defaultPrevented}function Wa(o,l,d){if(typeof o=="function")d&&(o=p(o,d));else if(o&&typeof o.handleEvent=="function")o=p(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:u.setTimeout(o,l||0)}function Ha(o){o.g=Wa(()=>{o.g=null,o.i&&(o.i=!1,Ha(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class If extends me{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Ha(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function cr(o){me.call(this),this.h=o,this.g={}}C(cr,me);var Xa=[];function Ja(o){j(o.g,function(l,d){this.g.hasOwnProperty(d)&&Li(l)},o),o.g={}}cr.prototype.N=function(){cr.aa.N.call(this),Ja(this)},cr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var qi=u.JSON.stringify,Ef=u.JSON.parse,wf=class{stringify(o){return u.JSON.stringify(o,void 0)}parse(o){return u.JSON.parse(o,void 0)}};function zi(){}zi.prototype.h=null;function Ya(o){return o.h||(o.h=o.i())}function Za(){}var lr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Gi(){St.call(this,"d")}C(Gi,St);function ji(){St.call(this,"c")}C(ji,St);var ze={},tu=null;function _s(){return tu=tu||new Vt}ze.La="serverreachability";function eu(o){St.call(this,ze.La,o)}C(eu,St);function hr(o){const l=_s();Mt(l,new eu(l))}ze.STAT_EVENT="statevent";function nu(o,l){St.call(this,ze.STAT_EVENT,o),this.stat=l}C(nu,St);function Ft(o){const l=_s();Mt(l,new nu(l,o))}ze.Ma="timingevent";function ru(o,l){St.call(this,ze.Ma,o),this.size=l}C(ru,St);function dr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){o()},l)}function fr(){this.g=!0}fr.prototype.xa=function(){this.g=!1};function vf(o,l,d,_,R,S){o.info(function(){if(o.g)if(S)for(var O="",nt=S.split("&"),Rt=0;Rt<nt.length;Rt++){var Y=nt[Rt].split("=");if(1<Y.length){var Ct=Y[0];Y=Y[1];var xt=Ct.split("_");O=2<=xt.length&&xt[1]=="type"?O+(Ct+"="+Y+"&"):O+(Ct+"=redacted&")}}else O=null;else O=S;return"XMLHTTP REQ ("+_+") [attempt "+R+"]: "+l+`
`+d+`
`+O})}function Af(o,l,d,_,R,S,O){o.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+R+"]: "+l+`
`+d+`
`+S+" "+O})}function pn(o,l,d,_){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Pf(o,d)+(_?" "+_:"")})}function Rf(o,l){o.info(function(){return"TIMEOUT: "+l})}fr.prototype.info=function(){};function Pf(o,l){if(!o.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var _=d[o];if(!(2>_.length)){var R=_[1];if(Array.isArray(R)&&!(1>R.length)){var S=R[0];if(S!="noop"&&S!="stop"&&S!="close")for(var O=1;O<R.length;O++)R[O]=""}}}}return qi(d)}catch{return l}}var ps={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},su={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ki;function gs(){}C(gs,zi),gs.prototype.g=function(){return new XMLHttpRequest},gs.prototype.i=function(){return{}},Ki=new gs;function _e(o,l,d,_){this.j=o,this.i=l,this.l=d,this.R=_||1,this.U=new cr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new iu}function iu(){this.i=null,this.g="",this.h=!1}var ou={},Qi={};function $i(o,l,d){o.L=1,o.v=Es(ne(l)),o.m=d,o.P=!0,au(o,null)}function au(o,l){o.F=Date.now(),ys(o),o.A=ne(o.v);var d=o.A,_=o.R;Array.isArray(_)||(_=[String(_)]),Eu(d.i,"t",_),o.C=0,d=o.j.J,o.h=new iu,o.g=Uu(o.j,d?l:null,!o.m),0<o.O&&(o.M=new If(p(o.Y,o,o.g),o.O)),l=o.U,d=o.g,_=o.ca;var R="readystatechange";Array.isArray(R)||(R&&(Xa[0]=R.toString()),R=Xa);for(var S=0;S<R.length;S++){var O=ja(d,R[S],_||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),hr(),vf(o.i,o.u,o.A,o.l,o.R,o.m)}_e.prototype.ca=function(o){o=o.target;const l=this.M;l&&re(o)==3?l.j():this.Y(o)},_e.prototype.Y=function(o){try{if(o==this.g)t:{const xt=re(this.g);var l=this.g.Ba();const Tn=this.g.Z();if(!(3>xt)&&(xt!=3||this.g&&(this.h.h||this.g.oa()||Su(this.g)))){this.J||xt!=4||l==7||(l==8||0>=Tn?hr(3):hr(2)),Wi(this);var d=this.g.Z();this.X=d;e:if(uu(this)){var _=Su(this.g);o="";var R=_.length,S=re(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ge(this),mr(this);var O="";break e}this.h.i=new u.TextDecoder}for(l=0;l<R;l++)this.h.h=!0,o+=this.h.i.decode(_[l],{stream:!(S&&l==R-1)});_.length=0,this.h.g+=o,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,Af(this.i,this.u,this.A,this.l,this.R,xt,d),this.o){if(this.T&&!this.K){e:{if(this.g){var nt,Rt=this.g;if((nt=Rt.g?Rt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(nt)){var Y=nt;break e}}Y=null}if(d=Y)pn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Hi(this,d);else{this.o=!1,this.s=3,Ft(12),Ge(this),mr(this);break t}}if(this.P){d=!0;let $t;for(;!this.J&&this.C<O.length;)if($t=bf(this,O),$t==Qi){xt==4&&(this.s=4,Ft(14),d=!1),pn(this.i,this.l,null,"[Incomplete Response]");break}else if($t==ou){this.s=4,Ft(15),pn(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else pn(this.i,this.l,$t,null),Hi(this,$t);if(uu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),xt!=4||O.length!=0||this.h.h||(this.s=1,Ft(16),d=!1),this.o=this.o&&d,!d)pn(this.i,this.l,O,"[Invalid Chunked Response]"),Ge(this),mr(this);else if(0<O.length&&!this.W){this.W=!0;var Ct=this.j;Ct.g==this&&Ct.ba&&!Ct.M&&(Ct.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),eo(Ct),Ct.M=!0,Ft(11))}}else pn(this.i,this.l,O,null),Hi(this,O);xt==4&&Ge(this),this.o&&!this.J&&(xt==4?Ou(this.j,this):(this.o=!1,ys(this)))}else jf(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,Ft(12)):(this.s=0,Ft(13)),Ge(this),mr(this)}}}catch{}finally{}};function uu(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function bf(o,l){var d=o.C,_=l.indexOf(`
`,d);return _==-1?Qi:(d=Number(l.substring(d,_)),isNaN(d)?ou:(_+=1,_+d>l.length?Qi:(l=l.slice(_,_+d),o.C=_+d,l)))}_e.prototype.cancel=function(){this.J=!0,Ge(this)};function ys(o){o.S=Date.now()+o.I,cu(o,o.I)}function cu(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=dr(p(o.ba,o),l)}function Wi(o){o.B&&(u.clearTimeout(o.B),o.B=null)}_e.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Rf(this.i,this.A),this.L!=2&&(hr(),Ft(17)),Ge(this),this.s=2,mr(this)):cu(this,this.S-o)};function mr(o){o.j.G==0||o.J||Ou(o.j,o)}function Ge(o){Wi(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,Ja(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function Hi(o,l){try{var d=o.j;if(d.G!=0&&(d.g==o||Xi(d.h,o))){if(!o.K&&Xi(d.h,o)&&d.G==3){try{var _=d.Da.g.parse(l)}catch{_=null}if(Array.isArray(_)&&_.length==3){var R=_;if(R[0]==0){t:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)bs(d),Rs(d);else break t;to(d),Ft(18)}}else d.za=R[1],0<d.za-d.T&&37500>R[2]&&d.F&&d.v==0&&!d.C&&(d.C=dr(p(d.Za,d),6e3));if(1>=du(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Ke(d,11)}else if((o.K||d.g==o)&&bs(d),!B(l))for(R=d.Da.g.parse(l),l=0;l<R.length;l++){let Y=R[l];if(d.T=Y[0],Y=Y[1],d.G==2)if(Y[0]=="c"){d.K=Y[1],d.ia=Y[2];const Ct=Y[3];Ct!=null&&(d.la=Ct,d.j.info("VER="+d.la));const xt=Y[4];xt!=null&&(d.Aa=xt,d.j.info("SVER="+d.Aa));const Tn=Y[5];Tn!=null&&typeof Tn=="number"&&0<Tn&&(_=1.5*Tn,d.L=_,d.j.info("backChannelRequestTimeoutMs_="+_)),_=d;const $t=o.g;if($t){const Vs=$t.g?$t.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Vs){var S=_.h;S.g||Vs.indexOf("spdy")==-1&&Vs.indexOf("quic")==-1&&Vs.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Ji(S,S.h),S.h=null))}if(_.D){const no=$t.g?$t.g.getResponseHeader("X-HTTP-Session-Id"):null;no&&(_.ya=no,st(_.I,_.D,no))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),_=d;var O=o;if(_.qa=Lu(_,_.J?_.ia:null,_.W),O.K){fu(_.h,O);var nt=O,Rt=_.L;Rt&&(nt.I=Rt),nt.B&&(Wi(nt),ys(nt)),_.g=O}else ku(_);0<d.i.length&&Ps(d)}else Y[0]!="stop"&&Y[0]!="close"||Ke(d,7);else d.G==3&&(Y[0]=="stop"||Y[0]=="close"?Y[0]=="stop"?Ke(d,7):Zi(d):Y[0]!="noop"&&d.l&&d.l.ta(Y),d.v=0)}}hr(4)}catch{}}var Sf=class{constructor(o,l){this.g=o,this.map=l}};function lu(o){this.l=o||10,u.PerformanceNavigationTiming?(o=u.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function hu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function du(o){return o.h?1:o.g?o.g.size:0}function Xi(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Ji(o,l){o.g?o.g.add(l):o.h=l}function fu(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}lu.prototype.cancel=function(){if(this.i=mu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function mu(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.D);return l}return x(o.i)}function Vf(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var l=[],d=o.length,_=0;_<d;_++)l.push(o[_]);return l}l=[],d=0;for(_ in o)l[d++]=o[_];return l}function Cf(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var l=[];o=o.length;for(var d=0;d<o;d++)l.push(d);return l}l=[],d=0;for(const _ in o)l[d++]=_;return l}}}function _u(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var d=Cf(o),_=Vf(o),R=_.length,S=0;S<R;S++)l.call(void 0,_[S],d&&d[S],o)}var pu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function xf(o,l){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var _=o[d].indexOf("="),R=null;if(0<=_){var S=o[d].substring(0,_);R=o[d].substring(_+1)}else S=o[d];l(S,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function je(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof je){this.h=o.h,Ts(this,o.j),this.o=o.o,this.g=o.g,Is(this,o.s),this.l=o.l;var l=o.i,d=new gr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),gu(this,d),this.m=o.m}else o&&(l=String(o).match(pu))?(this.h=!1,Ts(this,l[1]||"",!0),this.o=_r(l[2]||""),this.g=_r(l[3]||"",!0),Is(this,l[4]),this.l=_r(l[5]||"",!0),gu(this,l[6]||"",!0),this.m=_r(l[7]||"")):(this.h=!1,this.i=new gr(null,this.h))}je.prototype.toString=function(){var o=[],l=this.j;l&&o.push(pr(l,yu,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(pr(l,yu,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(pr(d,d.charAt(0)=="/"?Nf:kf,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",pr(d,Mf)),o.join("")};function ne(o){return new je(o)}function Ts(o,l,d){o.j=d?_r(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Is(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function gu(o,l,d){l instanceof gr?(o.i=l,Ff(o.i,o.h)):(d||(l=pr(l,Of)),o.i=new gr(l,o.h))}function st(o,l,d){o.i.set(l,d)}function Es(o){return st(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function _r(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function pr(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,Df),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Df(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var yu=/[#\/\?@]/g,kf=/[#\?:]/g,Nf=/[#\?]/g,Of=/[#\?@]/g,Mf=/#/g;function gr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function pe(o){o.g||(o.g=new Map,o.h=0,o.i&&xf(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=gr.prototype,r.add=function(o,l){pe(this),this.i=null,o=gn(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function Tu(o,l){pe(o),l=gn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Iu(o,l){return pe(o),l=gn(o,l),o.g.has(l)}r.forEach=function(o,l){pe(this),this.g.forEach(function(d,_){d.forEach(function(R){o.call(l,R,_,this)},this)},this)},r.na=function(){pe(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let _=0;_<l.length;_++){const R=o[_];for(let S=0;S<R.length;S++)d.push(l[_])}return d},r.V=function(o){pe(this);let l=[];if(typeof o=="string")Iu(this,o)&&(l=l.concat(this.g.get(gn(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)l=l.concat(o[d])}return l},r.set=function(o,l){return pe(this),this.i=null,o=gn(this,o),Iu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},r.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function Eu(o,l,d){Tu(o,l),0<d.length&&(o.i=null,o.g.set(gn(o,l),x(d)),o.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var _=l[d];const S=encodeURIComponent(String(_)),O=this.V(_);for(_=0;_<O.length;_++){var R=S;O[_]!==""&&(R+="="+encodeURIComponent(String(O[_]))),o.push(R)}}return this.i=o.join("&")};function gn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function Ff(o,l){l&&!o.j&&(pe(o),o.i=null,o.g.forEach(function(d,_){var R=_.toLowerCase();_!=R&&(Tu(this,_),Eu(this,R,d))},o)),o.j=l}function Lf(o,l){const d=new fr;if(u.Image){const _=new Image;_.onload=v(ge,d,"TestLoadImage: loaded",!0,l,_),_.onerror=v(ge,d,"TestLoadImage: error",!1,l,_),_.onabort=v(ge,d,"TestLoadImage: abort",!1,l,_),_.ontimeout=v(ge,d,"TestLoadImage: timeout",!1,l,_),u.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=o}else l(!1)}function Uf(o,l){const d=new fr,_=new AbortController,R=setTimeout(()=>{_.abort(),ge(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:_.signal}).then(S=>{clearTimeout(R),S.ok?ge(d,"TestPingServer: ok",!0,l):ge(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(R),ge(d,"TestPingServer: error",!1,l)})}function ge(o,l,d,_,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),_(d)}catch{}}function Bf(){this.g=new wf}function qf(o,l,d){const _=d||"";try{_u(o,function(R,S){let O=R;h(R)&&(O=qi(R)),l.push(_+S+"="+encodeURIComponent(O))})}catch(R){throw l.push(_+"type="+encodeURIComponent("_badmap")),R}}function ws(o){this.l=o.Ub||null,this.j=o.eb||!1}C(ws,zi),ws.prototype.g=function(){return new vs(this.l,this.j)},ws.prototype.i=function(o){return function(){return o}}({});function vs(o,l){Vt.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(vs,Vt),r=vs.prototype,r.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,Tr(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||u).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,yr(this)),this.readyState=0},r.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Tr(this)),this.g&&(this.readyState=3,Tr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;wu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function wu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}r.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?yr(this):Tr(this),this.readyState==3&&wu(this)}},r.Ra=function(o){this.g&&(this.response=this.responseText=o,yr(this))},r.Qa=function(o){this.g&&(this.response=o,yr(this))},r.ga=function(){this.g&&yr(this)};function yr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Tr(o)}r.setRequestHeader=function(o,l){this.u.append(o,l)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function Tr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(vs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function vu(o){let l="";return j(o,function(d,_){l+=_,l+=":",l+=d,l+=`\r
`}),l}function Yi(o,l,d){t:{for(_ in d){var _=!1;break t}_=!0}_||(d=vu(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):st(o,l,d))}function _t(o){Vt.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(_t,Vt);var zf=/^https?$/i,Gf=["POST","PUT"];r=_t.prototype,r.Ha=function(o){this.J=o},r.ea=function(o,l,d,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ki.g(),this.v=this.o?Ya(this.o):Ya(Ki),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(S){Au(this,S);return}if(o=d||"",d=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var R in _)d.set(R,_[R]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const S of _.keys())d.set(S,_.get(S));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),R=u.FormData&&o instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Gf,l,void 0))||_||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,O]of d)this.g.setRequestHeader(S,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{bu(this),this.u=!0,this.g.send(o),this.u=!1}catch(S){Au(this,S)}};function Au(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,Ru(o),As(o)}function Ru(o){o.A||(o.A=!0,Mt(o,"complete"),Mt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Mt(this,"complete"),Mt(this,"abort"),As(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),As(this,!0)),_t.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Pu(this):this.bb())},r.bb=function(){Pu(this)};function Pu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||re(o)!=4||o.Z()!=2)){if(o.u&&re(o)==4)Wa(o.Ea,0,o);else if(Mt(o,"readystatechange"),re(o)==4){o.h=!1;try{const O=o.Z();t:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var d;if(!(d=l)){var _;if(_=O===0){var R=String(o.D).match(pu)[1]||null;!R&&u.self&&u.self.location&&(R=u.self.location.protocol.slice(0,-1)),_=!zf.test(R?R.toLowerCase():"")}d=_}if(d)Mt(o,"complete"),Mt(o,"success");else{o.m=6;try{var S=2<re(o)?o.g.statusText:""}catch{S=""}o.l=S+" ["+o.Z()+"]",Ru(o)}}finally{As(o)}}}}function As(o,l){if(o.g){bu(o);const d=o.g,_=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Mt(o,"ready");try{d.onreadystatechange=_}catch{}}}function bu(o){o.I&&(u.clearTimeout(o.I),o.I=null)}r.isActive=function(){return!!this.g};function re(o){return o.g?o.g.readyState:0}r.Z=function(){try{return 2<re(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),Ef(l)}};function Su(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function jf(o){const l={};o=(o.g&&2<=re(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<o.length;_++){if(B(o[_]))continue;var d=w(o[_]);const R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[R]||[];l[R]=S,S.push(d)}I(l,function(_){return _.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ir(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function Vu(o){this.Aa=0,this.i=[],this.j=new fr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ir("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ir("baseRetryDelayMs",5e3,o),this.cb=Ir("retryDelaySeedMs",1e4,o),this.Wa=Ir("forwardChannelMaxRetries",2,o),this.wa=Ir("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new lu(o&&o.concurrentRequestLimit),this.Da=new Bf,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Vu.prototype,r.la=8,r.G=1,r.connect=function(o,l,d,_){Ft(0),this.W=o,this.H=l||{},d&&_!==void 0&&(this.H.OSID=d,this.H.OAID=_),this.F=this.X,this.I=Lu(this,null,this.W),Ps(this)};function Zi(o){if(Cu(o),o.G==3){var l=o.U++,d=ne(o.I);if(st(d,"SID",o.K),st(d,"RID",l),st(d,"TYPE","terminate"),Er(o,d),l=new _e(o,o.j,l),l.L=2,l.v=Es(ne(d)),d=!1,u.navigator&&u.navigator.sendBeacon)try{d=u.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&u.Image&&(new Image().src=l.v,d=!0),d||(l.g=Uu(l.j,null),l.g.ea(l.v)),l.F=Date.now(),ys(l)}Fu(o)}function Rs(o){o.g&&(eo(o),o.g.cancel(),o.g=null)}function Cu(o){Rs(o),o.u&&(u.clearTimeout(o.u),o.u=null),bs(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&u.clearTimeout(o.s),o.s=null)}function Ps(o){if(!hu(o.h)&&!o.s){o.s=!0;var l=o.Ga;or||Ga(),ar||(or(),ar=!0),ki.add(l,o),o.B=0}}function Kf(o,l){return du(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=dr(p(o.Ga,o,l),Mu(o,o.B)),o.B++,!0)}r.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const R=new _e(this,this.j,o);let S=this.o;if(this.S&&(S?(S=g(S),E(S,this.S)):S=this.S),this.m!==null||this.O||(R.H=S,S=null),this.P)t:{for(var l=0,d=0;d<this.i.length;d++){e:{var _=this.i[d];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break e}_=void 0}if(_===void 0)break;if(l+=_,4096<l){l=d;break t}if(l===4096||d===this.i.length-1){l=d+1;break t}}l=1e3}else l=1e3;l=Du(this,R,l),d=ne(this.I),st(d,"RID",o),st(d,"CVER",22),this.D&&st(d,"X-HTTP-Session-Id",this.D),Er(this,d),S&&(this.O?l="headers="+encodeURIComponent(String(vu(S)))+"&"+l:this.m&&Yi(d,this.m,S)),Ji(this.h,R),this.Ua&&st(d,"TYPE","init"),this.P?(st(d,"$req",l),st(d,"SID","null"),R.T=!0,$i(R,d,null)):$i(R,d,l),this.G=2}}else this.G==3&&(o?xu(this,o):this.i.length==0||hu(this.h)||xu(this))};function xu(o,l){var d;l?d=l.l:d=o.U++;const _=ne(o.I);st(_,"SID",o.K),st(_,"RID",d),st(_,"AID",o.T),Er(o,_),o.m&&o.o&&Yi(_,o.m,o.o),d=new _e(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),l&&(o.i=l.D.concat(o.i)),l=Du(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ji(o.h,d),$i(d,_,l)}function Er(o,l){o.H&&j(o.H,function(d,_){st(l,_,d)}),o.l&&_u({},function(d,_){st(l,_,d)})}function Du(o,l,d){d=Math.min(o.i.length,d);var _=o.l?p(o.l.Na,o.l,o):null;t:{var R=o.i;let S=-1;for(;;){const O=["count="+d];S==-1?0<d?(S=R[0].g,O.push("ofs="+S)):S=0:O.push("ofs="+S);let nt=!0;for(let Rt=0;Rt<d;Rt++){let Y=R[Rt].g;const Ct=R[Rt].map;if(Y-=S,0>Y)S=Math.max(0,R[Rt].g-100),nt=!1;else try{qf(Ct,O,"req"+Y+"_")}catch{_&&_(Ct)}}if(nt){_=O.join("&");break t}}}return o=o.i.splice(0,d),l.D=o,_}function ku(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;or||Ga(),ar||(or(),ar=!0),ki.add(l,o),o.v=0}}function to(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=dr(p(o.Fa,o),Mu(o,o.v)),o.v++,!0)}r.Fa=function(){if(this.u=null,Nu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=dr(p(this.ab,this),o)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ft(10),Rs(this),Nu(this))};function eo(o){o.A!=null&&(u.clearTimeout(o.A),o.A=null)}function Nu(o){o.g=new _e(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=ne(o.qa);st(l,"RID","rpc"),st(l,"SID",o.K),st(l,"AID",o.T),st(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&st(l,"TO",o.ja),st(l,"TYPE","xmlhttp"),Er(o,l),o.m&&o.o&&Yi(l,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Es(ne(l)),d.m=null,d.P=!0,au(d,o)}r.Za=function(){this.C!=null&&(this.C=null,Rs(this),to(this),Ft(19))};function bs(o){o.C!=null&&(u.clearTimeout(o.C),o.C=null)}function Ou(o,l){var d=null;if(o.g==l){bs(o),eo(o),o.g=null;var _=2}else if(Xi(o.h,l))d=l.D,fu(o.h,l),_=1;else return;if(o.G!=0){if(l.o)if(_==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var R=o.B;_=_s(),Mt(_,new ru(_,d)),Ps(o)}else ku(o);else if(R=l.s,R==3||R==0&&0<l.X||!(_==1&&Kf(o,l)||_==2&&to(o)))switch(d&&0<d.length&&(l=o.h,l.i=l.i.concat(d)),R){case 1:Ke(o,5);break;case 4:Ke(o,10);break;case 3:Ke(o,6);break;default:Ke(o,2)}}}function Mu(o,l){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*l}function Ke(o,l){if(o.j.info("Error code "+l),l==2){var d=p(o.fb,o),_=o.Xa;const R=!_;_=new je(_||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Ts(_,"https"),Es(_),R?Lf(_.toString(),d):Uf(_.toString(),d)}else Ft(2);o.G=0,o.l&&o.l.sa(l),Fu(o),Cu(o)}r.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Ft(2)):(this.j.info("Failed to ping google.com"),Ft(1))};function Fu(o){if(o.G=0,o.ka=[],o.l){const l=mu(o.h);(l.length!=0||o.i.length!=0)&&(V(o.ka,l),V(o.ka,o.i),o.h.i.length=0,x(o.i),o.i.length=0),o.l.ra()}}function Lu(o,l,d){var _=d instanceof je?ne(d):new je(d);if(_.g!="")l&&(_.g=l+"."+_.g),Is(_,_.s);else{var R=u.location;_=R.protocol,l=l?l+"."+R.hostname:R.hostname,R=+R.port;var S=new je(null);_&&Ts(S,_),l&&(S.g=l),R&&Is(S,R),d&&(S.l=d),_=S}return d=o.D,l=o.ya,d&&l&&st(_,d,l),st(_,"VER",o.la),Er(o,_),_}function Uu(o,l,d){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new _t(new ws({eb:d})):new _t(o.pa),l.Ha(o.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Bu(){}r=Bu.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Ss(){}Ss.prototype.g=function(o,l){return new Gt(o,l)};function Gt(o,l){Vt.call(this),this.g=new Vu(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!B(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!B(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new yn(this)}C(Gt,Vt),Gt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Gt.prototype.close=function(){Zi(this.g)},Gt.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=qi(o),o=d);l.i.push(new Sf(l.Ya++,o)),l.G==3&&Ps(l)},Gt.prototype.N=function(){this.g.l=null,delete this.j,Zi(this.g),delete this.g,Gt.aa.N.call(this)};function qu(o){Gi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){t:{for(const d in l){o=d;break t}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}C(qu,Gi);function zu(){ji.call(this),this.status=1}C(zu,ji);function yn(o){this.g=o}C(yn,Bu),yn.prototype.ua=function(){Mt(this.g,"a")},yn.prototype.ta=function(o){Mt(this.g,new qu(o))},yn.prototype.sa=function(o){Mt(this.g,new zu)},yn.prototype.ra=function(){Mt(this.g,"b")},Ss.prototype.createWebChannel=Ss.prototype.g,Gt.prototype.send=Gt.prototype.o,Gt.prototype.open=Gt.prototype.m,Gt.prototype.close=Gt.prototype.close,El=function(){return new Ss},Il=function(){return _s()},Tl=ze,fo={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ps.NO_ERROR=0,ps.TIMEOUT=8,ps.HTTP_ERROR=6,Us=ps,su.COMPLETE="complete",yl=su,Za.EventType=lr,lr.OPEN="a",lr.CLOSE="b",lr.ERROR="c",lr.MESSAGE="d",Vt.prototype.listen=Vt.prototype.K,Sr=Za,_t.prototype.listenOnce=_t.prototype.L,_t.prototype.getLastError=_t.prototype.Ka,_t.prototype.getLastErrorCode=_t.prototype.Ba,_t.prototype.getStatus=_t.prototype.Z,_t.prototype.getResponseJson=_t.prototype.Oa,_t.prototype.getResponseText=_t.prototype.oa,_t.prototype.send=_t.prototype.ea,_t.prototype.setWithCredentials=_t.prototype.Ha,gl=_t}).apply(typeof Cs<"u"?Cs:typeof self<"u"?self:typeof window<"u"?window:{});const ju="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}wt.UNAUTHENTICATED=new wt(null),wt.GOOGLE_CREDENTIALS=new wt("google-credentials-uid"),wt.FIRST_PARTY=new wt("first-party-uid"),wt.MOCK_USER=new wt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pe=new Qf("@firebase/firestore");function Rn(){return Pe.logLevel}function Hf(r){Pe.setLogLevel(r)}function k(r,...t){if(Pe.logLevel<=se.DEBUG){const e=t.map(Mo);Pe.debug(`Firestore (${Qn}): ${r}`,...e)}}function gt(r,...t){if(Pe.logLevel<=se.ERROR){const e=t.map(Mo);Pe.error(`Firestore (${Qn}): ${r}`,...e)}}function Kt(r,...t){if(Pe.logLevel<=se.WARN){const e=t.map(Mo);Pe.warn(`Firestore (${Qn}): ${r}`,...e)}}function Mo(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(r="Unexpected state"){const t=`FIRESTORE (${Qn}) INTERNAL ASSERTION FAILED: `+r;throw gt(t),new Error(t)}function q(r,t){r||L()}function Xf(r,t){r||L()}function N(r,t){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends ll{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class vl{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(wt.UNAUTHENTICATED))}shutdown(){}}class Jf{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Yf{constructor(t){this.t=t,this.currentUser=wt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){q(this.o===void 0);let n=this.i;const s=c=>this.i!==n?(n=this.i,e(c)):Promise.resolve();let i=new vt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new vt,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const c=i;t.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},u=c=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(c=>u(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new vt)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(q(typeof n.accessToken=="string"),new wl(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return q(t===null||typeof t=="string"),new wt(t)}}class Zf{constructor(t,e,n){this.l=t,this.h=e,this.P=n,this.type="FirstParty",this.user=wt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class tm{constructor(t,e,n){this.l=t,this.h=e,this.P=n}getToken(){return Promise.resolve(new Zf(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(wt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Al{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class em{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){q(this.o===void 0);const n=i=>{i.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,k("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>n(i))};const s=i=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(q(typeof e.token=="string"),this.R=e.token,new Al(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class nm{getToken(){return Promise.resolve(new Al(""))}invalidateToken(){}start(t,e){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rm(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const s=rm(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%t.length))}return n}}function K(r,t){return r<t?-1:r>t?1:0}function xn(r,t,e){return r.length===t.length&&r.every((n,s)=>e(n,t[s]))}function Rl(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return lt.fromMillis(Date.now())}static fromDate(t){return lt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new lt(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?K(this.nanoseconds,t.nanoseconds):K(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(t){this.timestamp=t}static fromTimestamp(t){return new z(t)}static min(){return new z(new lt(0,0))}static max(){return new z(new lt(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(t,e,n){e===void 0?e=0:e>t.length&&L(),n===void 0?n=t.length-e:n>t.length-e&&L(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return Ur.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ur?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const i=t.get(s),a=e.get(s);if(i<a)return-1;if(i>a)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class H extends Ur{construct(t,e,n){return new H(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new D(b.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(s=>s.length>0))}return new H(e)}static emptyPath(){return new H([])}}const sm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ot extends Ur{construct(t,e,n){return new ot(t,e,n)}static isValidIdentifier(t){return sm.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ot.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ot(["__name__"])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(n.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new D(b.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new D(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=c,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(i(),s++)}if(i(),a)throw new D(b.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ot(e)}static emptyPath(){return new ot([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(H.fromString(t))}static fromName(t){return new M(H.fromString(t).popFirst(5))}static empty(){return new M(H.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&H.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return H.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new H(t.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}function mo(r){return r.fields.find(t=>t.kind===2)}function $e(r){return r.fields.filter(t=>t.kind!==2)}function im(r,t){let e=K(r.collectionGroup,t.collectionGroup);if(e!==0)return e;for(let n=0;n<Math.min(r.fields.length,t.fields.length);++n)if(e=om(r.fields[n],t.fields[n]),e!==0)return e;return K(r.fields.length,t.fields.length)}Dn.UNKNOWN_ID=-1;class Ze{constructor(t,e){this.fieldPath=t,this.kind=e}}function om(r,t){const e=ot.comparator(r.fieldPath,t.fieldPath);return e!==0?e:K(r.kind,t.kind)}class kn{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new kn(0,Qt.min())}}function Pl(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=z.fromTimestamp(n===1e9?new lt(e+1,0):new lt(e,n));return new Qt(s,M.empty(),t)}function bl(r){return new Qt(r.readTime,r.key,-1)}class Qt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Qt(z.min(),M.empty(),-1)}static max(){return new Qt(z.max(),M.empty(),-1)}}function Lo(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(r.documentKey,t.documentKey),e!==0?e:K(r.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Vl{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oe(r){if(r.code!==b.FAILED_PRECONDITION||r.message!==Sl)throw r;k("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new A((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof A?e:A.resolve(e)}catch(e){return A.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):A.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):A.reject(e)}static resolve(t){return new A((e,n)=>{e(t)})}static reject(t){return new A((e,n)=>{n(t)})}static waitFor(t){return new A((e,n)=>{let s=0,i=0,a=!1;t.forEach(u=>{++s,u.next(()=>{++i,a&&i===s&&e()},c=>n(c))}),a=!0,i===s&&e()})}static or(t){let e=A.resolve(!1);for(const n of t)e=e.next(s=>s?A.resolve(s):n());return e}static forEach(t,e){const n=[];return t.forEach((s,i)=>{n.push(e.call(this,s,i))}),this.waitFor(n)}static mapArray(t,e){return new A((n,s)=>{const i=t.length,a=new Array(i);let u=0;for(let c=0;c<i;c++){const h=c;e(t[h]).next(f=>{a[h]=f,++u,u===i&&n(a)},f=>s(f))}})}static doWhile(t,e){return new A((n,s)=>{const i=()=>{t()===!0?e().next(()=>{i()},s):n()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.V=new vt,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{e.error?this.V.reject(new Dr(t,e.error)):this.V.resolve()},this.transaction.onerror=n=>{const s=Uo(n.target.error);this.V.reject(new Dr(t,s))}}static open(t,e,n,s){try{return new li(e,t.transaction(s,n))}catch(i){throw new Dr(e,i)}}get m(){return this.V.promise}abort(t){t&&this.V.reject(t),this.aborted||(k("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new um(e)}}class Yt{constructor(t,e,n){this.name=t,this.version=e,this.p=n,Yt.S(Ws())===12.2&&gt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return k("SimpleDb","Removing database:",t),We(window.indexedDB.deleteDatabase(t)).toPromise()}static D(){if(!$f())return!1;if(Yt.v())return!0;const t=Ws(),e=Yt.S(t),n=0<e&&e<10,s=Cl(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static v(){var t;return typeof process<"u"&&((t=process.__PRIVATE_env)===null||t===void 0?void 0:t.C)==="YES"}static F(t,e){return t.store(e)}static S(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(t){return this.db||(k("SimpleDb","Opening database:",this.name),this.db=await new Promise((e,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;e(a)},s.onblocked=()=>{n(new Dr(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new D(b.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new D(b.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new Dr(t,a))},s.onupgradeneeded=i=>{k("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;this.p.O(a,s.transaction,i.oldVersion,this.version).next(()=>{k("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=e=>this.N(e)),this.db}L(t){this.N=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,s){const i=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.M(t);const u=li.open(this.db,t,i?"readonly":"readwrite",n),c=s(u).next(h=>(u.g(),h)).catch(h=>(u.abort(h),A.reject(h))).toPromise();return c.catch(()=>{}),await u.m,c}catch(u){const c=u,h=c.name!=="FirebaseError"&&a<3;if(k("SimpleDb","Transaction failed with error:",c.message,"Retrying:",h),this.close(),!h)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Cl(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class am{constructor(t){this.B=t,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(t){this.B=t}done(){this.k=!0}$(t){this.q=t}delete(){return We(this.B.delete())}}class Dr extends D{constructor(t,e){super(b.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Me(r){return r.name==="IndexedDbTransactionError"}class um{constructor(t){this.store=t}put(t,e){let n;return e!==void 0?(k("SimpleDb","PUT",this.store.name,t,e),n=this.store.put(e,t)):(k("SimpleDb","PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),We(n)}add(t){return k("SimpleDb","ADD",this.store.name,t,t),We(this.store.add(t))}get(t){return We(this.store.get(t)).next(e=>(e===void 0&&(e=null),k("SimpleDb","GET",this.store.name,t,e),e))}delete(t){return k("SimpleDb","DELETE",this.store.name,t),We(this.store.delete(t))}count(){return k("SimpleDb","COUNT",this.store.name),We(this.store.count())}U(t,e){const n=this.options(t,e),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A((a,u)=>{i.onerror=c=>{u(c.target.error)},i.onsuccess=c=>{a(c.target.result)}})}{const i=this.cursor(n),a=[];return this.W(i,(u,c)=>{a.push(c)}).next(()=>a)}}G(t,e){const n=this.store.getAll(t,e===null?void 0:e);return new A((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}})}j(t,e){k("SimpleDb","DELETE ALL",this.store.name);const n=this.options(t,e);n.H=!1;const s=this.cursor(n);return this.W(s,(i,a,u)=>u.delete())}J(t,e){let n;e?n=t:(n={},e=t);const s=this.cursor(n);return this.W(s,e)}Y(t){const e=this.cursor({});return new A((n,s)=>{e.onerror=i=>{const a=Uo(i.target.error);s(a)},e.onsuccess=i=>{const a=i.target.result;a?t(a.primaryKey,a.value).next(u=>{u?a.continue():n()}):n()}})}W(t,e){const n=[];return new A((s,i)=>{t.onerror=a=>{i(a.target.error)},t.onsuccess=a=>{const u=a.target.result;if(!u)return void s();const c=new am(u),h=e(u.primaryKey,u.value,c);if(h instanceof A){const f=h.catch(m=>(c.done(),A.reject(m)));n.push(f)}c.isDone?s():c.K===null?u.continue():u.continue(c.K)}}).next(()=>A.waitFor(n))}options(t,e){let n;return t!==void 0&&(typeof t=="string"?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.H?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function We(r){return new A((t,e)=>{r.onsuccess=n=>{const s=n.target.result;t(s)},r.onerror=n=>{const s=Uo(n.target.error);e(s)}})}let Ku=!1;function Uo(r){const t=Yt.S(Ws());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(e)>=0){const n=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Ku||(Ku=!0,setTimeout(()=>{throw n},0)),n}}return r}class cm{constructor(t,e){this.asyncQueue=t,this.Z=e,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(t){k("IndexBackfiller",`Scheduled in ${t}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,async()=>{this.task=null;try{k("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(e){Me(e)?k("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",e):await Oe(e)}await this.X(6e4)})}}class lm{constructor(t,e){this.localStore=t,this.persistence=e}async ee(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",e=>this.te(e,t))}te(t,e){const n=new Set;let s=e,i=!0;return A.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next(a=>{if(a!==null&&!n.has(a))return k("IndexBackfiller",`Processing collection: ${a}`),this.ne(t,a,s).next(u=>{s-=u,n.add(a)});i=!1})).next(()=>e-s)}ne(t,e,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next(s=>this.localStore.localDocuments.getNextDocuments(t,e,s,n).next(i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next(()=>this.re(s,i)).next(u=>(k("IndexBackfiller",`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(t,e,u))).next(()=>a.size)}))}re(t,e){let n=t;return e.changes.forEach((s,i)=>{const a=bl(i);Lo(a,n)>0&&(n=a)}),new Qt(n.readTime,n.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ie(n),this.se=n=>e.writeSequenceNumber(n))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}Bt.oe=-1;function Hr(r){return r==null}function Br(r){return r===0&&1/r==-1/0}function xl(r){return typeof r=="number"&&Number.isInteger(r)&&!Br(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=Qu(t)),t=hm(r.get(e),t);return Qu(t)}function hm(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":e+="";break;case"":e+="";break;default:e+=i}}return e}function Qu(r){return r+""}function Ht(r){const t=r.length;if(q(t>=2),t===2)return q(r.charAt(0)===""&&r.charAt(1)===""),H.emptyPath();const e=t-2,n=[];let s="";for(let i=0;i<t;){const a=r.indexOf("",i);switch((a<0||a>e)&&L(),r.charAt(a+1)){case"":const u=r.substring(i,a);let c;s.length===0?c=u:(s+=u,c=s,s=""),n.push(c);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:L()}i=a+2}return new H(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $u=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bs(r,t){return[r,Nt(t)]}function Dl(r,t,e){return[r,Nt(t),e]}const dm={},fm=["prefixPath","collectionGroup","readTime","documentId"],mm=["prefixPath","collectionGroup","documentId"],_m=["collectionGroup","readTime","prefixPath","documentId"],pm=["canonicalId","targetId"],gm=["targetId","path"],ym=["path","targetId"],Tm=["collectionId","parent"],Im=["indexId","uid"],Em=["uid","sequenceNumber"],wm=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],vm=["indexId","uid","orderedDocumentKey"],Am=["userId","collectionPath","documentId"],Rm=["userId","collectionPath","largestBatchId"],Pm=["userId","collectionGroup","largestBatchId"],kl=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],bm=[...kl,"documentOverlays"],Nl=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Ol=Nl,Bo=[...Ol,"indexConfiguration","indexState","indexEntries"],Sm=Bo,Vm=[...Bo,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o extends Vl{constructor(t,e){super(),this._e=t,this.currentSequenceNumber=e}}function It(r,t){const e=N(r);return Yt.F(e._e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wu(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function Fe(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function Ml(r,t){const e=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.push(t(r[n],n,r));return e}function Fl(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(t,e){this.comparator=t,this.root=e||Pt.EMPTY}insert(t,e){return new rt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Pt.BLACK,null,null))}remove(t){return new rt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Pt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new xs(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new xs(this.root,t,this.comparator,!1)}getReverseIterator(){return new xs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new xs(this.root,t,this.comparator,!0)}}class xs{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Pt{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=n??Pt.RED,this.left=s??Pt.EMPTY,this.right=i??Pt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new Pt(t??this.key,e??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Pt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Pt.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Pt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Pt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();const t=this.left.check();if(t!==this.right.check())throw L();return t+(this.isRed()?0:1)}}Pt.EMPTY=null,Pt.RED=!0,Pt.BLACK=!1;Pt.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(t,e,n,s,i){return this}insert(t,e,n){return new Pt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(t){this.comparator=t,this.data=new rt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Hu(this.data.getIterator())}getIteratorFrom(t){return new Hu(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof tt)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new tt(this.comparator);return e.data=t,e}}class Hu{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function In(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(t){this.fields=t,t.sort(ot.comparator)}static empty(){return new qt([])}unionWith(t){let e=new tt(ot.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new qt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return xn(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cm(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Ll("Invalid base64 string: "+i):i}}(t);return new ft(e)}static fromUint8Array(t){const e=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(t);return new ft(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return K(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ft.EMPTY_BYTE_STRING=new ft("");const xm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ue(r){if(q(!!r),typeof r=="string"){let t=0;const e=xm.exec(r);if(q(!!e),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:ut(r.seconds),nanos:ut(r.nanos)}}function ut(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ce(r){return typeof r=="string"?ft.fromBase64String(r):ft.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hi(r){var t,e;return((e=(((t=r?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function di(r){const t=r.mapValue.fields.__previous_value__;return hi(t)?di(t):t}function qr(r){const t=ue(r.mapValue.fields.__local_write_time__.timestampValue);return new lt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(t,e,n,s,i,a,u,c,h){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h}}class be{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new be("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof be&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},qs={nullValue:"NULL_VALUE"};function Se(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?hi(r)?4:Ul(r)?9007199254740991:fi(r)?10:11:L()}function te(r,t){if(r===t)return!0;const e=Se(r);if(e!==Se(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return qr(r).isEqual(qr(t));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=ue(s.timestampValue),u=ue(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(s,i){return ce(s.bytesValue).isEqual(ce(i.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(s,i){return ut(s.geoPointValue.latitude)===ut(i.geoPointValue.latitude)&&ut(s.geoPointValue.longitude)===ut(i.geoPointValue.longitude)}(r,t);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return ut(s.integerValue)===ut(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ut(s.doubleValue),u=ut(i.doubleValue);return a===u?Br(a)===Br(u):isNaN(a)&&isNaN(u)}return!1}(r,t);case 9:return xn(r.arrayValue.values||[],t.arrayValue.values||[],te);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(Wu(a)!==Wu(u))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(u[c]===void 0||!te(a[c],u[c])))return!1;return!0}(r,t);default:return L()}}function zr(r,t){return(r.values||[]).find(e=>te(e,t))!==void 0}function Ve(r,t){if(r===t)return 0;const e=Se(r),n=Se(t);if(e!==n)return K(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return K(r.booleanValue,t.booleanValue);case 2:return function(i,a){const u=ut(i.integerValue||i.doubleValue),c=ut(a.integerValue||a.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1}(r,t);case 3:return Xu(r.timestampValue,t.timestampValue);case 4:return Xu(qr(r),qr(t));case 5:return K(r.stringValue,t.stringValue);case 6:return function(i,a){const u=ce(i),c=ce(a);return u.compareTo(c)}(r.bytesValue,t.bytesValue);case 7:return function(i,a){const u=i.split("/"),c=a.split("/");for(let h=0;h<u.length&&h<c.length;h++){const f=K(u[h],c[h]);if(f!==0)return f}return K(u.length,c.length)}(r.referenceValue,t.referenceValue);case 8:return function(i,a){const u=K(ut(i.latitude),ut(a.latitude));return u!==0?u:K(ut(i.longitude),ut(a.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return Ju(r.arrayValue,t.arrayValue);case 10:return function(i,a){var u,c,h,f;const m=i.fields||{},p=a.fields||{},v=(u=m.value)===null||u===void 0?void 0:u.arrayValue,C=(c=p.value)===null||c===void 0?void 0:c.arrayValue,x=K(((h=v?.values)===null||h===void 0?void 0:h.length)||0,((f=C?.values)===null||f===void 0?void 0:f.length)||0);return x!==0?x:Ju(v,C)}(r.mapValue,t.mapValue);case 11:return function(i,a){if(i===Ae.mapValue&&a===Ae.mapValue)return 0;if(i===Ae.mapValue)return 1;if(a===Ae.mapValue)return-1;const u=i.fields||{},c=Object.keys(u),h=a.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let m=0;m<c.length&&m<f.length;++m){const p=K(c[m],f[m]);if(p!==0)return p;const v=Ve(u[c[m]],h[f[m]]);if(v!==0)return v}return K(c.length,f.length)}(r.mapValue,t.mapValue);default:throw L()}}function Xu(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return K(r,t);const e=ue(r),n=ue(t),s=K(e.seconds,n.seconds);return s!==0?s:K(e.nanos,n.nanos)}function Ju(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const i=Ve(e[s],n[s]);if(i)return i}return K(e.length,n.length)}function Nn(r){return po(r)}function po(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=ue(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return ce(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return M.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",s=!0;for(const i of e.values||[])s?s=!1:n+=",",n+=po(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${po(e.fields[a])}`;return s+"}"}(r.mapValue):L()}function zs(r){switch(Se(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=di(r);return t?16+zs(t):16;case 5:return 2*r.stringValue.length;case 6:return ce(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+zs(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return Fe(n.fields,(i,a)=>{s+=i.length+zs(a)}),s}(r.mapValue);default:throw L()}}function en(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function go(r){return!!r&&"integerValue"in r}function Gr(r){return!!r&&"arrayValue"in r}function Yu(r){return!!r&&"nullValue"in r}function Zu(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Gs(r){return!!r&&"mapValue"in r}function fi(r){var t,e;return((e=(((t=r?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function kr(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const t={mapValue:{fields:{}}};return Fe(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=kr(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=kr(r.arrayValue.values[e]);return t}return Object.assign({},r)}function Ul(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const Bl={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function km(r){return"nullValue"in r?qs:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?en(be.empty(),M.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?fi(r)?Bl:{mapValue:{}}:L()}function Nm(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?en(be.empty(),M.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Bl:"mapValue"in r?fi(r)?{mapValue:{}}:Ae:L()}function tc(r,t){const e=Ve(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?-1:!r.inclusive&&t.inclusive?1:0}function ec(r,t){const e=Ve(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?1:!r.inclusive&&t.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t){this.value=t}static empty(){return new bt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Gs(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=kr(e)}setAll(t){let e=ot.emptyPath(),n={},s=[];t.forEach((a,u)=>{if(!e.isImmediateParentOf(u)){const c=this.getFieldsMap(e);this.applyChanges(c,n,s),n={},s=[],e=u.popLast()}a?n[u.lastSegment()]=kr(a):s.push(u.lastSegment())});const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());Gs(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return te(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];Gs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){Fe(e,(s,i)=>t[s]=i);for(const s of n)delete t[s]}clone(){return new bt(kr(this.value))}}function ql(r){const t=[];return Fe(r.fields,(e,n)=>{const s=new ot([e]);if(Gs(n)){const i=ql(n.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)}),new qt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(t,e,n,s,i,a,u){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(t){return new it(t,0,z.min(),z.min(),z.min(),bt.empty(),0)}static newFoundDocument(t,e,n,s){return new it(t,1,e,z.min(),n,s,0)}static newNoDocument(t,e){return new it(t,2,e,z.min(),z.min(),bt.empty(),0)}static newUnknownDocument(t,e){return new it(t,3,e,z.min(),z.min(),bt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=bt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=bt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof it&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new it(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(t,e){this.position=t,this.inclusive=e}}function nc(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const i=t[s],a=r.position[s];if(i.field.isKeyField()?n=M.comparator(M.fromName(a.referenceValue),e.key):n=Ve(a,e.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function rc(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!te(r.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(t,e="asc"){this.field=t,this.dir=e}}function Om(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{}class X extends zl{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Mm(t,e,n):e==="array-contains"?new Um(t,n):e==="in"?new Wl(t,n):e==="not-in"?new Bm(t,n):e==="array-contains-any"?new qm(t,n):new X(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new Fm(t,n):new Lm(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(Ve(e,this.value)):e!==null&&Se(this.value)===Se(e)&&this.matchesComparison(Ve(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Z extends zl{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Z(t,e)}matches(t){return On(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function On(r){return r.op==="and"}function yo(r){return r.op==="or"}function qo(r){return Gl(r)&&On(r)}function Gl(r){for(const t of r.filters)if(t instanceof Z)return!1;return!0}function To(r){if(r instanceof X)return r.field.canonicalString()+r.op.toString()+Nn(r.value);if(qo(r))return r.filters.map(t=>To(t)).join(",");{const t=r.filters.map(e=>To(e)).join(",");return`${r.op}(${t})`}}function jl(r,t){return r instanceof X?function(n,s){return s instanceof X&&n.op===s.op&&n.field.isEqual(s.field)&&te(n.value,s.value)}(r,t):r instanceof Z?function(n,s){return s instanceof Z&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,a,u)=>i&&jl(a,s.filters[u]),!0):!1}(r,t):void L()}function Kl(r,t){const e=r.filters.concat(t);return Z.create(e,r.op)}function Ql(r){return r instanceof X?function(e){return`${e.field.canonicalString()} ${e.op} ${Nn(e.value)}`}(r):r instanceof Z?function(e){return e.op.toString()+" {"+e.getFilters().map(Ql).join(" ,")+"}"}(r):"Filter"}class Mm extends X{constructor(t,e,n){super(t,e,n),this.key=M.fromName(n.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class Fm extends X{constructor(t,e){super(t,"in",e),this.keys=$l("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Lm extends X{constructor(t,e){super(t,"not-in",e),this.keys=$l("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function $l(r,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(n=>M.fromName(n.referenceValue))}class Um extends X{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Gr(e)&&zr(e.arrayValue,this.value)}}class Wl extends X{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&zr(this.value.arrayValue,e)}}class Bm extends X{constructor(t,e){super(t,"not-in",e)}matches(t){if(zr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!zr(this.value.arrayValue,e)}}class qm extends X{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Gr(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>zr(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(t,e=null,n=[],s=[],i=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.ue=null}}function Io(r,t=null,e=[],n=[],s=null,i=null,a=null){return new zm(r,t,e,n,s,i,a)}function nn(r){const t=N(r);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>To(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),Hr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>Nn(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>Nn(n)).join(",")),t.ue=e}return t.ue}function Xr(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!Om(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!jl(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!rc(r.startAt,t.startAt)&&rc(r.endAt,t.endAt)}function Hs(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Xs(r,t){return r.filters.filter(e=>e instanceof X&&e.field.isEqual(t))}function sc(r,t,e){let n=qs,s=!0;for(const i of Xs(r,t)){let a=qs,u=!0;switch(i.op){case"<":case"<=":a=km(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,u=!1;break;case"!=":case"not-in":a=qs}tc({value:n,inclusive:s},{value:a,inclusive:u})<0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];tc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}function ic(r,t,e){let n=Ae,s=!0;for(const i of Xs(r,t)){let a=Ae,u=!0;switch(i.op){case">=":case">":a=Nm(i.value),u=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,u=!1;break;case"!=":case"not-in":a=Ae}ec({value:n,inclusive:s},{value:a,inclusive:u})>0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];ec({value:n,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(t,e=null,n=[],s=[],i=null,a="F",u=null,c=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Hl(r,t,e,n,s,i,a,u){return new le(r,t,e,n,s,i,a,u)}function $n(r){return new le(r)}function oc(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function zo(r){return r.collectionGroup!==null}function Vn(r){const t=N(r);if(t.ce===null){t.ce=[];const e=new Set;for(const i of t.explicitOrderBy)t.ce.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new tt(ot.comparator);return a.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(u=u.add(h.field))})}),u})(t).forEach(i=>{e.has(i.canonicalString())||i.isKeyField()||t.ce.push(new jr(i,n))}),e.has(ot.keyField().canonicalString())||t.ce.push(new jr(ot.keyField(),n))}return t.ce}function Ot(r){const t=N(r);return t.le||(t.le=Jl(t,Vn(r))),t.le}function Xl(r){const t=N(r);return t.he||(t.he=Jl(t,r.explicitOrderBy)),t.he}function Jl(r,t){if(r.limitType==="F")return Io(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new jr(s.field,i)});const e=r.endAt?new Ce(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Ce(r.startAt.position,r.startAt.inclusive):null;return Io(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function Eo(r,t){const e=r.filters.concat([t]);return new le(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function Js(r,t,e){return new le(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function Jr(r,t){return Xr(Ot(r),Ot(t))&&r.limitType===t.limitType}function Yl(r){return`${nn(Ot(r))}|lt:${r.limitType}`}function Pn(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(s=>Ql(s)).join(", ")}]`),Hr(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>Nn(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>Nn(s)).join(",")),`Target(${n})`}(Ot(r))}; limitType=${r.limitType})`}function Yr(r,t){return t.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):M.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,t)&&function(n,s){for(const i of Vn(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,t)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,t)&&function(n,s){return!(n.startAt&&!function(a,u,c){const h=nc(a,u,c);return a.inclusive?h<=0:h<0}(n.startAt,Vn(n),s)||n.endAt&&!function(a,u,c){const h=nc(a,u,c);return a.inclusive?h>=0:h>0}(n.endAt,Vn(n),s))}(r,t)}function Zl(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function th(r){return(t,e)=>{let n=!1;for(const s of Vn(r)){const i=Gm(s,t,e);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function Gm(r,t,e){const n=r.field.isKeyField()?M.comparator(t.key,e.key):function(i,a,u){const c=a.data.field(i),h=u.data.field(i);return c!==null&&h!==null?Ve(c,h):L()}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Fe(this.inner,(e,n)=>{for(const[s,i]of n)t(s,i)})}isEmpty(){return Fl(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jm=new rt(M.comparator);function zt(){return jm}const eh=new rt(M.comparator);function Vr(...r){let t=eh;for(const e of r)t=t.insert(e.key,e);return t}function nh(r){let t=eh;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Xt(){return Nr()}function rh(){return Nr()}function Nr(){return new he(r=>r.toString(),(r,t)=>r.isEqual(t))}const Km=new rt(M.comparator),Qm=new tt(M.comparator);function Q(...r){let t=Qm;for(const e of r)t=t.add(e);return t}const $m=new tt(K);function Go(){return $m}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jo(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Br(t)?"-0":t}}function sh(r){return{integerValue:""+r}}function ih(r,t){return xl(t)?sh(t):jo(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(){this._=void 0}}function Wm(r,t,e){return r instanceof Mn?function(s,i){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&hi(i)&&(i=di(i)),i&&(a.fields.__previous_value__=i),{mapValue:a}}(e,t):r instanceof rn?ah(r,t):r instanceof sn?uh(r,t):function(s,i){const a=oh(s,i),u=ac(a)+ac(s.Pe);return go(a)&&go(s.Pe)?sh(u):jo(s.serializer,u)}(r,t)}function Hm(r,t,e){return r instanceof rn?ah(r,t):r instanceof sn?uh(r,t):e}function oh(r,t){return r instanceof Fn?function(n){return go(n)||function(i){return!!i&&"doubleValue"in i}(n)}(t)?t:{integerValue:0}:null}class Mn extends mi{}class rn extends mi{constructor(t){super(),this.elements=t}}function ah(r,t){const e=ch(t);for(const n of r.elements)e.some(s=>te(s,n))||e.push(n);return{arrayValue:{values:e}}}class sn extends mi{constructor(t){super(),this.elements=t}}function uh(r,t){let e=ch(t);for(const n of r.elements)e=e.filter(s=>!te(s,n));return{arrayValue:{values:e}}}class Fn extends mi{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function ac(r){return ut(r.integerValue||r.doubleValue)}function ch(r){return Gr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(t,e){this.field=t,this.transform=e}}function Xm(r,t){return r.field.isEqual(t.field)&&function(n,s){return n instanceof rn&&s instanceof rn||n instanceof sn&&s instanceof sn?xn(n.elements,s.elements,te):n instanceof Fn&&s instanceof Fn?te(n.Pe,s.Pe):n instanceof Mn&&s instanceof Mn}(r.transform,t.transform)}class Jm{constructor(t,e){this.version=t,this.transformResults=e}}class ct{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ct}static exists(t){return new ct(void 0,t)}static updateTime(t){return new ct(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function js(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class _i{}function lh(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new Hn(r.key,ct.none()):new Wn(r.key,r.data,ct.none());{const e=r.data,n=bt.empty();let s=new tt(ot.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new de(r.key,n,new qt(s.toArray()),ct.none())}}function Ym(r,t,e){r instanceof Wn?function(s,i,a){const u=s.value.clone(),c=cc(s.fieldTransforms,i,a.transformResults);u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(r,t,e):r instanceof de?function(s,i,a){if(!js(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=cc(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(hh(s)),c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(r,t,e):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function Or(r,t,e,n){return r instanceof Wn?function(i,a,u,c){if(!js(i.precondition,a))return u;const h=i.value.clone(),f=lc(i.fieldTransforms,c,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(r,t,e,n):r instanceof de?function(i,a,u,c){if(!js(i.precondition,a))return u;const h=lc(i.fieldTransforms,c,a),f=a.data;return f.setAll(hh(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(r,t,e,n):function(i,a,u){return js(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(r,t,e)}function Zm(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),i=oh(n.transform,s||null);i!=null&&(e===null&&(e=bt.empty()),e.set(n.field,i))}return e||null}function uc(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&xn(n,s,(i,a)=>Xm(i,a))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class Wn extends _i{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class de extends _i{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function hh(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function cc(r,t,e){const n=new Map;q(r.length===e.length);for(let s=0;s<e.length;s++){const i=r[s],a=i.transform,u=t.data.field(i.field);n.set(i.field,Hm(a,u,e[s]))}return n}function lc(r,t,e){const n=new Map;for(const s of r){const i=s.transform,a=e.data.field(s.field);n.set(s.field,Wm(i,a,t))}return n}class Hn extends _i{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ko extends _i{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Ym(i,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=Or(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=Or(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=rh();return this.mutations.forEach(s=>{const i=t.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=e.has(s.key)?null:u;const c=lh(a,u);c!==null&&n.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(z.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),Q())}isEqual(t){return this.batchId===t.batchId&&xn(this.mutations,t.mutations,(e,n)=>uc(e,n))&&xn(this.baseMutations,t.baseMutations,(e,n)=>uc(e,n))}}class $o{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){q(t.mutations.length===n.length);let s=function(){return Km}();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new $o(t,e,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(t,e,n){this.alias=t,this.aggregateType=e,this.fieldPath=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Tt,J;function fh(r){switch(r){default:return L();case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0}}function mh(r){if(r===void 0)return gt("GRPC error has no .code"),b.UNKNOWN;switch(r){case Tt.OK:return b.OK;case Tt.CANCELLED:return b.CANCELLED;case Tt.UNKNOWN:return b.UNKNOWN;case Tt.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case Tt.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case Tt.INTERNAL:return b.INTERNAL;case Tt.UNAVAILABLE:return b.UNAVAILABLE;case Tt.UNAUTHENTICATED:return b.UNAUTHENTICATED;case Tt.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case Tt.NOT_FOUND:return b.NOT_FOUND;case Tt.ALREADY_EXISTS:return b.ALREADY_EXISTS;case Tt.PERMISSION_DENIED:return b.PERMISSION_DENIED;case Tt.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case Tt.ABORTED:return b.ABORTED;case Tt.OUT_OF_RANGE:return b.OUT_OF_RANGE;case Tt.UNIMPLEMENTED:return b.UNIMPLEMENTED;case Tt.DATA_LOSS:return b.DATA_LOSS;default:return L()}}(J=Tt||(Tt={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ys=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _h(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e_=new Ye([4294967295,4294967295],0);function hc(r){const t=_h().encode(r),e=new pl;return e.update(t),new Uint8Array(e.digest())}function dc(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Ye([e,n],0),new Ye([s,i],0)]}class Ho{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new Cr(`Invalid padding: ${e}`);if(n<0)throw new Cr(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new Cr(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new Cr(`Invalid padding when bitmap length is 0: ${e}`);this.Ie=8*t.length-e,this.Te=Ye.fromNumber(this.Ie)}Ee(t,e,n){let s=t.add(e.multiply(Ye.fromNumber(n)));return s.compare(e_)===1&&(s=new Ye([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const e=hc(t),[n,s]=dc(e);for(let i=0;i<this.hashCount;i++){const a=this.Ee(n,s,i);if(!this.de(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new Ho(i,s,e);return n.forEach(u=>a.insert(u)),a}insert(t){if(this.Ie===0)return;const e=hc(t),[n,s]=dc(e);for(let i=0;i<this.hashCount;i++){const a=this.Ee(n,s,i);this.Ae(a)}}Ae(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class Cr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,es.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new ts(z.min(),s,new rt(K),zt(),Q())}}class es{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new es(n,e,Q(),Q(),Q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(t,e,n,s){this.Re=t,this.removedTargetIds=e,this.key=n,this.Ve=s}}class ph{constructor(t,e){this.targetId=t,this.me=e}}class gh{constructor(t,e,n=ft.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class fc{constructor(){this.fe=0,this.ge=_c(),this.pe=ft.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=Q(),e=Q(),n=Q();return this.ge.forEach((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:L()}}),new es(this.pe,this.ye,t,e,n)}Ce(){this.we=!1,this.ge=_c()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,q(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class n_{constructor(t){this.Le=t,this.Be=new Map,this.ke=zt(),this.qe=mc(),this.Qe=new rt(K)}Ke(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(e,t.Ve):this.Ue(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.Ue(e,t.key,t.Ve)}We(t){this.forEachTarget(t,e=>{const n=this.Ge(e);switch(t.state){case 0:this.ze(e)&&n.De(t.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(t.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(e);break;case 3:this.ze(e)&&(n.Ne(),n.De(t.resumeToken));break;case 4:this.ze(e)&&(this.je(e),n.De(t.resumeToken));break;default:L()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((n,s)=>{this.ze(s)&&e(s)})}He(t){const e=t.targetId,n=t.me.count,s=this.Je(e);if(s){const i=s.target;if(Hs(i))if(n===0){const a=new M(i.path);this.Ue(e,a,it.newNoDocument(a,z.min()))}else q(n===1);else{const a=this.Ye(e);if(a!==n){const u=this.Ze(t),c=u?this.Xe(u,t,a):1;if(c!==0){this.je(e);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(e,h)}Ys?.et(function(f,m,p,v,C){var x,V,U,B,F,G;const W={localCacheCount:f,existenceFilterCount:m.count,databaseId:p.database,projectId:p.projectId},j=m.unchangedNames;return j&&(W.bloomFilter={applied:C===0,hashCount:(x=j?.hashCount)!==null&&x!==void 0?x:0,bitmapLength:(B=(U=(V=j?.bits)===null||V===void 0?void 0:V.bitmap)===null||U===void 0?void 0:U.length)!==null&&B!==void 0?B:0,padding:(G=(F=j?.bits)===null||F===void 0?void 0:F.padding)!==null&&G!==void 0?G:0,mightContain:I=>{var g;return(g=v?.mightContain(I))!==null&&g!==void 0&&g}}),W}(a,t.me,this.Le.tt(),u,c))}}}}Ze(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=e;let a,u;try{a=ce(n).toUint8Array()}catch(c){if(c instanceof Ll)return Kt("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new Ho(a,s,i)}catch(c){return Kt(c instanceof Cr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.Ie===0?null:u}Xe(t,e,n){return e.me.count===n-this.nt(t,e.targetId)?0:2}nt(t,e){const n=this.Le.getRemoteKeysForTarget(e);let s=0;return n.forEach(i=>{const a=this.Le.tt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(u)||(this.Ue(e,i,null),s++)}),s}rt(t){const e=new Map;this.Be.forEach((i,a)=>{const u=this.Je(a);if(u){if(i.current&&Hs(u.target)){const c=new M(u.target.path);this.ke.get(c)!==null||this.it(a,c)||this.Ue(a,c,it.newNoDocument(c,t))}i.be&&(e.set(a,i.ve()),i.Ce())}});let n=Q();this.qe.forEach((i,a)=>{let u=!0;a.forEachWhile(c=>{const h=this.Je(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(n=n.add(i))}),this.ke.forEach((i,a)=>a.setReadTime(t));const s=new ts(t,e,this.Qe,this.ke,n);return this.ke=zt(),this.qe=mc(),this.Qe=new rt(K),s}$e(t,e){if(!this.ze(t))return;const n=this.it(t,e.key)?2:0;this.Ge(t).Fe(e.key,n),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t))}Ue(t,e,n){if(!this.ze(t))return;const s=this.Ge(t);this.it(t,e)?s.Fe(e,1):s.Me(e),this.qe=this.qe.insert(e,this.st(e).delete(t)),n&&(this.ke=this.ke.insert(e,n))}removeTarget(t){this.Be.delete(t)}Ye(t){const e=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let e=this.Be.get(t);return e||(e=new fc,this.Be.set(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new tt(K),this.qe=this.qe.insert(t,e)),e}ze(t){const e=this.Je(t)!==null;return e||k("WatchChangeAggregator","Detected inactive target",t),e}Je(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new fc),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.Ue(t,e,null)})}it(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function mc(){return new rt(M.comparator)}function _c(){return new rt(M.comparator)}const r_={asc:"ASCENDING",desc:"DESCENDING"},s_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},i_={and:"AND",or:"OR"};class o_{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function wo(r,t){return r.useProto3Json||Hr(t)?t:{value:t}}function Ln(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function yh(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function a_(r,t){return Ln(r,t.toTimestamp())}function yt(r){return q(!!r),z.fromTimestamp(function(e){const n=ue(e);return new lt(n.seconds,n.nanos)}(r))}function Xo(r,t){return vo(r,t).canonicalString()}function vo(r,t){const e=function(s){return new H(["projects",s.projectId,"databases",s.database])}(r).child("documents");return t===void 0?e:e.child(t)}function Th(r){const t=H.fromString(r);return q(Vh(t)),t}function Kr(r,t){return Xo(r.databaseId,t.path)}function Zt(r,t){const e=Th(t);if(e.get(1)!==r.databaseId.projectId)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new M(wh(e))}function Ih(r,t){return Xo(r.databaseId,t)}function Eh(r){const t=Th(r);return t.length===4?H.emptyPath():wh(t)}function Ao(r){return new H(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function wh(r){return q(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function pc(r,t,e){return{name:Kr(r,t),fields:e.value.mapValue.fields}}function vh(r,t,e){const n=Zt(r,t.name),s=yt(t.updateTime),i=t.createTime?yt(t.createTime):z.min(),a=new bt({mapValue:{fields:t.fields}}),u=it.newFoundDocument(n,s,i,a);return e&&u.setHasCommittedMutations(),e?u.setHasCommittedMutations():u}function u_(r,t){return"found"in t?function(n,s){q(!!s.found),s.found.name,s.found.updateTime;const i=Zt(n,s.found.name),a=yt(s.found.updateTime),u=s.found.createTime?yt(s.found.createTime):z.min(),c=new bt({mapValue:{fields:s.found.fields}});return it.newFoundDocument(i,a,u,c)}(r,t):"missing"in t?function(n,s){q(!!s.missing),q(!!s.readTime);const i=Zt(n,s.missing),a=yt(s.readTime);return it.newNoDocument(i,a)}(r,t):L()}function c_(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:L()}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(q(f===void 0||typeof f=="string"),ft.fromBase64String(f||"")):(q(f===void 0||f instanceof Buffer||f instanceof Uint8Array),ft.fromUint8Array(f||new Uint8Array))}(r,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&function(h){const f=h.code===void 0?b.UNKNOWN:mh(h.code);return new D(f,h.message||"")}(a);e=new gh(n,s,i,u||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=Zt(r,n.document.name),i=yt(n.document.updateTime),a=n.document.createTime?yt(n.document.createTime):z.min(),u=new bt({mapValue:{fields:n.document.fields}}),c=it.newFoundDocument(s,i,a,u),h=n.targetIds||[],f=n.removedTargetIds||[];e=new Ks(h,f,c.key,c)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=Zt(r,n.document),i=n.readTime?yt(n.readTime):z.min(),a=it.newNoDocument(s,i),u=n.removedTargetIds||[];e=new Ks([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=Zt(r,n.document),i=n.removedTargetIds||[];e=new Ks([],i,s,null)}else{if(!("filter"in t))return L();{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new t_(s,i),u=n.targetId;e=new ph(u,a)}}return e}function Qr(r,t){let e;if(t instanceof Wn)e={update:pc(r,t.key,t.value)};else if(t instanceof Hn)e={delete:Kr(r,t.key)};else if(t instanceof de)e={update:pc(r,t.key,t.data),updateMask:__(t.fieldMask)};else{if(!(t instanceof Ko))return L();e={verify:Kr(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(i,a){const u=a.transform;if(u instanceof Mn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof rn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof sn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Fn)return{fieldPath:a.field.canonicalString(),increment:u.Pe};throw L()}(0,n))),t.precondition.isNone||(e.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:a_(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:L()}(r,t.precondition)),e}function Ro(r,t){const e=t.currentDocument?function(i){return i.updateTime!==void 0?ct.updateTime(yt(i.updateTime)):i.exists!==void 0?ct.exists(i.exists):ct.none()}(t.currentDocument):ct.none(),n=t.updateTransforms?t.updateTransforms.map(s=>function(a,u){let c=null;if("setToServerValue"in u)q(u.setToServerValue==="REQUEST_TIME"),c=new Mn;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];c=new rn(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];c=new sn(f)}else"increment"in u?c=new Fn(a,u.increment):L();const h=ot.fromServerFormat(u.fieldPath);return new Zr(h,c)}(r,s)):[];if(t.update){t.update.name;const s=Zt(r,t.update.name),i=new bt({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=function(c){const h=c.fieldPaths||[];return new qt(h.map(f=>ot.fromServerFormat(f)))}(t.updateMask);return new de(s,i,a,e,n)}return new Wn(s,i,e,n)}if(t.delete){const s=Zt(r,t.delete);return new Hn(s,e)}if(t.verify){const s=Zt(r,t.verify);return new Ko(s,e)}return L()}function l_(r,t){return r&&r.length>0?(q(t!==void 0),r.map(e=>function(s,i){let a=s.updateTime?yt(s.updateTime):yt(i);return a.isEqual(z.min())&&(a=yt(i)),new Jm(a,s.transformResults||[])}(e,t))):[]}function Ah(r,t){return{documents:[Ih(r,t.path)]}}function pi(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=Ih(r,s);const i=function(h){if(h.length!==0)return Sh(Z.create(h,"and"))}(t.filters);i&&(e.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(p){return{field:Ie(p.field),direction:d_(p.dir)}}(f))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=wo(r,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(t.endAt)),{_t:e,parent:s}}function Rh(r,t,e,n){const{_t:s,parent:i}=pi(r,t),a={},u=[];let c=0;return e.forEach(h=>{const f=n?h.alias:"aggregate_"+c++;a[f]=h.alias,h.aggregateType==="count"?u.push({alias:f,count:{}}):h.aggregateType==="avg"?u.push({alias:f,avg:{field:Ie(h.fieldPath)}}):h.aggregateType==="sum"&&u.push({alias:f,sum:{field:Ie(h.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:u,structuredQuery:s.structuredQuery},parent:s.parent},ut:a,parent:i}}function Ph(r){let t=Eh(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){q(n===1);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=function(m){const p=bh(m);return p instanceof Z&&qo(p)?p.getFilters():[p]}(e.where));let a=[];e.orderBy&&(a=function(m){return m.map(p=>function(C){return new jr(bn(C.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(p))}(e.orderBy));let u=null;e.limit&&(u=function(m){let p;return p=typeof m=="object"?m.value:m,Hr(p)?null:p}(e.limit));let c=null;e.startAt&&(c=function(m){const p=!!m.before,v=m.values||[];return new Ce(v,p)}(e.startAt));let h=null;return e.endAt&&(h=function(m){const p=!m.before,v=m.values||[];return new Ce(v,p)}(e.endAt)),Hl(t,s,a,i,u,"F",c,h)}function h_(r,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function bh(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=bn(e.unaryFilter.field);return X.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=bn(e.unaryFilter.field);return X.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=bn(e.unaryFilter.field);return X.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=bn(e.unaryFilter.field);return X.create(a,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(r):r.fieldFilter!==void 0?function(e){return X.create(bn(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return Z.create(e.compositeFilter.filters.map(n=>bh(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L()}}(e.compositeFilter.op))}(r):L()}function d_(r){return r_[r]}function f_(r){return s_[r]}function m_(r){return i_[r]}function Ie(r){return{fieldPath:r.canonicalString()}}function bn(r){return ot.fromServerFormat(r.fieldPath)}function Sh(r){return r instanceof X?function(e){if(e.op==="=="){if(Zu(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NAN"}};if(Yu(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Zu(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NOT_NAN"}};if(Yu(e.value))return{unaryFilter:{field:Ie(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ie(e.field),op:f_(e.op),value:e.value}}}(r):r instanceof Z?function(e){const n=e.getFilters().map(s=>Sh(s));return n.length===1?n[0]:{compositeFilter:{op:m_(e.op),filters:n}}}(r):L()}function __(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Vh(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(t,e,n,s,i=z.min(),a=z.min(),u=ft.EMPTY_BYTE_STRING,c=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(t){return new oe(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(t){this.ct=t}}function p_(r,t){let e;if(t.document)e=vh(r.ct,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const n=M.fromSegments(t.noDocument.path),s=an(t.noDocument.readTime);e=it.newNoDocument(n,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return L();{const n=M.fromSegments(t.unknownDocument.path),s=an(t.unknownDocument.version);e=it.newUnknownDocument(n,s)}}return t.readTime&&e.setReadTime(function(s){const i=new lt(s[0],s[1]);return z.fromTimestamp(i)}(t.readTime)),e}function gc(r,t){const e=t.key,n={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:Zs(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=function(i,a){return{name:Kr(i,a.key),fields:a.data.value.mapValue.fields,updateTime:Ln(i,a.version.toTimestamp()),createTime:Ln(i,a.createTime.toTimestamp())}}(r.ct,t);else if(t.isNoDocument())n.noDocument={path:e.path.toArray(),readTime:on(t.version)};else{if(!t.isUnknownDocument())return L();n.unknownDocument={path:e.path.toArray(),version:on(t.version)}}return n}function Zs(r){const t=r.toTimestamp();return[t.seconds,t.nanoseconds]}function on(r){const t=r.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function an(r){const t=new lt(r.seconds,r.nanoseconds);return z.fromTimestamp(t)}function He(r,t){const e=(t.baseMutations||[]).map(i=>Ro(r.ct,i));for(let i=0;i<t.mutations.length-1;++i){const a=t.mutations[i];if(i+1<t.mutations.length&&t.mutations[i+1].transform!==void 0){const u=t.mutations[i+1];a.updateTransforms=u.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const n=t.mutations.map(i=>Ro(r.ct,i)),s=lt.fromMillis(t.localWriteTimeMs);return new Qo(t.batchId,s,e,n)}function xr(r){const t=an(r.readTime),e=r.lastLimboFreeSnapshotVersion!==void 0?an(r.lastLimboFreeSnapshotVersion):z.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){return q(i.documents.length===1),Ot($n(Eh(i.documents[0])))}(r.query):function(i){return Ot(Ph(i))}(r.query),new oe(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,t,e,ft.fromBase64String(r.resumeToken))}function xh(r,t){const e=on(t.snapshotVersion),n=on(t.lastLimboFreeSnapshotVersion);let s;s=Hs(t.target)?Ah(r.ct,t.target):pi(r.ct,t.target)._t;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:nn(t.target),readTime:e,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Jo(r){const t=Ph({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Js(t,t.limit,"L"):t}function ro(r,t){return new Wo(t.largestBatchId,Ro(r.ct,t.overlayMutation))}function yc(r,t){const e=t.path.lastSegment();return[r,Nt(t.path.popLast()),e]}function Tc(r,t,e,n){return{indexId:r,uid:t,sequenceNumber:e,readTime:on(n.readTime),documentKey:Nt(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g_{getBundleMetadata(t,e){return Ic(t).get(e).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:an(i.createTime),version:i.version}}(n)})}saveBundleMetadata(t,e){return Ic(t).put(function(s){return{bundleId:s.id,createTime:on(yt(s.createTime)),version:s.version}}(e))}getNamedQuery(t,e){return Ec(t).get(e).next(n=>{if(n)return function(i){return{name:i.name,query:Jo(i.bundledQuery),readTime:an(i.readTime)}}(n)})}saveNamedQuery(t,e){return Ec(t).put(function(s){return{name:s.name,readTime:on(yt(s.readTime)),bundledQuery:s.bundledQuery}}(e))}}function Ic(r){return It(r,"bundles")}function Ec(r){return It(r,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(t,e){this.serializer=t,this.userId=e}static lt(t,e){const n=e.uid||"";return new gi(t,n)}getOverlay(t,e){return wr(t).get(yc(this.userId,e)).next(n=>n?ro(this.serializer,n):null)}getOverlays(t,e){const n=Xt();return A.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){const s=[];return n.forEach((i,a)=>{const u=new Wo(e,a);s.push(this.ht(t,u))}),A.waitFor(s)}removeOverlaysForBatchId(t,e,n){const s=new Set;e.forEach(a=>s.add(Nt(a.getCollectionPath())));const i=[];return s.forEach(a=>{const u=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(wr(t).j("collectionPathOverlayIndex",u))}),A.waitFor(i)}getOverlaysForCollection(t,e,n){const s=Xt(),i=Nt(e),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return wr(t).U("collectionPathOverlayIndex",a).next(u=>{for(const c of u){const h=ro(this.serializer,c);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(t,e,n,s){const i=Xt();let a;const u=IDBKeyRange.bound([this.userId,e,n],[this.userId,e,Number.POSITIVE_INFINITY],!0);return wr(t).J({index:"collectionGroupOverlayIndex",range:u},(c,h,f)=>{const m=ro(this.serializer,h);i.size()<s||m.largestBatchId===a?(i.set(m.getKey(),m),a=m.largestBatchId):f.done()}).next(()=>i)}ht(t,e){return wr(t).put(function(s,i,a){const[u,c,h]=yc(i,a.mutation.key);return{userId:i,collectionPath:c,documentId:h,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:Qr(s.ct,a.mutation)}}(this.serializer,this.userId,e))}}function wr(r){return It(r,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y_{Pt(t){return It(t,"globals")}getSessionToken(t){return this.Pt(t).get("sessionToken").next(e=>{const n=e?.value;return n?ft.fromUint8Array(n):ft.EMPTY_BYTE_STRING})}setSessionToken(t,e){return this.Pt(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(){}It(t,e){this.Tt(t,e),e.Et()}Tt(t,e){if("nullValue"in t)this.dt(e,5);else if("booleanValue"in t)this.dt(e,10),e.At(t.booleanValue?1:0);else if("integerValue"in t)this.dt(e,15),e.At(ut(t.integerValue));else if("doubleValue"in t){const n=ut(t.doubleValue);isNaN(n)?this.dt(e,13):(this.dt(e,15),Br(n)?e.At(0):e.At(n))}else if("timestampValue"in t){let n=t.timestampValue;this.dt(e,20),typeof n=="string"&&(n=ue(n)),e.Rt(`${n.seconds||""}`),e.At(n.nanos||0)}else if("stringValue"in t)this.Vt(t.stringValue,e),this.ft(e);else if("bytesValue"in t)this.dt(e,30),e.gt(ce(t.bytesValue)),this.ft(e);else if("referenceValue"in t)this.yt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.dt(e,45),e.At(n.latitude||0),e.At(n.longitude||0)}else"mapValue"in t?Ul(t)?this.dt(e,Number.MAX_SAFE_INTEGER):fi(t)?this.wt(t.mapValue,e):(this.St(t.mapValue,e),this.ft(e)):"arrayValue"in t?(this.bt(t.arrayValue,e),this.ft(e)):L()}Vt(t,e){this.dt(e,25),this.Dt(t,e)}Dt(t,e){e.Rt(t)}St(t,e){const n=t.fields||{};this.dt(e,55);for(const s of Object.keys(n))this.Vt(s,e),this.Tt(n[s],e)}wt(t,e){var n,s;const i=t.fields||{};this.dt(e,53);const a="value",u=((s=(n=i[a].arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.length)||0;this.dt(e,15),e.At(ut(u)),this.Vt(a,e),this.Tt(i[a],e)}bt(t,e){const n=t.values||[];this.dt(e,50);for(const s of n)this.Tt(s,e)}yt(t,e){this.dt(e,37),M.fromName(t).path.forEach(n=>{this.dt(e,60),this.Dt(n,e)})}dt(t,e){t.At(e)}ft(t){t.At(2)}}Xe.vt=new Xe;function T_(r){if(r===0)return 8;let t=0;return!(r>>4)&&(t+=4,r<<=4),!(r>>6)&&(t+=2,r<<=2),!(r>>7)&&(t+=1),t}function wc(r){const t=64-function(n){let s=0;for(let i=0;i<8;++i){const a=T_(255&n[i]);if(s+=a,a!==8)break}return s}(r);return Math.ceil(t/8)}class I_{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Ft(n.value),n=e.next();this.Mt()}xt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Ot(n.value),n=e.next();this.Nt()}Lt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{const s=e.codePointAt(0);this.Ft(240|s>>>18),this.Ft(128|63&s>>>12),this.Ft(128|63&s>>>6),this.Ft(128|63&s)}}this.Mt()}Bt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{const s=e.codePointAt(0);this.Ot(240|s>>>18),this.Ot(128|63&s>>>12),this.Ot(128|63&s>>>6),this.Ot(128|63&s)}}this.Nt()}kt(t){const e=this.qt(t),n=wc(e);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=255&e[s]}Kt(t){const e=this.qt(t),n=wc(e);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(t){this.Qt(t.length),this.buffer.set(t,this.position),this.position+=t.length}zt(){return this.buffer.slice(0,this.position)}qt(t){const e=function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)}(t),n=(128&e[0])!=0;e[0]^=n?255:128;for(let s=1;s<e.length;++s)e[s]^=n?255:0;return e}Ft(t){const e=255&t;e===0?(this.Ut(0),this.Ut(255)):e===255?(this.Ut(255),this.Ut(0)):this.Ut(e)}Ot(t){const e=255&t;e===0?(this.Gt(0),this.Gt(255)):e===255?(this.Gt(255),this.Gt(0)):this.Gt(t)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(t){this.Qt(1),this.buffer[this.position++]=t}Gt(t){this.Qt(1),this.buffer[this.position++]=~t}Qt(t){const e=t+this.position;if(e<=this.buffer.length)return;let n=2*this.buffer.length;n<e&&(n=e);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class E_{constructor(t){this.jt=t}gt(t){this.jt.Ct(t)}Rt(t){this.jt.Lt(t)}At(t){this.jt.kt(t)}Et(){this.jt.$t()}}class w_{constructor(t){this.jt=t}gt(t){this.jt.xt(t)}Rt(t){this.jt.Bt(t)}At(t){this.jt.Kt(t)}Et(){this.jt.Wt()}}class vr{constructor(){this.jt=new I_,this.Ht=new E_(this.jt),this.Jt=new w_(this.jt)}seed(t){this.jt.seed(t)}Yt(t){return t===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(t,e,n,s){this.indexId=t,this.documentKey=e,this.arrayValue=n,this.directionalValue=s}Zt(){const t=this.directionalValue.length,e=t===0||this.directionalValue[t-1]===255?t+1:t,n=new Uint8Array(e);return n.set(this.directionalValue,0),e!==t?n.set([0],this.directionalValue.length):++n[n.length-1],new Je(this.indexId,this.documentKey,this.arrayValue,n)}}function ye(r,t){let e=r.indexId-t.indexId;return e!==0?e:(e=vc(r.arrayValue,t.arrayValue),e!==0?e:(e=vc(r.directionalValue,t.directionalValue),e!==0?e:M.comparator(r.documentKey,t.documentKey)))}function vc(r,t){for(let e=0;e<r.length&&e<t.length;++e){const n=r[e]-t[e];if(n!==0)return n}return r.length-t.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(t){this.Xt=new tt((e,n)=>ot.comparator(e.field,n.field)),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.en=t.orderBy,this.tn=[];for(const e of t.filters){const n=e;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(t){if(q(t.collectionGroup===this.collectionId),this.nn)return!1;const e=mo(t);if(e!==void 0&&!this.sn(e))return!1;const n=$e(t);let s=new Set,i=0,a=0;for(;i<n.length&&this.sn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Xt.size>0){const u=this.Xt.getIterator().getNext();if(!s.has(u.field.canonicalString())){const c=n[i];if(!this.on(u,c)||!this._n(this.en[a++],c))return!1}++i}for(;i<n.length;++i){const u=n[i];if(a>=this.en.length||!this._n(this.en[a++],u))return!1}return!0}an(){if(this.nn)return null;let t=new tt(ot.comparator);const e=[];for(const n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")e.push(new Ze(n.field,2));else{if(t.has(n.field))continue;t=t.add(n.field),e.push(new Ze(n.field,0))}for(const n of this.en)n.field.isKeyField()||t.has(n.field)||(t=t.add(n.field),e.push(new Ze(n.field,n.dir==="asc"?0:1)));return new Dn(Dn.UNKNOWN_ID,this.collectionId,e,kn.empty())}sn(t){for(const e of this.tn)if(this.on(e,t))return!0;return!1}on(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const n=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===n}_n(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dh(r){var t,e;if(q(r instanceof X||r instanceof Z),r instanceof X){if(r instanceof Wl){const s=((e=(t=r.value.arrayValue)===null||t===void 0?void 0:t.values)===null||e===void 0?void 0:e.map(i=>X.create(r.field,"==",i)))||[];return Z.create(s,"or")}return r}const n=r.filters.map(s=>Dh(s));return Z.create(n,r.op)}function v_(r){if(r.getFilters().length===0)return[];const t=So(Dh(r));return q(kh(t)),Po(t)||bo(t)?[t]:t.getFilters()}function Po(r){return r instanceof X}function bo(r){return r instanceof Z&&qo(r)}function kh(r){return Po(r)||bo(r)||function(e){if(e instanceof Z&&yo(e)){for(const n of e.getFilters())if(!Po(n)&&!bo(n))return!1;return!0}return!1}(r)}function So(r){if(q(r instanceof X||r instanceof Z),r instanceof X)return r;if(r.filters.length===1)return So(r.filters[0]);const t=r.filters.map(n=>So(n));let e=Z.create(t,r.op);return e=ti(e),kh(e)?e:(q(e instanceof Z),q(On(e)),q(e.filters.length>1),e.filters.reduce((n,s)=>Yo(n,s)))}function Yo(r,t){let e;return q(r instanceof X||r instanceof Z),q(t instanceof X||t instanceof Z),e=r instanceof X?t instanceof X?function(s,i){return Z.create([s,i],"and")}(r,t):Rc(r,t):t instanceof X?Rc(t,r):function(s,i){if(q(s.filters.length>0&&i.filters.length>0),On(s)&&On(i))return Kl(s,i.getFilters());const a=yo(s)?s:i,u=yo(s)?i:s,c=a.filters.map(h=>Yo(h,u));return Z.create(c,"or")}(r,t),ti(e)}function Rc(r,t){if(On(t))return Kl(t,r.getFilters());{const e=t.filters.map(n=>Yo(r,n));return Z.create(e,"or")}}function ti(r){if(q(r instanceof X||r instanceof Z),r instanceof X)return r;const t=r.getFilters();if(t.length===1)return ti(t[0]);if(Gl(r))return r;const e=t.map(s=>ti(s)),n=[];return e.forEach(s=>{s instanceof X?n.push(s):s instanceof Z&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:Z.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(){this.un=new Zo}addToCollectionParentIndex(t,e){return this.un.add(e),A.resolve()}getCollectionParents(t,e){return A.resolve(this.un.getEntries(e))}addFieldIndex(t,e){return A.resolve()}deleteFieldIndex(t,e){return A.resolve()}deleteAllFieldIndexes(t){return A.resolve()}createTargetIndexes(t,e){return A.resolve()}getDocumentsMatchingTarget(t,e){return A.resolve(null)}getIndexType(t,e){return A.resolve(0)}getFieldIndexes(t,e){return A.resolve([])}getNextCollectionGroupToUpdate(t){return A.resolve(null)}getMinOffset(t,e){return A.resolve(Qt.min())}getMinOffsetFromCollectionGroup(t,e){return A.resolve(Qt.min())}updateCollectionGroup(t,e,n){return A.resolve()}updateIndexEntries(t,e){return A.resolve()}}class Zo{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new tt(H.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new tt(H.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ds=new Uint8Array(0);class R_{constructor(t,e){this.databaseId=e,this.cn=new Zo,this.ln=new he(n=>nn(n),(n,s)=>Xr(n,s)),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.cn.has(e)){const n=e.lastSegment(),s=e.popLast();t.addOnCommittedListener(()=>{this.cn.add(e)});const i={collectionId:n,parent:Nt(s)};return Pc(t).put(i)}return A.resolve()}getCollectionParents(t,e){const n=[],s=IDBKeyRange.bound([e,""],[Rl(e),""],!1,!0);return Pc(t).U(s).next(i=>{for(const a of i){if(a.collectionId!==e)break;n.push(Ht(a.parent))}return n})}addFieldIndex(t,e){const n=Ar(t),s=function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map(c=>[c.fieldPath.canonicalString(),c.kind])}}(e);delete s.indexId;const i=n.add(s);if(e.indexState){const a=wn(t);return i.next(u=>{a.put(Tc(u,this.uid,e.indexState.sequenceNumber,e.indexState.offset))})}return i.next()}deleteFieldIndex(t,e){const n=Ar(t),s=wn(t),i=En(t);return n.delete(e.indexId).next(()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))}deleteAllFieldIndexes(t){const e=Ar(t),n=En(t),s=wn(t);return e.j().next(()=>n.j()).next(()=>s.j())}createTargetIndexes(t,e){return A.forEach(this.hn(e),n=>this.getIndexType(t,n).next(s=>{if(s===0||s===1){const i=new Ac(n).an();if(i!=null)return this.addFieldIndex(t,i)}}))}getDocumentsMatchingTarget(t,e){const n=En(t);let s=!0;const i=new Map;return A.forEach(this.hn(e),a=>this.Pn(t,a).next(u=>{s&&(s=!!u),i.set(a,u)})).next(()=>{if(s){let a=Q();const u=[];return A.forEach(i,(c,h)=>{k("IndexedDbIndexManager",`Using index ${function(F){return`id=${F.indexId}|cg=${F.collectionGroup}|f=${F.fields.map(G=>`${G.fieldPath}:${G.kind}`).join(",")}`}(c)} to execute ${nn(e)}`);const f=function(F,G){const W=mo(G);if(W===void 0)return null;for(const j of Xs(F,W.fieldPath))switch(j.op){case"array-contains-any":return j.value.arrayValue.values||[];case"array-contains":return[j.value]}return null}(h,c),m=function(F,G){const W=new Map;for(const j of $e(G))for(const I of Xs(F,j.fieldPath))switch(I.op){case"==":case"in":W.set(j.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return W.set(j.fieldPath.canonicalString(),I.value),Array.from(W.values())}return null}(h,c),p=function(F,G){const W=[];let j=!0;for(const I of $e(G)){const g=I.kind===0?sc(F,I.fieldPath,F.startAt):ic(F,I.fieldPath,F.startAt);W.push(g.value),j&&(j=g.inclusive)}return new Ce(W,j)}(h,c),v=function(F,G){const W=[];let j=!0;for(const I of $e(G)){const g=I.kind===0?ic(F,I.fieldPath,F.endAt):sc(F,I.fieldPath,F.endAt);W.push(g.value),j&&(j=g.inclusive)}return new Ce(W,j)}(h,c),C=this.In(c,h,p),x=this.In(c,h,v),V=this.Tn(c,h,m),U=this.En(c.indexId,f,C,p.inclusive,x,v.inclusive,V);return A.forEach(U,B=>n.G(B,e.limit).next(F=>{F.forEach(G=>{const W=M.fromSegments(G.documentKey);a.has(W)||(a=a.add(W),u.push(W))})}))}).next(()=>u)}return A.resolve(null)})}hn(t){let e=this.ln.get(t);return e||(t.filters.length===0?e=[t]:e=v_(Z.create(t.filters,"and")).map(n=>Io(t.path,t.collectionGroup,t.orderBy,n.getFilters(),t.limit,t.startAt,t.endAt)),this.ln.set(t,e),e)}En(t,e,n,s,i,a,u){const c=(e!=null?e.length:1)*Math.max(n.length,i.length),h=c/(e!=null?e.length:1),f=[];for(let m=0;m<c;++m){const p=e?this.dn(e[m/h]):Ds,v=this.An(t,p,n[m%h],s),C=this.Rn(t,p,i[m%h],a),x=u.map(V=>this.An(t,p,V,!0));f.push(...this.createRange(v,C,x))}return f}An(t,e,n,s){const i=new Je(t,M.empty(),e,n);return s?i:i.Zt()}Rn(t,e,n,s){const i=new Je(t,M.empty(),e,n);return s?i.Zt():i}Pn(t,e){const n=new Ac(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next(i=>{let a=null;for(const u of i)n.rn(u)&&(!a||u.fields.length>a.fields.length)&&(a=u);return a})}getIndexType(t,e){let n=2;const s=this.hn(e);return A.forEach(s,i=>this.Pn(t,i).next(a=>{a?n!==0&&a.fields.length<function(c){let h=new tt(ot.comparator),f=!1;for(const m of c.filters)for(const p of m.getFlattenedFilters())p.field.isKeyField()||(p.op==="array-contains"||p.op==="array-contains-any"?f=!0:h=h.add(p.field));for(const m of c.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)}(i)&&(n=1):n=0})).next(()=>function(a){return a.limit!==null}(e)&&s.length>1&&n===2?1:n)}Vn(t,e){const n=new vr;for(const s of $e(t)){const i=e.data.field(s.fieldPath);if(i==null)return null;const a=n.Yt(s.kind);Xe.vt.It(i,a)}return n.zt()}dn(t){const e=new vr;return Xe.vt.It(t,e.Yt(0)),e.zt()}mn(t,e){const n=new vr;return Xe.vt.It(en(this.databaseId,e),n.Yt(function(i){const a=$e(i);return a.length===0?0:a[a.length-1].kind}(t))),n.zt()}Tn(t,e,n){if(n===null)return[];let s=[];s.push(new vr);let i=0;for(const a of $e(t)){const u=n[i++];for(const c of s)if(this.fn(e,a.fieldPath)&&Gr(u))s=this.gn(s,a,u);else{const h=c.Yt(a.kind);Xe.vt.It(u,h)}}return this.pn(s)}In(t,e,n){return this.Tn(t,e,n.position)}pn(t){const e=[];for(let n=0;n<t.length;++n)e[n]=t[n].zt();return e}gn(t,e,n){const s=[...t],i=[];for(const a of n.arrayValue.values||[])for(const u of s){const c=new vr;c.seed(u.zt()),Xe.vt.It(a,c.Yt(e.kind)),i.push(c)}return i}fn(t,e){return!!t.filters.find(n=>n instanceof X&&n.field.isEqual(e)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(t,e){const n=Ar(t),s=wn(t);return(e?n.U("collectionGroupIndex",IDBKeyRange.bound(e,e)):n.U()).next(i=>{const a=[];return A.forEach(i,u=>s.get([u.indexId,this.uid]).next(c=>{a.push(function(f,m){const p=m?new kn(m.sequenceNumber,new Qt(an(m.readTime),new M(Ht(m.documentKey)),m.largestBatchId)):kn.empty(),v=f.fields.map(([C,x])=>new Ze(ot.fromServerFormat(C),x));return new Dn(f.indexId,f.collectionGroup,v,p)}(u,c))})).next(()=>a)})}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next(e=>e.length===0?null:(e.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:K(n.collectionGroup,s.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(t,e,n){const s=Ar(t),i=wn(t);return this.yn(t).next(a=>s.U("collectionGroupIndex",IDBKeyRange.bound(e,e)).next(u=>A.forEach(u,c=>i.put(Tc(c.indexId,this.uid,a,n)))))}updateIndexEntries(t,e){const n=new Map;return A.forEach(e,(s,i)=>{const a=n.get(s.collectionGroup);return(a?A.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next(u=>(n.set(s.collectionGroup,u),A.forEach(u,c=>this.wn(t,s,c).next(h=>{const f=this.Sn(i,c);return h.isEqual(f)?A.resolve():this.bn(t,i,c,h,f)}))))})}Dn(t,e,n,s){return En(t).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.mn(n,e.key),documentKey:e.key.path.toArray()})}vn(t,e,n,s){return En(t).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.mn(n,e.key),e.key.path.toArray()])}wn(t,e,n){const s=En(t);let i=new tt(ye);return s.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,e)])},(a,u)=>{i=i.add(new Je(n.indexId,e,u.arrayValue,u.directionalValue))}).next(()=>i)}Sn(t,e){let n=new tt(ye);const s=this.Vn(e,t);if(s==null)return n;const i=mo(e);if(i!=null){const a=t.data.field(i.fieldPath);if(Gr(a))for(const u of a.arrayValue.values||[])n=n.add(new Je(e.indexId,t.key,this.dn(u),s))}else n=n.add(new Je(e.indexId,t.key,Ds,s));return n}bn(t,e,n,s,i){k("IndexedDbIndexManager","Updating index entries for document '%s'",e.key);const a=[];return function(c,h,f,m,p){const v=c.getIterator(),C=h.getIterator();let x=In(v),V=In(C);for(;x||V;){let U=!1,B=!1;if(x&&V){const F=f(x,V);F<0?B=!0:F>0&&(U=!0)}else x!=null?B=!0:U=!0;U?(m(V),V=In(C)):B?(p(x),x=In(v)):(x=In(v),V=In(C))}}(s,i,ye,u=>{a.push(this.Dn(t,e,n,u))},u=>{a.push(this.vn(t,e,n,u))}),A.waitFor(a)}yn(t){let e=1;return wn(t).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),e=s.sequenceNumber+1}).next(()=>e)}createRange(t,e,n){n=n.sort((a,u)=>ye(a,u)).filter((a,u,c)=>!u||ye(a,c[u-1])!==0);const s=[];s.push(t);for(const a of n){const u=ye(a,t),c=ye(a,e);if(u===0)s[0]=t.Zt();else if(u>0&&c<0)s.push(a),s.push(a.Zt());else if(c>0)break}s.push(e);const i=[];for(let a=0;a<s.length;a+=2){if(this.Cn(s[a],s[a+1]))return[];const u=[s[a].indexId,this.uid,s[a].arrayValue,s[a].directionalValue,Ds,[]],c=[s[a+1].indexId,this.uid,s[a+1].arrayValue,s[a+1].directionalValue,Ds,[]];i.push(IDBKeyRange.bound(u,c))}return i}Cn(t,e){return ye(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(bc)}getMinOffset(t,e){return A.mapArray(this.hn(e),n=>this.Pn(t,n).next(s=>s||L())).next(bc)}}function Pc(r){return It(r,"collectionParents")}function En(r){return It(r,"indexEntries")}function Ar(r){return It(r,"indexConfiguration")}function wn(r){return It(r,"indexState")}function bc(r){q(r.length!==0);let t=r[0].indexState.offset,e=t.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Lo(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new Qt(t.readTime,t.documentKey,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class kt{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new kt(t,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nh(r,t,e){const n=r.store("mutations"),s=r.store("documentMutations"),i=[],a=IDBKeyRange.only(e.batchId);let u=0;const c=n.J({range:a},(f,m,p)=>(u++,p.delete()));i.push(c.next(()=>{q(u===1)}));const h=[];for(const f of e.mutations){const m=Dl(t,f.key.path,e.batchId);i.push(s.delete(m)),h.push(f.key)}return A.waitFor(i).next(()=>h)}function ei(r){if(!r)return 0;let t;if(r.document)t=r.document;else if(r.unknownDocument)t=r.unknownDocument;else{if(!r.noDocument)throw L();t=r.noDocument}return JSON.stringify(t).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt.DEFAULT_COLLECTION_PERCENTILE=10,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,kt.DEFAULT=new kt(41943040,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),kt.DISABLED=new kt(-1,0,0);class yi{constructor(t,e,n,s){this.userId=t,this.serializer=e,this.indexManager=n,this.referenceDelegate=s,this.Fn={}}static lt(t,e,n,s){q(t.uid!=="");const i=t.isAuthenticated()?t.uid:"";return new yi(i,e,n,s)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Te(t).J({index:"userMutationsIndex",range:n},(s,i,a)=>{e=!1,a.done()}).next(()=>e)}addMutationBatch(t,e,n,s){const i=Sn(t),a=Te(t);return a.add({}).next(u=>{q(typeof u=="number");const c=new Qo(u,e,n,s),h=function(v,C,x){const V=x.baseMutations.map(B=>Qr(v.ct,B)),U=x.mutations.map(B=>Qr(v.ct,B));return{userId:C,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:V,mutations:U}}(this.serializer,this.userId,c),f=[];let m=new tt((p,v)=>K(p.canonicalString(),v.canonicalString()));for(const p of s){const v=Dl(this.userId,p.key.path,u);m=m.add(p.key.path.popLast()),f.push(a.put(h)),f.push(i.put(v,dm))}return m.forEach(p=>{f.push(this.indexManager.addToCollectionParentIndex(t,p))}),t.addOnCommittedListener(()=>{this.Fn[u]=c.keys()}),A.waitFor(f).next(()=>c)})}lookupMutationBatch(t,e){return Te(t).get(e).next(n=>n?(q(n.userId===this.userId),He(this.serializer,n)):null)}Mn(t,e){return this.Fn[e]?A.resolve(this.Fn[e]):this.lookupMutationBatch(t,e).next(n=>{if(n){const s=n.keys();return this.Fn[e]=s,s}return null})}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Te(t).J({index:"userMutationsIndex",range:s},(a,u,c)=>{u.userId===this.userId&&(q(u.batchId>=n),i=He(this.serializer,u)),c.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return Te(t).J({index:"userMutationsIndex",range:e,reverse:!0},(s,i,a)=>{n=i.batchId,a.done()}).next(()=>n)}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Te(t).U("userMutationsIndex",e).next(n=>n.map(s=>He(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=Bs(this.userId,e.path),s=IDBKeyRange.lowerBound(n),i=[];return Sn(t).J({range:s},(a,u,c)=>{const[h,f,m]=a,p=Ht(f);if(h===this.userId&&e.path.isEqual(p))return Te(t).get(m).next(v=>{if(!v)throw L();q(v.userId===this.userId),i.push(He(this.serializer,v))});c.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new tt(K);const s=[];return e.forEach(i=>{const a=Bs(this.userId,i.path),u=IDBKeyRange.lowerBound(a),c=Sn(t).J({range:u},(h,f,m)=>{const[p,v,C]=h,x=Ht(v);p===this.userId&&i.path.isEqual(x)?n=n.add(C):m.done()});s.push(c)}),A.waitFor(s).next(()=>this.xn(t,n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1,i=Bs(this.userId,n),a=IDBKeyRange.lowerBound(i);let u=new tt(K);return Sn(t).J({range:a},(c,h,f)=>{const[m,p,v]=c,C=Ht(p);m===this.userId&&n.isPrefixOf(C)?C.length===s&&(u=u.add(v)):f.done()}).next(()=>this.xn(t,u))}xn(t,e){const n=[],s=[];return e.forEach(i=>{s.push(Te(t).get(i).next(a=>{if(a===null)throw L();q(a.userId===this.userId),n.push(He(this.serializer,a))}))}),A.waitFor(s).next(()=>n)}removeMutationBatch(t,e){return Nh(t._e,this.userId,e).next(n=>(t.addOnCommittedListener(()=>{this.On(e.batchId)}),A.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))}On(t){delete this.Fn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next(e=>{if(!e)return A.resolve();const n=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),s=[];return Sn(t).J({range:n},(i,a,u)=>{if(i[0]===this.userId){const c=Ht(i[1]);s.push(c)}else u.done()}).next(()=>{q(s.length===0)})})}containsKey(t,e){return Oh(t,this.userId,e)}Nn(t){return Mh(t).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function Oh(r,t,e){const n=Bs(t,e.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return Sn(r).J({range:i,H:!0},(u,c,h)=>{const[f,m,p]=u;f===t&&m===s&&(a=!0),h.done()}).next(()=>a)}function Te(r){return It(r,"mutations")}function Sn(r){return It(r,"documentMutations")}function Mh(r){return It(r,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new un(0)}static kn(){return new un(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.qn(t).next(e=>{const n=new un(e.highestTargetId);return e.highestTargetId=n.next(),this.Qn(t,e).next(()=>e.highestTargetId)})}getLastRemoteSnapshotVersion(t){return this.qn(t).next(e=>z.fromTimestamp(new lt(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(t){return this.qn(t).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(t,e,n){return this.qn(t).next(s=>(s.highestListenSequenceNumber=e,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this.Qn(t,s)))}addTargetData(t,e){return this.Kn(t,e).next(()=>this.qn(t).next(n=>(n.targetCount+=1,this.$n(e,n),this.Qn(t,n))))}updateTargetData(t,e){return this.Kn(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next(()=>vn(t).delete(e.targetId)).next(()=>this.qn(t)).next(n=>(q(n.targetCount>0),n.targetCount-=1,this.Qn(t,n)))}removeTargets(t,e,n){let s=0;const i=[];return vn(t).J((a,u)=>{const c=xr(u);c.sequenceNumber<=e&&n.get(c.targetId)===null&&(s++,i.push(this.removeTargetData(t,c)))}).next(()=>A.waitFor(i)).next(()=>s)}forEachTarget(t,e){return vn(t).J((n,s)=>{const i=xr(s);e(i)})}qn(t){return Vc(t).get("targetGlobalKey").next(e=>(q(e!==null),e))}Qn(t,e){return Vc(t).put("targetGlobalKey",e)}Kn(t,e){return vn(t).put(xh(this.serializer,e))}$n(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.qn(t).next(e=>e.targetCount)}getTargetData(t,e){const n=nn(e),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return vn(t).J({range:s,index:"queryTargetsIndex"},(a,u,c)=>{const h=xr(u);Xr(e,h.target)&&(i=h,c.done())}).next(()=>i)}addMatchingKeys(t,e,n){const s=[],i=Ee(t);return e.forEach(a=>{const u=Nt(a.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(t,n,a))}),A.waitFor(s)}removeMatchingKeys(t,e,n){const s=Ee(t);return A.forEach(e,i=>{const a=Nt(i.path);return A.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(t,n,i)])})}removeMatchingKeysForTargetId(t,e){const n=Ee(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),s=Ee(t);let i=Q();return s.J({range:n,H:!0},(a,u,c)=>{const h=Ht(a[1]),f=new M(h);i=i.add(f)}).next(()=>i)}containsKey(t,e){const n=Nt(e.path),s=IDBKeyRange.bound([n],[Rl(n)],!1,!0);let i=0;return Ee(t).J({index:"documentTargetsIndex",H:!0,range:s},([a,u],c,h)=>{a!==0&&(i++,h.done())}).next(()=>i>0)}ot(t,e){return vn(t).get(e).next(n=>n?xr(n):null)}}function vn(r){return It(r,"targets")}function Vc(r){return It(r,"targetGlobal")}function Ee(r){return It(r,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cc([r,t],[e,n]){const s=K(r,e);return s===0?K(t,n):s}class b_{constructor(t){this.Un=t,this.buffer=new tt(Cc),this.Wn=0}Gn(){return++this.Wn}zn(t){const e=[t,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Cc(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Fh{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(t){k("LruGarbageCollector",`Garbage collection scheduled in ${t}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Me(e)?k("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await Oe(e)}await this.Hn(3e5)})}}class S_{constructor(t,e){this.Jn=t,this.params=e}calculateTargetCount(t,e){return this.Jn.Yn(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return A.resolve(Bt.oe);const n=new b_(e);return this.Jn.forEachTarget(t,s=>n.zn(s.sequenceNumber)).next(()=>this.Jn.Zn(t,s=>n.zn(s))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Jn.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Jn.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(k("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(Sc)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(k("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Sc):this.Xn(t,e))}getCacheSize(t){return this.Jn.getCacheSize(t)}Xn(t,e){let n,s,i,a,u,c,h;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(k("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(t,s))).next(m=>(n=m,u=Date.now(),this.removeTargets(t,n,e))).next(m=>(i=m,c=Date.now(),this.removeOrphanedDocuments(t,n))).next(m=>(h=Date.now(),Rn()<=se.DEBUG&&k("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${m} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function Lh(r,t){return new S_(r,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V_{constructor(t,e){this.db=t,this.garbageCollector=Lh(this,e)}Yn(t){const e=this.er(t);return this.db.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}er(t){let e=0;return this.Zn(t,n=>{e++}).next(()=>e)}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}Zn(t,e){return this.tr(t,(n,s)=>e(s))}addReference(t,e,n){return ks(t,n)}removeReference(t,e,n){return ks(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return ks(t,e)}nr(t,e){return function(s,i){let a=!1;return Mh(s).Y(u=>Oh(s,u,i).next(c=>(c&&(a=!0),A.resolve(!c)))).next(()=>a)}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.tr(t,(a,u)=>{if(u<=e){const c=this.nr(t,a).next(h=>{if(!h)return i++,n.getEntry(t,a).next(()=>(n.removeEntry(a,z.min()),Ee(t).delete(function(m){return[0,Nt(m.path)]}(a))))});s.push(c)}}).next(()=>A.waitFor(s)).next(()=>n.apply(t)).next(()=>i)}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return ks(t,e)}tr(t,e){const n=Ee(t);let s,i=Bt.oe;return n.J({index:"documentTargetsIndex"},([a,u],{path:c,sequenceNumber:h})=>{a===0?(i!==Bt.oe&&e(new M(Ht(s)),i),i=h,s=c):i=Bt.oe}).next(()=>{i!==Bt.oe&&e(new M(Ht(s)),i)})}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function ks(r,t){return Ee(r).put(function(n,s){return{targetId:0,path:Nt(n.path),sequenceNumber:s}}(t,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uh{constructor(){this.changes=new he(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,it.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?A.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,n){return Qe(t).put(n)}removeEntry(t,e,n){return Qe(t).delete(function(i,a){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],Zs(a),u[u.length-1]]}(e,n))}updateMetadata(t,e){return this.getMetadata(t).next(n=>(n.byteSize+=e,this.rr(t,n)))}getEntry(t,e){let n=it.newInvalidDocument(e);return Qe(t).J({index:"documentKeyIndex",range:IDBKeyRange.only(Rr(e))},(s,i)=>{n=this.ir(e,i)}).next(()=>n)}sr(t,e){let n={size:0,document:it.newInvalidDocument(e)};return Qe(t).J({index:"documentKeyIndex",range:IDBKeyRange.only(Rr(e))},(s,i)=>{n={document:this.ir(e,i),size:ei(i)}}).next(()=>n)}getEntries(t,e){let n=zt();return this._r(t,e,(s,i)=>{const a=this.ir(s,i);n=n.insert(s,a)}).next(()=>n)}ar(t,e){let n=zt(),s=new rt(M.comparator);return this._r(t,e,(i,a)=>{const u=this.ir(i,a);n=n.insert(i,u),s=s.insert(i,ei(a))}).next(()=>({documents:n,ur:s}))}_r(t,e,n){if(e.isEmpty())return A.resolve();let s=new tt(kc);e.forEach(c=>s=s.add(c));const i=IDBKeyRange.bound(Rr(s.first()),Rr(s.last())),a=s.getIterator();let u=a.getNext();return Qe(t).J({index:"documentKeyIndex",range:i},(c,h,f)=>{const m=M.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;u&&kc(u,m)<0;)n(u,null),u=a.getNext();u&&u.isEqual(m)&&(n(u,h),u=a.hasNext()?a.getNext():null),u?f.$(Rr(u)):f.done()}).next(()=>{for(;u;)n(u,null),u=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(t,e,n,s,i){const a=e.path,u=[a.popLast().toArray(),a.lastSegment(),Zs(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Qe(t).U(IDBKeyRange.bound(u,c,!0)).next(h=>{i?.incrementDocumentReadCount(h.length);let f=zt();for(const m of h){const p=this.ir(M.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);p.isFoundDocument()&&(Yr(e,p)||s.has(p.key))&&(f=f.insert(p.key,p))}return f})}getAllFromCollectionGroup(t,e,n,s){let i=zt();const a=Dc(e,n),u=Dc(e,Qt.max());return Qe(t).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(a,u,!0)},(c,h,f)=>{const m=this.ir(M.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(t){return new x_(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next(e=>e.byteSize)}getMetadata(t){return xc(t).get("remoteDocumentGlobalKey").next(e=>(q(!!e),e))}rr(t,e){return xc(t).put("remoteDocumentGlobalKey",e)}ir(t,e){if(e){const n=p_(this.serializer,e);if(!(n.isNoDocument()&&n.version.isEqual(z.min())))return n}return it.newInvalidDocument(t)}}function Bh(r){return new C_(r)}class x_ extends Uh{constructor(t,e){super(),this.cr=t,this.trackRemovals=e,this.lr=new he(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(t){const e=[];let n=0,s=new tt((i,a)=>K(i.canonicalString(),a.canonicalString()));return this.changes.forEach((i,a)=>{const u=this.lr.get(i);if(e.push(this.cr.removeEntry(t,i,u.readTime)),a.isValidDocument()){const c=gc(this.cr.serializer,a);s=s.add(i.path.popLast());const h=ei(c);n+=h-u.size,e.push(this.cr.addEntry(t,i,c))}else if(n-=u.size,this.trackRemovals){const c=gc(this.cr.serializer,a.convertToNoDocument(z.min()));e.push(this.cr.addEntry(t,i,c))}}),s.forEach(i=>{e.push(this.cr.indexManager.addToCollectionParentIndex(t,i))}),e.push(this.cr.updateMetadata(t,n)),A.waitFor(e)}getFromCache(t,e){return this.cr.sr(t,e).next(n=>(this.lr.set(e,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(t,e){return this.cr.ar(t,e).next(({documents:n,ur:s})=>(s.forEach((i,a)=>{this.lr.set(i,{size:a,readTime:n.get(i).readTime})}),n))}}function xc(r){return It(r,"remoteDocumentGlobal")}function Qe(r){return It(r,"remoteDocumentsV14")}function Rr(r){const t=r.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Dc(r,t){const e=t.documentKey.path.toArray();return[r,Zs(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function kc(r,t){const e=r.path.toArray(),n=t.path.toArray();let s=0;for(let i=0;i<e.length-2&&i<n.length-2;++i)if(s=K(e[i],n[i]),s)return s;return s=K(e.length,n.length),s||(s=K(e[e.length-2],n[n.length-2]),s||K(e[e.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D_{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(n!==null&&Or(n.mutation,s,qt.empty(),lt.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,Q()).next(()=>n))}getLocalViewOfDocuments(t,e,n=Q()){const s=Xt();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(i=>{let a=Vr();return i.forEach((u,c)=>{a=a.insert(u,c.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const n=Xt();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,Q()))}populateOverlays(t,e,n){const s=[];return n.forEach(i=>{e.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(t,s).next(i=>{i.forEach((a,u)=>{e.set(a,u)})})}computeViews(t,e,n,s){let i=zt();const a=Nr(),u=function(){return Nr()}();return e.forEach((c,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof de)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Or(f.mutation,h,f.mutation.getFieldMask(),lt.now())):a.set(h.key,qt.empty())}),this.recalculateAndSaveOverlays(t,i).next(c=>(c.forEach((h,f)=>a.set(h,f)),e.forEach((h,f)=>{var m;return u.set(h,new D_(f,(m=a.get(h))!==null&&m!==void 0?m:null))}),u))}recalculateAndSaveOverlays(t,e){const n=Nr();let s=new rt((a,u)=>a-u),i=Q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const u of a)u.keys().forEach(c=>{const h=e.get(c);if(h===null)return;let f=n.get(c)||qt.empty();f=u.applyToLocalView(h,f),n.set(c,f);const m=(s.get(u.batchId)||Q()).add(c);s=s.insert(u.batchId,m)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,f=c.value,m=rh();f.forEach(p=>{if(!i.has(p)){const v=lh(e.get(p),n.get(p));v!==null&&m.set(p,v),i=i.add(p)}}),a.push(this.documentOverlayCache.saveOverlays(t,h,m))}return A.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,s){return function(a){return M.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):zo(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-i.size):A.resolve(Xt());let u=-1,c=i;return a.next(h=>A.forEach(h,(f,m)=>(u<m.largestBatchId&&(u=m.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(t,f).next(p=>{c=c.insert(f,p)}))).next(()=>this.populateOverlays(t,h,i)).next(()=>this.computeViews(t,c,h,Q())).next(f=>({batchId:u,changes:nh(f)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(n=>{let s=Vr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const i=e.collectionGroup;let a=Vr();return this.indexManager.getCollectionParents(t,i).next(u=>A.forEach(u,c=>{const h=function(m,p){return new le(p,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(e,c.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,n,s).next(f=>{f.forEach((m,p)=>{a=a.insert(m,p)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,s))).next(a=>{i.forEach((c,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,it.newInvalidDocument(f)))});let u=Vr();return a.forEach((c,h)=>{const f=i.get(c);f!==void 0&&Or(f.mutation,h,qt.empty(),lt.now()),Yr(e,h)&&(u=u.insert(c,h))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,e){return A.resolve(this.hr.get(e))}saveBundleMetadata(t,e){return this.hr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:yt(s.createTime)}}(e)),A.resolve()}getNamedQuery(t,e){return A.resolve(this.Pr.get(e))}saveNamedQuery(t,e){return this.Pr.set(e.name,function(s){return{name:s.name,query:Jo(s.bundledQuery),readTime:yt(s.readTime)}}(e)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(){this.overlays=new rt(M.comparator),this.Ir=new Map}getOverlay(t,e){return A.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Xt();return A.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((s,i)=>{this.ht(t,e,i)}),A.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Ir.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(n)),A.resolve()}getOverlaysForCollection(t,e,n){const s=Xt(),i=e.length+1,a=new M(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>n&&s.set(c.getKey(),c)}return A.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let i=new rt((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=Xt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const u=Xt(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>u.set(h,f)),!(u.size()>=s)););return A.resolve(u)}ht(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(n.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Wo(e,n));let i=this.Ir.get(e);i===void 0&&(i=Q(),this.Ir.set(e,i)),this.Ir.set(e,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(){this.sessionToken=ft.EMPTY_BYTE_STRING}getSessionToken(t){return A.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(){this.Tr=new tt(Et.Er),this.dr=new tt(Et.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,e){const n=new Et(t,e);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.Vr(new Et(t,e))}mr(t,e){t.forEach(n=>this.removeReference(n,e))}gr(t){const e=new M(new H([])),n=new Et(e,t),s=new Et(e,t+1),i=[];return this.dr.forEachInRange([n,s],a=>{this.Vr(a),i.push(a.key)}),i}pr(){this.Tr.forEach(t=>this.Vr(t))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const e=new M(new H([])),n=new Et(e,t),s=new Et(e,t+1);let i=Q();return this.dr.forEachInRange([n,s],a=>{i=i.add(a.key)}),i}containsKey(t){const e=new Et(t,0),n=this.Tr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class Et{constructor(t,e){this.key=t,this.wr=e}static Er(t,e){return M.comparator(t.key,e.key)||K(t.wr,e.wr)}static Ar(t,e){return K(t.wr,e.wr)||M.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Sr=1,this.br=new tt(Et.Er)}checkEmpty(t){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Qo(i,e,n,s);this.mutationQueue.push(a);for(const u of s)this.br=this.br.add(new Et(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return A.resolve(a)}lookupMutationBatch(t,e){return A.resolve(this.Dr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.vr(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new Et(e,0),s=new Et(e,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([n,s],a=>{const u=this.Dr(a.wr);i.push(u)}),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new tt(K);return e.forEach(s=>{const i=new Et(s,0),a=new Et(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,a],u=>{n=n.add(u.wr)})}),A.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;M.isDocumentKey(i)||(i=i.child(""));const a=new Et(new M(i),0);let u=new tt(K);return this.br.forEachWhile(c=>{const h=c.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(u=u.add(c.wr)),!0)},a),A.resolve(this.Cr(u))}Cr(t){const e=[];return t.forEach(n=>{const s=this.Dr(n);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){q(this.Fr(e.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return A.forEach(e.mutations,s=>{const i=new Et(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.br=n})}On(t){}containsKey(t,e){const n=new Et(e,0),s=this.br.firstAfterOrEqual(n);return A.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,A.resolve()}Fr(t,e){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const e=this.vr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(t){this.Mr=t,this.docs=function(){return new rt(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),i=s?s.size:0,a=this.Mr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return A.resolve(n?n.document.mutableCopy():it.newInvalidDocument(e))}getEntries(t,e){let n=zt();return e.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():it.newInvalidDocument(s))}),A.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let i=zt();const a=e.path,u=new M(a.child("")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||Lo(bl(f),n)<=0||(s.has(f.key)||Yr(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(t,e,n,s){L()}Or(t,e){return A.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new L_(this)}getSize(t){return A.resolve(this.size)}}class L_ extends Uh{constructor(t){super(),this.cr=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.cr.addEntry(t,s)):this.cr.removeEntry(n)}),A.waitFor(e)}getFromCache(t,e){return this.cr.getEntry(t,e)}getAllFromCache(t,e){return this.cr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(t){this.persistence=t,this.Nr=new he(e=>nn(e),Xr),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.Lr=0,this.Br=new ta,this.targetCount=0,this.kr=un.Bn()}forEachTarget(t,e){return this.Nr.forEach((n,s)=>e(s)),A.resolve()}getLastRemoteSnapshotVersion(t){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return A.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.Lr&&(this.Lr=e),A.resolve()}Kn(t){this.Nr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.kr=new un(e),this.highestTargetId=e),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,e){return this.Kn(e),this.targetCount+=1,A.resolve()}updateTargetData(t,e){return this.Kn(e),A.resolve()}removeTargetData(t,e){return this.Nr.delete(e.target),this.Br.gr(e.targetId),this.targetCount-=1,A.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.Nr.forEach((a,u)=>{u.sequenceNumber<=e&&n.get(u.targetId)===null&&(this.Nr.delete(a),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)}),A.waitFor(i).next(()=>s)}getTargetCount(t){return A.resolve(this.targetCount)}getTargetData(t,e){const n=this.Nr.get(e)||null;return A.resolve(n)}addMatchingKeys(t,e,n){return this.Br.Rr(e,n),A.resolve()}removeMatchingKeys(t,e,n){this.Br.mr(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach(a=>{i.push(s.markPotentiallyOrphaned(t,a))}),A.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.Br.gr(e),A.resolve()}getMatchingKeysForTargetId(t,e){const n=this.Br.yr(e);return A.resolve(n)}containsKey(t,e){return A.resolve(this.Br.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(t,e){this.qr={},this.overlays={},this.Qr=new Bt(0),this.Kr=!1,this.Kr=!0,this.$r=new O_,this.referenceDelegate=t(this),this.Ur=new U_(this),this.indexManager=new A_,this.remoteDocumentCache=function(s){return new F_(s)}(n=>this.referenceDelegate.Wr(n)),this.serializer=new Ch(e),this.Gr=new k_(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new N_,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.qr[t.toKey()];return n||(n=new M_(e,this.referenceDelegate),this.qr[t.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,e,n){k("MemoryPersistence","Starting transaction:",t);const s=new B_(this.Qr.next());return this.referenceDelegate.zr(),n(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(t,e){return A.or(Object.values(this.qr).map(n=>()=>n.containsKey(t,e)))}}class B_ extends Vl{constructor(t){super(),this.currentSequenceNumber=t}}class Ti{constructor(t){this.persistence=t,this.Jr=new ta,this.Yr=null}static Zr(t){return new Ti(t)}get Xr(){if(this.Yr)return this.Yr;throw L()}addReference(t,e,n){return this.Jr.addReference(n,e),this.Xr.delete(n.toString()),A.resolve()}removeReference(t,e,n){return this.Jr.removeReference(n,e),this.Xr.add(n.toString()),A.resolve()}markPotentiallyOrphaned(t,e){return this.Xr.add(e.toString()),A.resolve()}removeTarget(t,e){this.Jr.gr(e.targetId).forEach(s=>this.Xr.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>n.removeTargetData(t,e))}zr(){this.Yr=new Set}jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.Xr,n=>{const s=M.fromPath(n);return this.ei(t,s).next(i=>{i||e.removeEntry(s,z.min())})}).next(()=>(this.Yr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ei(t,e).next(n=>{n?this.Xr.delete(e.toString()):this.Xr.add(e.toString())})}Wr(t){return 0}ei(t,e){return A.or([()=>A.resolve(this.Jr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Hr(t,e)])}}class ni{constructor(t,e){this.persistence=t,this.ti=new he(n=>Nt(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=Lh(this,e)}static Zr(t,e){return new ni(t,e)}zr(){}jr(t){return A.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}Yn(t){const e=this.er(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}er(t){let e=0;return this.Zn(t,n=>{e++}).next(()=>e)}Zn(t,e){return A.forEach(this.ti,(n,s)=>this.nr(t,n,s).next(i=>i?A.resolve():e(s)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Or(t,a=>this.nr(t,a,e).next(u=>{u||(n++,i.removeEntry(a,z.min()))})).next(()=>i.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.ti.set(e,t.currentSequenceNumber),A.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.ti.set(n,t.currentSequenceNumber),A.resolve()}removeReference(t,e,n){return this.ti.set(n,t.currentSequenceNumber),A.resolve()}updateLimboDocument(t,e){return this.ti.set(e,t.currentSequenceNumber),A.resolve()}Wr(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=zs(t.data.value)),e}nr(t,e,n){return A.or([()=>this.persistence.Hr(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.ti.get(e);return A.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{constructor(t){this.serializer=t}O(t,e,n,s){const i=new li("createOrUpgrade",e);n<1&&s>=1&&(function(c){c.createObjectStore("owner")}(t),function(c){c.createObjectStore("mutationQueues",{keyPath:"userId"}),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",$u,{unique:!0}),c.createObjectStore("documentMutations")}(t),Nc(t),function(c){c.createObjectStore("remoteDocuments")}(t));let a=A.resolve();return n<3&&s>=3&&(n!==0&&(function(c){c.deleteObjectStore("targetDocuments"),c.deleteObjectStore("targets"),c.deleteObjectStore("targetGlobal")}(t),Nc(t)),a=a.next(()=>function(c){const h=c.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:z.min().toTimestamp(),targetCount:0};return h.put("targetGlobalKey",f)}(i))),n<4&&s>=4&&(n!==0&&(a=a.next(()=>function(c,h){return h.store("mutations").U().next(f=>{c.deleteObjectStore("mutations"),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",$u,{unique:!0});const m=h.store("mutations"),p=f.map(v=>m.put(v));return A.waitFor(p)})}(t,i))),a=a.next(()=>{(function(c){c.createObjectStore("clientMetadata",{keyPath:"clientId"})})(t)})),n<5&&s>=5&&(a=a.next(()=>this.ni(i))),n<6&&s>=6&&(a=a.next(()=>(function(c){c.createObjectStore("remoteDocumentGlobal")}(t),this.ri(i)))),n<7&&s>=7&&(a=a.next(()=>this.ii(i))),n<8&&s>=8&&(a=a.next(()=>this.si(t,i))),n<9&&s>=9&&(a=a.next(()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(t)})),n<10&&s>=10&&(a=a.next(()=>this.oi(i))),n<11&&s>=11&&(a=a.next(()=>{(function(c){c.createObjectStore("bundles",{keyPath:"bundleId"})})(t),function(c){c.createObjectStore("namedQueries",{keyPath:"name"})}(t)})),n<12&&s>=12&&(a=a.next(()=>{(function(c){const h=c.createObjectStore("documentOverlays",{keyPath:Am});h.createIndex("collectionPathOverlayIndex",Rm,{unique:!1}),h.createIndex("collectionGroupOverlayIndex",Pm,{unique:!1})})(t)})),n<13&&s>=13&&(a=a.next(()=>function(c){const h=c.createObjectStore("remoteDocumentsV14",{keyPath:fm});h.createIndex("documentKeyIndex",mm),h.createIndex("collectionGroupIndex",_m)}(t)).next(()=>this._i(t,i)).next(()=>t.deleteObjectStore("remoteDocuments"))),n<14&&s>=14&&(a=a.next(()=>this.ai(t,i))),n<15&&s>=15&&(a=a.next(()=>function(c){c.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),c.createObjectStore("indexState",{keyPath:Im}).createIndex("sequenceNumberIndex",Em,{unique:!1}),c.createObjectStore("indexEntries",{keyPath:wm}).createIndex("documentKeyIndex",vm,{unique:!1})}(t))),n<16&&s>=16&&(a=a.next(()=>{e.objectStore("indexState").clear()}).next(()=>{e.objectStore("indexEntries").clear()})),n<17&&s>=17&&(a=a.next(()=>{(function(c){c.createObjectStore("globals",{keyPath:"name"})})(t)})),a}ri(t){let e=0;return t.store("remoteDocuments").J((n,s)=>{e+=ei(s)}).next(()=>{const n={byteSize:e};return t.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}ni(t){const e=t.store("mutationQueues"),n=t.store("mutations");return e.U().next(s=>A.forEach(s,i=>{const a=IDBKeyRange.bound([i.userId,-1],[i.userId,i.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",a).next(u=>A.forEach(u,c=>{q(c.userId===i.userId);const h=He(this.serializer,c);return Nh(t,i.userId,h).next(()=>{})}))}))}ii(t){const e=t.store("targetDocuments"),n=t.store("remoteDocuments");return t.store("targetGlobal").get("targetGlobalKey").next(s=>{const i=[];return n.J((a,u)=>{const c=new H(a),h=function(m){return[0,Nt(m)]}(c);i.push(e.get(h).next(f=>f?A.resolve():(m=>e.put({targetId:0,path:Nt(m),sequenceNumber:s.highestListenSequenceNumber}))(c)))}).next(()=>A.waitFor(i))})}si(t,e){t.createObjectStore("collectionParents",{keyPath:Tm});const n=e.store("collectionParents"),s=new Zo,i=a=>{if(s.add(a)){const u=a.lastSegment(),c=a.popLast();return n.put({collectionId:u,parent:Nt(c)})}};return e.store("remoteDocuments").J({H:!0},(a,u)=>{const c=new H(a);return i(c.popLast())}).next(()=>e.store("documentMutations").J({H:!0},([a,u,c],h)=>{const f=Ht(u);return i(f.popLast())}))}oi(t){const e=t.store("targets");return e.J((n,s)=>{const i=xr(s),a=xh(this.serializer,i);return e.put(a)})}_i(t,e){const n=e.store("remoteDocuments"),s=[];return n.J((i,a)=>{const u=e.store("remoteDocumentsV14"),c=function(m){return m.document?new M(H.fromString(m.document.name).popFirst(5)):m.noDocument?M.fromSegments(m.noDocument.path):m.unknownDocument?M.fromSegments(m.unknownDocument.path):L()}(a).path.toArray(),h={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(u.put(h))}).next(()=>A.waitFor(s))}ai(t,e){const n=e.store("mutations"),s=Bh(this.serializer),i=new ea(Ti.Zr,this.serializer.ct);return n.U().next(a=>{const u=new Map;return a.forEach(c=>{var h;let f=(h=u.get(c.userId))!==null&&h!==void 0?h:Q();He(this.serializer,c).keys().forEach(m=>f=f.add(m)),u.set(c.userId,f)}),A.forEach(u,(c,h)=>{const f=new wt(h),m=gi.lt(this.serializer,f),p=i.getIndexManager(f),v=yi.lt(f,this.serializer,p,i.referenceDelegate);return new qh(s,v,m,p).recalculateAndSaveOverlaysForDocumentKeys(new _o(e,Bt.oe),c).next()})})}}function Nc(r){r.createObjectStore("targetDocuments",{keyPath:gm}).createIndex("documentTargetsIndex",ym,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",pm,{unique:!0}),r.createObjectStore("targetGlobal")}const so="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class na{constructor(t,e,n,s,i,a,u,c,h,f,m=17){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.ui=i,this.window=a,this.document=u,this.ci=h,this.li=f,this.hi=m,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=p=>Promise.resolve(),!na.D())throw new D(b.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new V_(this,s),this.Ai=e+"main",this.serializer=new Ch(c),this.Ri=new Yt(this.Ai,this.hi,new q_(this.serializer)),this.$r=new y_,this.Ur=new P_(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Bh(this.serializer),this.Gr=new g_,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,f===!1&&gt("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,so);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",t=>this.Ur.getHighestSequenceNumber(t))}).then(t=>{this.Qr=new Bt(t,this.ci)}).then(()=>{this.Kr=!0}).catch(t=>(this.Ri&&this.Ri.close(),Promise.reject(t)))}yi(t){return this.di=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Ri.L(async e=>{e.newVersion===null&&await t()})}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",t=>Ns(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(t).next(e=>{e||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(t)).next(e=>this.isPrimary&&!e?this.bi(t).next(()=>!1):!!e&&this.Di(t).next(()=>!0))).catch(t=>{if(Me(t))return k("IndexedDbPersistence","Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return k("IndexedDbPersistence","Releasing owner lease after error during lease refresh",t),!1}).then(t=>{this.isPrimary!==t&&this.ui.enqueueRetryable(()=>this.di(t)),this.isPrimary=t})}wi(t){return Pr(t).get("owner").next(e=>A.resolve(this.vi(e)))}Ci(t){return Ns(t).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const n=It(e,"clientMetadata");return n.U().next(s=>{const i=this.xi(s,18e5),a=s.filter(u=>i.indexOf(u)===-1);return A.forEach(a,u=>n.delete(u.clientId)).next(()=>a)})}).catch(()=>[]);if(this.Vi)for(const e of t)this.Vi.removeItem(this.Oi(e.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(t){return!!t&&t.ownerId===this.clientId}Si(t){return this.li?A.resolve(!0):Pr(t).get("owner").next(e=>{if(e!==null&&this.Mi(e.leaseTimestampMs,5e3)&&!this.Ni(e.ownerId)){if(this.vi(e)&&this.networkEnabled)return!0;if(!this.vi(e)){if(!e.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,so);return!1}}return!(!this.networkEnabled||!this.inForeground)||Ns(t).U().next(n=>this.xi(n,5e3).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||a&&u)return!0}return!1})===void 0)}).next(e=>(this.isPrimary!==e&&k("IndexedDbPersistence",`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],t=>{const e=new _o(t,Bt.oe);return this.bi(e).next(()=>this.Ci(e))}),this.Ri.close(),this.qi()}xi(t,e){return t.filter(n=>this.Mi(n.updateTimeMs,e)&&!this.Ni(n.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",t=>Ns(t).U().next(e=>this.xi(e,18e5).map(n=>n.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(t,e){return yi.lt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new R_(t,this.serializer.ct.databaseId)}getDocumentOverlayCache(t){return gi.lt(this.serializer,t)}getBundleCache(){return this.Gr}runTransaction(t,e,n){k("IndexedDbPersistence","Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",i=function(c){return c===17?Vm:c===16?Sm:c===15?Bo:c===14?Ol:c===13?Nl:c===12?bm:c===11?kl:void L()}(this.hi);let a;return this.Ri.runTransaction(t,s,i,u=>(a=new _o(u,this.Qr?this.Qr.next():Bt.oe),e==="readwrite-primary"?this.wi(a).next(c=>!!c||this.Si(a)).next(c=>{if(!c)throw gt(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new D(b.FAILED_PRECONDITION,Sl);return n(a)}).next(c=>this.Di(a).next(()=>c)):this.Ki(a).next(()=>n(a)))).then(u=>(a.raiseOnCommittedEvent(),u))}Ki(t){return Pr(t).get("owner").next(e=>{if(e!==null&&this.Mi(e.leaseTimestampMs,5e3)&&!this.Ni(e.ownerId)&&!this.vi(e)&&!(this.li||this.allowTabSynchronization&&e.allowTabSynchronization))throw new D(b.FAILED_PRECONDITION,so)})}Di(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Pr(t).put("owner",e)}static D(){return Yt.D()}bi(t){const e=Pr(t);return e.get("owner").next(n=>this.vi(n)?(k("IndexedDbPersistence","Releasing primary lease."),e.delete("owner")):A.resolve())}Mi(t,e){const n=Date.now();return!(t<n-e)&&(!(t>n)||(gt(`Detected an update time that is in the future: ${t} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var t;typeof((t=this.window)===null||t===void 0?void 0:t.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const e=/(?:Version|Mobile)\/1[456]/;hl()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(t){var e;try{const n=((e=this.Vi)===null||e===void 0?void 0:e.getItem(this.Oi(t)))!==null;return k("IndexedDbPersistence",`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return gt("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(t){gt("Failed to set zombie client id.",t)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Pr(r){return It(r,"owner")}function Ns(r){return It(r,"clientMetadata")}function ra(r,t){let e=r.projectId;return r.isDefaultDatabase||(e+="."+r.database),"firestore/"+t+"/"+e+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.$i=n,this.Ui=s}static Wi(t,e){let n=Q(),s=Q();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new sa(t,e.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z_{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return hl()?8:Cl(Ws())>0?6:4}()}initialize(t,e){this.Ji=t,this.indexManager=e,this.Gi=!0}getDocumentsMatchingQuery(t,e,n,s){const i={result:null};return this.Yi(t,e).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.Zi(t,e,s,n).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new z_;return this.Xi(t,e,a).next(u=>{if(i.result=u,this.zi)return this.es(t,e,a,u.size)})}).next(()=>i.result)}es(t,e,n,s){return n.documentReadCount<this.ji?(Rn()<=se.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",Pn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),A.resolve()):(Rn()<=se.DEBUG&&k("QueryEngine","Query:",Pn(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Hi*s?(Rn()<=se.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",Pn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Ot(e))):A.resolve())}Yi(t,e){if(oc(e))return A.resolve(null);let n=Ot(e);return this.indexManager.getIndexType(t,n).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Js(e,null,"F"),n=Ot(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(i=>{const a=Q(...i);return this.Ji.getDocuments(t,a).next(u=>this.indexManager.getMinOffset(t,n).next(c=>{const h=this.ts(e,u);return this.ns(e,h,a,c.readTime)?this.Yi(t,Js(e,null,"F")):this.rs(t,h,e,c)}))})))}Zi(t,e,n,s){return oc(e)||s.isEqual(z.min())?A.resolve(null):this.Ji.getDocuments(t,n).next(i=>{const a=this.ts(e,i);return this.ns(e,a,n,s)?A.resolve(null):(Rn()<=se.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Pn(e)),this.rs(t,a,e,Pl(s,-1)).next(u=>u))})}ts(t,e){let n=new tt(th(t));return e.forEach((s,i)=>{Yr(t,i)&&(n=n.add(i))}),n}ns(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(t,e,n){return Rn()<=se.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",Pn(e)),this.Ji.getDocumentsMatchingQuery(t,e,Qt.min(),n)}rs(t,e,n,s){return this.Ji.getDocumentsMatchingQuery(t,n,s).next(i=>(e.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(t,e,n,s){this.persistence=t,this.ss=e,this.serializer=s,this.os=new rt(K),this._s=new he(i=>nn(i),Xr),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(n)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new qh(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.os))}}function Gh(r,t,e,n){return new G_(r,t,e,n)}async function jh(r,t){const e=N(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,e.ls(t),e.mutationQueue.getAllMutationBatches(n))).next(i=>{const a=[],u=[];let c=Q();for(const h of s){a.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of i){u.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return e.localDocuments.getDocuments(n,c).next(h=>({hs:h,removedBatchIds:a,addedBatchIds:u}))})})}function j_(r,t){const e=N(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=t.batch.keys(),i=e.cs.newChangeBuffer({trackRemovals:!0});return function(u,c,h,f){const m=h.batch,p=m.keys();let v=A.resolve();return p.forEach(C=>{v=v.next(()=>f.getEntry(c,C)).next(x=>{const V=h.docVersions.get(C);q(V!==null),x.version.compareTo(V)<0&&(m.applyToRemoteDocument(x,h),x.isValidDocument()&&(x.setReadTime(h.commitVersion),f.addEntry(x)))})}),v.next(()=>u.mutationQueue.removeMutationBatch(c,m))}(e,n,t,i).next(()=>i.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(u){let c=Q();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c}(t))).next(()=>e.localDocuments.getDocuments(n,s))})}function Kh(r){const t=N(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ur.getLastRemoteSnapshotVersion(e))}function K_(r,t){const e=N(r),n=t.snapshotVersion;let s=e.os;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=e.cs.newChangeBuffer({trackRemovals:!0});s=e.os;const u=[];t.targetChanges.forEach((f,m)=>{const p=s.get(m);if(!p)return;u.push(e.Ur.removeMatchingKeys(i,f.removedDocuments,m).next(()=>e.Ur.addMatchingKeys(i,f.addedDocuments,m)));let v=p.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(m)!==null?v=v.withResumeToken(ft.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):f.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(f.resumeToken,n)),s=s.insert(m,v),function(x,V,U){return x.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=3e8?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0}(p,v,f)&&u.push(e.Ur.updateTargetData(i,v))});let c=zt(),h=Q();if(t.documentUpdates.forEach(f=>{t.resolvedLimboDocuments.has(f)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))}),u.push(Qh(i,a,t.documentUpdates).next(f=>{c=f.Ps,h=f.Is})),!n.isEqual(z.min())){const f=e.Ur.getLastRemoteSnapshotVersion(i).next(m=>e.Ur.setTargetsMetadata(i,i.currentSequenceNumber,n));u.push(f)}return A.waitFor(u).next(()=>a.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,c,h)).next(()=>c)}).then(i=>(e.os=s,i))}function Qh(r,t,e){let n=Q(),s=Q();return e.forEach(i=>n=n.add(i)),t.getEntries(r,n).next(i=>{let a=zt();return e.forEach((u,c)=>{const h=i.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(z.min())?(t.removeEntry(u,c.readTime),a=a.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(c),a=a.insert(u,c)):k("LocalStore","Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)}),{Ps:a,Is:s}})}function Q_(r,t){const e=N(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function Un(r,t){const e=N(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return e.Ur.getTargetData(n,t).next(i=>i?(s=i,A.resolve(s)):e.Ur.allocateTargetId(n).next(a=>(s=new oe(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.Ur.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=e.os.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.os=e.os.insert(n.targetId,n),e._s.set(t,n.targetId)),n})}async function Bn(r,t,e){const n=N(r),s=n.os.get(t),i=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",i,a=>n.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Me(a))throw a;k("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}n.os=n.os.remove(t),n._s.delete(s.target)}function ri(r,t,e){const n=N(r);let s=z.min(),i=Q();return n.persistence.runTransaction("Execute query","readwrite",a=>function(c,h,f){const m=N(c),p=m._s.get(f);return p!==void 0?A.resolve(m.os.get(p)):m.Ur.getTargetData(h,f)}(n,a,Ot(t)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(a,u.targetId).next(c=>{i=c})}).next(()=>n.ss.getDocumentsMatchingQuery(a,t,e?s:z.min(),e?i:Q())).next(u=>(Hh(n,Zl(t),u),{documents:u,Ts:i})))}function $h(r,t){const e=N(r),n=N(e.Ur),s=e.os.get(t);return s?Promise.resolve(s.target):e.persistence.runTransaction("Get target data","readonly",i=>n.ot(i,t).next(a=>a?a.target:null))}function Wh(r,t){const e=N(r),n=e.us.get(t)||z.min();return e.persistence.runTransaction("Get new document changes","readonly",s=>e.cs.getAllFromCollectionGroup(s,t,Pl(n,-1),Number.MAX_SAFE_INTEGER)).then(s=>(Hh(e,t,s),s))}function Hh(r,t,e){let n=r.us.get(t)||z.min();e.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.us.set(t,n)}async function $_(r,t,e,n){const s=N(r);let i=Q(),a=zt();for(const h of e){const f=t.Es(h.metadata.name);h.document&&(i=i.add(f));const m=t.ds(h);m.setReadTime(t.As(h.metadata.readTime)),a=a.insert(f,m)}const u=s.cs.newChangeBuffer({trackRemovals:!0}),c=await Un(s,function(f){return Ot($n(H.fromString(`__bundle__/docs/${f}`)))}(n));return s.persistence.runTransaction("Apply bundle documents","readwrite",h=>Qh(h,u,a).next(f=>(u.apply(h),f)).next(f=>s.Ur.removeMatchingKeysForTargetId(h,c.targetId).next(()=>s.Ur.addMatchingKeys(h,i,c.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(h,f.Ps,f.Is)).next(()=>f.Ps)))}async function W_(r,t,e=Q()){const n=await Un(r,Ot(Jo(t.bundledQuery))),s=N(r);return s.persistence.runTransaction("Save named query","readwrite",i=>{const a=yt(t.readTime);if(n.snapshotVersion.compareTo(a)>=0)return s.Gr.saveNamedQuery(i,t);const u=n.withResumeToken(ft.EMPTY_BYTE_STRING,a);return s.os=s.os.insert(u.targetId,u),s.Ur.updateTargetData(i,u).next(()=>s.Ur.removeMatchingKeysForTargetId(i,n.targetId)).next(()=>s.Ur.addMatchingKeys(i,e,n.targetId)).next(()=>s.Gr.saveNamedQuery(i,t))})}function Oc(r,t){return`firestore_clients_${r}_${t}`}function Mc(r,t,e){let n=`firestore_mutations_${r}_${e}`;return t.isAuthenticated()&&(n+=`_${t.uid}`),n}function io(r,t){return`firestore_targets_${r}_${t}`}class si{constructor(t,e,n,s){this.user=t,this.batchId=e,this.state=n,this.error=s}static Rs(t,e,n){const s=JSON.parse(n);let i,a=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return a&&s.error&&(a=typeof s.error.message=="string"&&typeof s.error.code=="string",a&&(i=new D(s.error.code,s.error.message))),a?new si(t,e,s.state,i):(gt("SharedClientState",`Failed to parse mutation state for ID '${e}': ${n}`),null)}Vs(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Mr{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static Rs(t,e){const n=JSON.parse(e);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new D(n.error.code,n.error.message))),i?new Mr(t,n.state,s):(gt("SharedClientState",`Failed to parse target state for ID '${t}': ${e}`),null)}Vs(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class ii{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static Rs(t,e){const n=JSON.parse(e);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=Go();for(let a=0;s&&a<n.activeTargetIds.length;++a)s=xl(n.activeTargetIds[a]),i=i.add(n.activeTargetIds[a]);return s?new ii(t,i):(gt("SharedClientState",`Failed to parse client data for instance '${t}': ${e}`),null)}}class ia{constructor(t,e){this.clientId=t,this.onlineState=e}static Rs(t){const e=JSON.parse(t);return typeof e=="object"&&["Unknown","Online","Offline"].indexOf(e.onlineState)!==-1&&typeof e.clientId=="string"?new ia(e.clientId,e.onlineState):(gt("SharedClientState",`Failed to parse online state: ${t}`),null)}}class Vo{constructor(){this.activeTargetIds=Go()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class oo{constructor(t,e,n,s,i){this.window=t,this.ui=e,this.persistenceKey=n,this.ps=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new rt(K),this.started=!1,this.bs=[];const a=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Ds=Oc(this.persistenceKey,this.ps),this.vs=function(c){return`firestore_sequence_number_${c}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Vo),this.Cs=new RegExp(`^firestore_clients_${a}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${a}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${a}_(\\d+)$`),this.xs=function(c){return`firestore_online_state_${c}`}(this.persistenceKey),this.Os=function(c){return`firestore_bundle_loaded_v2_${c}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.Qi();for(const n of t){if(n===this.ps)continue;const s=this.getItem(Oc(this.persistenceKey,n));if(s){const i=ii.Rs(n,s);i&&(this.Ss=this.Ss.insert(i.clientId,i))}}this.Ns();const e=this.storage.getItem(this.xs);if(e){const n=this.Ls(e);n&&this.Bs(n)}for(const n of this.bs)this.ws(n);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(t){this.setItem(this.vs,JSON.stringify(t))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(t){let e=!1;return this.Ss.forEach((n,s)=>{s.activeTargetIds.has(t)&&(e=!0)}),e}addPendingMutation(t){this.qs(t,"pending")}updateMutationState(t,e,n){this.qs(t,e,n),this.Qs(t)}addLocalQueryTarget(t,e=!0){let n="not-current";if(this.isActiveQueryTarget(t)){const s=this.storage.getItem(io(this.persistenceKey,t));if(s){const i=Mr.Rs(t,s);i&&(n=i.state)}}return e&&this.Ks.fs(t),this.Ns(),n}removeLocalQueryTarget(t){this.Ks.gs(t),this.Ns()}isLocalQueryTarget(t){return this.Ks.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(io(this.persistenceKey,t))}updateQueryState(t,e,n){this.$s(t,e,n)}handleUserChange(t,e,n){e.forEach(s=>{this.Qs(s)}),this.currentUser=t,n.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(t){this.Us(t)}notifyBundleLoaded(t){this.Ws(t)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return k("SharedClientState","READ",t,e),e}setItem(t,e){k("SharedClientState","SET",t,e),this.storage.setItem(t,e)}removeItem(t){k("SharedClientState","REMOVE",t),this.storage.removeItem(t)}ws(t){const e=t;if(e.storageArea===this.storage){if(k("SharedClientState","EVENT",e.key,e.newValue),e.key===this.Ds)return void gt("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(e.key!==null){if(this.Cs.test(e.key)){if(e.newValue==null){const n=this.Gs(e.key);return this.zs(n,null)}{const n=this.js(e.key,e.newValue);if(n)return this.zs(n.clientId,n)}}else if(this.Fs.test(e.key)){if(e.newValue!==null){const n=this.Hs(e.key,e.newValue);if(n)return this.Js(n)}}else if(this.Ms.test(e.key)){if(e.newValue!==null){const n=this.Ys(e.key,e.newValue);if(n)return this.Zs(n)}}else if(e.key===this.xs){if(e.newValue!==null){const n=this.Ls(e.newValue);if(n)return this.Bs(n)}}else if(e.key===this.vs){const n=function(i){let a=Bt.oe;if(i!=null)try{const u=JSON.parse(i);q(typeof u=="number"),a=u}catch(u){gt("SharedClientState","Failed to read sequence number from WebStorage",u)}return a}(e.newValue);n!==Bt.oe&&this.sequenceNumberHandler(n)}else if(e.key===this.Os){const n=this.Xs(e.newValue);await Promise.all(n.map(s=>this.syncEngine.eo(s)))}}}else this.bs.push(e)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(t,e,n){const s=new si(this.currentUser,t,e,n),i=Mc(this.persistenceKey,this.currentUser,t);this.setItem(i,s.Vs())}Qs(t){const e=Mc(this.persistenceKey,this.currentUser,t);this.removeItem(e)}Us(t){const e={clientId:this.ps,onlineState:t};this.storage.setItem(this.xs,JSON.stringify(e))}$s(t,e,n){const s=io(this.persistenceKey,t),i=new Mr(t,e,n);this.setItem(s,i.Vs())}Ws(t){const e=JSON.stringify(Array.from(t));this.setItem(this.Os,e)}Gs(t){const e=this.Cs.exec(t);return e?e[1]:null}js(t,e){const n=this.Gs(t);return ii.Rs(n,e)}Hs(t,e){const n=this.Fs.exec(t),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return si.Rs(new wt(i),s,e)}Ys(t,e){const n=this.Ms.exec(t),s=Number(n[1]);return Mr.Rs(s,e)}Ls(t){return ia.Rs(t)}Xs(t){return JSON.parse(t)}async Js(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.no(t.batchId,t.state,t.error);k("SharedClientState",`Ignoring mutation for non-active user ${t.user.uid}`)}Zs(t){return this.syncEngine.ro(t.targetId,t.state,t.error)}zs(t,e){const n=e?this.Ss.insert(t,e):this.Ss.remove(t),s=this.ks(this.Ss),i=this.ks(n),a=[],u=[];return i.forEach(c=>{s.has(c)||a.push(c)}),s.forEach(c=>{i.has(c)||u.push(c)}),this.syncEngine.io(a,u).then(()=>{this.Ss=n})}Bs(t){this.Ss.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}ks(t){let e=Go();return t.forEach((n,s)=>{e=e.unionWith(s.activeTargetIds)}),e}}class Xh{constructor(){this.so=new Vo,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,e,n){this.oo[t]=e}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new Vo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{_o(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){k("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){k("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Os=null;function ao(){return Os===null?Os=function(){return 268435456+Math.round(2147483648*Math.random())}():Os++,"0x"+Os.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X_={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dt="WebChannelConnection";class Y_ extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+e.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(e,n,s,i,a){const u=ao(),c=this.xo(e,n.toUriEncodedString());k("RestConnection",`Sending RPC '${e}' ${u}:`,c,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,a),this.No(e,c,h,s).then(f=>(k("RestConnection",`Received RPC '${e}' ${u}: `,f),f),f=>{throw Kt("RestConnection",`RPC '${e}' ${u} failed with error: `,f,"url: ",c,"request:",s),f})}Lo(e,n,s,i,a,u){return this.Mo(e,n,s,i,a)}Oo(e,n,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Qn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,a)=>e[a]=i),s&&s.headers.forEach((i,a)=>e[a]=i)}xo(e,n){const s=X_[e];return`${this.Do}/v1/${n}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,e,n,s){const i=ao();return new Promise((a,u)=>{const c=new gl;c.setWithCredentials(!0),c.listenOnce(yl.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Us.NO_ERROR:const f=c.getResponseJson();k(Dt,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(f)),a(f);break;case Us.TIMEOUT:k(Dt,`RPC '${t}' ${i} timed out`),u(new D(b.DEADLINE_EXCEEDED,"Request time out"));break;case Us.HTTP_ERROR:const m=c.getStatus();if(k(Dt,`RPC '${t}' ${i} failed with status:`,m,"response text:",c.getResponseText()),m>0){let p=c.getResponseJson();Array.isArray(p)&&(p=p[0]);const v=p?.error;if(v&&v.status&&v.message){const C=function(V){const U=V.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(U)>=0?U:b.UNKNOWN}(v.status);u(new D(C,v.message))}else u(new D(b.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new D(b.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{k(Dt,`RPC '${t}' ${i} completed.`)}});const h=JSON.stringify(s);k(Dt,`RPC '${t}' ${i} sending request:`,s),c.send(e,"POST",h,n,15)})}Bo(t,e,n){const s=ao(),i=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=El(),u=Il(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,e,n),c.encodeInitMessageHeaders=!0;const f=i.join("");k(Dt,`Creating RPC '${t}' stream ${s}: ${f}`,c);const m=a.createWebChannel(f,c);let p=!1,v=!1;const C=new J_({Io:V=>{v?k(Dt,`Not sending because RPC '${t}' stream ${s} is closed:`,V):(p||(k(Dt,`Opening RPC '${t}' stream ${s} transport.`),m.open(),p=!0),k(Dt,`RPC '${t}' stream ${s} sending:`,V),m.send(V))},To:()=>m.close()}),x=(V,U,B)=>{V.listen(U,F=>{try{B(F)}catch(G){setTimeout(()=>{throw G},0)}})};return x(m,Sr.EventType.OPEN,()=>{v||(k(Dt,`RPC '${t}' stream ${s} transport opened.`),C.yo())}),x(m,Sr.EventType.CLOSE,()=>{v||(v=!0,k(Dt,`RPC '${t}' stream ${s} transport closed`),C.So())}),x(m,Sr.EventType.ERROR,V=>{v||(v=!0,Kt(Dt,`RPC '${t}' stream ${s} transport errored:`,V),C.So(new D(b.UNAVAILABLE,"The operation could not be completed")))}),x(m,Sr.EventType.MESSAGE,V=>{var U;if(!v){const B=V.data[0];q(!!B);const F=B,G=F.error||((U=F[0])===null||U===void 0?void 0:U.error);if(G){k(Dt,`RPC '${t}' stream ${s} received error:`,G);const W=G.status;let j=function(T){const E=Tt[T];if(E!==void 0)return mh(E)}(W),I=G.message;j===void 0&&(j=b.INTERNAL,I="Unknown error status: "+W+" with message "+G.message),v=!0,C.So(new D(j,I)),m.close()}else k(Dt,`RPC '${t}' stream ${s} received:`,B),C.bo(B)}}),x(u,Tl.STAT_EVENT,V=>{V.stat===fo.PROXY?k(Dt,`RPC '${t}' stream ${s} detected buffering proxy`):V.stat===fo.NOPROXY&&k(Dt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.wo()},0),C}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jh(){return typeof window<"u"?window:null}function Qs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(r){return new o_(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(t,e,n=1e3,s=1.5,i=6e4){this.ui=t,this.timerId=e,this.ko=n,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const e=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),s=Math.max(0,e-n);s>0&&k("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),t())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(t,e,n,s,i,a,u,c){this.ui=t,this.Ho=n,this.Jo=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new oa(t,e)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,e){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():e&&e.code===b.RESOURCE_EXHAUSTED?(gt(e.toString()),gt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):e&&e.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(e)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),e=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.Yo===e&&this.P_(n,s)},n=>{t(()=>{const s=new D(b.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(s)})})}P_(t,e){const n=this.h_(this.Yo);this.stream=this.T_(t,e),this.stream.Eo(()=>{n(()=>this.listener.Eo())}),this.stream.Ro(()=>{n(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{n(()=>this.I_(s))}),this.stream.onMessage(s=>{n(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(t){return k("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return e=>{this.ui.enqueueAndForget(()=>this.Yo===t?e():(k("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Z_ extends Yh{constructor(t,e,n,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}T_(t,e){return this.connection.Bo("Listen",t,e)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const e=c_(this.serializer,t),n=function(i){if(!("targetChange"in i))return z.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?z.min():a.readTime?yt(a.readTime):z.min()}(t);return this.listener.d_(e,n)}A_(t){const e={};e.database=Ao(this.serializer),e.addTarget=function(i,a){let u;const c=a.target;if(u=Hs(c)?{documents:Ah(i,c)}:{query:pi(i,c)._t},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=yh(i,a.resumeToken);const h=wo(i,a.expectedCount);h!==null&&(u.expectedCount=h)}else if(a.snapshotVersion.compareTo(z.min())>0){u.readTime=Ln(i,a.snapshotVersion.toTimestamp());const h=wo(i,a.expectedCount);h!==null&&(u.expectedCount=h)}return u}(this.serializer,t);const n=h_(this.serializer,t);n&&(e.labels=n),this.a_(e)}R_(t){const e={};e.database=Ao(this.serializer),e.removeTarget=t,this.a_(e)}}class tp extends Yh{constructor(t,e,n,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,e){return this.connection.Bo("Write",t,e)}E_(t){return q(!!t.streamToken),this.lastStreamToken=t.streamToken,q(!t.writeResults||t.writeResults.length===0),this.listener.f_()}onNext(t){q(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const e=l_(t.writeResults,t.commitTime),n=yt(t.commitTime);return this.listener.g_(n,e)}p_(){const t={};t.database=Ao(this.serializer),this.a_(t)}m_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>Qr(this.serializer,n))};this.a_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep extends class{}{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,e,n,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Mo(t,vo(e,n),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(b.UNKNOWN,i.toString())})}Lo(t,e,n,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.Lo(t,vo(e,n),s,a,u,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new D(b.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class np{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(gt(e),this.D_=!1):k("OnlineStateTracker",e)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(a=>{n.enqueueAndForget(async()=>{Le(this)&&(k("RemoteStore","Restarting streams for network reachability change."),await async function(c){const h=N(c);h.L_.add(4),await Xn(h),h.q_.set("Unknown"),h.L_.delete(4),await rs(h)}(this))})}),this.q_=new np(n,s)}}async function rs(r){if(Le(r))for(const t of r.B_)await t(!0)}async function Xn(r){for(const t of r.B_)await t(!1)}function Ii(r,t){const e=N(r);e.N_.has(t.targetId)||(e.N_.set(t.targetId,t),ca(e)?ua(e):Yn(e).r_()&&aa(e,t))}function qn(r,t){const e=N(r),n=Yn(e);e.N_.delete(t),n.r_()&&Zh(e,t),e.N_.size===0&&(n.r_()?n.o_():Le(e)&&e.q_.set("Unknown"))}function aa(r,t){if(r.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(z.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Yn(r).A_(t)}function Zh(r,t){r.Q_.xe(t),Yn(r).R_(t)}function ua(r){r.Q_=new n_({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>r.N_.get(t)||null,tt:()=>r.datastore.serializer.databaseId}),Yn(r).start(),r.q_.v_()}function ca(r){return Le(r)&&!Yn(r).n_()&&r.N_.size>0}function Le(r){return N(r).L_.size===0}function td(r){r.Q_=void 0}async function sp(r){r.q_.set("Online")}async function ip(r){r.N_.forEach((t,e)=>{aa(r,t)})}async function op(r,t){td(r),ca(r)?(r.q_.M_(t),ua(r)):r.q_.set("Unknown")}async function ap(r,t,e){if(r.q_.set("Online"),t instanceof gh&&t.state===2&&t.cause)try{await async function(s,i){const a=i.cause;for(const u of i.targetIds)s.N_.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.N_.delete(u),s.Q_.removeTarget(u))}(r,t)}catch(n){k("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await oi(r,n)}else if(t instanceof Ks?r.Q_.Ke(t):t instanceof ph?r.Q_.He(t):r.Q_.We(t),!e.isEqual(z.min()))try{const n=await Kh(r.localStore);e.compareTo(n)>=0&&await function(i,a){const u=i.Q_.rt(a);return u.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=i.N_.get(h);f&&i.N_.set(h,f.withResumeToken(c.resumeToken,a))}}),u.targetMismatches.forEach((c,h)=>{const f=i.N_.get(c);if(!f)return;i.N_.set(c,f.withResumeToken(ft.EMPTY_BYTE_STRING,f.snapshotVersion)),Zh(i,c);const m=new oe(f.target,c,h,f.sequenceNumber);aa(i,m)}),i.remoteSyncer.applyRemoteEvent(u)}(r,e)}catch(n){k("RemoteStore","Failed to raise snapshot:",n),await oi(r,n)}}async function oi(r,t,e){if(!Me(t))throw t;r.L_.add(1),await Xn(r),r.q_.set("Offline"),e||(e=()=>Kh(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{k("RemoteStore","Retrying IndexedDB access"),await e(),r.L_.delete(1),await rs(r)})}function ed(r,t){return t().catch(e=>oi(r,e,t))}async function Jn(r){const t=N(r),e=xe(t);let n=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;up(t);)try{const s=await Q_(t.localStore,n);if(s===null){t.O_.length===0&&e.o_();break}n=s.batchId,cp(t,s)}catch(s){await oi(t,s)}nd(t)&&rd(t)}function up(r){return Le(r)&&r.O_.length<10}function cp(r,t){r.O_.push(t);const e=xe(r);e.r_()&&e.V_&&e.m_(t.mutations)}function nd(r){return Le(r)&&!xe(r).n_()&&r.O_.length>0}function rd(r){xe(r).start()}async function lp(r){xe(r).p_()}async function hp(r){const t=xe(r);for(const e of r.O_)t.m_(e.mutations)}async function dp(r,t,e){const n=r.O_.shift(),s=$o.from(n,t,e);await ed(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await Jn(r)}async function fp(r,t){t&&xe(r).V_&&await async function(n,s){if(function(a){return fh(a)&&a!==b.ABORTED}(s.code)){const i=n.O_.shift();xe(n).s_(),await ed(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Jn(n)}}(r,t),nd(r)&&rd(r)}async function Lc(r,t){const e=N(r);e.asyncQueue.verifyOperationInProgress(),k("RemoteStore","RemoteStore received new credentials");const n=Le(e);e.L_.add(3),await Xn(e),n&&e.q_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.L_.delete(3),await rs(e)}async function Co(r,t){const e=N(r);t?(e.L_.delete(2),await rs(e)):t||(e.L_.add(2),await Xn(e),e.q_.set("Unknown"))}function Yn(r){return r.K_||(r.K_=function(e,n,s){const i=N(e);return i.w_(),new Z_(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Eo:sp.bind(null,r),Ro:ip.bind(null,r),mo:op.bind(null,r),d_:ap.bind(null,r)}),r.B_.push(async t=>{t?(r.K_.s_(),ca(r)?ua(r):r.q_.set("Unknown")):(await r.K_.stop(),td(r))})),r.K_}function xe(r){return r.U_||(r.U_=function(e,n,s){const i=N(e);return i.w_(),new tp(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:lp.bind(null,r),mo:fp.bind(null,r),f_:hp.bind(null,r),g_:dp.bind(null,r)}),r.B_.push(async t=>{t?(r.U_.s_(),await Jn(r)):(await r.U_.stop(),r.O_.length>0&&(k("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))})),r.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new vt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,i){const a=Date.now()+n,u=new la(t,e,a,s,i);return u.start(n),u}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(b.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Zn(r,t){if(gt("AsyncQueue",`${t}: ${r}`),Me(r))return new D(b.UNAVAILABLE,`${t}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(t){this.comparator=t?(e,n)=>t(e,n)||M.comparator(e.key,n.key):(e,n)=>M.comparator(e.key,n.key),this.keyedMap=Vr(),this.sortedSet=new rt(this.comparator)}static emptySet(t){return new Cn(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Cn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new Cn;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc{constructor(){this.W_=new rt(M.comparator)}track(t){const e=t.doc.key,n=this.W_.get(e);n?t.type!==0&&n.type===3?this.W_=this.W_.insert(e,t):t.type===3&&n.type!==1?this.W_=this.W_.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.W_=this.W_.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.W_=this.W_.remove(e):t.type===1&&n.type===2?this.W_=this.W_.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):L():this.W_=this.W_.insert(e,t)}G_(){const t=[];return this.W_.inorderTraversal((e,n)=>{t.push(n)}),t}}class zn{constructor(t,e,n,s,i,a,u,c,h){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(t,e,n,s,i){const a=[];return e.forEach(u=>{a.push({type:0,doc:u})}),new zn(t,e,Cn.emptySet(e),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Jr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(t=>t.J_())}}class _p{constructor(){this.queries=Bc(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(e,n){const s=N(e),i=s.queries;s.queries=Bc(),i.forEach((a,u)=>{for(const c of u.j_)c.onError(n)})})(this,new D(b.ABORTED,"Firestore shutting down"))}}function Bc(){return new he(r=>Yl(r),Jr)}async function ha(r,t){const e=N(r);let n=3;const s=t.query;let i=e.queries.get(s);i?!i.H_()&&t.J_()&&(n=2):(i=new mp,n=t.J_()?0:1);try{switch(n){case 0:i.z_=await e.onListen(s,!0);break;case 1:i.z_=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=Zn(a,`Initialization of query '${Pn(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,i),i.j_.push(t),t.Z_(e.onlineState),i.z_&&t.X_(i.z_)&&fa(e)}async function da(r,t){const e=N(r),n=t.query;let s=3;const i=e.queries.get(n);if(i){const a=i.j_.indexOf(t);a>=0&&(i.j_.splice(a,1),i.j_.length===0?s=t.J_()?0:1:!i.H_()&&t.J_()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function pp(r,t){const e=N(r);let n=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const u of a.j_)u.X_(s)&&(n=!0);a.z_=s}}n&&fa(e)}function gp(r,t,e){const n=N(r),s=n.queries.get(t);if(s)for(const i of s.j_)i.onError(e);n.queries.delete(t)}function fa(r){r.Y_.forEach(t=>{t.next()})}var xo,qc;(qc=xo||(xo={})).ea="default",qc.Cache="cache";class ma{constructor(t,e,n){this.query=t,this.ta=e,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new zn(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.na?this.ia(t)&&(this.ta.next(t),e=!0):this.sa(t,this.onlineState)&&(this.oa(t),e=!0),this.ra=t,e}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let e=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),e=!0),e}sa(t,e){if(!t.fromCache||!this.J_())return!0;const n=e!=="Offline";return(!this.options._a||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}ia(t){if(t.docChanges.length>0)return!0;const e=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}oa(t){t=zn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==xo.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(t,e){this.aa=t,this.byteLength=e}ua(){return"metadata"in this.aa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(t){this.serializer=t}Es(t){return Zt(this.serializer,t)}ds(t){return t.metadata.exists?vh(this.serializer,t.document,!1):it.newNoDocument(this.Es(t.metadata.name),this.As(t.metadata.readTime))}As(t){return yt(t)}}class Tp{constructor(t,e,n){this.ca=t,this.localStore=e,this.serializer=n,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=sd(t)}la(t){this.progress.bytesLoaded+=t.byteLength;let e=this.progress.documentsLoaded;if(t.aa.namedQuery)this.queries.push(t.aa.namedQuery);else if(t.aa.documentMetadata){this.documents.push({metadata:t.aa.documentMetadata}),t.aa.documentMetadata.exists||++e;const n=H.fromString(t.aa.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else t.aa.document&&(this.documents[this.documents.length-1].document=t.aa.document,++e);return e!==this.progress.documentsLoaded?(this.progress.documentsLoaded=e,Object.assign({},this.progress)):null}ha(t){const e=new Map,n=new zc(this.serializer);for(const s of t)if(s.metadata.queries){const i=n.Es(s.metadata.name);for(const a of s.metadata.queries){const u=(e.get(a)||Q()).add(i);e.set(a,u)}}return e}async complete(){const t=await $_(this.localStore,new zc(this.serializer),this.documents,this.ca.id),e=this.ha(this.documents);for(const n of this.queries)await W_(this.localStore,n,e.get(n.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:t}}}function sd(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(t){this.key=t}}class od{constructor(t){this.key=t}}class ad{constructor(t,e){this.query=t,this.Ta=e,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=Q(),this.mutatedKeys=Q(),this.Aa=th(t),this.Ra=new Cn(this.Aa)}get Va(){return this.Ta}ma(t,e){const n=e?e.fa:new Uc,s=e?e.Ra:this.Ra;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((f,m)=>{const p=s.get(f),v=Yr(this.query,m)?m:null,C=!!p&&this.mutatedKeys.has(p.key),x=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let V=!1;p&&v?p.data.isEqual(v.data)?C!==x&&(n.track({type:3,doc:v}),V=!0):this.ga(p,v)||(n.track({type:2,doc:v}),V=!0,(c&&this.Aa(v,c)>0||h&&this.Aa(v,h)<0)&&(u=!0)):!p&&v?(n.track({type:0,doc:v}),V=!0):p&&!v&&(n.track({type:1,doc:p}),V=!0,(c||h)&&(u=!0)),V&&(v?(a=a.add(v),i=x?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{Ra:a,fa:n,ns:u,mutatedKeys:i}}ga(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const i=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const a=t.fa.G_();a.sort((f,m)=>function(v,C){const x=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return x(v)-x(C)}(f.type,m.type)||this.Aa(f.doc,m.doc)),this.pa(n),s=s!=null&&s;const u=e&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,h=c!==this.Ea;return this.Ea=c,a.length!==0||h?{snapshot:new zn(this.query,t.Ra,i,a,t.mutatedKeys,c===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:u}:{wa:u}}Z_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Uc,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach(e=>this.Ta=this.Ta.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ta=this.Ta.delete(e)),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=Q(),this.Ra.forEach(n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))});const e=[];return t.forEach(n=>{this.da.has(n)||e.push(new od(n))}),this.da.forEach(n=>{t.has(n)||e.push(new id(n))}),e}ba(t){this.Ta=t.Ts,this.da=Q();const e=this.ma(t.documents);return this.applyChanges(e,!0)}Da(){return zn.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class Ip{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Ep{constructor(t){this.key=t,this.va=!1}}class wp{constructor(t,e,n,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new he(u=>Yl(u),Jr),this.Ma=new Map,this.xa=new Set,this.Oa=new rt(M.comparator),this.Na=new Map,this.La=new ta,this.Ba={},this.ka=new Map,this.qa=un.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function vp(r,t,e=!0){const n=Ei(r);let s;const i=n.Fa.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await ud(n,t,e,!0),s}async function Ap(r,t){const e=Ei(r);await ud(e,t,!0,!1)}async function ud(r,t,e,n){const s=await Un(r.localStore,Ot(t)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,e);let u;return n&&(u=await _a(r,t,i,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&Ii(r.remoteStore,s),u}async function _a(r,t,e,n,s){r.Ka=(m,p,v)=>async function(x,V,U,B){let F=V.view.ma(U);F.ns&&(F=await ri(x.localStore,V.query,!1).then(({documents:I})=>V.view.ma(I,F)));const G=B&&B.targetChanges.get(V.targetId),W=B&&B.targetMismatches.get(V.targetId)!=null,j=V.view.applyChanges(F,x.isPrimaryClient,G,W);return Do(x,V.targetId,j.wa),j.snapshot}(r,m,p,v);const i=await ri(r.localStore,t,!0),a=new ad(t,i.Ts),u=a.ma(i.documents),c=es.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),h=a.applyChanges(u,r.isPrimaryClient,c);Do(r,e,h.wa);const f=new Ip(t,e,a);return r.Fa.set(t,f),r.Ma.has(e)?r.Ma.get(e).push(t):r.Ma.set(e,[t]),h.snapshot}async function Rp(r,t,e){const n=N(r),s=n.Fa.get(t),i=n.Ma.get(s.targetId);if(i.length>1)return n.Ma.set(s.targetId,i.filter(a=>!Jr(a,t))),void n.Fa.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Bn(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),e&&qn(n.remoteStore,s.targetId),Gn(n,s.targetId)}).catch(Oe)):(Gn(n,s.targetId),await Bn(n.localStore,s.targetId,!0))}async function Pp(r,t){const e=N(r),n=e.Fa.get(t),s=e.Ma.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),qn(e.remoteStore,n.targetId))}async function bp(r,t,e){const n=Ta(r);try{const s=await function(a,u){const c=N(a),h=lt.now(),f=u.reduce((v,C)=>v.add(C.key),Q());let m,p;return c.persistence.runTransaction("Locally write mutations","readwrite",v=>{let C=zt(),x=Q();return c.cs.getEntries(v,f).next(V=>{C=V,C.forEach((U,B)=>{B.isValidDocument()||(x=x.add(U))})}).next(()=>c.localDocuments.getOverlayedDocuments(v,C)).next(V=>{m=V;const U=[];for(const B of u){const F=Zm(B,m.get(B.key).overlayedDocument);F!=null&&U.push(new de(B.key,F,ql(F.value.mapValue),ct.exists(!0)))}return c.mutationQueue.addMutationBatch(v,h,U,u)}).next(V=>{p=V;const U=V.applyToLocalDocumentSet(m,x);return c.documentOverlayCache.saveOverlays(v,V.batchId,U)})}).then(()=>({batchId:p.batchId,changes:nh(m)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),function(a,u,c){let h=a.Ba[a.currentUser.toKey()];h||(h=new rt(K)),h=h.insert(u,c),a.Ba[a.currentUser.toKey()]=h}(n,s.batchId,e),await fe(n,s.changes),await Jn(n.remoteStore)}catch(s){const i=Zn(s,"Failed to persist write");e.reject(i)}}async function cd(r,t){const e=N(r);try{const n=await K_(e.localStore,t);t.targetChanges.forEach((s,i)=>{const a=e.Na.get(i);a&&(q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?q(a.va):s.removedDocuments.size>0&&(q(a.va),a.va=!1))}),await fe(e,n,t)}catch(n){await Oe(n)}}function Gc(r,t,e){const n=N(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.Fa.forEach((i,a)=>{const u=a.view.Z_(t);u.snapshot&&s.push(u.snapshot)}),function(a,u){const c=N(a);c.onlineState=u;let h=!1;c.queries.forEach((f,m)=>{for(const p of m.j_)p.Z_(u)&&(h=!0)}),h&&fa(c)}(n.eventManager,t),s.length&&n.Ca.d_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function Sp(r,t,e){const n=N(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.Na.get(t),i=s&&s.key;if(i){let a=new rt(M.comparator);a=a.insert(i,it.newNoDocument(i,z.min()));const u=Q().add(i),c=new ts(z.min(),new Map,new rt(K),a,u);await cd(n,c),n.Oa=n.Oa.remove(i),n.Na.delete(t),ya(n)}else await Bn(n.localStore,t,!1).then(()=>Gn(n,t,e)).catch(Oe)}async function Vp(r,t){const e=N(r),n=t.batch.batchId;try{const s=await j_(e.localStore,t);ga(e,n,null),pa(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await fe(e,s)}catch(s){await Oe(s)}}async function Cp(r,t,e){const n=N(r);try{const s=await function(a,u){const c=N(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return c.mutationQueue.lookupMutationBatch(h,u).next(m=>(q(m!==null),f=m.keys(),c.mutationQueue.removeMutationBatch(h,m))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,u)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>c.localDocuments.getDocuments(h,f))})}(n.localStore,t);ga(n,t,e),pa(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await fe(n,s)}catch(s){await Oe(s)}}async function xp(r,t){const e=N(r);Le(e.remoteStore)||k("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await function(a){const u=N(a);return u.persistence.runTransaction("Get highest unacknowledged batch id","readonly",c=>u.mutationQueue.getHighestUnacknowledgedBatchId(c))}(e.localStore);if(n===-1)return void t.resolve();const s=e.ka.get(n)||[];s.push(t),e.ka.set(n,s)}catch(n){const s=Zn(n,"Initialization of waitForPendingWrites() operation failed");t.reject(s)}}function pa(r,t){(r.ka.get(t)||[]).forEach(e=>{e.resolve()}),r.ka.delete(t)}function ga(r,t,e){const n=N(r);let s=n.Ba[n.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),n.Ba[n.currentUser.toKey()]=s}}function Gn(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Ma.get(t))r.Fa.delete(n),e&&r.Ca.$a(n,e);r.Ma.delete(t),r.isPrimaryClient&&r.La.gr(t).forEach(n=>{r.La.containsKey(n)||ld(r,n)})}function ld(r,t){r.xa.delete(t.path.canonicalString());const e=r.Oa.get(t);e!==null&&(qn(r.remoteStore,e),r.Oa=r.Oa.remove(t),r.Na.delete(e),ya(r))}function Do(r,t,e){for(const n of e)n instanceof id?(r.La.addReference(n.key,t),Dp(r,n)):n instanceof od?(k("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,t),r.La.containsKey(n.key)||ld(r,n.key)):L()}function Dp(r,t){const e=t.key,n=e.path.canonicalString();r.Oa.get(e)||r.xa.has(n)||(k("SyncEngine","New document in limbo: "+e),r.xa.add(n),ya(r))}function ya(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const t=r.xa.values().next().value;r.xa.delete(t);const e=new M(H.fromString(t)),n=r.qa.next();r.Na.set(n,new Ep(e)),r.Oa=r.Oa.insert(e,n),Ii(r.remoteStore,new oe(Ot($n(e.path)),n,"TargetPurposeLimboResolution",Bt.oe))}}async function fe(r,t,e){const n=N(r),s=[],i=[],a=[];n.Fa.isEmpty()||(n.Fa.forEach((u,c)=>{a.push(n.Ka(c,t,e).then(h=>{var f;if((h||e)&&n.isPrimaryClient){const m=h?!h.fromCache:(f=e?.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(c.targetId,m?"current":"not-current")}if(h){s.push(h);const m=sa.Wi(c.targetId,h);i.push(m)}}))}),await Promise.all(a),n.Ca.d_(s),await async function(c,h){const f=N(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>A.forEach(h,p=>A.forEach(p.$i,v=>f.persistence.referenceDelegate.addReference(m,p.targetId,v)).next(()=>A.forEach(p.Ui,v=>f.persistence.referenceDelegate.removeReference(m,p.targetId,v)))))}catch(m){if(!Me(m))throw m;k("LocalStore","Failed to update sequence numbers: "+m)}for(const m of h){const p=m.targetId;if(!m.fromCache){const v=f.os.get(p),C=v.snapshotVersion,x=v.withLastLimboFreeSnapshotVersion(C);f.os=f.os.insert(p,x)}}}(n.localStore,i))}async function kp(r,t){const e=N(r);if(!e.currentUser.isEqual(t)){k("SyncEngine","User change. New user:",t.toKey());const n=await jh(e.localStore,t);e.currentUser=t,function(i,a){i.ka.forEach(u=>{u.forEach(c=>{c.reject(new D(b.CANCELLED,a))})}),i.ka.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await fe(e,n.hs)}}function Np(r,t){const e=N(r),n=e.Na.get(t);if(n&&n.va)return Q().add(n.key);{let s=Q();const i=e.Ma.get(t);if(!i)return s;for(const a of i){const u=e.Fa.get(a);s=s.unionWith(u.view.Va)}return s}}async function Op(r,t){const e=N(r),n=await ri(e.localStore,t.query,!0),s=t.view.ba(n);return e.isPrimaryClient&&Do(e,t.targetId,s.wa),s}async function Mp(r,t){const e=N(r);return Wh(e.localStore,t).then(n=>fe(e,n))}async function Fp(r,t,e,n){const s=N(r),i=await function(u,c){const h=N(u),f=N(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",m=>f.Mn(m,c).next(p=>p?h.localDocuments.getDocuments(m,p):A.resolve(null)))}(s.localStore,t);i!==null?(e==="pending"?await Jn(s.remoteStore):e==="acknowledged"||e==="rejected"?(ga(s,t,n||null),pa(s,t),function(u,c){N(N(u).mutationQueue).On(c)}(s.localStore,t)):L(),await fe(s,i)):k("SyncEngine","Cannot apply mutation batch with id: "+t)}async function Lp(r,t){const e=N(r);if(Ei(e),Ta(e),t===!0&&e.Qa!==!0){const n=e.sharedClientState.getAllActiveQueryTargets(),s=await jc(e,n.toArray());e.Qa=!0,await Co(e.remoteStore,!0);for(const i of s)Ii(e.remoteStore,i)}else if(t===!1&&e.Qa!==!1){const n=[];let s=Promise.resolve();e.Ma.forEach((i,a)=>{e.sharedClientState.isLocalQueryTarget(a)?n.push(a):s=s.then(()=>(Gn(e,a),Bn(e.localStore,a,!0))),qn(e.remoteStore,a)}),await s,await jc(e,n),function(a){const u=N(a);u.Na.forEach((c,h)=>{qn(u.remoteStore,h)}),u.La.pr(),u.Na=new Map,u.Oa=new rt(M.comparator)}(e),e.Qa=!1,await Co(e.remoteStore,!1)}}async function jc(r,t,e){const n=N(r),s=[],i=[];for(const a of t){let u;const c=n.Ma.get(a);if(c&&c.length!==0){u=await Un(n.localStore,Ot(c[0]));for(const h of c){const f=n.Fa.get(h),m=await Op(n,f);m.snapshot&&i.push(m.snapshot)}}else{const h=await $h(n.localStore,a);u=await Un(n.localStore,h),await _a(n,hd(h),a,!1,u.resumeToken)}s.push(u)}return n.Ca.d_(i),s}function hd(r){return Hl(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function Up(r){return function(e){return N(N(e).persistence).Qi()}(N(r).localStore)}async function Bp(r,t,e,n){const s=N(r);if(s.Qa)return void k("SyncEngine","Ignoring unexpected query state notification.");const i=s.Ma.get(t);if(i&&i.length>0)switch(e){case"current":case"not-current":{const a=await Wh(s.localStore,Zl(i[0])),u=ts.createSynthesizedRemoteEventForCurrentChange(t,e==="current",ft.EMPTY_BYTE_STRING);await fe(s,a,u);break}case"rejected":await Bn(s.localStore,t,!0),Gn(s,t,n);break;default:L()}}async function qp(r,t,e){const n=Ei(r);if(n.Qa){for(const s of t){if(n.Ma.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){k("SyncEngine","Adding an already active target "+s);continue}const i=await $h(n.localStore,s),a=await Un(n.localStore,i);await _a(n,hd(i),a.targetId,!1,a.resumeToken),Ii(n.remoteStore,a)}for(const s of e)n.Ma.has(s)&&await Bn(n.localStore,s,!1).then(()=>{qn(n.remoteStore,s),Gn(n,s)}).catch(Oe)}}function Ei(r){const t=N(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=cd.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Np.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Sp.bind(null,t),t.Ca.d_=pp.bind(null,t.eventManager),t.Ca.$a=gp.bind(null,t.eventManager),t}function Ta(r){const t=N(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Vp.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Cp.bind(null,t),t}function zp(r,t,e){const n=N(r);(async function(i,a,u){try{const c=await a.getMetadata();if(await function(v,C){const x=N(v),V=yt(C.createTime);return x.persistence.runTransaction("hasNewerBundle","readonly",U=>x.Gr.getBundleMetadata(U,C.id)).then(U=>!!U&&U.createTime.compareTo(V)>=0)}(i.localStore,c))return await a.close(),u._completeWith(function(v){return{taskState:"Success",documentsLoaded:v.totalDocuments,bytesLoaded:v.totalBytes,totalDocuments:v.totalDocuments,totalBytes:v.totalBytes}}(c)),Promise.resolve(new Set);u._updateProgress(sd(c));const h=new Tp(c,i.localStore,a.serializer);let f=await a.Ua();for(;f;){const p=await h.la(f);p&&u._updateProgress(p),f=await a.Ua()}const m=await h.complete();return await fe(i,m.Ia,void 0),await function(v,C){const x=N(v);return x.persistence.runTransaction("Save bundle","readwrite",V=>x.Gr.saveBundleMetadata(V,C))}(i.localStore,c),u._completeWith(m.progress),Promise.resolve(m.Pa)}catch(c){return Kt("SyncEngine",`Loading bundle failed with ${c}`),u._failWith(c),Promise.resolve(new Set)}})(n,t,e).then(s=>{n.sharedClientState.notifyBundleLoaded(s)})}class De{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=ns(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,e){return null}Ha(t,e){return null}za(t){return Gh(this.persistence,new zh,t.initialUser,this.serializer)}Ga(t){return new ea(Ti.Zr,this.serializer)}Wa(t){return new Xh}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}De.provider={build:()=>new De};class Gp extends De{constructor(t){super(),this.cacheSizeBytes=t}ja(t,e){q(this.persistence.referenceDelegate instanceof ni);const n=this.persistence.referenceDelegate.garbageCollector;return new Fh(n,t.asyncQueue,e)}Ga(t){const e=this.cacheSizeBytes!==void 0?kt.withCacheSize(this.cacheSizeBytes):kt.DEFAULT;return new ea(n=>ni.Zr(n,e),this.serializer)}}class Ia extends De{constructor(t,e,n){super(),this.Ja=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.Ja.initialize(this,t),await Ta(this.Ja.syncEngine),await Jn(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(t){return Gh(this.persistence,new zh,t.initialUser,this.serializer)}ja(t,e){const n=this.persistence.referenceDelegate.garbageCollector;return new Fh(n,t.asyncQueue,e)}Ha(t,e){const n=new lm(e,this.persistence);return new cm(t.asyncQueue,n)}Ga(t){const e=ra(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?kt.withCacheSize(this.cacheSizeBytes):kt.DEFAULT;return new na(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,Jh(),Qs(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(t){return new Xh}}class dd extends Ia{constructor(t,e){super(t,e,!1),this.Ja=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.Ja.syncEngine;this.sharedClientState instanceof oo&&(this.sharedClientState.syncEngine={no:Fp.bind(null,e),ro:Bp.bind(null,e),io:qp.bind(null,e),Qi:Up.bind(null,e),eo:Mp.bind(null,e)},await this.sharedClientState.start()),await this.persistence.yi(async n=>{await Lp(this.Ja.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}Wa(t){const e=Jh();if(!oo.D(e))throw new D(b.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=ra(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new oo(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class ke{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Gc(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=kp.bind(null,this.syncEngine),await Co(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new _p}()}createDatastore(t){const e=ns(t.databaseInfo.databaseId),n=function(i){return new Y_(i)}(t.databaseInfo);return function(i,a,u,c){return new ep(i,a,u,c)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,s,i,a,u){return new rp(n,s,i,a,u)}(this.localStore,this.datastore,t.asyncQueue,e=>Gc(this.syncEngine,e,0),function(){return Fc.D()?new Fc:new H_}())}createSyncEngine(t,e){return function(s,i,a,u,c,h,f){const m=new wp(s,i,a,u,c,h);return f&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const i=N(s);k("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Xn(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}ke.provider={build:()=>new ke};function Kc(r,t=10240){let e=0;return{async read(){if(e<r.byteLength){const n={value:r.slice(e,e+t),done:!1};return e+=t,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):gt("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(t,e){this.Xa=t,this.serializer=e,this.metadata=new vt,this.buffer=new Uint8Array,this.eu=function(){return new TextDecoder("utf-8")}(),this.tu().then(n=>{n&&n.ua()?this.metadata.resolve(n.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n?.aa)}`))},n=>this.metadata.reject(n))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const t=await this.nu();if(t===null)return null;const e=this.eu.decode(t),n=Number(e);isNaN(n)&&this.ru(`length string (${e}) is not valid number`);const s=await this.iu(n);return new yp(JSON.parse(s),t.length+n)}su(){return this.buffer.findIndex(t=>t===123)}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const t=this.su();t<0&&this.ru("Reached the end of bundle when a length string is expected.");const e=this.buffer.slice(0,t);return this.buffer=this.buffer.slice(t),e}async iu(t){for(;this.buffer.length<t;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const e=this.eu.decode(this.buffer.slice(0,t));return this.buffer=this.buffer.slice(t),e}ru(t){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${t}`)}async ou(){const t=await this.Xa.read();if(!t.done){const e=new Uint8Array(this.buffer.length+t.value.length);e.set(this.buffer),e.set(t.value,this.buffer.length),this.buffer=e}return t.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(b.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await async function(s,i){const a=N(s),u={documents:i.map(m=>Kr(a.serializer,m))},c=await a.Lo("BatchGetDocuments",a.serializer.databaseId,H.emptyPath(),u,i.length),h=new Map;c.forEach(m=>{const p=u_(a.serializer,m);h.set(p.key.toString(),p)});const f=[];return i.forEach(m=>{const p=h.get(m.toString());q(!!p),f.push(p)}),f}(this.datastore,t);return e.forEach(n=>this.recordVersion(n)),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(t.toString())}delete(t){this.write(new Hn(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach(e=>{t.delete(e.key.toString())}),t.forEach((e,n)=>{const s=M.fromPath(n);this.mutations.push(new Ko(s,this.precondition(s)))}),await async function(n,s){const i=N(n),a={writes:s.map(u=>Qr(i.serializer,u))};await i.Mo("Commit",i.serializer.databaseId,H.emptyPath(),a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw L();e=z.min()}const n=this.readVersions.get(t.key.toString());if(n){if(!e.isEqual(n))throw new D(b.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(z.min())?ct.exists(!1):ct.updateTime(e):ct.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(z.min()))throw new D(b.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ct.updateTime(e)}return ct.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{constructor(t,e,n,s,i){this.asyncQueue=t,this.datastore=e,this.options=n,this.updateFunction=s,this.deferred=i,this._u=n.maxAttempts,this.t_=new oa(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const t=new Kp(this.datastore),e=this.cu(t);e&&e.then(n=>{this.asyncQueue.enqueueAndForget(()=>t.commit().then(()=>{this.deferred.resolve(n)}).catch(s=>{this.lu(s)}))}).catch(n=>{this.lu(n)})})}cu(t){try{const e=this.updateFunction(t);return!Hr(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}lu(t){this._u>0&&this.hu(t)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(t)}hu(t){if(t.name==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!fh(e)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $p{constructor(t,e,n,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=wt.UNAUTHENTICATED,this.clientId=Fo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async a=>{k("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(k("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new vt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Zn(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function uo(r,t){r.asyncQueue.verifyOperationInProgress(),k("FirestoreClient","Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await jh(t.localStore,s),n=s)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function Qc(r,t){r.asyncQueue.verifyOperationInProgress();const e=await Ea(r);k("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>Lc(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>Lc(t.remoteStore,s)),r._onlineComponents=t}async function Ea(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){k("FirestoreClient","Using user provided OfflineComponentProvider");try{await uo(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;Kt("Error using user provided cache. Falling back to memory cache: "+e),await uo(r,new De)}}else k("FirestoreClient","Using default OfflineComponentProvider"),await uo(r,new De);return r._offlineComponents}async function vi(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(k("FirestoreClient","Using user provided OnlineComponentProvider"),await Qc(r,r._uninitializedComponentsProvider._online)):(k("FirestoreClient","Using default OnlineComponentProvider"),await Qc(r,new ke))),r._onlineComponents}function fd(r){return Ea(r).then(t=>t.persistence)}function tr(r){return Ea(r).then(t=>t.localStore)}function md(r){return vi(r).then(t=>t.remoteStore)}function wa(r){return vi(r).then(t=>t.syncEngine)}function _d(r){return vi(r).then(t=>t.datastore)}async function jn(r){const t=await vi(r),e=t.eventManager;return e.onListen=vp.bind(null,t.syncEngine),e.onUnlisten=Rp.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Ap.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Pp.bind(null,t.syncEngine),e}function Wp(r){return r.asyncQueue.enqueue(async()=>{const t=await fd(r),e=await md(r);return t.setNetworkEnabled(!0),function(s){const i=N(s);return i.L_.delete(0),rs(i)}(e)})}function Hp(r){return r.asyncQueue.enqueue(async()=>{const t=await fd(r),e=await md(r);return t.setNetworkEnabled(!1),async function(s){const i=N(s);i.L_.add(0),await Xn(i),i.q_.set("Offline")}(e)})}function Xp(r,t){const e=new vt;return r.asyncQueue.enqueueAndForget(async()=>async function(s,i,a){try{const u=await function(h,f){const m=N(h);return m.persistence.runTransaction("read document","readonly",p=>m.localDocuments.getDocument(p,f))}(s,i);u.isFoundDocument()?a.resolve(u):u.isNoDocument()?a.resolve(null):a.reject(new D(b.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(u){const c=Zn(u,`Failed to get document '${i} from cache`);a.reject(c)}}(await tr(r),t,e)),e.promise}function pd(r,t,e={}){const n=new vt;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,u,c,h){const f=new wi({next:p=>{f.Za(),a.enqueueAndForget(()=>da(i,m));const v=p.docs.has(u);!v&&p.fromCache?h.reject(new D(b.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&p.fromCache&&c&&c.source==="server"?h.reject(new D(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(p)},error:p=>h.reject(p)}),m=new ma($n(u.path),f,{includeMetadataChanges:!0,_a:!0});return ha(i,m)}(await jn(r),r.asyncQueue,t,e,n)),n.promise}function Jp(r,t){const e=new vt;return r.asyncQueue.enqueueAndForget(async()=>async function(s,i,a){try{const u=await ri(s,i,!0),c=new ad(i,u.Ts),h=c.ma(u.documents),f=c.applyChanges(h,!1);a.resolve(f.snapshot)}catch(u){const c=Zn(u,`Failed to execute query '${i} against cache`);a.reject(c)}}(await tr(r),t,e)),e.promise}function gd(r,t,e={}){const n=new vt;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,u,c,h){const f=new wi({next:p=>{f.Za(),a.enqueueAndForget(()=>da(i,m)),p.fromCache&&c.source==="server"?h.reject(new D(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(p)},error:p=>h.reject(p)}),m=new ma(u,f,{includeMetadataChanges:!0,_a:!0});return ha(i,m)}(await jn(r),r.asyncQueue,t,e,n)),n.promise}function Yp(r,t,e){const n=new vt;return r.asyncQueue.enqueueAndForget(async()=>{try{const s=await _d(r);n.resolve(async function(a,u,c){var h;const f=N(a),{request:m,ut:p,parent:v}=Rh(f.serializer,Xl(u),c);f.connection.Fo||delete m.parent;const C=(await f.Lo("RunAggregationQuery",f.serializer.databaseId,v,m,1)).filter(V=>!!V.result);q(C.length===1);const x=(h=C[0].result)===null||h===void 0?void 0:h.aggregateFields;return Object.keys(x).reduce((V,U)=>(V[p[U]]=x[U],V),{})}(s,t,e))}catch(s){n.reject(s)}}),n.promise}function Zp(r,t){const e=new wi(t);return r.asyncQueue.enqueueAndForget(async()=>function(s,i){N(s).Y_.add(i),i.next()}(await jn(r),e)),()=>{e.Za(),r.asyncQueue.enqueueAndForget(async()=>function(s,i){N(s).Y_.delete(i)}(await jn(r),e))}}function tg(r,t,e,n){const s=function(a,u){let c;return c=typeof a=="string"?_h().encode(a):a,function(f,m){return new jp(f,m)}(function(f,m){if(f instanceof Uint8Array)return Kc(f,m);if(f instanceof ArrayBuffer)return Kc(new Uint8Array(f),m);if(f instanceof ReadableStream)return f.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(c),u)}(e,ns(t));r.asyncQueue.enqueueAndForget(async()=>{zp(await wa(r),s,n)})}function eg(r,t){return r.asyncQueue.enqueue(async()=>function(n,s){const i=N(n);return i.persistence.runTransaction("Get named query","readonly",a=>i.Gr.getNamedQuery(a,s))}(await tr(r),t))}function ng(r,t){return r.asyncQueue.enqueue(async()=>async function(n,s){const i=N(n),a=i.indexManager,u=[];return i.persistence.runTransaction("Configure indexes","readwrite",c=>a.getFieldIndexes(c).next(h=>function(m,p,v,C,x){m=[...m],p=[...p],m.sort(v),p.sort(v);const V=m.length,U=p.length;let B=0,F=0;for(;B<U&&F<V;){const G=v(m[F],p[B]);G<0?x(m[F++]):G>0?C(p[B++]):(B++,F++)}for(;B<U;)C(p[B++]);for(;F<V;)x(m[F++])}(h,s,im,f=>{u.push(a.addFieldIndex(c,f))},f=>{u.push(a.deleteFieldIndex(c,f))})).next(()=>A.waitFor(u)))}(await tr(r),t))}function rg(r,t){return r.asyncQueue.enqueue(async()=>function(n,s){N(n).ss.zi=s}(await tr(r),t))}function sg(r){return r.asyncQueue.enqueue(async()=>function(e){const n=N(e),s=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",i=>s.deleteAllFieldIndexes(i))}(await tr(r)))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yd(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function va(r,t,e){if(!e)throw new D(b.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function Td(r,t,e,n){if(t===!0&&n===!0)throw new D(b.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function Wc(r){if(!M.isDocumentKey(r))throw new D(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Hc(r){if(M.isDocumentKey(r))throw new D(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Ai(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":L()}function $(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new D(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Ai(r);throw new D(b.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}function Id(r,t){if(t<=0)throw new D(b.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(t){var e,n;if(t.host===void 0){if(t.ssl!==void 0)throw new D(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Td("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=yd((n=t.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class ss{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Xc({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new D(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Xc(t),t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new vl;switch(n.type){case"firstParty":return new tm(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new D(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=$c.get(e);n&&(k("ComponentProvider","Removing Datastore"),$c.delete(e),n.terminate())}(this),Promise.resolve()}}function Ed(r,t,e,n={}){var s;const i=(r=$(r,ss))._getSettings(),a=`${t}:${e}`;if(i.host!=="firestore.googleapis.com"&&i.host!==a&&Kt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),n.mockUserToken){let u,c;if(typeof n.mockUserToken=="string")u=n.mockUserToken,c=wt.MOCK_USER;else{u=dl(n.mockUserToken,(s=r._app)===null||s===void 0?void 0:s.options.projectId);const h=n.mockUserToken.sub||n.mockUserToken.user_id;if(!h)throw new D(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new wt(h)}r._authCredentials=new Jf(new wl(u,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new At(this.firestore,t,this._query)}}class pt{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Wt(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new pt(this.firestore,t,this._key)}}class Wt extends At{constructor(t,e,n){super(t,e,$n(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new pt(this.firestore,null,new M(t))}withConverter(t){return new Wt(this.firestore,t,this._path)}}function ig(r,t,...e){if(r=ht(r),va("collection","path",t),r instanceof ss){const n=H.fromString(t,...e);return Hc(n),new Wt(r,null,n)}{if(!(r instanceof pt||r instanceof Wt))throw new D(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(H.fromString(t,...e));return Hc(n),new Wt(r.firestore,null,n)}}function og(r,t){if(r=$(r,ss),va("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new D(b.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new At(r,null,function(n){return new le(H.emptyPath(),n)}(t))}function wd(r,t,...e){if(r=ht(r),arguments.length===1&&(t=Fo.newId()),va("doc","path",t),r instanceof ss){const n=H.fromString(t,...e);return Wc(n),new pt(r,null,new M(n))}{if(!(r instanceof pt||r instanceof Wt))throw new D(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(H.fromString(t,...e));return Wc(n),new pt(r.firestore,r instanceof Wt?r.converter:null,new M(n))}}function ag(r,t){return r=ht(r),t=ht(t),(r instanceof pt||r instanceof Wt)&&(t instanceof pt||t instanceof Wt)&&r.firestore===t.firestore&&r.path===t.path&&r.converter===t.converter}function Aa(r,t){return r=ht(r),t=ht(t),r instanceof At&&t instanceof At&&r.firestore===t.firestore&&Jr(r._query,t._query)&&r.converter===t.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new oa(this,"async_queue_retry"),this.Vu=()=>{const n=Qs();n&&k("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=t;const e=Qs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const e=Qs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise(()=>{});const e=new vt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Pu.push(t),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!Me(t))throw t;k("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(t){const e=this.mu.then(()=>(this.du=!0,t().catch(n=>{this.Eu=n,this.du=!1;const s=function(a){let u=a.message||"";return a.stack&&(u=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),u}(n);throw gt("INTERNAL UNHANDLED ERROR: ",s),n}).then(n=>(this.du=!1,n))));return this.mu=e,e}enqueueAfterDelay(t,e,n){this.fu(),this.Ru.indexOf(t)>-1&&(e=0);const s=la.createAndSchedule(this,t,e,n,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&L()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const e of this.Tu)if(e.timerId===t)return!0;return!1}bu(t){return this.wu().then(()=>{this.Tu.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.Tu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.wu()})}Du(t){this.Ru.push(t)}yu(t){const e=this.Tu.indexOf(t);this.Tu.splice(e,1)}}function ko(r){return function(e,n){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1}(r,["next","error","complete"])}class vd{constructor(){this._progressObserver={},this._taskCompletionResolver=new vt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(t,e,n){this._progressObserver={next:t,error:e,complete:n}}catch(t){return this._taskCompletionResolver.promise.catch(t)}then(t,e){return this._taskCompletionResolver.promise.then(t,e)}_completeWith(t){this._updateProgress(t),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(t)}_failWith(t){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(t),this._taskCompletionResolver.reject(t)}_updateProgress(t){this._lastProgress=t,this._progressObserver.next&&this._progressObserver.next(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug=-1;class et extends ss{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new Jc,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Jc(t),this._firestoreClient=void 0,await t}}}function cg(r,t,e){e||(e="(default)");const n=Oo(r,"firestore");if(n.isInitialized(e)){const s=n.getImmediate({identifier:e}),i=n.getOptions(e);if(ci(i,t))return s;throw new D(b.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(t.cacheSizeBytes!==void 0&&t.localCache!==void 0)throw new D(b.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(t.cacheSizeBytes!==void 0&&t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:t,instanceIdentifier:e})}function lg(r,t){const e=typeof r=="object"?r:fl(),n=typeof r=="string"?r:t||"(default)",s=Oo(e,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=ml("firestore");i&&Ed(s,...i)}return s}function dt(r){if(r._terminated)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Ad(r),r._firestoreClient}function Ad(r){var t,e,n;const s=r._freezeSettings(),i=function(u,c,h,f){return new Dm(u,c,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,yd(f.experimentalLongPollingOptions),f.useFetchStreams)}(r._databaseId,((t=r._app)===null||t===void 0?void 0:t.options.appId)||"",r._persistenceKey,s);r._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((n=s.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),r._firestoreClient=new $p(r._authCredentials,r._appCheckCredentials,r._queue,i,r._componentsProvider&&function(u){const c=u?._online.build();return{_offline:u?._offline.build(c),_online:c}}(r._componentsProvider))}function hg(r,t){Kt("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();return Rd(r,ke.provider,{build:n=>new Ia(n,e.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()}async function dg(r){Kt("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();Rd(r,ke.provider,{build:e=>new dd(e,t.cacheSizeBytes)})}function Rd(r,t,e){if((r=$(r,et))._firestoreClient||r._terminated)throw new D(b.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new D(b.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:t,_offline:e},Ad(r)}function fg(r){if(r._initialized&&!r._terminated)throw new D(b.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new vt;return r._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(n){if(!Yt.D())return Promise.resolve();const s=n+"main";await Yt.delete(s)}(ra(r._databaseId,r._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function mg(r){return function(e){const n=new vt;return e.asyncQueue.enqueueAndForget(async()=>xp(await wa(e),n)),n.promise}(dt(r=$(r,et)))}function _g(r){return Wp(dt(r=$(r,et)))}function pg(r){return Hp(dt(r=$(r,et)))}function gg(r){return Wf(r.app,"firestore",r._databaseId.database),r._delete()}function yg(r,t){const e=dt(r=$(r,et)),n=new vd;return tg(e,r._databaseId,t,n),n}function Tg(r,t){return eg(dt(r=$(r,et)),t).then(e=>e?new At(r,null,e.query):null)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(t="count",e){this._internalFieldPath=e,this.type="AggregateField",this.aggregateType=t}}class Pd{constructor(t,e,n){this._userDataWriter=e,this._data=n,this.type="AggregateQuerySnapshot",this.query=t}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ne(ft.fromBase64String(t))}catch(e){throw new D(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ne(ft.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new D(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ot(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}function Ig(){return new Ue("__name__")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new D(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new D(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return K(this._lat,t._lat)||K(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eg=/^__.*__$/;class wg{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new de(t,this.data,this.fieldMask,e,this.fieldTransforms):new Wn(t,this.data,e,this.fieldTransforms)}}class bd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new de(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Sd(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}class Pi{constructor(t,e,n,s,i,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new Pi(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Fu({path:n,xu:!1});return s.Ou(t),s}Nu(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Fu({path:n,xu:!1});return s.vu(),s}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return ai(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(t.length===0)throw this.Bu("Document fields must not be empty");if(Sd(this.Cu)&&Eg.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class vg{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||ns(t)}Qu(t,e,n,s=!1){return new Pi({Cu:t,methodName:e,qu:n,path:ot.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function dn(r){const t=r._freezeSettings(),e=ns(r._databaseId);return new vg(r._databaseId,!!t.ignoreUndefinedProperties,e)}function bi(r,t,e,n,s,i={}){const a=r.Qu(i.merge||i.mergeFields?2:0,t,e,s);xa("Data must be an object, but it was:",a,n);const u=xd(n,a);let c,h;if(i.merge)c=new qt(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const p=$r(t,m,e);if(!a.contains(p))throw new D(b.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);kd(f,p)||f.push(p)}c=new qt(f),h=a.fieldTransforms.filter(m=>c.covers(m.field))}else c=null,h=a.fieldTransforms;return new wg(new bt(u),c,h)}class os extends Be{_toFieldTransform(t){if(t.Cu!==2)throw t.Cu===1?t.Bu(`${this._methodName}() can only appear at the top level of your update data`):t.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof os}}function Vd(r,t,e){return new Pi({Cu:3,qu:t.settings.qu,methodName:r._methodName,xu:e},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class Ra extends Be{_toFieldTransform(t){return new Zr(t.path,new Mn)}isEqual(t){return t instanceof Ra}}class Pa extends Be{constructor(t,e){super(t),this.Ku=e}_toFieldTransform(t){const e=Vd(this,t,!0),n=this.Ku.map(i=>fn(i,e)),s=new rn(n);return new Zr(t.path,s)}isEqual(t){return t instanceof Pa&&ci(this.Ku,t.Ku)}}class ba extends Be{constructor(t,e){super(t),this.Ku=e}_toFieldTransform(t){const e=Vd(this,t,!0),n=this.Ku.map(i=>fn(i,e)),s=new sn(n);return new Zr(t.path,s)}isEqual(t){return t instanceof ba&&ci(this.Ku,t.Ku)}}class Sa extends Be{constructor(t,e){super(t),this.$u=e}_toFieldTransform(t){const e=new Fn(t.serializer,ih(t.serializer,this.$u));return new Zr(t.path,e)}isEqual(t){return t instanceof Sa&&this.$u===t.$u}}function Va(r,t,e,n){const s=r.Qu(1,t,e);xa("Data must be an object, but it was:",s,n);const i=[],a=bt.empty();Fe(n,(c,h)=>{const f=Si(t,c,e);h=ht(h);const m=s.Nu(f);if(h instanceof os)i.push(f);else{const p=fn(h,m);p!=null&&(i.push(f),a.set(f,p))}});const u=new qt(i);return new bd(a,u,s.fieldTransforms)}function Ca(r,t,e,n,s,i){const a=r.Qu(1,t,e),u=[$r(t,n,e)],c=[s];if(i.length%2!=0)throw new D(b.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<i.length;p+=2)u.push($r(t,i[p])),c.push(i[p+1]);const h=[],f=bt.empty();for(let p=u.length-1;p>=0;--p)if(!kd(h,u[p])){const v=u[p];let C=c[p];C=ht(C);const x=a.Nu(v);if(C instanceof os)h.push(v);else{const V=fn(C,x);V!=null&&(h.push(v),f.set(v,V))}}const m=new qt(h);return new bd(f,m,a.fieldTransforms)}function Cd(r,t,e,n=!1){return fn(e,r.Qu(n?4:3,t))}function fn(r,t){if(Dd(r=ht(r)))return xa("Unsupported field value:",t,r),xd(r,t);if(r instanceof Be)return function(n,s){if(!Sd(s.Cu))throw s.Bu(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.xu&&t.Cu!==4)throw t.Bu("Nested arrays are not supported");return function(n,s){const i=[];let a=0;for(const u of n){let c=fn(u,s.Lu(a));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),a++}return{arrayValue:{values:i}}}(r,t)}return function(n,s){if((n=ht(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return ih(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=lt.fromDate(n);return{timestampValue:Ln(s.serializer,i)}}if(n instanceof lt){const i=new lt(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Ln(s.serializer,i)}}if(n instanceof Ri)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ne)return{bytesValue:yh(s.serializer,n._byteString)};if(n instanceof pt){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Xo(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof is)return function(a,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(c=>{if(typeof c!="number")throw u.Bu("VectorValues must only contain numeric values.");return jo(u.serializer,c)})}}}}}}(n,s);throw s.Bu(`Unsupported field value: ${Ai(n)}`)}(r,t)}function xd(r,t){const e={};return Fl(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Fe(r,(n,s)=>{const i=fn(s,t.Mu(n));i!=null&&(e[n]=i)}),{mapValue:{fields:e}}}function Dd(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof lt||r instanceof Ri||r instanceof Ne||r instanceof pt||r instanceof Be||r instanceof is)}function xa(r,t,e){if(!Dd(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const n=Ai(e);throw n==="an object"?t.Bu(r+" a custom object"):t.Bu(r+" "+n)}}function $r(r,t,e){if((t=ht(t))instanceof Ue)return t._internalPath;if(typeof t=="string")return Si(r,t);throw ai("Field path arguments must be of type string or ",r,!1,void 0,e)}const Ag=new RegExp("[~\\*/\\[\\]]");function Si(r,t,e){if(t.search(Ag)>=0)throw ai(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new Ue(...t.split("."))._internalPath}catch{throw ai(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function ai(r,t,e,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${n}`),a&&(c+=` in document ${s}`),c+=")"),new D(b.INVALID_ARGUMENT,u+r+c)}function kd(r,t){return r.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new pt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Rg(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Vi("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Rg extends Wr{data(){return super.data()}}function Vi(r,t){return typeof t=="string"?Si(r,t):t instanceof Ue?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nd(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new D(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Da{}class er extends Da{}function Pg(r,t,...e){let n=[];t instanceof Da&&n.push(t),n=n.concat(e),function(i){const a=i.filter(c=>c instanceof mn).length,u=i.filter(c=>c instanceof nr).length;if(a>1||a>0&&u>0)throw new D(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class nr extends er{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new nr(t,e,n)}_apply(t){const e=this._parse(t);return Md(t._query,e),new At(t.firestore,t.converter,Eo(t._query,e))}_parse(t){const e=dn(t.firestore);return function(i,a,u,c,h,f,m){let p;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new D(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Zc(m,f);const v=[];for(const C of m)v.push(Yc(c,i,C));p={arrayValue:{values:v}}}else p=Yc(c,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Zc(m,f),p=Cd(u,a,m,f==="in"||f==="not-in");return X.create(h,f,p)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function bg(r,t,e){const n=t,s=Vi("where",r);return nr._create(s,n,e)}class mn extends Da{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new mn(t,e)}_parse(t){const e=this._queryConstraints.map(n=>n._parse(t)).filter(n=>n.getFilters().length>0);return e.length===1?e[0]:Z.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,i){let a=s;const u=i.getFlattenedFilters();for(const c of u)Md(a,c),a=Eo(a,c)}(t._query,e),new At(t.firestore,t.converter,Eo(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Sg(...r){return r.forEach(t=>Fd("or",t)),mn._create("or",r)}function Vg(...r){return r.forEach(t=>Fd("and",t)),mn._create("and",r)}class Ci extends er{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Ci(t,e)}_apply(t){const e=function(s,i,a){if(s.startAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new jr(i,a)}(t._query,this._field,this._direction);return new At(t.firestore,t.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new le(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(t._query,e))}}function Cg(r,t="asc"){const e=t,n=Vi("orderBy",r);return Ci._create(n,e)}class as extends er{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new as(t,e,n)}_apply(t){return new At(t.firestore,t.converter,Js(t._query,this._limit,this._limitType))}}function xg(r){return Id("limit",r),as._create("limit",r,"F")}function Dg(r){return Id("limitToLast",r),as._create("limitToLast",r,"L")}class us extends er{constructor(t,e,n){super(),this.type=t,this._docOrFields=e,this._inclusive=n}static _create(t,e,n){return new us(t,e,n)}_apply(t){const e=Od(t,this.type,this._docOrFields,this._inclusive);return new At(t.firestore,t.converter,function(s,i){return new le(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)}(t._query,e))}}function kg(...r){return us._create("startAt",r,!0)}function Ng(...r){return us._create("startAfter",r,!1)}class cs extends er{constructor(t,e,n){super(),this.type=t,this._docOrFields=e,this._inclusive=n}static _create(t,e,n){return new cs(t,e,n)}_apply(t){const e=Od(t,this.type,this._docOrFields,this._inclusive);return new At(t.firestore,t.converter,function(s,i){return new le(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,s.startAt,i)}(t._query,e))}}function Og(...r){return cs._create("endBefore",r,!1)}function Mg(...r){return cs._create("endAt",r,!0)}function Od(r,t,e,n){if(e[0]=ht(e[0]),e[0]instanceof Wr)return function(i,a,u,c,h){if(!c)throw new D(b.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${u}().`);const f=[];for(const m of Vn(i))if(m.field.isKeyField())f.push(en(a,c.key));else{const p=c.data.field(m.field);if(hi(p))throw new D(b.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(p===null){const v=m.field.canonicalString();throw new D(b.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${v}' (used as the orderBy) does not exist.`)}f.push(p)}return new Ce(f,h)}(r._query,r.firestore._databaseId,t,e[0]._document,n);{const s=dn(r.firestore);return function(a,u,c,h,f,m){const p=a.explicitOrderBy;if(f.length>p.length)throw new D(b.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const v=[];for(let C=0;C<f.length;C++){const x=f[C];if(p[C].field.isKeyField()){if(typeof x!="string")throw new D(b.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof x}`);if(!zo(a)&&x.indexOf("/")!==-1)throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${x}' contains a slash.`);const V=a.path.child(H.fromString(x));if(!M.isDocumentKey(V))throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${V}' is not because it contains an odd number of segments.`);const U=new M(V);v.push(en(u,U))}else{const V=Cd(c,h,x);v.push(V)}}return new Ce(v,m)}(r._query,r.firestore._databaseId,s,t,e,n)}}function Yc(r,t,e){if(typeof(e=ht(e))=="string"){if(e==="")throw new D(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!zo(t)&&e.indexOf("/")!==-1)throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(H.fromString(e));if(!M.isDocumentKey(n))throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return en(r,new M(n))}if(e instanceof pt)return en(r,e._key);throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ai(e)}.`)}function Zc(r,t){if(!Array.isArray(r)||r.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Md(r,t){const e=function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function Fd(r,t){if(!(t instanceof nr||t instanceof mn))throw new D(b.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class ka{convertValue(t,e="none"){switch(Se(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ut(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ce(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw L()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Fe(t,(s,i)=>{n[s]=this.convertValue(i,e)}),n}convertVectorValue(t){var e,n,s;const i=(s=(n=(e=t.fields)===null||e===void 0?void 0:e.value.arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.map(a=>ut(a.doubleValue));return new is(i)}convertGeoPoint(t){return new Ri(ut(t.latitude),ut(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=di(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(qr(t));default:return null}}convertTimestamp(t){const e=ue(t);return new lt(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=H.fromString(t);q(Vh(n));const s=new be(n.get(1),n.get(3)),i=new M(n.popFirst(5));return s.isEqual(e)||gt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xi(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}class Fg extends ka{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ne(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new pt(this.firestore,null,e)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lg(r){return new Kn("sum",$r("sum",r))}function Ug(r){return new Kn("avg",$r("average",r))}function Ld(){return new Kn("count")}function Bg(r,t){var e,n;return r instanceof Kn&&t instanceof Kn&&r.aggregateType===t.aggregateType&&((e=r._internalFieldPath)===null||e===void 0?void 0:e.canonicalString())===((n=t._internalFieldPath)===null||n===void 0?void 0:n.canonicalString())}function qg(r,t){return Aa(r.query,t.query)&&ci(r.data(),t.data())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class cn extends Wr{constructor(t,e,n,s,i,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Fr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Vi("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class Fr extends cn{data(t={}){return super.data(t)}}class ln{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Re(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new Fr(this._firestore,this._userDataWriter,n.key,n,new Re(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new D(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const c=new Fr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Re(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const c=new Fr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Re(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return u.type!==0&&(h=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),f=a.indexOf(u.doc.key)),{type:zg(u.type),doc:c,oldIndex:h,newIndex:f}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function zg(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}function Gg(r,t){return r instanceof cn&&t instanceof cn?r._firestore===t._firestore&&r._key.isEqual(t._key)&&(r._document===null?t._document===null:r._document.isEqual(t._document))&&r._converter===t._converter:r instanceof ln&&t instanceof ln&&r._firestore===t._firestore&&Aa(r.query,t.query)&&r.metadata.isEqual(t.metadata)&&r._snapshot.isEqual(t._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jg(r){r=$(r,pt);const t=$(r.firestore,et);return pd(dt(t),r._key).then(e=>Na(t,r,e))}class qe extends ka{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ne(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new pt(this.firestore,null,e)}}function Kg(r){r=$(r,pt);const t=$(r.firestore,et),e=dt(t),n=new qe(t);return Xp(e,r._key).then(s=>new cn(t,n,r._key,s,new Re(s!==null&&s.hasLocalMutations,!0),r.converter))}function Qg(r){r=$(r,pt);const t=$(r.firestore,et);return pd(dt(t),r._key,{source:"server"}).then(e=>Na(t,r,e))}function $g(r){r=$(r,At);const t=$(r.firestore,et),e=dt(t),n=new qe(t);return Nd(r._query),gd(e,r._query).then(s=>new ln(t,n,r,s))}function Wg(r){r=$(r,At);const t=$(r.firestore,et),e=dt(t),n=new qe(t);return Jp(e,r._query).then(s=>new ln(t,n,r,s))}function Hg(r){r=$(r,At);const t=$(r.firestore,et),e=dt(t),n=new qe(t);return gd(e,r._query,{source:"server"}).then(s=>new ln(t,n,r,s))}function Xg(r,t,e){r=$(r,pt);const n=$(r.firestore,et),s=xi(r.converter,t,e);return rr(n,[bi(dn(n),"setDoc",r._key,s,r.converter!==null,e).toMutation(r._key,ct.none())])}function Jg(r,t,e,...n){r=$(r,pt);const s=$(r.firestore,et),i=dn(s);let a;return a=typeof(t=ht(t))=="string"||t instanceof Ue?Ca(i,"updateDoc",r._key,t,e,n):Va(i,"updateDoc",r._key,t),rr(s,[a.toMutation(r._key,ct.exists(!0))])}function Yg(r){return rr($(r.firestore,et),[new Hn(r._key,ct.none())])}function Zg(r,t){const e=$(r.firestore,et),n=wd(r),s=xi(r.converter,t);return rr(e,[bi(dn(r.firestore),"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,ct.exists(!1))]).then(()=>n)}function ty(r,...t){var e,n,s;r=ht(r);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof t[a]!="object"||ko(t[a])||(i=t[a],a++);const u={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(ko(t[a])){const m=t[a];t[a]=(e=m.next)===null||e===void 0?void 0:e.bind(m),t[a+1]=(n=m.error)===null||n===void 0?void 0:n.bind(m),t[a+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let c,h,f;if(r instanceof pt)h=$(r.firestore,et),f=$n(r._key.path),c={next:m=>{t[a]&&t[a](Na(h,r,m))},error:t[a+1],complete:t[a+2]};else{const m=$(r,At);h=$(m.firestore,et),f=m._query;const p=new qe(h);c={next:v=>{t[a]&&t[a](new ln(h,p,m,v))},error:t[a+1],complete:t[a+2]},Nd(r._query)}return function(p,v,C,x){const V=new wi(x),U=new ma(v,V,C);return p.asyncQueue.enqueueAndForget(async()=>ha(await jn(p),U)),()=>{V.Za(),p.asyncQueue.enqueueAndForget(async()=>da(await jn(p),U))}}(dt(h),f,u,c)}function ey(r,t){return Zp(dt(r=$(r,et)),ko(t)?t:{next:t})}function rr(r,t){return function(n,s){const i=new vt;return n.asyncQueue.enqueueAndForget(async()=>bp(await wa(n),s,i)),i.promise}(dt(r),t)}function Na(r,t,e){const n=e.docs.get(t._key),s=new qe(r);return new cn(r,s,t._key,n,new Re(e.hasPendingWrites,e.fromCache),t.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ny(r){return Ud(r,{count:Ld()})}function Ud(r,t){const e=$(r.firestore,et),n=dt(e),s=Ml(t,(i,a)=>new dh(a,i.aggregateType,i._internalFieldPath));return Yp(n,r._query,s).then(i=>function(u,c,h){const f=new qe(u);return new Pd(c,f,h)}(e,r,i))}class ry{constructor(t){this.kind="memory",this._onlineComponentProvider=ke.provider,t?.garbageCollector?this._offlineComponentProvider=t.garbageCollector._offlineComponentProvider:this._offlineComponentProvider=De.provider}toJSON(){return{kind:this.kind}}}class sy{constructor(t){let e;this.kind="persistent",t?.tabManager?(t.tabManager._initialize(t),e=t.tabManager):(e=Bd(void 0),e._initialize(t)),this._onlineComponentProvider=e._onlineComponentProvider,this._offlineComponentProvider=e._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class iy{constructor(){this.kind="memoryEager",this._offlineComponentProvider=De.provider}toJSON(){return{kind:this.kind}}}class oy{constructor(t){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Gp(t)}}toJSON(){return{kind:this.kind}}}function ay(){return new iy}function uy(r){return new oy(r?.cacheSizeBytes)}function cy(r){return new ry(r)}function ly(r){return new sy(r)}class hy{constructor(t){this.forceOwnership=t,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=ke.provider,this._offlineComponentProvider={build:e=>new Ia(e,t?.cacheSizeBytes,this.forceOwnership)}}}class dy{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=ke.provider,this._offlineComponentProvider={build:e=>new dd(e,t?.cacheSizeBytes)}}}function Bd(r){return new hy(r?.forceOwnership)}function fy(){return new dy}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const my={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=dn(t)}set(t,e,n){this._verifyNotCommitted();const s=we(t,this._firestore),i=xi(s.converter,e,n),a=bi(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(a.toMutation(s._key,ct.none())),this}update(t,e,n,...s){this._verifyNotCommitted();const i=we(t,this._firestore);let a;return a=typeof(e=ht(e))=="string"||e instanceof Ue?Ca(this._dataReader,"WriteBatch.update",i._key,e,n,s):Va(this._dataReader,"WriteBatch.update",i._key,e),this._mutations.push(a.toMutation(i._key,ct.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=we(t,this._firestore);return this._mutations=this._mutations.concat(new Hn(e._key,ct.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(b.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function we(r,t){if((r=ht(r)).firestore!==t)throw new D(b.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd extends class{constructor(e,n){this._firestore=e,this._transaction=n,this._dataReader=dn(e)}get(e){const n=we(e,this._firestore),s=new Fg(this._firestore);return this._transaction.lookup([n._key]).then(i=>{if(!i||i.length!==1)return L();const a=i[0];if(a.isFoundDocument())return new Wr(this._firestore,s,a.key,a,n.converter);if(a.isNoDocument())return new Wr(this._firestore,s,n._key,null,n.converter);throw L()})}set(e,n,s){const i=we(e,this._firestore),a=xi(i.converter,n,s),u=bi(this._dataReader,"Transaction.set",i._key,a,i.converter!==null,s);return this._transaction.set(i._key,u),this}update(e,n,s,...i){const a=we(e,this._firestore);let u;return u=typeof(n=ht(n))=="string"||n instanceof Ue?Ca(this._dataReader,"Transaction.update",a._key,n,s,i):Va(this._dataReader,"Transaction.update",a._key,n),this._transaction.update(a._key,u),this}delete(e){const n=we(e,this._firestore);return this._transaction.delete(n._key),this}}{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=we(t,this._firestore),n=new qe(this._firestore);return super.get(t).then(s=>new cn(this._firestore,n,e._key,s._document,new Re(!1,!1),e.converter))}}function _y(r,t,e){r=$(r,et);const n=Object.assign(Object.assign({},my),e);return function(i){if(i.maxAttempts<1)throw new D(b.INVALID_ARGUMENT,"Max attempts must be at least 1")}(n),function(i,a,u){const c=new vt;return i.asyncQueue.enqueueAndForget(async()=>{const h=await _d(i);new Qp(i.asyncQueue,h,u,a,c).au()}),c.promise}(dt(r),s=>t(new zd(r,s)),n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function py(){return new os("deleteField")}function gy(){return new Ra("serverTimestamp")}function yy(...r){return new Pa("arrayUnion",r)}function Ty(...r){return new ba("arrayRemove",r)}function Iy(r){return new Sa("increment",r)}function Ey(r){return new is(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wy(r){return dt(r=$(r,et)),new qd(r,t=>rr(r,t))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vy(r,t){const e=dt(r=$(r,et));if(!e._uninitializedComponentsProvider||e._uninitializedComponentsProvider._offline.kind==="memory")return Kt("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=function(i){const a=typeof i=="string"?function(h){try{return JSON.parse(h)}catch(f){throw new D(b.INVALID_ARGUMENT,"Failed to parse JSON: "+f?.message)}}(i):i,u=[];if(Array.isArray(a.indexes))for(const c of a.indexes){const h=tl(c,"collectionGroup"),f=[];if(Array.isArray(c.fields))for(const m of c.fields){const p=Si("setIndexConfiguration",tl(m,"fieldPath"));m.arrayConfig==="CONTAINS"?f.push(new Ze(p,2)):m.order==="ASCENDING"?f.push(new Ze(p,0)):m.order==="DESCENDING"&&f.push(new Ze(p,1))}u.push(new Dn(Dn.UNKNOWN_ID,h,f,kn.empty()))}return u}(t);return ng(e,n)}function tl(r,t){if(typeof r[t]!="string")throw new D(b.INVALID_ARGUMENT,"Missing string value for: "+t);return r[t]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(t){this._firestore=t,this.type="PersistentCacheIndexManager"}}function Ay(r){var t;r=$(r,et);const e=el.get(r);if(e)return e;if(((t=dt(r)._uninitializedComponentsProvider)===null||t===void 0?void 0:t._offline.kind)!=="persistent")return null;const n=new Gd(r);return el.set(r,n),n}function Ry(r){jd(r,!0)}function Py(r){jd(r,!1)}function by(r){sg(dt(r._firestore)).then(t=>k("deleting all persistent cache indexes succeeded")).catch(t=>Kt("deleting all persistent cache indexes failed",t))}function jd(r,t){rg(dt(r._firestore),t).then(e=>k(`setting persistent cache index auto creation isEnabled=${t} succeeded`)).catch(e=>Kt(`setting persistent cache index auto creation isEnabled=${t} failed`,e))}const el=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sy(r){var t;const e=(t=dt($(r.firestore,et))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return e===void 0?null:pi(e,Ot(r._query))._t}function Vy(r,t){var e;const n=Ml(t,(i,a)=>new dh(a,i.aggregateType,i._internalFieldPath)),s=(e=dt($(r.firestore,et))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return s===void 0?null:Rh(s,Xl(r._query),n,!0).request}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cy{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(t){return Oa.instance.onExistenceFilterMismatch(t)}}class Oa{constructor(){this.Uu=new Map}static get instance(){return Ms||(Ms=new Oa,function(e){if(Ys)throw new Error("a TestingHooksSpi instance is already set");Ys=e}(Ms)),Ms}et(t){this.Uu.forEach(e=>e(t))}onExistenceFilterMismatch(t){const e=Symbol(),n=this.Uu;return n.set(e,t),()=>n.delete(e)}}let Ms=null;(function(t,e=!0){(function(s){Qn=s})(_l),ul(new cl("firestore",(n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),u=new et(new Yf(n.getProvider("auth-internal")),new em(n.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new D(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new be(h.options.projectId,f)}(a,s),a);return i=Object.assign({useFetchStreams:e},i),u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),$s(ju,"4.7.3",t),$s(ju,"4.7.3","esm2017")})();const HT=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:ka,AggregateField:Kn,AggregateQuerySnapshot:Pd,Bytes:Ne,CACHE_SIZE_UNLIMITED:ug,CollectionReference:Wt,DocumentReference:pt,DocumentSnapshot:cn,FieldPath:Ue,FieldValue:Be,Firestore:et,FirestoreError:D,GeoPoint:Ri,LoadBundleTask:vd,PersistentCacheIndexManager:Gd,Query:At,QueryCompositeFilterConstraint:mn,QueryConstraint:er,QueryDocumentSnapshot:Fr,QueryEndAtConstraint:cs,QueryFieldFilterConstraint:nr,QueryLimitConstraint:as,QueryOrderByConstraint:Ci,QuerySnapshot:ln,QueryStartAtConstraint:us,SnapshotMetadata:Re,Timestamp:lt,Transaction:zd,VectorValue:is,WriteBatch:qd,_AutoId:Fo,_ByteString:ft,_DatabaseId:be,_DocumentKey:M,_EmptyAppCheckTokenProvider:nm,_EmptyAuthCredentialsProvider:vl,_FieldPath:ot,_TestingHooks:Cy,_cast:$,_debugAssert:Xf,_internalAggregationQueryToProtoRunAggregationQueryRequest:Vy,_internalQueryToProtoQueryTarget:Sy,_isBase64Available:Cm,_logWarn:Kt,_validateIsNotUsedTogether:Td,addDoc:Zg,aggregateFieldEqual:Bg,aggregateQuerySnapshotEqual:qg,and:Vg,arrayRemove:Ty,arrayUnion:yy,average:Ug,clearIndexedDbPersistence:fg,collection:ig,collectionGroup:og,connectFirestoreEmulator:Ed,count:Ld,deleteAllPersistentCacheIndexes:by,deleteDoc:Yg,deleteField:py,disableNetwork:pg,disablePersistentCacheIndexAutoCreation:Py,doc:wd,documentId:Ig,enableIndexedDbPersistence:hg,enableMultiTabIndexedDbPersistence:dg,enableNetwork:_g,enablePersistentCacheIndexAutoCreation:Ry,endAt:Mg,endBefore:Og,ensureFirestoreConfigured:dt,executeWrite:rr,getAggregateFromServer:Ud,getCountFromServer:ny,getDoc:jg,getDocFromCache:Kg,getDocFromServer:Qg,getDocs:$g,getDocsFromCache:Wg,getDocsFromServer:Hg,getFirestore:lg,getPersistentCacheIndexManager:Ay,increment:Iy,initializeFirestore:cg,limit:xg,limitToLast:Dg,loadBundle:yg,memoryEagerGarbageCollector:ay,memoryLocalCache:cy,memoryLruGarbageCollector:uy,namedQuery:Tg,onSnapshot:ty,onSnapshotsInSync:ey,or:Sg,orderBy:Cg,persistentLocalCache:ly,persistentMultipleTabManager:fy,persistentSingleTabManager:Bd,query:Pg,queryEqual:Aa,refEqual:ag,runTransaction:_y,serverTimestamp:gy,setDoc:Xg,setIndexConfiguration:vy,setLogLevel:Hf,snapshotEqual:Gg,startAfter:Ng,startAt:kg,sum:Lg,terminate:gg,updateDoc:Jg,vector:Ey,waitForPendingWrites:mg,where:bg,writeBatch:wy},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd="firebasestorage.googleapis.com",Qd="storageBucket",xy=2*60*1e3,Dy=10*60*1e3,ky=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt extends ll{constructor(t,e,n=0){super(co(t),`Firebase Storage: ${e} (${co(t)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,mt.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return co(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var at;(function(r){r.UNKNOWN="unknown",r.OBJECT_NOT_FOUND="object-not-found",r.BUCKET_NOT_FOUND="bucket-not-found",r.PROJECT_NOT_FOUND="project-not-found",r.QUOTA_EXCEEDED="quota-exceeded",r.UNAUTHENTICATED="unauthenticated",r.UNAUTHORIZED="unauthorized",r.UNAUTHORIZED_APP="unauthorized-app",r.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",r.INVALID_CHECKSUM="invalid-checksum",r.CANCELED="canceled",r.INVALID_EVENT_NAME="invalid-event-name",r.INVALID_URL="invalid-url",r.INVALID_DEFAULT_BUCKET="invalid-default-bucket",r.NO_DEFAULT_BUCKET="no-default-bucket",r.CANNOT_SLICE_BLOB="cannot-slice-blob",r.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",r.NO_DOWNLOAD_URL="no-download-url",r.INVALID_ARGUMENT="invalid-argument",r.INVALID_ARGUMENT_COUNT="invalid-argument-count",r.APP_DELETED="app-deleted",r.INVALID_ROOT_OPERATION="invalid-root-operation",r.INVALID_FORMAT="invalid-format",r.INTERNAL_ERROR="internal-error",r.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(at||(at={}));function co(r){return"storage/"+r}function Ma(){const r="An unknown error occurred, please check the error payload for server response.";return new mt(at.UNKNOWN,r)}function Ny(r){return new mt(at.OBJECT_NOT_FOUND,"Object '"+r+"' does not exist.")}function Oy(r){return new mt(at.QUOTA_EXCEEDED,"Quota for bucket '"+r+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function My(){const r="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new mt(at.UNAUTHENTICATED,r)}function Fy(){return new mt(at.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Ly(r){return new mt(at.UNAUTHORIZED,"User does not have permission to access '"+r+"'.")}function $d(){return new mt(at.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Wd(){return new mt(at.CANCELED,"User canceled the upload/download.")}function Uy(r){return new mt(at.INVALID_URL,"Invalid URL '"+r+"'.")}function By(r){return new mt(at.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.")}function qy(){return new mt(at.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Qd+"' property when initializing the app?")}function Hd(){return new mt(at.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function zy(){return new mt(at.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function Gy(){return new mt(at.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function jy(r){return new mt(at.UNSUPPORTED_ENVIRONMENT,`${r} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function No(r){return new mt(at.INVALID_ARGUMENT,r)}function Xd(){return new mt(at.APP_DELETED,"The Firebase app was deleted.")}function Ky(r){return new mt(at.INVALID_ROOT_OPERATION,"The operation '"+r+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Lr(r,t){return new mt(at.INVALID_FORMAT,"String does not match format '"+r+"': "+t)}function br(r){throw new mt(at.INTERNAL_ERROR,"Internal error: "+r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let n;try{n=jt.makeFromUrl(t,e)}catch{return new jt(t,"")}if(n.path==="")return n;throw By(t)}static makeFromUrl(t,e){let n=null;const s="([A-Za-z0-9.\\-_]+)";function i(G){G.path.charAt(G.path.length-1)==="/"&&(G.path_=G.path_.slice(0,-1))}const a="(/(.*))?$",u=new RegExp("^gs://"+s+a,"i"),c={bucket:1,path:3};function h(G){G.path_=decodeURIComponent(G.path)}const f="v[A-Za-z0-9_]+",m=e.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",v=new RegExp(`^https?://${m}/${f}/b/${s}/o${p}`,"i"),C={bucket:1,path:3},x=e===Kd?"(?:storage.googleapis.com|storage.cloud.google.com)":e,V="([^?#]*)",U=new RegExp(`^https?://${x}/${s}/${V}`,"i"),F=[{regex:u,indices:c,postModify:i},{regex:v,indices:C,postModify:h},{regex:U,indices:{bucket:1,path:2},postModify:h}];for(let G=0;G<F.length;G++){const W=F[G],j=W.regex.exec(t);if(j){const I=j[W.indices.bucket];let g=j[W.indices.path];g||(g=""),n=new jt(I,g),W.postModify(n);break}}if(n==null)throw Uy(t);return n}}class Qy{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $y(r,t,e){let n=1,s=null,i=null,a=!1,u=0;function c(){return u===2}let h=!1;function f(...V){h||(h=!0,t.apply(null,V))}function m(V){s=setTimeout(()=>{s=null,r(v,c())},V)}function p(){i&&clearTimeout(i)}function v(V,...U){if(h){p();return}if(V){p(),f.call(null,V,...U);return}if(c()||a){p(),f.call(null,V,...U);return}n<64&&(n*=2);let F;u===1?(u=2,F=0):F=(n+Math.random())*1e3,m(F)}let C=!1;function x(V){C||(C=!0,p(),!h&&(s!==null?(V||(u=2),clearTimeout(s),m(0)):V||(u=1)))}return m(0),i=setTimeout(()=>{a=!0,x(!0)},e),x}function Wy(r){r(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hy(r){return r!==void 0}function Xy(r){return typeof r=="function"}function Jy(r){return typeof r=="object"&&!Array.isArray(r)}function Di(r){return typeof r=="string"||r instanceof String}function nl(r){return Fa()&&r instanceof Blob}function Fa(){return typeof Blob<"u"}function rl(r,t,e,n){if(n<t)throw No(`Invalid value for '${r}'. Expected ${t} or greater.`);if(n>e)throw No(`Invalid value for '${r}'. Expected ${e} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sr(r,t,e){let n=t;return e==null&&(n=`https://${t}`),`${e}://${n}/v0${r}`}function Jd(r){const t=encodeURIComponent;let e="?";for(const n in r)if(r.hasOwnProperty(n)){const s=t(n)+"="+t(r[n]);e=e+s+"&"}return e=e.slice(0,-1),e}var tn;(function(r){r[r.NO_ERROR=0]="NO_ERROR",r[r.NETWORK_ERROR=1]="NETWORK_ERROR",r[r.ABORT=2]="ABORT"})(tn||(tn={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yd(r,t){const e=r>=500&&r<600,s=[408,429].indexOf(r)!==-1,i=t.indexOf(r)!==-1;return e||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(t,e,n,s,i,a,u,c,h,f,m,p=!0){this.url_=t,this.method_=e,this.headers_=n,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=u,this.errorCallback_=c,this.timeout_=h,this.progressCallback_=f,this.connectionFactory_=m,this.retry=p,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((v,C)=>{this.resolve_=v,this.reject_=C,this.start_()})}start_(){const t=(n,s)=>{if(s){n(!1,new Fs(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const a=u=>{const c=u.loaded,h=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,h)};this.progressCallback_!==null&&i.addUploadProgressListener(a),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(a),this.pendingConnection_=null;const u=i.getErrorCode()===tn.NO_ERROR,c=i.getStatus();if(!u||Yd(c,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===tn.ABORT;n(!1,new Fs(!1,null,f));return}const h=this.successCodes_.indexOf(c)!==-1;n(!0,new Fs(h,i))})},e=(n,s)=>{const i=this.resolve_,a=this.reject_,u=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(u,u.getResponse());Hy(c)?i(c):i()}catch(c){a(c)}else if(u!==null){const c=Ma();c.serverResponse=u.getErrorText(),this.errorCallback_?a(this.errorCallback_(u,c)):a(c)}else if(s.canceled){const c=this.appDelete_?Xd():Wd();a(c)}else{const c=$d();a(c)}};this.canceled_?e(!1,new Fs(!1,null,!0)):this.backoffId_=$y(t,e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&Wy(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Fs{constructor(t,e,n){this.wasSuccessCode=t,this.connection=e,this.canceled=!!n}}function Zy(r,t){t!==null&&t.length>0&&(r.Authorization="Firebase "+t)}function tT(r,t){r["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function eT(r,t){t&&(r["X-Firebase-GMPID"]=t)}function nT(r,t){t!==null&&(r["X-Firebase-AppCheck"]=t)}function rT(r,t,e,n,s,i,a=!0){const u=Jd(r.urlParams),c=r.url+u,h=Object.assign({},r.headers);return eT(h,t),Zy(h,e),tT(h,i),nT(h,n),new Yy(c,r.method,h,r.body,r.successCodes,r.additionalRetryCodes,r.handler,r.errorHandler,r.timeout,r.progressCallback,s,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sT(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function iT(...r){const t=sT();if(t!==void 0){const e=new t;for(let n=0;n<r.length;n++)e.append(r[n]);return e.getBlob()}else{if(Fa())return new Blob(r);throw new mt(at.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function oT(r,t,e){return r.webkitSlice?r.webkitSlice(t,e):r.mozSlice?r.mozSlice(t,e):r.slice?r.slice(t,e):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aT(r){if(typeof atob>"u")throw jy("base-64");return atob(r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class lo{constructor(t,e){this.data=t,this.contentType=e||null}}function uT(r,t){switch(r){case Jt.RAW:return new lo(Zd(t));case Jt.BASE64:case Jt.BASE64URL:return new lo(tf(r,t));case Jt.DATA_URL:return new lo(lT(t),hT(t))}throw Ma()}function Zd(r){const t=[];for(let e=0;e<r.length;e++){let n=r.charCodeAt(e);if(n<=127)t.push(n);else if(n<=2047)t.push(192|n>>6,128|n&63);else if((n&64512)===55296)if(!(e<r.length-1&&(r.charCodeAt(e+1)&64512)===56320))t.push(239,191,189);else{const i=n,a=r.charCodeAt(++e);n=65536|(i&1023)<<10|a&1023,t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|n&63)}else(n&64512)===56320?t.push(239,191,189):t.push(224|n>>12,128|n>>6&63,128|n&63)}return new Uint8Array(t)}function cT(r){let t;try{t=decodeURIComponent(r)}catch{throw Lr(Jt.DATA_URL,"Malformed data URL.")}return Zd(t)}function tf(r,t){switch(r){case Jt.BASE64:{const s=t.indexOf("-")!==-1,i=t.indexOf("_")!==-1;if(s||i)throw Lr(r,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Jt.BASE64URL:{const s=t.indexOf("+")!==-1,i=t.indexOf("/")!==-1;if(s||i)throw Lr(r,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let e;try{e=aT(t)}catch(s){throw s.message.includes("polyfill")?s:Lr(r,"Invalid character found")}const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}class ef{constructor(t){this.base64=!1,this.contentType=null;const e=t.match(/^data:([^,]+)?,/);if(e===null)throw Lr(Jt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=e[1]||null;n!=null&&(this.base64=dT(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=t.substring(t.indexOf(",")+1)}}function lT(r){const t=new ef(r);return t.base64?tf(Jt.BASE64,t.rest):cT(t.rest)}function hT(r){return new ef(r).contentType}function dT(r,t){return r.length>=t.length?r.substring(r.length-t.length)===t:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(t,e){let n=0,s="";nl(t)?(this.data_=t,n=t.size,s=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),n=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),n=t.length),this.size_=n,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,e){if(nl(this.data_)){const n=this.data_,s=oT(n,t,e);return s===null?null:new ie(s)}else{const n=new Uint8Array(this.data_.buffer,t,e-t);return new ie(n,!0)}}static getBlob(...t){if(Fa()){const e=t.map(n=>n instanceof ie?n.data_:n);return new ie(iT.apply(null,e))}else{const e=t.map(a=>Di(a)?uT(Jt.RAW,a).data:a.data_);let n=0;e.forEach(a=>{n+=a.byteLength});const s=new Uint8Array(n);let i=0;return e.forEach(a=>{for(let u=0;u<a.length;u++)s[i++]=a[u]}),new ie(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nf(r){let t;try{t=JSON.parse(r)}catch{return null}return Jy(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fT(r){if(r.length===0)return null;const t=r.lastIndexOf("/");return t===-1?"":r.slice(0,t)}function mT(r,t){const e=t.split("/").filter(n=>n.length>0).join("/");return r.length===0?e:r+"/"+e}function rf(r){const t=r.lastIndexOf("/",r.length-2);return t===-1?r:r.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _T(r,t){return t}class Lt{constructor(t,e,n,s){this.server=t,this.local=e||t,this.writable=!!n,this.xform=s||_T}}let Ls=null;function pT(r){return!Di(r)||r.length<2?r:rf(r)}function La(){if(Ls)return Ls;const r=[];r.push(new Lt("bucket")),r.push(new Lt("generation")),r.push(new Lt("metageneration")),r.push(new Lt("name","fullPath",!0));function t(i,a){return pT(a)}const e=new Lt("name");e.xform=t,r.push(e);function n(i,a){return a!==void 0?Number(a):a}const s=new Lt("size");return s.xform=n,r.push(s),r.push(new Lt("timeCreated")),r.push(new Lt("updated")),r.push(new Lt("md5Hash",null,!0)),r.push(new Lt("cacheControl",null,!0)),r.push(new Lt("contentDisposition",null,!0)),r.push(new Lt("contentEncoding",null,!0)),r.push(new Lt("contentLanguage",null,!0)),r.push(new Lt("contentType",null,!0)),r.push(new Lt("metadata","customMetadata",!0)),Ls=r,Ls}function gT(r,t){function e(){const n=r.bucket,s=r.fullPath,i=new jt(n,s);return t._makeStorageReference(i)}Object.defineProperty(r,"ref",{get:e})}function yT(r,t,e){const n={};n.type="file";const s=e.length;for(let i=0;i<s;i++){const a=e[i];n[a.local]=a.xform(n,t[a.server])}return gT(n,r),n}function sf(r,t,e){const n=nf(t);return n===null?null:yT(r,n,e)}function TT(r,t,e,n){const s=nf(t);if(s===null||!Di(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const a=encodeURIComponent;return i.split(",").map(h=>{const f=r.bucket,m=r.fullPath,p="/b/"+a(f)+"/o/"+a(m),v=sr(p,e,n),C=Jd({alt:"media",token:h});return v+C})[0]}function of(r,t){const e={},n=t.length;for(let s=0;s<n;s++){const i=t[s];i.writable&&(e[i.server]=r[i.local])}return JSON.stringify(e)}class _n{constructor(t,e,n,s){this.url=t,this.method=e,this.handler=n,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(r){if(!r)throw Ma()}function Ua(r,t){function e(n,s){const i=sf(r,s,t);return ae(i!==null),i}return e}function IT(r,t){function e(n,s){const i=sf(r,s,t);return ae(i!==null),TT(i,s,r.host,r._protocol)}return e}function ls(r){function t(e,n){let s;return e.getStatus()===401?e.getErrorText().includes("Firebase App Check token is invalid")?s=Fy():s=My():e.getStatus()===402?s=Oy(r.bucket):e.getStatus()===403?s=Ly(r.path):s=n,s.status=e.getStatus(),s.serverResponse=n.serverResponse,s}return t}function Ba(r){const t=ls(r);function e(n,s){let i=t(n,s);return n.getStatus()===404&&(i=Ny(r.path)),i.serverResponse=s.serverResponse,i}return e}function ET(r,t,e){const n=t.fullServerUrl(),s=sr(n,r.host,r._protocol),i="GET",a=r.maxOperationRetryTime,u=new _n(s,i,Ua(r,e),a);return u.errorHandler=Ba(t),u}function wT(r,t,e){const n=t.fullServerUrl(),s=sr(n,r.host,r._protocol),i="GET",a=r.maxOperationRetryTime,u=new _n(s,i,IT(r,e),a);return u.errorHandler=Ba(t),u}function vT(r,t){const e=t.fullServerUrl(),n=sr(e,r.host,r._protocol),s="DELETE",i=r.maxOperationRetryTime;function a(c,h){}const u=new _n(n,s,a,i);return u.successCodes=[200,204],u.errorHandler=Ba(t),u}function AT(r,t){return r&&r.contentType||t&&t.type()||"application/octet-stream"}function af(r,t,e){const n=Object.assign({},e);return n.fullPath=r.path,n.size=t.size(),n.contentType||(n.contentType=AT(null,t)),n}function uf(r,t,e,n,s){const i=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function u(){let F="";for(let G=0;G<2;G++)F=F+Math.random().toString().slice(2);return F}const c=u();a["Content-Type"]="multipart/related; boundary="+c;const h=af(t,n,s),f=of(h,e),m="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+c+`\r
Content-Type: `+h.contentType+`\r
\r
`,p=`\r
--`+c+"--",v=ie.getBlob(m,n,p);if(v===null)throw Hd();const C={name:h.fullPath},x=sr(i,r.host,r._protocol),V="POST",U=r.maxUploadRetryTime,B=new _n(x,V,Ua(r,e),U);return B.urlParams=C,B.headers=a,B.body=v.uploadData(),B.errorHandler=ls(t),B}class ui{constructor(t,e,n,s){this.current=t,this.total=e,this.finalized=!!n,this.metadata=s||null}}function qa(r,t){let e=null;try{e=r.getResponseHeader("X-Goog-Upload-Status")}catch{ae(!1)}return ae(!!e&&(t||["active"]).indexOf(e)!==-1),e}function RT(r,t,e,n,s){const i=t.bucketOnlyServerUrl(),a=af(t,n,s),u={name:a.fullPath},c=sr(i,r.host,r._protocol),h="POST",f={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${n.size()}`,"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},m=of(a,e),p=r.maxUploadRetryTime;function v(x){qa(x);let V;try{V=x.getResponseHeader("X-Goog-Upload-URL")}catch{ae(!1)}return ae(Di(V)),V}const C=new _n(c,h,v,p);return C.urlParams=u,C.headers=f,C.body=m,C.errorHandler=ls(t),C}function PT(r,t,e,n){const s={"X-Goog-Upload-Command":"query"};function i(h){const f=qa(h,["active","final"]);let m=null;try{m=h.getResponseHeader("X-Goog-Upload-Size-Received")}catch{ae(!1)}m||ae(!1);const p=Number(m);return ae(!isNaN(p)),new ui(p,n.size(),f==="final")}const a="POST",u=r.maxUploadRetryTime,c=new _n(e,a,i,u);return c.headers=s,c.errorHandler=ls(t),c}const sl=256*1024;function bT(r,t,e,n,s,i,a,u){const c=new ui(0,0);if(a?(c.current=a.current,c.total=a.total):(c.current=0,c.total=n.size()),n.size()!==c.total)throw zy();const h=c.total-c.current;let f=h;s>0&&(f=Math.min(f,s));const m=c.current,p=m+f;let v="";f===0?v="finalize":h===f?v="upload, finalize":v="upload";const C={"X-Goog-Upload-Command":v,"X-Goog-Upload-Offset":`${c.current}`},x=n.slice(m,p);if(x===null)throw Hd();function V(G,W){const j=qa(G,["active","final"]),I=c.current+f,g=n.size();let T;return j==="final"?T=Ua(t,i)(G,W):T=null,new ui(I,g,j==="final",T)}const U="POST",B=t.maxUploadRetryTime,F=new _n(e,U,V,B);return F.headers=C,F.body=x.uploadData(),F.progressCallback=u||null,F.errorHandler=ls(r),F}const Ut={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function ho(r){switch(r){case"running":case"pausing":case"canceling":return Ut.RUNNING;case"paused":return Ut.PAUSED;case"success":return Ut.SUCCESS;case"canceled":return Ut.CANCELED;case"error":return Ut.ERROR;default:return Ut.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ST{constructor(t,e,n){if(Xy(t)||e!=null||n!=null)this.next=t,this.error=e??void 0,this.complete=n??void 0;else{const i=t;this.next=i.next,this.error=i.error,this.complete=i.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function An(r){return(...t)=>{Promise.resolve().then(()=>r(...t))}}class VT{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=tn.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=tn.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=tn.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,e,n,s){if(this.sent_)throw br("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(e,t,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return n!==void 0?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw br("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw br("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw br("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw br("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class CT extends VT{initXhr(){this.xhr_.responseType="text"}}function ve(){return new CT}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xT{constructor(t,e,n=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=t,this._blob=e,this._metadata=n,this._mappings=La(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=s=>{if(this._request=void 0,this._chunkMultiplier=1,s._codeEquals(at.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const i=this.isExponentialBackoffExpired();if(Yd(s.status,[]))if(i)s=$d();else{this.sleepTime=Math.max(this.sleepTime*2,ky),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=s,this._transition("error")}},this._metadataErrorHandler=s=>{this._request=void 0,s._codeEquals(at.CANCELED)?this.completeTransitions_():(this._error=s,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((s,i)=>{this._resolve=s,this._reject=i,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){const t=this._transferred;return e=>this._updateProgress(t+e)}_shouldDoResumable(t){return t.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(t){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([e,n])=>{switch(this._state){case"running":t(e,n);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((t,e)=>{const n=RT(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(n,ve,t,e);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._uploadUrl=i,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const t=this._uploadUrl;this._resolveToken((e,n)=>{const s=PT(this._ref.storage,this._ref._location,t,this._blob),i=this._ref.storage._makeRequest(s,ve,e,n);this._request=i,i.getPromise().then(a=>{a=a,this._request=void 0,this._updateProgress(a.current),this._needToFetchStatus=!1,a.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const t=sl*this._chunkMultiplier,e=new ui(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken((s,i)=>{let a;try{a=bT(this._ref._location,this._ref.storage,n,this._blob,t,this._mappings,e,this._makeProgressCallback())}catch(c){this._error=c,this._transition("error");return}const u=this._ref.storage._makeRequest(a,ve,s,i,!1);this._request=u,u.getPromise().then(c=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(c.current),c.finalized?(this._metadata=c.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){sl*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((t,e)=>{const n=ET(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(n,ve,t,e);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((t,e)=>{const n=uf(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(n,ve,t,e);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(t){const e=this._transferred;this._transferred=t,this._transferred!==e&&this._notifyObservers()}_transition(t){if(this._state!==t)switch(t){case"canceling":case"pausing":this._state=t,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const e=this._state==="paused";this._state=t,e&&(this._notifyObservers(),this._start());break;case"paused":this._state=t,this._notifyObservers();break;case"canceled":this._error=Wd(),this._state=t,this._notifyObservers();break;case"error":this._state=t,this._notifyObservers();break;case"success":this._state=t,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const t=ho(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:t,metadata:this._metadata,task:this,ref:this._ref}}on(t,e,n,s){const i=new ST(e||void 0,n||void 0,s||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(t,e){return this._promise.then(t,e)}catch(t){return this.then(null,t)}_addObserver(t){this._observers.push(t),this._notifyObserver(t)}_removeObserver(t){const e=this._observers.indexOf(t);e!==-1&&this._observers.splice(e,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(e=>{this._notifyObserver(e)})}_finishPromise(){if(this._resolve!==void 0){let t=!0;switch(ho(this._state)){case Ut.SUCCESS:An(this._resolve.bind(null,this.snapshot))();break;case Ut.CANCELED:case Ut.ERROR:const e=this._reject;An(e.bind(null,this._error))();break;default:t=!1;break}t&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(t){switch(ho(this._state)){case Ut.RUNNING:case Ut.PAUSED:t.next&&An(t.next.bind(t,this.snapshot))();break;case Ut.SUCCESS:t.complete&&An(t.complete.bind(t))();break;case Ut.CANCELED:case Ut.ERROR:t.error&&An(t.error.bind(t,this._error))();break;default:t.error&&An(t.error.bind(t,this._error))()}}resume(){const t=this._state==="paused"||this._state==="pausing";return t&&this._transition("running"),t}pause(){const t=this._state==="running";return t&&this._transition("pausing"),t}cancel(){const t=this._state==="running"||this._state==="pausing";return t&&this._transition("canceling"),t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(t,e){this._service=t,e instanceof jt?this._location=e:this._location=jt.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new hn(t,e)}get root(){const t=new jt(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return rf(this._location.path)}get storage(){return this._service}get parent(){const t=fT(this._location.path);if(t===null)return null;const e=new jt(this._location.bucket,t);return new hn(this._service,e)}_throwIfRoot(t){if(this._location.path==="")throw Ky(t)}}function DT(r,t,e){r._throwIfRoot("uploadBytes");const n=uf(r.storage,r._location,La(),new ie(t,!0),e);return r.storage.makeRequestWithTokens(n,ve).then(s=>({metadata:s,ref:r}))}function kT(r,t,e){return r._throwIfRoot("uploadBytesResumable"),new xT(r,new ie(t),e)}function NT(r){r._throwIfRoot("getDownloadURL");const t=wT(r.storage,r._location,La());return r.storage.makeRequestWithTokens(t,ve).then(e=>{if(e===null)throw Gy();return e})}function OT(r){r._throwIfRoot("deleteObject");const t=vT(r.storage,r._location);return r.storage.makeRequestWithTokens(t,ve)}function MT(r,t){const e=mT(r._location.path,t),n=new jt(r._location.bucket,e);return new hn(r.storage,n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FT(r){return/^[A-Za-z]+:\/\//.test(r)}function LT(r,t){return new hn(r,t)}function cf(r,t){if(r instanceof za){const e=r;if(e._bucket==null)throw qy();const n=new hn(e,e._bucket);return t!=null?cf(n,t):n}else return t!==void 0?MT(r,t):r}function UT(r,t){if(t&&FT(t)){if(r instanceof za)return LT(r,t);throw No("To use ref(service, url), the first argument must be a Storage instance.")}else return cf(r,t)}function il(r,t){const e=t?.[Qd];return e==null?null:jt.makeFromBucketSpec(e,r)}function BT(r,t,e,n={}){r.host=`${t}:${e}`,r._protocol="http";const{mockUserToken:s}=n;s&&(r._overrideAuthToken=typeof s=="string"?s:dl(s,r.app.options.projectId))}class za{constructor(t,e,n,s,i){this.app=t,this._authProvider=e,this._appCheckProvider=n,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=Kd,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=xy,this._maxUploadRetryTime=Dy,this._requests=new Set,s!=null?this._bucket=jt.makeFromBucketSpec(s,this._host):this._bucket=il(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=jt.makeFromBucketSpec(this._url,t):this._bucket=il(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){rl("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){rl("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(e!==null)return e.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new hn(this,t)}_makeRequest(t,e,n,s,i=!0){if(this._deleted)return new Qy(Xd());{const a=rT(t,this._appId,n,s,e,this._firebaseVersion,i);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(t,e){const[n,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,n,s).getPromise()}}const ol="@firebase/storage",al="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf="storage";function XT(r,t,e){return r=ht(r),DT(r,t,e)}function JT(r,t,e){return r=ht(r),kT(r,t,e)}function YT(r){return r=ht(r),NT(r)}function ZT(r){return r=ht(r),OT(r)}function tI(r,t){return r=ht(r),UT(r,t)}function eI(r=fl(),t){r=ht(r);const n=Oo(r,lf).getImmediate({identifier:t}),s=ml("storage");return s&&qT(n,...s),n}function qT(r,t,e,n={}){BT(r,t,e,n)}function zT(r,{instanceIdentifier:t}){const e=r.getProvider("app").getImmediate(),n=r.getProvider("auth-internal"),s=r.getProvider("app-check-internal");return new za(e,n,s,t,_l)}function GT(){ul(new cl(lf,zT,"PUBLIC").setMultipleInstances(!0)),$s(ol,al,""),$s(ol,al,"esm2017")}GT();export{HT as A,lt as T,fy as a,Cg as b,ig as c,Yg as d,wd as e,Zg as f,eI as g,jg as h,cg as i,$g as j,yy as k,Ty as l,gy as m,py as n,ty as o,ly as p,Pg as q,xg as r,Xg as s,tI as t,Jg as u,XT as v,bg as w,YT as x,ZT as y,JT as z};
