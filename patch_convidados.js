const fs = require('fs');
const file = 'src/app/features/meu-casamento/pages/meu-casamento-convidados/meu-casamento-convidados.component.ts';
let code = fs.readFileSync(file, 'utf8');

// Imports adicionais
code = code.replace(
  /import \{ GuestItem \} from '\.\.\/\.\.\/meu-casamento\.models';/,
  `import { GuestItem } from '../../meu-casamento.models';\nimport { BrideAuthService } from '../../../../core/services/bride-auth.service';\nimport { BrideLoginModalService } from '../../../../core/services/bride-login-modal.service';`
);

// Injecao
code = code.replace(
  /private readonly sync = inject\(MeuCasamentoSyncService\);/,
  `private readonly sync = inject(MeuCasamentoSyncService);\n  private readonly auth = inject(BrideAuthService);\n  private readonly loginModal = inject(BrideLoginModalService);`
);

// Modificando saveGuest
code = code.replace(
  /async saveGuest\(\): Promise<void> \{[\s\S]*?await this\.sync\.syncPendingChanges\(\);\n\s*\}/,
  `async saveGuest(): Promise<void> {
    if (!this.draft.name.trim()) return;

    if (!this.editingId && !this.auth.isLoggedIn && this.store.guests().length >= 2) {
      const loggedIn = await this.loginModal.open({
        title: 'Sua lista está ficando incrível! 💖',
        message: 'Para garantir que você não perca nenhum dado caso saia desta tela, crie sua conta gratuita em 5 segundos. É rápido e você salva tudo na nuvem!',
        showContinueWithoutLogin: true
      });
      if (!loggedIn) {
        return;
      }
    }

    const id = this.editingId ?? crypto.randomUUID();
    this.store.saveGuest({
      id,
      name: this.draft.name,
      group: this.draft.group,
      status: this.draft.status,
      plusOnes: this.draft.plusOnes,
      phone: this.draft.phone,
      notes: this.draft.notes
    });
    this.resetDraft();
    this.showFormModal = false;
    await this.sync.syncPendingChanges();
  }`
);

fs.writeFileSync(file, code);
console.log('Updated convidados');
