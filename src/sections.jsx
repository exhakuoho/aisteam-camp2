/* global React, RobotCar, HLIcon */
// All page sections except the form / Day2 energy / Day3 driving

const { useState, useEffect, useRef, useMemo } = React;

// ─── Nav ────────────────────────────────────────────────
function Nav({ daysLeft, onJump }) {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={(e) => {e.preventDefault();onJump('top');}}>
          <div className="brand-mark">N</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, lineHeight: 1.1 }}>AI×STEAM <span style={{ color: 'var(--accent)' }}>第二梯</span></div>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.05em' }}>NKUST · SUMMER CAMP</div>
          </div>
        </a>
        <div className="nav-links">
          <a href="#about" onClick={(e) => {e.preventDefault();onJump('about');}}>特色</a>
          <a href="#schedule" onClick={(e) => {e.preventDefault();onJump('schedule');}}>課程</a>
          <a href="#energy" onClick={(e) => {e.preventDefault();onJump('energy');}}>能源實驗</a>
          <a href="#driving" onClick={(e) => {e.preventDefault();onJump('driving');}}>駕訓挑戰</a>
          <a href="#faq" onClick={(e) => {e.preventDefault();onJump('faq');}}>FAQ</a>
          <span className="countdown-chip">
            <span className="dot"></span>
            T-{daysLeft}d · 7.29 開營
          </span>
          <button className="btn small" onClick={() => onJump('register')}>
            立即報名 →
          </button>
        </div>
      </div>
    </nav>);

}

// ─── Hero ───────────────────────────────────────────────
function Hero({ onRegister }) {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">第二梯 暑期營隊 · 2026 夏天</span>
            <h1 style={{ marginTop: 20 }}>
              AI <span className="x">×</span> STEAM<br />
              <span className="underline">科技探索營</span>
            </h1>
            <p className="hero-sub">
              三天動手玩科技，探索 AI、能源與駕駛體驗！
              從 AI 與程式語言出發，走進氫與電的能源世界，
              最後在自走車小小駕訓班完成闖關挑戰——
              跨領域學習、實作體驗、啟發創意、培養未來力。
            </p>

            <div className="hero-date">
              <div className="big">07.29<br />— 07.31</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>三日營隊</div>
                <div className="small">7月29日（二）— 7月31日（四）<br />每日 08:30 – 16:00（08:30 報到）　|　國立高雄科技大學 建工校區</div>
              </div>
            </div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
              marginTop: 18, padding: '14px 22px',
              background: 'var(--ink)', color: 'var(--bg)',
              border: '2px solid var(--ink)', borderRadius: 14,
              boxShadow: '4px 4px 0 rgba(0,0,0,.15)'
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--primary)', lineHeight: 1 }}>課程免費</span>
              <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.55 }}>每人僅酌收 NT$3,500<br />（三日教材設備使用費、耗材、午餐及保險費）</span>
            </div>

            <div className="hero-chips">
              <span className="chip solid"><span style={{ width: 6, height: 6, background: 'var(--primary)', borderRadius: '50%' }}></span> 名額有限 · 額滿為止</span>
              <span className="chip">國小 · 國中 · 高中</span>
              <span className="chip">共 3 天</span>
              <span className="chip">課程免費・僅收基本費用</span>
              <span className="chip">AI × 能源 × 駕駛</span>
              <span className="chip">對科技有興趣者</span>
            </div>

            <div className="hero-cta">
              <button className="btn" onClick={onRegister}>
                立即報名 <span style={{ fontFamily: 'var(--font-display)' }}>→</span>
              </button>
              <a className="btn ghost" href="#schedule" onClick={(e) => {e.preventDefault();document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>
                查看三日課程
              </a>
            </div>
          </div>

          <div className="robot-stage">
            <div className="stage-corner tl">LAB · KUAS</div>
            <div className="stage-corner tr">BATCH-02 ● REC</div>
            <div className="stage-corner bl">v2.26.07</div>
            <div className="stage-corner br">AI · H₂ · AMR</div>
            <div className="stage-grid"></div>
            <div className="stage-track"></div>
            <div className="stage-checker"></div>

            {/* Top-left mini hud — 三日主題 */}
            <div style={{
              position: 'absolute', top: 36, left: 36,
              padding: '10px 12px',
              background: 'var(--bg)', border: '2px solid var(--ink)', borderRadius: 10,
              fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.5
            }}>
              <div>▸ D1 : <b>AI + CODE</b></div>
              <div>▸ D2 : <b>H₂ / ⚡</b></div>
              <div>▸ D3 : <span style={{ color: 'var(--accent)' }}>DRIVE!</span></div>
            </div>

            {/* Block stack mini hud */}
            <div style={{
              position: 'absolute', top: 36, right: 36,
              display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-end'
            }}>
              <MiniBlock color="var(--primary)">當 ▶ 被點擊</MiniBlock>
              <MiniBlock color="var(--mint, #2E9B5E)" stack>如果 偵測到氫氣泡</MiniBlock>
              <MiniBlock color="var(--blue)" stack>自走車 前進 50</MiniBlock>
            </div>

            {/* H₂ bubble */}
            <div style={{
              position: 'absolute', bottom: 120, right: 48,
              width: 64, height: 64, borderRadius: '50%',
              background: 'radial-gradient(circle at 32% 30%, #ffffff 0%, #BFE7FF 45%, #7EC4F5 100%)',
              border: '2.5px solid var(--ink)',
              display: 'grid', placeItems: 'center',
              fontFamily: 'var(--font-display)', fontSize: 20,
              boxShadow: '3px 3px 0 var(--ink)'
            }}>H₂</div>

            <RobotCar />
          </div>
        </div>
      </div>
    </section>);

}

