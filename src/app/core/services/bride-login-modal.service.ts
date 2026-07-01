import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrideLoginModalService {
  private showModal = signal(false);

  isOpen() {
    return this.showModal();
  }

  open() {
    this.showModal.set(true);
  }

  close() {
    this.showModal.set(false);
  }
}
