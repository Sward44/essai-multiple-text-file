"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schema = yup.object().shape({
  firstName: yup.string().required("Prénom est requis"),
  lastName: yup.string().required("Nom est requis"),
  email: yup
    .string()
    .email("L’email est invalide")
    .required("Email est requis"),
  phone: yup
    .string()
    .matches(/^(\+33|0)[1-9](\d{2}){4}$/, "Téléphone est invalide")
    .required("Téléphone est requis"),
});

export function FormStepOne({ isActive, nextStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Ici, faites une vérification si le téléphone est requis avec NextAuth
    console.log(data);
    nextStep();
  };

  if (!isActive) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex flex-col mb-4">
        <label>Prénom</label>
        <input className="text-neutral-800 p-3" {...register("firstName")} />
        <p>{errors.firstName?.message}</p>
      </div>
      <div className="relative flex flex-col mb-4">
        <label>Nom</label>
        <input className="text-neutral-800 p-3" {...register("lastName")} />
        <p>{errors.lastName?.message}</p>
      </div>
      <div className="relative flex flex-col mb-4">
        <label>Email</label>
        <input className="text-neutral-800 p-3" {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>
      <div className="relative flex flex-col mb-8">
        <label>Téléphone</label>
        <input className="text-neutral-800 p-3" {...register("phone")} />
        <p>{errors.phone?.message}</p>
      </div>
      <div className="relative flex flex-col mb-4">
        <button className="bg-neutral-500 justify-center p-3" type="submit">
          Suivant
        </button>
      </div>
    </form>
  );
}
