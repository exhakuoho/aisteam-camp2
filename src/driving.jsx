/* global React */
// Day 3 自走車小小駕訓班 — 小小駕駛員考駕照任務挑戰賽（正式版）

const { useState: useSD } = React;

// 五個考駕照基本關卡（各 20 分，共 100 分）
const DRIVE_TASKS = [
{ n: '01', name: '直線駕駛', en: 'STRAIGHT DRIVING', task: '車輛沿指定直線路段前進，盡量保持車身穩定，不明顯蛇行。', focus: '方向微調、油門控制、穩定度', color: '#2154F0', icon: 'straight' },
{ n: '02', name: '轉彎控制', en: 'TURNING CONTROL', task: '完成指定左轉或右轉，轉彎時不壓線、不撞到邊界或交通錐。', focus: '轉向幅度、速度控制、路線判斷', color: '#FF8B3D', icon: 'turn' },
{ n: '03', name: '停等看聽', en: 'STOP, LOOK AND LISTEN', task: '遇到停等牌、斑馬線或鐵軌提示時，需停下並完成觀察提醒後再出發。', focus: '安全意識、煞車反應、團隊提醒', color: '#E84A5F', icon: 'stopsign' },
{ n: '04', name: '倒車入庫', en: 'REVERSE PARKING', task: '將車輛倒入指定停車格，可慢速修正，但不可大幅碰撞邊界。', focus: '空間感、後退控制、慢速操作', color: '#6B4BFF', icon: 'reverse' },
{ n: '05', name: '路邊停車', en: 'CURBSIDE PARKING', task: '將車輛停至指定路邊區域，車身需盡量與邊線平行並停在範圍內。', focus: '定位精準、車身角度、收尾控制', color: '#00A8CC', icon: 'curb' }];


// 三項加分任務（可彈性開啟，不取代基本關卡）
const BONUS_TASKS = [
{ name: '隱藏隨機任務', en: 'Hidden Random Mission', desc: '由裁判抽出或現場公布，例如臨時改變停車格、指定繞行、限速通過、回答交通安全問題。', pt: '+5～+10', c: '#6B4BFF', icon: 'hidden' },
{ name: '護送任務', en: 'Escort / Supply Transport', desc: '車輛需運送積木、球、物資卡或指定物件到目的地，途中不可掉落或偏離路線太多。', pt: '+5～+10', c: '#2154F0', icon: 'escort' },
{ name: '狙擊挑戰', en: 'Target Shooting Challenge', desc: '使用發射機構發射乒乓球，擊倒指定標靶或落入目標區。', pt: '+5～+10', c: '#FF8B3D', icon: 'target' }];


// 正式獎項（依第一梯營隊正式獎項設定，不使用趣味獎名）
const AWARDS = [
{ n: '01', name: '第一名', desc: '總分最高，基本關卡與加分任務整體表現最佳。', c: '#FFB100' },
{ n: '02', name: '第二名', desc: '總分第二，具備穩定操作與良好任務完成度。', c: '#B8C4CE' },
{ n: '03', name: '第三名', desc: '總分第三，能完成主要關卡並展現良好合作。', c: '#CD7F32' },
{ n: '04', name: '第四名', desc: '總分第四，完成挑戰且具備可被肯定的現場表現。', c: '#6B7280' },
{ n: '05', name: '最佳技術獎', desc: '操作穩定、轉彎控制、倒車入庫或路邊停車表現突出。', c: '#2154F0' },
{ n: '06', name: '最佳團隊獎', desc: '分工清楚、溝通良好、成員互相提醒且保持秩序。', c: '#00C896' },
{ n: '07', name: '最佳策略獎', desc: '能善用路線安排、加分任務選擇與臨場判斷。', c: '#6B4BFF' }];