function MiniBlock({ color, stack, children }) {
  return (
    <div style={{
      position: 'relative',
      background: color,
      color: 'var(--paper)',
      border: '2px solid var(--ink)',
      borderRadius: 8,
      padding: '7px 12px',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: 'var(--font-cn)',
      marginTop: stack ? -2 : 0,
      boxShadow: '2px 2px 0 var(--ink)',
      zIndex: stack ? 0 : 1
    }}>
      {children}
    </div>);

}

// ─── Highlights（營隊特色）────────────────────────────
function Highlights() {
  const items = [
  { kind: 'hands', num: '01', title: '動手實作', en: 'Hands-on', desc: '做中學、玩中學。程式任務、電解實驗、自走車操作，每一天都親手完成。', cls: 'b1' },
  { kind: 'team', num: '02', title: '團隊合作', en: 'Teamwork', desc: '分組協作、互相學習。從任務分工到闖關挑戰，練習溝通與策略。', cls: 'b2' },
  { kind: 'tech', num: '03', title: '跨域學習', en: 'Cross-domain', desc: 'AI、能源、駕駛一次體驗。三天串起一條完整的科技學習軌跡。', cls: 'b3' },
  { kind: 'code', num: '04', title: '成就滿滿', en: 'Achievement', desc: '完成挑戰、獲得獎狀。七大教育型獎項，讓每個孩子找到自己的亮點。', cls: 'b4' }];

  return (
    <section id="about">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">營隊特色 · Highlights</span>
            <h2 style={{ marginTop: 14 }}>跨領域學習，<span className="accent">三天玩透。</span></h2>
          </div>
          <p>不只是體驗。從 AI 概念、程式邏輯、能源科普到自走車駕訓，每一天都讓孩子帶走一個新的「我會了」。</p>
        </div>
        <div className="highlights">
          {items.map((it) =>
          <div className={`hl ${it.cls}`} key={it.num}>
              <div className="num">{it.num} · {it.en}</div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              <div className="icon"><HLIcon kind={it.kind} /></div>
            </div>
          )}
        </div>

        <div className="stats">
          <div className="stat"><div className="v">3<span style={{ fontSize: 24, marginLeft: 4 }}>天</span></div><div className="l">DURATION · 課程天數</div></div>
          <div className="stat"><div className="v">3<span style={{ fontSize: 24, marginLeft: 4 }}>大主題</span></div><div className="l">AI · 能源 · 駕駛</div></div>
          <div className="stat"><div className="v">7<span style={{ fontSize: 24, marginLeft: 4 }}>獎</span></div><div className="l">AWARDS · 教育型獎項</div></div>
          <div className="stat"><div className="v">3<span style={{ fontSize: 24, marginLeft: 4 }}>學段</span></div><div className="l">國小 × 國中 × 高中</div></div>
        </div>
      </div>
    </section>);

}

