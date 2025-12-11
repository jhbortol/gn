import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) {
    const id = Date.now().toString();
    const toast: Toast = { id, message, type, duration };

    this.toasts.update(current => [...current, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }

    return id;
  }

  success(message: string, duration = 3000) {
    return this.show(message, 'success', duration);
  }

  error(message: string, duration = 3000) {
    return this.show(message, 'error', duration);
  }

  info(message: string, duration = 3000) {
    return this.show(message, 'info', duration);
  }

  warning(message: string, duration = 3000) {
    return this.show(message, 'warning', duration);
  }

  remove(id: string) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }

  clear() {
    this.toasts.set([]);
  }
}
