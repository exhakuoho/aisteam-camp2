/* global React */
// Day 3 自走車小小駕訓班

const { useState: useSD } = React;

const DRIVE_TASKS = [
{ n: '01', name: '交通標誌認識', en: 'TRAFFIC SIGNS', task: '認識停止、轉彎、停車、行人穿越等基本標誌，先懂規則再上路。', focus: '安全觀念、規則理解', color: '#E84A5F', icon: 'sign' },
{ n: '02', name: '直線與轉彎練習', en: 'DRIVE & TURN', task: '操作自走車完成前進、後退、轉彎與停止，練到車身穩定不蛇行。', focus: '操控穩定、方向控制', color: '#2154F0', icon: 'turn' },
{ n: '03', name: '繞錐與定點停車', en: 'SLALOM & PARK', task: '依指定路線繞過障礙錐筒，並將車輛停在指定停車格內。', focus: '精準度、速度控制', color: '#FF8B3D', icon: 'cone' },
{ n: '04', name: '小小駕訓闖關', en: 'MISSION RUN', task: '任務累積制：依規則完成路線、停車與安全駕駛的綜合挑戰。', focus: '路線規劃、團隊分工、臨場反應', color: '#6B4BFF', icon: 'flag' },
{ n: '05', name: '成果分享', en: 'REFLECTION', task: '說明隊伍策略、遇到的問題與改善方式，把經驗變成能力。', focus: '表達能力、學習反思', color: '#00C896', icon: 'share' }];


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
    case 'sign':return (
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

    case 'cone':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <polygon points="14,4 20,22 8,22" fill="#FF8B3D" stroke={ink} strokeWidth="1.8" strokeLinejoin="round" />
          <rect x="10.5" y="12" width="7" height="3" fill="#fff" />
          <rect x="5" y="22" width="18" height="3" fill={ink} rx="1.5" />
        </svg>);

    case 'flag':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <line x1="7" y1="4" x2="7" y2="24" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 7 5 L 23 5 L 19 10 L 23 15 L 7 15 Z" fill="#6B4BFF" stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>);

    case 'share':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <circle cx="9" cy="10" r="4" fill="#00C896" stroke={ink} strokeWidth="1.6" />
          <circle cx="19" cy="10" r="4" fill="#fff" stroke={ink} strokeWidth="1.6" />
          <path d="M 4 24 Q 9 17 14 24 M 14 24 Q 19 17 24 24" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
        </svg>);

    default:return null;
  }
}

