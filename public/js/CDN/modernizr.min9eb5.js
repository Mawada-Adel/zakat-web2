/*!
 * modernizr v3.6.0
 * Build https://modernizr.com/download?-setclasses-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera
 * MIT License
 */
(function(n,t){function h(n,t){return typeof n===t}function c(){var u,n,f,e,o,c,t;for(var l in r)if(r.hasOwnProperty(l)){if(u=[],n=r[l],n.name&&(u.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(f=0;f<n.options.aliases.length;f++)u.push(n.options.aliases[f].toLowerCase());for(e=h(n.fn,"function")?n.fn():n.fn,o=0;o<u.length;o++)c=u[o],t=c.split("."),t.length===1?i[t[0]]=e:(!i[t[0]]||i[t[0]]instanceof Boolean||(i[t[0]]=new Boolean(i[t[0]])),i[t[0]][t[1]]=e),s.push((e?"":"no-")+t.join("-"))}}function l(n){var t=u.className,r=i._config.classPrefix||"",f;o&&(t=t.baseVal);i._config.enableJSClass&&(f=new RegExp("(^|\\s)"+r+"no-js(\\s|$)"),t=t.replace(f,"$1"+r+"js$2"));i._config.enableClasses&&(t+=" "+r+n.join(" "+r),o?u.className.baseVal=t:u.className=t)}var s=[],r=[],e={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(n,t){var i=this;setTimeout(function(){t(i[n])},0)},addTest:function(n,t,i){r.push({name:n,fn:t,options:i})},addAsyncTest:function(n){r.push({name:null,fn:n})}},i=function(){},u,o,f;for(i.prototype=e,i=new i,u=t.documentElement,o=u.nodeName.toLowerCase()==="svg",c(),l(s),delete e.addTest,delete e.addAsyncTest,f=0;f<i._q.length;f++)i._q[f]();n.Modernizr=i})(window,document);