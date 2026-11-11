"use client";

import type { ChangeEvent } from "react";
import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
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
}: Props) {
  const handleFileChange = (
    documentId: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      alert("Please upload a PDF, JPG, or PNG file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    updateData({
      documents: {
        ...data.documents,
        [documentId]: file,
      },
    });
  };

  return (
    <div>
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

      <div className="mt-6 space-y-4">
        {documents.map((document) => {
          const selectedFile = data.documents[document.id];

          return (
            <div
              key={document.id}
              className="flex flex-col gap-3 rounded-md border border-accta-border p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-accta-ink">
                  {document.label}

                  {document.optional && (
                    <span className="ml-2 text-xs font-normal text-accta-muted">
                      (If applicable)
                    </span>
                  )}
                </p>

                {selectedFile && (
                  <p className="mt-1 text-xs text-green-600">
                    File selected: {selectedFile.name}
                  </p>
                )}
              </div>

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
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(event) =>
                    handleFileChange(document.id, event)
                  }
                />

                <span className="max-w-[180px] truncate text-sm text-accta-muted">
                  {selectedFile ? "Uploaded" : "No file chosen"}
                </span>
              </div>
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