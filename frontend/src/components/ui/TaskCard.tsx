"use client";

import { Circle, CircleCheck, CalendarDays, Trash2 } from "lucide-react";
import { ITask } from "@/components/layout/TaskGrid";
import { motion } from "framer-motion";
import { useUpdateTask } from "@/hooks/task/use-update-task";
import { queryClient } from "@/lib/query-client";
import { useTaskStore } from "@/store/useTaskStore";
import { useDeleteTask } from "@/hooks/task/use-delete-task";

interface TaskCardProps {
  task: ITask;
}

export default function TaskCard({ task }: TaskCardProps) {
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);

  const deleteTaskMutation = useDeleteTask();
  const selectedTask = useTaskStore((state) => state.selectedTask);

  const updateTaskMutation = useUpdateTask();

  const isSelected = selectedTask?.id === task.id;

  const handleDelete = () => {
    deleteTaskMutation.mutate(task.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
        setSelectedTask(null);
      },
    });
  };

  const handleComplete = () => {
    updateTaskMutation.mutate(
      {
        id: task.id,
        playLoad: {
          completed: !task.completed,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["tasks"],
          });
        },
      },
    );
  };

  const priorityStyles: Record<string, string> = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  const priority = task.priority?.toLowerCase() || "";

  return (
    <motion.div
      initial={false}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={() => setSelectedTask(task)}
      className={`w-full p-5 border rounded-xl flex items-center gap-4
        cursor-pointer transition-colors
        ${
          isSelected
            ? "border-blue-400 bg-blue-50"
            : "border-gray-200 bg-white hover:bg-gray-50"
        }`}
    >
      {/* Complete Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleComplete();
        }}
        disabled={updateTaskMutation.isPending}
        className="shrink-0"
      >
        {task.completed ? (
          <CircleCheck size={23} className="text-green-600" />
        ) : (
          <Circle size={23} className="text-gray-400 hover:text-blue-600" />
        )}
      </button>

      {/* Task Content */}
      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <h3
          className={`font-semibold text-gray-800 truncate ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>

        <p className="text-xs text-gray-500 truncate">
          {task.note || "No description"}
        </p>
      </div>

      {/* Task Metadata */}
      <div className="flex items-center gap-3 shrink-0">
        <span
          className={`text-[11px] font-bold px-3 py-1 rounded-full ${
            priorityStyles[priority] || "bg-gray-100 text-gray-500"
          }`}
        >
          {task.priority?.toUpperCase() || "NONE"}
        </span>

        <div className="hidden sm:flex items-center gap-1.5 text-gray-500">
          <CalendarDays size={15} />
          <span className="text-xs">
            {task.due_date
              ? new Date(task.due_date).toLocaleDateString()
              : "No date"}
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <button
        type="button"
        title="Delete task"
        onClick={handleDelete}
        className="shrink-0 p-2 rounded-lg text-gray-400
          hover:text-red-600 hover:bg-red-50 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}
