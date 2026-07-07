const fs = require('fs');

const file = 'src/app/features/meu-casamento/pages/meu-casamento-orcamento/meu-casamento-orcamento.component.css';
let content = fs.readFileSync(file, 'utf8');

// The .bottom-sheet currently has:
// padding: 0.8rem 1rem calc(1rem + env(safe-area-inset-bottom, 0));
// We need to increase the bottom padding to accommodate the bottom nav.

content = content.replace(
  'padding: 0.8rem 1rem calc(1rem + env(safe-area-inset-bottom, 0));',
  'padding: 0.8rem 1rem calc(5rem + env(safe-area-inset-bottom, 0));'
);

// We should also check if the modal scroll needs adjustment if the bottom nav overlaps.
// Let's also check .sheet-footer
content = content.replace(
  'padding-bottom: env(safe-area-inset-bottom, 0);',
  'padding-bottom: calc(5rem + env(safe-area-inset-bottom, 0));'
);


fs.writeFileSync(file, content);
console.log('Orcamento patched.');
