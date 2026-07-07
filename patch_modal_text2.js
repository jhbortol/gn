const fs = require('fs');
const path = './src/app/shared/bride-login-modal/bride-login-modal.component.ts';

let content = fs.readFileSync(path, 'utf8');

// The close button is overlapping the header/tabs.
// Let's ensure the close button is positioned relative to the modal container, and move the header section below it, with some margin.
// We also want to make sure the options?.message is fully visible.

// Find the header section and replace it
const oldHeader = `
          <!-- Header (Title & Message) -->
          <div *ngIf="options?.title || options?.message || message" class="mb-4 text-center mt-6">
            <h3 *ngIf="options?.title" class="text-lg font-serif font-bold text-rose-800 mb-1">{{ options?.title }}</h3>
            <p *ngIf="options?.message || message" class="text-sm text-gray-600">{{ options?.message || message }}</p>
          </div>
`;

content = content.replace(oldHeader, '');

// Insert it again, but right after the close button
const closeButton = `
          <!-- Close Button -->
          <button (click)="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition rounded-full p-1 hover:bg-gray-100 focus:outline-none z-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
`;

const newHeader = `
          <!-- Header (Title & Message) -->
          <div *ngIf="options?.title || options?.message || message" class="mb-2 mt-4 text-center px-4">
            <h3 *ngIf="options?.title" class="text-lg font-serif font-bold text-rose-800 mb-1">{{ options?.title }}</h3>
            <p *ngIf="options?.message || message" class="text-sm text-gray-600">{{ options?.message || message }}</p>
          </div>
`;

content = content.replace(closeButton, closeButton + newHeader);

fs.writeFileSync(path, content);
console.log('Fixed header section in modal');
