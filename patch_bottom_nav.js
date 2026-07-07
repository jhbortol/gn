const fs = require('fs');
const file = 'src/app/shared/bottom-nav/bottom-nav.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /handleNav\(event: Event, path: string\) \{[\s\S]*?\n\s*\}/,
  `handleNav(event: Event, path: string) {
    if (this.authService.isLoggedIn) {
      console.log(\`[BottomNav] Navegando para \${path} - Iniciando sincronização da funcionalidade (push + pull local)...\`);
      void (async () => {
        await this.syncService.syncPendingChanges();
        await this.syncService.syncFeatureFromServer(path);
      })();
    }
  }`
);

fs.writeFileSync(file, code);
console.log('Updated bottom-nav.ts');
