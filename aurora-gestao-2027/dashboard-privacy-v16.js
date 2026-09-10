(()=>{
if(window.__auroraPrivacyV16)return;window.__auroraPrivacyV16=true;
const css=document.createElement('style');css.textContent=`
#privacyRevenue{display:none!important}.dash-head>#dashPrivacy{display:none!important}
.metric.teal{position:relative}.metric-revenue-toggle{position:absolute;top:12px;right:12px;border:1px solid #d7e1eb;background:#fff;color:#0b1f36;border-radius:9px;padding:6px 9px;font-size:10px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:5px}.metric-revenue-toggle:hover{background:#f8fafc}.metric.teal small{padding-right:110px}
@media(max-width:560px){.metric-revenue-toggle{position:static;margin-top:8px}.metric.teal small{padding-right:0}}
`;document.head.appendChild(css);
function localize(){
  const top=document.querySelector('#privacyRevenue');if(top)top.remove();
  const dash=document.querySelector('#dash');if(!dash)return;
  const source=dash.querySelector('#dashPrivacy');
  const cards=[...dash.querySelectorAll('.metric')];
  const revenue=cards.find(c=>(c.querySelector('small')?.textContent||'').includes('Receita registrada 2026'));
  if(!source||!revenue)return;
  source.classList.add('metric-revenue-toggle');
  source.id='revenueCardToggle';
  const hidden=source.textContent.includes('Mostrar');
  source.textContent=hidden?'👁 Mostrar receita':'🙈 Ocultar receita';
  revenue.appendChild(source);
}
const obs=new MutationObserver(()=>localize());
obs.observe(document.body,{childList:true,subtree:true});
setTimeout(localize,100);
})();