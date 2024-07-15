"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  address: yup.string().required("Adresse est requise"),
  quote: yup.string().required("Devis est requis"),
});

export function FormStepThree({ isActive, nextStep, prevStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Envoyer les données au serveur
    nextStep();
  };

  if (!isActive) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex flex-col mb-4">
        <label>Adresse</label>
        <input className="text-neutral-800 p-3" {...register("address")} />
        <p>{errors.address?.message}</p>
      </div>
      <div className="relative flex flex-col mb-8">
        <label>Devis</label>
        <input className="text-neutral-800 p-3" {...register("quote")} />
        <p>{errors.quote?.message}</p>
      </div>
      <div className=" flex flex-nowrap justify-between relative">
        <button
          className="bg-neutral-500 justify-center p-3"
          type="button"
          onClick={prevStep}
        >
          Retour
        </button>
        <button className="bg-neutral-500 justify-center p-3" type="submit">
          Soumettre
        </button>
      </div>
    </form>
  );
}
