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
  requiredFor: string;
  multiple?: boolean;
};

const documents: DocumentItem[] = [
  {
    id: "identity",
    label: "Copy of NIC (both sides) or passport bio page",
    requiredFor: "All members",
  },
  {
    id: "photo",
    label: "Recent passport-size colour photograph",
    requiredFor: "All members",
  },
  {
    id: "academic",
    label: "Academic certificates and transcripts",
    requiredFor: "All members",
    multiple: true,
  },
  {
    id: "professional",
    label:
      "Professional membership certificates and current good-standing letters",
    requiredFor: "Where claimed",
    multiple: true,
  },
  {
    id: "examinationResults",
    label: "ACCTA examination results or exemption letter",
    requiredFor: "Associate by examination",
  },
  {
    id: "employerLetters",
    label:
      "Employer letter(s) confirming position, period and taxation duties",
    requiredFor: "Associate, Fellow, mature entry",
    multiple: true,
  },
  {
    id: "cv",
    label: "Detailed CV",
    requiredFor: "All members",
  },
  {
    id: "academicEvidence",
    label: "Evidence of teaching, research or publications",
    requiredFor: "Academic categories",
    multiple: true,
  },
  {
    id: "portfolio",
    label: "Professional portfolio or statement of experience",
    requiredFor: "Fellow, mature entry",
    multiple: true,
  },
  {
    id: "cpdRecord",
    label: "CPD record for the last 3 years",
    requiredFor: "Membership upgrade to Fellow",
    multiple: true,
  },
  {
    id: "taxAgentRegistration",
    label: "IRD tax agent or authorised representative registration",
    requiredFor: "Where claimed",
  },
  {
    id: "currentStudies",
    label:
      "Evidence of current studies (e.g. AAT, CA, CTA, CITSL, ACCA, CMA, HNDA or undergraduate studies)",
    requiredFor: "Affiliate",
    multiple: true,
  },
  {
    id: "payment",
    label: "Proof of payment",
    requiredFor: "All members",
  },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function DocumentsStep({
  data,
  updateData,
}: DocumentsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (
    documentId: string,
    event: React.ChangeEvent<HTMLInputElement>,
    multiple: boolean
  ) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length === 0) {
      return;
    }

    const oversizedFile = selectedFiles.find(
      (file: File) => file.size > MAX_FILE_SIZE
    );

    if (oversizedFile) {
      setErrors((previous) => ({
        ...previous,
        [documentId]: `"${oversizedFile.name}" is larger than 10 MB.`,
      }));

      event.target.value = "";
      return;
    }

    setErrors((previous) => ({
      ...previous,
      [documentId]: "",
    }));

    const existingFiles: File[] = data.documents[documentId] ?? [];

    const updatedFiles: File[] = multiple
      ? [...existingFiles, ...selectedFiles]
      : [selectedFiles[0]];

    updateData({
      documents: {
        ...data.documents,
        [documentId]: updatedFiles,
      },
    });

    // Allow selecting the same file again if necessary
    event.target.value = "";
  };

  const removeFile = (documentId: string, fileIndex: number) => {
    const existingFiles: File[] = data.documents[documentId] ?? [];

    const updatedFiles: File[] = existingFiles.filter(
      (_file: File, index: number) => index !== fileIndex
    );

    updateData({
      documents: {
        ...data.documents,
        [documentId]: updatedFiles,
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
          Documents checklist
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Attach certified copies where required. Documents should be certified
          by an Attorney-at-Law, Justice of the Peace, Notary Public or an
          ACCTA Fellow.
        </p>

        <p className="mt-2 text-sm text-accta-muted">
          Upload PDF or JPG files. Maximum file size is 10 MB per file.
        </p>
      </div>

      {/* Document checklist */}
      <div className="mt-6 space-y-4">
        {documents.map((document) => {
          const selectedFiles: File[] =
            data.documents[document.id] ?? [];

          return (
            <div
              key={document.id}
              className="rounded-md border border-accta-border bg-white p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold text-accta-ink">
                    {document.label}
                  </p>

                  <p className="mt-1 text-xs text-accta-muted">
                    Required category: {document.requiredFor}
                  </p>

                  {document.multiple && (
                    <p className="mt-1 text-xs text-accta-maroon">
                      You may upload multiple files.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={document.id}
                    className="inline-flex cursor-pointer items-center rounded-md bg-accta-maroon px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    {document.multiple ? "Add files" : "Choose file"}
                  </label>

                  <input
                    id={document.id}
                    type="file"
                    accept=".pdf,.jpg,.jpeg"
                    multiple={document.multiple === true}
                    className="hidden"
                    onChange={(event) =>
                      handleFileChange(
                        document.id,
                        event,
                        document.multiple === true
                      )
                    }
                  />
                </div>
              </div>

              {/* Selected files */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-accta-border pt-4">
                  {selectedFiles.map((file: File, index: number) => (
                    <div
                      key={`${file.name}-${file.lastModified}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-md bg-accta-surface px-3 py-2"
                    >
                      <span className="min-w-0 truncate text-sm text-accta-ink">
                        {file.name}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeFile(document.id, index)
                        }
                        className="shrink-0 text-sm font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {errors[document.id] && (
                <p className="mt-3 text-sm text-red-600">
                  {errors[document.id]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-md border-l-4 border-accta-gold bg-accta-surface px-5 py-4">
        <p className="text-sm leading-6 text-accta-ink">
          Please ensure that all uploaded documents are clear, readable and
          relevant to your membership application.
        </p>
      </div>
    </div>
  );
}