// ─── About / 活動宗旨 ──────────────────────────────────
function About() {
  const gains = [
  '培養科技素養與解決問題能力',
  '提升邏輯思維與動手實作力',
  '學習安全駕駛與交通觀念',
  '結交新朋友，創造美好回憶'];

  return (
    <section>
      <div className="container">
        <div className="about-grid">
          <div>
            <span className="eyebrow">營隊定位 · Why AI×STEAM</span>
            <p className="lead" style={{ marginTop: 18 }}>
              三天互相銜接的科技體驗：先懂 AI，再懂能源，最後上場駕駛。
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>
              本梯次以<strong>跨領域學習</strong>為主軸。學生先認識 <strong>AI 與程式語言</strong>的基礎概念，
              透過圖像化程式把想法轉換成可執行的指令；再透過<strong>能源探索：氫與電</strong>，
              從海水電解、燃料電池理解能源轉換與永續發展；
              最後以<strong>自走車小小駕訓班</strong>完成操作練習、交通觀念與闖關任務。
            </p>
            <p>
              從學習、練習、修正到上場挑戰，讓每位學員形成一段<strong>完整的科技探索經驗</strong>——
              不需要任何先備程式或實驗經驗。
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginTop: 4 }}>
              {gains.map((g) =>
              <div key={g} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 14px', background: 'var(--soft-1)',
                border: '1.5px solid var(--ink)', borderRadius: 10,
                fontSize: 14, fontWeight: 600
              }}>
                  <span style={{
                  width: 22, height: 22, flexShrink: 0, borderRadius: '50%',
                  background: 'var(--primary)', border: '1.5px solid var(--ink)',
                  display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 900
                }}>✓</span>
                  {g}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ─── Schedule ──────────────────────────────────────────
