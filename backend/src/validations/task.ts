import { z } from "zod";

export const createTaskValidation = z.object({
  title: z.string().min(1, "Title must be greater then"),
  note: z.string().nullable(),
  priority: z.string().nullable(),
  due_date: z.coerce.date().nullable(),
});

export const paginationValidation = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
