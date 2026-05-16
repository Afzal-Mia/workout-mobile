import { z } from "zod";
import { loginSchema, signupSchema, forgotPasswordSchema, verifyOtpSchema, resetPasswordWithOtpSchema, resetPasswordSchema } from "./auth.schema";

export type LoginDto = z.infer<typeof loginSchema>;
export type SignupDto = z.infer<typeof signupSchema>;
export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordWithOtpDto = z.infer<typeof resetPasswordWithOtpSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

export type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
};
