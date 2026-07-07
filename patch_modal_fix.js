const fs = require('fs');
const path = './src/app/shared/bride-login-modal/bride-login-modal.component.ts';

let content = fs.readFileSync(path, 'utf8');

// The main container that needs to be updated
const searchContainer = '<div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200">';
const replaceContainer = '<div class="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col animate-in zoom-in-95 duration-200">';

// Remove the left side (Features List) entirely
const leftSideRegex = /<!-- Left Side: Features List -->[\s\S]*?<!-- Right Side: Forms -->/;

content = content.replace(searchContainer, replaceContainer);
content = content.replace(leftSideRegex, '<!-- Right Side: Forms -->');

// Adjust the right side container to take full width
content = content.replace(
  '<div class="md:w-1/2 p-6 relative">',
  '<div class="w-full p-6 relative">'
);

fs.writeFileSync(path, content);
console.log('Patched bride-login-modal.component.ts');
