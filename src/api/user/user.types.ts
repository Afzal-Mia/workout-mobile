import { z } from "zod";
import { updateProfileSchema } from "./user.schema";

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
  age?: number;
  gender?: "Male" | "Female" | "Other" | "Prefer not to say";
  height?: number;
  weight?: number;
  fitnessGoal?: string[];
  difficultyLevel?: "Beginner" | "Intermediate" | "Advanced";
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetMeResponse {
  user: UserProfile;
}

export interface UpdateProfileResponse {
  profile: UserProfile;
  message: string;
}
