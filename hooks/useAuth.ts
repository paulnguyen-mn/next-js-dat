import useSWR from "swr";
import { PublicConfiguration } from "swr/dist/types";
import { authApi } from "@/api/index";
import { UserProfile } from "../models/index";

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR("/profile", {
    dedupingInterval: 3600 * 1000, //1hr
    revalidateOnFocus: false,
    ...options,
  });

  const firstLoading = profile === undefined && error === undefined;

  async function login() {
    await authApi.login({
      username: "test",
      password: "123456",
    });

    await mutate();
  } 
  async function logout() {
    await authApi.logout();
    mutate(null, false);
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
  };
}
