# CLAUDE.md — 營隊報名網站範本操作手冊

本 repo 是「營隊報名網站」的**可複製範本**（第二梯 AI x STEAM 科技探索營為現行實例）。
完整建站流程見 camp-site-generator skill（SKILL.md / INTAKE.md / CHECKS.md / FLYER.md）。
以下是針對「這個 repo」的操作重點。

## 架構
純靜態，無 build step。React 18（CDN production）+ @babel/standalone 瀏覽器端編譯 JSX。
推 main → Cloudflare Pages 自動部署（1–2 分鐘）。

## 檔案職責
| 檔案 | 內容 | 換營隊時 |
|---|---|---|
| index.html | meta/OG/favicon/載入順序 | 改 title、description |
| styles.css | 設計系統 | 不動 |
| tweaks-panel.jsx | 調色面板 | 不動 |
| src/app.jsx | 區塊順序、倒數日期、Footer | 改日期與文案 |
| src/sections.jsx | Nav/Hero/特色/課程表/注意/FAQ/聯絡 | 全部換內容 |
| src/energy.jsx, driving.jsx | 主題深入區塊 | 依主題重寫或移除 |
| src/form.jsx | 報名表單 | 改端點/批次/欄位 |
| src/robot.jsx | 吉祥物動畫 | 可留用 |

## 修改守則
1. **hooks 別名**：各 jsx 檔在全域 sloppy eval 下共享作用域，React hooks 解構必須取不同別名
   （sections 用原名、app 用 useE/useS、form 用 useStateF、energy 用 useSE、driving 用 useSD）。
   新增檔案時比照辦理，否則 const 重複宣告會整站白屏。
2. **課程日對調**要同步五處：SCHEDULE 內容、tabs 標籤、Hero mini-hud、主題區「DAY N」eyebrow、每日「明日提醒」rows。
3. **日期星期**改動前先 `python3 -c "import datetime; ..."` 驗證。
4. **表單欄位**新增後，`body: JSON.stringify({...data, ...})` 會自動帶上，但 Apps Script 後端
   不一定會寫進 Sheet——改完必送測試報名驗證。
5. 報名表單重要常數：`APPS_SCRIPT_URL`、`batch:` 梯次標記、refCode 前綴（本梯 STEAM26B2-）。

## 推送前必跑
```bash
npm i -D @babel/core @babel/preset-env @babel/preset-react react react-dom
node scripts/babel-check.js
node scripts/ssr-check.js "科技探索營" "7月 29 日" "NT$3,500" "07-3814526" "md406md406@gmail.com"
```
兩者 exit 0 才能 push。

## 部署資訊（本實例）
- Repo：exhakuoho/aisteam-camp2（branch: main）
- 網址：https://aisteam-camp2.pages.dev
- 報名 QR 指向：https://aisteam-camp2.pages.dev/#register
- 後端：Google Apps Script（URL 在 src/form.jsx 開頭）→ Google Sheet + email 通知
- ⚠️ Sheet 含身分證等個資，共用權限務必收斂

## 快速任務對照
- 改文字/日期/費用 → 對應 jsx 改字串 → 跑兩支 check → push
- 加表單欄位 → form.jsx：state 初始化（兩處）→ validate → Step UI → Review → 測試報名
- 換報名端點 → form.jsx 的 APPS_SCRIPT_URL
- 產 QR / 換傳單 QR → 見 skill 的 FLYER.md
