export interface ITask {
   id: string;
   title: string;
   note: string | null;
   due_date: Date | null;
   completed: boolean; 
   created_at: Date;
   updated_at: Date;
   userId: string;
}

export interface ICreateTask {
   title: string;
   note: string | null;
   due_date: Date | null;
   completed: boolean; 
}
