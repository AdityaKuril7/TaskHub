import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth-api";

export default function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}
