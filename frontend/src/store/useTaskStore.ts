import {create} from "zustand"
import { ITask } from "@/components/layout/TaskGrid";

interface TaskStore {
    selectedTask: ITask | null;
    setSelectedTask: (task:ITask | null) => void;
}

export const useTaskStore = create<TaskStore>((set)=> ({
    selectedTask: null,
    setSelectedTask: (task:ITask | null)=> set({selectedTask: task})
}))  