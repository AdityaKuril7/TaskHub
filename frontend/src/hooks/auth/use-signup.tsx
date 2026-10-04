import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/auth-api";

export default function useSignup() {
  return useMutation({
    mutationFn: signup,
  });
}
