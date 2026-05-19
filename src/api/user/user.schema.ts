import { z } from "zod";

export const updateProfileSchema = z.object({
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number" })
    .min(12, "Age must be at least 12")
    .max(80, "Age must be at most 80")
    .optional(),
  gender: z
    .enum(["Male", "Female", "Other", "Prefer not to say"])
    .optional(),
  height: z.coerce
    .number({ invalid_type_error: "Height must be a number" })
    .min(100, "Height must be at least 100 cm")
    .max(300, "Height must be at most 300 cm")
    .optional(),
  weight: z.coerce
    .number({ invalid_type_error: "Weight must be a number" })
    .min(30, "Weight must be at least 30 kg")
    .max(200, "Weight must be at most 200 kg")
    .optional(),
  fitnessGoal: z
    .array(z.string())
    .max(10, "You can select up to 10 fitness goals")
    .optional(),
  difficultyLevel: z
    .enum(["Beginner", "Intermediate", "Advanced"])
    .optional(),
});
