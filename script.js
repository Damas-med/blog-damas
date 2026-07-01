// ============================================
//  LIGAS ACADÊMICAS – DAMAS
//  Edite apenas as variáveis abaixo
// ============================================

const CONFIG = {
  SHEET_ID:   "17-VggoEmNFjiJY7uU4-x-ELNEoNNBO85b9ao2VWT8Ws",
  SHEET_NAME: "Ligas",
};

// Ícones em SVG (estilo outline). Troque o "d" do path se quiser outro desenho,
// ou adicione novas chaves para mais ícones.
const ICON_SVGS = {
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/><path d="M3.5 12h4l1.5-3 2 6 1.5-3h5.5"/></svg>`,
  brain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2a3.5 3.5 0 0 0-3.5 3.5v.6A3.5 3.5 0 0 0 4 9.4v1.2a3 3 0 0 0-1 2.4 3 3 0 0 0 2 2.8v.7A3.5 3.5 0 0 0 8.5 20h1"/><path d="M14.5 2a3.5 3.5 0 0 1 3.5 3.5v.6A3.5 3.5 0 0 1 20 9.4v1.2a3 3 0 0 1 1 2.4 3 3 0 0 1-2 2.8v.7A3.5 3.5 0 0 1 15.5 20h-1"/><path d="M12 4v16"/></svg>`,
  scalpel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21 14 10"/><path d="M14 10 21 3l-3 3-4 4-4 4-3-3z"/></svg>`,
  baby: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M9 8.5c.5.8 1.2 1.2 2 1.2s1.6-.4 2-1.2"/><path d="M6 21c0-4 2.5-6 6-6s6 2 6 6"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/><path d="M16 3.5a4 4 0 0 1 0 7.5"/><path d="M22 21v-2a5 5 0 0 0-3.5-4.8"/></svg>`,
  microscope: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0-7-7"/><path d="M9 6h6l2 4H7z"/><path d="M12 6V3"/></svg>`,
  droplet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z"/></svg>`,
  dna: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3c0 4 12 4 12 8s-12 4-12 8"/><path d="M18 3c0 4-12 4-12 8s12 4 12 8"/><path d="M7 6h10"/><path d="M7 18h10"/></svg>`,
  stethoscope: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3v6a5 5 0 0 0 10 0V3"/><path d="M9 15a5 5 0 0 0 10 0v-2"/><circle cx="19" cy="10" r="2"/></svg>`,
};

// Área médica (planilha, coluna E) → chave do ícone acima
const ICONES = {
  "clínicas médicas": "heart",
  "cirúrgicas": "scalpel",
  "pediatria": "baby",
  "saúde coletiva": "users",
  "diagnóstico e apoio": "microscope",
};
const ICONE_PADRAO = "stethoscope";

// Resolve o ícone da liga, nessa ordem de prioridade:
// 1) Coluna S (ÍCONE URL) da planilha, se for um link de imagem (http/https)
// 2) Coluna S, se for uma chave válida do ICON_SVGS (ex: "heart")
// 3) Coluna S, se for um emoji colado direto (ex: "🫀")
// 4) Ícone padrão da área médica (coluna E)
// 5) Ícone padrão geral (estetoscópio)
function resolverIcone(l){
  const escolha = (l.icone || "").trim();
  if(/^https?:\/\//i.test(escolha)){
    return { tipo: "img", conteudo: escolha };
  }
  if(escolha && ICON_SVGS[sl(escolha)]){
    return { tipo: "svg", conteudo: ICON_SVGS[sl(escolha)] };
  }
  if(escolha){
    return { tipo: "emoji", conteudo: escolha };
  }
  const porArea = ICONES[sl(l.area_medica)];
  return { tipo: "svg", conteudo: ICON_SVGS[porArea] || ICON_SVGS[ICONE_PADRAO] };
}

function sl(s){ return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); }

function statusClass(s){
  const v = sl(s);
  if(v.includes("aberto")) return "status-aberto";
  if(v.includes("breve"))  return "status-breve";
  return "status-encerrado";
}

let todas = [];
let filtroArea   = "";
let filtroBusca  = "";
let filtroStatus = "";
let mostrarTodas = false;
const LIMITE = 8;

const statusOpcoes = ["", "Aberto", "Em breve", "Encerrado"];
let statusIdx = 0;

