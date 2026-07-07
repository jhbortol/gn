const fs = require('fs');
const file = 'src/app/core/services/bride-login-modal.service.ts';
let code = fs.readFileSync(file, 'utf8');

const replacement = `import { Injectable, signal } from '@angular/core';

export interface BrideLoginModalOptions {
  title?: string;
  message?: string;
  showContinueWithoutLogin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BrideLoginModalService {
  private showModal = signal(false);
  private modalOptions = signal<BrideLoginModalOptions>({});

  private resolveFn: ((value: boolean) => void) | null = null;

  isOpen() {
    return this.showModal();
  }

  getOptions() {
    return this.modalOptions();
  }

  open(options?: BrideLoginModalOptions): Promise<boolean> {
    this.modalOptions.set(options || {});
    this.showModal.set(true);

    return new Promise<boolean>((resolve) => {
      this.resolveFn = resolve;
    });
  }

  close(success: boolean = false) {
    this.showModal.set(false);
    if (this.resolveFn) {
      this.resolveFn(success);
      this.resolveFn = null;
    }
  }
}`;

fs.writeFileSync(file, replacement);
console.log('Updated service');
