(()=>{
if(window.__auroraBrandingV20)return;window.__auroraBrandingV20=true;
const LOGO='./aurora-logo.webp?v=20';
const LOGO_FALLBACK='./aurora-logo.webp?v=20';
const WA='https://wa.me/5585984161882';
const style=document.createElement('style');style.textContent=`
.aurora20-logo{display:block;object-fit:contain}.mark{width:150px!important;height:105px!important;border-radius:18px!important;background:#fff!important;padding:6px!important}.mark .aurora20-logo{width:100%;height:100%}.brand{padding-top:2px!important}.brand .aurora20-logo{width:145px;height:82px;margin:0 0 8px 0;filter:drop-shadow(0 5px 14px #0003)}.aurora20-top{width:145px;height:80px;object-fit:contain;margin:0 0 10px 0;display:block}.dev-credit{margin-top:24px;padding:13px 12px;border-top:1px solid #ffffff22;color:#9eb2c5;font-size:10px;line-height:1.45}.dev-credit span{display:block;color:#7890a6;font-size:9px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px}.dev-credit a{color:#fff;text-decoration:none;font-weight:800}.main-dev-credit{margin:30px 0 4px;padding:15px 0 2px;border-top:1px solid var(--l);font-size:10px;color:var(--m);text-align:center}.main-dev-credit a{color:var(--t);font-weight:800;text-decoration:none}@media(max-width:900px){.brand .aurora20-logo{width:110px;height:62px}.dev-credit{display:none}.aurora20-top{width:115px;height:64px}}@media print{.main-dev-credit{display:block!important;border-top:1px solid #bbb!important;color:#555!important}.main-dev-credit a{color:#111!important}}`;
document.head.appendChild(style);
function safeLogo(img){if(!img)return;img.classList.add('aurora20-logo');img.src=LOGO;img.onerror=()=>{img.onerror=null;img.src=LOGO_FALLBACK}}
function applyBrand(){
 const mark=document.querySelector('.mark');if(mark){let img=mark.querySelector('img');if(!img){img=document.createElement('img');img.alt='Aurora';mark.replaceChildren(img)}safeLogo(img)}
 const brand=document.querySelector('.brand');if(brand){let imgs=[...brand.querySelectorAll('img[alt="Aurora"]')];let img=imgs[0];imgs.slice(1).forEach(x=>x.remove());if(!img){img=document.createElement('img');img.alt='Aurora';brand.insertAdjacentElement('afterbegin',img)}safeLogo(img);const side=brand.parentElement;if(side&&!side.querySelector('.dev-credit'))side.insertAdjacentHTML('beforeend',`<div class="dev-credit"><span>Desenvolvido por</span><a href="${WA}" target="_blank" rel="noopener">PDF Solução Educacional</a><br>• (85) 98416-1882</div>`)}
 const top=document.querySelector('.top>div:first-child');if(top){let img=top.querySelector('img[alt="Aurora"]');if(!img){img=document.createElement('img');img.alt='Aurora';top.insertAdjacentElement('afterbegin',img)}img.classList.add('aurora20-top');safeLogo(img)}
 const main=document.querySelector('.main');if(main&&!main.querySelector('.main-dev-credit'))main.insertAdjacentHTML('beforeend',`<footer class="main-dev-credit">Desenvolvido por <a href="${WA}" target="_blank" rel="noopener">PDF Solução Educacional</a> • (85) 98416-1882</footer>`)
}
applyBrand();setTimeout(applyBrand,250);setTimeout(applyBrand,900);
})();