// ─── 駕訓場地示意圖 ─────────────────────────────────────
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
        <text x={W - 14} y="20" textAnchor="end">小小駕訓場 · MINI DRIVING COURSE</text>
      </g>

      {/* 場地外框 */}
      <rect x="24" y="36" width={W - 48} height={H - 72} fill="#FFFDF6" stroke={ink} strokeWidth="2.5" rx="14" />

      {/* 道路：一條回字形車道 */}
      <path d="M 90 110 L 620 110 Q 668 110 668 158 L 668 250 Q 668 298 620 298 L 170 298"
      fill="none" stroke="#E9E2CE" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 90 110 L 620 110 Q 668 110 668 158 L 668 250 Q 668 298 620 298 L 170 298"
      fill="none" stroke={ink} strokeWidth="2" strokeDasharray="8 8" strokeLinecap="round" />

      {/* 起點 */}
      <g transform="translate(90, 110)">
        <rect x="-34" y="-26" width="52" height="52" fill="#00C896" stroke={ink} strokeWidth="2" rx="8" opacity=".22" />
        <text y="4" textAnchor="middle" fontFamily="Archivo Black" fontSize="11" fill={ink}>START</text>
      </g>

      {/* 停止標誌（斑馬線） */}
      <g transform="translate(320, 110)">
        {[-18, -10, -2, 6, 14].map((dx) => <rect key={dx} x={dx} y="-22" width="5" height="44" fill="#fff" stroke={ink} strokeWidth="1" />)}
        <polygon points="0,-52 9,-46 9,-34 0,-28 -9,-34 -9,-46" fill="#E84A5F" stroke={ink} strokeWidth="1.6" transform="translate(0,-4)" />
        <text x="0" y="-42" textAnchor="middle" fontFamily="Archivo Black" fontSize="6.5" fill="#fff">STOP</text>
      </g>

      {/* 繞錐區 */}
      <Cone x={470} y={100} />
      <Cone x={520} y={122} />
      <Cone x={570} y={100} />

      {/* 定點停車格 */}
      <g transform="translate(640, 204)">
        <rect x="-2" y="-30" width="52" height="60" fill="none" stroke="#2154F0" strokeWidth="2.5" strokeDasharray="6 4" />
        <text x="24" y="4" textAnchor="middle" fontFamily="Archivo Black" fontSize="12" fill="#2154F0">P</text>
      </g>

      {/* 終點與自走車 */}
      <g transform="translate(200, 298)">
        <rect x="-30" y="-24" width="60" height="48" fill="#FFD23F" stroke={ink} strokeWidth="2" rx="8" opacity=".35" />
        <text y="4" textAnchor="middle" fontFamily="Archivo Black" fontSize="10" fill={ink}>FINISH</text>
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
        <Arrow x={200} y={110} dir="right" />
        <Arrow x={430} y={110} dir="right" />
        <Arrow x={668} y={190} dir="down" />
        <Arrow x={560} y={298} dir="left" />
        <Arrow x={300} y={298} dir="left" />
      </g>

      {/* 標籤 */}
      <Badge x={320} y={186} num="01" color="#E84A5F" label="停等 2 秒" />
      <Badge x={520} y={182} num="02" color="#FF8B3D" label="繞錐挑戰" />
      <Badge x={590} y={352} num="03" color="#2154F0" label="定點停車" />
      <Badge x={160} y={352} num="04" color="#00C896" label="安全抵達" />
    </svg>);

}

function DrivingSchool() {
  return (
    <section id="driving">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">DAY 3 壓軸 · Mini Driving School</span>
            <h2 style={{ marginTop: 14 }}>自走車<br /><span className="accent">小小駕訓班。</span></h2>
          </div>
          <p>
            像考駕照一樣學開自走車！從車輛檢查、交通標誌、基本操作到
            <strong>任務累積制闖關挑戰</strong>，最後在頒獎典禮上為三天的努力畫下句點。
          </p>
        </div>

        {/* Facts strip */}
        <div className="tour-facts">
          <div className="fact"><div className="k">MISSIONS</div><div className="v lg">5<span className="u">大駕訓項目</span></div></div>
          <div className="fact"><div className="k">STAGES</div><div className="v lg">2<span className="u">階段駕訓</span></div></div>
          <div className="fact"><div className="k">SCORING</div><div className="v">任務累積制</div></div>
          <div className="fact"><div className="k">AWARDS</div><div className="v lg">7<span className="u">項獎狀</span></div></div>
          <div className="fact"><div className="k">FOCUS</div><div className="v">安全 · 合作</div></div>
          <div className="fact"><div className="k">FINALE</div><div className="v">頒獎 + 大合照</div></div>
        </div>

        {/* Course diagram */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '20px 24px', borderBottom: '2px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em' }}>COURSE LAYOUT · 駕訓路線</div>
              <div style={{ fontWeight: 800, fontSize: 18, marginTop: 4 }}>停等 → 繞錐 → 停車 → 安全抵達</div>
            </div>
            <span className="chip"><span className="chip-dot"></span> 實際路線依現場公布為準</span>
          </div>
          <div style={{ padding: 24, background: 'var(--paper)' }}>
            <DrivingCourse />
          </div>
        </div>

        {/* 5 task cards */}
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
              每人 NT$3,500，含每日午餐與保險費。國小、國中、高中生皆可報名，對科技有興趣者都歡迎。
              報名後主辦單位將以留存的聯絡方式通知後續事項。
            </div>
          </div>
          <button className="btn small" onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>報名營隊 →</button>
        </div>
      </div>
    </section>);

}

window.DrivingSchool = DrivingSchool;
