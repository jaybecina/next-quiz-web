import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import BGImage from "@/assets/images/bg-img.jpg";

interface LoaderProps {
  progress: number;
}

const Loader = ({ progress }: LoaderProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Image
        src={BGImage}
        alt="Background Image"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="absolute top-0 left-0"
      />
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md backdrop-blur-sm relative z-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Loading Quiz...</h2>
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
};

export default Loader;
