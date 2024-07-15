"use server";
import { FormWrapper } from "@/components/form/FormWrapper";
import { FormStepOne } from "@/components/form/FormStepOne";
import { FormStepTwo } from "@/components/form/FormStepTwo";
import { FormStepThree } from "@/components/form/FormStepThree";

export async function MultiStepForm() {
  return (
    <FormWrapper>
      <FormStepOne />
      <FormStepTwo />
      <FormStepThree />
    </FormWrapper>
  );
}
