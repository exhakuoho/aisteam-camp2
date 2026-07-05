# 第二梯暑期營隊 · AI x STEAM 科技探索營

AI + 程式語言探索 × 能源探索：氫與電 × 自走車小小駕訓班 — 三日營隊（2026/7/29–7/31）報名頁面。

**Live**：透過 Cloudflare Pages 自動部署。

## 開發

純靜態頁，無 build step。建議透過本機 server 預覽（例如 `python -m http.server`）。

技術：React 18 (production CDN) + @babel/standalone（瀏覽器端編譯 JSX）+ 純 CSS。

## 檔案結構

- `index.html` — 進入點
- `styles.css` — 全站樣式（沿用第一梯 design tokens、palette、響應式）
- `tweaks-panel.jsx` — 設計師調色面板（生產環境會自動隱藏）
- `src/app.jsx` — 根元件
- `src/sections.jsx` — Nav / Hero / Highlights / About / Schedule / Notes / FAQ / Contact
- `src/energy.jsx` — Day 2 能源探索：氫與電（電解示意圖、實驗卡、氫氣光譜、SDGs）
- `src/driving.jsx` — Day 3 自走車小小駕訓班（駕訓路線圖、闖關項目、七大獎項）
- `src/form.jsx` — 5 步驟報名表單（國小／國中／高中）
- `src/robot.jsx` — 機器人車 SVG 動畫

## Cloudflare Pages 設定

- Build command：留空
- Build output directory：`/`
- Production branch：`main`

每次 push 到 `main` 自動部署。
