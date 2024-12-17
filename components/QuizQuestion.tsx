"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuizStore } from "@/store/quizStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { quizSchema } from "@/lib/schema";

interface QuestionProps {
  question: string;
  options?: string[];
  type: "radio" | "email";
  name: keyof QuizSchema;
  description?: string;
}

interface QuizSchema {
  debt: string;
  income: string;
  email: string;
}

const QuizQuestion = ({
  question,
  options,
  type,
  name,
  description,
}: QuestionProps) => {
  const { setAnswer, nextQuestion, answers } = useQuizStore();

  const dynamicSchema: ZodSchema<Partial<QuizSchema>> = z.object({
    [name]: quizSchema.shape[name],
  });

  const form = useForm<Partial<QuizSchema>>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: { [name]: answers[name] || "" },
  });

  useEffect(() => {
    form.reset({ [name]: answers[name] || "" });
  }, [name, answers, form]);

  const onSubmit = (data: Partial<QuizSchema>) => {
    console.log("Submitted Data:", data);
    if (data[name]) {
      setAnswer(name, data[name] as string);
      nextQuestion();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl font-bold text-black">
                {question}
              </FormLabel>
              {description && <FormDescription>{description}</FormDescription>}
              <FormControl>
                {type === "radio" && options ? (
                  <RadioGroup
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                    className="space-y-2"
                  >
                    {options.map((option) => (
                      <FormItem
                        key={option}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                ) : (
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Next
        </Button>
      </form>
    </Form>
  );
};

export default QuizQuestion;
