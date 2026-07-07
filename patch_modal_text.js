const fs = require('fs');
const path = './src/app/shared/bride-login-modal/bride-login-modal.component.ts';

let content = fs.readFileSync(path, 'utf8');

// The modal currently lost the title/message when we removed the left panel.
// The user says "Precisamos manter a mensagem de salvar na nuvem nessa tela de login ao atingir o limite"
// We need to re-add a header section at the top of the modal (above the tabs) that shows the title and message if they are provided, especially for the "limit reached" scenario.

const insertAfter = '<div class="w-full p-6 flex flex-col justify-between relative min-h-[450px]">';
const headerSection = `
          <!-- Header (Title & Message) -->
          <div *ngIf="options?.title || options?.message || message" class="mb-4 text-center mt-6">
            <h3 *ngIf="options?.title" class="text-lg font-serif font-bold text-rose-800 mb-1">{{ options?.title }}</h3>
            <p *ngIf="options?.message || message" class="text-sm text-gray-600">{{ options?.message || message }}</p>
          </div>
`;

content = content.replace(insertAfter, insertAfter + headerSection);

fs.writeFileSync(path, content);
console.log('Added header section to modal');
