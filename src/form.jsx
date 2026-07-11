/* global React */
// Multi-step registration form

const { useState: useStateF, useMemo: useMemoF, useRef: useRefF, useEffect: useEffectF } = React;

// Google Apps Script Web App endpoint — receives POST, writes to sheet, emails wilson
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9IwB6g7oSsB9TqDRQsNEapckwR1evxNtNWAsGrJlj0sWxylhkc-hXLQGD5LkrbLcXfA/exec';

const STEPS = [
  { id: 1, t: '學生資料',  en: 'STUDENT' },
  { id: 2, t: '家長 / 監護人',  en: 'GUARDIAN' },
  { id: 3, t: '健康聲明',  en: 'HEALTH' },
  { id: 4, t: '同意授權',  en: 'CONSENT' },
  { id: 5, t: '送出確認',  en: 'REVIEW' },
];

// 台灣身分證字號驗證（格式 + 檢查碼）
function isValidTwId(id) {
  if (!/^[A-Z][12]\d{8}$/.test(id)) return false;
  const map = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
  const n = map.indexOf(id[0]) + 10;
  const digits = [Math.floor(n / 10), n % 10, ...id.slice(1).split('').map(Number)];
  const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
  const sum = digits.reduce((acc, d, i) => acc + d * weights[i], 0);
  return sum % 10 === 0;
}

// 手寫簽名板（滑鼠 + 觸控）
function SignaturePad({ value, onChange, error }) {
  const canvasRef = useRefF(null);
  const drawing = useRefF(false);
  const hasInk = useRefF(false);

  useEffectF(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const w = c.offsetWidth, h = 160;
    c.width = w * dpr; c.height = h * dpr;
    c.style.height = h + 'px';
    const ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#16307E';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // 底線提示
    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath(); ctx.moveTo(20, h - 34); ctx.lineTo(w - 20, h - 34); ctx.stroke();
    ctx.restore();
  }, []);

  const pos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const down = (e) => {
    e.preventDefault();
    canvasRef.current.setPointerCapture(e.pointerId);
    drawing.current = true;
    const ctx = canvasRef.current.getContext('2d');
    const p = pos(e);
    ctx.beginPath(); ctx.moveTo(p.x, p.y);
  };
  const move = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const p = pos(e);
    ctx.lineTo(p.x, p.y); ctx.stroke();
    hasInk.current = true;
  };
  const up = (e) => {
    if (!drawing.current) return;
    drawing.current = false;
    if (hasInk.current) {
      // 縮小輸出，控制資料量（寬 320）
      const c = canvasRef.current;
      const out = document.createElement('canvas');
      const scale = 320 / c.width;
      out.width = 320; out.height = Math.round(c.height * scale);
      const octx = out.getContext('2d');
      octx.fillStyle = '#fff'; octx.fillRect(0, 0, out.width, out.height);
      octx.drawImage(c, 0, 0, out.width, out.height);
      onChange(out.toDataURL('image/jpeg', 0.8));
    }
  };
  const clear = () => {
    const c = canvasRef.current;
    const ctx = c.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.restore();
    // 重畫底線
    const w = c.offsetWidth, h = 160;
    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath(); ctx.moveTo(20, h - 34); ctx.lineTo(w - 20, h - 34); ctx.stroke();
    ctx.restore();
    hasInk.current = false;
    onChange('');
  };

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <label style={{ fontSize: 13.5, fontWeight: 800 }}>家長 / 監護人 親筆簽名 <span style={{ color: 'var(--accent)' }}>*</span></label>
        <button type="button" onClick={clear} style={{
          fontSize: 12, fontWeight: 700, padding: '4px 12px',
          background: 'transparent', border: '1.5px solid var(--ink)', borderRadius: 8, cursor: 'pointer'
        }}>清除重簽</button>
      </div>
      <canvas
        ref={canvasRef}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        style={{
          width: '100%', display: 'block',
          border: error ? '2px solid var(--accent)' : '2px solid var(--ink)',
          borderRadius: 12, background: '#fff',
          touchAction: 'none', cursor: 'crosshair'
        }} />
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
        請以手指（手機）或滑鼠（電腦）在框內簽名{value ? ' ✓ 已完成簽名' : ''}
      </div>
      {error && <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginTop: 4 }}>! {error}</div>}
    </div>
  );
}

