import { api } from "@/lib/api";
import { ICreateTask } from "@/types/task.types";

export const getTasks = async () => {
  const { data } = await api.get("/task/");
  return data;
};
export const getTask = async (id: string) => {
  const { data } = await api.get(`/task/${id}`);
  return data;
};
export const createTask = async (task: ICreateTask) => {
  const { data } = await api.post("/task/", task);
  return data;
};
export const deleteTask = async (id: string) => {
  const { data } = await api.delete(`/task/${id}`);
  return data;
};
export const updateTask = async ({
  id,
  playLoad,
}: {
  id: string;
  playLoad: any;
}) => {
  const { data } = await api.patch(`/task/${id}`, playLoad);
  return data;
};