function DriveIcon({ kind }) {
  const ink = 'var(--ink)';
  switch (kind) {
    case 'straight':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <line x1="14" y1="24" x2="14" y2="7" stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="4 3" />
          <polygon points="14,3 9,10 19,10" fill={ink} />
        </svg>);

    case 'turn':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <path d="M 6 22 L 6 12 Q 6 6, 14 6 L 20 6" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="22,6 18,2.5 18,9.5" fill={ink} />
        </svg>);

    case 'stopsign':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <polygon points="9,4 19,4 24,9 24,19 19,24 9,24 4,19 4,9" fill="#E84A5F" stroke={ink} strokeWidth="1.8" strokeLinejoin="round" />
          <rect x="8" y="11.5" width="12" height="2.5" fill="#fff" />
          <rect x="8" y="15" width="12" height="2.5" fill="#fff" />
        </svg>);

    case 'reverse':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <rect x="6" y="10" width="16" height="14" rx="3" fill="none" stroke={ink} strokeWidth="2" />
          <path d="M14 3 L14 11" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          <polygon points="14,1 9,8 19,8" fill={ink} />
          <text x="14" y="21" textAnchor="middle" fontFamily="Archivo Black" fontSize="9" fill={ink}>R</text>
        </svg>);

    case 'curb':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <line x1="3" y1="21" x2="25" y2="21" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
          <rect x="7" y="9" width="14" height="9" rx="2" fill="none" stroke={ink} strokeWidth="2" />
          <circle cx="10.5" cy="18" r="1.6" fill={ink} />
          <circle cx="17.5" cy="18" r="1.6" fill={ink} />
        </svg>);

    case 'hidden':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <rect x="4" y="4" width="20" height="20" rx="5" fill="none" stroke={ink} strokeWidth="2" />
          <text x="14" y="19" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill={ink}>?</text>
        </svg>);

    case 'escort':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <rect x="5" y="9" width="18" height="14" rx="2" fill="none" stroke={ink} strokeWidth="2" />
          <path d="M5 9 L14 16 L23 9" fill="none" stroke={ink} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>);

    case 'target':return (
        <svg viewBox="0 0 28 28" width="28" height="28">
          <circle cx="14" cy="14" r="10" fill="none" stroke={ink} strokeWidth="1.8" />
          <circle cx="14" cy="14" r="6" fill="none" stroke={ink} strokeWidth="1.8" />
          <circle cx="14" cy="14" r="2" fill={ink} />
        </svg>);

    default:return null;
  }
}

