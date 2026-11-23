
"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import type { IndividualApplication } from "@/types/application";

type DocumentsStepProps = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
  validationErrors?: Record<string, string>;
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
    label: "Professional membership certificates and current good-standing letters",
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
    label: "Employer letter(s) confirming position, period and taxation duties",
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
    label: "Evidence of current studies (e.g. AAT, CA, CTA, CITSL, ACCA, CMA, HNDA or undergraduate studies)",
    requiredFor: "Affiliate",
    multiple: true,
  },
  {
  id: "payment",
  label: "Proof of membership application fee payment",
  requiredFor: "All applicants",
},
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_TOTAL_FILES = 30;

const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg"];

const getFileExtension = (fileName: string) =>
  fileName.toLowerCase().slice(fileName.lastIndexOf("."));

const isValidFileType = (file: File) => {
  const extension = getFileExtension(file.name);

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return false;
  }

  // Allow an empty MIME type because some browsers do not provide it.
  if (!file.type) {
    return true;
  }

  if (extension === ".pdf") {
    return file.type === "application/pdf";
  }

  return file.type === "image/jpeg";
};

export default function DocumentsStep({
  data,
  updateData,
  validationErrors = {},
}: DocumentsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSelectedFiles = Object.values(data.documents).reduce(
    (total, files) => total + (files?.length ?? 0),
    0
  );

  const handleFileChange = (
    documentId: string,
    event: ChangeEvent<HTMLInputElement>,
    multiple: boolean
  ) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length === 0) return;

    const existingFiles: File[] = data.documents[documentId] ?? [];

    const invalidFile = selectedFiles.find(
      (file) => !isValidFileType(file)
    );

    if (invalidFile) {
      setErrors((previous) => ({
        ...previous,
        [documentId]: `"${invalidFile.name}" is not a valid file. Please upload PDF or JPG files only.`,
      }));

      event.target.value = "";
      return;
    }

    const oversizedFile = selectedFiles.find(
      (file) => file.size === 0 || file.size > MAX_FILE_SIZE
    );

    if (oversizedFile) {
      setErrors((previous) => ({
        ...previous,
        [documentId]:
          oversizedFile.size === 0
            ? `"${oversizedFile.name}" is empty. Please choose another file.`
            : `"${oversizedFile.name}" is larger than 10 MB. Please choose a smaller file.`,
      }));

      event.target.value = "";
      return;
    }

    if (!multiple && selectedFiles.length > 1) {
      setErrors((previous) => ({
        ...previous,
        [documentId]: "Only one file can be uploaded in this category.",
      }));

      event.target.value = "";
      return;
    }

    const updatedFiles = multiple
      ? [...existingFiles, ...selectedFiles]
      : [selectedFiles[0]];

    const updatedTotal =
      totalSelectedFiles - existingFiles.length + updatedFiles.length;

    if (updatedTotal > MAX_TOTAL_FILES) {
      setErrors((previous) => ({
        ...previous,
        [documentId]: `You can upload a maximum of ${MAX_TOTAL_FILES} files in total.`,
      }));

      event.target.value = "";
      return;
    }

    setErrors((previous) => ({
      ...previous,
      [documentId]: "",
    }));

    updateData({
      documents: {
        ...data.documents,
        [documentId]: updatedFiles,
      },
    });

    event.target.value = "";
  };

  const removeFile = (documentId: string, fileIndex: number) => {
    const existingFiles: File[] = data.documents[documentId] ?? [];

    const updatedFiles = existingFiles.filter(
      (_, index) => index !== fileIndex
    );

    updateData({
      documents: {
        ...data.documents,
        [documentId]: updatedFiles,
      },
    });

    setErrors((previous) => ({
      ...previous,
      [documentId]: "",
    }));
  };

  return (
    <div>
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

        <p className="mt-2 text-sm text-accta-muted">
          You may upload a maximum of 30 files in total.
        </p>

        <p className="mt-2 text-sm font-medium text-accta-maroon">
          {totalSelectedFiles} of {MAX_TOTAL_FILES} files selected
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {documents.map((document) => {
          const selectedFiles: File[] =
            data.documents[document.id] ?? [];

          const documentError =
            validationErrors[document.id] || errors[document.id];

          return (
            <div
              key={document.id}
              className={`rounded-md border bg-white p-5 transition ${
                documentError
                  ? "border-red-500"
                  : "border-accta-border"
              }`}
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
                    accept=".pdf,.jpg,.jpeg,application/pdf,image/jpeg"
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

              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-accta-border pt-4">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={`${file.name}-${file.lastModified}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-md bg-accta-surface px-3 py-2"
                    >
                      <div className="min-w-0">
                        <span className="block truncate text-sm text-accta-ink">
                          {file.name}
                        </span>

                        <span className="text-xs text-accta-muted">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(document.id, index)}
                        className="shrink-0 text-sm font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {documentError && (
                <p className="mt-3 text-sm text-red-600">
                  {documentError}
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
