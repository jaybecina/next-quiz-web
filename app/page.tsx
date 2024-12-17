"use client";

import { useState, useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import Loader from "@/components/Loader";
import QuizQuestion from "@/components/QuizQuestion";
import CongratsPage from "@/components/CongratsPage";
import Stepper from "@/components/Stepper";
import { QuizSchema } from "@/lib/schema";
import Image from "next/image";
import BGImage from "@/assets/images/bg-img.jpg";

const questions: Array<{
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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { currentQuestion, answers } = useQuizStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (currentQuestion === questions.length) {
      console.log("Quiz completed. Answers:", answers);
    }
  }, [currentQuestion, answers]);

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (currentQuestion === questions.length) {
    return <CongratsPage />;
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Image
        src={BGImage}
        alt="Background Image"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="absolute top-0 left-0"
      />
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-2xl backdrop-blur-sm relative z-10">
        <Stepper
          steps={questions.map((q) => ({
            title: q.title,
            description: q.description,
          }))}
          currentStep={currentQuestion}
        />
        <QuizQuestion
          question={currentQuestionData.question}
          options={currentQuestionData.options}
          type={currentQuestionData.type}
          name={currentQuestionData.name}
        />
      </div>
    </div>
  );
}