// ── CARREGAR PLANILHA ──
async function carregarLigas(){
  try {
    const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(CONFIG.SHEET_NAME)}`;
    const res  = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/)[1]);
    // Mapeamento fixo por coluna (A→U), pois o cabeçalho da planilha
    // tem várias linhas decorativas que o Google concatena no label.
    const cols = [
      "sigla", "nome_completo", "descricao_curta", "descricao_longa",
      "area_medica", "subarea", "status_seletivo", "email", "instagram",
      "whatsapp", "link_edital", "dia_reuniao", "horario_reuniao",
      "qtd_membros", "presidente", "vice_presidente", "logo_url",
      "capa_url", "icone", "cor_card", "ativo"
    ];

    todas = (json.table.rows || [])
      .map(row => {
        const obj = {};
        cols.forEach((col, i) => {
          const cell = row.c[i];
          obj[col] = cell ? (cell.f || cell.v || "") : "";
        });
        return obj;
      })
      .filter(l => l.sigla && sl(l.ativo || "sim") !== "não" && sl(l.ativo || "sim") !== "nao")
      .sort((a, b) => a.sigla.localeCompare(b.sigla));

    renderizar();
  } catch(e) {
    document.getElementById("ligas-grid").innerHTML =
      `<div class="loading-wrap">⚠️ Não foi possível carregar as ligas.<br><small>Verifique o SHEET_ID e se a planilha está publicada.</small></div>`;
  }
}

// ── FILTRAR ──
function filtradas(){
  return todas.filter(l => {
    if(filtroArea   && sl(l.area_medica)     !== sl(filtroArea))   return false;
    if(filtroBusca  && !sl(l.sigla).includes(filtroBusca)
                    && !sl(l.nome_completo).includes(filtroBusca)
                    && !sl(l.subarea||"").includes(filtroBusca))    return false;
    if(filtroStatus && sl(l.status_seletivo) !== sl(filtroStatus)) return false;
    return true;
  });
}

// ── CARD ──
function card(l){
  const cor  = l.cor_card || "#1A3D2B";
  const icon = resolverIcone(l);
  const st   = statusClass(l.status_seletivo);
  const capa = l.capa_url ? `background-image:url('${l.capa_url}')` : `background:${cor}`;
  const siglaEsc = (l.sigla || "").replace(/'/g, "\\'");

  return `
  <div class="liga-card" onclick="abrirModal('${siglaEsc}')">
    <div class="card-capa">
      <div class="card-capa-bg" style="${capa}"></div>
      <div class="card-capa-overlay"></div>
      <div class="card-logo-wrap">
        ${l.logo_url
          ? `<img src="${l.logo_url}" style="width:42px;height:42px;border-radius:50%;object-fit:cover">`
          : icon.tipo === "img"
            ? `<img src="${icon.conteudo}" style="width:26px;height:26px;border-radius:50%;object-fit:cover">`
            : icon.tipo === "svg"
              ? `<div class="card-logo-icon">${icon.conteudo}</div>`
              : `<div class="card-logo-icon card-logo-emoji">${icon.conteudo}</div>`}
      </div>
      <svg class="card-capa-wave" viewBox="0 0 300 30" preserveAspectRatio="none">
        <path d="M0,14 C60,30 100,0 150,10 C200,20 240,2 300,16 L300,30 L0,30 Z" fill="var(--branco)"></path>
      </svg>
    </div>
    <div class="card-body">
      <div class="card-sigla">${l.sigla}</div>
      <div class="card-nome">${l.nome_completo}</div>
      <div class="card-desc">${l.descricao_curta}</div>
      <div class="card-meta">
        ${l.qtd_membros ? `<div class="card-meta-item">👤 ${l.qtd_membros} membros</div>` : ""}
        ${l.dia_reuniao && l.horario_reuniao ? `<div class="card-meta-item">🕐 ${l.dia_reuniao} • ${l.horario_reuniao}</div>` : ""}
      </div>
      ${l.status_seletivo ? `<div class="card-status ${st}">Processo seletivo ${l.status_seletivo.toLowerCase()}</div>` : ""}
      <button class="card-btn">Conhecer liga →</button>
    </div>
  </div>`;
}

// ── RENDERIZAR ──
function renderizar(){
  const f    = filtradas();
  const grid = document.getElementById("ligas-grid");
  const vw   = document.getElementById("ver-todas-wrap");

  if(!f.length){
    grid.innerHTML = `<div class="loading-wrap">Nenhuma liga encontrada.</div>`;
    vw.style.display = "none";
    return;
  }

  const exibir = mostrarTodas ? f : f.slice(0, LIMITE);
  grid.innerHTML = exibir.map(card).join("");
  vw.style.display = (!mostrarTodas && f.length > LIMITE) ? "" : "none";
}

// ── AÇÕES DE FILTRO ──
function filtrar(){
  filtroBusca  = document.getElementById("busca-input").value.toLowerCase();
  mostrarTodas = false;
  renderizar();
}

function filtrarArea(btn, area){
  filtroArea   = area;
  mostrarTodas = false;
  document.querySelectorAll(".area-pill").forEach(b => b.classList.remove("ativa"));
  btn.classList.add("ativa");
  renderizar();
}

function ciclarStatus(){
  statusIdx    = (statusIdx + 1) % statusOpcoes.length;
  filtroStatus = statusOpcoes[statusIdx];
  document.getElementById("label-status").textContent = filtroStatus || "Todos";
  const btn = document.getElementById("btn-filtros");
  btn.classList.toggle("ativo", !!filtroStatus);
  renderizar();
}

function verTodas(){
  mostrarTodas = true;
  renderizar();
}

// ── MODAL ──
function abrirModal(sigla){
  const l = todas.find(x => x.sigla === sigla);
  if(!l) return;

  const cor  = l.cor_card || "#1A3D2B";
  const icon = resolverIcone(l);
  const st   = statusClass(l.status_seletivo);
  const capa = l.capa_url ? `background-image:url('${l.capa_url}')` : `background:${cor}`;

  document.getElementById("modal-content").innerHTML = `
    <div class="modal-capa">
      <div class="modal-capa-bg" style="${capa}"></div>
      <div class="modal-capa-overlay"></div>
      <div class="modal-logo-wrap">
        ${l.logo_url
          ? `<img src="${l.logo_url}" style="width:52px;height:52px;border-radius:50%;object-fit:cover">`
          : icon.tipo === "img"
            ? `<img src="${icon.conteudo}" style="width:36px;height:36px;border-radius:50%;object-fit:cover">`
            : icon.tipo === "svg"
              ? `<div class="modal-logo-icon">${icon.conteudo}</div>`
              : `<div class="modal-logo-icon modal-logo-emoji">${icon.conteudo}</div>`}
      </div>
    </div>
    <div class="modal-body">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
        <div class="modal-sigla">${l.sigla}</div>
        ${l.status_seletivo ? `<span class="card-status ${st}" style="margin:0">${l.status_seletivo}</span>` : ""}
      </div>
      <div class="modal-nome">${l.nome_completo}</div>
      <div class="modal-desc">${l.descricao_longa || l.descricao_curta}</div>
      <div class="modal-grid">
        ${l.area_medica    ? `<div class="modal-info-item"><div class="modal-info-label">Área</div><div class="modal-info-value">${l.area_medica}${l.subarea ? " · " + l.subarea : ""}</div></div>` : ""}
        ${l.qtd_membros    ? `<div class="modal-info-item"><div class="modal-info-label">Membros</div><div class="modal-info-value">👤 ${l.qtd_membros}</div></div>` : ""}
        ${l.dia_reuniao    ? `<div class="modal-info-item"><div class="modal-info-label">Reuniões</div><div class="modal-info-value">🕐 ${l.dia_reuniao}${l.horario_reuniao ? " às " + l.horario_reuniao : ""}</div></div>` : ""}
        ${l.presidente     ? `<div class="modal-info-item"><div class="modal-info-label">Presidente</div><div class="modal-info-value">${l.presidente}</div></div>` : ""}
        ${l.vice_presidente? `<div class="modal-info-item"><div class="modal-info-label">Vice-Presidente</div><div class="modal-info-value">${l.vice_presidente}</div></div>` : ""}
        ${l.email          ? `<div class="modal-info-item"><div class="modal-info-label">E-mail</div><div class="modal-info-value">${l.email}</div></div>` : ""}
      </div>
      <div class="modal-acoes">
        ${l.link_edital
          ? `<a class="modal-btn-principal" href="${l.link_edital}" target="_blank">Participar do processo seletivo ↗</a>`
          : `<button class="modal-btn-principal" style="opacity:.5;cursor:default">Sem edital no momento</button>`}
        ${l.instagram ? `<a class="modal-btn-sec" href="https://instagram.com/${l.instagram.replace("@","")}" target="_blank">📸 ${l.instagram}</a>` : ""}
        ${l.whatsapp  ? `<a class="modal-btn-sec" href="https://wa.me/55${l.whatsapp}" target="_blank">💬 WhatsApp</a>` : ""}
      </div>
    </div>`;

  document.getElementById("modal-overlay").classList.add("open");
}

function fecharModal(){
  document.getElementById("modal-overlay").classList.remove("open");
}

document.addEventListener("keydown", e => { if(e.key === "Escape") fecharModal(); });

// ── INICIAR ──
carregarLigas();
