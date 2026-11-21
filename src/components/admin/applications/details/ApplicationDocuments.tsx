
"use client";

import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";

type DocumentItem = {
  id: string;
  documentType: string;
  originalName: string;
  fileSize?: string | number | null;
  uploadedAt?: string;
};

type Props = {
  documents: DocumentItem[];
  applicationId: string;
  applicationType: "individual" | "corporate";
};

export default function ApplicationDocuments({
  documents,
  applicationId,
  applicationType,
}: Props) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function downloadDocument(documentId: string) {
    setDownloading(documentId);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/membership-applications/${encodeURIComponent(applicationId)}/documents/${encodeURIComponent(documentId)}?type=${applicationType}`
      );

      if (!response.ok) {
        throw new Error("Unable to download this document.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const disposition = response.headers.get("Content-Disposition");
      const fileNameMatch = disposition?.match(/filename="([^"]+)"/);

      link.download = fileNameMatch?.[1] ?? "application-document";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Download failed."
      );
    } finally {
      setDownloading(null);
    }
  }

  return (
    <section className="rounded-xl border border-[#dde1e8] bg-white p-6">
      <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-[#1f2e4d]">
        <FileText size={20} />
        Uploaded Documents
      </h2>

      {error && (
        <p className="mb-4 text-sm text-red-600">{error}</p>
      )}

      {documents.length === 0 ? (
        <p className="text-sm text-[#4a5263]">
          No documents uploaded.
        </p>
      ) : (
        <div className="space-y-3">
          {documents.map((document) => (
            <div
              key={document.id}
              className="flex flex-col gap-3 rounded-lg border border-[#dde1e8] bg-[#f4f6f9] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white p-2 text-[#7b2329]">
                  <FileText size={20} />
                </div>

                <div>
                  <p className="font-semibold text-[#1f2e4d]">
                    {document.originalName}
                  </p>
                  <p className="mt-1 text-xs text-[#4a5263]">
                    {document.documentType.replaceAll("_", " ")}
                  </p>
                </div>
              </div>

              <button
                onClick={() => downloadDocument(document.id)}
                disabled={downloading !== null}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1f2e4d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#15203a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {downloading === document.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Download size={15} />
                )}
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
