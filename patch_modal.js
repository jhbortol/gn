const fs = require('fs');
const file = 'src/app/shared/bride-login-modal/bride-login-modal.component.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /<h3 class="text-lg md:text-xl font-serif font-bold text-rose-800">Organize seu Casamento<\/h3>/,
  '<h3 class="text-lg md:text-xl font-serif font-bold text-rose-800">{{ options?.title || \'Organize seu Casamento\' }}</h3>'
);

code = code.replace(
  /<p class="text-xs text-rose-700\/80 mb-6 leading-relaxed">\s*Tenha acesso a todas as ferramentas essenciais gratuitas para planejar o seu grande dia com tranquilidade:\s*<\/p>/,
  `<p class="text-xs text-rose-700/80 mb-6 leading-relaxed">
            {{ options?.message || 'Tenha acesso a todas as ferramentas essenciais gratuitas para planejar o seu grande dia com tranquilidade:' }}
          </p>`
);

code = code.replace(
  /@Output\(\) close = new EventEmitter<void>\(\);/,
  '@Output() close = new EventEmitter<boolean>();'
);

code = code.replace(
  /closeModal\(fromSuccess = false\) \{\s*if \(\!fromSuccess\) \{\s*this\.trackingService\.trackHubAction\('fechou_popup_login'\);\s*\}\s*this\.close\.emit\(\);\s*\}/,
  `closeModal(fromSuccess = false) {
    if (!fromSuccess) {
      this.trackingService.trackHubAction('fechou_popup_login');
    }
    this.close.emit(fromSuccess);
  }`
);

code = code.replace(
  /continueWithoutLogin\(\) \{\s*this\.trackingService\.trackHubAction\('fechou_popup_login'\);\s*this\.continue\.emit\(\);\s*\}/,
  `continueWithoutLogin() {
    this.trackingService.trackHubAction('fechou_popup_login');
    this.continue.emit();
    this.close.emit(false);
  }`
);

fs.writeFileSync(file, code);
console.log('Updated component');
