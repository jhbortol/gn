import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Observable } from 'rxjs';

export interface ReviewDto {
  id: string;
  vendorId: string;
  brideName: string;
  rating: number;
  comment?: string;
  status: number;
  createdAt: string;
}

export interface ReviewSubmitDto {
  brideName: string;
  rating: number;
  comment?: string;
}

export interface ReviewSubmitResponse {
  success: boolean;
  message: string;
  reviewId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FornecedorReviewsService {
  constructor(private api: ApiService) {}

  getReviews(vendorId: string, skip: number = 0, take: number = 20): Observable<ReviewDto[]> {
    return this.api.get<ReviewDto[]>(`/v1/public/fornecedores/${vendorId}/reviews`, { skip, take });
  }

  submitReview(vendorId: string, payload: ReviewSubmitDto): Observable<ReviewSubmitResponse> {
    return this.api.post<ReviewSubmitResponse>(`/v1/public/fornecedores/${vendorId}/reviews`, payload);
  }
}
