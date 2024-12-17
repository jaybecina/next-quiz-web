import { z } from "zod";

export const quizSchema = z.object({
  debt: z.string().min(1, "Please select an option"),
  income: z.string().min(1, "Please select an option"),
  email: z.string().email("Invalid email"),
});

export type QuizSchema = z.infer<typeof quizSchema>;
