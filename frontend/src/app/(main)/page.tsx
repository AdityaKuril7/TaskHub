"use client";
import TaskGrid, { ITask } from "@/components/layout/TaskGrid";
import { useTasks } from "@/hooks/task/use-tasks";
import Loader from "@/components/ui/Loader";
import TaskDetails from "@/components/layout/TaskDetails";
import { useTaskStore } from "@/store/useTaskStore";
export default function Home() {
  const { data, isPending } = useTasks();
  const selectedTask = useTaskStore((state) => state.selectedTask);
  if (isPending) return <Loader />;

  const tasks = data.tasks as ITask[];
  return (
    <div className="flex-1 flex gap-5 p-5">
      <div className={"flex-[0.7] flex flex-col p-5 overflow-scroll"}>
        <h1 className={"font-bold text-xl"}>All Tasks</h1>
        <TaskGrid tasks={tasks} />
      </div>
      <TaskDetails task={selectedTask} />
    </div>
  );
}
