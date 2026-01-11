import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guia-custos-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guia-custos-page.html',
  styleUrls: ['./guia-custos-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuiaCustosPage {}
