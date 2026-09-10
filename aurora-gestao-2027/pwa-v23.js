(()=>{
if(window.__auroraPwaV23)return;window.__auroraPwaV23=true;
let deferredPrompt=null;
const q=s=>document.querySelector(s);
const isStandalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
const style=document.createElement('style');style.textContent=`
.pwa-install{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid #b7e5df;background:#eafaf7;color:#0f5f59;border-radius:10px;padding:10px 13px;font-weight:850;cursor:pointer;white-space:nowrap}.pwa-install:hover{background:#ddf7f2}.pwa-install[hidden]{display:none!important}.pwa-login{width:100%;margin-top:8px}.pwa-tip{font-size:10px;color:#68758a;line-height:1.35;margin-top:7px}.pwa-installed{background:#ecfdf5;color:#166534;border-color:#bbf7d0}@media(max-width:900px){.pwa-install{width:100%}}
`;document.head.appendChild(style);

function ensureButtons(){
 const loginBox=q('#login .box');
 if(loginBox&&!q('#pwaInstallLogin')){
   const b=document.createElement('button');b.type='button';b.id='pwaInstallLogin';b.className='pwa-install pwa-login';b.innerHTML='⬇ Instalar Aurora no computador';b.onclick=installApp;
   const tip=document.createElement('div');tip.id='pwaTipLogin';tip.className='pwa-tip';tip.textContent='Instale como software: abre em janela própria e continua conectado à nuvem em tempo real.';
   const small=loginBox.querySelector('small');loginBox.insertBefore(b,small);loginBox.insertBefore(tip,small);
 }
 const acts=q('.acts');
 if(acts&&!q('#pwaInstallTop')){
   const b=document.createElement('button');b.type='button';b.id='pwaInstallTop';b.className='pwa-install';b.innerHTML='⬇ Instalar aplicativo';b.onclick=installApp;acts.insertBefore(b,acts.firstChild);
 }
 refreshButtons();
}
function refreshButtons(){
 const installed=isStandalone();
 ['#pwaInstallLogin','#pwaInstallTop'].forEach(sel=>{const b=q(sel);if(!b)return;if(installed){b.hidden=false;b.disabled=true;b.classList.add('pwa-installed');b.innerHTML='✓ Aurora instalada'}else{b.disabled=false;b.classList.remove('pwa-installed');b.innerHTML=sel.includes('Login')?'⬇ Instalar Aurora no computador':'⬇ Instalar aplicativo';b.hidden=false;}});
 const tip=q('#pwaTipLogin');if(tip&&installed)tip.textContent='Aplicativo instalado. Você pode abrir a Aurora pelo desktop ou menu Iniciar.';
}
async function installApp(){
 if(isStandalone())return;
 if(deferredPrompt){
   deferredPrompt.prompt();
   const choice=await deferredPrompt.userChoice.catch(()=>null);
   deferredPrompt=null;
   if(choice?.outcome==='accepted')refreshButtons();
   return;
 }
 const ua=navigator.userAgent||'';
 let msg='O navegador ainda não liberou a instalação automática. No Chrome/Edge, use o ícone de instalar na barra de endereço ou Menu → Instalar Aurora Gestão Escolar.';
 if(/iPhone|iPad|iPod/i.test(ua))msg='No iPhone/iPad: toque em Compartilhar → Adicionar à Tela de Início.';
 else if(/Android/i.test(ua))msg='No Android: abra o menu do navegador → Instalar app ou Adicionar à tela inicial.';
 if(typeof toast==='function')toast(msg);else alert(msg);
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;ensureButtons();});
window.addEventListener('appinstalled',()=>{deferredPrompt=null;refreshButtons();if(typeof toast==='function')toast('✓ Aurora instalada como aplicativo');});
window.addEventListener('DOMContentLoaded',ensureButtons);
window.addEventListener('load',ensureButtons);
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v=23',{scope:'./'}).catch(err=>console.warn('Aurora SW:',err)));}
ensureButtons();
})();