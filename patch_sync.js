const fs = require('fs');
const file = 'src/app/features/meu-casamento/services/meu-casamento-sync.service.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /this\.auth\.isLoggedIn\$\.subscribe\(\(isLoggedIn\) => \{\n\s*if \(!isLoggedIn\) \{\n\s*console\.log\('\[MeuCasamentoSync\] User logged out\. Clearing local store data\.'\);\n\s*this\.store\.resetLocalData\(\);\n\s*\}\n\s*\}\);/,
  `this.auth.isLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        console.log('[MeuCasamentoSync] User logged out. Clearing local store data.');
        this.store.resetLocalData();
      } else {
        if (this.isBrowser) {
          this.handlePostLoginSync();
        }
      }
    });`
);

code = code.replace(
  /private async processPendingDeleteIntent\(\)/,
  `private async handlePostLoginSync() {
    if (!navigator.onLine) return;

    const hasPendingChanges = this.store.state().syncQueue.length > 0;

    try {
      // Verifica se existem dados no servidor
      const remoteProfile = await this.withRetry('check-remote', () => firstValueFrom(this.api.getWeddingProfile()));
      const hasRemoteData = remoteProfile && (remoteProfile.brideFirstName || remoteProfile.weddingDate);

      if (hasRemoteData && hasPendingChanges) {
        // Conflito: existem dados na nuvem E alteracoes locais
        const confirmOverwrite = window.confirm(
          "Encontramos dados salvos anteriormente na sua conta. Deseja sobrescrever seus dados locais atuais com os dados da nuvem? Clique em 'OK' para usar os dados da nuvem, ou 'Cancelar' para enviar seus dados atuais para a nuvem."
        );
        if (confirmOverwrite) {
          await this.forceSyncFromServer();
          return;
        }
      } else if (hasRemoteData && !hasPendingChanges) {
        // Nuvem tem dados, local nao tem alteracoes: puxa da nuvem
        await this.forceSyncFromServer();
        return;
      }

      // Sem dados na nuvem, ou usuario escolheu manter locais: sobe os dados locais
      await this.syncPendingChanges();
    } catch (e) {
      console.warn('[MeuCasamentoSync] Erro ao verificar dados remotos após login', e);
      // Fallback: tentar sincronizar alterações pendentes
      await this.syncPendingChanges();
    }
  }

  private async processPendingDeleteIntent()`
);

fs.writeFileSync(file, code);
console.log('Updated sync');
