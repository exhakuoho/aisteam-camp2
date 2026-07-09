// 用法: npm i -D @babel/core @babel/preset-env @babel/preset-react react react-dom
//       node scripts/ssr-check.js "營名" "7月 29 日" "NT$3,500" "07-3814526"
const babel = require('@babel/core'); const fs = require('fs');
const React = require('react'); const RD = require('react-dom/server');
global.window = {storage:{},scrollTo(){},print(){},location:{search:''},addEventListener(){},
  matchMedia:()=>({matches:false,addEventListener(){}}),devicePixelRatio:1};
global.document = {documentElement:{dataset:{}},getElementById:()=>null,querySelector:()=>null,
  querySelectorAll:()=>[],addEventListener(){},removeEventListener(){},
  createElement:()=>({style:{},setAttribute(){},appendChild(){},getContext:()=>({})}),
  body:{appendChild(){}}};
global.localStorage = {getItem:()=>null,setItem(){},removeItem(){}};
global.React = React;
global.ReactDOM = {createRoot:()=>({render(el){global.__APP__=el;}})};
const files = ['tweaks-panel.jsx','src/robot.jsx','src/sections.jsx',
               'src/energy.jsx','src/driving.jsx','src/form.jsx','src/app.jsx'];
let code = '';
for (const f of files)
  code += babel.transformSync(fs.readFileSync(f,'utf8'),
    {presets:[['@babel/preset-env',{modules:false}],['@babel/preset-react',{runtime:'classic',development:false}]],
     filename:f, sourceType:'script'}).code + '\n';
(0, eval)(code);
const html = RD.renderToString(global.__APP__);
console.log('rendered length:', html.length);
const keys = process.argv.slice(2);
let ok = true;
for (const k of keys) {
  const hit = html.includes(k);
  if (!hit) ok = false;
  console.log(hit ? '✓' : '✗ MISSING', k);
}
process.exit(ok ? 0 : 1);
