const fs = require('fs');
const file = 'src/app/features/meu-casamento/pages/meu-casamento-orcamento/meu-casamento-orcamento.component.css';
let content = fs.readFileSync(file, 'utf8');

// I accidentally replaced it in two places which might add too much padding.
// I'll revert .bottom-sheet to 1rem + safe-area since I added padding to .sheet-footer
content = content.replace(
  'padding: 0.8rem 1rem calc(5rem + env(safe-area-inset-bottom, 0));',
  'padding: 0.8rem 1rem calc(1rem + env(safe-area-inset-bottom, 0));'
);

fs.writeFileSync(file, content);
