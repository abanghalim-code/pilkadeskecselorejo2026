
/* ==========================================================
   TAHAPAN PILKADES 2026 — INTEGRATED
   Data utama: window.TAHAPAN_DATA (embedded from data/tahapan.json)
   Fallback: data/tahapan.json when served via HTTP.
========================================================== */

const TAHAPAN_TODAY = new Date();

const TAHAP_ORDER = {
  "Pra Persiapan": 0,
  "Persiapan": 1,
  "Pencalonan": 2,
  "Pemungutan Suara": 3,
  "Penetapan": 4
};

const MONTHS_ID = {
  januari:0, februari:1, maret:2, april:3, mei:4, juni:5,
  juli:6, agustus:7, september:8, oktober:9, november:10, desember:11
};

function escapeHTML(value){
  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function makeDate(day,month,year){
  const m=MONTHS_ID[String(month).toLowerCase()];
  if(m === undefined) return null;
  return new Date(Number(year),m,Number(day));
}

function parseDateRange(tanggal){
  const text=String(tanggal ?? "").trim();
  let m;

  m=text.match(/^(\d{1,2})\s+([A-Za-z]+)\s*-\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/i);
  if(m) return {start:makeDate(m[1],m[2],m[5]),end:makeDate(m[3],m[4],m[5])};

  m=text.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})\s*-\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/i);
  if(m) return {start:makeDate(m[1],m[2],m[3]),end:makeDate(m[4],m[5],m[6])};

  m=text.match(/^(\d{1,2})\s*-\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/i);
  if(m) return {start:makeDate(m[1],m[3],m[4]),end:makeDate(m[2],m[3],m[4])};

  m=text.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/i);
  if(m){
    const d=makeDate(m[1],m[2],m[3]);
    return {start:d,end:d};
  }

  return null;
}

function dateOnly(d){
  return new Date(d.getFullYear(),d.getMonth(),d.getDate());
}

function getStatus(tanggal,today=TAHAPAN_TODAY){
  const range=parseDateRange(tanggal);
  if(!range || !range.start || !range.end) return "DATA_TANGGAL_TIDAK_TERBACA";
  const now=dateOnly(today), start=dateOnly(range.start), end=dateOnly(range.end);
  if(now < start) return "MENDATANG";
  if(now > end) return "SELESAI";
  return "BERLANGSUNG";
}

function statusLabel(status){
  return {
    SELESAI:"✓ SELESAI",
    BERLANGSUNG:"● BERLANGSUNG",
    MENDATANG:"○ MENDATANG",
    DATA_TANGGAL_TIDAK_TERBACA:"⚠ TANGGAL PERLU DICEK"
  }[status] || status;
}

function enrichItem(item){
  const range=parseDateRange(item.tanggal);
  return {...item,
    tanggal_mulai:range?.start ?? null,
    tanggal_selesai:range?.end ?? null,
    status:getStatus(item.tanggal)
  };
}

function getCurrentStage(items){
  const active=items
    .filter(item=>item.status==="BERLANGSUNG")
    .sort((a,b)=>(TAHAP_ORDER[b.tahap]??-1)-(TAHAP_ORDER[a.tahap]??-1));
  return active.length ? active[0].tahap : null;
}

function getActiveItems(items){
  return items.filter(item=>item.status==="BERLANGSUNG").sort((a,b)=>a.id-b.id);
}

function renderCurrentPanel(items){
  const stageEl=document.querySelector("[data-tahapan-current-stage]");
  const activityEl=document.querySelector("[data-tahapan-current-activity]");
  const statusEl=document.querySelector("[data-tahapan-current-status]");
  if(!stageEl || !activityEl || !statusEl) return;

  const stage=getCurrentStage(items);
  const activeItems=getActiveItems(items);
  const current=activeItems.filter(item=>item.tahap===stage);

  stageEl.textContent=stage || "BELUM ADA KEGIATAN BERLANGSUNG";

  if(!current.length){
    activityEl.textContent="Tidak ada kegiatan yang sedang berlangsung";
    statusEl.textContent="MENUNGGU";
    return;
  }

  activityEl.innerHTML=current.map(item=>`
    <span class="tahapan-active-item">
      <strong>No. ${String(item.id).padStart(2,"0")}</strong>
      — ${escapeHTML(item.kegiatan)}
    </span>
  `).join("");

  statusEl.textContent=current.length===1
    ? "1 KEGIATAN BERLANGSUNG"
    : `${current.length} KEGIATAN BERLANGSUNG`;
}

