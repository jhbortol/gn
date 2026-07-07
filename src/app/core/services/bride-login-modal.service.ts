import { Injectable, signal } from '@angular/core';

export interface BrideLoginModalOptions {
  title?: string;
  message?: string;
  showContinueWithoutLogin?: boolean;
  isDegustacaoLimit?: boolean;
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
}