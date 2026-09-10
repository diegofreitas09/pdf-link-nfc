(()=>{
if(window.__auroraBrandingV15)return;window.__auroraBrandingV15=true;
const LOGO='./aurora-logo.png?v=15';
const WA='https://wa.me/5585984161882';
const style=document.createElement('style');style.textContent=`
.aurora15-logo{display:block;object-fit:contain}.mark{width:128px!important;height:90px!important;border-radius:18px!important;background:#fff!important;padding:6px!important}.mark .aurora15-logo{width:100%;height:100%}.brand{padding-top:2px!important}.brand .aurora15-logo{width:132px;height:76px;margin:0 0 8px 0;filter:drop-shadow(0 5px 14px #0003)}.aurora15-top{width:138px;height:76px;object-fit:contain;margin:0 0 10px 0;display:block}.dev-credit{margin-top:24px;padding:13px 12px;border-top:1px solid #ffffff22;color:#9eb2c5;font-size:10px;line-height:1.45}.dev-credit span{display:block;color:#7890a6;font-size:9px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px}.dev-credit a{color:#fff;text-decoration:none;font-weight:800}.dev-credit a:hover{text-decoration:underline}.main-dev-credit{margin:30px 0 4px;padding:15px 0 2px;border-top:1px solid var(--l);font-size:10px;color:var(--m);text-align:center}.main-dev-credit a{color:var(--t);font-weight:800;text-decoration:none}.main-dev-credit a:hover{text-decoration:underline}
@media(max-width:900px){.brand .aurora15-logo{width:100px;height:58px}.dev-credit{display:none}.aurora15-top{width:110px;height:60px}}
@media print{.main-dev-credit{display:block!important;border-top:1px solid #bbb!important;color:#555!important;margin-top:14px!important}.main-dev-credit a{color:#111!important}}
`;document.head.appendChild(style);
function applyBrand(){
 const mark=document.querySelector('.mark');if(mark)mark.innerHTML=`<img class="aurora15-logo" src="${LOGO}" alt="Aurora">`;
 const brand=document.querySelector('.brand');if(brand){
   let old=brand.querySelector('.aurora-brand-logo');if(old)old.remove();
   if(!brand.querySelector('.aurora15-logo'))brand.insertAdjacentHTML('afterbegin',`<img class="aurora15-logo" src="${LOGO}" alt="Aurora">`);
   if(!document.querySelector('.dev-credit'))brand.parentElement.insertAdjacentHTML('beforeend',`<div class="dev-credit"><span>Desenvolvido por</span><a href="${WA}" target="_blank" rel="noopener">PDF Solução Educacional</a><br>• (85) 98416-1882</div>`);
 }
 const top=document.querySelector('.top>div:first-child');if(top){
   let old=top.querySelector('.aurora-top-logo');if(old)old.remove();
   if(!top.querySelector('.aurora15-top'))top.insertAdjacentHTML('afterbegin',`<img class="aurora15-top" src="${LOGO}" alt="Aurora">`);
 }
 const main=document.querySelector('.main');if(main&&!main.querySelector('.main-dev-credit'))main.insertAdjacentHTML('beforeend',`<footer class="main-dev-credit">Desenvolvido por <a href="${WA}" target="_blank" rel="noopener">PDF Solução Educacional</a> • (85) 98416-1882</footer>`);
}
applyBrand();
new MutationObserver(()=>applyBrand()).observe(document.body,{childList:true,subtree:true});
const previousOpen=window.open.bind(window);window.open=function(url,...args){
 const w=previousOpen(url,...args);if(w&&(!url||url==='about:blank')){try{
   const previousWrite=w.document.write.bind(w.document);
   w.document.write=(html)=>{let h=String(html);const css=`<style>.aurora15-print-foot{margin-top:16px;padding-top:8px;border-top:1px solid #bbb;text-align:center;font:9px Arial,sans-serif;color:#555}.aurora15-print-foot a{color:#111;text-decoration:none}</style>`;if(h.includes('</head>'))h=h.replace('</head>',css+'</head>');const foot=`<div class="aurora15-print-foot">Desenvolvido por <a href="${WA}"><b>PDF Solução Educacional</b></a> • (85) 98416-1882</div>`;if(h.includes('</body>'))h=h.replace('</body>',foot+'</body>');else h+=foot;return previousWrite(h)};
 }catch{} }
 return w;
};
})();