const SCHEDULE = {
  d1: {
    date: '7月 29 日 · 週二',
    sub: 'AI + 程式語言探索',
    theme: '認識 AI 是什麼、AI 與生活中的應用、程式語言基礎探索、邏輯思維與互動任務。',
    rows: [
    ['08:30 – 09:00', '報到、分組、領取名牌', '確認學生名單、分組與座位', 'check'],
    ['09:00 – 09:20', '開場與營隊介紹', '說明三天課程、規則與安全事項', 'highlight'],
    ['09:20 – 10:00', '破冰活動', '促進不同學校學生互動，建立小隊默契', null],
    ['10:00 – 10:10', '休息', '', 'break'],
    ['10:10 – 10:40', 'AI 與程式語言導入', '認識 AI 應用、程式語言概念、順序、條件與圖像化程式', null],
    ['10:40 – 11:30', '任務一：讓指令動起來', '以圖像化程式完成指令控制與互動任務', null],
    ['11:30 – 12:00', '任務二：AI 生活應用與互動任務', '觀察生活中的 AI 應用，設計簡單互動判斷', null],
    ['12:00 – 13:00', '午餐與休息', '', 'lunch'],
    ['13:00 – 13:30', '下午任務說明', '公布任務卡與評分方式', null],
    ['13:30 – 14:20', '任務三：程式邏輯挑戰', '調整流程與條件，讓任務依規則完成', null],
    ['14:20 – 14:40', '休息', '', 'break'],
    ['14:40 – 15:30', '小組挑戰：AI + 程式任務闖關', '各組依序完成邏輯、互動與闖關任務', 'highlight'],
    ['15:30 – 15:50', '成果分享', '每組說明程式邏輯與遇到的問題', null],
    ['15:50 – 16:00', '總結與明日提醒', '提醒第二天實驗安全與集合時間', null]]

  },
  d2: {
    date: '7月 30 日 · 週三',
    sub: '能源探索：氫與電',
    theme: '認識氫能與電能、海水電解與能源轉換原理、基礎實驗觀察與體驗、綠色能源與永續發展。',
    rows: [
    ['08:30 – 09:00', '報到、集合、點名', '確認人數，提醒實驗安全與器材使用規範', 'check'],
    ['09:00 – 09:15', '今日開場', '介紹氫能、能源轉換與海水電解主題', null],
    ['09:15 – 09:45', '主題導入：什麼是氫能？', '氫氣作為潔淨能源：發電、工廠燃料、載具燃料與儲能', null],
    ['09:45 – 10:15', '氫氣怎麼產生？', '認識灰氫、棕氫、藍氫與綠氫，強調綠氫低碳概念', null],
    ['10:15 – 10:30', '休息', '補水與實驗器材確認', 'break'],
    ['10:30 – 11:00', '海水電解介紹', '電流分解水分子，產生氫氣 H₂ 與氧氣 O₂', null],
    ['11:00 – 11:40', '實驗一：鉛筆電解實驗', '以筆芯作為電極，觀察氣泡產生 — 點此查看實驗內容', 'practice'],
    ['11:40 – 12:00', '實驗觀察與討論', '比較兩端氣泡量，記錄觀察結果', null],
    ['12:00 – 13:00', '午餐與休息', '', 'lunch'],
    ['13:00 – 13:20', '上午回顧', '回顧氫能、海水電解與上午實驗重點', null],
    ['13:20 – 14:10', '實驗二：霍夫曼電解實驗', '觀察氫氣與氧氣的產生與收集方式', 'practice'],
    ['14:10 – 14:40', '燃料電池示範', '氫氣與氧氣重新結合，產生電力與水', 'highlight'],
    ['14:40 – 15:00', '休息與器材整理', '', 'break'],
    ['15:00 – 15:30', '氫能與永續發展', '連結 SDG 7、9、11、13，討論綠能與未來城市', null],
    ['15:30 – 15:50', '小組學習單／問答', '完成觀察紀錄與課程回顧', null],
    ['15:50 – 16:00', '總結與第三天提醒', '第三天為自走車駕訓挑戰，注意團隊合作與規則', null]]

  },
  d3: {
    date: '7月 31 日 · 週四',
    sub: '自走車小小駕訓班',
    theme: '認識自走車與基本操作、模擬環境控制與練習、闖關任務與駕駛挑戰、安全觀念學習。',
    rows: [
    ['08:30 – 09:00', '報到、集合、場地準備', '確認隊伍、設備、電池、競賽場地', 'check'],
    ['09:00 – 09:20', '駕訓開場與交通規則說明', '安全規範、交通標誌、駕訓任務與闖關方式', 'highlight'],
    ['09:20 – 09:50', '自走車檢查與駕訓準備', '確認自走車、遙控器、電池、輪胎與場地狀況', null],
    ['09:50 – 10:30', '操作練習', '各組練習前進、後退、轉彎、停止與定點停車', null],
    ['10:30 – 10:45', '休息', '補水、充電與場地整理', 'break'],
    ['10:45 – 12:00', '第一階段駕訓練習', '繞錐、停車、交通標誌辨識與指定路線練習', null],
    ['12:00 – 13:00', '午餐與休息', '整理上午成績，確認下午賽程', 'lunch'],
    ['13:00 – 13:20', '下午賽程說明', '公布駕訓闖關順序、隊伍任務與注意事項', null],
    ['13:20 – 14:30', '第二階段駕訓闖關挑戰', '任務累積制：安全駕駛、路線控制與團隊挑戰 — 點此查看闖關項目', 'competition'],
    ['14:30 – 14:50', '成績整理、休息', '工作人員統計成績與獎項', 'break'],
    ['14:50 – 15:20', '小組成果分享', '分享策略、分工、困難與修正方式', null],
    ['15:20 – 15:45', '頒獎典禮', '頒發各組獎項', 'highlight'],
    ['15:45 – 15:55', '閉幕致詞', '肯定三天學習與團隊挑戰成果', null],
    ['15:55 – 16:00', '大合照、賦歸', '完成合照與學生離場確認', null]]

  }
};

