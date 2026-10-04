import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/services/task-api";

export const useTasks = () => {
  return useQuery({
    queryFn: getTasks,
    queryKey: ["tasks"],
  });
};