function renderStageProgress(items){
  const container=document.querySelector("[data-tahapan-progress]");
  if(!container) return;

  const stages=Object.keys(TAHAP_ORDER)
    .sort((a,b)=>TAHAP_ORDER[a]-TAHAP_ORDER[b]);

  const currentStage=getCurrentStage(items);
  const currentOrder=currentStage ? TAHAP_ORDER[currentStage] : -1;

  container.innerHTML=stages.map((stage,index)=>{
    const order=TAHAP_ORDER[stage];
    const state=order<currentOrder ? "is-complete" :
                 order===currentOrder ? "is-current" : "is-upcoming";
    const count=items.filter(item=>item.tahap===stage).length;
    return `
      ${index ? '<span class="tahapan-progress-line" aria-hidden="true"></span>' : ""}
      <div class="tahapan-progress-item ${state}">
        <span class="tahapan-progress-dot" aria-hidden="true"></span>
        <span>${escapeHTML(stage)}</span>
        <small>${count}</small>
      </div>`;
  }).join("");
}

function renderCard(item){
  let keterangan="";
  if(item.keterangan){
    if(typeof item.keterangan==="string"){
      keterangan=`<div class="timeline-detail"><strong>Keterangan</strong><p>${escapeHTML(item.keterangan)}</p></div>`;
    }else{
      const parts=[];
      if(item.keterangan.utama) parts.push(`<p><strong>Utama:</strong> ${escapeHTML(item.keterangan.utama)}</p>`);
      if(item.keterangan.tambahan) parts.push(`<p><strong>Tambahan:</strong> ${escapeHTML(item.keterangan.tambahan)}</p>`);
      if(Array.isArray(item.keterangan.susunan_panitia))
        parts.push(`<p><strong>Susunan:</strong> ${item.keterangan.susunan_panitia.map(escapeHTML).join("; ")}</p>`);
      if(Array.isArray(item.keterangan.seksi))
        parts.push(`<p><strong>Seksi:</strong> ${item.keterangan.seksi.map(escapeHTML).join("; ")}</p>`);
      if(parts.length) keterangan=`<div class="timeline-detail">${parts.join("")}</div>`;
    }
  }

  const activeClass=item.status==="BERLANGSUNG" ? " is-active" : "";

  return `
    <article class="timeline-card status-${item.status.toLowerCase()}${activeClass}">
      <div class="timeline-card-top">
        <span class="timeline-number">${String(item.id).padStart(2,"0")}</span>
        <span class="timeline-status">${statusLabel(item.status)}</span>
      </div>
      <h3>${escapeHTML(item.kegiatan)}</h3>
      <div class="timeline-meta">
        <span><strong>Waktu:</strong> ${escapeHTML(item.tanggal)}</span>
        <span><strong>Durasi:</strong> ${escapeHTML(item.jangka_waktu)}</span>
        <span><strong>Pelaksana:</strong> ${escapeHTML(item.pelaksana)}</span>
      </div>
      ${keterangan}
    </article>`;
}

function renderStages(items,container){
  const groups=new Map();
  items.forEach(item=>{
    if(!groups.has(item.tahap)) groups.set(item.tahap,[]);
    groups.get(item.tahap).push(item);
  });

  const ordered=[...groups.entries()].sort(
    (a,b)=>(TAHAP_ORDER[a[0]]??99)-(TAHAP_ORDER[b[0]]??99)
  );

  container.innerHTML=ordered.map(([stage,stageItems])=>`
    <section class="timeline-stage">
      <header class="timeline-stage-header">
        <span class="timeline-stage-title">${escapeHTML(stage)}</span>
        <span class="timeline-stage-count">${stageItems.length} kegiatan</span>
      </header>
      <div class="timeline-list">
        ${stageItems.map(renderCard).join("")}
      </div>
    </section>
  `).join("");
}

function renderTahapan(rawData){
  const container=document.querySelector("[data-tahapan-list]");
  if(!container) return;

  const items=rawData.map(enrichItem).sort((a,b)=>a.id-b.id);
  renderCurrentPanel(items);
  renderStageProgress(items);
  renderStages(items,container);
}

async function loadTahapan(){
  if(Array.isArray(window.TAHAPAN_DATA)){
    renderTahapan(window.TAHAPAN_DATA);
    return;
  }

  try{
    const response=await fetch("data/tahapan.json",{cache:"no-store"});
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    renderTahapan(await response.json());
  }catch(error){
    console.error("Gagal memuat Tahapan Pilkades:",error);
    const container=document.querySelector("[data-tahapan-list]");
    if(container) container.innerHTML='<div class="timeline-error">Data tahapan belum dapat dimuat.</div>';
  }
}

document.addEventListener("DOMContentLoaded",loadTahapan);
