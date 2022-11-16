import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface UserResponse {
  ok: boolean;
  user: User;
}

export default function useUser() {
  const { data, error } = useSWR<UserResponse>(
    typeof window === "undefined" ? null : "/api/users/me"
  );
  // 로그인한 적 없거나 세션 만료된 경우, 계정 생성 페이지로 리다이렉트
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/sign-up");
    }
  }, [data, router]);
  return { user: data?.user, isLoading: !data && !error };
}
