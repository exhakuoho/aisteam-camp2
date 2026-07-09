// 用法: npm i -D @babel/core @babel/preset-env @babel/preset-react && node scripts/babel-check.js
const babel = require('@babel/core'); const fs = require('fs');
const files = ['tweaks-panel.jsx','src/robot.jsx','src/sections.jsx',
               'src/energy.jsx','src/driving.jsx','src/form.jsx','src/app.jsx'];
let ok = true;
for (const f of files) {
  try {
    babel.transformSync(fs.readFileSync(f,'utf8'),
      {presets:['@babel/preset-env',['@babel/preset-react',{runtime:'classic',development:false}]], filename:f});
    console.log('✓', f);
  } catch(e) { ok = false; console.log('✗', f, e.message.split('\n')[0]); }
}
process.exit(ok ? 0 : 1);
