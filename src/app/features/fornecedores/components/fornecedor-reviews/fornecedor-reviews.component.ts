import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FornecedorReviewsService, ReviewDto } from '../../services/fornecedor-reviews.service';
import { BrideAuthService } from '../../../../core/services/bride-auth.service';
import { BrideLoginModalService } from '../../../../core/services/bride-login-modal.service';

@Component({
  selector: 'app-fornecedor-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './fornecedor-reviews.component.html',
  styleUrls: ['./fornecedor-reviews.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FornecedorReviewsComponent implements OnInit {
  @Input({ required: true }) vendorId!: string;

  reviews: ReviewDto[] = [];
  isLoadingReviews = false;
  hasMoreReviews = true;
  skip = 0;
  take = 20;

  reviewForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitMessage = '';
  submitError = false;

  // Array for stars to ngFor over easily
  stars = [1, 2, 3, 4, 5];
  hoverRating = 0;

  private authService = inject(BrideAuthService);
  private loginModalService = inject(BrideLoginModalService);

  get isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(
    private reviewsService: FornecedorReviewsService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadReviews();
  }

  initForm(): void {
    const userName = this.authService.profile?.nome || '';
    this.reviewForm = this.fb.group({
      brideName: [userName, [Validators.required, Validators.maxLength(150)]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.maxLength(2000)]]
    });
  }

  openLoginModal(): void {
    this.loginModalService.open({
      message: 'Faça login para deixar uma avaliação',
      showContinueWithoutLogin: false
    }).then(success => {
      if (success) {
        this.initForm(); // Update name field with logged in user
        this.cdr.markForCheck();
      }
    });
  }

  loadReviews(reset: boolean = false): void {
    if (reset) {
      this.reviews = [];
      this.skip = 0;
      this.hasMoreReviews = true;
    }

    if (!this.hasMoreReviews) return;

    this.isLoadingReviews = true;
    this.cdr.markForCheck();

    this.reviewsService.getReviews(this.vendorId, this.skip, this.take).subscribe({
      next: (data) => {
        if (data.length < this.take) {
          this.hasMoreReviews = false;
        }
        this.reviews = [...this.reviews, ...data];
        this.skip += data.length;
        this.isLoadingReviews = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading reviews', err);
        this.isLoadingReviews = false;
        this.cdr.markForCheck();
      }
    });
  }

  setRating(rating: number): void {
    this.reviewForm.patchValue({ rating });
  }

  submitReview(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;
    this.cdr.markForCheck();

    this.reviewsService.submitReview(this.vendorId, this.reviewForm.value).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.submitMessage = res.message || 'Avaliação enviada com sucesso!';
        this.initForm(); // reset form
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error submitting review', err);
        this.isSubmitting = false;
        this.submitError = true;
        this.submitMessage = 'Erro ao enviar a avaliação. Tente novamente.';
        this.cdr.markForCheck();
      }
    });
  }
}
