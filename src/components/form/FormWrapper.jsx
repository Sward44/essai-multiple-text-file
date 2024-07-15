"use client";
import React, { useState } from "react";

export function FormWrapper({ children }) {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <div>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isActive: index + 1 === step,
          nextStep,
          prevStep,
        });
      })}
    </div>
  );
}
