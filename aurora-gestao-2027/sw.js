const CACHE='aurora-shell-v23';
const SHELL=['./','./manifest.webmanifest','./aurora-logo.webp?v=23'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).catch(()=>null));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  const url=new URL(req.url);
  if(req.method!=='GET') return;
  if(url.origin!==location.origin) return;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put('./',copy)).catch(()=>{});
      return res;
    }).catch(()=>caches.match('./')));
    return;
  }
  if(/\.(?:js|css|webp|png|svg|webmanifest)$/i.test(url.pathname)){
    event.respondWith(fetch(req).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});
      return res;
    }).catch(()=>caches.match(req)));
  }
});