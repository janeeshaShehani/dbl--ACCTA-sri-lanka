"use client";

import { useState } from "react";
import type { IndividualApplication } from "@/types/application";

type DocumentsStepProps = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

type DocumentItem = {
  id: string;
  label: string;
};

const documents: DocumentItem[] = [
  { id: "identity", label: "NIC or Passport" },
  { id: "photo", label: "Recent photograph" },
  { id: "academic", label: "Academic certificates" },
  { id: "cv", label: "Curriculum Vitae" },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function DocumentsStep({
  data,
  updateData,
}: DocumentsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (
    documentId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setErrors((previous) => ({
        ...previous,
        [documentId]: "File must be smaller than 10 MB.",
      }));

      event.target.value = "";
      return;
    }

    // Clear any previous error
    setErrors((previous) => ({
      ...previous,
      [documentId]: "",
    }));

    // Save the selected file in the main form data
    updateData({
      documents: {
        ...data.documents,
        [documentId]: file,
      },
    });
  };

  return (
    <div>
      {/* Section heading */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION H
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Supporting documents
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Upload PDF or JPG files. Maximum file size is 10 MB per document.
        </p>
      </div>

      {/* Upload fields */}
      <div className="mt-6 space-y-4">
        {documents.map((document) => {
          const selectedFile = data.documents[document.id];

          return (
            <div key={document.id}>
              <div className="flex flex-col gap-3 rounded-md border border-accta-border p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-accta-ink">
                  {document.label}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <label
                    htmlFor={document.id}
                    className="cursor-pointer rounded-md bg-accta-maroon px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Choose file
                  </label>

                  <input
                    id={document.id}
                    type="file"
                    accept=".pdf,.jpg,.jpeg"
                    className="hidden"
                    onChange={(event) =>
                      handleFileChange(document.id, event)
                    }
                  />

                  <span className="max-w-[180px] truncate text-sm text-accta-muted">
                    {selectedFile
                      ? selectedFile.name
                      : "No file chosen"}
                  </span>
                </div>
              </div>

              {errors[document.id] && (
                <p className="mt-2 text-sm text-red-600">
                  {errors[document.id]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-xs text-accta-muted">
        Please ensure all uploaded copies are clear and readable.
      </p>
    </div>
  );
}