(()=>{"use strict";const e=(e,t)=>t.some((t=>e instanceof t));let t,n;const r=new WeakMap,o=new WeakMap,s=new WeakMap;let a={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return r.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return u(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function c(e){a=e(a)}function i(o){return"function"==typeof o?(s=o,(n||(n=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(s)?function(...e){return s.apply(d(this),e),u(this.request)}:function(...e){return u(s.apply(d(this),e))}):(o instanceof IDBTransaction&&function(e){if(r.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)}));r.set(e,t)}(o),e(o,t||(t=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(o,a):o);var s}function u(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{t(u(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",s)}));return s.set(t,e),t}(e);if(o.has(e))return o.get(e);const t=i(e);return t!==e&&(o.set(e,t),s.set(t,e)),t}const d=e=>s.get(e),l=["get","getKey","getAll","getAllKeys","count"],p=["put","add","delete","clear"],f=new Map;function m(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(f.get(t))return f.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=p.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!l.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,o?"readwrite":"readonly");let a=s.store;return r&&(a=a.index(t.shift())),(await Promise.all([a[n](...t),o&&s.done]))[0]};return f.set(t,s),s}c((e=>({...e,get:(t,n,r)=>m(t,n)||e.get(t,n,r),has:(t,n)=>!!m(t,n)||e.has(t,n)})));const I=["continue","continuePrimaryKey","advance"],g={},h=new WeakMap,y=new WeakMap,b={get(e,t){if(!I.includes(t))return e[t];let n=g[t];return n||(n=g[t]=function(...e){h.set(this,y.get(this)[t](...e))}),n}};async function*D(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;const n=new Proxy(t,b);for(y.set(n,t),s.set(n,d(t));t;)yield n,t=await(h.get(n)||t.continue()),h.delete(n)}function v(t,n){return n===Symbol.asyncIterator&&e(t,[IDBIndex,IDBObjectStore,IDBCursor])||"iterate"===n&&e(t,[IDBIndex,IDBObjectStore])}c((e=>({...e,get:(t,n,r)=>v(t,n)?D:e.get(t,n,r),has:(t,n)=>v(t,n)||e.has(t,n)})));class w{constructor(){}static storeNames=["projects","schemas","current_project","user_data"];static async createStoreInDB(){try{return w.db=await function(e,t,{blocked:n,upgrade:r,blocking:o,terminated:s}={}){const a=indexedDB.open(e,t),c=u(a);return r&&a.addEventListener("upgradeneeded",(e=>{r(u(a.result),e.oldVersion,e.newVersion,u(a.transaction),e)})),n&&a.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),c.then((e=>{s&&e.addEventListener("close",(()=>s())),o&&e.addEventListener("versionchange",(e=>o(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),c}("quick-scrape",1,{upgrade(e){const t=e.objectStoreNames,n=w.storeNames.filter((e=>{if(0===t.length)return!0;for(const n of t)if(console.log(n),n===e)return!1;return!0}));for(let t of n)switch(t){case"current_project":e.createObjectStore(t);break;case"user_data":break;case"projects":e.createObjectStore(t,{keyPath:"id"}).createIndex("projectName","name",{unique:!0});break;case"schemas":e.createObjectStore(t,{keyPath:"id"}).createIndex("schemaName","name",{unique:!0});break;default:console.log(`Unknown store: ${t}`)}}}),"IndexedDB store update success"}catch(e){return console.log(typeof e),"Failure to update store"}}static async addToStore(e,t){const n=w.db.transaction(e,"readwrite");await n.store.add(t),await n.done}}const B=w;let E="popup";chrome.runtime.onMessage.addListener(((e,t,n)=>{"get_render_context"===e.action&&(n({renderContext:E}),E="popup")})),chrome.runtime.onMessage.addListener(((e,t)=>{"open_side_panel"===e.action&&(E="side_panel",chrome.tabs.query({active:!0,currentWindow:!0},(e=>{let[t]=e;const n=t.id;chrome.sidePanel.open({tabId:n})})))})),chrome.runtime.onInstalled.addListener((async()=>{const e=await B.createStoreInDB();console.log(e,"listener level")}))})();