const fs = require('fs');
const file = 'src/app/app.html';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /<app-bride-login-modal \(close\)="loginModalService\.close\(\)"><\/app-bride-login-modal>/,
  '<app-bride-login-modal [options]="loginModalService.getOptions() || {}" (close)="loginModalService.close($event)"></app-bride-login-modal>'
);

fs.writeFileSync(file, code);
console.log('Updated app.html');
