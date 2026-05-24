import { PaginatedResponse } from '../types';

export interface WorkoutPlan {
  _id: string;
  goal: string;
  poster: string;
  description: string;
  duration?: number;
  difficultyLevel?: "Beginner" | "Intermediate" | "Advanced";
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export type GetWorkoutsResponse = PaginatedResponse<WorkoutPlan>;
