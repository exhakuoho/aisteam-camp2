/* global React */
// Day 3 自走車小小駕訓班

const { useState: useSD } = React;

const DRIVE_TASKS = [
{ n: '01', name: '起點出發', en: 'START LAUNCH', task: '車輛停在起點區，聽到開始指令後由駕駛員啟動車輛前進。', focus: '油門控制、方向感', color: '#00C896', icon: 'start' },
{ n: '02', name: '安全停等區', en: 'SAFETY STOP', task: '行經斑馬線或停等牌時，車輛需完全停下 2 秒以上再繼續前進。', focus: '煞車反應、安全概念', color: '#E84A5F', icon: 'stopsign' },
{ n: '03', name: '轉彎挑戰', en: 'TURN CHALLENGE', task: '依指示完成指定左轉或右轉，車身不可壓到邊界線。', focus: '轉向幅度、速度控制', color: '#FF8B3D', icon: 'turn' },
{ n: '04', name: '直線穩定行駛', en: 'STRAIGHT LINE', task: '沿著指定道路前進，盡量保持車身穩定、不蛇行。', focus: '方向微調、避免蛇行', color: '#2154F0', icon: 'straight' },
{ n: '05', name: '停車任務', en: 'PARKING TASK', task: '自選倒車入庫或路邊停車其中一項，將車輛停入指定停車格。', focus: '空間判斷、慢速操作', color: '#6B4BFF', icon: 'park' },
{ n: '06', name: '寶物運送', en: 'TREASURE RUN', task: '操作機械手臂夾取或推送物件，運送至指定放置區完成任務。', focus: '夾爪控制、團隊指揮', color: '#FFB100', icon: 'treasure' }];


const AWARDS = [
{ n: '01', name: '最佳 AI 程式探索獎', desc: 'Day 1 能理解 AI 概念、完成程式任務並說明邏輯。', c: '#2E9B5E' },
{ n: '02', name: '最佳能源探索獎', desc: 'Day 2 實驗觀察認真、問答積極、能理解氫能概念。', c: '#2154F0' },
{ n: '03', name: '最佳自走車操控獎', desc: 'Day 3 操作穩定、遵守駕訓規則並完成任務。', c: '#FF8B3D' },
{ n: '04', name: '最佳團隊合作獎', desc: '隊伍分工明確、互相協助、溝通順暢。', c: '#E84A5F' },
{ n: '05', name: '最佳策略規劃獎', desc: '能針對闖關任務安排路線、順序與分工。', c: '#6B4BFF' },
{ n: '06', name: '最佳臨場應變獎', desc: '遇到失誤或問題時能快速修正。', c: '#00A8CC' },
{ n: '07', name: '最佳學習精神獎', desc: '積極參與、勇於嘗試、不怕失敗。', c: '#FFB100' }];


function DriveIcon({ kind }) {
  const ink = 'var(--ink)';
  switch (kind) {
    case 'start':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <circle cx="14" cy="14" r="11" fill="none" stroke={ink} strokeWidth="1.8" />
          <polygon points="11,9 20,14 11,19" fill={ink} />
        </svg>);

    case 'stopsign':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <polygon points="9,4 19,4 24,9 24,19 19,24 9,24 4,19 4,9" fill="#E84A5F" stroke={ink} strokeWidth="1.8" strokeLinejoin="round" />
          <rect x="8" y="11.5" width="12" height="2.5" fill="#fff" />
          <rect x="8" y="15" width="12" height="2.5" fill="#fff" />
        </svg>);

    case 'turn':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <path d="M 6 22 L 6 12 Q 6 6, 14 6 L 20 6" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="22,6 18,2.5 18,9.5" fill={ink} />
        </svg>);

    case 'straight':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <line x1="14" y1="24" x2="14" y2="7" stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="4 3" />
          <polygon points="14,3 9,10 19,10" fill={ink} />
        </svg>);

    case 'park':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <rect x="4" y="4" width="20" height="20" rx="5" fill="none" stroke={ink} strokeWidth="2" />
          <text x="14" y="19.5" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill={ink}>P</text>
        </svg>);

    case 'treasure':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <rect x="4" y="13" width="20" height="11" rx="2" fill="#FFD23F" stroke={ink} strokeWidth="1.8" />
          <path d="M 4 13 Q 14 4 24 13" fill="none" stroke={ink} strokeWidth="1.8" />
          <circle cx="14" cy="13.5" r="2.1" fill={ink} />
        </svg>);

    default:return null;
  }
}