// ─── 駕訓場地示意圖：直線→轉彎→停等看聽→倒車入庫→路邊停車 ──
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
        <text x={W - 14} y="20" textAnchor="end">小小駕駛員考駕照任務挑戰賽 · 5 STATIONS</text>
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
        <rect x="-34" y="-26" width="52" height="52" fill="#2154F0" stroke={ink} strokeWidth="2" rx="8" opacity=".18" />
        <text y="4" textAnchor="middle" fontFamily="Archivo Black" fontSize="11" fill={ink}>START</text>
      </g>

      {/* 02 轉彎控制（角落邊界錐筒） */}
      <Cone x={614} y={98} />
      <Cone x={652} y={140} />

      {/* 03 停等看聽（垂直車道的斑馬線 + 停止標誌） */}
      <g transform="translate(668, 205)">
        {[-18, -10, -2, 6, 14].map((dy) => <rect key={dy} x="-22" y={dy} width="44" height="5" fill="#fff" stroke={ink} strokeWidth="1" />)}
      </g>
      <g transform="translate(712, 205)">
        <polygon points="0,-13 9,-13 13,-4 13,5 9,14 0,14 -4,5 -4,-4" fill="#E84A5F" stroke={ink} strokeWidth="1.6" />
        <text x="4.5" y="1.5" textAnchor="middle" fontFamily="Archivo Black" fontSize="5.5" fill="#fff">STOP</text>
      </g>

      {/* 04 倒車入庫（停車格 + 倒退箭頭） */}
      <g transform="translate(560, 298)">
        <rect x="-28" y="-24" width="56" height="48" fill="none" stroke="#6B4BFF" strokeWidth="2.5" strokeDasharray="6 4" />
        <path d="M0 -36 L0 -25" stroke="#6B4BFF" strokeWidth="2.4" strokeLinecap="round" />
        <polygon points="0,-40 -6,-32 6,-32" fill="#6B4BFF" />
        <text x="0" y="7" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="#6B4BFF">R</text>
      </g>

      {/* 05 路邊停車（終點：邊線 + 平行車格） */}
      <g transform="translate(190, 298)">
        <line x1="-38" y1="-14" x2="38" y2="-14" stroke="#00A8CC" strokeWidth="2.5" />
        <rect x="-26" y="-11" width="52" height="18" rx="4" fill="none" stroke="#00A8CC" strokeWidth="2.2" />
        <circle cx="-16" cy="9" r="1.8" fill="#00A8CC" />
        <circle cx="16" cy="9" r="1.8" fill="#00A8CC" />
      </g>

      {/* 加分任務區（隱藏任務／護送／狙擊，非固定路線的彈性挑戰） */}
      <g transform="translate(115, 205)">
        <rect x="-46" y="-36" width="92" height="72" rx="10" fill="#FFF4D6" stroke="#FFB100" strokeWidth="2" strokeDasharray="5 4" />
        <text x="0" y="-16" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="#B8860B">BONUS ZONE</text>
        <text x="0" y="2" textAnchor="middle" fontFamily="Noto Sans TC" fontSize="11" fontWeight="800" fill="#8A6200">加分任務區</text>
        <text x="0" y="20" textAnchor="middle" fontFamily="Noto Sans TC" fontSize="8.5" fill="#8A6200">隱藏任務・護送・狙擊</text>
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
        <Arrow x={280} y={110} dir="right" />
        <Arrow x={470} y={110} dir="right" />
        <Arrow x={668} y={178} dir="down" />
        <Arrow x={500} y={298} dir="left" />
        <Arrow x={300} y={298} dir="left" />
      </g>

      {/* 五站標籤 */}
      <Badge x={220} y={150} num="01" color="#2154F0" label="直線駕駛" />
      <Badge x={706} y={100} num="02" color="#FF8B3D" label="轉彎控制" />
      <Badge x={706} y={240} num="03" color="#E84A5F" label="停等看聽" />
      <Badge x={560} y={352} num="04" color="#6B4BFF" label="倒車入庫" />
      <Badge x={190} y={352} num="05" color="#00A8CC" label="路邊停車" />
    </svg>);

}

