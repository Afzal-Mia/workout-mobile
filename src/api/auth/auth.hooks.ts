import { useAppMutation } from "../../lib/react-query/useAppMutation";
import { apiClient } from "../api-client";
import { useAuthStore } from "../../store/useAuthStore";
import { authEndpoints } from "./auth.endpoints";
import { LoginDto, SignupDto, ForgotPasswordDto, VerifyOtpDto, ResetPasswordWithOtpDto, ResetPasswordDto, AuthResponse } from "./auth.types";

const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export const useLogin = () => {
  return useAppMutation({
    mutationFn: async (dto: LoginDto): Promise<AuthResponse> => {
      const res = await apiClient.post<AuthResponse>(authEndpoints.login, dto);
      const token = res.accessToken || (res as any).token;
      if (token && res.user) {
        useAuthStore.getState().setAuth(res.user, token);
      }
      return res;
    },
    invalidateKeys: [authKeys.user()],
  });
};

export const useSignup = () => {
  return useAppMutation({
    mutationFn: async (dto: SignupDto): Promise<{ message: string }> => {
      return apiClient.post<{ message: string }>(authEndpoints.signup, dto);
    },
  });
};

export const useForgotPassword = () => {
  return useAppMutation({
    mutationFn: async (dto: ForgotPasswordDto): Promise<{ message: string }> => {
      return apiClient.post(authEndpoints.forgotPassword, dto);
    },
  });
};

export const useVerifyOtp = () => {
  return useAppMutation({
    mutationFn: async (dto: VerifyOtpDto): Promise<AuthResponse> => {
      const res = await apiClient.post<AuthResponse>(authEndpoints.verifyOtp, dto);
      const token = res.accessToken || (res as any).token;
      if (token && res.user) {
        useAuthStore.getState().setAuth(res.user, token);
      }
      return res;
    },
    invalidateKeys: [authKeys.user()],
  });
};

export const useResetPasswordWithOtp = () => {
  return useAppMutation({
    mutationFn: async (dto: ResetPasswordWithOtpDto): Promise<AuthResponse> => {
      const res = await apiClient.post<AuthResponse>(authEndpoints.resetPasswordWithOtp, dto);
      const token = res.accessToken || (res as any).token;
      if (token && res.user) {
        useAuthStore.getState().setAuth(res.user, token);
      }
      return res;
    },
    invalidateKeys: [authKeys.user()],
  });
};

export const useResendOtp = () => {
  return useAppMutation({
    mutationFn: async ({ email, type }: { email: string, type: 'verification' | 'reset-password' }): Promise<{ message: string }> => {
      return apiClient.post(authEndpoints.resendOtp, { email, type });
    },
  });
};

export const useGoogleLogin = () => {
  return useAppMutation({
    mutationFn: async (token: string): Promise<AuthResponse> => {
      const res = await apiClient.post<AuthResponse>(authEndpoints.googleLogin, { token });
      const responseToken = res.accessToken || (res as any).token;
      if (responseToken && res.user) {
        useAuthStore.getState().setAuth(res.user, responseToken);
      }
      return res;
    },
    invalidateKeys: [authKeys.user()],
  });
};

export const useResetPassword = () => {
  return useAppMutation({
    mutationFn: async (dto: ResetPasswordDto): Promise<{ message: string }> => {
      return apiClient.patch(authEndpoints.resetPassword, dto);
    },
  });
};
