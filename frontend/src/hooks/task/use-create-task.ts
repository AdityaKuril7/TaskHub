import { useMutation } from "@tanstack/react-query";
import { createTask } from "@/services/task-api";

export const useCreateTask = () => {
  return useMutation({
    mutationFn: createTask,
  });
};
