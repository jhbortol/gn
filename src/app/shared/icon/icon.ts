import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      [attr.width]="size" 
      [attr.height]="size" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      [attr.stroke-width]="strokeWidth" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      [class]="className"
    >
      <ng-container [ngSwitch]="name">
        <path *ngSwitchCase="'camera'" d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path *ngSwitchCase="'star'" d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        <path *ngSwitchCase="'heart'" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        <path *ngSwitchDefault d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
      </ng-container>
    </svg>
  `
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: number = 24;
  @Input() strokeWidth: number = 2;
  @Input() className: string = '';
}
