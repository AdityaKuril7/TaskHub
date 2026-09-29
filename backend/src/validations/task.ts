import {z} from "zod";


export const createTaskValidation = z.object({
  title: z.string().min(1,"Title must be greater then"),
  note: z.string().nullable(),
  due_date: z.coerce.date().nullable(),
  completed: z.boolean(),
  
})

