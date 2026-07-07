const fs = require('fs');
const file = 'src/app/app.routes.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /path: 'meu-casamento\/perfil',\ncanActivate: \[brideAuthGuard\],\nloadComponent: \(\) => import\('\.\/features\/meu-casamento\/pages\/bride-profile\/bride-profile\.component'\)\.then\(m => m\.BrideProfileComponent\)/,
  `path: 'meu-casamento/perfil',\nloadComponent: () => import('./features/meu-casamento/pages/bride-profile/bride-profile.component').then(m => m.BrideProfileComponent)`
);

fs.writeFileSync(file, code);
console.log('Updated app.routes.ts');
