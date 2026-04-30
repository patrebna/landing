import axios from "axios";
import { type UserStats } from "@/types/auth";

export const authProfileQueryKey = ["auth-profile"] as const;

export async function fetchAuthProfile() {
  const response = await axios.get<{ stats: UserStats | null }>(
    "/api/auth/profile",
    { withCredentials: true },
  );

  return response.data.stats;
}