function DrivingSchool() {
  return (
    <section id="driving">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">DAY 3 壓軸 · 小小駕駛員考駕照任務挑戰賽</span>
            <h2 style={{ marginTop: 14 }}>自走車<br /><span className="accent">小小駕訓班。</span></h2>
          </div>
          <p>
            像考駕照一樣學開自走車！3–5 人一組，挑戰<strong>直線駕駛、轉彎控制、停等看聽、
            倒車入庫、路邊停車</strong>五大基本關卡（各 20 分，共 100 分），
            還有餘力的話可以挑戰隱藏任務、護送任務或狙擊挑戰來爭取加分。
            不是只比誰最快，而是比誰能安全、穩定、和隊友一起完成任務。
          </p>
        </div>

        {/* Facts strip */}
        <div className="tour-facts">
          <div className="fact"><div className="k">STATIONS</div><div className="v lg">5<span className="u">大基本關卡</span></div></div>
          <div className="fact"><div className="k">BONUS</div><div className="v lg">+30<span className="u">分加分任務</span></div></div>
          <div className="fact"><div className="k">TEAM</div><div className="v">3–5 人一組</div></div>
          <div className="fact"><div className="k">SCORING</div><div className="v lg">100<span className="u">分制</span></div></div>
          <div className="fact"><div className="k">AWARDS</div><div className="v lg">7<span className="u">項正式獎項</span></div></div>
          <div className="fact"><div className="k">FINALE</div><div className="v">頒獎 + 第三天提醒</div></div>
        </div>

        {/* Course diagram */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '20px 24px', borderBottom: '2px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em' }}>COURSE LAYOUT · 駕訓路線</div>
              <div style={{ fontWeight: 800, fontSize: 18, marginTop: 4 }}>直線駕駛 → 轉彎控制 → 停等看聽 → 倒車入庫 → 路邊停車</div>
            </div>
            <span className="chip"><span className="chip-dot"></span> 場地另設加分任務區，彈性開啟</span>
          </div>
          <div style={{ padding: 24, background: 'var(--paper)' }}>
            <DrivingCourse />
          </div>
        </div>

        {/* 5 基本關卡卡片 */}
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
                <span className="mono">20 分</span>
                <span>{s.focus}</span>
              </div>
            </div>
          )}
        </div>

        {/* 評分標準 + 加分任務 */}
        <div className="practice-grid" style={{ marginTop: 24 }}>
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 6 }}>
              <h3>評分方式</h3>
              <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>SCORING</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 18 }}>不是只比誰最快，評分以任務完成度、操作穩定與安全秩序為主。</p>
            {[
            { name: '基本關卡完成度', pt: '100', desc: '五個考駕照關卡各 20 分，依完成度、壓線、碰撞與是否超時酌量給分。', c: '#2154F0' },
            { name: '加分任務', pt: '+30', desc: '三項加分任務各 +5～+10 分，依實際完成程度給分（不取代基本關卡）。', c: '#FFB100' },
            { name: '扣分項', pt: '−', desc: '衝撞場地、未聽從裁判、用手碰車、危險操作、干擾其他組別，可扣分或取消該關分數。', c: '#E84A5F' },
            { name: '成績判定', pt: '#', desc: '總分排序；同分時依安全駕駛表現、完成時間、團隊合作表現依序判定。', c: '#00C896' }].
            map((r) =>
            <div key={r.name} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 14, alignItems: 'center', padding: '11px 0', borderBottom: '1.5px dashed rgba(0,0,0,.12)' }}>
                <div style={{
                width: 52, height: 40, borderRadius: 10,
                background: r.c, border: '2px solid var(--ink)',
                display: 'grid', placeItems: 'center',
                fontFamily: 'var(--font-display)', fontSize: 14, color: '#fff'
              }}>{r.pt}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{r.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55 }}>{r.desc}</div>
                </div>
              </div>
            )}
          </div>

          <div className="card" style={{ background: 'var(--ink)', color: 'var(--bg)', padding: 28 }}>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', letterSpacing: '.1em' }}>BONUS MISSIONS · 加分項任務</div>
            <h3 style={{ color: 'var(--primary)', marginTop: 6, fontSize: 22 }}>三項加分挑戰</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', marginTop: 6, marginBottom: 16 }}>依場地、車況與學生能力彈性開啟，讓操作較熟練的小組有更多發揮空間。</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {BONUS_TASKS.map((b) =>
              <div key={b.name} style={{ padding: '12px 14px', background: 'rgba(255,255,255,.06)', border: `2px solid ${b.c}`, borderRadius: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 8, background: b.c, display: 'grid', placeItems: 'center' }}>
                    <DriveIcon kind={b.icon} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{b.name} <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{b.pt}</span></div>
                    <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.7)', lineHeight: 1.55, marginTop: 2 }}>{b.desc}</div>
                  </div>
                </div>
              )}
            </div>
            <div style={{ marginTop: 20, padding: 14, background: 'rgba(255,255,255,.06)', borderRadius: 10, fontSize: 13, lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--primary)' }}>安全提醒：</strong>
              行駛中不可用手碰車，卡住可舉手請裁判或助教協助復位。狙擊挑戰發射方向須朝向標靶區，不可朝人發射；
              護送任務道具以輕量、鈍角、不易破裂物件為主。
            </div>
          </div>
        </div>

        {/* Awards */}
        <div style={{ marginTop: 48 }}>
          <div style={{ marginBottom: 18 }}>
            <span className="eyebrow">獎項設定 · Awards</span>
            <h3 style={{ marginTop: 8, fontSize: 28 }}>正式獎項，<span style={{ color: 'var(--accent)' }}>總分排序 + 三項特別獎。</span></h3>
            <p style={{ marginTop: 8, fontSize: 14, color: 'var(--muted)', maxWidth: 640, lineHeight: 1.7 }}>
              第一梯營隊正式獎項設定，不使用趣味獎項名稱：第一名至第四名依總分排序，
              另設最佳技術、最佳團隊與最佳策略三項特別獎，表揚不同面向的優秀表現。
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
