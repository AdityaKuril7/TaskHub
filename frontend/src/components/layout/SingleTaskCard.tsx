import { ITask } from "@/components/layout/TaskGrid";
import { Circle } from "lucide-react";
import React from "react";

export default function SingleTaskCard({ task }: { task: ITask }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-150 h-auto p-5 bg-blue-50 flex flex-col rounded-sm gap-5">
        <div className="flex items-center justify-between">
          <div className="h-auto w-full flex gap-2 items-center">
            <Circle />
            <div className="flex flex-col">
              <p className="font-bold text-2xl">{task.title}</p>
              <p>{task.due_date}</p>
            </div>
          </div>
          <p className="font-bold">{task.priority?.toUpperCase()}</p>
        </div>
        <div className="w-full h-auto bg-lime-300 px-4 py-3 rounded-sm">
          {task.note}
        </div>
      </div>
    </div>
  );
}
