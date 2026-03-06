import{L as Ud,_ as Pl,C as bl,r as _s,F as Sl,a as Zt,b as Vl,d as lo,i as Cl,g as ys,c as Bd,e as Pt,S as xl,f as qd,h as jd,j as zd}from"./vendor-firebase-core-BfFN2EDI.js";var cu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ne,Dl;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(I,g){function y(){}y.prototype=g.prototype,I.D=g.prototype,I.prototype=new y,I.prototype.constructor=I,I.C=function(E,w,R){for(var _=Array(arguments.length-2),Xt=2;Xt<arguments.length;Xt++)_[Xt-2]=arguments[Xt];return g.prototype[w].apply(E,_)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(n,e),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,y){y||(y=0);var E=Array(16);if(typeof g=="string")for(var w=0;16>w;++w)E[w]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(w=0;16>w;++w)E[w]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=I.g[0],y=I.g[1],w=I.g[2];var R=I.g[3],_=g+(R^y&(w^R))+E[0]+3614090360&4294967295;g=y+(_<<7&4294967295|_>>>25),_=R+(w^g&(y^w))+E[1]+3905402710&4294967295,R=g+(_<<12&4294967295|_>>>20),_=w+(y^R&(g^y))+E[2]+606105819&4294967295,w=R+(_<<17&4294967295|_>>>15),_=y+(g^w&(R^g))+E[3]+3250441966&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(R^y&(w^R))+E[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(w^g&(y^w))+E[5]+1200080426&4294967295,R=g+(_<<12&4294967295|_>>>20),_=w+(y^R&(g^y))+E[6]+2821735955&4294967295,w=R+(_<<17&4294967295|_>>>15),_=y+(g^w&(R^g))+E[7]+4249261313&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(R^y&(w^R))+E[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(w^g&(y^w))+E[9]+2336552879&4294967295,R=g+(_<<12&4294967295|_>>>20),_=w+(y^R&(g^y))+E[10]+4294925233&4294967295,w=R+(_<<17&4294967295|_>>>15),_=y+(g^w&(R^g))+E[11]+2304563134&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(R^y&(w^R))+E[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(w^g&(y^w))+E[13]+4254626195&4294967295,R=g+(_<<12&4294967295|_>>>20),_=w+(y^R&(g^y))+E[14]+2792965006&4294967295,w=R+(_<<17&4294967295|_>>>15),_=y+(g^w&(R^g))+E[15]+1236535329&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(w^R&(y^w))+E[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^w&(g^y))+E[6]+3225465664&4294967295,R=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(R^g))+E[11]+643717713&4294967295,w=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(w^R))+E[0]+3921069994&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^R&(y^w))+E[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^w&(g^y))+E[10]+38016083&4294967295,R=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(R^g))+E[15]+3634488961&4294967295,w=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(w^R))+E[4]+3889429448&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^R&(y^w))+E[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^w&(g^y))+E[14]+3275163606&4294967295,R=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(R^g))+E[3]+4107603335&4294967295,w=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(w^R))+E[8]+1163531501&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^R&(y^w))+E[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^w&(g^y))+E[2]+4243563512&4294967295,R=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(R^g))+E[7]+1735328473&4294967295,w=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(w^R))+E[12]+2368359562&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(y^w^R)+E[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^w)+E[8]+2272392833&4294967295,R=g+(_<<11&4294967295|_>>>21),_=w+(R^g^y)+E[11]+1839030562&4294967295,w=R+(_<<16&4294967295|_>>>16),_=y+(w^R^g)+E[14]+4259657740&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^R)+E[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^w)+E[4]+1272893353&4294967295,R=g+(_<<11&4294967295|_>>>21),_=w+(R^g^y)+E[7]+4139469664&4294967295,w=R+(_<<16&4294967295|_>>>16),_=y+(w^R^g)+E[10]+3200236656&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^R)+E[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^w)+E[0]+3936430074&4294967295,R=g+(_<<11&4294967295|_>>>21),_=w+(R^g^y)+E[3]+3572445317&4294967295,w=R+(_<<16&4294967295|_>>>16),_=y+(w^R^g)+E[6]+76029189&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^R)+E[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^w)+E[12]+3873151461&4294967295,R=g+(_<<11&4294967295|_>>>21),_=w+(R^g^y)+E[15]+530742520&4294967295,w=R+(_<<16&4294967295|_>>>16),_=y+(w^R^g)+E[2]+3299628645&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(w^(y|~R))+E[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~w))+E[7]+1126891415&4294967295,R=g+(_<<10&4294967295|_>>>22),_=w+(g^(R|~y))+E[14]+2878612391&4294967295,w=R+(_<<15&4294967295|_>>>17),_=y+(R^(w|~g))+E[5]+4237533241&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~R))+E[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~w))+E[3]+2399980690&4294967295,R=g+(_<<10&4294967295|_>>>22),_=w+(g^(R|~y))+E[10]+4293915773&4294967295,w=R+(_<<15&4294967295|_>>>17),_=y+(R^(w|~g))+E[1]+2240044497&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~R))+E[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~w))+E[15]+4264355552&4294967295,R=g+(_<<10&4294967295|_>>>22),_=w+(g^(R|~y))+E[6]+2734768916&4294967295,w=R+(_<<15&4294967295|_>>>17),_=y+(R^(w|~g))+E[13]+1309151649&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~R))+E[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~w))+E[11]+3174756917&4294967295,R=g+(_<<10&4294967295|_>>>22),_=w+(g^(R|~y))+E[2]+718787259&4294967295,w=R+(_<<15&4294967295|_>>>17),_=y+(R^(w|~g))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(w+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+R&4294967295}n.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var y=g-this.blockSize,E=this.B,w=this.h,R=0;R<g;){if(w==0)for(;R<=y;)s(this,I,R),R+=this.blockSize;if(typeof I=="string"){for(;R<g;)if(E[w++]=I.charCodeAt(R++),w==this.blockSize){s(this,E),w=0;break}}else for(;R<g;)if(E[w++]=I[R++],w==this.blockSize){s(this,E),w=0;break}}this.h=w,this.o+=g},n.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var y=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=y&255,y/=256;for(this.u(I),I=Array(16),g=y=0;4>g;++g)for(var E=0;32>E;E+=8)I[y++]=this.g[g]>>>E&255;return I};function i(I,g){var y=u;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=g(I)}function a(I,g){this.h=g;for(var y=[],E=!0,w=I.length-1;0<=w;w--){var R=I[w]|0;E&&R==g||(y[w]=R,E=!1)}this.g=y}var u={};function l(I){return-128<=I&&128>I?i(I,function(g){return new a([g|0],0>g?-1:0)}):new a([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return p;if(0>I)return V(d(-I));for(var g=[],y=1,E=0;I>=y;E++)g[E]=I/y|0,y*=4294967296;return new a(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return V(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(g,8)),E=p,w=0;w<I.length;w+=8){var R=Math.min(8,I.length-w),_=parseInt(I.substring(w,w+R),g);8>R?(R=d(Math.pow(g,R)),E=E.j(R).add(d(_))):(E=E.j(y),E=E.add(d(_)))}return E}var p=l(0),T=l(1),P=l(16777216);r=a.prototype,r.m=function(){if(D(this))return-V(this).m();for(var I=0,g=1,y=0;y<this.g.length;y++){var E=this.i(y);I+=(0<=E?E:4294967296+E)*g,g*=4294967296}return I},r.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(C(this))return"0";if(D(this))return"-"+V(this).toString(I);for(var g=d(Math.pow(I,6)),y=this,E="";;){var w=z(y,g).g;y=j(y,w.j(g));var R=((0<y.g.length?y.g[0]:y.h)>>>0).toString(I);if(y=w,C(y))return R+E;for(;6>R.length;)R="0"+R;E=R+E}},r.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function C(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function D(I){return I.h==-1}r.l=function(I){return I=j(this,I),D(I)?-1:C(I)?0:1};function V(I){for(var g=I.g.length,y=[],E=0;E<g;E++)y[E]=~I.g[E];return new a(y,~I.h).add(T)}r.abs=function(){return D(this)?V(this):this},r.add=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],E=0,w=0;w<=g;w++){var R=E+(this.i(w)&65535)+(I.i(w)&65535),_=(R>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);E=_>>>16,R&=65535,_&=65535,y[w]=_<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function j(I,g){return I.add(V(g))}r.j=function(I){if(C(this)||C(I))return p;if(D(this))return D(I)?V(this).j(V(I)):V(V(this).j(I));if(D(I))return V(this.j(V(I)));if(0>this.l(P)&&0>I.l(P))return d(this.m()*I.m());for(var g=this.g.length+I.g.length,y=[],E=0;E<2*g;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(var w=0;w<I.g.length;w++){var R=this.i(E)>>>16,_=this.i(E)&65535,Xt=I.i(w)>>>16,Dn=I.i(w)&65535;y[2*E+2*w]+=_*Dn,q(y,2*E+2*w),y[2*E+2*w+1]+=R*Dn,q(y,2*E+2*w+1),y[2*E+2*w+1]+=_*Xt,q(y,2*E+2*w+1),y[2*E+2*w+2]+=R*Xt,q(y,2*E+2*w+2)}for(E=0;E<g;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=g;E<2*g;E++)y[E]=0;return new a(y,0)};function q(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function M(I,g){this.g=I,this.h=g}function z(I,g){if(C(g))throw Error("division by zero");if(C(I))return new M(p,p);if(D(I))return g=z(V(I),g),new M(V(g.g),V(g.h));if(D(g))return g=z(I,V(g)),new M(V(g.g),g.h);if(30<I.g.length){if(D(I)||D(g))throw Error("slowDivide_ only works with positive integers.");for(var y=T,E=g;0>=E.l(I);)y=H(y),E=H(E);var w=G(y,1),R=G(E,1);for(E=G(E,2),y=G(y,2);!C(E);){var _=R.add(E);0>=_.l(I)&&(w=w.add(y),R=_),E=G(E,1),y=G(y,1)}return g=j(I,w.j(g)),new M(w,g)}for(w=p;0<=I.l(g);){for(y=Math.max(1,Math.floor(I.m()/g.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),R=d(y),_=R.j(g);D(_)||0<_.l(I);)y-=E,R=d(y),_=R.j(g);C(R)&&(R=T),w=w.add(R),I=j(I,_)}return new M(w,I)}r.A=function(I){return z(this,I).h},r.and=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],E=0;E<g;E++)y[E]=this.i(E)&I.i(E);return new a(y,this.h&I.h)},r.or=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],E=0;E<g;E++)y[E]=this.i(E)|I.i(E);return new a(y,this.h|I.h)},r.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],E=0;E<g;E++)y[E]=this.i(E)^I.i(E);return new a(y,this.h^I.h)};function H(I){for(var g=I.g.length+1,y=[],E=0;E<g;E++)y[E]=I.i(E)<<1|I.i(E-1)>>>31;return new a(y,I.h)}function G(I,g){var y=g>>5;g%=32;for(var E=I.g.length-y,w=[],R=0;R<E;R++)w[R]=0<g?I.i(R+y)>>>g|I.i(R+y+1)<<32-g:I.i(R+y);return new a(w,I.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Dl=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,Ne=a}).apply(typeof cu<"u"?cu:typeof self<"u"?self:typeof window<"u"?window:{});var es=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var kl,er,Nl,ls,Bi,Ol,Ml,Fl;(function(){var r,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,h){return o==Array.prototype||o==Object.prototype||(o[c]=h.value),o};function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof es=="object"&&es];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var n=e(this);function s(o,c){if(c)t:{var h=n;o=o.split(".");for(var m=0;m<o.length-1;m++){var v=o[m];if(!(v in h))break t;h=h[v]}o=o[o.length-1],m=h[o],c=c(m),c!=m&&c!=null&&t(h,o,{configurable:!0,writable:!0,value:c})}}function i(o,c){o instanceof String&&(o+="");var h=0,m=!1,v={next:function(){if(!m&&h<o.length){var b=h++;return{value:c(b,o[b]),done:!1}}return m=!0,{done:!0,value:void 0}}};return v[Symbol.iterator]=function(){return v},v}s("Array.prototype.values",function(o){return o||function(){return i(this,function(c,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function l(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function d(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function f(o,c,h){return o.call.apply(o.bind,arguments)}function p(o,c,h){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var v=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(v,m),o.apply(c,v)}}return function(){return o.apply(c,arguments)}}function T(o,c,h){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,T.apply(null,arguments)}function P(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function C(o,c){function h(){}h.prototype=c.prototype,o.aa=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(m,v,b){for(var N=Array(arguments.length-2),tt=2;tt<arguments.length;tt++)N[tt-2]=arguments[tt];return c.prototype[v].apply(m,N)}}function D(o){const c=o.length;if(0<c){const h=Array(c);for(let m=0;m<c;m++)h[m]=o[m];return h}return[]}function V(o,c){for(let h=1;h<arguments.length;h++){const m=arguments[h];if(l(m)){const v=o.length||0,b=m.length||0;o.length=v+b;for(let N=0;N<b;N++)o[v+N]=m[N]}else o.push(m)}}class j{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function q(o){return/^[\s\xa0]*$/.test(o)}function M(){var o=u.navigator;return o&&(o=o.userAgent)?o:""}function z(o){return z[" "](o),o}z[" "]=function(){};var H=M().indexOf("Gecko")!=-1&&!(M().toLowerCase().indexOf("webkit")!=-1&&M().indexOf("Edge")==-1)&&!(M().indexOf("Trident")!=-1||M().indexOf("MSIE")!=-1)&&M().indexOf("Edge")==-1;function G(o,c,h){for(const m in o)c.call(h,o[m],m,o)}function I(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function g(o){const c={};for(const h in o)c[h]=o[h];return c}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,c){let h,m;for(let v=1;v<arguments.length;v++){m=arguments[v];for(h in m)o[h]=m[h];for(let b=0;b<y.length;b++)h=y[b],Object.prototype.hasOwnProperty.call(m,h)&&(o[h]=m[h])}}function w(o){var c=1;o=o.split(":");const h=[];for(;0<c&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function R(o){u.setTimeout(()=>{throw o},0)}function _(){var o=ai;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class Xt{constructor(){this.h=this.g=null}add(c,h){const m=Dn.get();m.set(c,h),this.h?this.h.next=m:this.g=m,this.h=m}}var Dn=new j(()=>new sd,o=>o.reset());class sd{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let kn,Nn=!1,ai=new Xt,ca=()=>{const o=u.Promise.resolve(void 0);kn=()=>{o.then(id)}};var id=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(h){R(h)}var c=Dn;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}Nn=!1};function oe(){this.s=this.s,this.C=this.C}oe.prototype.s=!1,oe.prototype.ma=function(){this.s||(this.s=!0,this.N())},oe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function yt(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}yt.prototype.h=function(){this.defaultPrevented=!0};var od=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};u.addEventListener("test",h,c),u.removeEventListener("test",h,c)}catch{}return o}();function On(o,c){if(yt.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(H){t:{try{z(c.nodeName);var v=!0;break t}catch{}v=!1}v||(c=null)}}else h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement);this.relatedTarget=c,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:ad[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&On.aa.h.call(this)}}C(On,yt);var ad={2:"touch",3:"pen",4:"mouse"};On.prototype.h=function(){On.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Mr="closure_listenable_"+(1e6*Math.random()|0),ud=0;function ld(o,c,h,m,v){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!m,this.ha=v,this.key=++ud,this.da=this.fa=!1}function Fr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Lr(o){this.src=o,this.g={},this.h=0}Lr.prototype.add=function(o,c,h,m,v){var b=o.toString();o=this.g[b],o||(o=this.g[b]=[],this.h++);var N=li(o,c,m,v);return-1<N?(c=o[N],h||(c.fa=!1)):(c=new ld(c,this.src,b,!!m,v),c.fa=h,o.push(c)),c};function ui(o,c){var h=c.type;if(h in o.g){var m=o.g[h],v=Array.prototype.indexOf.call(m,c,void 0),b;(b=0<=v)&&Array.prototype.splice.call(m,v,1),b&&(Fr(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function li(o,c,h,m){for(var v=0;v<o.length;++v){var b=o[v];if(!b.da&&b.listener==c&&b.capture==!!h&&b.ha==m)return v}return-1}var ci="closure_lm_"+(1e6*Math.random()|0),hi={};function ha(o,c,h,m,v){if(Array.isArray(c)){for(var b=0;b<c.length;b++)ha(o,c[b],h,m,v);return null}return h=ma(h),o&&o[Mr]?o.K(c,h,d(m)?!!m.capture:!1,v):cd(o,c,h,!1,m,v)}function cd(o,c,h,m,v,b){if(!c)throw Error("Invalid event type");var N=d(v)?!!v.capture:!!v,tt=fi(o);if(tt||(o[ci]=tt=new Lr(o)),h=tt.add(c,h,m,N,b),h.proxy)return h;if(m=hd(),h.proxy=m,m.src=o,m.listener=h,o.addEventListener)od||(v=N),v===void 0&&(v=!1),o.addEventListener(c.toString(),m,v);else if(o.attachEvent)o.attachEvent(fa(c.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function hd(){function o(h){return c.call(o.src,o.listener,h)}const c=dd;return o}function da(o,c,h,m,v){if(Array.isArray(c))for(var b=0;b<c.length;b++)da(o,c[b],h,m,v);else m=d(m)?!!m.capture:!!m,h=ma(h),o&&o[Mr]?(o=o.i,c=String(c).toString(),c in o.g&&(b=o.g[c],h=li(b,h,m,v),-1<h&&(Fr(b[h]),Array.prototype.splice.call(b,h,1),b.length==0&&(delete o.g[c],o.h--)))):o&&(o=fi(o))&&(c=o.g[c.toString()],o=-1,c&&(o=li(c,h,m,v)),(h=-1<o?c[o]:null)&&di(h))}function di(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Mr])ui(c.i,o);else{var h=o.type,m=o.proxy;c.removeEventListener?c.removeEventListener(h,m,o.capture):c.detachEvent?c.detachEvent(fa(h),m):c.addListener&&c.removeListener&&c.removeListener(m),(h=fi(c))?(ui(h,o),h.h==0&&(h.src=null,c[ci]=null)):Fr(o)}}}function fa(o){return o in hi?hi[o]:hi[o]="on"+o}function dd(o,c){if(o.da)o=!0;else{c=new On(c,this);var h=o.listener,m=o.ha||o.src;o.fa&&di(o),o=h.call(m,c)}return o}function fi(o){return o=o[ci],o instanceof Lr?o:null}var mi="__closure_events_fn_"+(1e9*Math.random()>>>0);function ma(o){return typeof o=="function"?o:(o[mi]||(o[mi]=function(c){return o.handleEvent(c)}),o[mi])}function Tt(){oe.call(this),this.i=new Lr(this),this.M=this,this.F=null}C(Tt,oe),Tt.prototype[Mr]=!0,Tt.prototype.removeEventListener=function(o,c,h,m){da(this,o,c,h,m)};function bt(o,c){var h,m=o.F;if(m)for(h=[];m;m=m.F)h.push(m);if(o=o.M,m=c.type||c,typeof c=="string")c=new yt(c,o);else if(c instanceof yt)c.target=c.target||o;else{var v=c;c=new yt(m,o),E(c,v)}if(v=!0,h)for(var b=h.length-1;0<=b;b--){var N=c.g=h[b];v=Ur(N,m,!0,c)&&v}if(N=c.g=o,v=Ur(N,m,!0,c)&&v,v=Ur(N,m,!1,c)&&v,h)for(b=0;b<h.length;b++)N=c.g=h[b],v=Ur(N,m,!1,c)&&v}Tt.prototype.N=function(){if(Tt.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var h=o.g[c],m=0;m<h.length;m++)Fr(h[m]);delete o.g[c],o.h--}}this.F=null},Tt.prototype.K=function(o,c,h,m){return this.i.add(String(o),c,!1,h,m)},Tt.prototype.L=function(o,c,h,m){return this.i.add(String(o),c,!0,h,m)};function Ur(o,c,h,m){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var v=!0,b=0;b<c.length;++b){var N=c[b];if(N&&!N.da&&N.capture==h){var tt=N.listener,pt=N.ha||N.src;N.fa&&ui(o.i,N),v=tt.call(pt,m)!==!1&&v}}return v&&!m.defaultPrevented}function pa(o,c,h){if(typeof o=="function")h&&(o=T(o,h));else if(o&&typeof o.handleEvent=="function")o=T(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:u.setTimeout(o,c||0)}function ga(o){o.g=pa(()=>{o.g=null,o.i&&(o.i=!1,ga(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class fd extends oe{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:ga(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Mn(o){oe.call(this),this.h=o,this.g={}}C(Mn,oe);var _a=[];function ya(o){G(o.g,function(c,h){this.g.hasOwnProperty(h)&&di(c)},o),o.g={}}Mn.prototype.N=function(){Mn.aa.N.call(this),ya(this)},Mn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var pi=u.JSON.stringify,md=u.JSON.parse,pd=class{stringify(o){return u.JSON.stringify(o,void 0)}parse(o){return u.JSON.parse(o,void 0)}};function gi(){}gi.prototype.h=null;function Ta(o){return o.h||(o.h=o.i())}function Ia(){}var Fn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function _i(){yt.call(this,"d")}C(_i,yt);function yi(){yt.call(this,"c")}C(yi,yt);var Ae={},Ea=null;function Br(){return Ea=Ea||new Tt}Ae.La="serverreachability";function wa(o){yt.call(this,Ae.La,o)}C(wa,yt);function Ln(o){const c=Br();bt(c,new wa(c))}Ae.STAT_EVENT="statevent";function va(o,c){yt.call(this,Ae.STAT_EVENT,o),this.stat=c}C(va,yt);function St(o){const c=Br();bt(c,new va(c,o))}Ae.Ma="timingevent";function Aa(o,c){yt.call(this,Ae.Ma,o),this.size=c}C(Aa,yt);function Un(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){o()},c)}function Bn(){this.g=!0}Bn.prototype.xa=function(){this.g=!1};function gd(o,c,h,m,v,b){o.info(function(){if(o.g)if(b)for(var N="",tt=b.split("&"),pt=0;pt<tt.length;pt++){var X=tt[pt].split("=");if(1<X.length){var It=X[0];X=X[1];var Et=It.split("_");N=2<=Et.length&&Et[1]=="type"?N+(It+"="+X+"&"):N+(It+"=redacted&")}}else N=null;else N=b;return"XMLHTTP REQ ("+m+") [attempt "+v+"]: "+c+`
`+h+`
`+N})}function _d(o,c,h,m,v,b,N){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+v+"]: "+c+`
`+h+`
`+b+" "+N})}function Ye(o,c,h,m){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Td(o,h)+(m?" "+m:"")})}function yd(o,c){o.info(function(){return"TIMEOUT: "+c})}Bn.prototype.info=function(){};function Td(o,c){if(!o.g)return c;if(!c)return null;try{var h=JSON.parse(c);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var m=h[o];if(!(2>m.length)){var v=m[1];if(Array.isArray(v)&&!(1>v.length)){var b=v[0];if(b!="noop"&&b!="stop"&&b!="close")for(var N=1;N<v.length;N++)v[N]=""}}}}return pi(h)}catch{return c}}var qr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ra={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ti;function jr(){}C(jr,gi),jr.prototype.g=function(){return new XMLHttpRequest},jr.prototype.i=function(){return{}},Ti=new jr;function ae(o,c,h,m){this.j=o,this.i=c,this.l=h,this.R=m||1,this.U=new Mn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Pa}function Pa(){this.i=null,this.g="",this.h=!1}var ba={},Ii={};function Ei(o,c,h){o.L=1,o.v=$r(Jt(c)),o.m=h,o.P=!0,Sa(o,null)}function Sa(o,c){o.F=Date.now(),zr(o),o.A=Jt(o.v);var h=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),ja(h.i,"t",m),o.C=0,h=o.j.J,o.h=new Pa,o.g=ou(o.j,h?c:null,!o.m),0<o.O&&(o.M=new fd(T(o.Y,o,o.g),o.O)),c=o.U,h=o.g,m=o.ca;var v="readystatechange";Array.isArray(v)||(v&&(_a[0]=v.toString()),v=_a);for(var b=0;b<v.length;b++){var N=ha(h,v[b],m||c.handleEvent,!1,c.h||c);if(!N)break;c.g[N.key]=N}c=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),Ln(),gd(o.i,o.u,o.A,o.l,o.R,o.m)}ae.prototype.ca=function(o){o=o.target;const c=this.M;c&&Yt(o)==3?c.j():this.Y(o)},ae.prototype.Y=function(o){try{if(o==this.g)t:{const Et=Yt(this.g);var c=this.g.Ba();const en=this.g.Z();if(!(3>Et)&&(Et!=3||this.g&&(this.h.h||this.g.oa()||Ha(this.g)))){this.J||Et!=4||c==7||(c==8||0>=en?Ln(3):Ln(2)),wi(this);var h=this.g.Z();this.X=h;e:if(Va(this)){var m=Ha(this.g);o="";var v=m.length,b=Yt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Re(this),qn(this);var N="";break e}this.h.i=new u.TextDecoder}for(c=0;c<v;c++)this.h.h=!0,o+=this.h.i.decode(m[c],{stream:!(b&&c==v-1)});m.length=0,this.h.g+=o,this.C=0,N=this.h.g}else N=this.g.oa();if(this.o=h==200,_d(this.i,this.u,this.A,this.l,this.R,Et,h),this.o){if(this.T&&!this.K){e:{if(this.g){var tt,pt=this.g;if((tt=pt.g?pt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(tt)){var X=tt;break e}}X=null}if(h=X)Ye(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,vi(this,h);else{this.o=!1,this.s=3,St(12),Re(this),qn(this);break t}}if(this.P){h=!0;let jt;for(;!this.J&&this.C<N.length;)if(jt=Id(this,N),jt==Ii){Et==4&&(this.s=4,St(14),h=!1),Ye(this.i,this.l,null,"[Incomplete Response]");break}else if(jt==ba){this.s=4,St(15),Ye(this.i,this.l,N,"[Invalid Chunk]"),h=!1;break}else Ye(this.i,this.l,jt,null),vi(this,jt);if(Va(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Et!=4||N.length!=0||this.h.h||(this.s=1,St(16),h=!1),this.o=this.o&&h,!h)Ye(this.i,this.l,N,"[Invalid Chunked Response]"),Re(this),qn(this);else if(0<N.length&&!this.W){this.W=!0;var It=this.j;It.g==this&&It.ba&&!It.M&&(It.j.info("Great, no buffering proxy detected. Bytes received: "+N.length),Vi(It),It.M=!0,St(11))}}else Ye(this.i,this.l,N,null),vi(this,N);Et==4&&Re(this),this.o&&!this.J&&(Et==4?nu(this.j,this):(this.o=!1,zr(this)))}else Fd(this.g),h==400&&0<N.indexOf("Unknown SID")?(this.s=3,St(12)):(this.s=0,St(13)),Re(this),qn(this)}}}catch{}finally{}};function Va(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Id(o,c){var h=o.C,m=c.indexOf(`
`,h);return m==-1?Ii:(h=Number(c.substring(h,m)),isNaN(h)?ba:(m+=1,m+h>c.length?Ii:(c=c.slice(m,m+h),o.C=m+h,c)))}ae.prototype.cancel=function(){this.J=!0,Re(this)};function zr(o){o.S=Date.now()+o.I,Ca(o,o.I)}function Ca(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Un(T(o.ba,o),c)}function wi(o){o.B&&(u.clearTimeout(o.B),o.B=null)}ae.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(yd(this.i,this.A),this.L!=2&&(Ln(),St(17)),Re(this),this.s=2,qn(this)):Ca(this,this.S-o)};function qn(o){o.j.G==0||o.J||nu(o.j,o)}function Re(o){wi(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,ya(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function vi(o,c){try{var h=o.j;if(h.G!=0&&(h.g==o||Ai(h.h,o))){if(!o.K&&Ai(h.h,o)&&h.G==3){try{var m=h.Da.g.parse(c)}catch{m=null}if(Array.isArray(m)&&m.length==3){var v=m;if(v[0]==0){t:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Yr(h),Xr(h);else break t;Si(h),St(18)}}else h.za=v[1],0<h.za-h.T&&37500>v[2]&&h.F&&h.v==0&&!h.C&&(h.C=Un(T(h.Za,h),6e3));if(1>=ka(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else be(h,11)}else if((o.K||h.g==o)&&Yr(h),!q(c))for(v=h.Da.g.parse(c),c=0;c<v.length;c++){let X=v[c];if(h.T=X[0],X=X[1],h.G==2)if(X[0]=="c"){h.K=X[1],h.ia=X[2];const It=X[3];It!=null&&(h.la=It,h.j.info("VER="+h.la));const Et=X[4];Et!=null&&(h.Aa=Et,h.j.info("SVER="+h.Aa));const en=X[5];en!=null&&typeof en=="number"&&0<en&&(m=1.5*en,h.L=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;const jt=o.g;if(jt){const ts=jt.g?jt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ts){var b=m.h;b.g||ts.indexOf("spdy")==-1&&ts.indexOf("quic")==-1&&ts.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Ri(b,b.h),b.h=null))}if(m.D){const Ci=jt.g?jt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ci&&(m.ya=Ci,nt(m.I,m.D,Ci))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),m=h;var N=o;if(m.qa=iu(m,m.J?m.ia:null,m.W),N.K){Na(m.h,N);var tt=N,pt=m.L;pt&&(tt.I=pt),tt.B&&(wi(tt),zr(tt)),m.g=N}else tu(m);0<h.i.length&&Jr(h)}else X[0]!="stop"&&X[0]!="close"||be(h,7);else h.G==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?be(h,7):bi(h):X[0]!="noop"&&h.l&&h.l.ta(X),h.v=0)}}Ln(4)}catch{}}var Ed=class{constructor(o,c){this.g=o,this.map=c}};function xa(o){this.l=o||10,u.PerformanceNavigationTiming?(o=u.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Da(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function ka(o){return o.h?1:o.g?o.g.size:0}function Ai(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Ri(o,c){o.g?o.g.add(c):o.h=c}function Na(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}xa.prototype.cancel=function(){if(this.i=Oa(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Oa(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.D);return c}return D(o.i)}function wd(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var c=[],h=o.length,m=0;m<h;m++)c.push(o[m]);return c}c=[],h=0;for(m in o)c[h++]=o[m];return c}function vd(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var c=[];o=o.length;for(var h=0;h<o;h++)c.push(h);return c}c=[],h=0;for(const m in o)c[h++]=m;return c}}}function Ma(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var h=vd(o),m=wd(o),v=m.length,b=0;b<v;b++)c.call(void 0,m[b],h&&h[b],o)}var Fa=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ad(o,c){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var m=o[h].indexOf("="),v=null;if(0<=m){var b=o[h].substring(0,m);v=o[h].substring(m+1)}else b=o[h];c(b,v?decodeURIComponent(v.replace(/\+/g," ")):"")}}}function Pe(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Pe){this.h=o.h,Kr(this,o.j),this.o=o.o,this.g=o.g,Gr(this,o.s),this.l=o.l;var c=o.i,h=new Kn;h.i=c.i,c.g&&(h.g=new Map(c.g),h.h=c.h),La(this,h),this.m=o.m}else o&&(c=String(o).match(Fa))?(this.h=!1,Kr(this,c[1]||"",!0),this.o=jn(c[2]||""),this.g=jn(c[3]||"",!0),Gr(this,c[4]),this.l=jn(c[5]||"",!0),La(this,c[6]||"",!0),this.m=jn(c[7]||"")):(this.h=!1,this.i=new Kn(null,this.h))}Pe.prototype.toString=function(){var o=[],c=this.j;c&&o.push(zn(c,Ua,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(zn(c,Ua,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(zn(h,h.charAt(0)=="/"?bd:Pd,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",zn(h,Vd)),o.join("")};function Jt(o){return new Pe(o)}function Kr(o,c,h){o.j=h?jn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Gr(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function La(o,c,h){c instanceof Kn?(o.i=c,Cd(o.i,o.h)):(h||(c=zn(c,Sd)),o.i=new Kn(c,o.h))}function nt(o,c,h){o.i.set(c,h)}function $r(o){return nt(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function jn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function zn(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,Rd),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Rd(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Ua=/[#\/\?@]/g,Pd=/[#\?:]/g,bd=/[#\?]/g,Sd=/[#\?@]/g,Vd=/#/g;function Kn(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function ue(o){o.g||(o.g=new Map,o.h=0,o.i&&Ad(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}r=Kn.prototype,r.add=function(o,c){ue(this),this.i=null,o=Ze(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function Ba(o,c){ue(o),c=Ze(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function qa(o,c){return ue(o),c=Ze(o,c),o.g.has(c)}r.forEach=function(o,c){ue(this),this.g.forEach(function(h,m){h.forEach(function(v){o.call(c,v,m,this)},this)},this)},r.na=function(){ue(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),h=[];for(let m=0;m<c.length;m++){const v=o[m];for(let b=0;b<v.length;b++)h.push(c[m])}return h},r.V=function(o){ue(this);let c=[];if(typeof o=="string")qa(this,o)&&(c=c.concat(this.g.get(Ze(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)c=c.concat(o[h])}return c},r.set=function(o,c){return ue(this),this.i=null,o=Ze(this,o),qa(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},r.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function ja(o,c,h){Ba(o,c),0<h.length&&(o.i=null,o.g.set(Ze(o,c),D(h)),o.h+=h.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var h=0;h<c.length;h++){var m=c[h];const b=encodeURIComponent(String(m)),N=this.V(m);for(m=0;m<N.length;m++){var v=b;N[m]!==""&&(v+="="+encodeURIComponent(String(N[m]))),o.push(v)}}return this.i=o.join("&")};function Ze(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Cd(o,c){c&&!o.j&&(ue(o),o.i=null,o.g.forEach(function(h,m){var v=m.toLowerCase();m!=v&&(Ba(this,m),ja(this,v,h))},o)),o.j=c}function xd(o,c){const h=new Bn;if(u.Image){const m=new Image;m.onload=P(le,h,"TestLoadImage: loaded",!0,c,m),m.onerror=P(le,h,"TestLoadImage: error",!1,c,m),m.onabort=P(le,h,"TestLoadImage: abort",!1,c,m),m.ontimeout=P(le,h,"TestLoadImage: timeout",!1,c,m),u.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else c(!1)}function Dd(o,c){const h=new Bn,m=new AbortController,v=setTimeout(()=>{m.abort(),le(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:m.signal}).then(b=>{clearTimeout(v),b.ok?le(h,"TestPingServer: ok",!0,c):le(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(v),le(h,"TestPingServer: error",!1,c)})}function le(o,c,h,m,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),m(h)}catch{}}function kd(){this.g=new pd}function Nd(o,c,h){const m=h||"";try{Ma(o,function(v,b){let N=v;d(v)&&(N=pi(v)),c.push(m+b+"="+encodeURIComponent(N))})}catch(v){throw c.push(m+"type="+encodeURIComponent("_badmap")),v}}function Qr(o){this.l=o.Ub||null,this.j=o.eb||!1}C(Qr,gi),Qr.prototype.g=function(){return new Wr(this.l,this.j)},Qr.prototype.i=function(o){return function(){return o}}({});function Wr(o,c){Tt.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Wr,Tt),r=Wr.prototype,r.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,$n(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||u).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Gn(this)),this.readyState=0},r.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,$n(this)),this.g&&(this.readyState=3,$n(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;za(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function za(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}r.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Gn(this):$n(this),this.readyState==3&&za(this)}},r.Ra=function(o){this.g&&(this.response=this.responseText=o,Gn(this))},r.Qa=function(o){this.g&&(this.response=o,Gn(this))},r.ga=function(){this.g&&Gn(this)};function Gn(o){o.readyState=4,o.l=null,o.j=null,o.v=null,$n(o)}r.setRequestHeader=function(o,c){this.u.append(o,c)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function $n(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Wr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Ka(o){let c="";return G(o,function(h,m){c+=m,c+=":",c+=h,c+=`\r
`}),c}function Pi(o,c,h){t:{for(m in h){var m=!1;break t}m=!0}m||(h=Ka(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):nt(o,c,h))}function ut(o){Tt.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(ut,Tt);var Od=/^https?$/i,Md=["POST","PUT"];r=ut.prototype,r.Ha=function(o){this.J=o},r.ea=function(o,c,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ti.g(),this.v=this.o?Ta(this.o):Ta(Ti),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(b){Ga(this,b);return}if(o=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var v in m)h.set(v,m[v]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const b of m.keys())h.set(b,m.get(b));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(b=>b.toLowerCase()=="content-type"),v=u.FormData&&o instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Md,c,void 0))||m||v||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,N]of h)this.g.setRequestHeader(b,N);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Wa(this),this.u=!0,this.g.send(o),this.u=!1}catch(b){Ga(this,b)}};function Ga(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,$a(o),Hr(o)}function $a(o){o.A||(o.A=!0,bt(o,"complete"),bt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,bt(this,"complete"),bt(this,"abort"),Hr(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Hr(this,!0)),ut.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Qa(this):this.bb())},r.bb=function(){Qa(this)};function Qa(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Yt(o)!=4||o.Z()!=2)){if(o.u&&Yt(o)==4)pa(o.Ea,0,o);else if(bt(o,"readystatechange"),Yt(o)==4){o.h=!1;try{const N=o.Z();t:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var h;if(!(h=c)){var m;if(m=N===0){var v=String(o.D).match(Fa)[1]||null;!v&&u.self&&u.self.location&&(v=u.self.location.protocol.slice(0,-1)),m=!Od.test(v?v.toLowerCase():"")}h=m}if(h)bt(o,"complete"),bt(o,"success");else{o.m=6;try{var b=2<Yt(o)?o.g.statusText:""}catch{b=""}o.l=b+" ["+o.Z()+"]",$a(o)}}finally{Hr(o)}}}}function Hr(o,c){if(o.g){Wa(o);const h=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||bt(o,"ready");try{h.onreadystatechange=m}catch{}}}function Wa(o){o.I&&(u.clearTimeout(o.I),o.I=null)}r.isActive=function(){return!!this.g};function Yt(o){return o.g?o.g.readyState:0}r.Z=function(){try{return 2<Yt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),md(c)}};function Ha(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Fd(o){const c={};o=(o.g&&2<=Yt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(q(o[m]))continue;var h=w(o[m]);const v=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const b=c[v]||[];c[v]=b,b.push(h)}I(c,function(m){return m.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Qn(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function Xa(o){this.Aa=0,this.i=[],this.j=new Bn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Qn("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Qn("baseRetryDelayMs",5e3,o),this.cb=Qn("retryDelaySeedMs",1e4,o),this.Wa=Qn("forwardChannelMaxRetries",2,o),this.wa=Qn("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new xa(o&&o.concurrentRequestLimit),this.Da=new kd,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Xa.prototype,r.la=8,r.G=1,r.connect=function(o,c,h,m){St(0),this.W=o,this.H=c||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.I=iu(this,null,this.W),Jr(this)};function bi(o){if(Ja(o),o.G==3){var c=o.U++,h=Jt(o.I);if(nt(h,"SID",o.K),nt(h,"RID",c),nt(h,"TYPE","terminate"),Wn(o,h),c=new ae(o,o.j,c),c.L=2,c.v=$r(Jt(h)),h=!1,u.navigator&&u.navigator.sendBeacon)try{h=u.navigator.sendBeacon(c.v.toString(),"")}catch{}!h&&u.Image&&(new Image().src=c.v,h=!0),h||(c.g=ou(c.j,null),c.g.ea(c.v)),c.F=Date.now(),zr(c)}su(o)}function Xr(o){o.g&&(Vi(o),o.g.cancel(),o.g=null)}function Ja(o){Xr(o),o.u&&(u.clearTimeout(o.u),o.u=null),Yr(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&u.clearTimeout(o.s),o.s=null)}function Jr(o){if(!Da(o.h)&&!o.s){o.s=!0;var c=o.Ga;kn||ca(),Nn||(kn(),Nn=!0),ai.add(c,o),o.B=0}}function Ld(o,c){return ka(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Un(T(o.Ga,o,c),ru(o,o.B)),o.B++,!0)}r.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const v=new ae(this,this.j,o);let b=this.o;if(this.S&&(b?(b=g(b),E(b,this.S)):b=this.S),this.m!==null||this.O||(v.H=b,b=null),this.P)t:{for(var c=0,h=0;h<this.i.length;h++){e:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break e}m=void 0}if(m===void 0)break;if(c+=m,4096<c){c=h;break t}if(c===4096||h===this.i.length-1){c=h+1;break t}}c=1e3}else c=1e3;c=Za(this,v,c),h=Jt(this.I),nt(h,"RID",o),nt(h,"CVER",22),this.D&&nt(h,"X-HTTP-Session-Id",this.D),Wn(this,h),b&&(this.O?c="headers="+encodeURIComponent(String(Ka(b)))+"&"+c:this.m&&Pi(h,this.m,b)),Ri(this.h,v),this.Ua&&nt(h,"TYPE","init"),this.P?(nt(h,"$req",c),nt(h,"SID","null"),v.T=!0,Ei(v,h,null)):Ei(v,h,c),this.G=2}}else this.G==3&&(o?Ya(this,o):this.i.length==0||Da(this.h)||Ya(this))};function Ya(o,c){var h;c?h=c.l:h=o.U++;const m=Jt(o.I);nt(m,"SID",o.K),nt(m,"RID",h),nt(m,"AID",o.T),Wn(o,m),o.m&&o.o&&Pi(m,o.m,o.o),h=new ae(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),c&&(o.i=c.D.concat(o.i)),c=Za(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ri(o.h,h),Ei(h,m,c)}function Wn(o,c){o.H&&G(o.H,function(h,m){nt(c,m,h)}),o.l&&Ma({},function(h,m){nt(c,m,h)})}function Za(o,c,h){h=Math.min(o.i.length,h);var m=o.l?T(o.l.Na,o.l,o):null;t:{var v=o.i;let b=-1;for(;;){const N=["count="+h];b==-1?0<h?(b=v[0].g,N.push("ofs="+b)):b=0:N.push("ofs="+b);let tt=!0;for(let pt=0;pt<h;pt++){let X=v[pt].g;const It=v[pt].map;if(X-=b,0>X)b=Math.max(0,v[pt].g-100),tt=!1;else try{Nd(It,N,"req"+X+"_")}catch{m&&m(It)}}if(tt){m=N.join("&");break t}}}return o=o.i.splice(0,h),c.D=o,m}function tu(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;kn||ca(),Nn||(kn(),Nn=!0),ai.add(c,o),o.v=0}}function Si(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Un(T(o.Fa,o),ru(o,o.v)),o.v++,!0)}r.Fa=function(){if(this.u=null,eu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Un(T(this.ab,this),o)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,St(10),Xr(this),eu(this))};function Vi(o){o.A!=null&&(u.clearTimeout(o.A),o.A=null)}function eu(o){o.g=new ae(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=Jt(o.qa);nt(c,"RID","rpc"),nt(c,"SID",o.K),nt(c,"AID",o.T),nt(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&nt(c,"TO",o.ja),nt(c,"TYPE","xmlhttp"),Wn(o,c),o.m&&o.o&&Pi(c,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=$r(Jt(c)),h.m=null,h.P=!0,Sa(h,o)}r.Za=function(){this.C!=null&&(this.C=null,Xr(this),Si(this),St(19))};function Yr(o){o.C!=null&&(u.clearTimeout(o.C),o.C=null)}function nu(o,c){var h=null;if(o.g==c){Yr(o),Vi(o),o.g=null;var m=2}else if(Ai(o.h,c))h=c.D,Na(o.h,c),m=1;else return;if(o.G!=0){if(c.o)if(m==1){h=c.m?c.m.length:0,c=Date.now()-c.F;var v=o.B;m=Br(),bt(m,new Aa(m,h)),Jr(o)}else tu(o);else if(v=c.s,v==3||v==0&&0<c.X||!(m==1&&Ld(o,c)||m==2&&Si(o)))switch(h&&0<h.length&&(c=o.h,c.i=c.i.concat(h)),v){case 1:be(o,5);break;case 4:be(o,10);break;case 3:be(o,6);break;default:be(o,2)}}}function ru(o,c){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*c}function be(o,c){if(o.j.info("Error code "+c),c==2){var h=T(o.fb,o),m=o.Xa;const v=!m;m=new Pe(m||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Kr(m,"https"),$r(m),v?xd(m.toString(),h):Dd(m.toString(),h)}else St(2);o.G=0,o.l&&o.l.sa(c),su(o),Ja(o)}r.fb=function(o){o?(this.j.info("Successfully pinged google.com"),St(2)):(this.j.info("Failed to ping google.com"),St(1))};function su(o){if(o.G=0,o.ka=[],o.l){const c=Oa(o.h);(c.length!=0||o.i.length!=0)&&(V(o.ka,c),V(o.ka,o.i),o.h.i.length=0,D(o.i),o.i.length=0),o.l.ra()}}function iu(o,c,h){var m=h instanceof Pe?Jt(h):new Pe(h);if(m.g!="")c&&(m.g=c+"."+m.g),Gr(m,m.s);else{var v=u.location;m=v.protocol,c=c?c+"."+v.hostname:v.hostname,v=+v.port;var b=new Pe(null);m&&Kr(b,m),c&&(b.g=c),v&&Gr(b,v),h&&(b.l=h),m=b}return h=o.D,c=o.ya,h&&c&&nt(m,h,c),nt(m,"VER",o.la),Wn(o,m),m}function ou(o,c,h){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new ut(new Qr({eb:h})):new ut(o.pa),c.Ha(o.J),c}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function au(){}r=au.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Zr(){}Zr.prototype.g=function(o,c){return new Ft(o,c)};function Ft(o,c){Tt.call(this),this.g=new Xa(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!q(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!q(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new tn(this)}C(Ft,Tt),Ft.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ft.prototype.close=function(){bi(this.g)},Ft.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=pi(o),o=h);c.i.push(new Ed(c.Ya++,o)),c.G==3&&Jr(c)},Ft.prototype.N=function(){this.g.l=null,delete this.j,bi(this.g),delete this.g,Ft.aa.N.call(this)};function uu(o){_i.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){t:{for(const h in c){o=h;break t}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}C(uu,_i);function lu(){yi.call(this),this.status=1}C(lu,yi);function tn(o){this.g=o}C(tn,au),tn.prototype.ua=function(){bt(this.g,"a")},tn.prototype.ta=function(o){bt(this.g,new uu(o))},tn.prototype.sa=function(o){bt(this.g,new lu)},tn.prototype.ra=function(){bt(this.g,"b")},Zr.prototype.createWebChannel=Zr.prototype.g,Ft.prototype.send=Ft.prototype.o,Ft.prototype.open=Ft.prototype.m,Ft.prototype.close=Ft.prototype.close,Fl=function(){return new Zr},Ml=function(){return Br()},Ol=Ae,Bi={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},qr.NO_ERROR=0,qr.TIMEOUT=8,qr.HTTP_ERROR=6,ls=qr,Ra.COMPLETE="complete",Nl=Ra,Ia.EventType=Fn,Fn.OPEN="a",Fn.CLOSE="b",Fn.ERROR="c",Fn.MESSAGE="d",Tt.prototype.listen=Tt.prototype.K,er=Ia,ut.prototype.listenOnce=ut.prototype.L,ut.prototype.getLastError=ut.prototype.Ka,ut.prototype.getLastErrorCode=ut.prototype.Ba,ut.prototype.getStatus=ut.prototype.Z,ut.prototype.getResponseJson=ut.prototype.Oa,ut.prototype.getResponseText=ut.prototype.oa,ut.prototype.send=ut.prototype.ea,ut.prototype.setWithCredentials=ut.prototype.Ha,kl=ut}).apply(typeof es<"u"?es:typeof self<"u"?self:typeof window<"u"?window:{});const hu="@firebase/firestore";/**
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
 */class vt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}vt.UNAUTHENTICATED=new vt(null),vt.GOOGLE_CREDENTIALS=new vt("google-credentials-uid"),vt.FIRST_PARTY=new vt("first-party-uid"),vt.MOCK_USER=new vt("mock-user");/**
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
 */let Pn="10.14.0";/**
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
 */const Fe=new Ud("@firebase/firestore");function un(){return Fe.logLevel}function x(r,...t){if(Fe.logLevel<=Zt.DEBUG){const e=t.map(co);Fe.debug(`Firestore (${Pn}): ${r}`,...e)}}function ht(r,...t){if(Fe.logLevel<=Zt.ERROR){const e=t.map(co);Fe.error(`Firestore (${Pn}): ${r}`,...e)}}function pn(r,...t){if(Fe.logLevel<=Zt.WARN){const e=t.map(co);Fe.warn(`Firestore (${Pn}): ${r}`,...e)}}function co(r){if(typeof r=="string")return r;try{/**
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
 */function F(r="Unexpected state"){const t=`FIRESTORE (${Pn}) INTERNAL ASSERTION FAILED: `+r;throw ht(t),new Error(t)}function U(r,t){r||F()}function L(r,t){return r}/**
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
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends Sl{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class $t{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
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
 */class Kd{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Ll{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(vt.UNAUTHENTICATED))}shutdown(){}}class Gd{constructor(t){this.t=t,this.currentUser=vt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){U(this.o===void 0);let n=this.i;const s=l=>this.i!==n?(n=this.i,e(l)):Promise.resolve();let i=new $t;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new $t,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;t.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},u=l=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>u(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?u(l):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new $t)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(U(typeof n.accessToken=="string"),new Kd(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return U(t===null||typeof t=="string"),new vt(t)}}class $d{constructor(t,e,n){this.l=t,this.h=e,this.P=n,this.type="FirstParty",this.user=vt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Qd{constructor(t,e,n){this.l=t,this.h=e,this.P=n}getToken(){return Promise.resolve(new $d(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(vt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Wd{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Hd{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){U(this.o===void 0);const n=i=>{i.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,x("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>n(i))};const s=i=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(U(typeof e.token=="string"),this.R=e.token,new Wd(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Xd(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
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
 */class ho{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const s=Xd(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%t.length))}return n}}function K(r,t){return r<t?-1:r>t?1:0}function gn(r,t,e){return r.length===t.length&&r.every((n,s)=>e(n,t[s]))}function Ul(r){return r+"\0"}/**
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
 */class ot{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return ot.fromMillis(Date.now())}static fromDate(t){return ot.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new ot(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?K(this.nanoseconds,t.nanoseconds):K(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class B{constructor(t){this.timestamp=t}static fromTimestamp(t){return new B(t)}static min(){return new B(new ot(0,0))}static max(){return new B(new ot(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class fr{constructor(t,e,n){e===void 0?e=0:e>t.length&&F(),n===void 0?n=t.length-e:n>t.length-e&&F(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return fr.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof fr?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const i=t.get(s),a=e.get(s);if(i<a)return-1;if(i>a)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class J extends fr{construct(t,e,n){return new J(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new k(S.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(s=>s.length>0))}return new J(e)}static emptyPath(){return new J([])}}const Jd=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class it extends fr{construct(t,e,n){return new it(t,e,n)}static isValidIdentifier(t){return Jd.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),it.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new it(["__name__"])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(n.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new k(S.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const l=t[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new k(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=l,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(i(),s++)}if(i(),a)throw new k(S.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new it(e)}static emptyPath(){return new it([])}}/**
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
 */class O{constructor(t){this.path=t}static fromPath(t){return new O(J.fromString(t))}static fromName(t){return new O(J.fromString(t).popFirst(5))}static empty(){return new O(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&J.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return J.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new O(new J(t.slice()))}}/**
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
 */class Ts{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}function qi(r){return r.fields.find(t=>t.kind===2)}function Ve(r){return r.fields.filter(t=>t.kind!==2)}Ts.UNKNOWN_ID=-1;class cs{constructor(t,e){this.fieldPath=t,this.kind=e}}class mr{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new mr(0,qt.min())}}function Bl(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=B.fromTimestamp(n===1e9?new ot(e+1,0):new ot(e,n));return new qt(s,O.empty(),t)}function ql(r){return new qt(r.readTime,r.key,-1)}class qt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new qt(B.min(),O.empty(),-1)}static max(){return new qt(B.max(),O.empty(),-1)}}function fo(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=O.comparator(r.documentKey,t.documentKey),e!==0?e:K(r.largestBatchId,t.largestBatchId))}/**
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
 */const jl="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class zl{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
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
 */async function Ie(r){if(r.code!==S.FAILED_PRECONDITION||r.message!==jl)throw r;x("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class A{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&F(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new A((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof A?e:A.resolve(e)}catch(e){return A.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):A.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):A.reject(e)}static resolve(t){return new A((e,n)=>{e(t)})}static reject(t){return new A((e,n)=>{n(t)})}static waitFor(t){return new A((e,n)=>{let s=0,i=0,a=!1;t.forEach(u=>{++s,u.next(()=>{++i,a&&i===s&&e()},l=>n(l))}),a=!0,i===s&&e()})}static or(t){let e=A.resolve(!1);for(const n of t)e=e.next(s=>s?A.resolve(s):n());return e}static forEach(t,e){const n=[];return t.forEach((s,i)=>{n.push(e.call(this,s,i))}),this.waitFor(n)}static mapArray(t,e){return new A((n,s)=>{const i=t.length,a=new Array(i);let u=0;for(let l=0;l<i;l++){const d=l;e(t[d]).next(f=>{a[d]=f,++u,u===i&&n(a)},f=>s(f))}})}static doWhile(t,e){return new A((n,s)=>{const i=()=>{t()===!0?e().next(()=>{i()},s):n()};i()})}}/**
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
 */class Os{constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.V=new $t,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{e.error?this.V.reject(new ir(t,e.error)):this.V.resolve()},this.transaction.onerror=n=>{const s=mo(n.target.error);this.V.reject(new ir(t,s))}}static open(t,e,n,s){try{return new Os(e,t.transaction(s,n))}catch(i){throw new ir(e,i)}}get m(){return this.V.promise}abort(t){t&&this.V.reject(t),this.aborted||(x("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new Zd(e)}}class pe{constructor(t,e,n){this.name=t,this.version=e,this.p=n,pe.S(ys())===12.2&&ht("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return x("SimpleDb","Removing database:",t),Ce(window.indexedDB.deleteDatabase(t)).toPromise()}static D(){if(!Bd())return!1;if(pe.v())return!0;const t=ys(),e=pe.S(t),n=0<e&&e<10,s=Kl(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static v(){var t;return typeof process<"u"&&((t=process.__PRIVATE_env)===null||t===void 0?void 0:t.C)==="YES"}static F(t,e){return t.store(e)}static S(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(t){return this.db||(x("SimpleDb","Opening database:",this.name),this.db=await new Promise((e,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;e(a)},s.onblocked=()=>{n(new ir(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new k(S.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new k(S.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new ir(t,a))},s.onupgradeneeded=i=>{x("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;this.p.O(a,s.transaction,i.oldVersion,this.version).next(()=>{x("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=e=>this.N(e)),this.db}L(t){this.N=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,s){const i=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.M(t);const u=Os.open(this.db,t,i?"readonly":"readwrite",n),l=s(u).next(d=>(u.g(),d)).catch(d=>(u.abort(d),A.reject(d))).toPromise();return l.catch(()=>{}),await u.m,l}catch(u){const l=u,d=l.name!=="FirebaseError"&&a<3;if(x("SimpleDb","Transaction failed with error:",l.message,"Retrying:",d),this.close(),!d)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Kl(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class Yd{constructor(t){this.B=t,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(t){this.B=t}done(){this.k=!0}$(t){this.q=t}delete(){return Ce(this.B.delete())}}class ir extends k{constructor(t,e){super(S.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Ee(r){return r.name==="IndexedDbTransactionError"}class Zd{constructor(t){this.store=t}put(t,e){let n;return e!==void 0?(x("SimpleDb","PUT",this.store.name,t,e),n=this.store.put(e,t)):(x("SimpleDb","PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),Ce(n)}add(t){return x("SimpleDb","ADD",this.store.name,t,t),Ce(this.store.add(t))}get(t){return Ce(this.store.get(t)).next(e=>(e===void 0&&(e=null),x("SimpleDb","GET",this.store.name,t,e),e))}delete(t){return x("SimpleDb","DELETE",this.store.name,t),Ce(this.store.delete(t))}count(){return x("SimpleDb","COUNT",this.store.name),Ce(this.store.count())}U(t,e){const n=this.options(t,e),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A((a,u)=>{i.onerror=l=>{u(l.target.error)},i.onsuccess=l=>{a(l.target.result)}})}{const i=this.cursor(n),a=[];return this.W(i,(u,l)=>{a.push(l)}).next(()=>a)}}G(t,e){const n=this.store.getAll(t,e===null?void 0:e);return new A((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}})}j(t,e){x("SimpleDb","DELETE ALL",this.store.name);const n=this.options(t,e);n.H=!1;const s=this.cursor(n);return this.W(s,(i,a,u)=>u.delete())}J(t,e){let n;e?n=t:(n={},e=t);const s=this.cursor(n);return this.W(s,e)}Y(t){const e=this.cursor({});return new A((n,s)=>{e.onerror=i=>{const a=mo(i.target.error);s(a)},e.onsuccess=i=>{const a=i.target.result;a?t(a.primaryKey,a.value).next(u=>{u?a.continue():n()}):n()}})}W(t,e){const n=[];return new A((s,i)=>{t.onerror=a=>{i(a.target.error)},t.onsuccess=a=>{const u=a.target.result;if(!u)return void s();const l=new Yd(u),d=e(u.primaryKey,u.value,l);if(d instanceof A){const f=d.catch(p=>(l.done(),A.reject(p)));n.push(f)}l.isDone?s():l.K===null?u.continue():u.continue(l.K)}}).next(()=>A.waitFor(n))}options(t,e){let n;return t!==void 0&&(typeof t=="string"?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.H?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function Ce(r){return new A((t,e)=>{r.onsuccess=n=>{const s=n.target.result;t(s)},r.onerror=n=>{const s=mo(n.target.error);e(s)}})}let du=!1;function mo(r){const t=pe.S(ys());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(e)>=0){const n=new k("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return du||(du=!0,setTimeout(()=>{throw n},0)),n}}return r}class tf{constructor(t,e){this.asyncQueue=t,this.Z=e,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(t){x("IndexBackfiller",`Scheduled in ${t}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,async()=>{this.task=null;try{x("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(e){Ee(e)?x("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",e):await Ie(e)}await this.X(6e4)})}}class ef{constructor(t,e){this.localStore=t,this.persistence=e}async ee(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",e=>this.te(e,t))}te(t,e){const n=new Set;let s=e,i=!0;return A.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next(a=>{if(a!==null&&!n.has(a))return x("IndexBackfiller",`Processing collection: ${a}`),this.ne(t,a,s).next(u=>{s-=u,n.add(a)});i=!1})).next(()=>e-s)}ne(t,e,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next(s=>this.localStore.localDocuments.getNextDocuments(t,e,s,n).next(i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next(()=>this.re(s,i)).next(u=>(x("IndexBackfiller",`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(t,e,u))).next(()=>a.size)}))}re(t,e){let n=t;return e.changes.forEach((s,i)=>{const a=ql(i);fo(a,n)>0&&(n=a)}),new qt(n.readTime,n.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
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
 */class Nt{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ie(n),this.se=n=>e.writeSequenceNumber(n))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}Nt.oe=-1;function Ms(r){return r==null}function pr(r){return r===0&&1/r==-1/0}function Gl(r){return typeof r=="number"&&Number.isInteger(r)&&!pr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */function Ct(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=fu(t)),t=nf(r.get(e),t);return fu(t)}function nf(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":e+="";break;case"":e+="";break;default:e+=i}}return e}function fu(r){return r+""}function zt(r){const t=r.length;if(U(t>=2),t===2)return U(r.charAt(0)===""&&r.charAt(1)===""),J.emptyPath();const e=t-2,n=[];let s="";for(let i=0;i<t;){const a=r.indexOf("",i);switch((a<0||a>e)&&F(),r.charAt(a+1)){case"":const u=r.substring(i,a);let l;s.length===0?l=u:(s+=u,l=s,s=""),n.push(l);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:F()}i=a+2}return new J(n)}/**
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
 */const mu=["userId","batchId"];/**
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
 */function hs(r,t){return[r,Ct(t)]}function $l(r,t,e){return[r,Ct(t),e]}const rf={},sf=["prefixPath","collectionGroup","readTime","documentId"],of=["prefixPath","collectionGroup","documentId"],af=["collectionGroup","readTime","prefixPath","documentId"],uf=["canonicalId","targetId"],lf=["targetId","path"],cf=["path","targetId"],hf=["collectionId","parent"],df=["indexId","uid"],ff=["uid","sequenceNumber"],mf=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],pf=["indexId","uid","orderedDocumentKey"],gf=["userId","collectionPath","documentId"],_f=["userId","collectionPath","largestBatchId"],yf=["userId","collectionGroup","largestBatchId"],Ql=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],Tf=[...Ql,"documentOverlays"],Wl=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Hl=Wl,po=[...Hl,"indexConfiguration","indexState","indexEntries"],If=po,Ef=[...po,"globals"];/**
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
 */class ji extends zl{constructor(t,e){super(),this._e=t,this.currentSequenceNumber=e}}function ft(r,t){const e=L(r);return pe.F(e._e,t)}/**
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
 */function pu(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function Qe(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function Xl(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
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
 */class et{constructor(t,e){this.comparator=t,this.root=e||gt.EMPTY}insert(t,e){return new et(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,gt.BLACK,null,null))}remove(t){return new et(this.comparator,this.root.remove(t,this.comparator).copy(null,null,gt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new ns(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new ns(this.root,t,this.comparator,!1)}getReverseIterator(){return new ns(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new ns(this.root,t,this.comparator,!0)}}class ns{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class gt{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=n??gt.RED,this.left=s??gt.EMPTY,this.right=i??gt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new gt(t??this.key,e??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return gt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return gt.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,gt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,gt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw F();const t=this.left.check();if(t!==this.right.check())throw F();return t+(this.isRed()?0:1)}}gt.EMPTY=null,gt.RED=!0,gt.BLACK=!1;gt.EMPTY=new class{constructor(){this.size=0}get key(){throw F()}get value(){throw F()}get color(){throw F()}get left(){throw F()}get right(){throw F()}copy(t,e,n,s,i){return this}insert(t,e,n){return new gt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Z{constructor(t){this.comparator=t,this.data=new et(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new gu(this.data.getIterator())}getIteratorFrom(t){return new gu(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof Z)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new Z(this.comparator);return e.data=t,e}}class gu{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function nn(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class Ot{constructor(t){this.fields=t,t.sort(it.comparator)}static empty(){return new Ot([])}unionWith(t){let e=new Z(it.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Ot(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return gn(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
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
 */class Jl extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ct{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Jl("Invalid base64 string: "+i):i}}(t);return new ct(e)}static fromUint8Array(t){const e=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(t);return new ct(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return K(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ct.EMPTY_BYTE_STRING=new ct("");const wf=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function se(r){if(U(!!r),typeof r=="string"){let t=0;const e=wf.exec(r);if(U(!!e),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:st(r.seconds),nanos:st(r.nanos)}}function st(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ge(r){return typeof r=="string"?ct.fromBase64String(r):ct.fromUint8Array(r)}/**
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
 */function go(r){var t,e;return((e=(((t=r?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function _o(r){const t=r.mapValue.fields.__previous_value__;return go(t)?_o(t):t}function gr(r){const t=se(r.mapValue.fields.__local_write_time__.timestampValue);return new ot(t.seconds,t.nanos)}/**
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
 */class vf{constructor(t,e,n,s,i,a,u,l,d){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=l,this.useFetchStreams=d}}class _e{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new _e("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof _e&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const me={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},ds={nullValue:"NULL_VALUE"};function Le(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?go(r)?4:Yl(r)?9007199254740991:Fs(r)?10:11:F()}function Qt(r,t){if(r===t)return!0;const e=Le(r);if(e!==Le(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return gr(r).isEqual(gr(t));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=se(s.timestampValue),u=se(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(s,i){return ge(s.bytesValue).isEqual(ge(i.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(s,i){return st(s.geoPointValue.latitude)===st(i.geoPointValue.latitude)&&st(s.geoPointValue.longitude)===st(i.geoPointValue.longitude)}(r,t);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return st(s.integerValue)===st(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=st(s.doubleValue),u=st(i.doubleValue);return a===u?pr(a)===pr(u):isNaN(a)&&isNaN(u)}return!1}(r,t);case 9:return gn(r.arrayValue.values||[],t.arrayValue.values||[],Qt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(pu(a)!==pu(u))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(u[l]===void 0||!Qt(a[l],u[l])))return!1;return!0}(r,t);default:return F()}}function _r(r,t){return(r.values||[]).find(e=>Qt(e,t))!==void 0}function ye(r,t){if(r===t)return 0;const e=Le(r),n=Le(t);if(e!==n)return K(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return K(r.booleanValue,t.booleanValue);case 2:return function(i,a){const u=st(i.integerValue||i.doubleValue),l=st(a.integerValue||a.doubleValue);return u<l?-1:u>l?1:u===l?0:isNaN(u)?isNaN(l)?0:-1:1}(r,t);case 3:return _u(r.timestampValue,t.timestampValue);case 4:return _u(gr(r),gr(t));case 5:return K(r.stringValue,t.stringValue);case 6:return function(i,a){const u=ge(i),l=ge(a);return u.compareTo(l)}(r.bytesValue,t.bytesValue);case 7:return function(i,a){const u=i.split("/"),l=a.split("/");for(let d=0;d<u.length&&d<l.length;d++){const f=K(u[d],l[d]);if(f!==0)return f}return K(u.length,l.length)}(r.referenceValue,t.referenceValue);case 8:return function(i,a){const u=K(st(i.latitude),st(a.latitude));return u!==0?u:K(st(i.longitude),st(a.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return yu(r.arrayValue,t.arrayValue);case 10:return function(i,a){var u,l,d,f;const p=i.fields||{},T=a.fields||{},P=(u=p.value)===null||u===void 0?void 0:u.arrayValue,C=(l=T.value)===null||l===void 0?void 0:l.arrayValue,D=K(((d=P?.values)===null||d===void 0?void 0:d.length)||0,((f=C?.values)===null||f===void 0?void 0:f.length)||0);return D!==0?D:yu(P,C)}(r.mapValue,t.mapValue);case 11:return function(i,a){if(i===me.mapValue&&a===me.mapValue)return 0;if(i===me.mapValue)return 1;if(a===me.mapValue)return-1;const u=i.fields||{},l=Object.keys(u),d=a.fields||{},f=Object.keys(d);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const T=K(l[p],f[p]);if(T!==0)return T;const P=ye(u[l[p]],d[f[p]]);if(P!==0)return P}return K(l.length,f.length)}(r.mapValue,t.mapValue);default:throw F()}}function _u(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return K(r,t);const e=se(r),n=se(t),s=K(e.seconds,n.seconds);return s!==0?s:K(e.nanos,n.nanos)}function yu(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const i=ye(e[s],n[s]);if(i)return i}return K(e.length,n.length)}function _n(r){return zi(r)}function zi(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=se(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return ge(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return O.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",s=!0;for(const i of e.values||[])s?s=!1:n+=",",n+=zi(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${zi(e.fields[a])}`;return s+"}"}(r.mapValue):F()}function yr(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function Ki(r){return!!r&&"integerValue"in r}function Tr(r){return!!r&&"arrayValue"in r}function Tu(r){return!!r&&"nullValue"in r}function Iu(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function fs(r){return!!r&&"mapValue"in r}function Fs(r){var t,e;return((e=(((t=r?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function or(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const t={mapValue:{fields:{}}};return Qe(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=or(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=or(r.arrayValue.values[e]);return t}return Object.assign({},r)}function Yl(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const Zl={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function Af(r){return"nullValue"in r?ds:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?yr(_e.empty(),O.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Fs(r)?Zl:{mapValue:{}}:F()}function Rf(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?yr(_e.empty(),O.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Zl:"mapValue"in r?Fs(r)?{mapValue:{}}:me:F()}function Eu(r,t){const e=ye(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?-1:!r.inclusive&&t.inclusive?1:0}function wu(r,t){const e=ye(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?1:!r.inclusive&&t.inclusive?-1:0}/**
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
 */class At{constructor(t){this.value=t}static empty(){return new At({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!fs(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=or(e)}setAll(t){let e=it.emptyPath(),n={},s=[];t.forEach((a,u)=>{if(!e.isImmediateParentOf(u)){const l=this.getFieldsMap(e);this.applyChanges(l,n,s),n={},s=[],e=u.popLast()}a?n[u.lastSegment()]=or(a):s.push(u.lastSegment())});const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());fs(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Qt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];fs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){Qe(e,(s,i)=>t[s]=i);for(const s of n)delete t[s]}clone(){return new At(or(this.value))}}function tc(r){const t=[];return Qe(r.fields,(e,n)=>{const s=new it([e]);if(fs(n)){const i=tc(n.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)}),new Ot(t)}/**
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
 */class lt{constructor(t,e,n,s,i,a,u){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(t){return new lt(t,0,B.min(),B.min(),B.min(),At.empty(),0)}static newFoundDocument(t,e,n,s){return new lt(t,1,e,B.min(),n,s,0)}static newNoDocument(t,e){return new lt(t,2,e,B.min(),B.min(),At.empty(),0)}static newUnknownDocument(t,e){return new lt(t,3,e,B.min(),B.min(),At.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=At.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=At.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof lt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new lt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class yn{constructor(t,e){this.position=t,this.inclusive=e}}function vu(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const i=t[s],a=r.position[s];if(i.field.isKeyField()?n=O.comparator(O.fromName(a.referenceValue),e.key):n=ye(a,e.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Au(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!Qt(r.position[e],t.position[e]))return!1;return!0}/**
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
 */class Ir{constructor(t,e="asc"){this.field=t,this.dir=e}}function Pf(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
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
 */class ec{}class Q extends ec{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new bf(t,e,n):e==="array-contains"?new Cf(t,n):e==="in"?new ac(t,n):e==="not-in"?new xf(t,n):e==="array-contains-any"?new Df(t,n):new Q(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new Sf(t,n):new Vf(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(ye(e,this.value)):e!==null&&Le(this.value)===Le(e)&&this.matchesComparison(ye(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return F()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Y extends ec{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Y(t,e)}matches(t){return Tn(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Tn(r){return r.op==="and"}function Gi(r){return r.op==="or"}function yo(r){return nc(r)&&Tn(r)}function nc(r){for(const t of r.filters)if(t instanceof Y)return!1;return!0}function $i(r){if(r instanceof Q)return r.field.canonicalString()+r.op.toString()+_n(r.value);if(yo(r))return r.filters.map(t=>$i(t)).join(",");{const t=r.filters.map(e=>$i(e)).join(",");return`${r.op}(${t})`}}function rc(r,t){return r instanceof Q?function(n,s){return s instanceof Q&&n.op===s.op&&n.field.isEqual(s.field)&&Qt(n.value,s.value)}(r,t):r instanceof Y?function(n,s){return s instanceof Y&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,a,u)=>i&&rc(a,s.filters[u]),!0):!1}(r,t):void F()}function sc(r,t){const e=r.filters.concat(t);return Y.create(e,r.op)}function ic(r){return r instanceof Q?function(e){return`${e.field.canonicalString()} ${e.op} ${_n(e.value)}`}(r):r instanceof Y?function(e){return e.op.toString()+" {"+e.getFilters().map(ic).join(" ,")+"}"}(r):"Filter"}class bf extends Q{constructor(t,e,n){super(t,e,n),this.key=O.fromName(n.referenceValue)}matches(t){const e=O.comparator(t.key,this.key);return this.matchesComparison(e)}}class Sf extends Q{constructor(t,e){super(t,"in",e),this.keys=oc("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Vf extends Q{constructor(t,e){super(t,"not-in",e),this.keys=oc("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function oc(r,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(n=>O.fromName(n.referenceValue))}class Cf extends Q{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Tr(e)&&_r(e.arrayValue,this.value)}}class ac extends Q{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&_r(this.value.arrayValue,e)}}class xf extends Q{constructor(t,e){super(t,"not-in",e)}matches(t){if(_r(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!_r(this.value.arrayValue,e)}}class Df extends Q{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Tr(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>_r(this.value.arrayValue,n))}}/**
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
 */class kf{constructor(t,e=null,n=[],s=[],i=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.ue=null}}function Qi(r,t=null,e=[],n=[],s=null,i=null,a=null){return new kf(r,t,e,n,s,i,a)}function Ue(r){const t=L(r);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>$i(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),Ms(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>_n(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>_n(n)).join(",")),t.ue=e}return t.ue}function Ar(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!Pf(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!rc(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!Au(r.startAt,t.startAt)&&Au(r.endAt,t.endAt)}function Is(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Es(r,t){return r.filters.filter(e=>e instanceof Q&&e.field.isEqual(t))}function Ru(r,t,e){let n=ds,s=!0;for(const i of Es(r,t)){let a=ds,u=!0;switch(i.op){case"<":case"<=":a=Af(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,u=!1;break;case"!=":case"not-in":a=ds}Eu({value:n,inclusive:s},{value:a,inclusive:u})<0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Eu({value:n,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}function Pu(r,t,e){let n=me,s=!0;for(const i of Es(r,t)){let a=me,u=!0;switch(i.op){case">=":case">":a=Rf(i.value),u=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,u=!1;break;case"!=":case"not-in":a=me}wu({value:n,inclusive:s},{value:a,inclusive:u})>0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];wu({value:n,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}/**
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
 */class bn{constructor(t,e=null,n=[],s=[],i=null,a="F",u=null,l=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function uc(r,t,e,n,s,i,a,u){return new bn(r,t,e,n,s,i,a,u)}function Rr(r){return new bn(r)}function bu(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function lc(r){return r.collectionGroup!==null}function ar(r){const t=L(r);if(t.ce===null){t.ce=[];const e=new Set;for(const i of t.explicitOrderBy)t.ce.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new Z(it.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(u=u.add(d.field))})}),u})(t).forEach(i=>{e.has(i.canonicalString())||i.isKeyField()||t.ce.push(new Ir(i,n))}),e.has(it.keyField().canonicalString())||t.ce.push(new Ir(it.keyField(),n))}return t.ce}function Bt(r){const t=L(r);return t.le||(t.le=Nf(t,ar(r))),t.le}function Nf(r,t){if(r.limitType==="F")return Qi(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ir(s.field,i)});const e=r.endAt?new yn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new yn(r.startAt.position,r.startAt.inclusive):null;return Qi(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function Wi(r,t){const e=r.filters.concat([t]);return new bn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function ws(r,t,e){return new bn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function Ls(r,t){return Ar(Bt(r),Bt(t))&&r.limitType===t.limitType}function cc(r){return`${Ue(Bt(r))}|lt:${r.limitType}`}function ln(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(s=>ic(s)).join(", ")}]`),Ms(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>_n(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>_n(s)).join(",")),`Target(${n})`}(Bt(r))}; limitType=${r.limitType})`}function Pr(r,t){return t.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):O.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,t)&&function(n,s){for(const i of ar(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,t)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,t)&&function(n,s){return!(n.startAt&&!function(a,u,l){const d=vu(a,u,l);return a.inclusive?d<=0:d<0}(n.startAt,ar(n),s)||n.endAt&&!function(a,u,l){const d=vu(a,u,l);return a.inclusive?d>=0:d>0}(n.endAt,ar(n),s))}(r,t)}function hc(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function dc(r){return(t,e)=>{let n=!1;for(const s of ar(r)){const i=Of(s,t,e);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function Of(r,t,e){const n=r.field.isKeyField()?O.comparator(t.key,e.key):function(i,a,u){const l=a.data.field(i),d=u.data.field(i);return l!==null&&d!==null?ye(l,d):F()}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return F()}}/**
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
 */class we{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Qe(this.inner,(e,n)=>{for(const[s,i]of n)t(s,i)})}isEmpty(){return Xl(this.inner)}size(){return this.innerSize}}/**
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
 */const Mf=new et(O.comparator);function Lt(){return Mf}const fc=new et(O.comparator);function nr(...r){let t=fc;for(const e of r)t=t.insert(e.key,e);return t}function mc(r){let t=fc;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Kt(){return ur()}function pc(){return ur()}function ur(){return new we(r=>r.toString(),(r,t)=>r.isEqual(t))}const Ff=new et(O.comparator),Lf=new Z(O.comparator);function $(...r){let t=Lf;for(const e of r)t=t.add(e);return t}const Uf=new Z(K);function To(){return Uf}/**
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
 */function Io(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:pr(t)?"-0":t}}function gc(r){return{integerValue:""+r}}function Bf(r,t){return Gl(t)?gc(t):Io(r,t)}/**
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
 */class Us{constructor(){this._=void 0}}function qf(r,t,e){return r instanceof In?function(s,i){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&go(i)&&(i=_o(i)),i&&(a.fields.__previous_value__=i),{mapValue:a}}(e,t):r instanceof Be?yc(r,t):r instanceof qe?Tc(r,t):function(s,i){const a=_c(s,i),u=Su(a)+Su(s.Pe);return Ki(a)&&Ki(s.Pe)?gc(u):Io(s.serializer,u)}(r,t)}function jf(r,t,e){return r instanceof Be?yc(r,t):r instanceof qe?Tc(r,t):e}function _c(r,t){return r instanceof Er?function(n){return Ki(n)||function(i){return!!i&&"doubleValue"in i}(n)}(t)?t:{integerValue:0}:null}class In extends Us{}class Be extends Us{constructor(t){super(),this.elements=t}}function yc(r,t){const e=Ic(t);for(const n of r.elements)e.some(s=>Qt(s,n))||e.push(n);return{arrayValue:{values:e}}}class qe extends Us{constructor(t){super(),this.elements=t}}function Tc(r,t){let e=Ic(t);for(const n of r.elements)e=e.filter(s=>!Qt(s,n));return{arrayValue:{values:e}}}class Er extends Us{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function Su(r){return st(r.integerValue||r.doubleValue)}function Ic(r){return Tr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class Bs{constructor(t,e){this.field=t,this.transform=e}}function zf(r,t){return r.field.isEqual(t.field)&&function(n,s){return n instanceof Be&&s instanceof Be||n instanceof qe&&s instanceof qe?gn(n.elements,s.elements,Qt):n instanceof Er&&s instanceof Er?Qt(n.Pe,s.Pe):n instanceof In&&s instanceof In}(r.transform,t.transform)}class Kf{constructor(t,e){this.version=t,this.transformResults=e}}class Rt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Rt}static exists(t){return new Rt(void 0,t)}static updateTime(t){return new Rt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function ms(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class qs{}function Ec(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new js(r.key,Rt.none()):new Sn(r.key,r.data,Rt.none());{const e=r.data,n=At.empty();let s=new Z(it.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new ie(r.key,n,new Ot(s.toArray()),Rt.none())}}function Gf(r,t,e){r instanceof Sn?function(s,i,a){const u=s.value.clone(),l=Cu(s.fieldTransforms,i,a.transformResults);u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(r,t,e):r instanceof ie?function(s,i,a){if(!ms(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=Cu(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(wc(s)),l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(r,t,e):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function lr(r,t,e,n){return r instanceof Sn?function(i,a,u,l){if(!ms(i.precondition,a))return u;const d=i.value.clone(),f=xu(i.fieldTransforms,l,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(r,t,e,n):r instanceof ie?function(i,a,u,l){if(!ms(i.precondition,a))return u;const d=xu(i.fieldTransforms,l,a),f=a.data;return f.setAll(wc(i)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(r,t,e,n):function(i,a,u){return ms(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(r,t,e)}function $f(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),i=_c(n.transform,s||null);i!=null&&(e===null&&(e=At.empty()),e.set(n.field,i))}return e||null}function Vu(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&gn(n,s,(i,a)=>zf(i,a))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class Sn extends qs{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ie extends qs{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function wc(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function Cu(r,t,e){const n=new Map;U(r.length===e.length);for(let s=0;s<e.length;s++){const i=r[s],a=i.transform,u=t.data.field(i.field);n.set(i.field,jf(a,u,e[s]))}return n}function xu(r,t,e){const n=new Map;for(const s of r){const i=s.transform,a=e.data.field(s.field);n.set(s.field,qf(i,a,t))}return n}class js extends qs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class vc extends qs{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Eo{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Gf(i,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=lr(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=lr(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=pc();return this.mutations.forEach(s=>{const i=t.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=e.has(s.key)?null:u;const l=Ec(a,u);l!==null&&n.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(B.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),$())}isEqual(t){return this.batchId===t.batchId&&gn(this.mutations,t.mutations,(e,n)=>Vu(e,n))&&gn(this.baseMutations,t.baseMutations,(e,n)=>Vu(e,n))}}class wo{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){U(t.mutations.length===n.length);let s=function(){return Ff}();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new wo(t,e,n,s)}}/**
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
 */class vo{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class Qf{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var dt,W;function Wf(r){switch(r){default:return F();case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0}}function Ac(r){if(r===void 0)return ht("GRPC error has no .code"),S.UNKNOWN;switch(r){case dt.OK:return S.OK;case dt.CANCELLED:return S.CANCELLED;case dt.UNKNOWN:return S.UNKNOWN;case dt.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case dt.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case dt.INTERNAL:return S.INTERNAL;case dt.UNAVAILABLE:return S.UNAVAILABLE;case dt.UNAUTHENTICATED:return S.UNAUTHENTICATED;case dt.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case dt.NOT_FOUND:return S.NOT_FOUND;case dt.ALREADY_EXISTS:return S.ALREADY_EXISTS;case dt.PERMISSION_DENIED:return S.PERMISSION_DENIED;case dt.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case dt.ABORTED:return S.ABORTED;case dt.OUT_OF_RANGE:return S.OUT_OF_RANGE;case dt.UNIMPLEMENTED:return S.UNIMPLEMENTED;case dt.DATA_LOSS:return S.DATA_LOSS;default:return F()}}(W=dt||(dt={}))[W.OK=0]="OK",W[W.CANCELLED=1]="CANCELLED",W[W.UNKNOWN=2]="UNKNOWN",W[W.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",W[W.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",W[W.NOT_FOUND=5]="NOT_FOUND",W[W.ALREADY_EXISTS=6]="ALREADY_EXISTS",W[W.PERMISSION_DENIED=7]="PERMISSION_DENIED",W[W.UNAUTHENTICATED=16]="UNAUTHENTICATED",W[W.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",W[W.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",W[W.ABORTED=10]="ABORTED",W[W.OUT_OF_RANGE=11]="OUT_OF_RANGE",W[W.UNIMPLEMENTED=12]="UNIMPLEMENTED",W[W.INTERNAL=13]="INTERNAL",W[W.UNAVAILABLE=14]="UNAVAILABLE",W[W.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Hf(){return new TextEncoder}/**
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
 */const Xf=new Ne([4294967295,4294967295],0);function Du(r){const t=Hf().encode(r),e=new Dl;return e.update(t),new Uint8Array(e.digest())}function ku(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Ne([e,n],0),new Ne([s,i],0)]}class Ao{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new rr(`Invalid padding: ${e}`);if(n<0)throw new rr(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new rr(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new rr(`Invalid padding when bitmap length is 0: ${e}`);this.Ie=8*t.length-e,this.Te=Ne.fromNumber(this.Ie)}Ee(t,e,n){let s=t.add(e.multiply(Ne.fromNumber(n)));return s.compare(Xf)===1&&(s=new Ne([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const e=Du(t),[n,s]=ku(e);for(let i=0;i<this.hashCount;i++){const a=this.Ee(n,s,i);if(!this.de(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new Ao(i,s,e);return n.forEach(u=>a.insert(u)),a}insert(t){if(this.Ie===0)return;const e=Du(t),[n,s]=ku(e);for(let i=0;i<this.hashCount;i++){const a=this.Ee(n,s,i);this.Ae(a)}}Ae(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class rr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class br{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,Sr.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new br(B.min(),s,new et(K),Lt(),$())}}class Sr{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Sr(n,e,$(),$(),$())}}/**
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
 */class ps{constructor(t,e,n,s){this.Re=t,this.removedTargetIds=e,this.key=n,this.Ve=s}}class Rc{constructor(t,e){this.targetId=t,this.me=e}}class Pc{constructor(t,e,n=ct.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class Nu{constructor(){this.fe=0,this.ge=Mu(),this.pe=ct.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=$(),e=$(),n=$();return this.ge.forEach((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:F()}}),new Sr(this.pe,this.ye,t,e,n)}Ce(){this.we=!1,this.ge=Mu()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,U(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Jf{constructor(t){this.Le=t,this.Be=new Map,this.ke=Lt(),this.qe=Ou(),this.Qe=new et(K)}Ke(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(e,t.Ve):this.Ue(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.Ue(e,t.key,t.Ve)}We(t){this.forEachTarget(t,e=>{const n=this.Ge(e);switch(t.state){case 0:this.ze(e)&&n.De(t.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(t.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(e);break;case 3:this.ze(e)&&(n.Ne(),n.De(t.resumeToken));break;case 4:this.ze(e)&&(this.je(e),n.De(t.resumeToken));break;default:F()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((n,s)=>{this.ze(s)&&e(s)})}He(t){const e=t.targetId,n=t.me.count,s=this.Je(e);if(s){const i=s.target;if(Is(i))if(n===0){const a=new O(i.path);this.Ue(e,a,lt.newNoDocument(a,B.min()))}else U(n===1);else{const a=this.Ye(e);if(a!==n){const u=this.Ze(t),l=u?this.Xe(u,t,a):1;if(l!==0){this.je(e);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(e,d)}}}}}Ze(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=e;let a,u;try{a=ge(n).toUint8Array()}catch(l){if(l instanceof Jl)return pn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{u=new Ao(a,s,i)}catch(l){return pn(l instanceof rr?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return u.Ie===0?null:u}Xe(t,e,n){return e.me.count===n-this.nt(t,e.targetId)?0:2}nt(t,e){const n=this.Le.getRemoteKeysForTarget(e);let s=0;return n.forEach(i=>{const a=this.Le.tt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(u)||(this.Ue(e,i,null),s++)}),s}rt(t){const e=new Map;this.Be.forEach((i,a)=>{const u=this.Je(a);if(u){if(i.current&&Is(u.target)){const l=new O(u.target.path);this.ke.get(l)!==null||this.it(a,l)||this.Ue(a,l,lt.newNoDocument(l,t))}i.be&&(e.set(a,i.ve()),i.Ce())}});let n=$();this.qe.forEach((i,a)=>{let u=!0;a.forEachWhile(l=>{const d=this.Je(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(n=n.add(i))}),this.ke.forEach((i,a)=>a.setReadTime(t));const s=new br(t,e,this.Qe,this.ke,n);return this.ke=Lt(),this.qe=Ou(),this.Qe=new et(K),s}$e(t,e){if(!this.ze(t))return;const n=this.it(t,e.key)?2:0;this.Ge(t).Fe(e.key,n),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t))}Ue(t,e,n){if(!this.ze(t))return;const s=this.Ge(t);this.it(t,e)?s.Fe(e,1):s.Me(e),this.qe=this.qe.insert(e,this.st(e).delete(t)),n&&(this.ke=this.ke.insert(e,n))}removeTarget(t){this.Be.delete(t)}Ye(t){const e=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let e=this.Be.get(t);return e||(e=new Nu,this.Be.set(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new Z(K),this.qe=this.qe.insert(t,e)),e}ze(t){const e=this.Je(t)!==null;return e||x("WatchChangeAggregator","Detected inactive target",t),e}Je(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new Nu),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.Ue(t,e,null)})}it(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function Ou(){return new et(O.comparator)}function Mu(){return new et(O.comparator)}const Yf={asc:"ASCENDING",desc:"DESCENDING"},Zf={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},tm={and:"AND",or:"OR"};class em{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Hi(r,t){return r.useProto3Json||Ms(t)?t:{value:t}}function En(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function bc(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function nm(r,t){return En(r,t.toTimestamp())}function xt(r){return U(!!r),B.fromTimestamp(function(e){const n=se(e);return new ot(n.seconds,n.nanos)}(r))}function Ro(r,t){return Xi(r,t).canonicalString()}function Xi(r,t){const e=function(s){return new J(["projects",s.projectId,"databases",s.database])}(r).child("documents");return t===void 0?e:e.child(t)}function Sc(r){const t=J.fromString(r);return U(Fc(t)),t}function vs(r,t){return Ro(r.databaseId,t.path)}function Oe(r,t){const e=Sc(t);if(e.get(1)!==r.databaseId.projectId)throw new k(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new k(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new O(xc(e))}function Vc(r,t){return Ro(r.databaseId,t)}function Cc(r){const t=Sc(r);return t.length===4?J.emptyPath():xc(t)}function Ji(r){return new J(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function xc(r){return U(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function Fu(r,t,e){return{name:vs(r,t),fields:e.value.mapValue.fields}}function rm(r,t,e){const n=Oe(r,t.name),s=xt(t.updateTime),i=t.createTime?xt(t.createTime):B.min(),a=new At({mapValue:{fields:t.fields}}),u=lt.newFoundDocument(n,s,i,a);return e&&u.setHasCommittedMutations(),e?u.setHasCommittedMutations():u}function sm(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:F()}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(U(f===void 0||typeof f=="string"),ct.fromBase64String(f||"")):(U(f===void 0||f instanceof Buffer||f instanceof Uint8Array),ct.fromUint8Array(f||new Uint8Array))}(r,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&function(d){const f=d.code===void 0?S.UNKNOWN:Ac(d.code);return new k(f,d.message||"")}(a);e=new Pc(n,s,i,u||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=Oe(r,n.document.name),i=xt(n.document.updateTime),a=n.document.createTime?xt(n.document.createTime):B.min(),u=new At({mapValue:{fields:n.document.fields}}),l=lt.newFoundDocument(s,i,a,u),d=n.targetIds||[],f=n.removedTargetIds||[];e=new ps(d,f,l.key,l)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=Oe(r,n.document),i=n.readTime?xt(n.readTime):B.min(),a=lt.newNoDocument(s,i),u=n.removedTargetIds||[];e=new ps([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=Oe(r,n.document),i=n.removedTargetIds||[];e=new ps([],i,s,null)}else{if(!("filter"in t))return F();{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new Qf(s,i),u=n.targetId;e=new Rc(u,a)}}return e}function As(r,t){let e;if(t instanceof Sn)e={update:Fu(r,t.key,t.value)};else if(t instanceof js)e={delete:vs(r,t.key)};else if(t instanceof ie)e={update:Fu(r,t.key,t.data),updateMask:cm(t.fieldMask)};else{if(!(t instanceof vc))return F();e={verify:vs(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(i,a){const u=a.transform;if(u instanceof In)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Be)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof qe)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Er)return{fieldPath:a.field.canonicalString(),increment:u.Pe};throw F()}(0,n))),t.precondition.isNone||(e.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:nm(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:F()}(r,t.precondition)),e}function Yi(r,t){const e=t.currentDocument?function(i){return i.updateTime!==void 0?Rt.updateTime(xt(i.updateTime)):i.exists!==void 0?Rt.exists(i.exists):Rt.none()}(t.currentDocument):Rt.none(),n=t.updateTransforms?t.updateTransforms.map(s=>function(a,u){let l=null;if("setToServerValue"in u)U(u.setToServerValue==="REQUEST_TIME"),l=new In;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];l=new Be(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];l=new qe(f)}else"increment"in u?l=new Er(a,u.increment):F();const d=it.fromServerFormat(u.fieldPath);return new Bs(d,l)}(r,s)):[];if(t.update){t.update.name;const s=Oe(r,t.update.name),i=new At({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=function(l){const d=l.fieldPaths||[];return new Ot(d.map(f=>it.fromServerFormat(f)))}(t.updateMask);return new ie(s,i,a,e,n)}return new Sn(s,i,e,n)}if(t.delete){const s=Oe(r,t.delete);return new js(s,e)}if(t.verify){const s=Oe(r,t.verify);return new vc(s,e)}return F()}function im(r,t){return r&&r.length>0?(U(t!==void 0),r.map(e=>function(s,i){let a=s.updateTime?xt(s.updateTime):xt(i);return a.isEqual(B.min())&&(a=xt(i)),new Kf(a,s.transformResults||[])}(e,t))):[]}function Dc(r,t){return{documents:[Vc(r,t.path)]}}function kc(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=Vc(r,s);const i=function(d){if(d.length!==0)return Mc(Y.create(d,"and"))}(t.filters);i&&(e.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(f=>function(T){return{field:cn(T.field),direction:am(T.dir)}}(f))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=Hi(r,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{_t:e,parent:s}}function Nc(r){let t=Cc(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){U(n===1);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=function(p){const T=Oc(p);return T instanceof Y&&yo(T)?T.getFilters():[T]}(e.where));let a=[];e.orderBy&&(a=function(p){return p.map(T=>function(C){return new Ir(hn(C.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(T))}(e.orderBy));let u=null;e.limit&&(u=function(p){let T;return T=typeof p=="object"?p.value:p,Ms(T)?null:T}(e.limit));let l=null;e.startAt&&(l=function(p){const T=!!p.before,P=p.values||[];return new yn(P,T)}(e.startAt));let d=null;return e.endAt&&(d=function(p){const T=!p.before,P=p.values||[];return new yn(P,T)}(e.endAt)),uc(t,s,a,i,u,"F",l,d)}function om(r,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Oc(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=hn(e.unaryFilter.field);return Q.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=hn(e.unaryFilter.field);return Q.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=hn(e.unaryFilter.field);return Q.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=hn(e.unaryFilter.field);return Q.create(a,"!=",{nullValue:"NULL_VALUE"});default:return F()}}(r):r.fieldFilter!==void 0?function(e){return Q.create(hn(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return F()}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return Y.create(e.compositeFilter.filters.map(n=>Oc(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F()}}(e.compositeFilter.op))}(r):F()}function am(r){return Yf[r]}function um(r){return Zf[r]}function lm(r){return tm[r]}function cn(r){return{fieldPath:r.canonicalString()}}function hn(r){return it.fromServerFormat(r.fieldPath)}function Mc(r){return r instanceof Q?function(e){if(e.op==="=="){if(Iu(e.value))return{unaryFilter:{field:cn(e.field),op:"IS_NAN"}};if(Tu(e.value))return{unaryFilter:{field:cn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Iu(e.value))return{unaryFilter:{field:cn(e.field),op:"IS_NOT_NAN"}};if(Tu(e.value))return{unaryFilter:{field:cn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:cn(e.field),op:um(e.op),value:e.value}}}(r):r instanceof Y?function(e){const n=e.getFilters().map(s=>Mc(s));return n.length===1?n[0]:{compositeFilter:{op:lm(e.op),filters:n}}}(r):F()}function cm(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Fc(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
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
 */class ee{constructor(t,e,n,s,i=B.min(),a=B.min(),u=ct.EMPTY_BYTE_STRING,l=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=l}withSequenceNumber(t){return new ee(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new ee(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new ee(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new ee(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class Lc{constructor(t){this.ct=t}}function hm(r,t){let e;if(t.document)e=rm(r.ct,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const n=O.fromSegments(t.noDocument.path),s=ze(t.noDocument.readTime);e=lt.newNoDocument(n,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return F();{const n=O.fromSegments(t.unknownDocument.path),s=ze(t.unknownDocument.version);e=lt.newUnknownDocument(n,s)}}return t.readTime&&e.setReadTime(function(s){const i=new ot(s[0],s[1]);return B.fromTimestamp(i)}(t.readTime)),e}function Lu(r,t){const e=t.key,n={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:Rs(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=function(i,a){return{name:vs(i,a.key),fields:a.data.value.mapValue.fields,updateTime:En(i,a.version.toTimestamp()),createTime:En(i,a.createTime.toTimestamp())}}(r.ct,t);else if(t.isNoDocument())n.noDocument={path:e.path.toArray(),readTime:je(t.version)};else{if(!t.isUnknownDocument())return F();n.unknownDocument={path:e.path.toArray(),version:je(t.version)}}return n}function Rs(r){const t=r.toTimestamp();return[t.seconds,t.nanoseconds]}function je(r){const t=r.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function ze(r){const t=new ot(r.seconds,r.nanoseconds);return B.fromTimestamp(t)}function xe(r,t){const e=(t.baseMutations||[]).map(i=>Yi(r.ct,i));for(let i=0;i<t.mutations.length-1;++i){const a=t.mutations[i];if(i+1<t.mutations.length&&t.mutations[i+1].transform!==void 0){const u=t.mutations[i+1];a.updateTransforms=u.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const n=t.mutations.map(i=>Yi(r.ct,i)),s=ot.fromMillis(t.localWriteTimeMs);return new Eo(t.batchId,s,e,n)}function sr(r){const t=ze(r.readTime),e=r.lastLimboFreeSnapshotVersion!==void 0?ze(r.lastLimboFreeSnapshotVersion):B.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){return U(i.documents.length===1),Bt(Rr(Cc(i.documents[0])))}(r.query):function(i){return Bt(Nc(i))}(r.query),new ee(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,t,e,ct.fromBase64String(r.resumeToken))}function Uc(r,t){const e=je(t.snapshotVersion),n=je(t.lastLimboFreeSnapshotVersion);let s;s=Is(t.target)?Dc(r.ct,t.target):kc(r.ct,t.target)._t;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:Ue(t.target),readTime:e,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Bc(r){const t=Nc({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?ws(t,t.limit,"L"):t}function xi(r,t){return new vo(t.largestBatchId,Yi(r.ct,t.overlayMutation))}function Uu(r,t){const e=t.path.lastSegment();return[r,Ct(t.path.popLast()),e]}function Bu(r,t,e,n){return{indexId:r,uid:t,sequenceNumber:e,readTime:je(n.readTime),documentKey:Ct(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class dm{getBundleMetadata(t,e){return qu(t).get(e).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:ze(i.createTime),version:i.version}}(n)})}saveBundleMetadata(t,e){return qu(t).put(function(s){return{bundleId:s.id,createTime:je(xt(s.createTime)),version:s.version}}(e))}getNamedQuery(t,e){return ju(t).get(e).next(n=>{if(n)return function(i){return{name:i.name,query:Bc(i.bundledQuery),readTime:ze(i.readTime)}}(n)})}saveNamedQuery(t,e){return ju(t).put(function(s){return{name:s.name,readTime:je(xt(s.readTime)),bundledQuery:s.bundledQuery}}(e))}}function qu(r){return ft(r,"bundles")}function ju(r){return ft(r,"namedQueries")}/**
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
 */class zs{constructor(t,e){this.serializer=t,this.userId=e}static lt(t,e){const n=e.uid||"";return new zs(t,n)}getOverlay(t,e){return Hn(t).get(Uu(this.userId,e)).next(n=>n?xi(this.serializer,n):null)}getOverlays(t,e){const n=Kt();return A.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){const s=[];return n.forEach((i,a)=>{const u=new vo(e,a);s.push(this.ht(t,u))}),A.waitFor(s)}removeOverlaysForBatchId(t,e,n){const s=new Set;e.forEach(a=>s.add(Ct(a.getCollectionPath())));const i=[];return s.forEach(a=>{const u=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(Hn(t).j("collectionPathOverlayIndex",u))}),A.waitFor(i)}getOverlaysForCollection(t,e,n){const s=Kt(),i=Ct(e),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Hn(t).U("collectionPathOverlayIndex",a).next(u=>{for(const l of u){const d=xi(this.serializer,l);s.set(d.getKey(),d)}return s})}getOverlaysForCollectionGroup(t,e,n,s){const i=Kt();let a;const u=IDBKeyRange.bound([this.userId,e,n],[this.userId,e,Number.POSITIVE_INFINITY],!0);return Hn(t).J({index:"collectionGroupOverlayIndex",range:u},(l,d,f)=>{const p=xi(this.serializer,d);i.size()<s||p.largestBatchId===a?(i.set(p.getKey(),p),a=p.largestBatchId):f.done()}).next(()=>i)}ht(t,e){return Hn(t).put(function(s,i,a){const[u,l,d]=Uu(i,a.mutation.key);return{userId:i,collectionPath:l,documentId:d,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:As(s.ct,a.mutation)}}(this.serializer,this.userId,e))}}function Hn(r){return ft(r,"documentOverlays")}/**
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
 */class fm{Pt(t){return ft(t,"globals")}getSessionToken(t){return this.Pt(t).get("sessionToken").next(e=>{const n=e?.value;return n?ct.fromUint8Array(n):ct.EMPTY_BYTE_STRING})}setSessionToken(t,e){return this.Pt(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
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
 */class De{constructor(){}It(t,e){this.Tt(t,e),e.Et()}Tt(t,e){if("nullValue"in t)this.dt(e,5);else if("booleanValue"in t)this.dt(e,10),e.At(t.booleanValue?1:0);else if("integerValue"in t)this.dt(e,15),e.At(st(t.integerValue));else if("doubleValue"in t){const n=st(t.doubleValue);isNaN(n)?this.dt(e,13):(this.dt(e,15),pr(n)?e.At(0):e.At(n))}else if("timestampValue"in t){let n=t.timestampValue;this.dt(e,20),typeof n=="string"&&(n=se(n)),e.Rt(`${n.seconds||""}`),e.At(n.nanos||0)}else if("stringValue"in t)this.Vt(t.stringValue,e),this.ft(e);else if("bytesValue"in t)this.dt(e,30),e.gt(ge(t.bytesValue)),this.ft(e);else if("referenceValue"in t)this.yt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.dt(e,45),e.At(n.latitude||0),e.At(n.longitude||0)}else"mapValue"in t?Yl(t)?this.dt(e,Number.MAX_SAFE_INTEGER):Fs(t)?this.wt(t.mapValue,e):(this.St(t.mapValue,e),this.ft(e)):"arrayValue"in t?(this.bt(t.arrayValue,e),this.ft(e)):F()}Vt(t,e){this.dt(e,25),this.Dt(t,e)}Dt(t,e){e.Rt(t)}St(t,e){const n=t.fields||{};this.dt(e,55);for(const s of Object.keys(n))this.Vt(s,e),this.Tt(n[s],e)}wt(t,e){var n,s;const i=t.fields||{};this.dt(e,53);const a="value",u=((s=(n=i[a].arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.length)||0;this.dt(e,15),e.At(st(u)),this.Vt(a,e),this.Tt(i[a],e)}bt(t,e){const n=t.values||[];this.dt(e,50);for(const s of n)this.Tt(s,e)}yt(t,e){this.dt(e,37),O.fromName(t).path.forEach(n=>{this.dt(e,60),this.Dt(n,e)})}dt(t,e){t.At(e)}ft(t){t.At(2)}}De.vt=new De;function mm(r){if(r===0)return 8;let t=0;return!(r>>4)&&(t+=4,r<<=4),!(r>>6)&&(t+=2,r<<=2),!(r>>7)&&(t+=1),t}function zu(r){const t=64-function(n){let s=0;for(let i=0;i<8;++i){const a=mm(255&n[i]);if(s+=a,a!==8)break}return s}(r);return Math.ceil(t/8)}class pm{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Ft(n.value),n=e.next();this.Mt()}xt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Ot(n.value),n=e.next();this.Nt()}Lt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{const s=e.codePointAt(0);this.Ft(240|s>>>18),this.Ft(128|63&s>>>12),this.Ft(128|63&s>>>6),this.Ft(128|63&s)}}this.Mt()}Bt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{const s=e.codePointAt(0);this.Ot(240|s>>>18),this.Ot(128|63&s>>>12),this.Ot(128|63&s>>>6),this.Ot(128|63&s)}}this.Nt()}kt(t){const e=this.qt(t),n=zu(e);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=255&e[s]}Kt(t){const e=this.qt(t),n=zu(e);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(t){this.Qt(t.length),this.buffer.set(t,this.position),this.position+=t.length}zt(){return this.buffer.slice(0,this.position)}qt(t){const e=function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)}(t),n=(128&e[0])!=0;e[0]^=n?255:128;for(let s=1;s<e.length;++s)e[s]^=n?255:0;return e}Ft(t){const e=255&t;e===0?(this.Ut(0),this.Ut(255)):e===255?(this.Ut(255),this.Ut(0)):this.Ut(e)}Ot(t){const e=255&t;e===0?(this.Gt(0),this.Gt(255)):e===255?(this.Gt(255),this.Gt(0)):this.Gt(t)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(t){this.Qt(1),this.buffer[this.position++]=t}Gt(t){this.Qt(1),this.buffer[this.position++]=~t}Qt(t){const e=t+this.position;if(e<=this.buffer.length)return;let n=2*this.buffer.length;n<e&&(n=e);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class gm{constructor(t){this.jt=t}gt(t){this.jt.Ct(t)}Rt(t){this.jt.Lt(t)}At(t){this.jt.kt(t)}Et(){this.jt.$t()}}class _m{constructor(t){this.jt=t}gt(t){this.jt.xt(t)}Rt(t){this.jt.Bt(t)}At(t){this.jt.Kt(t)}Et(){this.jt.Wt()}}class Xn{constructor(){this.jt=new pm,this.Ht=new gm(this.jt),this.Jt=new _m(this.jt)}seed(t){this.jt.seed(t)}Yt(t){return t===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
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
 */class ke{constructor(t,e,n,s){this.indexId=t,this.documentKey=e,this.arrayValue=n,this.directionalValue=s}Zt(){const t=this.directionalValue.length,e=t===0||this.directionalValue[t-1]===255?t+1:t,n=new Uint8Array(e);return n.set(this.directionalValue,0),e!==t?n.set([0],this.directionalValue.length):++n[n.length-1],new ke(this.indexId,this.documentKey,this.arrayValue,n)}}function ce(r,t){let e=r.indexId-t.indexId;return e!==0?e:(e=Ku(r.arrayValue,t.arrayValue),e!==0?e:(e=Ku(r.directionalValue,t.directionalValue),e!==0?e:O.comparator(r.documentKey,t.documentKey)))}function Ku(r,t){for(let e=0;e<r.length&&e<t.length;++e){const n=r[e]-t[e];if(n!==0)return n}return r.length-t.length}/**
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
 */class Gu{constructor(t){this.Xt=new Z((e,n)=>it.comparator(e.field,n.field)),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.en=t.orderBy,this.tn=[];for(const e of t.filters){const n=e;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(t){if(U(t.collectionGroup===this.collectionId),this.nn)return!1;const e=qi(t);if(e!==void 0&&!this.sn(e))return!1;const n=Ve(t);let s=new Set,i=0,a=0;for(;i<n.length&&this.sn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Xt.size>0){const u=this.Xt.getIterator().getNext();if(!s.has(u.field.canonicalString())){const l=n[i];if(!this.on(u,l)||!this._n(this.en[a++],l))return!1}++i}for(;i<n.length;++i){const u=n[i];if(a>=this.en.length||!this._n(this.en[a++],u))return!1}return!0}an(){if(this.nn)return null;let t=new Z(it.comparator);const e=[];for(const n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")e.push(new cs(n.field,2));else{if(t.has(n.field))continue;t=t.add(n.field),e.push(new cs(n.field,0))}for(const n of this.en)n.field.isKeyField()||t.has(n.field)||(t=t.add(n.field),e.push(new cs(n.field,n.dir==="asc"?0:1)));return new Ts(Ts.UNKNOWN_ID,this.collectionId,e,mr.empty())}sn(t){for(const e of this.tn)if(this.on(e,t))return!0;return!1}on(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const n=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===n}_n(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
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
 */function qc(r){var t,e;if(U(r instanceof Q||r instanceof Y),r instanceof Q){if(r instanceof ac){const s=((e=(t=r.value.arrayValue)===null||t===void 0?void 0:t.values)===null||e===void 0?void 0:e.map(i=>Q.create(r.field,"==",i)))||[];return Y.create(s,"or")}return r}const n=r.filters.map(s=>qc(s));return Y.create(n,r.op)}function ym(r){if(r.getFilters().length===0)return[];const t=eo(qc(r));return U(jc(t)),Zi(t)||to(t)?[t]:t.getFilters()}function Zi(r){return r instanceof Q}function to(r){return r instanceof Y&&yo(r)}function jc(r){return Zi(r)||to(r)||function(e){if(e instanceof Y&&Gi(e)){for(const n of e.getFilters())if(!Zi(n)&&!to(n))return!1;return!0}return!1}(r)}function eo(r){if(U(r instanceof Q||r instanceof Y),r instanceof Q)return r;if(r.filters.length===1)return eo(r.filters[0]);const t=r.filters.map(n=>eo(n));let e=Y.create(t,r.op);return e=Ps(e),jc(e)?e:(U(e instanceof Y),U(Tn(e)),U(e.filters.length>1),e.filters.reduce((n,s)=>Po(n,s)))}function Po(r,t){let e;return U(r instanceof Q||r instanceof Y),U(t instanceof Q||t instanceof Y),e=r instanceof Q?t instanceof Q?function(s,i){return Y.create([s,i],"and")}(r,t):$u(r,t):t instanceof Q?$u(t,r):function(s,i){if(U(s.filters.length>0&&i.filters.length>0),Tn(s)&&Tn(i))return sc(s,i.getFilters());const a=Gi(s)?s:i,u=Gi(s)?i:s,l=a.filters.map(d=>Po(d,u));return Y.create(l,"or")}(r,t),Ps(e)}function $u(r,t){if(Tn(t))return sc(t,r.getFilters());{const e=t.filters.map(n=>Po(r,n));return Y.create(e,"or")}}function Ps(r){if(U(r instanceof Q||r instanceof Y),r instanceof Q)return r;const t=r.getFilters();if(t.length===1)return Ps(t[0]);if(nc(r))return r;const e=t.map(s=>Ps(s)),n=[];return e.forEach(s=>{s instanceof Q?n.push(s):s instanceof Y&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:Y.create(n,r.op)}/**
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
 */class Tm{constructor(){this.un=new bo}addToCollectionParentIndex(t,e){return this.un.add(e),A.resolve()}getCollectionParents(t,e){return A.resolve(this.un.getEntries(e))}addFieldIndex(t,e){return A.resolve()}deleteFieldIndex(t,e){return A.resolve()}deleteAllFieldIndexes(t){return A.resolve()}createTargetIndexes(t,e){return A.resolve()}getDocumentsMatchingTarget(t,e){return A.resolve(null)}getIndexType(t,e){return A.resolve(0)}getFieldIndexes(t,e){return A.resolve([])}getNextCollectionGroupToUpdate(t){return A.resolve(null)}getMinOffset(t,e){return A.resolve(qt.min())}getMinOffsetFromCollectionGroup(t,e){return A.resolve(qt.min())}updateCollectionGroup(t,e,n){return A.resolve()}updateIndexEntries(t,e){return A.resolve()}}class bo{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new Z(J.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new Z(J.comparator)).toArray()}}/**
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
 */const rs=new Uint8Array(0);class Im{constructor(t,e){this.databaseId=e,this.cn=new bo,this.ln=new we(n=>Ue(n),(n,s)=>Ar(n,s)),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.cn.has(e)){const n=e.lastSegment(),s=e.popLast();t.addOnCommittedListener(()=>{this.cn.add(e)});const i={collectionId:n,parent:Ct(s)};return Qu(t).put(i)}return A.resolve()}getCollectionParents(t,e){const n=[],s=IDBKeyRange.bound([e,""],[Ul(e),""],!1,!0);return Qu(t).U(s).next(i=>{for(const a of i){if(a.collectionId!==e)break;n.push(zt(a.parent))}return n})}addFieldIndex(t,e){const n=Jn(t),s=function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(e);delete s.indexId;const i=n.add(s);if(e.indexState){const a=sn(t);return i.next(u=>{a.put(Bu(u,this.uid,e.indexState.sequenceNumber,e.indexState.offset))})}return i.next()}deleteFieldIndex(t,e){const n=Jn(t),s=sn(t),i=rn(t);return n.delete(e.indexId).next(()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))}deleteAllFieldIndexes(t){const e=Jn(t),n=rn(t),s=sn(t);return e.j().next(()=>n.j()).next(()=>s.j())}createTargetIndexes(t,e){return A.forEach(this.hn(e),n=>this.getIndexType(t,n).next(s=>{if(s===0||s===1){const i=new Gu(n).an();if(i!=null)return this.addFieldIndex(t,i)}}))}getDocumentsMatchingTarget(t,e){const n=rn(t);let s=!0;const i=new Map;return A.forEach(this.hn(e),a=>this.Pn(t,a).next(u=>{s&&(s=!!u),i.set(a,u)})).next(()=>{if(s){let a=$();const u=[];return A.forEach(i,(l,d)=>{x("IndexedDbIndexManager",`Using index ${function(M){return`id=${M.indexId}|cg=${M.collectionGroup}|f=${M.fields.map(z=>`${z.fieldPath}:${z.kind}`).join(",")}`}(l)} to execute ${Ue(e)}`);const f=function(M,z){const H=qi(z);if(H===void 0)return null;for(const G of Es(M,H.fieldPath))switch(G.op){case"array-contains-any":return G.value.arrayValue.values||[];case"array-contains":return[G.value]}return null}(d,l),p=function(M,z){const H=new Map;for(const G of Ve(z))for(const I of Es(M,G.fieldPath))switch(I.op){case"==":case"in":H.set(G.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return H.set(G.fieldPath.canonicalString(),I.value),Array.from(H.values())}return null}(d,l),T=function(M,z){const H=[];let G=!0;for(const I of Ve(z)){const g=I.kind===0?Ru(M,I.fieldPath,M.startAt):Pu(M,I.fieldPath,M.startAt);H.push(g.value),G&&(G=g.inclusive)}return new yn(H,G)}(d,l),P=function(M,z){const H=[];let G=!0;for(const I of Ve(z)){const g=I.kind===0?Pu(M,I.fieldPath,M.endAt):Ru(M,I.fieldPath,M.endAt);H.push(g.value),G&&(G=g.inclusive)}return new yn(H,G)}(d,l),C=this.In(l,d,T),D=this.In(l,d,P),V=this.Tn(l,d,p),j=this.En(l.indexId,f,C,T.inclusive,D,P.inclusive,V);return A.forEach(j,q=>n.G(q,e.limit).next(M=>{M.forEach(z=>{const H=O.fromSegments(z.documentKey);a.has(H)||(a=a.add(H),u.push(H))})}))}).next(()=>u)}return A.resolve(null)})}hn(t){let e=this.ln.get(t);return e||(t.filters.length===0?e=[t]:e=ym(Y.create(t.filters,"and")).map(n=>Qi(t.path,t.collectionGroup,t.orderBy,n.getFilters(),t.limit,t.startAt,t.endAt)),this.ln.set(t,e),e)}En(t,e,n,s,i,a,u){const l=(e!=null?e.length:1)*Math.max(n.length,i.length),d=l/(e!=null?e.length:1),f=[];for(let p=0;p<l;++p){const T=e?this.dn(e[p/d]):rs,P=this.An(t,T,n[p%d],s),C=this.Rn(t,T,i[p%d],a),D=u.map(V=>this.An(t,T,V,!0));f.push(...this.createRange(P,C,D))}return f}An(t,e,n,s){const i=new ke(t,O.empty(),e,n);return s?i:i.Zt()}Rn(t,e,n,s){const i=new ke(t,O.empty(),e,n);return s?i.Zt():i}Pn(t,e){const n=new Gu(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next(i=>{let a=null;for(const u of i)n.rn(u)&&(!a||u.fields.length>a.fields.length)&&(a=u);return a})}getIndexType(t,e){let n=2;const s=this.hn(e);return A.forEach(s,i=>this.Pn(t,i).next(a=>{a?n!==0&&a.fields.length<function(l){let d=new Z(it.comparator),f=!1;for(const p of l.filters)for(const T of p.getFlattenedFilters())T.field.isKeyField()||(T.op==="array-contains"||T.op==="array-contains-any"?f=!0:d=d.add(T.field));for(const p of l.orderBy)p.field.isKeyField()||(d=d.add(p.field));return d.size+(f?1:0)}(i)&&(n=1):n=0})).next(()=>function(a){return a.limit!==null}(e)&&s.length>1&&n===2?1:n)}Vn(t,e){const n=new Xn;for(const s of Ve(t)){const i=e.data.field(s.fieldPath);if(i==null)return null;const a=n.Yt(s.kind);De.vt.It(i,a)}return n.zt()}dn(t){const e=new Xn;return De.vt.It(t,e.Yt(0)),e.zt()}mn(t,e){const n=new Xn;return De.vt.It(yr(this.databaseId,e),n.Yt(function(i){const a=Ve(i);return a.length===0?0:a[a.length-1].kind}(t))),n.zt()}Tn(t,e,n){if(n===null)return[];let s=[];s.push(new Xn);let i=0;for(const a of Ve(t)){const u=n[i++];for(const l of s)if(this.fn(e,a.fieldPath)&&Tr(u))s=this.gn(s,a,u);else{const d=l.Yt(a.kind);De.vt.It(u,d)}}return this.pn(s)}In(t,e,n){return this.Tn(t,e,n.position)}pn(t){const e=[];for(let n=0;n<t.length;++n)e[n]=t[n].zt();return e}gn(t,e,n){const s=[...t],i=[];for(const a of n.arrayValue.values||[])for(const u of s){const l=new Xn;l.seed(u.zt()),De.vt.It(a,l.Yt(e.kind)),i.push(l)}return i}fn(t,e){return!!t.filters.find(n=>n instanceof Q&&n.field.isEqual(e)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(t,e){const n=Jn(t),s=sn(t);return(e?n.U("collectionGroupIndex",IDBKeyRange.bound(e,e)):n.U()).next(i=>{const a=[];return A.forEach(i,u=>s.get([u.indexId,this.uid]).next(l=>{a.push(function(f,p){const T=p?new mr(p.sequenceNumber,new qt(ze(p.readTime),new O(zt(p.documentKey)),p.largestBatchId)):mr.empty(),P=f.fields.map(([C,D])=>new cs(it.fromServerFormat(C),D));return new Ts(f.indexId,f.collectionGroup,P,T)}(u,l))})).next(()=>a)})}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next(e=>e.length===0?null:(e.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:K(n.collectionGroup,s.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(t,e,n){const s=Jn(t),i=sn(t);return this.yn(t).next(a=>s.U("collectionGroupIndex",IDBKeyRange.bound(e,e)).next(u=>A.forEach(u,l=>i.put(Bu(l.indexId,this.uid,a,n)))))}updateIndexEntries(t,e){const n=new Map;return A.forEach(e,(s,i)=>{const a=n.get(s.collectionGroup);return(a?A.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next(u=>(n.set(s.collectionGroup,u),A.forEach(u,l=>this.wn(t,s,l).next(d=>{const f=this.Sn(i,l);return d.isEqual(f)?A.resolve():this.bn(t,i,l,d,f)}))))})}Dn(t,e,n,s){return rn(t).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.mn(n,e.key),documentKey:e.key.path.toArray()})}vn(t,e,n,s){return rn(t).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.mn(n,e.key),e.key.path.toArray()])}wn(t,e,n){const s=rn(t);let i=new Z(ce);return s.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,e)])},(a,u)=>{i=i.add(new ke(n.indexId,e,u.arrayValue,u.directionalValue))}).next(()=>i)}Sn(t,e){let n=new Z(ce);const s=this.Vn(e,t);if(s==null)return n;const i=qi(e);if(i!=null){const a=t.data.field(i.fieldPath);if(Tr(a))for(const u of a.arrayValue.values||[])n=n.add(new ke(e.indexId,t.key,this.dn(u),s))}else n=n.add(new ke(e.indexId,t.key,rs,s));return n}bn(t,e,n,s,i){x("IndexedDbIndexManager","Updating index entries for document '%s'",e.key);const a=[];return function(l,d,f,p,T){const P=l.getIterator(),C=d.getIterator();let D=nn(P),V=nn(C);for(;D||V;){let j=!1,q=!1;if(D&&V){const M=f(D,V);M<0?q=!0:M>0&&(j=!0)}else D!=null?q=!0:j=!0;j?(p(V),V=nn(C)):q?(T(D),D=nn(P)):(D=nn(P),V=nn(C))}}(s,i,ce,u=>{a.push(this.Dn(t,e,n,u))},u=>{a.push(this.vn(t,e,n,u))}),A.waitFor(a)}yn(t){let e=1;return sn(t).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),e=s.sequenceNumber+1}).next(()=>e)}createRange(t,e,n){n=n.sort((a,u)=>ce(a,u)).filter((a,u,l)=>!u||ce(a,l[u-1])!==0);const s=[];s.push(t);for(const a of n){const u=ce(a,t),l=ce(a,e);if(u===0)s[0]=t.Zt();else if(u>0&&l<0)s.push(a),s.push(a.Zt());else if(l>0)break}s.push(e);const i=[];for(let a=0;a<s.length;a+=2){if(this.Cn(s[a],s[a+1]))return[];const u=[s[a].indexId,this.uid,s[a].arrayValue,s[a].directionalValue,rs,[]],l=[s[a+1].indexId,this.uid,s[a+1].arrayValue,s[a+1].directionalValue,rs,[]];i.push(IDBKeyRange.bound(u,l))}return i}Cn(t,e){return ce(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(Wu)}getMinOffset(t,e){return A.mapArray(this.hn(e),n=>this.Pn(t,n).next(s=>s||F())).next(Wu)}}function Qu(r){return ft(r,"collectionParents")}function rn(r){return ft(r,"indexEntries")}function Jn(r){return ft(r,"indexConfiguration")}function sn(r){return ft(r,"indexState")}function Wu(r){U(r.length!==0);let t=r[0].indexState.offset,e=t.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;fo(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new qt(t.readTime,t.documentKey,e)}/**
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
 */const Hu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Dt{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new Dt(t,Dt.DEFAULT_COLLECTION_PERCENTILE,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
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
 */function zc(r,t,e){const n=r.store("mutations"),s=r.store("documentMutations"),i=[],a=IDBKeyRange.only(e.batchId);let u=0;const l=n.J({range:a},(f,p,T)=>(u++,T.delete()));i.push(l.next(()=>{U(u===1)}));const d=[];for(const f of e.mutations){const p=$l(t,f.key.path,e.batchId);i.push(s.delete(p)),d.push(f.key)}return A.waitFor(i).next(()=>d)}function bs(r){if(!r)return 0;let t;if(r.document)t=r.document;else if(r.unknownDocument)t=r.unknownDocument;else{if(!r.noDocument)throw F();t=r.noDocument}return JSON.stringify(t).length}/**
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
 */Dt.DEFAULT_COLLECTION_PERCENTILE=10,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Dt.DEFAULT=new Dt(41943040,Dt.DEFAULT_COLLECTION_PERCENTILE,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Dt.DISABLED=new Dt(-1,0,0);class Ks{constructor(t,e,n,s){this.userId=t,this.serializer=e,this.indexManager=n,this.referenceDelegate=s,this.Fn={}}static lt(t,e,n,s){U(t.uid!=="");const i=t.isAuthenticated()?t.uid:"";return new Ks(i,e,n,s)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return he(t).J({index:"userMutationsIndex",range:n},(s,i,a)=>{e=!1,a.done()}).next(()=>e)}addMutationBatch(t,e,n,s){const i=dn(t),a=he(t);return a.add({}).next(u=>{U(typeof u=="number");const l=new Eo(u,e,n,s),d=function(P,C,D){const V=D.baseMutations.map(q=>As(P.ct,q)),j=D.mutations.map(q=>As(P.ct,q));return{userId:C,batchId:D.batchId,localWriteTimeMs:D.localWriteTime.toMillis(),baseMutations:V,mutations:j}}(this.serializer,this.userId,l),f=[];let p=new Z((T,P)=>K(T.canonicalString(),P.canonicalString()));for(const T of s){const P=$l(this.userId,T.key.path,u);p=p.add(T.key.path.popLast()),f.push(a.put(d)),f.push(i.put(P,rf))}return p.forEach(T=>{f.push(this.indexManager.addToCollectionParentIndex(t,T))}),t.addOnCommittedListener(()=>{this.Fn[u]=l.keys()}),A.waitFor(f).next(()=>l)})}lookupMutationBatch(t,e){return he(t).get(e).next(n=>n?(U(n.userId===this.userId),xe(this.serializer,n)):null)}Mn(t,e){return this.Fn[e]?A.resolve(this.Fn[e]):this.lookupMutationBatch(t,e).next(n=>{if(n){const s=n.keys();return this.Fn[e]=s,s}return null})}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return he(t).J({index:"userMutationsIndex",range:s},(a,u,l)=>{u.userId===this.userId&&(U(u.batchId>=n),i=xe(this.serializer,u)),l.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return he(t).J({index:"userMutationsIndex",range:e,reverse:!0},(s,i,a)=>{n=i.batchId,a.done()}).next(()=>n)}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return he(t).U("userMutationsIndex",e).next(n=>n.map(s=>xe(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=hs(this.userId,e.path),s=IDBKeyRange.lowerBound(n),i=[];return dn(t).J({range:s},(a,u,l)=>{const[d,f,p]=a,T=zt(f);if(d===this.userId&&e.path.isEqual(T))return he(t).get(p).next(P=>{if(!P)throw F();U(P.userId===this.userId),i.push(xe(this.serializer,P))});l.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Z(K);const s=[];return e.forEach(i=>{const a=hs(this.userId,i.path),u=IDBKeyRange.lowerBound(a),l=dn(t).J({range:u},(d,f,p)=>{const[T,P,C]=d,D=zt(P);T===this.userId&&i.path.isEqual(D)?n=n.add(C):p.done()});s.push(l)}),A.waitFor(s).next(()=>this.xn(t,n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1,i=hs(this.userId,n),a=IDBKeyRange.lowerBound(i);let u=new Z(K);return dn(t).J({range:a},(l,d,f)=>{const[p,T,P]=l,C=zt(T);p===this.userId&&n.isPrefixOf(C)?C.length===s&&(u=u.add(P)):f.done()}).next(()=>this.xn(t,u))}xn(t,e){const n=[],s=[];return e.forEach(i=>{s.push(he(t).get(i).next(a=>{if(a===null)throw F();U(a.userId===this.userId),n.push(xe(this.serializer,a))}))}),A.waitFor(s).next(()=>n)}removeMutationBatch(t,e){return zc(t._e,this.userId,e).next(n=>(t.addOnCommittedListener(()=>{this.On(e.batchId)}),A.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))}On(t){delete this.Fn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next(e=>{if(!e)return A.resolve();const n=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),s=[];return dn(t).J({range:n},(i,a,u)=>{if(i[0]===this.userId){const l=zt(i[1]);s.push(l)}else u.done()}).next(()=>{U(s.length===0)})})}containsKey(t,e){return Kc(t,this.userId,e)}Nn(t){return Gc(t).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function Kc(r,t,e){const n=hs(t,e.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return dn(r).J({range:i,H:!0},(u,l,d)=>{const[f,p,T]=u;f===t&&p===s&&(a=!0),d.done()}).next(()=>a)}function he(r){return ft(r,"mutations")}function dn(r){return ft(r,"documentMutations")}function Gc(r){return ft(r,"mutationQueues")}/**
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
 */class Ke{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ke(0)}static kn(){return new Ke(-1)}}/**
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
 */class Em{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.qn(t).next(e=>{const n=new Ke(e.highestTargetId);return e.highestTargetId=n.next(),this.Qn(t,e).next(()=>e.highestTargetId)})}getLastRemoteSnapshotVersion(t){return this.qn(t).next(e=>B.fromTimestamp(new ot(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(t){return this.qn(t).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(t,e,n){return this.qn(t).next(s=>(s.highestListenSequenceNumber=e,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this.Qn(t,s)))}addTargetData(t,e){return this.Kn(t,e).next(()=>this.qn(t).next(n=>(n.targetCount+=1,this.$n(e,n),this.Qn(t,n))))}updateTargetData(t,e){return this.Kn(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next(()=>on(t).delete(e.targetId)).next(()=>this.qn(t)).next(n=>(U(n.targetCount>0),n.targetCount-=1,this.Qn(t,n)))}removeTargets(t,e,n){let s=0;const i=[];return on(t).J((a,u)=>{const l=sr(u);l.sequenceNumber<=e&&n.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(t,l)))}).next(()=>A.waitFor(i)).next(()=>s)}forEachTarget(t,e){return on(t).J((n,s)=>{const i=sr(s);e(i)})}qn(t){return Xu(t).get("targetGlobalKey").next(e=>(U(e!==null),e))}Qn(t,e){return Xu(t).put("targetGlobalKey",e)}Kn(t,e){return on(t).put(Uc(this.serializer,e))}$n(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.qn(t).next(e=>e.targetCount)}getTargetData(t,e){const n=Ue(e),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return on(t).J({range:s,index:"queryTargetsIndex"},(a,u,l)=>{const d=sr(u);Ar(e,d.target)&&(i=d,l.done())}).next(()=>i)}addMatchingKeys(t,e,n){const s=[],i=de(t);return e.forEach(a=>{const u=Ct(a.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(t,n,a))}),A.waitFor(s)}removeMatchingKeys(t,e,n){const s=de(t);return A.forEach(e,i=>{const a=Ct(i.path);return A.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(t,n,i)])})}removeMatchingKeysForTargetId(t,e){const n=de(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),s=de(t);let i=$();return s.J({range:n,H:!0},(a,u,l)=>{const d=zt(a[1]),f=new O(d);i=i.add(f)}).next(()=>i)}containsKey(t,e){const n=Ct(e.path),s=IDBKeyRange.bound([n],[Ul(n)],!1,!0);let i=0;return de(t).J({index:"documentTargetsIndex",H:!0,range:s},([a,u],l,d)=>{a!==0&&(i++,d.done())}).next(()=>i>0)}ot(t,e){return on(t).get(e).next(n=>n?sr(n):null)}}function on(r){return ft(r,"targets")}function Xu(r){return ft(r,"targetGlobal")}function de(r){return ft(r,"targetDocuments")}/**
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
 */function Ju([r,t],[e,n]){const s=K(r,e);return s===0?K(t,n):s}class wm{constructor(t){this.Un=t,this.buffer=new Z(Ju),this.Wn=0}Gn(){return++this.Wn}zn(t){const e=[t,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Ju(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class vm{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(t){x("LruGarbageCollector",`Garbage collection scheduled in ${t}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Ee(e)?x("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",e):await Ie(e)}await this.Hn(3e5)})}}class Am{constructor(t,e){this.Jn=t,this.params=e}calculateTargetCount(t,e){return this.Jn.Yn(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return A.resolve(Nt.oe);const n=new wm(e);return this.Jn.forEachTarget(t,s=>n.zn(s.sequenceNumber)).next(()=>this.Jn.Zn(t,s=>n.zn(s))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Jn.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Jn.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(Hu)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Hu):this.Xn(t,e))}getCacheSize(t){return this.Jn.getCacheSize(t)}Xn(t,e){let n,s,i,a,u,l,d;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(t,s))).next(p=>(n=p,u=Date.now(),this.removeTargets(t,n,e))).next(p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(t,n))).next(p=>(d=Date.now(),un()<=Zt.DEBUG&&x("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(l-u)+`ms
	Removed ${p} documents in `+(d-l)+`ms
Total Duration: ${d-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function Rm(r,t){return new Am(r,t)}/**
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
 */class Pm{constructor(t,e){this.db=t,this.garbageCollector=Rm(this,e)}Yn(t){const e=this.er(t);return this.db.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}er(t){let e=0;return this.Zn(t,n=>{e++}).next(()=>e)}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}Zn(t,e){return this.tr(t,(n,s)=>e(s))}addReference(t,e,n){return ss(t,n)}removeReference(t,e,n){return ss(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return ss(t,e)}nr(t,e){return function(s,i){let a=!1;return Gc(s).Y(u=>Kc(s,u,i).next(l=>(l&&(a=!0),A.resolve(!l)))).next(()=>a)}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.tr(t,(a,u)=>{if(u<=e){const l=this.nr(t,a).next(d=>{if(!d)return i++,n.getEntry(t,a).next(()=>(n.removeEntry(a,B.min()),de(t).delete(function(p){return[0,Ct(p.path)]}(a))))});s.push(l)}}).next(()=>A.waitFor(s)).next(()=>n.apply(t)).next(()=>i)}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return ss(t,e)}tr(t,e){const n=de(t);let s,i=Nt.oe;return n.J({index:"documentTargetsIndex"},([a,u],{path:l,sequenceNumber:d})=>{a===0?(i!==Nt.oe&&e(new O(zt(s)),i),i=d,s=l):i=Nt.oe}).next(()=>{i!==Nt.oe&&e(new O(zt(s)),i)})}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function ss(r,t){return de(r).put(function(n,s){return{targetId:0,path:Ct(n.path),sequenceNumber:s}}(t,r.currentSequenceNumber))}/**
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
 */class $c{constructor(){this.changes=new we(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,lt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?A.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class bm{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,n){return Se(t).put(n)}removeEntry(t,e,n){return Se(t).delete(function(i,a){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],Rs(a),u[u.length-1]]}(e,n))}updateMetadata(t,e){return this.getMetadata(t).next(n=>(n.byteSize+=e,this.rr(t,n)))}getEntry(t,e){let n=lt.newInvalidDocument(e);return Se(t).J({index:"documentKeyIndex",range:IDBKeyRange.only(Yn(e))},(s,i)=>{n=this.ir(e,i)}).next(()=>n)}sr(t,e){let n={size:0,document:lt.newInvalidDocument(e)};return Se(t).J({index:"documentKeyIndex",range:IDBKeyRange.only(Yn(e))},(s,i)=>{n={document:this.ir(e,i),size:bs(i)}}).next(()=>n)}getEntries(t,e){let n=Lt();return this._r(t,e,(s,i)=>{const a=this.ir(s,i);n=n.insert(s,a)}).next(()=>n)}ar(t,e){let n=Lt(),s=new et(O.comparator);return this._r(t,e,(i,a)=>{const u=this.ir(i,a);n=n.insert(i,u),s=s.insert(i,bs(a))}).next(()=>({documents:n,ur:s}))}_r(t,e,n){if(e.isEmpty())return A.resolve();let s=new Z(tl);e.forEach(l=>s=s.add(l));const i=IDBKeyRange.bound(Yn(s.first()),Yn(s.last())),a=s.getIterator();let u=a.getNext();return Se(t).J({index:"documentKeyIndex",range:i},(l,d,f)=>{const p=O.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;u&&tl(u,p)<0;)n(u,null),u=a.getNext();u&&u.isEqual(p)&&(n(u,d),u=a.hasNext()?a.getNext():null),u?f.$(Yn(u)):f.done()}).next(()=>{for(;u;)n(u,null),u=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(t,e,n,s,i){const a=e.path,u=[a.popLast().toArray(),a.lastSegment(),Rs(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],l=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Se(t).U(IDBKeyRange.bound(u,l,!0)).next(d=>{i?.incrementDocumentReadCount(d.length);let f=Lt();for(const p of d){const T=this.ir(O.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);T.isFoundDocument()&&(Pr(e,T)||s.has(T.key))&&(f=f.insert(T.key,T))}return f})}getAllFromCollectionGroup(t,e,n,s){let i=Lt();const a=Zu(e,n),u=Zu(e,qt.max());return Se(t).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(a,u,!0)},(l,d,f)=>{const p=this.ir(O.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);i=i.insert(p.key,p),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(t){return new Sm(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next(e=>e.byteSize)}getMetadata(t){return Yu(t).get("remoteDocumentGlobalKey").next(e=>(U(!!e),e))}rr(t,e){return Yu(t).put("remoteDocumentGlobalKey",e)}ir(t,e){if(e){const n=hm(this.serializer,e);if(!(n.isNoDocument()&&n.version.isEqual(B.min())))return n}return lt.newInvalidDocument(t)}}function Qc(r){return new bm(r)}class Sm extends $c{constructor(t,e){super(),this.cr=t,this.trackRemovals=e,this.lr=new we(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(t){const e=[];let n=0,s=new Z((i,a)=>K(i.canonicalString(),a.canonicalString()));return this.changes.forEach((i,a)=>{const u=this.lr.get(i);if(e.push(this.cr.removeEntry(t,i,u.readTime)),a.isValidDocument()){const l=Lu(this.cr.serializer,a);s=s.add(i.path.popLast());const d=bs(l);n+=d-u.size,e.push(this.cr.addEntry(t,i,l))}else if(n-=u.size,this.trackRemovals){const l=Lu(this.cr.serializer,a.convertToNoDocument(B.min()));e.push(this.cr.addEntry(t,i,l))}}),s.forEach(i=>{e.push(this.cr.indexManager.addToCollectionParentIndex(t,i))}),e.push(this.cr.updateMetadata(t,n)),A.waitFor(e)}getFromCache(t,e){return this.cr.sr(t,e).next(n=>(this.lr.set(e,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(t,e){return this.cr.ar(t,e).next(({documents:n,ur:s})=>(s.forEach((i,a)=>{this.lr.set(i,{size:a,readTime:n.get(i).readTime})}),n))}}function Yu(r){return ft(r,"remoteDocumentGlobal")}function Se(r){return ft(r,"remoteDocumentsV14")}function Yn(r){const t=r.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Zu(r,t){const e=t.documentKey.path.toArray();return[r,Rs(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function tl(r,t){const e=r.path.toArray(),n=t.path.toArray();let s=0;for(let i=0;i<e.length-2&&i<n.length-2;++i)if(s=K(e[i],n[i]),s)return s;return s=K(e.length,n.length),s||(s=K(e[e.length-2],n[n.length-2]),s||K(e[e.length-1],n[n.length-1]))}/**
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
 */class Vm{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class Wc{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(n!==null&&lr(n.mutation,s,Ot.empty(),ot.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,$()).next(()=>n))}getLocalViewOfDocuments(t,e,n=$()){const s=Kt();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(i=>{let a=nr();return i.forEach((u,l)=>{a=a.insert(u,l.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const n=Kt();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,$()))}populateOverlays(t,e,n){const s=[];return n.forEach(i=>{e.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(t,s).next(i=>{i.forEach((a,u)=>{e.set(a,u)})})}computeViews(t,e,n,s){let i=Lt();const a=ur(),u=function(){return ur()}();return e.forEach((l,d)=>{const f=n.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof ie)?i=i.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),lr(f.mutation,d,f.mutation.getFieldMask(),ot.now())):a.set(d.key,Ot.empty())}),this.recalculateAndSaveOverlays(t,i).next(l=>(l.forEach((d,f)=>a.set(d,f)),e.forEach((d,f)=>{var p;return u.set(d,new Vm(f,(p=a.get(d))!==null&&p!==void 0?p:null))}),u))}recalculateAndSaveOverlays(t,e){const n=ur();let s=new et((a,u)=>a-u),i=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const u of a)u.keys().forEach(l=>{const d=e.get(l);if(d===null)return;let f=n.get(l)||Ot.empty();f=u.applyToLocalView(d,f),n.set(l,f);const p=(s.get(u.batchId)||$()).add(l);s=s.insert(u.batchId,p)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const l=u.getNext(),d=l.key,f=l.value,p=pc();f.forEach(T=>{if(!i.has(T)){const P=Ec(e.get(T),n.get(T));P!==null&&p.set(T,P),i=i.add(T)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,p))}return A.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,s){return function(a){return O.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):lc(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-i.size):A.resolve(Kt());let u=-1,l=i;return a.next(d=>A.forEach(d,(f,p)=>(u<p.largestBatchId&&(u=p.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(t,f).next(T=>{l=l.insert(f,T)}))).next(()=>this.populateOverlays(t,d,i)).next(()=>this.computeViews(t,l,d,$())).next(f=>({batchId:u,changes:mc(f)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new O(e)).next(n=>{let s=nr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const i=e.collectionGroup;let a=nr();return this.indexManager.getCollectionParents(t,i).next(u=>A.forEach(u,l=>{const d=function(p,T){return new bn(T,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(e,l.child(i));return this.getDocumentsMatchingCollectionQuery(t,d,n,s).next(f=>{f.forEach((p,T)=>{a=a.insert(p,T)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,s))).next(a=>{i.forEach((l,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,lt.newInvalidDocument(f)))});let u=nr();return a.forEach((l,d)=>{const f=i.get(l);f!==void 0&&lr(f.mutation,d,Ot.empty(),ot.now()),Pr(e,d)&&(u=u.insert(l,d))}),u})}}/**
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
 */class Cm{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,e){return A.resolve(this.hr.get(e))}saveBundleMetadata(t,e){return this.hr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:xt(s.createTime)}}(e)),A.resolve()}getNamedQuery(t,e){return A.resolve(this.Pr.get(e))}saveNamedQuery(t,e){return this.Pr.set(e.name,function(s){return{name:s.name,query:Bc(s.bundledQuery),readTime:xt(s.readTime)}}(e)),A.resolve()}}/**
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
 */class xm{constructor(){this.overlays=new et(O.comparator),this.Ir=new Map}getOverlay(t,e){return A.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Kt();return A.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((s,i)=>{this.ht(t,e,i)}),A.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Ir.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(n)),A.resolve()}getOverlaysForCollection(t,e,n){const s=Kt(),i=e.length+1,a=new O(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const l=u.getNext().value,d=l.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===i&&l.largestBatchId>n&&s.set(l.getKey(),l)}return A.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let i=new et((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>n){let f=i.get(d.largestBatchId);f===null&&(f=Kt(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const u=Kt(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,f)=>u.set(d,f)),!(u.size()>=s)););return A.resolve(u)}ht(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(n.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new vo(e,n));let i=this.Ir.get(e);i===void 0&&(i=$(),this.Ir.set(e,i)),this.Ir.set(e,i.add(n.key))}}/**
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
 */class Dm{constructor(){this.sessionToken=ct.EMPTY_BYTE_STRING}getSessionToken(t){return A.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,A.resolve()}}/**
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
 */class So{constructor(){this.Tr=new Z(mt.Er),this.dr=new Z(mt.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,e){const n=new mt(t,e);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.Vr(new mt(t,e))}mr(t,e){t.forEach(n=>this.removeReference(n,e))}gr(t){const e=new O(new J([])),n=new mt(e,t),s=new mt(e,t+1),i=[];return this.dr.forEachInRange([n,s],a=>{this.Vr(a),i.push(a.key)}),i}pr(){this.Tr.forEach(t=>this.Vr(t))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const e=new O(new J([])),n=new mt(e,t),s=new mt(e,t+1);let i=$();return this.dr.forEachInRange([n,s],a=>{i=i.add(a.key)}),i}containsKey(t){const e=new mt(t,0),n=this.Tr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class mt{constructor(t,e){this.key=t,this.wr=e}static Er(t,e){return O.comparator(t.key,e.key)||K(t.wr,e.wr)}static Ar(t,e){return K(t.wr,e.wr)||O.comparator(t.key,e.key)}}/**
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
 */class km{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Sr=1,this.br=new Z(mt.Er)}checkEmpty(t){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Eo(i,e,n,s);this.mutationQueue.push(a);for(const u of s)this.br=this.br.add(new mt(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return A.resolve(a)}lookupMutationBatch(t,e){return A.resolve(this.Dr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.vr(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new mt(e,0),s=new mt(e,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([n,s],a=>{const u=this.Dr(a.wr);i.push(u)}),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Z(K);return e.forEach(s=>{const i=new mt(s,0),a=new mt(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,a],u=>{n=n.add(u.wr)})}),A.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;O.isDocumentKey(i)||(i=i.child(""));const a=new mt(new O(i),0);let u=new Z(K);return this.br.forEachWhile(l=>{const d=l.key.path;return!!n.isPrefixOf(d)&&(d.length===s&&(u=u.add(l.wr)),!0)},a),A.resolve(this.Cr(u))}Cr(t){const e=[];return t.forEach(n=>{const s=this.Dr(n);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){U(this.Fr(e.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return A.forEach(e.mutations,s=>{const i=new mt(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.br=n})}On(t){}containsKey(t,e){const n=new mt(e,0),s=this.br.firstAfterOrEqual(n);return A.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,A.resolve()}Fr(t,e){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const e=this.vr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Nm{constructor(t){this.Mr=t,this.docs=function(){return new et(O.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),i=s?s.size:0,a=this.Mr(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return A.resolve(n?n.document.mutableCopy():lt.newInvalidDocument(e))}getEntries(t,e){let n=Lt();return e.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():lt.newInvalidDocument(s))}),A.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let i=Lt();const a=e.path,u=new O(a.child("")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){const{key:d,value:{document:f}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||fo(ql(f),n)<=0||(s.has(f.key)||Pr(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(t,e,n,s){F()}Or(t,e){return A.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new Om(this)}getSize(t){return A.resolve(this.size)}}class Om extends $c{constructor(t){super(),this.cr=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.cr.addEntry(t,s)):this.cr.removeEntry(n)}),A.waitFor(e)}getFromCache(t,e){return this.cr.getEntry(t,e)}getAllFromCache(t,e){return this.cr.getEntries(t,e)}}/**
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
 */class Mm{constructor(t){this.persistence=t,this.Nr=new we(e=>Ue(e),Ar),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.Lr=0,this.Br=new So,this.targetCount=0,this.kr=Ke.Bn()}forEachTarget(t,e){return this.Nr.forEach((n,s)=>e(s)),A.resolve()}getLastRemoteSnapshotVersion(t){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return A.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.Lr&&(this.Lr=e),A.resolve()}Kn(t){this.Nr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.kr=new Ke(e),this.highestTargetId=e),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,e){return this.Kn(e),this.targetCount+=1,A.resolve()}updateTargetData(t,e){return this.Kn(e),A.resolve()}removeTargetData(t,e){return this.Nr.delete(e.target),this.Br.gr(e.targetId),this.targetCount-=1,A.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.Nr.forEach((a,u)=>{u.sequenceNumber<=e&&n.get(u.targetId)===null&&(this.Nr.delete(a),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)}),A.waitFor(i).next(()=>s)}getTargetCount(t){return A.resolve(this.targetCount)}getTargetData(t,e){const n=this.Nr.get(e)||null;return A.resolve(n)}addMatchingKeys(t,e,n){return this.Br.Rr(e,n),A.resolve()}removeMatchingKeys(t,e,n){this.Br.mr(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach(a=>{i.push(s.markPotentiallyOrphaned(t,a))}),A.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.Br.gr(e),A.resolve()}getMatchingKeysForTargetId(t,e){const n=this.Br.yr(e);return A.resolve(n)}containsKey(t,e){return A.resolve(this.Br.containsKey(e))}}/**
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
 */class Hc{constructor(t,e){this.qr={},this.overlays={},this.Qr=new Nt(0),this.Kr=!1,this.Kr=!0,this.$r=new Dm,this.referenceDelegate=t(this),this.Ur=new Mm(this),this.indexManager=new Tm,this.remoteDocumentCache=function(s){return new Nm(s)}(n=>this.referenceDelegate.Wr(n)),this.serializer=new Lc(e),this.Gr=new Cm(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new xm,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.qr[t.toKey()];return n||(n=new km(e,this.referenceDelegate),this.qr[t.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,e,n){x("MemoryPersistence","Starting transaction:",t);const s=new Fm(this.Qr.next());return this.referenceDelegate.zr(),n(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(t,e){return A.or(Object.values(this.qr).map(n=>()=>n.containsKey(t,e)))}}class Fm extends zl{constructor(t){super(),this.currentSequenceNumber=t}}class Gs{constructor(t){this.persistence=t,this.Jr=new So,this.Yr=null}static Zr(t){return new Gs(t)}get Xr(){if(this.Yr)return this.Yr;throw F()}addReference(t,e,n){return this.Jr.addReference(n,e),this.Xr.delete(n.toString()),A.resolve()}removeReference(t,e,n){return this.Jr.removeReference(n,e),this.Xr.add(n.toString()),A.resolve()}markPotentiallyOrphaned(t,e){return this.Xr.add(e.toString()),A.resolve()}removeTarget(t,e){this.Jr.gr(e.targetId).forEach(s=>this.Xr.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>n.removeTargetData(t,e))}zr(){this.Yr=new Set}jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.Xr,n=>{const s=O.fromPath(n);return this.ei(t,s).next(i=>{i||e.removeEntry(s,B.min())})}).next(()=>(this.Yr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ei(t,e).next(n=>{n?this.Xr.delete(e.toString()):this.Xr.add(e.toString())})}Wr(t){return 0}ei(t,e){return A.or([()=>A.resolve(this.Jr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Hr(t,e)])}}/**
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
 */class Lm{constructor(t){this.serializer=t}O(t,e,n,s){const i=new Os("createOrUpgrade",e);n<1&&s>=1&&(function(l){l.createObjectStore("owner")}(t),function(l){l.createObjectStore("mutationQueues",{keyPath:"userId"}),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",mu,{unique:!0}),l.createObjectStore("documentMutations")}(t),el(t),function(l){l.createObjectStore("remoteDocuments")}(t));let a=A.resolve();return n<3&&s>=3&&(n!==0&&(function(l){l.deleteObjectStore("targetDocuments"),l.deleteObjectStore("targets"),l.deleteObjectStore("targetGlobal")}(t),el(t)),a=a.next(()=>function(l){const d=l.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return d.put("targetGlobalKey",f)}(i))),n<4&&s>=4&&(n!==0&&(a=a.next(()=>function(l,d){return d.store("mutations").U().next(f=>{l.deleteObjectStore("mutations"),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",mu,{unique:!0});const p=d.store("mutations"),T=f.map(P=>p.put(P));return A.waitFor(T)})}(t,i))),a=a.next(()=>{(function(l){l.createObjectStore("clientMetadata",{keyPath:"clientId"})})(t)})),n<5&&s>=5&&(a=a.next(()=>this.ni(i))),n<6&&s>=6&&(a=a.next(()=>(function(l){l.createObjectStore("remoteDocumentGlobal")}(t),this.ri(i)))),n<7&&s>=7&&(a=a.next(()=>this.ii(i))),n<8&&s>=8&&(a=a.next(()=>this.si(t,i))),n<9&&s>=9&&(a=a.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(t)})),n<10&&s>=10&&(a=a.next(()=>this.oi(i))),n<11&&s>=11&&(a=a.next(()=>{(function(l){l.createObjectStore("bundles",{keyPath:"bundleId"})})(t),function(l){l.createObjectStore("namedQueries",{keyPath:"name"})}(t)})),n<12&&s>=12&&(a=a.next(()=>{(function(l){const d=l.createObjectStore("documentOverlays",{keyPath:gf});d.createIndex("collectionPathOverlayIndex",_f,{unique:!1}),d.createIndex("collectionGroupOverlayIndex",yf,{unique:!1})})(t)})),n<13&&s>=13&&(a=a.next(()=>function(l){const d=l.createObjectStore("remoteDocumentsV14",{keyPath:sf});d.createIndex("documentKeyIndex",of),d.createIndex("collectionGroupIndex",af)}(t)).next(()=>this._i(t,i)).next(()=>t.deleteObjectStore("remoteDocuments"))),n<14&&s>=14&&(a=a.next(()=>this.ai(t,i))),n<15&&s>=15&&(a=a.next(()=>function(l){l.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),l.createObjectStore("indexState",{keyPath:df}).createIndex("sequenceNumberIndex",ff,{unique:!1}),l.createObjectStore("indexEntries",{keyPath:mf}).createIndex("documentKeyIndex",pf,{unique:!1})}(t))),n<16&&s>=16&&(a=a.next(()=>{e.objectStore("indexState").clear()}).next(()=>{e.objectStore("indexEntries").clear()})),n<17&&s>=17&&(a=a.next(()=>{(function(l){l.createObjectStore("globals",{keyPath:"name"})})(t)})),a}ri(t){let e=0;return t.store("remoteDocuments").J((n,s)=>{e+=bs(s)}).next(()=>{const n={byteSize:e};return t.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}ni(t){const e=t.store("mutationQueues"),n=t.store("mutations");return e.U().next(s=>A.forEach(s,i=>{const a=IDBKeyRange.bound([i.userId,-1],[i.userId,i.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",a).next(u=>A.forEach(u,l=>{U(l.userId===i.userId);const d=xe(this.serializer,l);return zc(t,i.userId,d).next(()=>{})}))}))}ii(t){const e=t.store("targetDocuments"),n=t.store("remoteDocuments");return t.store("targetGlobal").get("targetGlobalKey").next(s=>{const i=[];return n.J((a,u)=>{const l=new J(a),d=function(p){return[0,Ct(p)]}(l);i.push(e.get(d).next(f=>f?A.resolve():(p=>e.put({targetId:0,path:Ct(p),sequenceNumber:s.highestListenSequenceNumber}))(l)))}).next(()=>A.waitFor(i))})}si(t,e){t.createObjectStore("collectionParents",{keyPath:hf});const n=e.store("collectionParents"),s=new bo,i=a=>{if(s.add(a)){const u=a.lastSegment(),l=a.popLast();return n.put({collectionId:u,parent:Ct(l)})}};return e.store("remoteDocuments").J({H:!0},(a,u)=>{const l=new J(a);return i(l.popLast())}).next(()=>e.store("documentMutations").J({H:!0},([a,u,l],d)=>{const f=zt(u);return i(f.popLast())}))}oi(t){const e=t.store("targets");return e.J((n,s)=>{const i=sr(s),a=Uc(this.serializer,i);return e.put(a)})}_i(t,e){const n=e.store("remoteDocuments"),s=[];return n.J((i,a)=>{const u=e.store("remoteDocumentsV14"),l=function(p){return p.document?new O(J.fromString(p.document.name).popFirst(5)):p.noDocument?O.fromSegments(p.noDocument.path):p.unknownDocument?O.fromSegments(p.unknownDocument.path):F()}(a).path.toArray(),d={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(u.put(d))}).next(()=>A.waitFor(s))}ai(t,e){const n=e.store("mutations"),s=Qc(this.serializer),i=new Hc(Gs.Zr,this.serializer.ct);return n.U().next(a=>{const u=new Map;return a.forEach(l=>{var d;let f=(d=u.get(l.userId))!==null&&d!==void 0?d:$();xe(this.serializer,l).keys().forEach(p=>f=f.add(p)),u.set(l.userId,f)}),A.forEach(u,(l,d)=>{const f=new vt(d),p=zs.lt(this.serializer,f),T=i.getIndexManager(f),P=Ks.lt(f,this.serializer,T,i.referenceDelegate);return new Wc(s,P,p,T).recalculateAndSaveOverlaysForDocumentKeys(new ji(e,Nt.oe),l).next()})})}}function el(r){r.createObjectStore("targetDocuments",{keyPath:lf}).createIndex("documentTargetsIndex",cf,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",uf,{unique:!0}),r.createObjectStore("targetGlobal")}const Di="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Vo{constructor(t,e,n,s,i,a,u,l,d,f,p=17){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.ui=i,this.window=a,this.document=u,this.ci=d,this.li=f,this.hi=p,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=T=>Promise.resolve(),!Vo.D())throw new k(S.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Pm(this,s),this.Ai=e+"main",this.serializer=new Lc(l),this.Ri=new pe(this.Ai,this.hi,new Lm(this.serializer)),this.$r=new fm,this.Ur=new Em(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Qc(this.serializer),this.Gr=new dm,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,f===!1&&ht("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new k(S.FAILED_PRECONDITION,Di);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",t=>this.Ur.getHighestSequenceNumber(t))}).then(t=>{this.Qr=new Nt(t,this.ci)}).then(()=>{this.Kr=!0}).catch(t=>(this.Ri&&this.Ri.close(),Promise.reject(t)))}yi(t){return this.di=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Ri.L(async e=>{e.newVersion===null&&await t()})}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",t=>is(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(t).next(e=>{e||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(t)).next(e=>this.isPrimary&&!e?this.bi(t).next(()=>!1):!!e&&this.Di(t).next(()=>!0))).catch(t=>{if(Ee(t))return x("IndexedDbPersistence","Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return x("IndexedDbPersistence","Releasing owner lease after error during lease refresh",t),!1}).then(t=>{this.isPrimary!==t&&this.ui.enqueueRetryable(()=>this.di(t)),this.isPrimary=t})}wi(t){return Zn(t).get("owner").next(e=>A.resolve(this.vi(e)))}Ci(t){return is(t).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const n=ft(e,"clientMetadata");return n.U().next(s=>{const i=this.xi(s,18e5),a=s.filter(u=>i.indexOf(u)===-1);return A.forEach(a,u=>n.delete(u.clientId)).next(()=>a)})}).catch(()=>[]);if(this.Vi)for(const e of t)this.Vi.removeItem(this.Oi(e.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(t){return!!t&&t.ownerId===this.clientId}Si(t){return this.li?A.resolve(!0):Zn(t).get("owner").next(e=>{if(e!==null&&this.Mi(e.leaseTimestampMs,5e3)&&!this.Ni(e.ownerId)){if(this.vi(e)&&this.networkEnabled)return!0;if(!this.vi(e)){if(!e.allowTabSynchronization)throw new k(S.FAILED_PRECONDITION,Di);return!1}}return!(!this.networkEnabled||!this.inForeground)||is(t).U().next(n=>this.xi(n,5e3).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||a&&u)return!0}return!1})===void 0)}).next(e=>(this.isPrimary!==e&&x("IndexedDbPersistence",`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],t=>{const e=new ji(t,Nt.oe);return this.bi(e).next(()=>this.Ci(e))}),this.Ri.close(),this.qi()}xi(t,e){return t.filter(n=>this.Mi(n.updateTimeMs,e)&&!this.Ni(n.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",t=>is(t).U().next(e=>this.xi(e,18e5).map(n=>n.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(t,e){return Ks.lt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new Im(t,this.serializer.ct.databaseId)}getDocumentOverlayCache(t){return zs.lt(this.serializer,t)}getBundleCache(){return this.Gr}runTransaction(t,e,n){x("IndexedDbPersistence","Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",i=function(l){return l===17?Ef:l===16?If:l===15?po:l===14?Hl:l===13?Wl:l===12?Tf:l===11?Ql:void F()}(this.hi);let a;return this.Ri.runTransaction(t,s,i,u=>(a=new ji(u,this.Qr?this.Qr.next():Nt.oe),e==="readwrite-primary"?this.wi(a).next(l=>!!l||this.Si(a)).next(l=>{if(!l)throw ht(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new k(S.FAILED_PRECONDITION,jl);return n(a)}).next(l=>this.Di(a).next(()=>l)):this.Ki(a).next(()=>n(a)))).then(u=>(a.raiseOnCommittedEvent(),u))}Ki(t){return Zn(t).get("owner").next(e=>{if(e!==null&&this.Mi(e.leaseTimestampMs,5e3)&&!this.Ni(e.ownerId)&&!this.vi(e)&&!(this.li||this.allowTabSynchronization&&e.allowTabSynchronization))throw new k(S.FAILED_PRECONDITION,Di)})}Di(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Zn(t).put("owner",e)}static D(){return pe.D()}bi(t){const e=Zn(t);return e.get("owner").next(n=>this.vi(n)?(x("IndexedDbPersistence","Releasing primary lease."),e.delete("owner")):A.resolve())}Mi(t,e){const n=Date.now();return!(t<n-e)&&(!(t>n)||(ht(`Detected an update time that is in the future: ${t} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var t;typeof((t=this.window)===null||t===void 0?void 0:t.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const e=/(?:Version|Mobile)\/1[456]/;Cl()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(t){var e;try{const n=((e=this.Vi)===null||e===void 0?void 0:e.getItem(this.Oi(t)))!==null;return x("IndexedDbPersistence",`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return ht("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(t){ht("Failed to set zombie client id.",t)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Zn(r){return ft(r,"owner")}function is(r){return ft(r,"clientMetadata")}function Xc(r,t){let e=r.projectId;return r.isDefaultDatabase||(e+="."+r.database),"firestore/"+t+"/"+e+"/"}/**
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
 */class Co{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.$i=n,this.Ui=s}static Wi(t,e){let n=$(),s=$();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Co(t,e.fromCache,n,s)}}/**
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
 */class Um{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Jc{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Cl()?8:Kl(ys())>0?6:4}()}initialize(t,e){this.Ji=t,this.indexManager=e,this.Gi=!0}getDocumentsMatchingQuery(t,e,n,s){const i={result:null};return this.Yi(t,e).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.Zi(t,e,s,n).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Um;return this.Xi(t,e,a).next(u=>{if(i.result=u,this.zi)return this.es(t,e,a,u.size)})}).next(()=>i.result)}es(t,e,n,s){return n.documentReadCount<this.ji?(un()<=Zt.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",ln(e),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),A.resolve()):(un()<=Zt.DEBUG&&x("QueryEngine","Query:",ln(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Hi*s?(un()<=Zt.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",ln(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Bt(e))):A.resolve())}Yi(t,e){if(bu(e))return A.resolve(null);let n=Bt(e);return this.indexManager.getIndexType(t,n).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=ws(e,null,"F"),n=Bt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(i=>{const a=$(...i);return this.Ji.getDocuments(t,a).next(u=>this.indexManager.getMinOffset(t,n).next(l=>{const d=this.ts(e,u);return this.ns(e,d,a,l.readTime)?this.Yi(t,ws(e,null,"F")):this.rs(t,d,e,l)}))})))}Zi(t,e,n,s){return bu(e)||s.isEqual(B.min())?A.resolve(null):this.Ji.getDocuments(t,n).next(i=>{const a=this.ts(e,i);return this.ns(e,a,n,s)?A.resolve(null):(un()<=Zt.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ln(e)),this.rs(t,a,e,Bl(s,-1)).next(u=>u))})}ts(t,e){let n=new Z(dc(t));return e.forEach((s,i)=>{Pr(t,i)&&(n=n.add(i))}),n}ns(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(t,e,n){return un()<=Zt.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",ln(e)),this.Ji.getDocumentsMatchingQuery(t,e,qt.min(),n)}rs(t,e,n,s){return this.Ji.getDocumentsMatchingQuery(t,n,s).next(i=>(e.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */class Bm{constructor(t,e,n,s){this.persistence=t,this.ss=e,this.serializer=s,this.os=new et(K),this._s=new we(i=>Ue(i),Ar),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(n)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Wc(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.os))}}function Yc(r,t,e,n){return new Bm(r,t,e,n)}async function Zc(r,t){const e=L(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,e.ls(t),e.mutationQueue.getAllMutationBatches(n))).next(i=>{const a=[],u=[];let l=$();for(const d of s){a.push(d.batchId);for(const f of d.mutations)l=l.add(f.key)}for(const d of i){u.push(d.batchId);for(const f of d.mutations)l=l.add(f.key)}return e.localDocuments.getDocuments(n,l).next(d=>({hs:d,removedBatchIds:a,addedBatchIds:u}))})})}function qm(r,t){const e=L(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=t.batch.keys(),i=e.cs.newChangeBuffer({trackRemovals:!0});return function(u,l,d,f){const p=d.batch,T=p.keys();let P=A.resolve();return T.forEach(C=>{P=P.next(()=>f.getEntry(l,C)).next(D=>{const V=d.docVersions.get(C);U(V!==null),D.version.compareTo(V)<0&&(p.applyToRemoteDocument(D,d),D.isValidDocument()&&(D.setReadTime(d.commitVersion),f.addEntry(D)))})}),P.next(()=>u.mutationQueue.removeMutationBatch(l,p))}(e,n,t,i).next(()=>i.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(u){let l=$();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(l=l.add(u.batch.mutations[d].key));return l}(t))).next(()=>e.localDocuments.getDocuments(n,s))})}function th(r){const t=L(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ur.getLastRemoteSnapshotVersion(e))}function jm(r,t){const e=L(r),n=t.snapshotVersion;let s=e.os;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=e.cs.newChangeBuffer({trackRemovals:!0});s=e.os;const u=[];t.targetChanges.forEach((f,p)=>{const T=s.get(p);if(!T)return;u.push(e.Ur.removeMatchingKeys(i,f.removedDocuments,p).next(()=>e.Ur.addMatchingKeys(i,f.addedDocuments,p)));let P=T.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(p)!==null?P=P.withResumeToken(ct.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(f.resumeToken,n)),s=s.insert(p,P),function(D,V,j){return D.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=3e8?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0}(T,P,f)&&u.push(e.Ur.updateTargetData(i,P))});let l=Lt(),d=$();if(t.documentUpdates.forEach(f=>{t.resolvedLimboDocuments.has(f)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))}),u.push(zm(i,a,t.documentUpdates).next(f=>{l=f.Ps,d=f.Is})),!n.isEqual(B.min())){const f=e.Ur.getLastRemoteSnapshotVersion(i).next(p=>e.Ur.setTargetsMetadata(i,i.currentSequenceNumber,n));u.push(f)}return A.waitFor(u).next(()=>a.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,l,d)).next(()=>l)}).then(i=>(e.os=s,i))}function zm(r,t,e){let n=$(),s=$();return e.forEach(i=>n=n.add(i)),t.getEntries(r,n).next(i=>{let a=Lt();return e.forEach((u,l)=>{const d=i.get(u);l.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(u)),l.isNoDocument()&&l.version.isEqual(B.min())?(t.removeEntry(u,l.readTime),a=a.insert(u,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(l),a=a.insert(u,l)):x("LocalStore","Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",l.version)}),{Ps:a,Is:s}})}function Km(r,t){const e=L(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function Ss(r,t){const e=L(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return e.Ur.getTargetData(n,t).next(i=>i?(s=i,A.resolve(s)):e.Ur.allocateTargetId(n).next(a=>(s=new ee(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.Ur.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=e.os.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.os=e.os.insert(n.targetId,n),e._s.set(t,n.targetId)),n})}async function wn(r,t,e){const n=L(r),s=n.os.get(t),i=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",i,a=>n.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Ee(a))throw a;x("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}n.os=n.os.remove(t),n._s.delete(s.target)}function no(r,t,e){const n=L(r);let s=B.min(),i=$();return n.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,f){const p=L(l),T=p._s.get(f);return T!==void 0?A.resolve(p.os.get(T)):p.Ur.getTargetData(d,f)}(n,a,Bt(t)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(a,u.targetId).next(l=>{i=l})}).next(()=>n.ss.getDocumentsMatchingQuery(a,t,e?s:B.min(),e?i:$())).next(u=>(rh(n,hc(t),u),{documents:u,Ts:i})))}function eh(r,t){const e=L(r),n=L(e.Ur),s=e.os.get(t);return s?Promise.resolve(s.target):e.persistence.runTransaction("Get target data","readonly",i=>n.ot(i,t).next(a=>a?a.target:null))}function nh(r,t){const e=L(r),n=e.us.get(t)||B.min();return e.persistence.runTransaction("Get new document changes","readonly",s=>e.cs.getAllFromCollectionGroup(s,t,Bl(n,-1),Number.MAX_SAFE_INTEGER)).then(s=>(rh(e,t,s),s))}function rh(r,t,e){let n=r.us.get(t)||B.min();e.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.us.set(t,n)}function nl(r,t){return`firestore_clients_${r}_${t}`}function rl(r,t,e){let n=`firestore_mutations_${r}_${e}`;return t.isAuthenticated()&&(n+=`_${t.uid}`),n}function ki(r,t){return`firestore_targets_${r}_${t}`}class Vs{constructor(t,e,n,s){this.user=t,this.batchId=e,this.state=n,this.error=s}static Rs(t,e,n){const s=JSON.parse(n);let i,a=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return a&&s.error&&(a=typeof s.error.message=="string"&&typeof s.error.code=="string",a&&(i=new k(s.error.code,s.error.message))),a?new Vs(t,e,s.state,i):(ht("SharedClientState",`Failed to parse mutation state for ID '${e}': ${n}`),null)}Vs(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class cr{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static Rs(t,e){const n=JSON.parse(e);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new k(n.error.code,n.error.message))),i?new cr(t,n.state,s):(ht("SharedClientState",`Failed to parse target state for ID '${t}': ${e}`),null)}Vs(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Cs{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static Rs(t,e){const n=JSON.parse(e);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=To();for(let a=0;s&&a<n.activeTargetIds.length;++a)s=Gl(n.activeTargetIds[a]),i=i.add(n.activeTargetIds[a]);return s?new Cs(t,i):(ht("SharedClientState",`Failed to parse client data for instance '${t}': ${e}`),null)}}class xo{constructor(t,e){this.clientId=t,this.onlineState=e}static Rs(t){const e=JSON.parse(t);return typeof e=="object"&&["Unknown","Online","Offline"].indexOf(e.onlineState)!==-1&&typeof e.clientId=="string"?new xo(e.clientId,e.onlineState):(ht("SharedClientState",`Failed to parse online state: ${t}`),null)}}class ro{constructor(){this.activeTargetIds=To()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Ni{constructor(t,e,n,s,i){this.window=t,this.ui=e,this.persistenceKey=n,this.ps=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new et(K),this.started=!1,this.bs=[];const a=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Ds=nl(this.persistenceKey,this.ps),this.vs=function(l){return`firestore_sequence_number_${l}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new ro),this.Cs=new RegExp(`^firestore_clients_${a}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${a}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${a}_(\\d+)$`),this.xs=function(l){return`firestore_online_state_${l}`}(this.persistenceKey),this.Os=function(l){return`firestore_bundle_loaded_v2_${l}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.Qi();for(const n of t){if(n===this.ps)continue;const s=this.getItem(nl(this.persistenceKey,n));if(s){const i=Cs.Rs(n,s);i&&(this.Ss=this.Ss.insert(i.clientId,i))}}this.Ns();const e=this.storage.getItem(this.xs);if(e){const n=this.Ls(e);n&&this.Bs(n)}for(const n of this.bs)this.ws(n);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(t){this.setItem(this.vs,JSON.stringify(t))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(t){let e=!1;return this.Ss.forEach((n,s)=>{s.activeTargetIds.has(t)&&(e=!0)}),e}addPendingMutation(t){this.qs(t,"pending")}updateMutationState(t,e,n){this.qs(t,e,n),this.Qs(t)}addLocalQueryTarget(t,e=!0){let n="not-current";if(this.isActiveQueryTarget(t)){const s=this.storage.getItem(ki(this.persistenceKey,t));if(s){const i=cr.Rs(t,s);i&&(n=i.state)}}return e&&this.Ks.fs(t),this.Ns(),n}removeLocalQueryTarget(t){this.Ks.gs(t),this.Ns()}isLocalQueryTarget(t){return this.Ks.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(ki(this.persistenceKey,t))}updateQueryState(t,e,n){this.$s(t,e,n)}handleUserChange(t,e,n){e.forEach(s=>{this.Qs(s)}),this.currentUser=t,n.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(t){this.Us(t)}notifyBundleLoaded(t){this.Ws(t)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return x("SharedClientState","READ",t,e),e}setItem(t,e){x("SharedClientState","SET",t,e),this.storage.setItem(t,e)}removeItem(t){x("SharedClientState","REMOVE",t),this.storage.removeItem(t)}ws(t){const e=t;if(e.storageArea===this.storage){if(x("SharedClientState","EVENT",e.key,e.newValue),e.key===this.Ds)return void ht("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(e.key!==null){if(this.Cs.test(e.key)){if(e.newValue==null){const n=this.Gs(e.key);return this.zs(n,null)}{const n=this.js(e.key,e.newValue);if(n)return this.zs(n.clientId,n)}}else if(this.Fs.test(e.key)){if(e.newValue!==null){const n=this.Hs(e.key,e.newValue);if(n)return this.Js(n)}}else if(this.Ms.test(e.key)){if(e.newValue!==null){const n=this.Ys(e.key,e.newValue);if(n)return this.Zs(n)}}else if(e.key===this.xs){if(e.newValue!==null){const n=this.Ls(e.newValue);if(n)return this.Bs(n)}}else if(e.key===this.vs){const n=function(i){let a=Nt.oe;if(i!=null)try{const u=JSON.parse(i);U(typeof u=="number"),a=u}catch(u){ht("SharedClientState","Failed to read sequence number from WebStorage",u)}return a}(e.newValue);n!==Nt.oe&&this.sequenceNumberHandler(n)}else if(e.key===this.Os){const n=this.Xs(e.newValue);await Promise.all(n.map(s=>this.syncEngine.eo(s)))}}}else this.bs.push(e)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(t,e,n){const s=new Vs(this.currentUser,t,e,n),i=rl(this.persistenceKey,this.currentUser,t);this.setItem(i,s.Vs())}Qs(t){const e=rl(this.persistenceKey,this.currentUser,t);this.removeItem(e)}Us(t){const e={clientId:this.ps,onlineState:t};this.storage.setItem(this.xs,JSON.stringify(e))}$s(t,e,n){const s=ki(this.persistenceKey,t),i=new cr(t,e,n);this.setItem(s,i.Vs())}Ws(t){const e=JSON.stringify(Array.from(t));this.setItem(this.Os,e)}Gs(t){const e=this.Cs.exec(t);return e?e[1]:null}js(t,e){const n=this.Gs(t);return Cs.Rs(n,e)}Hs(t,e){const n=this.Fs.exec(t),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return Vs.Rs(new vt(i),s,e)}Ys(t,e){const n=this.Ms.exec(t),s=Number(n[1]);return cr.Rs(s,e)}Ls(t){return xo.Rs(t)}Xs(t){return JSON.parse(t)}async Js(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.no(t.batchId,t.state,t.error);x("SharedClientState",`Ignoring mutation for non-active user ${t.user.uid}`)}Zs(t){return this.syncEngine.ro(t.targetId,t.state,t.error)}zs(t,e){const n=e?this.Ss.insert(t,e):this.Ss.remove(t),s=this.ks(this.Ss),i=this.ks(n),a=[],u=[];return i.forEach(l=>{s.has(l)||a.push(l)}),s.forEach(l=>{i.has(l)||u.push(l)}),this.syncEngine.io(a,u).then(()=>{this.Ss=n})}Bs(t){this.Ss.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}ks(t){let e=To();return t.forEach((n,s)=>{e=e.unionWith(s.activeTargetIds)}),e}}class sh{constructor(){this.so=new ro,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,e,n){this.oo[t]=e}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new ro,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class Gm{_o(t){}shutdown(){}}/**
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
 */class sl{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){x("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){x("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let os=null;function Oi(){return os===null?os=function(){return 268435456+Math.round(2147483648*Math.random())}():os++,"0x"+os.toString(16)}/**
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
 */const $m={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class Qm{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}/**
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
 */const wt="WebChannelConnection";class Wm extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+e.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(e,n,s,i,a){const u=Oi(),l=this.xo(e,n.toUriEncodedString());x("RestConnection",`Sending RPC '${e}' ${u}:`,l,s);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,i,a),this.No(e,l,d,s).then(f=>(x("RestConnection",`Received RPC '${e}' ${u}: `,f),f),f=>{throw pn("RestConnection",`RPC '${e}' ${u} failed with error: `,f,"url: ",l,"request:",s),f})}Lo(e,n,s,i,a,u){return this.Mo(e,n,s,i,a)}Oo(e,n,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Pn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,a)=>e[a]=i),s&&s.headers.forEach((i,a)=>e[a]=i)}xo(e,n){const s=$m[e];return`${this.Do}/v1/${n}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,e,n,s){const i=Oi();return new Promise((a,u)=>{const l=new kl;l.setWithCredentials(!0),l.listenOnce(Nl.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case ls.NO_ERROR:const f=l.getResponseJson();x(wt,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(f)),a(f);break;case ls.TIMEOUT:x(wt,`RPC '${t}' ${i} timed out`),u(new k(S.DEADLINE_EXCEEDED,"Request time out"));break;case ls.HTTP_ERROR:const p=l.getStatus();if(x(wt,`RPC '${t}' ${i} failed with status:`,p,"response text:",l.getResponseText()),p>0){let T=l.getResponseJson();Array.isArray(T)&&(T=T[0]);const P=T?.error;if(P&&P.status&&P.message){const C=function(V){const j=V.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(j)>=0?j:S.UNKNOWN}(P.status);u(new k(C,P.message))}else u(new k(S.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new k(S.UNAVAILABLE,"Connection failed."));break;default:F()}}finally{x(wt,`RPC '${t}' ${i} completed.`)}});const d=JSON.stringify(s);x(wt,`RPC '${t}' ${i} sending request:`,s),l.send(e,"POST",d,n,15)})}Bo(t,e,n){const s=Oi(),i=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Fl(),u=Ml(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,e,n),l.encodeInitMessageHeaders=!0;const f=i.join("");x(wt,`Creating RPC '${t}' stream ${s}: ${f}`,l);const p=a.createWebChannel(f,l);let T=!1,P=!1;const C=new Qm({Io:V=>{P?x(wt,`Not sending because RPC '${t}' stream ${s} is closed:`,V):(T||(x(wt,`Opening RPC '${t}' stream ${s} transport.`),p.open(),T=!0),x(wt,`RPC '${t}' stream ${s} sending:`,V),p.send(V))},To:()=>p.close()}),D=(V,j,q)=>{V.listen(j,M=>{try{q(M)}catch(z){setTimeout(()=>{throw z},0)}})};return D(p,er.EventType.OPEN,()=>{P||(x(wt,`RPC '${t}' stream ${s} transport opened.`),C.yo())}),D(p,er.EventType.CLOSE,()=>{P||(P=!0,x(wt,`RPC '${t}' stream ${s} transport closed`),C.So())}),D(p,er.EventType.ERROR,V=>{P||(P=!0,pn(wt,`RPC '${t}' stream ${s} transport errored:`,V),C.So(new k(S.UNAVAILABLE,"The operation could not be completed")))}),D(p,er.EventType.MESSAGE,V=>{var j;if(!P){const q=V.data[0];U(!!q);const M=q,z=M.error||((j=M[0])===null||j===void 0?void 0:j.error);if(z){x(wt,`RPC '${t}' stream ${s} received error:`,z);const H=z.status;let G=function(y){const E=dt[y];if(E!==void 0)return Ac(E)}(H),I=z.message;G===void 0&&(G=S.INTERNAL,I="Unknown error status: "+H+" with message "+z.message),P=!0,C.So(new k(G,I)),p.close()}else x(wt,`RPC '${t}' stream ${s} received:`,q),C.bo(q)}}),D(u,Ol.STAT_EVENT,V=>{V.stat===Bi.PROXY?x(wt,`RPC '${t}' stream ${s} detected buffering proxy`):V.stat===Bi.NOPROXY&&x(wt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.wo()},0),C}}/**
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
 */function ih(){return typeof window<"u"?window:null}function gs(){return typeof document<"u"?document:null}/**
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
 */function $s(r){return new em(r,!0)}/**
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
 */class oh{constructor(t,e,n=1e3,s=1.5,i=6e4){this.ui=t,this.timerId=e,this.ko=n,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const e=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),s=Math.max(0,e-n);s>0&&x("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),t())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class ah{constructor(t,e,n,s,i,a,u,l){this.ui=t,this.Ho=n,this.Jo=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new oh(t,e)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,e){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():e&&e.code===S.RESOURCE_EXHAUSTED?(ht(e.toString()),ht("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):e&&e.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(e)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),e=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.Yo===e&&this.P_(n,s)},n=>{t(()=>{const s=new k(S.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(s)})})}P_(t,e){const n=this.h_(this.Yo);this.stream=this.T_(t,e),this.stream.Eo(()=>{n(()=>this.listener.Eo())}),this.stream.Ro(()=>{n(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{n(()=>this.I_(s))}),this.stream.onMessage(s=>{n(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(t){return x("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return e=>{this.ui.enqueueAndForget(()=>this.Yo===t?e():(x("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Hm extends ah{constructor(t,e,n,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}T_(t,e){return this.connection.Bo("Listen",t,e)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const e=sm(this.serializer,t),n=function(i){if(!("targetChange"in i))return B.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?xt(a.readTime):B.min()}(t);return this.listener.d_(e,n)}A_(t){const e={};e.database=Ji(this.serializer),e.addTarget=function(i,a){let u;const l=a.target;if(u=Is(l)?{documents:Dc(i,l)}:{query:kc(i,l)._t},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=bc(i,a.resumeToken);const d=Hi(i,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(B.min())>0){u.readTime=En(i,a.snapshotVersion.toTimestamp());const d=Hi(i,a.expectedCount);d!==null&&(u.expectedCount=d)}return u}(this.serializer,t);const n=om(this.serializer,t);n&&(e.labels=n),this.a_(e)}R_(t){const e={};e.database=Ji(this.serializer),e.removeTarget=t,this.a_(e)}}class Xm extends ah{constructor(t,e,n,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,e){return this.connection.Bo("Write",t,e)}E_(t){return U(!!t.streamToken),this.lastStreamToken=t.streamToken,U(!t.writeResults||t.writeResults.length===0),this.listener.f_()}onNext(t){U(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const e=im(t.writeResults,t.commitTime),n=xt(t.commitTime);return this.listener.g_(n,e)}p_(){const t={};t.database=Ji(this.serializer),this.a_(t)}m_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>As(this.serializer,n))};this.a_(e)}}/**
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
 */class Jm extends class{}{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,e,n,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Mo(t,Xi(e,n),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new k(S.UNKNOWN,i.toString())})}Lo(t,e,n,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.Lo(t,Xi(e,n),s,a,u,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new k(S.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Ym{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ht(e),this.D_=!1):x("OnlineStateTracker",e)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class Zm{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(a=>{n.enqueueAndForget(async()=>{We(this)&&(x("RemoteStore","Restarting streams for network reachability change."),await async function(l){const d=L(l);d.L_.add(4),await Vr(d),d.q_.set("Unknown"),d.L_.delete(4),await Qs(d)}(this))})}),this.q_=new Ym(n,s)}}async function Qs(r){if(We(r))for(const t of r.B_)await t(!0)}async function Vr(r){for(const t of r.B_)await t(!1)}function Ws(r,t){const e=L(r);e.N_.has(t.targetId)||(e.N_.set(t.targetId,t),No(e)?ko(e):Cn(e).r_()&&Do(e,t))}function vn(r,t){const e=L(r),n=Cn(e);e.N_.delete(t),n.r_()&&uh(e,t),e.N_.size===0&&(n.r_()?n.o_():We(e)&&e.q_.set("Unknown"))}function Do(r,t){if(r.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(B.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Cn(r).A_(t)}function uh(r,t){r.Q_.xe(t),Cn(r).R_(t)}function ko(r){r.Q_=new Jf({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>r.N_.get(t)||null,tt:()=>r.datastore.serializer.databaseId}),Cn(r).start(),r.q_.v_()}function No(r){return We(r)&&!Cn(r).n_()&&r.N_.size>0}function We(r){return L(r).L_.size===0}function lh(r){r.Q_=void 0}async function tp(r){r.q_.set("Online")}async function ep(r){r.N_.forEach((t,e)=>{Do(r,t)})}async function np(r,t){lh(r),No(r)?(r.q_.M_(t),ko(r)):r.q_.set("Unknown")}async function rp(r,t,e){if(r.q_.set("Online"),t instanceof Pc&&t.state===2&&t.cause)try{await async function(s,i){const a=i.cause;for(const u of i.targetIds)s.N_.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.N_.delete(u),s.Q_.removeTarget(u))}(r,t)}catch(n){x("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await xs(r,n)}else if(t instanceof ps?r.Q_.Ke(t):t instanceof Rc?r.Q_.He(t):r.Q_.We(t),!e.isEqual(B.min()))try{const n=await th(r.localStore);e.compareTo(n)>=0&&await function(i,a){const u=i.Q_.rt(a);return u.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.N_.get(d);f&&i.N_.set(d,f.withResumeToken(l.resumeToken,a))}}),u.targetMismatches.forEach((l,d)=>{const f=i.N_.get(l);if(!f)return;i.N_.set(l,f.withResumeToken(ct.EMPTY_BYTE_STRING,f.snapshotVersion)),uh(i,l);const p=new ee(f.target,l,d,f.sequenceNumber);Do(i,p)}),i.remoteSyncer.applyRemoteEvent(u)}(r,e)}catch(n){x("RemoteStore","Failed to raise snapshot:",n),await xs(r,n)}}async function xs(r,t,e){if(!Ee(t))throw t;r.L_.add(1),await Vr(r),r.q_.set("Offline"),e||(e=()=>th(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{x("RemoteStore","Retrying IndexedDB access"),await e(),r.L_.delete(1),await Qs(r)})}function ch(r,t){return t().catch(e=>xs(r,e,t))}async function Vn(r){const t=L(r),e=Te(t);let n=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;sp(t);)try{const s=await Km(t.localStore,n);if(s===null){t.O_.length===0&&e.o_();break}n=s.batchId,ip(t,s)}catch(s){await xs(t,s)}hh(t)&&dh(t)}function sp(r){return We(r)&&r.O_.length<10}function ip(r,t){r.O_.push(t);const e=Te(r);e.r_()&&e.V_&&e.m_(t.mutations)}function hh(r){return We(r)&&!Te(r).n_()&&r.O_.length>0}function dh(r){Te(r).start()}async function op(r){Te(r).p_()}async function ap(r){const t=Te(r);for(const e of r.O_)t.m_(e.mutations)}async function up(r,t,e){const n=r.O_.shift(),s=wo.from(n,t,e);await ch(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await Vn(r)}async function lp(r,t){t&&Te(r).V_&&await async function(n,s){if(function(a){return Wf(a)&&a!==S.ABORTED}(s.code)){const i=n.O_.shift();Te(n).s_(),await ch(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Vn(n)}}(r,t),hh(r)&&dh(r)}async function il(r,t){const e=L(r);e.asyncQueue.verifyOperationInProgress(),x("RemoteStore","RemoteStore received new credentials");const n=We(e);e.L_.add(3),await Vr(e),n&&e.q_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.L_.delete(3),await Qs(e)}async function so(r,t){const e=L(r);t?(e.L_.delete(2),await Qs(e)):t||(e.L_.add(2),await Vr(e),e.q_.set("Unknown"))}function Cn(r){return r.K_||(r.K_=function(e,n,s){const i=L(e);return i.w_(),new Hm(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Eo:tp.bind(null,r),Ro:ep.bind(null,r),mo:np.bind(null,r),d_:rp.bind(null,r)}),r.B_.push(async t=>{t?(r.K_.s_(),No(r)?ko(r):r.q_.set("Unknown")):(await r.K_.stop(),lh(r))})),r.K_}function Te(r){return r.U_||(r.U_=function(e,n,s){const i=L(e);return i.w_(),new Xm(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:op.bind(null,r),mo:lp.bind(null,r),f_:ap.bind(null,r),g_:up.bind(null,r)}),r.B_.push(async t=>{t?(r.U_.s_(),await Vn(r)):(await r.U_.stop(),r.O_.length>0&&(x("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))})),r.U_}/**
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
 */class Oo{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new $t,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,i){const a=Date.now()+n,u=new Oo(t,e,a,s,i);return u.start(n),u}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(S.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Mo(r,t){if(ht("AsyncQueue",`${t}: ${r}`),Ee(r))return new k(S.UNAVAILABLE,`${t}: ${r}`);throw r}/**
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
 */class mn{constructor(t){this.comparator=t?(e,n)=>t(e,n)||O.comparator(e.key,n.key):(e,n)=>O.comparator(e.key,n.key),this.keyedMap=nr(),this.sortedSet=new et(this.comparator)}static emptySet(t){return new mn(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof mn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new mn;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
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
 */class ol{constructor(){this.W_=new et(O.comparator)}track(t){const e=t.doc.key,n=this.W_.get(e);n?t.type!==0&&n.type===3?this.W_=this.W_.insert(e,t):t.type===3&&n.type!==1?this.W_=this.W_.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.W_=this.W_.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.W_=this.W_.remove(e):t.type===1&&n.type===2?this.W_=this.W_.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):F():this.W_=this.W_.insert(e,t)}G_(){const t=[];return this.W_.inorderTraversal((e,n)=>{t.push(n)}),t}}class An{constructor(t,e,n,s,i,a,u,l,d){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(t,e,n,s,i){const a=[];return e.forEach(u=>{a.push({type:0,doc:u})}),new An(t,e,mn.emptySet(e),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Ls(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class cp{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(t=>t.J_())}}class hp{constructor(){this.queries=al(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(e,n){const s=L(e),i=s.queries;s.queries=al(),i.forEach((a,u)=>{for(const l of u.j_)l.onError(n)})})(this,new k(S.ABORTED,"Firestore shutting down"))}}function al(){return new we(r=>cc(r),Ls)}async function Fo(r,t){const e=L(r);let n=3;const s=t.query;let i=e.queries.get(s);i?!i.H_()&&t.J_()&&(n=2):(i=new cp,n=t.J_()?0:1);try{switch(n){case 0:i.z_=await e.onListen(s,!0);break;case 1:i.z_=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=Mo(a,`Initialization of query '${ln(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,i),i.j_.push(t),t.Z_(e.onlineState),i.z_&&t.X_(i.z_)&&Uo(e)}async function Lo(r,t){const e=L(r),n=t.query;let s=3;const i=e.queries.get(n);if(i){const a=i.j_.indexOf(t);a>=0&&(i.j_.splice(a,1),i.j_.length===0?s=t.J_()?0:1:!i.H_()&&t.J_()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function dp(r,t){const e=L(r);let n=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const u of a.j_)u.X_(s)&&(n=!0);a.z_=s}}n&&Uo(e)}function fp(r,t,e){const n=L(r),s=n.queries.get(t);if(s)for(const i of s.j_)i.onError(e);n.queries.delete(t)}function Uo(r){r.Y_.forEach(t=>{t.next()})}var io,ul;(ul=io||(io={})).ea="default",ul.Cache="cache";class Bo{constructor(t,e,n){this.query=t,this.ta=e,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new An(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.na?this.ia(t)&&(this.ta.next(t),e=!0):this.sa(t,this.onlineState)&&(this.oa(t),e=!0),this.ra=t,e}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let e=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),e=!0),e}sa(t,e){if(!t.fromCache||!this.J_())return!0;const n=e!=="Offline";return(!this.options._a||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}ia(t){if(t.docChanges.length>0)return!0;const e=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}oa(t){t=An.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==io.Cache}}/**
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
 */class fh{constructor(t){this.key=t}}class mh{constructor(t){this.key=t}}class mp{constructor(t,e){this.query=t,this.Ta=e,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=$(),this.mutatedKeys=$(),this.Aa=dc(t),this.Ra=new mn(this.Aa)}get Va(){return this.Ta}ma(t,e){const n=e?e.fa:new ol,s=e?e.Ra:this.Ra;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((f,p)=>{const T=s.get(f),P=Pr(this.query,p)?p:null,C=!!T&&this.mutatedKeys.has(T.key),D=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let V=!1;T&&P?T.data.isEqual(P.data)?C!==D&&(n.track({type:3,doc:P}),V=!0):this.ga(T,P)||(n.track({type:2,doc:P}),V=!0,(l&&this.Aa(P,l)>0||d&&this.Aa(P,d)<0)&&(u=!0)):!T&&P?(n.track({type:0,doc:P}),V=!0):T&&!P&&(n.track({type:1,doc:T}),V=!0,(l||d)&&(u=!0)),V&&(P?(a=a.add(P),i=D?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{Ra:a,fa:n,ns:u,mutatedKeys:i}}ga(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const i=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const a=t.fa.G_();a.sort((f,p)=>function(P,C){const D=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F()}};return D(P)-D(C)}(f.type,p.type)||this.Aa(f.doc,p.doc)),this.pa(n),s=s!=null&&s;const u=e&&!s?this.ya():[],l=this.da.size===0&&this.current&&!s?1:0,d=l!==this.Ea;return this.Ea=l,a.length!==0||d?{snapshot:new An(this.query,t.Ra,i,a,t.mutatedKeys,l===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:u}:{wa:u}}Z_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new ol,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach(e=>this.Ta=this.Ta.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ta=this.Ta.delete(e)),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=$(),this.Ra.forEach(n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))});const e=[];return t.forEach(n=>{this.da.has(n)||e.push(new mh(n))}),this.da.forEach(n=>{t.has(n)||e.push(new fh(n))}),e}ba(t){this.Ta=t.Ts,this.da=$();const e=this.ma(t.documents);return this.applyChanges(e,!0)}Da(){return An.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class pp{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class gp{constructor(t){this.key=t,this.va=!1}}class _p{constructor(t,e,n,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new we(u=>cc(u),Ls),this.Ma=new Map,this.xa=new Set,this.Oa=new et(O.comparator),this.Na=new Map,this.La=new So,this.Ba={},this.ka=new Map,this.qa=Ke.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function yp(r,t,e=!0){const n=Hs(r);let s;const i=n.Fa.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await ph(n,t,e,!0),s}async function Tp(r,t){const e=Hs(r);await ph(e,t,!0,!1)}async function ph(r,t,e,n){const s=await Ss(r.localStore,Bt(t)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,e);let u;return n&&(u=await qo(r,t,i,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&Ws(r.remoteStore,s),u}async function qo(r,t,e,n,s){r.Ka=(p,T,P)=>async function(D,V,j,q){let M=V.view.ma(j);M.ns&&(M=await no(D.localStore,V.query,!1).then(({documents:I})=>V.view.ma(I,M)));const z=q&&q.targetChanges.get(V.targetId),H=q&&q.targetMismatches.get(V.targetId)!=null,G=V.view.applyChanges(M,D.isPrimaryClient,z,H);return oo(D,V.targetId,G.wa),G.snapshot}(r,p,T,P);const i=await no(r.localStore,t,!0),a=new mp(t,i.Ts),u=a.ma(i.documents),l=Sr.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),d=a.applyChanges(u,r.isPrimaryClient,l);oo(r,e,d.wa);const f=new pp(t,e,a);return r.Fa.set(t,f),r.Ma.has(e)?r.Ma.get(e).push(t):r.Ma.set(e,[t]),d.snapshot}async function Ip(r,t,e){const n=L(r),s=n.Fa.get(t),i=n.Ma.get(s.targetId);if(i.length>1)return n.Ma.set(s.targetId,i.filter(a=>!Ls(a,t))),void n.Fa.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await wn(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),e&&vn(n.remoteStore,s.targetId),Rn(n,s.targetId)}).catch(Ie)):(Rn(n,s.targetId),await wn(n.localStore,s.targetId,!0))}async function Ep(r,t){const e=L(r),n=e.Fa.get(t),s=e.Ma.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),vn(e.remoteStore,n.targetId))}async function wp(r,t,e){const n=Go(r);try{const s=await function(a,u){const l=L(a),d=ot.now(),f=u.reduce((P,C)=>P.add(C.key),$());let p,T;return l.persistence.runTransaction("Locally write mutations","readwrite",P=>{let C=Lt(),D=$();return l.cs.getEntries(P,f).next(V=>{C=V,C.forEach((j,q)=>{q.isValidDocument()||(D=D.add(j))})}).next(()=>l.localDocuments.getOverlayedDocuments(P,C)).next(V=>{p=V;const j=[];for(const q of u){const M=$f(q,p.get(q.key).overlayedDocument);M!=null&&j.push(new ie(q.key,M,tc(M.value.mapValue),Rt.exists(!0)))}return l.mutationQueue.addMutationBatch(P,d,j,u)}).next(V=>{T=V;const j=V.applyToLocalDocumentSet(p,D);return l.documentOverlayCache.saveOverlays(P,V.batchId,j)})}).then(()=>({batchId:T.batchId,changes:mc(p)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),function(a,u,l){let d=a.Ba[a.currentUser.toKey()];d||(d=new et(K)),d=d.insert(u,l),a.Ba[a.currentUser.toKey()]=d}(n,s.batchId,e),await ve(n,s.changes),await Vn(n.remoteStore)}catch(s){const i=Mo(s,"Failed to persist write");e.reject(i)}}async function gh(r,t){const e=L(r);try{const n=await jm(e.localStore,t);t.targetChanges.forEach((s,i)=>{const a=e.Na.get(i);a&&(U(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?U(a.va):s.removedDocuments.size>0&&(U(a.va),a.va=!1))}),await ve(e,n,t)}catch(n){await Ie(n)}}function ll(r,t,e){const n=L(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.Fa.forEach((i,a)=>{const u=a.view.Z_(t);u.snapshot&&s.push(u.snapshot)}),function(a,u){const l=L(a);l.onlineState=u;let d=!1;l.queries.forEach((f,p)=>{for(const T of p.j_)T.Z_(u)&&(d=!0)}),d&&Uo(l)}(n.eventManager,t),s.length&&n.Ca.d_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function vp(r,t,e){const n=L(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.Na.get(t),i=s&&s.key;if(i){let a=new et(O.comparator);a=a.insert(i,lt.newNoDocument(i,B.min()));const u=$().add(i),l=new br(B.min(),new Map,new et(K),a,u);await gh(n,l),n.Oa=n.Oa.remove(i),n.Na.delete(t),Ko(n)}else await wn(n.localStore,t,!1).then(()=>Rn(n,t,e)).catch(Ie)}async function Ap(r,t){const e=L(r),n=t.batch.batchId;try{const s=await qm(e.localStore,t);zo(e,n,null),jo(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await ve(e,s)}catch(s){await Ie(s)}}async function Rp(r,t,e){const n=L(r);try{const s=await function(a,u){const l=L(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return l.mutationQueue.lookupMutationBatch(d,u).next(p=>(U(p!==null),f=p.keys(),l.mutationQueue.removeMutationBatch(d,p))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,f,u)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>l.localDocuments.getDocuments(d,f))})}(n.localStore,t);zo(n,t,e),jo(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await ve(n,s)}catch(s){await Ie(s)}}function jo(r,t){(r.ka.get(t)||[]).forEach(e=>{e.resolve()}),r.ka.delete(t)}function zo(r,t,e){const n=L(r);let s=n.Ba[n.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),n.Ba[n.currentUser.toKey()]=s}}function Rn(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Ma.get(t))r.Fa.delete(n),e&&r.Ca.$a(n,e);r.Ma.delete(t),r.isPrimaryClient&&r.La.gr(t).forEach(n=>{r.La.containsKey(n)||_h(r,n)})}function _h(r,t){r.xa.delete(t.path.canonicalString());const e=r.Oa.get(t);e!==null&&(vn(r.remoteStore,e),r.Oa=r.Oa.remove(t),r.Na.delete(e),Ko(r))}function oo(r,t,e){for(const n of e)n instanceof fh?(r.La.addReference(n.key,t),Pp(r,n)):n instanceof mh?(x("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,t),r.La.containsKey(n.key)||_h(r,n.key)):F()}function Pp(r,t){const e=t.key,n=e.path.canonicalString();r.Oa.get(e)||r.xa.has(n)||(x("SyncEngine","New document in limbo: "+e),r.xa.add(n),Ko(r))}function Ko(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const t=r.xa.values().next().value;r.xa.delete(t);const e=new O(J.fromString(t)),n=r.qa.next();r.Na.set(n,new gp(e)),r.Oa=r.Oa.insert(e,n),Ws(r.remoteStore,new ee(Bt(Rr(e.path)),n,"TargetPurposeLimboResolution",Nt.oe))}}async function ve(r,t,e){const n=L(r),s=[],i=[],a=[];n.Fa.isEmpty()||(n.Fa.forEach((u,l)=>{a.push(n.Ka(l,t,e).then(d=>{var f;if((d||e)&&n.isPrimaryClient){const p=d?!d.fromCache:(f=e?.targetChanges.get(l.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(d){s.push(d);const p=Co.Wi(l.targetId,d);i.push(p)}}))}),await Promise.all(a),n.Ca.d_(s),await async function(l,d){const f=L(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>A.forEach(d,T=>A.forEach(T.$i,P=>f.persistence.referenceDelegate.addReference(p,T.targetId,P)).next(()=>A.forEach(T.Ui,P=>f.persistence.referenceDelegate.removeReference(p,T.targetId,P)))))}catch(p){if(!Ee(p))throw p;x("LocalStore","Failed to update sequence numbers: "+p)}for(const p of d){const T=p.targetId;if(!p.fromCache){const P=f.os.get(T),C=P.snapshotVersion,D=P.withLastLimboFreeSnapshotVersion(C);f.os=f.os.insert(T,D)}}}(n.localStore,i))}async function bp(r,t){const e=L(r);if(!e.currentUser.isEqual(t)){x("SyncEngine","User change. New user:",t.toKey());const n=await Zc(e.localStore,t);e.currentUser=t,function(i,a){i.ka.forEach(u=>{u.forEach(l=>{l.reject(new k(S.CANCELLED,a))})}),i.ka.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await ve(e,n.hs)}}function Sp(r,t){const e=L(r),n=e.Na.get(t);if(n&&n.va)return $().add(n.key);{let s=$();const i=e.Ma.get(t);if(!i)return s;for(const a of i){const u=e.Fa.get(a);s=s.unionWith(u.view.Va)}return s}}async function Vp(r,t){const e=L(r),n=await no(e.localStore,t.query,!0),s=t.view.ba(n);return e.isPrimaryClient&&oo(e,t.targetId,s.wa),s}async function Cp(r,t){const e=L(r);return nh(e.localStore,t).then(n=>ve(e,n))}async function xp(r,t,e,n){const s=L(r),i=await function(u,l){const d=L(u),f=L(d.mutationQueue);return d.persistence.runTransaction("Lookup mutation documents","readonly",p=>f.Mn(p,l).next(T=>T?d.localDocuments.getDocuments(p,T):A.resolve(null)))}(s.localStore,t);i!==null?(e==="pending"?await Vn(s.remoteStore):e==="acknowledged"||e==="rejected"?(zo(s,t,n||null),jo(s,t),function(u,l){L(L(u).mutationQueue).On(l)}(s.localStore,t)):F(),await ve(s,i)):x("SyncEngine","Cannot apply mutation batch with id: "+t)}async function Dp(r,t){const e=L(r);if(Hs(e),Go(e),t===!0&&e.Qa!==!0){const n=e.sharedClientState.getAllActiveQueryTargets(),s=await cl(e,n.toArray());e.Qa=!0,await so(e.remoteStore,!0);for(const i of s)Ws(e.remoteStore,i)}else if(t===!1&&e.Qa!==!1){const n=[];let s=Promise.resolve();e.Ma.forEach((i,a)=>{e.sharedClientState.isLocalQueryTarget(a)?n.push(a):s=s.then(()=>(Rn(e,a),wn(e.localStore,a,!0))),vn(e.remoteStore,a)}),await s,await cl(e,n),function(a){const u=L(a);u.Na.forEach((l,d)=>{vn(u.remoteStore,d)}),u.La.pr(),u.Na=new Map,u.Oa=new et(O.comparator)}(e),e.Qa=!1,await so(e.remoteStore,!1)}}async function cl(r,t,e){const n=L(r),s=[],i=[];for(const a of t){let u;const l=n.Ma.get(a);if(l&&l.length!==0){u=await Ss(n.localStore,Bt(l[0]));for(const d of l){const f=n.Fa.get(d),p=await Vp(n,f);p.snapshot&&i.push(p.snapshot)}}else{const d=await eh(n.localStore,a);u=await Ss(n.localStore,d),await qo(n,yh(d),a,!1,u.resumeToken)}s.push(u)}return n.Ca.d_(i),s}function yh(r){return uc(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function kp(r){return function(e){return L(L(e).persistence).Qi()}(L(r).localStore)}async function Np(r,t,e,n){const s=L(r);if(s.Qa)return void x("SyncEngine","Ignoring unexpected query state notification.");const i=s.Ma.get(t);if(i&&i.length>0)switch(e){case"current":case"not-current":{const a=await nh(s.localStore,hc(i[0])),u=br.createSynthesizedRemoteEventForCurrentChange(t,e==="current",ct.EMPTY_BYTE_STRING);await ve(s,a,u);break}case"rejected":await wn(s.localStore,t,!0),Rn(s,t,n);break;default:F()}}async function Op(r,t,e){const n=Hs(r);if(n.Qa){for(const s of t){if(n.Ma.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){x("SyncEngine","Adding an already active target "+s);continue}const i=await eh(n.localStore,s),a=await Ss(n.localStore,i);await qo(n,yh(i),a.targetId,!1,a.resumeToken),Ws(n.remoteStore,a)}for(const s of e)n.Ma.has(s)&&await wn(n.localStore,s,!1).then(()=>{vn(n.remoteStore,s),Rn(n,s)}).catch(Ie)}}function Hs(r){const t=L(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=gh.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Sp.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=vp.bind(null,t),t.Ca.d_=dp.bind(null,t.eventManager),t.Ca.$a=fp.bind(null,t.eventManager),t}function Go(r){const t=L(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Ap.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Rp.bind(null,t),t}class wr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=$s(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,e){return null}Ha(t,e){return null}za(t){return Yc(this.persistence,new Jc,t.initialUser,this.serializer)}Ga(t){return new Hc(Gs.Zr,this.serializer)}Wa(t){return new sh}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}wr.provider={build:()=>new wr};class Th extends wr{constructor(t,e,n){super(),this.Ja=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.Ja.initialize(this,t),await Go(this.Ja.syncEngine),await Vn(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(t){return Yc(this.persistence,new Jc,t.initialUser,this.serializer)}ja(t,e){const n=this.persistence.referenceDelegate.garbageCollector;return new vm(n,t.asyncQueue,e)}Ha(t,e){const n=new ef(e,this.persistence);return new tf(t.asyncQueue,n)}Ga(t){const e=Xc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Dt.withCacheSize(this.cacheSizeBytes):Dt.DEFAULT;return new Vo(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,ih(),gs(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(t){return new sh}}class Mp extends Th{constructor(t,e){super(t,e,!1),this.Ja=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.Ja.syncEngine;this.sharedClientState instanceof Ni&&(this.sharedClientState.syncEngine={no:xp.bind(null,e),ro:Np.bind(null,e),io:Op.bind(null,e),Qi:kp.bind(null,e),eo:Cp.bind(null,e)},await this.sharedClientState.start()),await this.persistence.yi(async n=>{await Dp(this.Ja.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}Wa(t){const e=ih();if(!Ni.D(e))throw new k(S.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Xc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new Ni(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class vr{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>ll(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=bp.bind(null,this.syncEngine),await so(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new hp}()}createDatastore(t){const e=$s(t.databaseInfo.databaseId),n=function(i){return new Wm(i)}(t.databaseInfo);return function(i,a,u,l){return new Jm(i,a,u,l)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,s,i,a,u){return new Zm(n,s,i,a,u)}(this.localStore,this.datastore,t.asyncQueue,e=>ll(this.syncEngine,e,0),function(){return sl.D()?new sl:new Gm}())}createSyncEngine(t,e){return function(s,i,a,u,l,d,f){const p=new _p(s,i,a,u,l,d);return f&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const i=L(s);x("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Vr(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}vr.provider={build:()=>new vr};/**
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
 */class $o{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):ht("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
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
 */class Fp{constructor(t,e,n,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=vt.UNAUTHENTICATED,this.clientId=ho.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async a=>{x("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(x("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new $t;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Mo(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function Mi(r,t){r.asyncQueue.verifyOperationInProgress(),x("FirestoreClient","Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await Zc(t.localStore,s),n=s)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function hl(r,t){r.asyncQueue.verifyOperationInProgress();const e=await Lp(r);x("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>il(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>il(t.remoteStore,s)),r._onlineComponents=t}async function Lp(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){x("FirestoreClient","Using user provided OfflineComponentProvider");try{await Mi(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;pn("Error using user provided cache. Falling back to memory cache: "+e),await Mi(r,new wr)}}else x("FirestoreClient","Using default OfflineComponentProvider"),await Mi(r,new wr);return r._offlineComponents}async function Ih(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(x("FirestoreClient","Using user provided OnlineComponentProvider"),await hl(r,r._uninitializedComponentsProvider._online)):(x("FirestoreClient","Using default OnlineComponentProvider"),await hl(r,new vr))),r._onlineComponents}function Up(r){return Ih(r).then(t=>t.syncEngine)}async function Ds(r){const t=await Ih(r),e=t.eventManager;return e.onListen=yp.bind(null,t.syncEngine),e.onUnlisten=Ip.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Tp.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Ep.bind(null,t.syncEngine),e}function Bp(r,t,e={}){const n=new $t;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,u,l,d){const f=new $o({next:T=>{f.Za(),a.enqueueAndForget(()=>Lo(i,p));const P=T.docs.has(u);!P&&T.fromCache?d.reject(new k(S.UNAVAILABLE,"Failed to get document because the client is offline.")):P&&T.fromCache&&l&&l.source==="server"?d.reject(new k(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),p=new Bo(Rr(u.path),f,{includeMetadataChanges:!0,_a:!0});return Fo(i,p)}(await Ds(r),r.asyncQueue,t,e,n)),n.promise}function qp(r,t,e={}){const n=new $t;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,u,l,d){const f=new $o({next:T=>{f.Za(),a.enqueueAndForget(()=>Lo(i,p)),T.fromCache&&l.source==="server"?d.reject(new k(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(T)},error:T=>d.reject(T)}),p=new Bo(u,f,{includeMetadataChanges:!0,_a:!0});return Fo(i,p)}(await Ds(r),r.asyncQueue,t,e,n)),n.promise}/**
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
 */function Eh(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
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
 */const dl=new Map;/**
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
 */function wh(r,t,e){if(!e)throw new k(S.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function vh(r,t,e,n){if(t===!0&&n===!0)throw new k(S.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function fl(r){if(!O.isDocumentKey(r))throw new k(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function ml(r){if(O.isDocumentKey(r))throw new k(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Xs(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":F()}function Mt(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new k(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Xs(r);throw new k(S.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
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
 */class pl{constructor(t){var e,n;if(t.host===void 0){if(t.ssl!==void 0)throw new k(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new k(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}vh("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Eh((n=t.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Qo{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new pl({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new k(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new pl(t),t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Ll;switch(n.type){case"firstParty":return new Qd(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new k(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=dl.get(e);n&&(x("ComponentProvider","Removing Datastore"),dl.delete(e),n.terminate())}(this),Promise.resolve()}}/**
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
 */class Ht{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Ht(this.firestore,t,this._query)}}class _t{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ne(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new _t(this.firestore,t,this._key)}}class ne extends Ht{constructor(t,e,n){super(t,e,Rr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new _t(this.firestore,null,new O(t))}withConverter(t){return new ne(this.firestore,t,this._path)}}function jp(r,t,...e){if(r=Pt(r),wh("collection","path",t),r instanceof Qo){const n=J.fromString(t,...e);return ml(n),new ne(r,null,n)}{if(!(r instanceof _t||r instanceof ne))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(J.fromString(t,...e));return ml(n),new ne(r.firestore,null,n)}}function Ah(r,t,...e){if(r=Pt(r),arguments.length===1&&(t=ho.newId()),wh("doc","path",t),r instanceof Qo){const n=J.fromString(t,...e);return fl(n),new _t(r,null,new O(n))}{if(!(r instanceof _t||r instanceof ne))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(J.fromString(t,...e));return fl(n),new _t(r.firestore,r instanceof ne?r.converter:null,new O(n))}}/**
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
 */class gl{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new oh(this,"async_queue_retry"),this.Vu=()=>{const n=gs();n&&x("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=t;const e=gs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const e=gs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise(()=>{});const e=new $t;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Pu.push(t),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!Ee(t))throw t;x("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(t){const e=this.mu.then(()=>(this.du=!0,t().catch(n=>{this.Eu=n,this.du=!1;const s=function(a){let u=a.message||"";return a.stack&&(u=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),u}(n);throw ht("INTERNAL UNHANDLED ERROR: ",s),n}).then(n=>(this.du=!1,n))));return this.mu=e,e}enqueueAfterDelay(t,e,n){this.fu(),this.Ru.indexOf(t)>-1&&(e=0);const s=Oo.createAndSchedule(this,t,e,n,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&F()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const e of this.Tu)if(e.timerId===t)return!0;return!1}bu(t){return this.wu().then(()=>{this.Tu.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.Tu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.wu()})}Du(t){this.Ru.push(t)}yu(t){const e=this.Tu.indexOf(t);this.Tu.splice(e,1)}}function _l(r){return function(e,n){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1}(r,["next","error","complete"])}class Wt extends Qo{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new gl,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new gl(t),this._firestoreClient=void 0,await t}}}function zp(r,t,e){const n=Vl(r,"firestore");if(n.isInitialized(e)){const s=n.getImmediate({identifier:e}),i=n.getOptions(e);if(lo(i,t))return s;throw new k(S.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(t.cacheSizeBytes!==void 0&&t.localCache!==void 0)throw new k(S.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(t.cacheSizeBytes!==void 0&&t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new k(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:t,instanceIdentifier:e})}function Cr(r){if(r._terminated)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Kp(r),r._firestoreClient}function Kp(r){var t,e,n;const s=r._freezeSettings(),i=function(u,l,d,f){return new vf(u,l,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Eh(f.experimentalLongPollingOptions),f.useFetchStreams)}(r._databaseId,((t=r._app)===null||t===void 0?void 0:t.options.appId)||"",r._persistenceKey,s);r._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((n=s.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),r._firestoreClient=new Fp(r._authCredentials,r._appCheckCredentials,r._queue,i,r._componentsProvider&&function(u){const l=u?._online.build();return{_offline:u?._offline.build(l),_online:l}}(r._componentsProvider))}/**
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
 */class Ge{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ge(ct.fromBase64String(t))}catch(e){throw new k(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ge(ct.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
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
 */class xr{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new k(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new it(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class He{constructor(t){this._methodName=t}}/**
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
 */class Js{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new k(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new k(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return K(this._lat,t._lat)||K(this._long,t._long)}}/**
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
 */class Ys{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,t._values)}}/**
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
 */const Gp=/^__.*__$/;class $p{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new ie(t,this.data,this.fieldMask,e,this.fieldTransforms):new Sn(t,this.data,e,this.fieldTransforms)}}class Rh{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new ie(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Ph(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F()}}class Zs{constructor(t,e,n,s,i,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new Zs(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Fu({path:n,xu:!1});return s.Ou(t),s}Nu(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Fu({path:n,xu:!1});return s.vu(),s}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return ks(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(t.length===0)throw this.Bu("Document fields must not be empty");if(Ph(this.Cu)&&Gp.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class Qp{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||$s(t)}Qu(t,e,n,s=!1){return new Zs({Cu:t,methodName:e,qu:n,path:it.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ti(r){const t=r._freezeSettings(),e=$s(r._databaseId);return new Qp(r._databaseId,!!t.ignoreUndefinedProperties,e)}function bh(r,t,e,n,s,i={}){const a=r.Qu(i.merge||i.mergeFields?2:0,t,e,s);Jo("Data must be an object, but it was:",a,n);const u=Vh(n,a);let l,d;if(i.merge)l=new Ot(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const T=ao(t,p,e);if(!a.contains(T))throw new k(S.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);xh(f,T)||f.push(T)}l=new Ot(f),d=a.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,d=a.fieldTransforms;return new $p(new At(u),l,d)}class Dr extends He{_toFieldTransform(t){if(t.Cu!==2)throw t.Cu===1?t.Bu(`${this._methodName}() can only appear at the top level of your update data`):t.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Dr}}function Sh(r,t,e){return new Zs({Cu:3,qu:t.settings.qu,methodName:r._methodName,xu:e},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class Wo extends He{_toFieldTransform(t){return new Bs(t.path,new In)}isEqual(t){return t instanceof Wo}}class Ho extends He{constructor(t,e){super(t),this.Ku=e}_toFieldTransform(t){const e=Sh(this,t,!0),n=this.Ku.map(i=>Xe(i,e)),s=new Be(n);return new Bs(t.path,s)}isEqual(t){return t instanceof Ho&&lo(this.Ku,t.Ku)}}class Xo extends He{constructor(t,e){super(t),this.Ku=e}_toFieldTransform(t){const e=Sh(this,t,!0),n=this.Ku.map(i=>Xe(i,e)),s=new qe(n);return new Bs(t.path,s)}isEqual(t){return t instanceof Xo&&lo(this.Ku,t.Ku)}}function Wp(r,t,e,n){const s=r.Qu(1,t,e);Jo("Data must be an object, but it was:",s,n);const i=[],a=At.empty();Qe(n,(l,d)=>{const f=Yo(t,l,e);d=Pt(d);const p=s.Nu(f);if(d instanceof Dr)i.push(f);else{const T=Xe(d,p);T!=null&&(i.push(f),a.set(f,T))}});const u=new Ot(i);return new Rh(a,u,s.fieldTransforms)}function Hp(r,t,e,n,s,i){const a=r.Qu(1,t,e),u=[ao(t,n,e)],l=[s];if(i.length%2!=0)throw new k(S.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<i.length;T+=2)u.push(ao(t,i[T])),l.push(i[T+1]);const d=[],f=At.empty();for(let T=u.length-1;T>=0;--T)if(!xh(d,u[T])){const P=u[T];let C=l[T];C=Pt(C);const D=a.Nu(P);if(C instanceof Dr)d.push(P);else{const V=Xe(C,D);V!=null&&(d.push(P),f.set(P,V))}}const p=new Ot(d);return new Rh(f,p,a.fieldTransforms)}function Xp(r,t,e,n=!1){return Xe(e,r.Qu(n?4:3,t))}function Xe(r,t){if(Ch(r=Pt(r)))return Jo("Unsupported field value:",t,r),Vh(r,t);if(r instanceof He)return function(n,s){if(!Ph(s.Cu))throw s.Bu(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.xu&&t.Cu!==4)throw t.Bu("Nested arrays are not supported");return function(n,s){const i=[];let a=0;for(const u of n){let l=Xe(u,s.Lu(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(r,t)}return function(n,s){if((n=Pt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Bf(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=ot.fromDate(n);return{timestampValue:En(s.serializer,i)}}if(n instanceof ot){const i=new ot(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:En(s.serializer,i)}}if(n instanceof Js)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ge)return{bytesValue:bc(s.serializer,n._byteString)};if(n instanceof _t){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ro(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof Ys)return function(a,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(l=>{if(typeof l!="number")throw u.Bu("VectorValues must only contain numeric values.");return Io(u.serializer,l)})}}}}}}(n,s);throw s.Bu(`Unsupported field value: ${Xs(n)}`)}(r,t)}function Vh(r,t){const e={};return Xl(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Qe(r,(n,s)=>{const i=Xe(s,t.Mu(n));i!=null&&(e[n]=i)}),{mapValue:{fields:e}}}function Ch(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof ot||r instanceof Js||r instanceof Ge||r instanceof _t||r instanceof He||r instanceof Ys)}function Jo(r,t,e){if(!Ch(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const n=Xs(e);throw n==="an object"?t.Bu(r+" a custom object"):t.Bu(r+" "+n)}}function ao(r,t,e){if((t=Pt(t))instanceof xr)return t._internalPath;if(typeof t=="string")return Yo(r,t);throw ks("Field path arguments must be of type string or ",r,!1,void 0,e)}const Jp=new RegExp("[~\\*/\\[\\]]");function Yo(r,t,e){if(t.search(Jp)>=0)throw ks(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new xr(...t.split("."))._internalPath}catch{throw ks(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function ks(r,t,e,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${n}`),a&&(l+=` in document ${s}`),l+=")"),new k(S.INVALID_ARGUMENT,u+r+l)}function xh(r,t){return r.some(e=>e.isEqual(t))}/**
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
 */class Dh{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new _t(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Yp(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(ei("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Yp extends Dh{data(){return super.data()}}function ei(r,t){return typeof t=="string"?Yo(r,t):t instanceof xr?t._internalPath:t._delegate._internalPath}/**
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
 */function kh(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new k(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Zo{}class ni extends Zo{}function Zp(r,t,...e){let n=[];t instanceof Zo&&n.push(t),n=n.concat(e),function(i){const a=i.filter(l=>l instanceof ri).length,u=i.filter(l=>l instanceof kr).length;if(a>1||a>0&&u>0)throw new k(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class kr extends ni{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new kr(t,e,n)}_apply(t){const e=this._parse(t);return Nh(t._query,e),new Ht(t.firestore,t.converter,Wi(t._query,e))}_parse(t){const e=ti(t.firestore);return function(i,a,u,l,d,f,p){let T;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new k(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Tl(p,f);const P=[];for(const C of p)P.push(yl(l,i,C));T={arrayValue:{values:P}}}else T=yl(l,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Tl(p,f),T=Xp(u,a,p,f==="in"||f==="not-in");return Q.create(d,f,T)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function tg(r,t,e){const n=t,s=ei("where",r);return kr._create(s,n,e)}class ri extends Zo{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new ri(t,e)}_parse(t){const e=this._queryConstraints.map(n=>n._parse(t)).filter(n=>n.getFilters().length>0);return e.length===1?e[0]:Y.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,i){let a=s;const u=i.getFlattenedFilters();for(const l of u)Nh(a,l),a=Wi(a,l)}(t._query,e),new Ht(t.firestore,t.converter,Wi(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class si extends ni{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new si(t,e)}_apply(t){const e=function(s,i,a){if(s.startAt!==null)throw new k(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new k(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ir(i,a)}(t._query,this._field,this._direction);return new Ht(t.firestore,t.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new bn(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(t._query,e))}}function eg(r,t="asc"){const e=t,n=ei("orderBy",r);return si._create(n,e)}class ii extends ni{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new ii(t,e,n)}_apply(t){return new Ht(t.firestore,t.converter,ws(t._query,this._limit,this._limitType))}}function ng(r){return ii._create("limit",r,"F")}function yl(r,t,e){if(typeof(e=Pt(e))=="string"){if(e==="")throw new k(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!lc(t)&&e.indexOf("/")!==-1)throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child(J.fromString(e));if(!O.isDocumentKey(n))throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return yr(r,new O(n))}if(e instanceof _t)return yr(r,e._key);throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Xs(e)}.`)}function Tl(r,t){if(!Array.isArray(r)||r.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Nh(r,t){const e=function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new k(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new k(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class Oh{convertValue(t,e="none"){switch(Le(t)){case 0:return null;case 1:return t.booleanValue;case 2:return st(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ge(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw F()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Qe(t,(s,i)=>{n[s]=this.convertValue(i,e)}),n}convertVectorValue(t){var e,n,s;const i=(s=(n=(e=t.fields)===null||e===void 0?void 0:e.value.arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.map(a=>st(a.doubleValue));return new Ys(i)}convertGeoPoint(t){return new Js(st(t.latitude),st(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=_o(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(gr(t));default:return null}}convertTimestamp(t){const e=se(t);return new ot(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=J.fromString(t);U(Fc(n));const s=new _e(n.get(1),n.get(3)),i=new O(n.popFirst(5));return s.isEqual(e)||ht(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
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
 */function Mh(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}/**
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
 */class fn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class ta extends Dh{constructor(t,e,n,s,i,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new hr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(ei("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class hr extends ta{data(t={}){return super.data(t)}}class ea{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new fn(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new hr(this._firestore,this._userDataWriter,n.key,n,new fn(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new k(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const l=new hr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new fn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const l=new hr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new fn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,f=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),f=a.indexOf(u.doc.key)),{type:rg(u.type),doc:l,oldIndex:d,newIndex:f}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function rg(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F()}}/**
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
 */function sg(r){r=Mt(r,_t);const t=Mt(r.firestore,Wt);return Bp(Cr(t),r._key).then(e=>Fh(t,r,e))}class na extends Oh{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ge(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new _t(this.firestore,null,e)}}function ig(r){r=Mt(r,Ht);const t=Mt(r.firestore,Wt),e=Cr(t),n=new na(t);return kh(r._query),qp(e,r._query).then(s=>new ea(t,n,r,s))}function og(r,t,e){r=Mt(r,_t);const n=Mt(r.firestore,Wt),s=Mh(r.converter,t,e);return Nr(n,[bh(ti(n),"setDoc",r._key,s,r.converter!==null,e).toMutation(r._key,Rt.none())])}function ag(r,t,e,...n){r=Mt(r,_t);const s=Mt(r.firestore,Wt),i=ti(s);let a;return a=typeof(t=Pt(t))=="string"||t instanceof xr?Hp(i,"updateDoc",r._key,t,e,n):Wp(i,"updateDoc",r._key,t),Nr(s,[a.toMutation(r._key,Rt.exists(!0))])}function ug(r){return Nr(Mt(r.firestore,Wt),[new js(r._key,Rt.none())])}function lg(r,t){const e=Mt(r.firestore,Wt),n=Ah(r),s=Mh(r.converter,t);return Nr(e,[bh(ti(r.firestore),"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,Rt.exists(!1))]).then(()=>n)}function cg(r,...t){var e,n,s;r=Pt(r);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof t[a]!="object"||_l(t[a])||(i=t[a],a++);const u={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(_l(t[a])){const p=t[a];t[a]=(e=p.next)===null||e===void 0?void 0:e.bind(p),t[a+1]=(n=p.error)===null||n===void 0?void 0:n.bind(p),t[a+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let l,d,f;if(r instanceof _t)d=Mt(r.firestore,Wt),f=Rr(r._key.path),l={next:p=>{t[a]&&t[a](Fh(d,r,p))},error:t[a+1],complete:t[a+2]};else{const p=Mt(r,Ht);d=Mt(p.firestore,Wt),f=p._query;const T=new na(d);l={next:P=>{t[a]&&t[a](new ea(d,T,p,P))},error:t[a+1],complete:t[a+2]},kh(r._query)}return function(T,P,C,D){const V=new $o(D),j=new Bo(P,V,C);return T.asyncQueue.enqueueAndForget(async()=>Fo(await Ds(T),j)),()=>{V.Za(),T.asyncQueue.enqueueAndForget(async()=>Lo(await Ds(T),j))}}(Cr(d),f,u,l)}function Nr(r,t){return function(n,s){const i=new $t;return n.asyncQueue.enqueueAndForget(async()=>wp(await Up(n),s,i)),i.promise}(Cr(r),t)}function Fh(r,t,e){const n=e.docs.get(t._key),s=new na(r);return new ta(r,s,t._key,n,new fn(e.hasPendingWrites,e.fromCache),t.converter)}class hg{constructor(t){let e;this.kind="persistent",t?.tabManager?(t.tabManager._initialize(t),e=t.tabManager):(e=Lh(),e._initialize(t)),this._onlineComponentProvider=e._onlineComponentProvider,this._offlineComponentProvider=e._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function dg(r){return new hg(r)}class fg{constructor(t){this.forceOwnership=t,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=vr.provider,this._offlineComponentProvider={build:e=>new Th(e,t?.cacheSizeBytes,this.forceOwnership)}}}class mg{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=vr.provider,this._offlineComponentProvider={build:e=>new Mp(e,t?.cacheSizeBytes)}}}function Lh(r){return new fg(void 0)}function pg(){return new mg}/**
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
 */function gg(){return new Dr("deleteField")}function _g(){return new Wo("serverTimestamp")}function yg(...r){return new Ho("arrayUnion",r)}function Tg(...r){return new Xo("arrayRemove",r)}(function(t,e=!0){(function(s){Pn=s})(xl),Pl(new bl("firestore",(n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),u=new Wt(new Gd(n.getProvider("auth-internal")),new Hd(n.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new k(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new _e(d.options.projectId,f)}(a,s),a);return i=Object.assign({useFetchStreams:e},i),u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),_s(hu,"4.7.3",t),_s(hu,"4.7.3","esm2017")})();const F_=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Oh,Bytes:Ge,CollectionReference:ne,DocumentReference:_t,DocumentSnapshot:ta,FieldPath:xr,FieldValue:He,Firestore:Wt,FirestoreError:k,GeoPoint:Js,Query:Ht,QueryCompositeFilterConstraint:ri,QueryConstraint:ni,QueryDocumentSnapshot:hr,QueryFieldFilterConstraint:kr,QueryLimitConstraint:ii,QueryOrderByConstraint:si,QuerySnapshot:ea,SnapshotMetadata:fn,Timestamp:ot,VectorValue:Ys,_AutoId:ho,_ByteString:ct,_DatabaseId:_e,_DocumentKey:O,_EmptyAuthCredentialsProvider:Ll,_FieldPath:it,_cast:Mt,_logWarn:pn,_validateIsNotUsedTogether:vh,addDoc:lg,arrayRemove:Tg,arrayUnion:yg,collection:jp,deleteDoc:ug,deleteField:gg,doc:Ah,ensureFirestoreConfigured:Cr,executeWrite:Nr,getDoc:sg,getDocs:ig,initializeFirestore:zp,limit:ng,onSnapshot:cg,orderBy:eg,persistentLocalCache:dg,persistentMultipleTabManager:pg,persistentSingleTabManager:Lh,query:Zp,serverTimestamp:_g,setDoc:og,updateDoc:ag,where:tg},Symbol.toStringTag,{value:"Module"}));/**
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
 */const Uh="firebasestorage.googleapis.com",Bh="storageBucket",Ig=2*60*1e3,Eg=10*60*1e3,wg=1e3;/**
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
 */class at extends Sl{constructor(t,e,n=0){super(Fi(t),`Firebase Storage: ${e} (${Fi(t)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,at.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return Fi(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var rt;(function(r){r.UNKNOWN="unknown",r.OBJECT_NOT_FOUND="object-not-found",r.BUCKET_NOT_FOUND="bucket-not-found",r.PROJECT_NOT_FOUND="project-not-found",r.QUOTA_EXCEEDED="quota-exceeded",r.UNAUTHENTICATED="unauthenticated",r.UNAUTHORIZED="unauthorized",r.UNAUTHORIZED_APP="unauthorized-app",r.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",r.INVALID_CHECKSUM="invalid-checksum",r.CANCELED="canceled",r.INVALID_EVENT_NAME="invalid-event-name",r.INVALID_URL="invalid-url",r.INVALID_DEFAULT_BUCKET="invalid-default-bucket",r.NO_DEFAULT_BUCKET="no-default-bucket",r.CANNOT_SLICE_BLOB="cannot-slice-blob",r.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",r.NO_DOWNLOAD_URL="no-download-url",r.INVALID_ARGUMENT="invalid-argument",r.INVALID_ARGUMENT_COUNT="invalid-argument-count",r.APP_DELETED="app-deleted",r.INVALID_ROOT_OPERATION="invalid-root-operation",r.INVALID_FORMAT="invalid-format",r.INTERNAL_ERROR="internal-error",r.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(rt||(rt={}));function Fi(r){return"storage/"+r}function ra(){const r="An unknown error occurred, please check the error payload for server response.";return new at(rt.UNKNOWN,r)}function vg(r){return new at(rt.OBJECT_NOT_FOUND,"Object '"+r+"' does not exist.")}function Ag(r){return new at(rt.QUOTA_EXCEEDED,"Quota for bucket '"+r+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Rg(){const r="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new at(rt.UNAUTHENTICATED,r)}function Pg(){return new at(rt.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function bg(r){return new at(rt.UNAUTHORIZED,"User does not have permission to access '"+r+"'.")}function qh(){return new at(rt.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function jh(){return new at(rt.CANCELED,"User canceled the upload/download.")}function Sg(r){return new at(rt.INVALID_URL,"Invalid URL '"+r+"'.")}function Vg(r){return new at(rt.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.")}function Cg(){return new at(rt.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Bh+"' property when initializing the app?")}function zh(){return new at(rt.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function xg(){return new at(rt.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function Dg(){return new at(rt.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function kg(r){return new at(rt.UNSUPPORTED_ENVIRONMENT,`${r} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function uo(r){return new at(rt.INVALID_ARGUMENT,r)}function Kh(){return new at(rt.APP_DELETED,"The Firebase app was deleted.")}function Ng(r){return new at(rt.INVALID_ROOT_OPERATION,"The operation '"+r+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function dr(r,t){return new at(rt.INVALID_FORMAT,"String does not match format '"+r+"': "+t)}function tr(r){throw new at(rt.INTERNAL_ERROR,"Internal error: "+r)}/**
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
 */class Ut{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let n;try{n=Ut.makeFromUrl(t,e)}catch{return new Ut(t,"")}if(n.path==="")return n;throw Vg(t)}static makeFromUrl(t,e){let n=null;const s="([A-Za-z0-9.\\-_]+)";function i(z){z.path.charAt(z.path.length-1)==="/"&&(z.path_=z.path_.slice(0,-1))}const a="(/(.*))?$",u=new RegExp("^gs://"+s+a,"i"),l={bucket:1,path:3};function d(z){z.path_=decodeURIComponent(z.path)}const f="v[A-Za-z0-9_]+",p=e.replace(/[.]/g,"\\."),T="(/([^?#]*).*)?$",P=new RegExp(`^https?://${p}/${f}/b/${s}/o${T}`,"i"),C={bucket:1,path:3},D=e===Uh?"(?:storage.googleapis.com|storage.cloud.google.com)":e,V="([^?#]*)",j=new RegExp(`^https?://${D}/${s}/${V}`,"i"),M=[{regex:u,indices:l,postModify:i},{regex:P,indices:C,postModify:d},{regex:j,indices:{bucket:1,path:2},postModify:d}];for(let z=0;z<M.length;z++){const H=M[z],G=H.regex.exec(t);if(G){const I=G[H.indices.bucket];let g=G[H.indices.path];g||(g=""),n=new Ut(I,g),H.postModify(n);break}}if(n==null)throw Sg(t);return n}}class Og{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
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
 */function Mg(r,t,e){let n=1,s=null,i=null,a=!1,u=0;function l(){return u===2}let d=!1;function f(...V){d||(d=!0,t.apply(null,V))}function p(V){s=setTimeout(()=>{s=null,r(P,l())},V)}function T(){i&&clearTimeout(i)}function P(V,...j){if(d){T();return}if(V){T(),f.call(null,V,...j);return}if(l()||a){T(),f.call(null,V,...j);return}n<64&&(n*=2);let M;u===1?(u=2,M=0):M=(n+Math.random())*1e3,p(M)}let C=!1;function D(V){C||(C=!0,T(),!d&&(s!==null?(V||(u=2),clearTimeout(s),p(0)):V||(u=1)))}return p(0),i=setTimeout(()=>{a=!0,D(!0)},e),D}function Fg(r){r(!1)}/**
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
 */function Lg(r){return r!==void 0}function Ug(r){return typeof r=="function"}function Bg(r){return typeof r=="object"&&!Array.isArray(r)}function oi(r){return typeof r=="string"||r instanceof String}function Il(r){return sa()&&r instanceof Blob}function sa(){return typeof Blob<"u"}function El(r,t,e,n){if(n<t)throw uo(`Invalid value for '${r}'. Expected ${t} or greater.`);if(n>e)throw uo(`Invalid value for '${r}'. Expected ${e} or less.`)}/**
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
 */function xn(r,t,e){let n=t;return e==null&&(n=`https://${t}`),`${e}://${n}/v0${r}`}function Gh(r){const t=encodeURIComponent;let e="?";for(const n in r)if(r.hasOwnProperty(n)){const s=t(n)+"="+t(r[n]);e=e+s+"&"}return e=e.slice(0,-1),e}var Me;(function(r){r[r.NO_ERROR=0]="NO_ERROR",r[r.NETWORK_ERROR=1]="NETWORK_ERROR",r[r.ABORT=2]="ABORT"})(Me||(Me={}));/**
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
 */function $h(r,t){const e=r>=500&&r<600,s=[408,429].indexOf(r)!==-1,i=t.indexOf(r)!==-1;return e||s||i}/**
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
 */class qg{constructor(t,e,n,s,i,a,u,l,d,f,p,T=!0){this.url_=t,this.method_=e,this.headers_=n,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=u,this.errorCallback_=l,this.timeout_=d,this.progressCallback_=f,this.connectionFactory_=p,this.retry=T,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((P,C)=>{this.resolve_=P,this.reject_=C,this.start_()})}start_(){const t=(n,s)=>{if(s){n(!1,new as(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const a=u=>{const l=u.loaded,d=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,d)};this.progressCallback_!==null&&i.addUploadProgressListener(a),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(a),this.pendingConnection_=null;const u=i.getErrorCode()===Me.NO_ERROR,l=i.getStatus();if(!u||$h(l,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===Me.ABORT;n(!1,new as(!1,null,f));return}const d=this.successCodes_.indexOf(l)!==-1;n(!0,new as(d,i))})},e=(n,s)=>{const i=this.resolve_,a=this.reject_,u=s.connection;if(s.wasSuccessCode)try{const l=this.callback_(u,u.getResponse());Lg(l)?i(l):i()}catch(l){a(l)}else if(u!==null){const l=ra();l.serverResponse=u.getErrorText(),this.errorCallback_?a(this.errorCallback_(u,l)):a(l)}else if(s.canceled){const l=this.appDelete_?Kh():jh();a(l)}else{const l=qh();a(l)}};this.canceled_?e(!1,new as(!1,null,!0)):this.backoffId_=Mg(t,e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&Fg(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class as{constructor(t,e,n){this.wasSuccessCode=t,this.connection=e,this.canceled=!!n}}function jg(r,t){t!==null&&t.length>0&&(r.Authorization="Firebase "+t)}function zg(r,t){r["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Kg(r,t){t&&(r["X-Firebase-GMPID"]=t)}function Gg(r,t){t!==null&&(r["X-Firebase-AppCheck"]=t)}function $g(r,t,e,n,s,i,a=!0){const u=Gh(r.urlParams),l=r.url+u,d=Object.assign({},r.headers);return Kg(d,t),jg(d,e),zg(d,i),Gg(d,n),new qg(l,r.method,d,r.body,r.successCodes,r.additionalRetryCodes,r.handler,r.errorHandler,r.timeout,r.progressCallback,s,a)}/**
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
 */function Qg(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Wg(...r){const t=Qg();if(t!==void 0){const e=new t;for(let n=0;n<r.length;n++)e.append(r[n]);return e.getBlob()}else{if(sa())return new Blob(r);throw new at(rt.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Hg(r,t,e){return r.webkitSlice?r.webkitSlice(t,e):r.mozSlice?r.mozSlice(t,e):r.slice?r.slice(t,e):null}/**
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
 */function Xg(r){if(typeof atob>"u")throw kg("base-64");return atob(r)}/**
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
 */const Gt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Li{constructor(t,e){this.data=t,this.contentType=e||null}}function Jg(r,t){switch(r){case Gt.RAW:return new Li(Qh(t));case Gt.BASE64:case Gt.BASE64URL:return new Li(Wh(r,t));case Gt.DATA_URL:return new Li(Zg(t),t_(t))}throw ra()}function Qh(r){const t=[];for(let e=0;e<r.length;e++){let n=r.charCodeAt(e);if(n<=127)t.push(n);else if(n<=2047)t.push(192|n>>6,128|n&63);else if((n&64512)===55296)if(!(e<r.length-1&&(r.charCodeAt(e+1)&64512)===56320))t.push(239,191,189);else{const i=n,a=r.charCodeAt(++e);n=65536|(i&1023)<<10|a&1023,t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|n&63)}else(n&64512)===56320?t.push(239,191,189):t.push(224|n>>12,128|n>>6&63,128|n&63)}return new Uint8Array(t)}function Yg(r){let t;try{t=decodeURIComponent(r)}catch{throw dr(Gt.DATA_URL,"Malformed data URL.")}return Qh(t)}function Wh(r,t){switch(r){case Gt.BASE64:{const s=t.indexOf("-")!==-1,i=t.indexOf("_")!==-1;if(s||i)throw dr(r,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Gt.BASE64URL:{const s=t.indexOf("+")!==-1,i=t.indexOf("/")!==-1;if(s||i)throw dr(r,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let e;try{e=Xg(t)}catch(s){throw s.message.includes("polyfill")?s:dr(r,"Invalid character found")}const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}class Hh{constructor(t){this.base64=!1,this.contentType=null;const e=t.match(/^data:([^,]+)?,/);if(e===null)throw dr(Gt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=e[1]||null;n!=null&&(this.base64=e_(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=t.substring(t.indexOf(",")+1)}}function Zg(r){const t=new Hh(r);return t.base64?Wh(Gt.BASE64,t.rest):Yg(t.rest)}function t_(r){return new Hh(r).contentType}function e_(r,t){return r.length>=t.length?r.substring(r.length-t.length)===t:!1}/**
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
 */class te{constructor(t,e){let n=0,s="";Il(t)?(this.data_=t,n=t.size,s=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),n=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),n=t.length),this.size_=n,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,e){if(Il(this.data_)){const n=this.data_,s=Hg(n,t,e);return s===null?null:new te(s)}else{const n=new Uint8Array(this.data_.buffer,t,e-t);return new te(n,!0)}}static getBlob(...t){if(sa()){const e=t.map(n=>n instanceof te?n.data_:n);return new te(Wg.apply(null,e))}else{const e=t.map(a=>oi(a)?Jg(Gt.RAW,a).data:a.data_);let n=0;e.forEach(a=>{n+=a.byteLength});const s=new Uint8Array(n);let i=0;return e.forEach(a=>{for(let u=0;u<a.length;u++)s[i++]=a[u]}),new te(s,!0)}}uploadData(){return this.data_}}/**
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
 */function Xh(r){let t;try{t=JSON.parse(r)}catch{return null}return Bg(t)?t:null}/**
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
 */function n_(r){if(r.length===0)return null;const t=r.lastIndexOf("/");return t===-1?"":r.slice(0,t)}function r_(r,t){const e=t.split("/").filter(n=>n.length>0).join("/");return r.length===0?e:r+"/"+e}function Jh(r){const t=r.lastIndexOf("/",r.length-2);return t===-1?r:r.slice(t+1)}/**
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
 */function s_(r,t){return t}class Vt{constructor(t,e,n,s){this.server=t,this.local=e||t,this.writable=!!n,this.xform=s||s_}}let us=null;function i_(r){return!oi(r)||r.length<2?r:Jh(r)}function ia(){if(us)return us;const r=[];r.push(new Vt("bucket")),r.push(new Vt("generation")),r.push(new Vt("metageneration")),r.push(new Vt("name","fullPath",!0));function t(i,a){return i_(a)}const e=new Vt("name");e.xform=t,r.push(e);function n(i,a){return a!==void 0?Number(a):a}const s=new Vt("size");return s.xform=n,r.push(s),r.push(new Vt("timeCreated")),r.push(new Vt("updated")),r.push(new Vt("md5Hash",null,!0)),r.push(new Vt("cacheControl",null,!0)),r.push(new Vt("contentDisposition",null,!0)),r.push(new Vt("contentEncoding",null,!0)),r.push(new Vt("contentLanguage",null,!0)),r.push(new Vt("contentType",null,!0)),r.push(new Vt("metadata","customMetadata",!0)),us=r,us}function o_(r,t){function e(){const n=r.bucket,s=r.fullPath,i=new Ut(n,s);return t._makeStorageReference(i)}Object.defineProperty(r,"ref",{get:e})}function a_(r,t,e){const n={};n.type="file";const s=e.length;for(let i=0;i<s;i++){const a=e[i];n[a.local]=a.xform(n,t[a.server])}return o_(n,r),n}function Yh(r,t,e){const n=Xh(t);return n===null?null:a_(r,n,e)}function u_(r,t,e,n){const s=Xh(t);if(s===null||!oi(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const a=encodeURIComponent;return i.split(",").map(d=>{const f=r.bucket,p=r.fullPath,T="/b/"+a(f)+"/o/"+a(p),P=xn(T,e,n),C=Gh({alt:"media",token:d});return P+C})[0]}function Zh(r,t){const e={},n=t.length;for(let s=0;s<n;s++){const i=t[s];i.writable&&(e[i.server]=r[i.local])}return JSON.stringify(e)}class Je{constructor(t,e,n,s){this.url=t,this.method=e,this.handler=n,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function re(r){if(!r)throw ra()}function oa(r,t){function e(n,s){const i=Yh(r,s,t);return re(i!==null),i}return e}function l_(r,t){function e(n,s){const i=Yh(r,s,t);return re(i!==null),u_(i,s,r.host,r._protocol)}return e}function Or(r){function t(e,n){let s;return e.getStatus()===401?e.getErrorText().includes("Firebase App Check token is invalid")?s=Pg():s=Rg():e.getStatus()===402?s=Ag(r.bucket):e.getStatus()===403?s=bg(r.path):s=n,s.status=e.getStatus(),s.serverResponse=n.serverResponse,s}return t}function aa(r){const t=Or(r);function e(n,s){let i=t(n,s);return n.getStatus()===404&&(i=vg(r.path)),i.serverResponse=s.serverResponse,i}return e}function c_(r,t,e){const n=t.fullServerUrl(),s=xn(n,r.host,r._protocol),i="GET",a=r.maxOperationRetryTime,u=new Je(s,i,oa(r,e),a);return u.errorHandler=aa(t),u}function h_(r,t,e){const n=t.fullServerUrl(),s=xn(n,r.host,r._protocol),i="GET",a=r.maxOperationRetryTime,u=new Je(s,i,l_(r,e),a);return u.errorHandler=aa(t),u}function d_(r,t){const e=t.fullServerUrl(),n=xn(e,r.host,r._protocol),s="DELETE",i=r.maxOperationRetryTime;function a(l,d){}const u=new Je(n,s,a,i);return u.successCodes=[200,204],u.errorHandler=aa(t),u}function f_(r,t){return r&&r.contentType||t&&t.type()||"application/octet-stream"}function td(r,t,e){const n=Object.assign({},e);return n.fullPath=r.path,n.size=t.size(),n.contentType||(n.contentType=f_(null,t)),n}function ed(r,t,e,n,s){const i=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function u(){let M="";for(let z=0;z<2;z++)M=M+Math.random().toString().slice(2);return M}const l=u();a["Content-Type"]="multipart/related; boundary="+l;const d=td(t,n,s),f=Zh(d,e),p="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+l+`\r
Content-Type: `+d.contentType+`\r
\r
`,T=`\r
--`+l+"--",P=te.getBlob(p,n,T);if(P===null)throw zh();const C={name:d.fullPath},D=xn(i,r.host,r._protocol),V="POST",j=r.maxUploadRetryTime,q=new Je(D,V,oa(r,e),j);return q.urlParams=C,q.headers=a,q.body=P.uploadData(),q.errorHandler=Or(t),q}class Ns{constructor(t,e,n,s){this.current=t,this.total=e,this.finalized=!!n,this.metadata=s||null}}function ua(r,t){let e=null;try{e=r.getResponseHeader("X-Goog-Upload-Status")}catch{re(!1)}return re(!!e&&(t||["active"]).indexOf(e)!==-1),e}function m_(r,t,e,n,s){const i=t.bucketOnlyServerUrl(),a=td(t,n,s),u={name:a.fullPath},l=xn(i,r.host,r._protocol),d="POST",f={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${n.size()}`,"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},p=Zh(a,e),T=r.maxUploadRetryTime;function P(D){ua(D);let V;try{V=D.getResponseHeader("X-Goog-Upload-URL")}catch{re(!1)}return re(oi(V)),V}const C=new Je(l,d,P,T);return C.urlParams=u,C.headers=f,C.body=p,C.errorHandler=Or(t),C}function p_(r,t,e,n){const s={"X-Goog-Upload-Command":"query"};function i(d){const f=ua(d,["active","final"]);let p=null;try{p=d.getResponseHeader("X-Goog-Upload-Size-Received")}catch{re(!1)}p||re(!1);const T=Number(p);return re(!isNaN(T)),new Ns(T,n.size(),f==="final")}const a="POST",u=r.maxUploadRetryTime,l=new Je(e,a,i,u);return l.headers=s,l.errorHandler=Or(t),l}const wl=256*1024;function g_(r,t,e,n,s,i,a,u){const l=new Ns(0,0);if(a?(l.current=a.current,l.total=a.total):(l.current=0,l.total=n.size()),n.size()!==l.total)throw xg();const d=l.total-l.current;let f=d;s>0&&(f=Math.min(f,s));const p=l.current,T=p+f;let P="";f===0?P="finalize":d===f?P="upload, finalize":P="upload";const C={"X-Goog-Upload-Command":P,"X-Goog-Upload-Offset":`${l.current}`},D=n.slice(p,T);if(D===null)throw zh();function V(z,H){const G=ua(z,["active","final"]),I=l.current+f,g=n.size();let y;return G==="final"?y=oa(t,i)(z,H):y=null,new Ns(I,g,G==="final",y)}const j="POST",q=t.maxUploadRetryTime,M=new Je(e,j,V,q);return M.headers=C,M.body=D.uploadData(),M.progressCallback=u||null,M.errorHandler=Or(r),M}const kt={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function Ui(r){switch(r){case"running":case"pausing":case"canceling":return kt.RUNNING;case"paused":return kt.PAUSED;case"success":return kt.SUCCESS;case"canceled":return kt.CANCELED;case"error":return kt.ERROR;default:return kt.ERROR}}/**
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
 */class __{constructor(t,e,n){if(Ug(t)||e!=null||n!=null)this.next=t,this.error=e??void 0,this.complete=n??void 0;else{const i=t;this.next=i.next,this.error=i.error,this.complete=i.complete}}}/**
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
 */function an(r){return(...t)=>{Promise.resolve().then(()=>r(...t))}}class y_{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Me.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Me.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Me.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,e,n,s){if(this.sent_)throw tr("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(e,t,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return n!==void 0?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw tr("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw tr("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw tr("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw tr("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class T_ extends y_{initXhr(){this.xhr_.responseType="text"}}function fe(){return new T_}/**
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
 */class I_{constructor(t,e,n=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=t,this._blob=e,this._metadata=n,this._mappings=ia(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=s=>{if(this._request=void 0,this._chunkMultiplier=1,s._codeEquals(rt.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const i=this.isExponentialBackoffExpired();if($h(s.status,[]))if(i)s=qh();else{this.sleepTime=Math.max(this.sleepTime*2,wg),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=s,this._transition("error")}},this._metadataErrorHandler=s=>{this._request=void 0,s._codeEquals(rt.CANCELED)?this.completeTransitions_():(this._error=s,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((s,i)=>{this._resolve=s,this._reject=i,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){const t=this._transferred;return e=>this._updateProgress(t+e)}_shouldDoResumable(t){return t.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(t){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([e,n])=>{switch(this._state){case"running":t(e,n);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((t,e)=>{const n=m_(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(n,fe,t,e);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._uploadUrl=i,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const t=this._uploadUrl;this._resolveToken((e,n)=>{const s=p_(this._ref.storage,this._ref._location,t,this._blob),i=this._ref.storage._makeRequest(s,fe,e,n);this._request=i,i.getPromise().then(a=>{a=a,this._request=void 0,this._updateProgress(a.current),this._needToFetchStatus=!1,a.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const t=wl*this._chunkMultiplier,e=new Ns(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken((s,i)=>{let a;try{a=g_(this._ref._location,this._ref.storage,n,this._blob,t,this._mappings,e,this._makeProgressCallback())}catch(l){this._error=l,this._transition("error");return}const u=this._ref.storage._makeRequest(a,fe,s,i,!1);this._request=u,u.getPromise().then(l=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(l.current),l.finalized?(this._metadata=l.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){wl*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((t,e)=>{const n=c_(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(n,fe,t,e);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((t,e)=>{const n=ed(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(n,fe,t,e);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(t){const e=this._transferred;this._transferred=t,this._transferred!==e&&this._notifyObservers()}_transition(t){if(this._state!==t)switch(t){case"canceling":case"pausing":this._state=t,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const e=this._state==="paused";this._state=t,e&&(this._notifyObservers(),this._start());break;case"paused":this._state=t,this._notifyObservers();break;case"canceled":this._error=jh(),this._state=t,this._notifyObservers();break;case"error":this._state=t,this._notifyObservers();break;case"success":this._state=t,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const t=Ui(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:t,metadata:this._metadata,task:this,ref:this._ref}}on(t,e,n,s){const i=new __(e||void 0,n||void 0,s||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(t,e){return this._promise.then(t,e)}catch(t){return this.then(null,t)}_addObserver(t){this._observers.push(t),this._notifyObserver(t)}_removeObserver(t){const e=this._observers.indexOf(t);e!==-1&&this._observers.splice(e,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(e=>{this._notifyObserver(e)})}_finishPromise(){if(this._resolve!==void 0){let t=!0;switch(Ui(this._state)){case kt.SUCCESS:an(this._resolve.bind(null,this.snapshot))();break;case kt.CANCELED:case kt.ERROR:const e=this._reject;an(e.bind(null,this._error))();break;default:t=!1;break}t&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(t){switch(Ui(this._state)){case kt.RUNNING:case kt.PAUSED:t.next&&an(t.next.bind(t,this.snapshot))();break;case kt.SUCCESS:t.complete&&an(t.complete.bind(t))();break;case kt.CANCELED:case kt.ERROR:t.error&&an(t.error.bind(t,this._error))();break;default:t.error&&an(t.error.bind(t,this._error))()}}resume(){const t=this._state==="paused"||this._state==="pausing";return t&&this._transition("running"),t}pause(){const t=this._state==="running";return t&&this._transition("pausing"),t}cancel(){const t=this._state==="running"||this._state==="pausing";return t&&this._transition("canceling"),t}}/**
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
 */class $e{constructor(t,e){this._service=t,e instanceof Ut?this._location=e:this._location=Ut.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new $e(t,e)}get root(){const t=new Ut(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Jh(this._location.path)}get storage(){return this._service}get parent(){const t=n_(this._location.path);if(t===null)return null;const e=new Ut(this._location.bucket,t);return new $e(this._service,e)}_throwIfRoot(t){if(this._location.path==="")throw Ng(t)}}function E_(r,t,e){r._throwIfRoot("uploadBytes");const n=ed(r.storage,r._location,ia(),new te(t,!0),e);return r.storage.makeRequestWithTokens(n,fe).then(s=>({metadata:s,ref:r}))}function w_(r,t,e){return r._throwIfRoot("uploadBytesResumable"),new I_(r,new te(t),e)}function v_(r){r._throwIfRoot("getDownloadURL");const t=h_(r.storage,r._location,ia());return r.storage.makeRequestWithTokens(t,fe).then(e=>{if(e===null)throw Dg();return e})}function A_(r){r._throwIfRoot("deleteObject");const t=d_(r.storage,r._location);return r.storage.makeRequestWithTokens(t,fe)}function R_(r,t){const e=r_(r._location.path,t),n=new Ut(r._location.bucket,e);return new $e(r.storage,n)}/**
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
 */function P_(r){return/^[A-Za-z]+:\/\//.test(r)}function b_(r,t){return new $e(r,t)}function nd(r,t){if(r instanceof la){const e=r;if(e._bucket==null)throw Cg();const n=new $e(e,e._bucket);return t!=null?nd(n,t):n}else return t!==void 0?R_(r,t):r}function S_(r,t){if(t&&P_(t)){if(r instanceof la)return b_(r,t);throw uo("To use ref(service, url), the first argument must be a Storage instance.")}else return nd(r,t)}function vl(r,t){const e=t?.[Bh];return e==null?null:Ut.makeFromBucketSpec(e,r)}function V_(r,t,e,n={}){r.host=`${t}:${e}`,r._protocol="http";const{mockUserToken:s}=n;s&&(r._overrideAuthToken=typeof s=="string"?s:zd(s,r.app.options.projectId))}class la{constructor(t,e,n,s,i){this.app=t,this._authProvider=e,this._appCheckProvider=n,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=Uh,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Ig,this._maxUploadRetryTime=Eg,this._requests=new Set,s!=null?this._bucket=Ut.makeFromBucketSpec(s,this._host):this._bucket=vl(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=Ut.makeFromBucketSpec(this._url,t):this._bucket=vl(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){El("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){El("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(e!==null)return e.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new $e(this,t)}_makeRequest(t,e,n,s,i=!0){if(this._deleted)return new Og(Kh());{const a=$g(t,this._appId,n,s,e,this._firebaseVersion,i);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(t,e){const[n,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,n,s).getPromise()}}const Al="@firebase/storage",Rl="0.13.2";/**
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
 */const rd="storage";function L_(r,t,e){return r=Pt(r),E_(r,t,e)}function U_(r,t,e){return r=Pt(r),w_(r,t,e)}function B_(r){return r=Pt(r),v_(r)}function q_(r){return r=Pt(r),A_(r)}function j_(r,t){return r=Pt(r),S_(r,t)}function z_(r=qd(),t){r=Pt(r);const n=Vl(r,rd).getImmediate({identifier:t}),s=jd("storage");return s&&C_(n,...s),n}function C_(r,t,e,n={}){V_(r,t,e,n)}function x_(r,{instanceIdentifier:t}){const e=r.getProvider("app").getImmediate(),n=r.getProvider("auth-internal"),s=r.getProvider("app-check-internal");return new la(e,n,s,t,xl)}function D_(){Pl(new bl(rd,x_,"PUBLIC").setMultipleInstances(!0)),_s(Al,Rl,""),_s(Al,Rl,"esm2017")}D_();export{F_ as A,ot as T,pg as a,eg as b,jp as c,ug as d,Ah as e,lg as f,z_ as g,sg as h,zp as i,og as j,ig as k,yg as l,Tg as m,gg as n,cg as o,dg as p,Zp as q,ng as r,_g as s,j_ as t,ag as u,L_ as v,tg as w,B_ as x,q_ as y,U_ as z};
