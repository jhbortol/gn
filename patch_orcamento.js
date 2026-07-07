const fs = require('fs');
const file = 'src/app/features/meu-casamento/pages/meu-casamento-orcamento/meu-casamento-orcamento.component.ts';
let code = fs.readFileSync(file, 'utf8');

// Imports adicionais
code = code.replace(
  /import \{ BudgetItem \} from '\.\.\/\.\.\/meu-casamento\.models';/,
  `import { BudgetItem } from '../../meu-casamento.models';\nimport { BrideAuthService } from '../../../../core/services/bride-auth.service';\nimport { BrideLoginModalService } from '../../../../core/services/bride-login-modal.service';`
);

// Injecao
code = code.replace(
  /private readonly sync = inject\(MeuCasamentoSyncService\);/,
  `private readonly sync = inject(MeuCasamentoSyncService);\n  private readonly auth = inject(BrideAuthService);\n  private readonly loginModal = inject(BrideLoginModalService);`
);

// Modificando saveActiveItem
code = code.replace(
  /async saveActiveItem\(\): Promise<void> \{([\s\S]*?const currentItem = this\.store\.budget\(\)\.items\.find\(item => item\.id === this\.activeItemId\);\s*if \(\!currentItem\) return;\s*)/,
  `async saveActiveItem(): Promise<void> {$1
    const currentIsActive = currentItem.allocatedAmount > 0 || currentItem.spentAmount > 0;
    const itemsWithValues = this.store.budget().items.filter(i => i.allocatedAmount > 0 || i.spentAmount > 0).length;
    const nextAllocated = this.parseCurrencyInput(this.activeDraft.allocatedAmount);
    const nextSpent = this.parseCurrencyInput(this.activeDraft.spentAmount);
    const willBeActive = nextAllocated > 0 || nextSpent > 0;

    if (!currentIsActive && willBeActive && !this.auth.isLoggedIn && itemsWithValues >= 2) {
      const loggedIn = await this.loginModal.open({
        title: 'Controle total do seu investimento! 💰',
        message: 'Para garantir que você não perca os dados do seu orçamento caso saia desta tela, crie sua conta gratuita em 5 segundos. É rápido e você salva tudo na nuvem!',
        showContinueWithoutLogin: true
      });
      if (!loggedIn) {
        return;
      }
    }
`
);

fs.writeFileSync(file, code);
console.log('Updated orcamento');
