"use client";

import { useState, type ChangeEvent } from "react";
import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
  validationErrors?: Record<string, string>;
};

const documents = [
  {
    id: "incorporation",
    label:
      "Certificate of incorporation / business registration (certified copy)",
  },
  {
    id: "directors",
    label:
      "Form 1 / Form 20 or equivalent showing current directors, or partnership deed",
  },
  {
    id: "boardResolution",
    label:
      "Board resolution or partners' authorisation approving this application and the nominee",
  },
  {
    id: "companyProfile",
    label: "Company / firm profile and organisation chart",
  },
  {
    id: "taxationEvidence",
    label:
      "Evidence of years in taxation services (e.g. engagement letters, IRD agent registration, audited accounts)",
  },
  {
    id: "irdRegistration",
    label:
      "IRD tax agent / authorised representative registration certificates",
  },
  {
    id: "professionalInsurance",
    label:
      "Professional indemnity insurance certificate (if applying for practicing as a firm)",
    optional: true,
  },
  {
    id: "representativeMembership",
    label:
      "ACCTA membership certificate of the nominated representative, or Form M-01",
  },
  {
    id: "identityDocuments",
    label: "NIC / passport copies of directors or partners",
  },
  {
    id: "auditedStatements",
    label: "Latest audited financial statements",
  },
  {
    id: "paymentProof",
    label: "Proof of payment",
  },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export default function CorporateDocumentsStep({
  data,
  updateData,
  validationErrors = {},
}: Props) {
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const handleFileChange = (
    documentId: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Clear previous error
    setFileErrors((prev) => ({
      ...prev,
      [documentId]: "",
    }));

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileErrors((prev) => ({
        ...prev,
        [documentId]: "Please upload a PDF, JPG, or PNG file.",
      }));

      event.target.value = "";
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileErrors((prev) => ({
        ...prev,
        [documentId]: "File size must not exceed 10 MB.",
      }));

      event.target.value = "";
      return;
    }

    // Save file
    updateData({
      documents: {
        ...data.documents,
        [documentId]: file,
      },
    });

    event.target.value = "";
  };

  const handleRemoveFile = (documentId: string) => {
    const updatedDocuments = {
      ...data.documents,
    };

    delete updatedDocuments[documentId];

    updateData({
      documents: updatedDocuments,
    });

    setFileErrors((prev) => ({
      ...prev,
      [documentId]: "",
    }));
  };

  return (
    <div>
      {/* Section heading */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION G
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Documents checklist
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Upload the supporting documents required for your corporate
          membership application. PDF, JPG, and PNG files are accepted.
          Maximum file size is 10 MB per document.
        </p>
      </div>

      {/* Documents */}
      <div className="mt-6 space-y-4">
        {documents.map((document) => {
          const selectedFile = data.documents[document.id];

          const hasError =
            Boolean(validationErrors[document.id]) ||
            Boolean(fileErrors[document.id]);

          return (
            <div
              key={document.id}
              className={`rounded-md border p-5 ${
                hasError
                  ? "border-red-500"
                  : "border-accta-border"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Document information */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-accta-ink">
                    {document.label}

                    {!document.optional && (
                      <span className="ml-1 text-red-500">*</span>
                    )}

                    {document.optional && (
                      <span className="ml-2 text-xs font-normal text-accta-muted">
                        (If applicable)
                      </span>
                    )}
                  </p>

                  {selectedFile && (
                    <p className="mt-2 text-xs text-green-600">
                      Selected: {selectedFile.name}
                    </p>
                  )}

                  {validationErrors[document.id] && (
                    <p className="mt-2 text-sm text-red-600">
                      {validationErrors[document.id]}
                    </p>
                  )}

                  {fileErrors[document.id] && (
                    <p className="mt-2 text-sm text-red-600">
                      {fileErrors[document.id]}
                    </p>
                  )}
                </div>

                {/* File controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <label
                    htmlFor={document.id}
                    className="cursor-pointer rounded-md bg-accta-maroon px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    {selectedFile ? "Replace file" : "Choose file"}
                  </label>

                  <input
                    id={document.id}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                    aria-invalid={Boolean(
                      validationErrors[document.id] || fileErrors[document.id]
                    )}
                    aria-describedby={
                      hasError ? `${document.id}-error` : undefined
                    }
                    className="hidden"
                    onChange={(event) =>
                      handleFileChange(document.id, event)
                    }
                  />

                  {selectedFile && (
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFile(document.id)
                      }
                      className="rounded-md border border-accta-border px-3 py-2 text-sm text-accta-muted transition hover:border-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note */}
      <p className="mt-5 text-xs text-accta-muted">
        Please ensure all uploaded copies are clear and readable.
        Required documents are marked with an asterisk (*).
      </p>
    </div>
  );
}