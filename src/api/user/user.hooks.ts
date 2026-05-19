import { useAppMutation } from "../../lib/react-query/useAppMutation";
import { useFetcher } from "../../lib/react-query/useFetcher";
import { apiClient } from "../api-client";
import { useAuthStore } from "../../store/useAuthStore";
import { userEndpoints } from "./user.endpoints";
import { GetMeResponse, UpdateProfileDto, UpdateProfileResponse } from "./user.types";

export const userKeys = {
  all: ["user"] as const,
  me: () => [...userKeys.all, "me"] as const,
};

export const useGetMe = (options?: any) => {
  return useFetcher<GetMeResponse>({
    queryKey: userKeys.me(),
    queryFn: async () => {
      const res = await apiClient.get<GetMeResponse>(userEndpoints.me);
      if (res?.user) {
        useAuthStore.getState().updateUser({
          name: res.user.name,
          email: res.user.email,
          profileImage: res.user.profileImage,
        });
      }
      return res;
    },
    options,
  });
};

export const useUpdateProfile = () => {
  return useAppMutation({
    mutationFn: async ({
      dto,
      file,
    }: {
      dto: UpdateProfileDto;
      file?: { uri: string; name: string; type: string };
    }): Promise<UpdateProfileResponse> => {
      const formData = new FormData();

      if (file) {
        formData.append("profilePhoto", {
          uri: file.uri,
          name: file.name || "profile.jpg",
          type: file.type || "image/jpeg",
        } as any);
      }

      if (dto.age !== undefined && dto.age !== null) {
        formData.append("age", String(dto.age));
      }
      if (dto.gender) {
        formData.append("gender", dto.gender);
      }
      if (dto.height !== undefined && dto.height !== null) {
        formData.append("height", String(dto.height));
      }
      if (dto.weight !== undefined && dto.weight !== null) {
        formData.append("weight", String(dto.weight));
      }
      if (dto.difficultyLevel) {
        formData.append("difficultyLevel", dto.difficultyLevel);
      }
      if (dto.fitnessGoal) {
        dto.fitnessGoal.forEach((goal) => {
          formData.append("fitnessGoal", goal);
        });
      }

      const res = await apiClient.patch<UpdateProfileResponse>(
        userEndpoints.updateProfile,
        formData
      );

      if (res?.profile) {
        useAuthStore.getState().updateUser({
          profileImage: res.profile.profileImage,
        });
      }

      return res;
    },
    invalidateKeys: [userKeys.me()],
  });
};
