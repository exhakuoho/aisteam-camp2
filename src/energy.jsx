/* global React */
// Day 2 能源探索：氫與電

const { useState: useSE } = React;

const EXPERIMENTS = [
{ n: '01', name: '鉛筆電解實驗', en: 'PENCIL ELECTROLYSIS', task: '以筆芯作為電極，放入模擬海水電解槽，接上電池後觀察兩端氣泡的產生。', focus: '認識水被電解成氫氣與氧氣', color: '#2154F0', icon: 'pencil' },
{ n: '02', name: '霍夫曼電解實驗', en: 'HOFMANN VOLTAMETER', task: '使用霍夫曼電解裝置分解水，觀察氫氣與氧氣的產生與收集方式。', focus: '理解氣體收集與氫氧比例', color: '#00A8CC', icon: 'hofmann' },
{ n: '03', name: '燃料電池示範', en: 'FUEL CELL DEMO', task: '把氫氣導入燃料電池，讓氫氣與氧氣重新結合，產生電力與水。', focus: '理解能源轉換循環', color: '#2E9B5E', icon: 'fuelcell' },
{ n: '04', name: 'SDGs 永續討論', en: 'SUSTAINABILITY', task: '討論海水製氫、綠能、未來城市能源與氣候行動，連結永續發展目標。', focus: '建立永續能源與未來科技觀', color: '#FF8B3D', icon: 'sdg' }];


const H2_TYPES = [
{ name: '灰氫', en: 'GREY', color: '#9AA0A6', desc: '以天然氣重組製造，過程排放二氧化碳，是目前最常見的氫氣來源。' },
{ name: '棕氫', en: 'BROWN', color: '#8B5E3C', desc: '以煤炭氣化製造，碳排放最高，逐漸被更潔淨的方式取代。' },
{ name: '藍氫', en: 'BLUE', color: '#4A90D9', desc: '同樣來自化石燃料，但搭配碳捕捉封存技術，降低排放。' },
{ name: '綠氫', en: 'GREEN', color: '#3BB273', desc: '使用再生能源電解水製成，幾乎零碳排放，是未來能源的主角。' }];


const SDGS = [
{ n: 'SDG 7', t: '潔淨能源', c: '#FCC30B' },
{ n: 'SDG 9', t: '產業創新', c: '#FD6925' },
{ n: 'SDG 11', t: '永續城市', c: '#FD9D24' },
{ n: 'SDG 13', t: '氣候行動', c: '#3F7E44' }];


function ExpIcon({ kind }) {
  const ink = 'var(--ink)';
  switch (kind) {
    case 'pencil':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <rect x="11" y="4" width="6" height="14" fill="#FFD23F" stroke={ink} strokeWidth="1.6" />
          <polygon points="11,18 17,18 14,24" fill="#F1E7C9" stroke={ink} strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="14" cy="24" r="1.4" fill={ink} />
          <circle cx="8" cy="10" r="1.5" fill="#fff" stroke={ink} strokeWidth="1" />
          <circle cx="21" cy="14" r="1.5" fill="#fff" stroke={ink} strokeWidth="1" />
        </svg>);

    case 'hofmann':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <rect x="6" y="4" width="4" height="18" fill="#BFE7FF" stroke={ink} strokeWidth="1.6" rx="2" />
          <rect x="18" y="4" width="4" height="18" fill="#FFC9DE" stroke={ink} strokeWidth="1.6" rx="2" />
          <path d="M 8 22 Q 14 27 20 22" fill="none" stroke={ink} strokeWidth="1.8" />
          <circle cx="8" cy="9" r="1.2" fill="#fff" stroke={ink} strokeWidth=".8" />
          <circle cx="20" cy="12" r="1.2" fill="#fff" stroke={ink} strokeWidth=".8" />
        </svg>);

    case 'fuelcell':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <rect x="5" y="9" width="18" height="12" fill="#fff" stroke={ink} strokeWidth="1.8" rx="2" />
          <path d="M 14 3 L 11 12 L 15 12 L 12 20" fill="none" stroke="#FFB100" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>);

    case 'sdg':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <circle cx="14" cy="14" r="10" fill="none" stroke={ink} strokeWidth="1.8" />
          <path d="M 14 6 Q 18 10 14 14 Q 10 18 14 22" fill="none" stroke="#2E9B5E" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="14" cy="14" r="2" fill={ink} />
        </svg>);

    default:return null;
  }
}

