import { useQuizStore } from "@/store/quizStore";
import { Button } from "@/components/ui/button";
import Stepper from "@/components/Stepper";
import { QuizSchema } from "@/lib/schema";
import Image from "next/image";
import BGImage from "@/assets/images/bg-img.jpg";

const steps = [
  { title: "Debt", description: "Your debt information" },
  { title: "Income", description: "Your income information" },
  { title: "Contact", description: "Your contact information" },
];

const CongratsPage = () => {
  const { answers, resetQuiz } = useQuizStore();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Image
        src={BGImage}
        alt="Background Image"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="absolute top-0 left-0"
      />
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-2xl text-center space-y-4 backdrop-blur-sm">
        <Stepper steps={steps} currentStep={3} />
        <h1 className="text-3xl font-bold">Congratulations!</h1>
        <p className="text-xl">You&apos;ve completed the quiz.</p>{" "}
        {/* Single quote escaped here */}
        <div className="space-y-2">
          <p>Your answers:</p>
          <pre className="bg-gray-100 p-4 rounded-md text-left overflow-x-auto">
            {JSON.stringify(answers as QuizSchema, null, 2)}
          </pre>
        </div>
        <Button onClick={resetQuiz}>Take the quiz again</Button>
      </div>
    </div>
  );
};

export default CongratsPage;
