"use client";
import { Loader, Loader2, Search } from "lucide-react";
import TaskCard from "@/components/ui/TaskCard";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTasks } from "@/hooks/task/use-tasks";
import NoTask from "../ui/NoTask";
export interface ITask {
  id: string;
  title: string;
  note: string | null;
  due_date: string | null;
  priority: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
  userId: string;
}
interface TaskGridProps {
  tasks: ITask[];
}
export default function TaskGrid({ tasks }: TaskGridProps) {
  const [search, setSearch] = useState<string>("");

  const filterTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!Array.isArray(tasks)) return [];
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.priority?.toLowerCase().includes(query),
    );
  }, [search, tasks]);

  const container = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return (
    <div className={"flex flex-col p-5 gap-5 "}>
      <div className={"w-full h-auto p-5 flex items-center justify-between"}>
        <div className={"flex gap-2 items-center"}>
          <p>Filter Task :</p>
          <select
            onChange={(e) => handleFilter(e.target.value)}
            className={"border px-5 py-2 rounded-lg"}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>
        <div
          className={
            "w-70 h-10 self-end border flex gap-2 items-center px-3 border-gray-300 rounded-lg"
          }
        >
          <Search />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search..."}
            className={"w-full h-full focus:outline-none"}
          />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={"w-full h-auto  gap-2 flex flex-col "}
      >
        {filterTasks.length <= 0 ? (
          <NoTask />
        ) : (
          filterTasks.map((task, index) => <TaskCard task={task} key={index} />)
        )}
      </motion.div>
    </div>
  );
}
