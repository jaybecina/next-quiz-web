import { QuizSchema } from "@/lib/schema";

export const questions: Array<{
  question: string;
  options?: string[];
  type: "radio" | "email";
  title: string;
  description: string;
  name: keyof QuizSchema;
}> = [
  {
    question: "How much debt do you owe?",
    options: ["Less than $10,000", "$10,000 - $20,000", "More than $20,000"],
    type: "radio",
    title: "Debt",
    description: "Let's start by understanding your debt situation.",
    name: "debt",
  },
  {
    question: "What is your gross annual income?",
    options: [
      "Under $25,000",
      "$25,000 - $50,000",
      "$50,000 - $75,000",
      "$75,000 - $100,000",
      "More than $100,000",
    ],
    type: "radio",
    title: "Income",
    description: "Now, let's look at your income.",
    name: "income",
  },
  {
    question: "What's your email?",
    type: "email",
    title: "Contact",
    description: "Finally, we'll need your contact information.",
    name: "email",
  },
];
