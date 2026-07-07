const fs = require('fs');
const path = './src/app/shared/bride-login-modal/bride-login-modal.component.ts';

let content = fs.readFileSync(path, 'utf8');

const regex = /<!-- Left Side: Features List -->[\s\S]*?<!-- Right Side: Login\/Register Forms -->/;
content = content.replace(regex, '<!-- Right Side: Login/Register Forms -->');

content = content.replace(
  '<div class="md:w-1/2 p-6 flex flex-col justify-between relative min-h-[450px]">',
  '<div class="w-full p-6 flex flex-col justify-between relative min-h-[450px]">'
);

fs.writeFileSync(path, content);
console.log('Successfully patched modal');
