import { PaginatedResponse } from '../types';

export interface ReviewUser {
  _id: string;
  name?: string;
  profileImage?: string;
}

export interface Review {
  _id: string;
  user: ReviewUser;
  workoutPlan: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export type GetReviewsResponse = PaginatedResponse<Review>;
