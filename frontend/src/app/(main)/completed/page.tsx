"use client";
import TaskDetails from "@/components/layout/TaskDetails";
import TaskGrid, { ITask } from "@/components/layout/TaskGrid";
import Loader from "@/components/ui/Loader";
import { useTasks } from "@/hooks/task/use-tasks";
import { useTaskStore } from "@/store/useTaskStore";
import { useMemo } from "react";

export default function CompletedPage() {
  const { data, isPending } = useTasks();

  const selectedTask = useTaskStore((state) => state.selectedTask);
  if (isPending) return <Loader />;
  const tasks = data.tasks as ITask[];
  const filterTasks = useMemo(() => {
    return tasks.filter((task) => task.completed);
  }, [tasks]);
  return (
    <div className="flex-1 flex gap-5 p-5">
      <div className={"flex-[0.7] flex flex-col p-5 overflow-scroll"}>
        <h1 className={"font-bold text-xl"}>Completed</h1>
        <TaskGrid tasks={filterTasks} />
      </div>
      <TaskDetails task={selectedTask} />
    </div>
  );
}
