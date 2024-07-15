"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

export function FormStepTwo({ isActive, nextStep, prevStep }) {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);

  function handleFileChange(e) {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    newFiles.forEach((file) => uploadFile(file));
  }

  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("/api/upload", formData, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setUploadProgress((prevProgress) => [
            ...prevProgress.filter((p) => p.fileName !== file.name),
            { fileName: file.name, percentage },
          ]);
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Erreur de téléversement:", error);
    }
  }

  function deleteFile(fileName) {
    setFiles(files.filter((file) => file.name !== fileName));
    setUploadProgress(
      uploadProgress.filter((progress) => progress.fileName !== fileName)
    );
  }

  if (!isActive) return null;

  return (
    <form>
      <div className="relative flex flex-col mb-8">
        <input type="file" onChange={handleFileChange} multiple />
      </div>
      <div>
        {files.map((file) => (
          <div key={file.name} className="flex flex-col mb-8 overflow-hidden">
            <div className="relative size-24 bg-neutral-950 opacity-45">
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-900">
                {
                  uploadProgress.find(
                    (progress) => progress.fileName === file.name
                  )?.percentage
                }{" "}
                %
              </div>
            </div>
            <button type="button" onClick={() => deleteFile(file.name)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
      <div className="relative flex flex-nowrap justify-between">
        <button
          className="bg-neutral-500 justify-center p-3"
          type="button"
          onClick={prevStep}
        >
          Retour
        </button>
        <button
          className="bg-neutral-500 justify-center p-3"
          type="button"
          onClick={nextStep}
        >
          Suivant
        </button>
      </div>
    </form>
  );
}
