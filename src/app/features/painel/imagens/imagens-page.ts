import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierService, MediaDto } from '../services/supplier.service';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-imagens-page',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './imagens-page.html',
  styleUrls: ['./imagens-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagensPage implements OnInit {
  images = signal<MediaDto[]>([]);
  isLoading = signal(false);
  isUploading = signal(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  uploadProgress = signal<number>(0);

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.supplierService.getImages().subscribe({
      next: (response) => {
        // Ordenar por orderIndex
        const sortedImages = (response.data || []).sort((a, b) => {
          return a.orderIndex - b.orderIndex;
        });
        this.images.set(sortedImages);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar imagens. Tente novamente.');
        this.isLoading.set(false);
        console.error('Erro ao carregar imagens:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const files = Array.from(input.files);
    this.uploadImages(files);
  }

  uploadImages(files: File[]): void {
    this.isUploading.set(true);
    this.error.set(null);
    this.successMessage.set(null);

    // Validar arquivos
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    for (const file of files) {
      if (file.size > maxSize) {
        this.error.set(`A imagem ${file.name} excede o tamanho máximo de 5MB.`);
        this.isUploading.set(false);
        return;
      }
      if (!allowedTypes.includes(file.type)) {
        this.error.set(`A imagem ${file.name} não é um formato válido (JPEG, PNG, WEBP).`);
        this.isUploading.set(false);
        return;
      }
    }

    // Verificar limite total (máximo 10 imagens)
    const currentCount = this.images().length;
    if (currentCount + files.length > 10) {
      this.error.set(`Você pode ter no máximo 10 imagens. Atualmente tem ${currentCount}.`);
      this.isUploading.set(false);
      return;
    }

    // Upload das imagens
    let uploadedCount = 0;
    const totalFiles = files.length;

    files.forEach((file, index) => {
      this.supplierService.uploadImage(file).subscribe({
        next: (response) => {
          uploadedCount++;
          this.uploadProgress.set(Math.round((uploadedCount / totalFiles) * 100));
          
          if (uploadedCount === totalFiles) {
            this.successMessage.set(`${totalFiles} imagem(ns) enviada(s) com sucesso!`);
            this.isUploading.set(false);
            this.uploadProgress.set(0);
            this.loadImages(); // Recarregar lista
            
            // Limpar mensagem de sucesso após 3 segundos
            setTimeout(() => this.successMessage.set(null), 3000);
          }
        },
        error: (err) => {
          this.error.set(`Erro ao enviar ${file.name}. Tente novamente.`);
          this.isUploading.set(false);
          this.uploadProgress.set(0);
          console.error('Erro no upload:', err);
        }
      });
    });
  }

  setPrimary(imageId: string): void {
    this.supplierService.setPrimaryImage(imageId).subscribe({
      next: () => {
        this.successMessage.set('Imagem principal definida com sucesso!');
        this.loadImages();
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (err) => {
        this.error.set('Erro ao definir imagem principal.');
        console.error('Erro ao definir imagem principal:', err);
      }
    });
  }

  deleteImage(imageId: string): void {
    if (!confirm('Tem certeza que deseja excluir esta imagem?')) {
      return;
    }

    this.supplierService.deleteImage(imageId).subscribe({
      next: () => {
        this.successMessage.set('Imagem excluída com sucesso!');
        this.loadImages();
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (err) => {
        this.error.set('Erro ao excluir imagem.');
        console.error('Erro ao excluir imagem:', err);
      }
    });
  }

  drop(event: CdkDragDrop<MediaDto[]>): void {
    const imagesList = [...this.images()];
    moveItemInArray(imagesList, event.previousIndex, event.currentIndex);
    
    // Atualizar ordem local imediatamente
    this.images.set(imagesList);

    // Preparar nova ordem para enviar ao backend
    // Nova ordem como array de IDs na sequência desejada (0-based)
    const newOrderIds = imagesList.map(img => img.id);

    // Enviar nova ordem ao backend
    this.supplierService.reorderImages(newOrderIds).subscribe({
      next: () => {
        this.successMessage.set('Ordem atualizada com sucesso!');
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (err) => {
        this.error.set('Erro ao atualizar ordem das imagens.');
        console.error('Erro ao reordenar:', err);
        // Reverter mudança local
        this.loadImages();
      }
    });
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }
}
