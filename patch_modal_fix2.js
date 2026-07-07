const fs = require('fs');
const path = './src/app/shared/bride-login-modal/bride-login-modal.component.ts';

let content = fs.readFileSync(path, 'utf8');

const regex = /<!-- Left Side: Features List -->[\s\S]*?<!-- Right Side: Forms -->/;
content = content.replace(regex, '<!-- Right Side: Forms -->');

content = content.replace(
  '<div class="md:w-1/2 p-6 relative">',
  '<div class="w-full p-6 relative">'
);

fs.writeFileSync(path, content);
console.log('Removed left side from modal');
