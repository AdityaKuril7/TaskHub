import { useMutation } from "@tanstack/react-query";
import { updateTask } from "@/services/task-api";

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: updateTask,
  });
};
