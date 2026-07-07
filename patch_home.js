const fs = require('fs');
const file = 'src/app/features/home/home-page/home-page.ts';
let content = fs.readFileSync(file, 'utf8');

const searchBlock1 = `  handleToolClick(event: Event, path: string) {
    if (!this.authService.isLoggedIn) {
      event.preventDefault();
      event.stopPropagation();
      this.loginModalService.open();
    }
  }`;

const replaceBlock1 = `  handleToolClick(event: Event, path: string) {
    // Navigate freely without requiring immediate login
    // Login limits are handled within the specific tool components
  }`;

content = content.replace(searchBlock1, replaceBlock1);


const searchBlock2 = `  async toggleFavorite(event: Event, fornecedor: FornecedorListDto): Promise<void> {
    event.stopPropagation();
    event.preventDefault();

    if (!this.authService.isLoggedIn) {
      this.loginModalService.open();
      return;
    }`;

const replaceBlock2 = `  async toggleFavorite(event: Event, fornecedor: FornecedorListDto): Promise<void> {
    event.stopPropagation();
    event.preventDefault();`;

content = content.replace(searchBlock2, replaceBlock2);

fs.writeFileSync(file, content);
console.log('Home patched.');