// ─── 駕訓場地示意圖：起點→停等→轉彎→直線→停車→寶物運送 ──
function DrivingCourse() {
  const ink = 'var(--ink)';
  const W = 760, H = 400;

  const Cone = ({ x, y }) =>
  <g transform={`translate(${x},${y})`}>
      <polygon points="0,-9 6,7 -6,7" fill="#FF8B3D" stroke={ink} strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="-8" y="7" width="16" height="2.5" fill={ink} rx="1" />
    </g>;

  const Badge = ({ x, y, num, color, label }) =>
  <g transform={`translate(${x},${y})`}>
      <rect x="-58" y="-13" width="116" height="26" fill="#fff" stroke={ink} strokeWidth="1.8" rx="13" />
      <circle cx="-44" cy="0" r="10" fill={color} stroke={ink} strokeWidth="1.8" />
      <text x="-44" y="3.5" textAnchor="middle" fontFamily="Archivo Black" fontSize="10" fill={ink}>{num}</text>
      <text x="10" y="4" textAnchor="middle" fontFamily="Noto Sans TC" fontSize="12" fontWeight="800" fill={ink}>{label}</text>
    </g>;

  const Arrow = ({ x, y, dir }) => {
    const rot = { right: 0, down: 90, left: 180, up: 270 }[dir];
    return (
      <g transform={`translate(${x},${y}) rotate(${rot})`} stroke={ink}>
        <polyline points="-6,-6 0,0 -6,6" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="0,-6 6,0 0,6" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>);

  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <g fontFamily="JetBrains Mono" fontSize="9" fill={ink}>
        <text x="14" y="20">▲ COURSE LAYOUT</text>
        <text x={W - 14} y="20" textAnchor="end">小小駕駛員任務挑戰賽 · 6 STATION COURSE</text>
      </g>

      {/* 場地外框 */}
      <rect x="24" y="36" width={W - 48} height={H - 72} fill="#FFFDF6" stroke={ink} strokeWidth="2.5" rx="14" />

      {/* 道路：一條回字形車道 */}
      <path d="M 90 110 L 620 110 Q 668 110 668 158 L 668 250 Q 668 298 620 298 L 170 298"
      fill="none" stroke="#E9E2CE" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 90 110 L 620 110 Q 668 110 668 158 L 668 250 Q 668 298 620 298 L 170 298"
      fill="none" stroke={ink} strokeWidth="2" strokeDasharray="8 8" strokeLinecap="round" />

      {/* 01 起點出發 */}
      <g transform="translate(90, 110)">
        <rect x="-34" y="-26" width="52" height="52" fill="#00C896" stroke={ink} strokeWidth="2" rx="8" opacity=".22" />
        <text y="4" textAnchor="middle" fontFamily="Archivo Black" fontSize="11" fill={ink}>START</text>
      </g>

      {/* 02 安全停等區（斑馬線 + 停止標誌） */}
      <g transform="translate(280, 110)">
        {[-18, -10, -2, 6, 14].map((dx) => <rect key={dx} x={dx} y="-22" width="5" height="44" fill="#fff" stroke={ink} strokeWidth="1" />)}
        <polygon points="0,-52 9,-46 9,-34 0,-28 -9,-34 -9,-46" fill="#E84A5F" stroke={ink} strokeWidth="1.6" transform="translate(0,-4)" />
        <text x="0" y="-42" textAnchor="middle" fontFamily="Archivo Black" fontSize="6.5" fill="#fff">STOP</text>
      </g>

      {/* 03 轉彎挑戰（角落邊界錐筒） */}
      <Cone x={614} y={98} />
      <Cone x={652} y={140} />

      {/* 04 直線穩定行駛（右側車道的車道中線） */}
      <line x1="668" y1="170" x2="668" y2="238" stroke={ink} strokeWidth="1.5" strokeDasharray="5 5" opacity=".5" />

      {/* 05 停車任務（停車格） */}
      <g transform="translate(560, 298)">
        <rect x="-28" y="-24" width="56" height="48" fill="none" stroke="#6B4BFF" strokeWidth="2.5" strokeDasharray="6 4" />
        <text x="0" y="6" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="#6B4BFF">P</text>
      </g>

      {/* 06 寶物運送（終點寶箱 + 機械手臂） */}
      <g transform="translate(170, 298)">
        <rect x="-32" y="-24" width="64" height="48" fill="#FFB100" stroke={ink} strokeWidth="2" rx="8" opacity=".2" />
        {/* 寶箱 */}
        <g transform="translate(-6,2)">
          <rect x="-13" y="0" width="26" height="14" rx="2" fill="#FFD23F" stroke={ink} strokeWidth="1.6" />
          <path d="M -13 0 Q 0 -9 13 0" fill="none" stroke={ink} strokeWidth="1.6" />
          <circle cx="0" cy="0.5" r="2" fill={ink} />
        </g>
        {/* 機械手臂 */}
        <path d="M 18 -18 L 26 -18 L 26 -4" fill="none" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="26" cy="-2" r="3" fill="none" stroke={ink} strokeWidth="1.8" />
      </g>

      {/* 小車 */}
      <g transform="translate(430, 298)">
        <rect x="-26" y="-15" width="52" height="30" fill="#2154F0" stroke={ink} strokeWidth="2" rx="7" />
        <rect x="-16" y="-8" width="14" height="12" fill="#fff" stroke={ink} strokeWidth="1.4" rx="3" />
        <circle cx="-15" cy="17" r="7" fill={ink} />
        <circle cx="15" cy="17" r="7" fill={ink} />
        <circle cx="-15" cy="17" r="3.5" fill="#fff" />
        <circle cx="15" cy="17" r="3.5" fill="#fff" />
      </g>

      {/* 路線方向 */}
      <g>
        <Arrow x={190} y={110} dir="right" />
        <Arrow x={430} y={110} dir="right" />
        <Arrow x={668} y={200} dir="down" />
        <Arrow x={500} y={298} dir="left" />
        <Arrow x={280} y={298} dir="left" />
      </g>

      {/* 六站標籤 */}
      <Badge x={90} y={155} num="01" color="#00C896" label="起點出發" />
      <Badge x={280} y={186} num="02" color="#E84A5F" label="停等 2 秒" />
      <Badge x={706} y={100} num="03" color="#FF8B3D" label="轉彎挑戰" />
      <Badge x={706} y={210} num="04" color="#2154F0" label="直線行駛" />
      <Badge x={560} y={352} num="05" color="#6B4BFF" label="停車任務" />
      <Badge x={170} y={352} num="06" color="#FFB100" label="寶物運送" />
    </svg>);

}

