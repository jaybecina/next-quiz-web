import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="w-full py-4 mb-8">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={cn(
              "flex items-center",
              index < steps.length - 1 ? "w-full" : "",
              index < currentStep
                ? "text-blue-600"
                : index === currentStep
                ? "text-blue-600"
                : "text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                index < currentStep
                  ? "bg-blue-600 text-white"
                  : index === currentStep
                  ? "border-2 border-blue-600 text-blue-600"
                  : "border-2 border-gray-300 text-gray-500"
              )}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </span>
            <span className="ml-2 text-sm font-medium hidden sm:inline-block">
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-full h-0.5 mx-2",
                  index < currentStep ? "bg-blue-600" : "bg-gray-300"
                )}
              ></div>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-2 text-center text-sm font-medium text-muted-foreground">
        {steps[currentStep]?.description}
      </div>
    </div>
  );
};

export default Stepper;
