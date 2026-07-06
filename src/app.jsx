/* global React, ReactDOM, Nav, Hero, Highlights, About, Schedule, EnergyLab, DrivingSchool, Notes, FAQ, Orgs, RegForm,
   TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor, TweakSelect, useTweaks */

const { useEffect: useE, useState: useS } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "sunshine",
  "density": "regular",
  "mascot": true,
  "heroAccent": "underline"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to the document
  useE(() => {
    document.documentElement.dataset.palette = t.palette;
    document.documentElement.dataset.density = t.density;
    document.documentElement.dataset.mascot = t.mascot ? 'on' : 'off';
  }, [t.palette, t.density, t.mascot]);

  // Countdown to July 29
  const daysLeft = (() => {
    const camp = new Date('2026-07-29T08:30:00+08:00');
    const now = new Date();
    const diff = Math.max(0, Math.ceil((camp - now) / 86400000));
    return diff;
  })();

  const jump = (id) => {
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Nav daysLeft={daysLeft} onJump={jump} />
      <Hero onRegister={() => jump('register')} />
      <Highlights />
      <About />
      <Schedule />
      <EnergyLab />
      <DrivingSchool />
      <Notes />
      <FAQ />
      <Orgs />
      <RegForm />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color palette" />
        <TweakColor
          label="主題色盤"
          value={t.palette === 'sunshine' ? ['#FFD23F', '#FF5C39', '#2154F0'] :
                 t.palette === 'ocean'    ? ['#2EC4FF', '#FF6FB8', '#1135A8'] :
                 t.palette === 'lab'      ? ['#C7FF3E', '#FF2E63', '#1B1F26'] :
                                            ['#FFCE3A', '#FF6F61', '#15131F']}
          options={[
            ['#FFD23F', '#FF5C39', '#2154F0'],
            ['#2EC4FF', '#FF6FB8', '#1135A8'],
            ['#C7FF3E', '#FF2E63', '#1B1F26'],
            ['#FFCE3A', '#FF6F61', '#15131F'],
          ]}
          onChange={(arr) => {
            const idx = ['#FFD23F', '#2EC4FF', '#C7FF3E', '#FFCE3A'].indexOf(arr[0]);
            const palettes = ['sunshine', 'ocean', 'lab', 'dusk'];
            setTweak('palette', palettes[idx] || 'sunshine');
          }}
        />
        <TweakRadio
          label="細部選擇"
          value={t.palette}
          options={['sunshine', 'ocean', 'lab', 'dusk']}
          onChange={(v) => setTweak('palette', v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="留白密度"
          value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)}
        />

        <TweakSection label="Mascot" />
        <TweakToggle
          label="機器人車動畫"
          value={t.mascot}
          onChange={(v) => setTweak('mascot', v)}
        />
      </TweaksPanel>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 24, flexWrap: 'wrap'}}>
          <div style={{maxWidth: 560}}>
            <span className="eyebrow" style={{color: 'var(--bg)'}}>準備好了嗎？</span>
            <h3 style={{marginTop: 12}}>三天動手玩科技，<br />探索 AI、能源與駕駛體驗。</h3>
            <p style={{color: 'rgba(255,255,255,.7)', marginTop: 14, fontSize: 15}}>
              課程免費 · 每人僅酌收 NT$3,500（教材設備、耗材、午餐及保險）· 名額有限！
            </p>
          </div>
          <button className="btn" onClick={() => document.getElementById('register')?.scrollIntoView({behavior: 'smooth', block: 'start'})}>
            前往報名 →
          </button>
        </div>

        <div className="footer-grid">
          <div>
            <div style={{fontWeight: 800, fontSize: 17, marginBottom: 12}}>第二梯 暑期營隊</div>
            <div style={{color: 'rgba(255,255,255,.65)', fontSize: 14, lineHeight: 1.7}}>
              AI x STEAM 科技探索營<br />
              7 月 29 日（三）至 7 月 31 日（五）· 每日 08:30–16:00<br />
              國立高雄科技大學 建工校區<br />課程免費 · 酌收費用 NT$3,500 / 人
            </div>
          </div>
          <div>
            <div style={{fontWeight: 800, fontSize: 14, marginBottom: 10}}>快速連結</div>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14}}>
              <li><a href="#about">營隊特色</a></li>
              <li><a href="#schedule">三日課程</a></li>
              <li><a href="#energy">能源實驗</a></li>
              <li><a href="#driving">駕訓挑戰</a></li>
              <li><a href="#register">立即報名</a></li>
            </ul>
          </div>
          <div>
            <div style={{fontWeight: 800, fontSize: 14, marginBottom: 10}}>聯絡資訊</div>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'rgba(255,255,255,.7)'}}>
              <li>07-3814526 分機 15453</li>
              <li>高科大 教育推廣中心</li>
              <li>md406md406@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-fineprint">
          <div>© 2026 NKUST · AI×STEAM CAMP · BATCH 02</div>
          <div>本簡章如有未盡事宜，得由主辦單位視實際狀況調整之</div>
        </div>
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
