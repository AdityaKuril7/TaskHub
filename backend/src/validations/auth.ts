import { z } from "zod";

export const authValidations = z.object({
  email: z.email(),
  password: z.string().min(8, "Username must be greater then 8 characters"),
});
