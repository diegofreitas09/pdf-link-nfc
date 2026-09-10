(()=>{
if(window.__auroraRealtimeV21)return;window.__auroraRealtimeV21=true;
const SB_URL='https://oyuprxoqhhnpcnxgaokj.supabase.co';
const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYXNlIiwicmVmIjoib3l1cHJ4b3FoaG5wY254Z2Fva2oiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc4Nzk3Nzg1MywiZXhwIjoyMTAzNTUzODUzfQ.8D0XzJAM1I4bkHmcntbbg6U55FP3swTlqemDj4uNSzg';
const WORKER=SB_URL+'/functions/v1/aurora-sheet-worker';
let client=null,channel=null,lastSeq=null,lastCloud=null,pending=false,lastInputAt=0,refreshTimer=null,pollTimer=null,sheetsReady=false,started=false;
const appVisible=()=>{const a=document.querySelector('#app');return !!a&&getComputedStyle(a).display!=='none'};
const syncEl=()=>document.querySelector('#sync');
const dotEl=()=>document.querySelector('#dot');
function setStatus(text,mode='ok'){const s=syncEl(),d=dotEl();if(s)s.textContent=text;if(d){d.classList.remove('busy','bad');if(mode==='busy')d.classList.add('busy');if(mode==='bad')d.classList.add('bad')}}
function idleEnough(){return Date.now()-lastInputAt>1200}
function scheduleRefresh(){pending=true;clearTimeout(refreshTimer);refreshTimer=setTimeout(runRefresh,700)}
function runRefresh(){if(!pending||!appVisible())return;if(!idleEnough()){refreshTimer=setTimeout(runRefresh,700);return}pending=false;const b=document.querySelector('#refresh');if(b&&!b.disabled){b.click();setTimeout(()=>setStatus(sheetsReady?'Tempo real ativo · Google Sheets imediato':'Tempo real ativo · Google Sheets programado'),900)}}
async function worker(body){const r=await fetch(WORKER,{method:'POST',headers:{'content-type':'application/json','authorization':'Bearer '+SB_KEY,'apikey':SB_KEY},body:JSON.stringify(body),cache:'no-store'});let d={};try{d=await r.json()}catch{}return {ok:r.ok,status:r.status,data:d}}
async function checkSheets(){try{const h=await worker({health:true});sheetsReady=!!(h.ok&&h.data?.googleConfigured);setStatus(sheetsReady?'Tempo real ativo · Google Sheets imediato':'Tempo real ativo · Google Sheets programado');if(sheetsReady)await worker({limit:50})}catch{setStatus('Tempo real ativo · Google Sheets programado')}}
async function kickSheets(){if(!sheetsReady)return;try{await worker({limit:50})}catch{}}
function onSignal(row){const seq=Number(row?.event_seq??0),cv=Number(row?.cloud_version??0);const changed=(lastSeq!==null&&seq!==lastSeq)||(lastCloud!==null&&cv!==lastCloud);lastSeq=seq;lastCloud=cv;if(changed){kickSheets();scheduleRefresh()}}
async function restPoll(){try{const r=await fetch(SB_URL+'/rest/v1/aurora_realtime_signal?select=cloud_version,event_seq,updated_at,source&id=eq.main',{headers:{apikey:SB_KEY,authorization:'Bearer '+SB_KEY},cache:'no-store'});if(!r.ok)return;const a=await r.json();if(a?.[0])onSignal(a[0])}catch{}}
function startPoll(){if(pollTimer)return;restPoll();pollTimer=setInterval(restPoll,5000)}
function loadSdk(){return new Promise((resolve,reject)=>{if(window.supabase?.createClient)return resolve(window.supabase);const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/dist/umd/supabase.min.js';s.async=true;s.onload=()=>resolve(window.supabase);s.onerror=reject;document.head.appendChild(s)})}
async function startRealtime(){if(started)return;started=true;startPoll();try{const lib=await loadSdk();client=lib.createClient(SB_URL,SB_KEY,{auth:{persistSession:false,autoRefreshToken:false},realtime:{params:{eventsPerSecond:5}}});const initial=await client.from('aurora_realtime_signal').select('cloud_version,event_seq,updated_at,source').eq('id','main').maybeSingle();if(initial.data){lastSeq=Number(initial.data.event_seq??0);lastCloud=Number(initial.data.cloud_version??0)}channel=client.channel('aurora-gestao-v21').on('postgres_changes',{event:'UPDATE',schema:'public',table:'aurora_realtime_signal',filter:'id=eq.main'},p=>onSignal(p.new)).subscribe(status=>{if(status==='SUBSCRIBED'){setStatus(sheetsReady?'Tempo real ativo · Google Sheets imediato':'Tempo real ativo · Google Sheets programado');checkSheets()}else if(status==='CHANNEL_ERROR'||status==='TIMED_OUT'){setStatus('Reconectando tempo real…','busy')}})}catch{setStatus('Sincronização automática ativa (5 s)','busy');checkSheets()}}
window.addEventListener('input',()=>{lastInputAt=Date.now()},true);
window.addEventListener('change',()=>{lastInputAt=Date.now()},true);
window.addEventListener('visibilitychange',()=>{if(!document.hidden){restPoll();runRefresh()}});
window.addEventListener('online',()=>{restPoll();runRefresh()});
setInterval(()=>{if(appVisible())startRealtime()},600);
})();