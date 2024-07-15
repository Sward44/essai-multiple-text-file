import { MultiStepForm } from "@/components/form/MultiStepForm";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4">Formulaire Multi-étape</h1>
      <MultiStepForm />
    </div>
  );
}
