(()=>{
if(window.__auroraCloseCleanV11)return;window.__auroraCloseCleanV11=true;
const FCAPI='https://oyuprxoqhhnpcnxgaokj.supabase.co/functions/v1/aurora-fechamento';
let rows11=null;
async function load11(){if(rows11)return rows11;let r=await fetch(FCAPI,{method:'POST',headers:{'content-type':'application/json','x-aurora-password':P},body:JSON.stringify({action:'list',ano:2027}),cache:'no-store'}),d=await r.json();if(!r.ok)throw new Error(d.error||'fechamento_read_failed');rows11=d.rows||[];return rows11}
async function filterMods11(){let t=document.querySelector('#raTurma'),m=document.querySelector('#raModalidade');if(!t||!m)return;let rows=await load11(),cur=m.value,mods=[...new Set(rows.filter(r=>r.turma===t.value&&r.ativo!==false).map(r=>r.modalidade))].sort((a,b)=>a.localeCompare(b,'pt-BR'));m.innerHTML='<option value="">Selecione a modalidade</option>'+mods.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');if(mods.includes(cur))m.value=cur;else m.value='';m.dispatchEvent(new Event('change'))}
const prev=R.register;R.register=()=>{prev();setTimeout(async()=>{let t=document.querySelector('#raTurma');if(!t)return;await filterMods11().catch(()=>{});t.addEventListener('change',()=>setTimeout(()=>filterMods11().catch(()=>{}),70));},320)};
})();