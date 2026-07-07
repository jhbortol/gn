const fs = require('fs');
const path = './src/app/shared/bride-login-modal/bride-login-modal.component.ts';

let content = fs.readFileSync(path, 'utf8');

// 1. Change the main container classes
content = content.replace(
  '<div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex overflow-hidden relative z-50">',
  '<div class="bg-white w-full max-w-md max-h-[90vh] rounded-2xl shadow-2xl flex overflow-y-auto relative z-50">'
);

// 2. Remove the Left Panel (we use a regex to match from <!-- Left Panel: ... to the end of the div, before <!-- Right Panel:)
const leftPanelRegex = /<!-- Left Panel:[\s\S]*?<!-- Right Panel:/;
content = content.replace(leftPanelRegex, '<!-- Right Panel:');

// 3. Update the Right Panel classes (remove w-full md:w-1/2 p-6 md:p-8, replace with w-full p-6 md:p-8)
content = content.replace(
  '<div class="w-full md:w-1/2 p-6 md:p-8">',
  '<div class="w-full p-6 md:p-8">'
);

fs.writeFileSync(path, content);
console.log('Patched bride-login-modal.component.ts');