// ─── 電解示意圖：電池 → 電極 → H₂ / O₂ ────────────────
function ElectrolysisDiagram() {
  const ink = 'var(--ink)';
  const W = 760, H = 340;
  // bubbles
  const bubbles = (x, count, color) =>
  Array.from({ length: count }).map((_, i) =>
  <circle
    key={i}
    cx={x + (i % 3 - 1) * 9}
    cy={250 - i * 26}
    r={3.5 + (i % 3)}
    fill="#fff"
    stroke={color}
    strokeWidth="1.6"
    opacity={0.95 - i * 0.08} />

  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* 標題 */}
      <g fontFamily="JetBrains Mono" fontSize="10" fill={ink}>
        <text x="16" y="22">▲ SEAWATER ELECTROLYSIS</text>
        <text x={W - 16} y="22" textAnchor="end">海水電解 · 能源轉換示意</text>
      </g>

      {/* 電解槽 */}
      <path d={`M 180 90 L 180 290 L 580 290 L 580 90`} fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      {/* 水面 */}
      <rect x="183" y="130" width="394" height="157" fill="#D7EEFF" />
      <path d="M 183 130 Q 233 122 283 130 T 383 130 T 483 130 T 577 130" fill="none" stroke="#7EC4F5" strokeWidth="2.5" />
      <text x="380" y="278" textAnchor="middle" fontFamily="Noto Sans TC" fontSize="12" fontWeight="700" fill="#4A7FA5">模擬海水（電解液）</text>

      {/* 陰極（H₂） */}
      <rect x="264" y="110" width="14" height="150" fill="#3A3A45" stroke={ink} strokeWidth="2" rx="3" />
      {bubbles(271, 6, '#2154F0')}
      <g transform="translate(271, 74)">
        <circle r="24" fill="#BFE7FF" stroke={ink} strokeWidth="2.5" />
        <text y="6" textAnchor="middle" fontFamily="Archivo Black" fontSize="15" fill={ink}>H₂</text>
      </g>
      <text x="271" y="312" textAnchor="middle" fontFamily="Noto Sans TC" fontSize="12" fontWeight="800" fill={ink}>陰極 −（氫氣較多）</text>

      {/* 陽極（O₂） */}
      <rect x="482" y="110" width="14" height="150" fill="#3A3A45" stroke={ink} strokeWidth="2" rx="3" />
      {bubbles(489, 4, '#E84A5F')}
      <g transform="translate(489, 74)">
        <circle r="24" fill="#FFD9E3" stroke={ink} strokeWidth="2.5" />
        <text y="6" textAnchor="middle" fontFamily="Archivo Black" fontSize="15" fill={ink}>O₂</text>
      </g>
      <text x="489" y="312" textAnchor="middle" fontFamily="Noto Sans TC" fontSize="12" fontWeight="800" fill={ink}>陽極 +（氧氣較少）</text>

      {/* 電池 */}
      <g transform="translate(640, 150)">
        <rect x="-2" y="0" width="56" height="96" fill="#FFD23F" stroke={ink} strokeWidth="2.5" rx="8" />
        <rect x="14" y="-10" width="24" height="12" fill={ink} rx="3" />
        <text x="26" y="42" textAnchor="middle" fontFamily="Archivo Black" fontSize="18" fill={ink}>9V</text>
        <text x="26" y="66" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill={ink}>BATTERY</text>
      </g>
      {/* 導線 */}
      <path d="M 271 110 L 271 48 L 640 48 L 640 150" fill="none" stroke={ink} strokeWidth="2.4" />
      <path d="M 489 110 L 489 40 L 694 40 L 694 160 L 696 160" fill="none" stroke="#C8323E" strokeWidth="2.4" />
      <circle cx="271" cy="48" r="3" fill={ink} />
      <circle cx="489" cy="40" r="3" fill="#C8323E" />

      {/* 電流方向 */}
      <g fontFamily="JetBrains Mono" fontSize="9" fill={ink}>
        <text x="455" y="34">e⁻ ▸▸▸</text>
        <text x="300" y="66">◂◂◂ e⁻</text>
      </g>
    </svg>);

}