function RegForm() {
  const [step, setStep] = useStateF(1);
  const [data, setData] = useStateF({
    // 1. student
    studentName: '', school: '', stage: '', grade: '', gender: '', birth: '', idNumber: '',
    // 2. guardian
    parentName: '', relation: '父親', phone: '', emergency: '', email: '',
    // 3. health
    allergies: [], allergyOther: '', diet: '無', special: '',
    // 4. consent
    photoConsent: '', termsAgree: false, signatureName: '', signatureImage: '',
    // misc
    notes: '',
  });
  const [errors, setErrors] = useStateF({});
  const [submitted, setSubmitted] = useStateF(false);
  const [submitting, setSubmitting] = useStateF(false);
  const [submitError, setSubmitError] = useStateF('');

  const set = (k) => (e) => {
    const v = e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    setData((d) => ({ ...d, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const toggleAllergy = (a) => {
    setData((d) => ({
      ...d,
      allergies: d.allergies.includes(a) ? d.allergies.filter((x) => x !== a) : [...d.allergies, a],
    }));
  };

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!data.studentName.trim()) e.studentName = '請填寫學生姓名';
      if (!data.school.trim()) e.school = '請填寫就讀學校';
      if (!data.stage) e.stage = '請選擇就學階段';
      if (!data.grade) e.grade = '請選擇年級';
      if (!data.gender) e.gender = '請選擇性別';
      if (!data.birth) e.birth = '請填寫生日';
      if (!data.idNumber.trim()) e.idNumber = '請填寫身分證字號（保險投保用）';
      else if (!isValidTwId(data.idNumber.trim().toUpperCase())) e.idNumber = '身分證字號格式或檢查碼不正確';
    } else if (s === 2) {
      if (!data.parentName.trim()) e.parentName = '請填寫家長姓名';
      if (!data.phone.match(/^\d{2,4}-?\d{6,8}$|^09\d{8}$/)) e.phone = '請填寫有效電話 (例 0912345678)';
      if (!data.emergency.match(/^\d{2,4}-?\d{6,8}$|^09\d{8}$/)) e.emergency = '請填寫有效緊急聯絡電話';
      if (data.email && !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = '電子郵件格式不正確';
    } else if (s === 4) {
      if (!data.photoConsent) e.photoConsent = '請選擇肖像權授權';
      if (!data.termsAgree) e.termsAgree = '請勾選同意活動規範';
      if (!data.signatureName.trim()) e.signatureName = '請輸入家長簽名';
      if (!data.signatureImage) e.signatureImage = '請於簽名板親筆簽名';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(5, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));
  const submit = async () => {
    if (submitting) return;
    setSubmitError('');
    setSubmitting(true);
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...data, refCode, batch: '第二梯 AIxSTEAM 科技探索營' })
      });
      // Apps Script with mode:'no-cors' returns an opaque response we can't read,
      // but the POST itself reaches the server. If the fetch didn't throw, treat as success.
      setSubmitted(true);
      document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      setSubmitError('送出失敗，請檢查網路連線後再試一次。若持續失敗請聯絡主辦單位。錯誤：' + (err && err.message || err));
      setSubmitting(false);
    }
  };
  const reset = () => {
    setStep(1);
    setSubmitted(false);
    setData({
      studentName: '', school: '', stage: '', grade: '', gender: '', birth: '', idNumber: '',
      parentName: '', relation: '父親', phone: '', emergency: '', email: '',
      allergies: [], allergyOther: '', diet: '無', special: '',
      photoConsent: '', termsAgree: false, signatureName: '', signatureImage: '',
      notes: '',
    });
  };

  const refCode = useMemoF(() => 'STEAM26B2-' + Math.random().toString(36).slice(2, 8).toUpperCase(), []);

  if (submitted) return <Success data={data} onReset={reset} refCode={refCode} />;

  return (
    <section id="register" style={{background: 'var(--soft-2)'}}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">立即報名 · Registration</span>
            <h2 style={{marginTop: 14}}>名額有限 · <span className="accent">額滿為止。</span></h2>
          </div>
          <p>請與家長或監護人一起填寫。完成送出後將收到參考編號，正式錄取通知將透過報名留存的聯絡方式發送。</p>
        </div>

        <div className="form-shell">
          <aside>
            <div className="steps">
              {STEPS.map((s) => (
                <div className={`step-item ${step === s.id ? 'active' : ''} ${step > s.id ? 'done' : ''}`} key={s.id}>
                  <div className="n">{step > s.id ? '✓' : s.id}</div>
                  <div>
                    <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--muted)'}}>{s.en}</div>
                    <div style={{fontSize: 14, fontWeight: step === s.id ? 800 : 600}}>{s.t}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card" style={{marginTop: 20, background: 'var(--paper)', padding: 18, fontSize: 13}}>
              <div className="mono" style={{fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em'}}>NEED HELP?</div>
              <div style={{fontWeight: 700, fontSize: 15, marginTop: 4}}>聯絡承辦窗口</div>
              <div style={{color: 'var(--muted)', marginTop: 6, lineHeight: 1.6}}>
                07-3814526 分機 15453（高科大 教育推廣中心）<div style={{marginTop: 4}}>md406md406@gmail.com</div>
              </div>
            </div>
          </aside>

          <div className="form-card">
            {step === 1 && <StepStudent data={data} set={set} errors={errors} />}
            {step === 2 && <StepGuardian data={data} set={set} errors={errors} />}
            {step === 3 && <StepHealth data={data} set={set} errors={errors} toggleAllergy={toggleAllergy} />}
            {step === 4 && <StepConsent data={data} set={set} errors={errors} />}
            {step === 5 && <StepReview data={data} refCode={refCode} />}

            {submitError && (
              <div style={{
                padding: '12px 14px', marginBottom: 12,
                background: 'rgba(255,92,57,.08)', border: '1.5px solid var(--accent)',
                borderRadius: 8, color: 'var(--accent)', fontSize: 13, lineHeight: 1.6
              }}>{submitError}</div>
            )}
            <div className="form-actions">
              <button className={`btn ghost ${step === 1 ? 'invisible' : ''}`} onClick={prev} style={{visibility: step === 1 ? 'hidden' : 'visible'}}>
                ← 上一步
              </button>
              <span className="form-progress">STEP {step} / {STEPS.length}</span>
              {step < 5
                ? <button className="btn" onClick={next}>下一步 →</button>
                : <button className="btn accent" onClick={submit} disabled={submitting}>{submitting ? '送出中…' : '送出報名 ✓'}</button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepHeader({ title, sub }) {
  return (
    <div style={{marginBottom: 24}}>
      <h3 style={{fontSize: 26}}>{title}</h3>
      {sub && <p style={{color: 'var(--muted)', marginTop: 6, fontSize: 14}}>{sub}</p>}
    </div>
  );
}

function Field({ label, req, error, hint, children }) {
  return (
    <div className={`field ${error ? 'error' : ''}`}>
      <label>{label} {req && <span className="req">*</span>}</label>
      {children}
      {hint && !error && <div className="hint">{hint}</div>}
      {error && <div className="err">! {error}</div>}
    </div>
  );
}

function ChoicePill({ value, current, onClick, children }) {
  const selected = value === current;
  return (
    <button type="button" className={`choice ${selected ? 'selected' : ''}`} onClick={() => onClick(value)}>
      {children}
    </button>
  );
}

// Step 1
function StepStudent({ data, set, errors }) {
  return (
    <>
      <StepHeader title="① 學生資料" sub="請填寫即將參加營隊的學生個人資料" />
      <Field label="學生姓名" req error={errors.studentName}>
        <input type="text" value={data.studentName} onChange={set('studentName')} placeholder="例：王小明" />
      </Field>
      <Field label="就讀學校" req error={errors.school} hint="請填寫完整校名，例：高雄市立○○國中">
        <input type="text" value={data.school} onChange={set('school')} placeholder="例：國立○○高中 / ○○國中 / ○○國小" />
      </Field>
      <div className="field-row">
        <Field label="就學階段" req error={errors.stage}>
          <div className="choices">
            {['國小', '國中', '高中'].map((st) => (
              <ChoicePill key={st} value={st} current={data.stage} onClick={(v) => { set('stage')(v); set('grade')(''); }}>{st}</ChoicePill>
            ))}
          </div>
        </Field>
        <Field label="年級（升學後）" req error={errors.grade} hint="請以 115 學年度（今年 9 月後）就讀年級為準">
          <select value={data.grade} onChange={set('grade')}>
            <option value="">— 請選擇 —</option>
            {(data.stage === '國小' ? ['一年級', '二年級', '三年級', '四年級', '五年級', '六年級']
              : data.stage === '國中' ? ['國一', '國二', '國三']
              : data.stage === '高中' ? ['高一', '高二', '高三']
              : []).map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </Field>
      </div>
      <div className="field-row">
        <Field label="性別" req error={errors.gender}>
          <div className="choices">
            <ChoicePill value="男" current={data.gender} onClick={set('gender')}>男</ChoicePill>
            <ChoicePill value="女" current={data.gender} onClick={set('gender')}>女</ChoicePill>
            <ChoicePill value="其他" current={data.gender} onClick={set('gender')}>其他 / 不公開</ChoicePill>
          </div>
        </Field>
        <Field label="出生年月日" req error={errors.birth} hint="用於緊急聯絡與保險建檔">
          <input type="date" value={data.birth} onChange={set('birth')} />
        </Field>
      </div>
      <Field label="身分證字號" req error={errors.idNumber} hint="營隊將為學員投保保險，身分證字號僅用於保險建檔與身分核對，不作其他用途">
        <input
          type="text"
          value={data.idNumber}
          onChange={(e) => set('idNumber')({ target: { value: e.target.value.toUpperCase() } })}
          placeholder="例：A123456789"
          maxLength={10}
          style={{ fontFamily: 'var(--font-mono)', letterSpacing: '.08em' }} />
      </Field>
    </>
  );
}

// Step 2
function StepGuardian({ data, set, errors }) {
  return (
    <>
      <StepHeader title="② 家長 / 監護人資料" sub="本欄位將用於營隊期間的聯繫與緊急通知" />
      <div className="field-row">
        <Field label="家長 / 監護人姓名" req error={errors.parentName}>
          <input type="text" value={data.parentName} onChange={set('parentName')} placeholder="例：王大明" />
        </Field>
        <Field label="與學生關係">
          <select value={data.relation} onChange={set('relation')}>
            <option>父親</option><option>母親</option><option>祖父母</option><option>監護人</option><option>其他</option>
          </select>
        </Field>
      </div>
      <div className="field-row">
        <Field label="主要聯絡電話" req error={errors.phone} hint="行動電話或市話皆可">
          <input type="tel" value={data.phone} onChange={set('phone')} placeholder="例：0912345678" />
        </Field>
        <Field label="緊急聯絡電話" req error={errors.emergency} hint="與主要聯絡人不同者佳">
          <input type="tel" value={data.emergency} onChange={set('emergency')} placeholder="例：07-1234567" />
        </Field>
      </div>
      <Field label="電子郵件" error={errors.email} hint="錄取通知將寄送至此信箱">
        <input type="email" value={data.email} onChange={set('email')} placeholder="例：parent@example.com" />
      </Field>
    </>
  );
}

// Step 3
function StepHealth({ data, set, errors, toggleAllergy }) {
  const allergyOpts = ['花生 / 堅果', '海鮮', '蛋', '乳製品', '麩質', '氣喘', '癲癇', '心臟病', '無'];
  return (
    <>
      <StepHeader title="③ 健康聲明" sub="本資料僅供工作人員提供必要協助，不會公開" />
      <Field label="飲食限制" hint="提供午餐時將依此調整">
        <div className="choices">
          {['無', '素食', '蛋奶素', '不吃牛 / 豬', '其他'].map((d) => (
            <ChoicePill key={d} value={d} current={data.diet} onClick={set('diet')}>{d}</ChoicePill>
          ))}
        </div>
      </Field>
      <Field label="過敏史 / 特殊疾病" hint="可複選；如無請選「無」">
        <div className="choices">
          {allergyOpts.map((a) => (
            <button
              type="button"
              key={a}
              className={`choice ${data.allergies.includes(a) ? 'selected' : ''}`}
              onClick={() => toggleAllergy(a)}
            >{a}</button>
          ))}
        </div>
      </Field>
      {data.allergies.length > 0 && data.allergies[0] !== '無' && (
        <Field label="過敏 / 疾病補充說明" hint="例：花生過敏，避免任何含花生製品；嚴重時需用藥">
          <textarea rows="3" value={data.allergyOther} onChange={set('allergyOther')} />
        </Field>
      )}
      <Field label="其他需告知工作人員的事項" hint="如：服藥需求、特殊身心狀況、肢體不便等">
        <textarea rows="3" value={data.special} onChange={set('special')} placeholder="如無請留空" />
      </Field>
    </>
  );
}

// Step 4
function StepConsent({ data, set, errors }) {
  return (
    <>
      <StepHeader title="④ 同意授權" sub="完成下列同意項目後即可送出報名" />
      <div className="consent">
        <input type="checkbox" id="photo-yes" name="photo" checked={data.photoConsent === 'yes'} onChange={() => set('photoConsent')('yes')} />
        <label htmlFor="photo-yes">
          <strong>肖像權同意：</strong> 同意活動期間拍攝與錄影之相關影像，得作為活動紀錄、宣傳及成果報告使用。
        </label>
      </div>
      <div className="consent">
        <input type="checkbox" id="photo-no" name="photo" checked={data.photoConsent === 'no'} onChange={() => set('photoConsent')('no')} />
        <label htmlFor="photo-no">
          <strong>僅供內部紀錄：</strong> 不同意公開使用學員影像，主辦單位將於拍攝時迴避並妥善處理該名學員之影像紀錄。
        </label>
      </div>
      {errors.photoConsent && <div className="err" style={{marginTop: -4, marginBottom: 14, fontSize: 12, color: 'var(--accent)', fontWeight: 600}}>! {errors.photoConsent}</div>}

      <div className="consent" style={{background: 'var(--soft-1)', borderStyle: 'solid'}}>
        <input type="checkbox" id="terms" checked={data.termsAgree} onChange={set('termsAgree')} />
        <label htmlFor="terms" style={{lineHeight: 1.6}}>
          <strong>本人已詳閱並同意活動規範：</strong> 包括學員注意事項、健康聲明真實性、不可抗力因素之調整、以及主辦單位視實際狀況調整課程之權利。
        </label>
      </div>
      {errors.termsAgree && <div className="err" style={{marginTop: -4, marginBottom: 14, fontSize: 12, color: 'var(--accent)', fontWeight: 600}}>! {errors.termsAgree}</div>}

      <Field label="家長 / 監護人 姓名（正楷）" req error={errors.signatureName} hint="請輸入家長 / 監護人之全名">
        <input type="text" value={data.signatureName} onChange={set('signatureName')} placeholder="輸入您的全名" style={{fontSize: 18}} />
      </Field>

      <SignaturePad
        value={data.signatureImage}
        onChange={(v) => set('signatureImage')({ target: { value: v } })}
        error={errors.signatureImage} />
    </>
  );
}

// Step 5
function StepReview({ data, refCode }) {
  const items = [
    ['學生姓名', data.studentName],
    ['就讀學校', `${data.school}（${data.stage}）`],
    ['年級 / 性別', `${data.grade} · ${data.gender}`],
    ['出生年月日', data.birth],
    ['身分證字號', data.idNumber ? data.idNumber.slice(0, 3) + '****' + data.idNumber.slice(-3) : ''],
    ['家長姓名', `${data.parentName}（${data.relation}）`],
    ['主要聯絡', data.phone],
    ['緊急聯絡', data.emergency],
    ['電子郵件', data.email || '（未填寫）'],
    ['飲食限制', data.diet],
    ['過敏 / 疾病', data.allergies.length ? data.allergies.join('、') : '無'],
    ['其他事項', data.special || '無'],
    ['肖像權', data.photoConsent === 'yes' ? '同意公開使用' : '僅供內部紀錄'],
    ['家長簽名', data.signatureName + (data.signatureImage ? '（已親筆簽名 ✓）' : '')],
  ];
  return (
    <>
      <StepHeader title="⑤ 送出確認" sub="請最後檢視您填寫的內容，確認無誤後送出" />
      <div className="card" style={{background: 'var(--bg)', padding: 0, border: '1.5px solid var(--line)', boxShadow: 'none'}}>
        <div style={{padding: '16px 22px', borderBottom: '1.5px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontWeight: 800}}>報名摘要</div>
          <span className="mono" style={{fontSize: 12, color: 'var(--muted)'}}>REF · {refCode}</span>
        </div>
        <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 14}}>
          <tbody>
            {items.map(([k, v]) => (
              <tr key={k}>
                <td style={{padding: '12px 22px', color: 'var(--muted)', width: 140, borderBottom: '1px solid var(--line)'}}>{k}</td>
                <td style={{padding: '12px 22px', fontWeight: 600, borderBottom: '1px solid var(--line)'}}>{v || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{marginTop: 16, padding: '14px 18px', background: 'var(--soft-1)', border: '1.5px dashed var(--ink)', borderRadius: 10, fontSize: 13, lineHeight: 1.6}}>
        <strong>報名截止：115年7月22日（星期三）</strong>，額滿為止，逾期恕不受理。<br />
        <strong>提醒：</strong>課程免費，每人僅酌收 NT$3,500（三日教材設備使用費、設備耗材、午餐及保險費）。送出後將以報名順序辦理錄取，名額有限、額滿為止，繳費方式將於錄取通知中說明。
        正式錄取通知將透過您留存的聯絡方式發送，請留意來電與簡訊。
      </div>
    </>
  );
}

function Success({ data, onReset, refCode }) {
  return (
    <section id="register" style={{background: 'var(--soft-4)'}}>
      <div className="container">
        <div className="card" style={{maxWidth: 640, margin: '0 auto', padding: '48px 32px', textAlign: 'center'}}>
          <div className="success">
            <div className="mark">✓</div>
            <div className="eyebrow" style={{justifyContent: 'center', display: 'flex'}}>REGISTRATION RECEIVED</div>
            <h3 style={{marginTop: 12}}>報名已送出！</h3>
            <p style={{color: 'var(--muted)', marginTop: 8, fontSize: 15}}>
              感謝 {data.parentName} 為 <strong style={{color: 'var(--ink)'}}>{data.studentName}</strong> 完成報名。<br />
              我們將依報名順序與資格審核辦理錄取，名額有限敬請耐心等候。
            </p>
            <div className="ref">參考編號 · {refCode}</div>
            <div style={{display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap'}}>
              <button className="btn" onClick={() => window.print()}>列印報名摘要</button>
              <button className="btn ghost" onClick={onReset}>再填一份</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.RegForm = RegForm;