function DrivingSchool() {
  return (
    <section id="driving">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">DAY 3 壓軸 · 小小駕駛員任務挑戰賽</span>
            <h2 style={{ marginTop: 14 }}>自走車<br /><span className="accent">小小駕訓班。</span></h2>
          </div>
          <p>
            像考駕照一樣學開自走車！兩人一組、跨校混編，從起點出發、安全停等、轉彎、
            直線行駛、停車到<strong>寶物運送</strong>，每組限時 5 分鐘完成 6 站任務挑戰，
            練習優先、競賽其次，重點是每個人都有機會親手操作。
          </p>
        </div>

        {/* Facts strip */}
        <div className="tour-facts">
          <div className="fact"><div className="k">STATIONS</div><div className="v lg">6<span className="u">站任務</span></div></div>
          <div className="fact"><div className="k">TEAM</div><div className="v lg">2<span className="u">人一組</span></div></div>
          <div className="fact"><div className="k">TIME LIMIT</div><div className="v">5 分鐘 / 組</div></div>
          <div className="fact"><div className="k">SCORING</div><div className="v lg">100<span className="u">分制</span></div></div>
          <div className="fact"><div className="k">FOCUS</div><div className="v">安全 · 合作</div></div>
          <div className="fact"><div className="k">FINALE</div><div className="v">頒獎 + 大合照</div></div>
        </div>

        {/* Course diagram */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '20px 24px', borderBottom: '2px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em' }}>COURSE LAYOUT · 駕訓路線</div>
              <div style={{ fontWeight: 800, fontSize: 18, marginTop: 4 }}>起點 → 停等 → 轉彎 → 直線 → 停車 → 寶物運送</div>
            </div>
            <span className="chip"><span className="chip-dot"></span> 可沿用微型考照場域，簡化取 6 個關卡</span>
          </div>
          <div style={{ padding: 24, background: 'var(--paper)' }}>
            <DrivingCourse />
          </div>
        </div>

        {/* 6 task cards */}
        <div className="station-grid">
          {DRIVE_TASKS.map((s) =>
          <div className="station-card" key={s.n} style={{ '--station-color': s.color }}>
              <div className="station-head">
                <div className="station-num">{s.n}</div>
                <div className="station-icon" style={{ background: s.color }}>
                  <DriveIcon kind={s.icon} />
                </div>
              </div>
              <div className="station-en">{s.en}</div>
              <h4>{s.name}</h4>
              <p>{s.task}</p>
              <div className="station-focus">
                <span className="mono">SCORE</span>
                <span>{s.focus}</span>
              </div>
            </div>
          )}
        </div>

        {/* 評分標準 + 加扣分機制 */}
        <div className="practice-grid" style={{ marginTop: 24 }}>
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 6 }}>
              <h3>評分標準（100 分）</h3>
              <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>SCORING</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 18 }}>練習優先、競賽其次，評分以安全、穩定、合作與任務完成為主，不要求速度最快。</p>
            {[
            { name: '任務完成度', pt: 40, desc: '每完成一個任務站給 5–8 分，依完成程度給分。', c: '#00C896' },
            { name: '操作穩定度', pt: 20, desc: '車輛能平穩前進、轉彎、停止，少碰撞、少壓線。', c: '#2154F0' },
            { name: '團隊合作', pt: 20, desc: '組員有分工、互相提醒、不爭吵，能共同完成任務。', c: '#6B4BFF' },
            { name: '安全與秩序', pt: 10, desc: '遵守場地規則、不衝撞同學、不搶遙控器。', c: '#FF8B3D' },
            { name: '創意表現', pt: 10, desc: '小組命名、口號、任務策略、車輛造型或解說表現。', c: '#FFB100' }].
            map((r) =>
            <div key={r.name} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 14, alignItems: 'center', padding: '11px 0', borderBottom: '1.5px dashed rgba(0,0,0,.12)' }}>
                <div style={{
                width: 52, height: 40, borderRadius: 10,
                background: r.c, border: '2px solid var(--ink)',
                display: 'grid', placeItems: 'center',
                fontFamily: 'var(--font-display)', fontSize: 15, color: '#fff'
              }}>{r.pt}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{r.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55 }}>{r.desc}</div>
                </div>
              </div>
            )}
          </div>

          <div className="card" style={{ background: 'var(--ink)', color: 'var(--bg)', padding: 28 }}>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', letterSpacing: '.1em' }}>BONUS &amp; PENALTY · 加分與扣分</div>
            <h3 style={{ color: 'var(--primary)', marginTop: 6, fontSize: 22 }}>加分與扣分機制</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              <div style={{ padding: '12px 14px', background: 'rgba(46,155,110,.18)', border: '2px solid #2E9B5E', borderRadius: 10 }}>
                <strong style={{ color: '#6EE7A8' }}>加分 +5：</strong> 寶物成功放置指定區域。
              </div>
              <div style={{ padding: '12px 14px', background: 'rgba(232,74,95,.12)', border: '2px solid #E84A5F', borderRadius: 10 }}>
                <strong style={{ color: '#FF9DAB' }}>扣分 −3：</strong> 車輛衝出場地（每次），持續無法控制則由老師協助復位。
              </div>
              <div style={{ padding: '12px 14px', background: 'rgba(232,74,95,.12)', border: '2px solid #E84A5F', borderRadius: 10 }}>
                <strong style={{ color: '#FF9DAB' }}>扣分 −5：</strong> 高速碰撞車輛、同學或器材（每次）。
              </div>
              <div style={{ padding: '12px 14px', background: 'rgba(232,74,95,.12)', border: '2px solid #E84A5F', borderRadius: 10 }}>
                <strong style={{ color: '#FF9DAB' }}>扣分 −3～−10：</strong> 組內爭執，搶遙控器、推擠或不聽指令。
              </div>
            </div>
            <div style={{ marginTop: 20, padding: 14, background: 'rgba(255,255,255,.06)', borderRadius: 10, fontSize: 13, lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--primary)' }}>安全提醒：</strong>
              行駛中不可用手碰車，卡住可舉手請老師協助復位（該關不給分但可繼續挑戰）。
              正式挑戰前將確認電池電量、遙控連線與感測器狀況，行駛區與等待區明確分開。
            </div>
          </div>
        </div>

        {/* Awards */}
        <div style={{ marginTop: 48 }}>
          <div style={{ marginBottom: 18 }}>
            <span className="eyebrow">獎項規劃 · Awards</span>
            <h3 style={{ marginTop: 8, fontSize: 28 }}>七大教育型獎項，<span style={{ color: 'var(--accent)' }}>每個亮點都被看見。</span></h3>
            <p style={{ marginTop: 8, fontSize: 14, color: 'var(--muted)', maxWidth: 640, lineHeight: 1.7 }}>
              不只強調名次——程式、實驗、操作、合作、策略、應變、精神，
              讓每位學員在三天中的不同表現都有機會被表揚。
            </p>
          </div>
          <div className="rule-grid">
            {AWARDS.map((a) =>
            <div className="rule-group" key={a.n} style={{ borderTop: `5px solid ${a.c}` }}>
                <div className="rule-head">
                  <span className="rule-icon" style={{ background: a.c, color: '#fff' }}>🏆</span>
                  <h4>{a.name}</h4>
                </div>
                <ul>
                  <li>{a.desc}</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="card" style={{ marginTop: 36, padding: 24, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', background: 'var(--primary)', borderColor: 'var(--ink)' }}>
          <div style={{
            width: 56, height: 56, background: 'var(--ink)', color: 'var(--primary)',
            display: 'grid', placeItems: 'center', borderRadius: 14,
            fontFamily: 'var(--font-display)', fontSize: 22
          }}>GO</div>
          <div style={{ flex: '1 1 320px' }}>
            <div style={{ fontWeight: 800, fontSize: 17 }}>名額有限 · 額滿為止</div>
            <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 4, lineHeight: 1.6 }}>
              課程免費，每人僅酌收 NT$3,500（教材設備使用費、耗材、午餐及保險費）。國小、國中、高中生皆可報名。
              報名後主辦單位將以留存的聯絡方式通知後續事項。
            </div>
          </div>
          <button className="btn small" onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>報名營隊 →</button>
        </div>
      </div>
    </section>);

}

window.DrivingSchool = DrivingSchool;