function EnergyLab() {
  return (
    <section id="energy" style={{ background: 'var(--soft-4)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">DAY 2 主題日 · Energy Lab</span>
            <h2 style={{ marginTop: 14 }}>能源探索：<br /><span className="accent">氫與電。</span></h2>
          </div>
          <p>
            從「泡泡發電」理解能源轉換。認識氫能與電能、海水電解原理，
            親眼觀察 <strong>2 個電解實驗 + 1 個燃料電池示範</strong>，
            再把所學連結到綠色能源與永續發展。
          </p>
        </div>

        {/* Facts strip */}
        <div className="tour-facts">
          <div className="fact"><div className="k">EXPERIMENTS</div><div className="v lg">2<span className="u">實驗 + 1 示範</span></div></div>
          <div className="fact"><div className="k">OUTPUT</div><div className="v lg">H₂<span className="u">+ O₂</span></div></div>
          <div className="fact"><div className="k">SDGS</div><div className="v lg">4<span className="u">項永續目標</span></div></div>
          <div className="fact"><div className="k">SAFETY</div><div className="v">護目鏡必戴</div></div>
          <div className="fact"><div className="k">RECORD</div><div className="v">觀察學習單</div></div>
          <div className="fact"><div className="k">LEVEL</div><div className="v">零基礎可上手</div></div>
        </div>

        {/* Electrolysis diagram */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '20px 24px', borderBottom: '2px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em' }}>HOW IT WORKS · 原理示意</div>
              <div style={{ fontWeight: 800, fontSize: 18, marginTop: 4 }}>電流分解水分子 → 氫氣 H₂ 與氧氣 O₂</div>
            </div>
            <span className="chip"><span className="chip-dot"></span> 陰極氣泡比陽極多，猜猜為什麼？</span>
          </div>
          <div style={{ padding: 24, background: 'var(--paper)' }}>
            <ElectrolysisDiagram />
          </div>
        </div>

        {/* 4 experiment cards */}
        <div className="station-grid">
          {EXPERIMENTS.map((s) =>
          <div className="station-card" key={s.n} style={{ '--station-color': s.color }}>
              <div className="station-head">
                <div className="station-num">{s.n}</div>
                <div className="station-icon" style={{ background: s.color }}>
                  <ExpIcon kind={s.icon} />
                </div>
              </div>
              <div className="station-en">{s.en}</div>
              <h4>{s.name}</h4>
              <p>{s.task}</p>
              <div className="station-focus">
                <span className="mono">LEARN</span>
                <span>{s.focus}</span>
              </div>
            </div>
          )}
        </div>

        {/* 氫氣光譜 + SDGs */}
        <div className="practice-grid">
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 6 }}>
              <h3>氫氣不只一種顏色</h3>
              <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>H₂ SPECTRUM</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 18 }}>依照製造方式的碳排放高低，氫氣被分成不同「顏色」。課程會帶大家認識為什麼綠氫最重要。</p>
            {H2_TYPES.map((h) =>
            <div key={h.name} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 14, alignItems: 'center', padding: '11px 0', borderBottom: '1.5px dashed rgba(0,0,0,.12)' }}>
                <div style={{
                width: 52, height: 40, borderRadius: 10,
                background: h.color, border: '2px solid var(--ink)',
                display: 'grid', placeItems: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '.06em'
              }}>{h.en}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{h.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55 }}>{h.desc}</div>
                </div>
              </div>
            )}
          </div>

          <div className="card" style={{ background: 'var(--ink)', color: 'var(--bg)', padding: 28 }}>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', letterSpacing: '.1em' }}>SUSTAINABILITY · 永續連結</div>
            <h3 style={{ color: 'var(--primary)', marginTop: 6, fontSize: 22 }}>把實驗連上世界</h3>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.75)', marginTop: 10, lineHeight: 1.7 }}>
              下午的討論時間，我們會把桌上的氣泡連結到聯合國永續發展目標（SDGs）——
              為什麼各國都在投資氫能？未來的城市會怎麼用電？
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
              {SDGS.map((s) =>
              <div key={s.n} style={{
                padding: '14px 14px 12px',
                background: 'rgba(255,255,255,.05)',
                border: `2px solid ${s.c}`,
                borderRadius: 12
              }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: s.c }}>{s.n}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{s.t}</div>
                </div>
              )}
            </div>
            <div style={{ marginTop: 20, padding: 14, background: 'rgba(255,255,255,.06)', borderRadius: 10, fontSize: 13, lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--primary)' }}>安全提醒：</strong>
              實驗操作需配戴護目鏡；電池與導線由講師或助教確認後才可通電；
              燃料電池與氣體示範由講師操作，學生以觀察為主。
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.EnergyLab = EnergyLab;
