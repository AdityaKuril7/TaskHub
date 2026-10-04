import { useQuery } from "@tanstack/react-query";
import { getTask } from "@/services/task-api";

export const useTask = () => {
  return useQuery({
    queryFn: () => getTask,
    queryKey: ["task"],
  });
};
