const fs = require('fs');
const file = 'src/app/features/meu-casamento/pages/meu-casamento-cronograma/meu-casamento-cronograma.component.ts';
let code = fs.readFileSync(file, 'utf8');

// Adicionar os imports necessarios
code = code.replace(
  /import \{ ChecklistTaskDefinition, WEDDING_CHECKLIST_TASKS \} from '\.\.\/\.\.\/meu-casamento\.models';/,
  `import { ChecklistTaskDefinition, WEDDING_CHECKLIST_TASKS } from '../../meu-casamento.models';\nimport { BrideAuthService } from '../../../../core/services/bride-auth.service';\nimport { BrideLoginModalService } from '../../../../core/services/bride-login-modal.service';`
);

// Injetar dependências
code = code.replace(
  /private readonly cidade   = inject\(CidadeService\);/,
  `private readonly cidade   = inject(CidadeService);\n  private readonly auth     = inject(BrideAuthService);\n  private readonly loginModal = inject(BrideLoginModalService);`
);

// Atualizar toggleTask
code = code.replace(
  /async toggleTask\(taskId: string, checked: boolean\): Promise<void> \{[\s\S]*?await this\.sync\.syncPendingChanges\(\);\n\s*\}/,
  `async toggleTask(taskId: string, checked: boolean): Promise<void> {
    if (checked && !this.auth.isLoggedIn && this.completedCount() >= 2) {
      const loggedIn = await this.loginModal.open({
        title: 'Seu cronograma está ganhando forma! 💖',
        message: 'Para garantir que você não perca seu progresso caso saia desta tela, crie sua conta gratuita em 5 segundos. É rápido e você salva tudo na nuvem!',
        showContinueWithoutLogin: true
      });
      if (!loggedIn) {
        return;
      }
    }
    this.store.setChecklistTask(taskId, checked);
    await this.sync.syncPendingChanges();
  }`
);

fs.writeFileSync(file, code);
console.log('Updated cronograma');
