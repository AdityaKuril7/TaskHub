import { deleteTask } from "@/services/task-api"
import { useMutation } from "@tanstack/react-query"

export const useDeleteTask = () => {
    return useMutation({
        mutationFn: deleteTask
    })
}