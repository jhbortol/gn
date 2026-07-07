const fs = require('fs');

const file = 'src/app/features/meu-casamento/pages/meu-casamento-convidados/meu-casamento-convidados.component.css';
let content = fs.readFileSync(file, 'utf8');

// The .form-modal has padding? No, let's look at the HTML structure to see where padding is needed
// The .modal-overlay has padding: 1rem;
// The .form-modal is the container.
// We want the modal itself to have space at the bottom or the actions-row to have bottom padding.

content = content.replace(
  '.form-modal {\n  width: min(760px, 100%);\n  max-height: calc(100vh - 2rem);\n  overflow: auto;\n}',
  '.form-modal {\n  width: min(760px, 100%);\n  max-height: calc(100vh - 2rem);\n  overflow: auto;\n  padding-bottom: 5rem;\n}'
);


fs.writeFileSync(file, content);
console.log('Convidados patched.');
