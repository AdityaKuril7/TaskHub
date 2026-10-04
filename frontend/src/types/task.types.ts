export interface ICreateTask {
  title: string;
  note: string | null;
  priority: string | null;
  due_date: Date | null;
}
