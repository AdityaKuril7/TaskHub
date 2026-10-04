import {
  Circle,
  CircleCheck,
  CalendarDays,
  Clock3,
  Flag,
  FileText,
  Trash2,
} from "lucide-react";
import { ITask } from "./TaskGrid";
import { useDeleteTask } from "@/hooks/task/use-delete-task";
import { queryClient } from "@/lib/query-client";

interface TaskDetailsProps {
  task: ITask | null;
}

export default function TaskDetails({ task }: TaskDetailsProps) {
  if (!task) {
    return (
      <div
        className="flex-[0.3] min-w-0 border border-gray-200 bg-white 
        flex flex-col items-center justify-center text-gray-400 gap-3"
      >
        <FileText size={45} strokeWidth={1.2} />
        <p className="font-medium text-gray-600">No task selected</p>
        <p className="text-sm">Select a task to view its details</p>
      </div>
    );
  }

  return (
    <div className="flex-[0.3] min-w-0 border border-gray-200 bg-white p-6 flex flex-col justify-between">
      {/* Task Header */}
      <div>
        <div className="flex items-start gap-3 p-5">
          {task.completed ? (
            <CircleCheck className="mt-1 text-green-600 shrink-0" size={25} />
          ) : (
            <Circle className="mt-1 text-gray-900 shrink-0" size={25} />
          )}

          <h2 className="text-xl font-bold text-gray-900 leading-snug break-words">
            {task.title}
          </h2>
        </div>

        {/* Description */}
        <div className="px-5 mt-5">
          <div className="flex items-center gap-2 text-gray-500 mb-3">
            <FileText size={17} />
            <span className="text-sm font-semibold">Description</span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap break-words">
            {task.note?.trim() || "No description added for this task."}
          </p>
        </div>
      </div>

      {/* Task Information */}
      <div className="space-y-6 mt-8 border-t border-gray-100 pt-6">
        {/* Due Date */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gray-500">
            <CalendarDays size={18} />
            <span className="text-sm">Due date</span>
          </div>
          <span className="text-sm font-medium text-gray-800">
            {task.due_date
              ? new Date(task.due_date).toLocaleDateString()
              : "Not set"}
          </span>
        </div>

        {/* Priority */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Flag size={18} />
            <span className="text-sm">Priority</span>
          </div>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              task.priority?.toLowerCase() === "high"
                ? "bg-red-100 text-red-600"
                : task.priority?.toLowerCase() === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : task.priority?.toLowerCase() === "low"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
            }`}
          >
            {task.priority?.toUpperCase() || "NONE"}
          </span>
        </div>

        {/* Created Date */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock3 size={18} />
            <span className="text-sm">Created</span>
          </div>
          <span className="text-sm font-medium text-gray-800">
            {new Date(task.created_at).toLocaleDateString()}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Status</span>
          <span
            className={`text-sm font-semibold ${
              task.completed ? "text-green-600" : "text-orange-600"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>
    </div>
  );
}