function Schedule() {
  const [day, setDay] = useState('d1');
  const data = SCHEDULE[day];
  const days = [
  { id: 'd1', n: 'DAY 01', t: 'AI + 程式', d: '7.29 週二' },
  { id: 'd2', n: 'DAY 02', t: '氫與電', d: '7.30 週三' },
  { id: 'd3', n: 'DAY 03', t: '小小駕訓班', d: '7.31 週四' }];

  return (
    <section id="schedule" style={{ background: 'var(--soft-1)', paddingTop: 'var(--pad-section)', paddingBottom: 'var(--pad-section)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">三日課程 · Schedule</span>
            <h2 style={{ marginTop: 14 }}>每天 08:30 – 16:00<br /><span className="accent">三天一條完整的探索軌跡。</span></h2>
          </div>
          <p>第一天玩 AI 與程式，第二天走進氫與電的能源實驗，第三天上場自走車駕訓闖關——點選下方分頁切換每日詳細流程。</p>
        </div>

        <div className="schedule-tabs" role="tablist">
          {days.map((d) =>
          <button
            key={d.id}
            role="tab"
            className="tab"
            aria-selected={day === d.id}
            onClick={() => setDay(d.id)}>
            
              <span className="day-num">{d.n}</span>
              <span className="day-title">{d.t}</span>
              <span className="day-date">{d.d}</span>
            </button>
          )}
        </div>

        <div className="card" style={{ padding: '32px 32px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 12, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '.1em' }}>第 {day.slice(1)} 天 · {data.date}</div>
              <h3 style={{ marginTop: 6 }}>{data.sub}</h3>
            </div>
            <span className="chip"><span className="chip-dot"></span> 共 {data.rows.length} 個時段</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.7 }}>{data.theme}</p>

          <div className="timeline">
            {data.rows.map((r, i) => {
              const [time, act, note, type] = r;
              let cls = '';
              if (type === 'lunch') cls = 'lunch';else
              if (type === 'break') cls = 'break';else
              if (type === 'highlight') cls = 'highlight';else
              if (type === 'competition') cls = 'competition';else
              if (type === 'practice') cls = 'practice';
              const jumpTarget = type === 'competition' ? 'driving' : type === 'practice' ? 'energy' : null;
              const clickable = !!jumpTarget;
              const onClick = clickable ? () => document.getElementById(jumpTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) : undefined;
              return (
                <div className="tl-row" key={i}>
                  <div className="tl-time">{time}</div>
                  <div className={`tl-dot ${cls} ${clickable ? 'jump' : ''}`} onClick={onClick} role={clickable ? 'button' : undefined}>
                    <div className="card-row">
                      <div>
                        <div className="activity">{act}{clickable && <span className="jump-arrow"> ↓</span>}</div>
                        {note && <div className="note">{note}</div>}
                      </div>
                      {type === 'check' && <span className="badge">報到</span>}
                      {type === 'lunch' && <span className="badge" style={{ background: 'var(--paper)' }}>用餐</span>}
                      {type === 'break' && <span className="badge" style={{ background: 'transparent', border: 'none', color: 'var(--muted)' }}>休息</span>}
                      {type === 'highlight' && <span className="badge" style={{ background: 'var(--ink)', color: 'var(--bg)', borderColor: 'var(--ink)' }}>主場活動</span>}
                      {type === 'practice' && <span className="badge" style={{ background: 'var(--mint)', color: '#fff', borderColor: 'var(--mint)' }}>實驗 →</span>}
                      {type === 'competition' && <span className="badge" style={{ background: '#fff', color: 'var(--accent)', borderColor: '#fff' }}>闖關挑戰 →</span>}
                    </div>
                  </div>
                </div>);

            })}
          </div>
        </div>
      </div>
    </section>);

}

// ─── Notes / 注意事項 ─────────────────────────────────
function Notes() {
  const items = [
  '每日 08:30 完成報到，每次集合與移動教室皆會點名',
  '自備個人水壺，請勿攜帶含糖飲料',
  '有飲食過敏或特殊飲食需求，請於報名時告知',
  '氣喘、癲癇、過敏、心臟病等特殊狀況請填寫健康聲明',
  '實驗課程需配戴護目鏡，接線由講師或助教確認後才可通電',
  '駕訓與競賽時，非操作學生不得進入場地',
  '活動全程拍照錄影作為紀錄、宣傳與報告使用',
  '天災、疫情等不可抗力因素將另行通知調整或取消'];

  return (
    <section style={{ background: 'var(--paper)', borderTop: '2px solid var(--ink)', borderBottom: '2px solid var(--ink)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">學員注意事項 · Before You Come</span>
            <h2 style={{ marginTop: 14 }}>安全第一，<span className="accent">準備好就出發。</span></h2>
          </div>
          <p>下面這些事項請家長與學員一起閱讀，到場時會更順利。報名時也會再次提醒。</p>
        </div>
        <div className="notes">
          {items.map((t) => <div className="note-item" key={t}>{t}</div>)}
        </div>
      </div>
    </section>);

}

// ─── FAQ ──────────────────────────────────────────────
const FAQS = [
{ q: '需要先會寫程式嗎？', a: '完全不用！第一天從 AI 概念與圖像化程式開始，用拖拉組合的方式學習順序、條件與邏輯，零基礎也能上手。' },
{ q: '國小、國中、高中生都可以報名嗎？', a: '可以。本梯次開放國小生、國中生與高中生報名，只要對科技有興趣都歡迎。分組時會考量年齡與程度，讓每位學員都能參與。' },
{ q: '氫能實驗安全嗎？', a: '所有實驗皆在講師與助教指導下進行。學員操作時需配戴護目鏡，電池與導線接線由工作人員確認後才通電；燃料電池與氣體示範由講師操作、學員觀察。' },
{ q: '自走車會很難操作嗎？', a: '不會。第三天從車輛檢查、基本操作開始，先練習前進、後退、轉彎與停車，再進入繞錐與闖關任務，重點在穩定完成與團隊合作。' },
{ q: '費用多少？包含哪些項目？', a: '本營隊課程免費，不收取任何課程學費。每人僅酌收 NT$3,500，項目為：三日教材設備使用費、設備使用耗材、每日午餐及保險費，報到後不需再額外繳費。繳費方式將於錄取通知中說明。' },
{ q: '中午吃什麼？可以告知飲食限制嗎？', a: '每日午餐由營隊提供（已包含在酌收費用中）。若學員有飲食過敏、素食或宗教飲食需求，請在報名表的「健康聲明」欄位告知，我們會協助調整。' },
{ q: '活動會拍照錄影嗎？可以選擇不公開嗎？', a: '活動會全程紀錄。報名時的「肖像權同意」欄位可以選擇「不同意公開使用」，我們會妥善處理該名學員的影像。' },
{ q: '名額滿了怎麼辦？有候補嗎？', a: '依報名順序錄取，額滿為止並保留候補名單。若有名額釋出，主辦單位會以報名留存的聯絡方式通知。其他問題歡迎來電 07-3814526 分機 15453 洽詢。' }];


function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">常見問題 · FAQ</span>
            <h2 style={{ marginTop: 14 }}>家長最常問的<br /><span className="accent">八個問題。</span></h2>
          </div>
          <p>還有其他疑問？歡迎透過下方聯絡資訊與我們聯繫。</p>
        </div>
        <div className="faq">
          {FAQS.map((f, i) =>
          <div className={`faq-item ${open === i ? 'open' : ''}`} key={f.q}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span><span className="mono" style={{ color: 'var(--muted)', marginRight: 12, fontSize: 13 }}>Q.0{i + 1}</span>{f.q}</span>
                <span className="toggle">+</span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── Contact / 聯絡資訊 ────────────────────────────────
function Orgs() {
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">聯絡資訊 · Contact</span>
            <h2 style={{ marginTop: 14 }}>報名或洽詢，<br />隨時找得到我們。</h2>
          </div>
          <p>掃描報名 QR Code 或使用本頁報名表單，額滿為止。任何問題歡迎來電或來信。</p>
        </div>
        <div className="orgs">
          <div className="orgs-row">
            <div className="role">洽詢電話</div>
            <span className="org-badge solid">07-3814526 分機 15453</span>
            <span className="org-badge">高科大 教育推廣中心</span>
          </div>
          <div className="orgs-row">
            <div className="role">電子信箱</div>
            <span className="org-badge"><a href="mailto:md406md406@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>md406md406@gmail.com</a></span>
          </div>
          <div className="orgs-row">
            <div className="role">費用說明</div>
            <span className="org-badge solid">課程免費</span>
            <span className="org-badge">每人酌收 NT$3,500（教材設備使用費、耗材、午餐及保險費）</span>
          </div>
          <div className="orgs-row">
            <div className="role">活動地點</div>
            <span className="org-badge">國立高雄科技大學 建工校區</span>
          </div>
          <div className="orgs-row">
            <div className="role">主辦單位</div>
            <span className="org-badge">國立高雄科技大學 教育推廣中心</span>
          </div>
        </div>
      </div>
    </section>);

}

// expose globals (defensive — mirrors form.jsx pattern)
window.Nav = Nav; window.Hero = Hero; window.Highlights = Highlights;
window.About = About; window.Schedule = Schedule; window.Notes = Notes;
window.FAQ = FAQ; window.Orgs = Orgs;
