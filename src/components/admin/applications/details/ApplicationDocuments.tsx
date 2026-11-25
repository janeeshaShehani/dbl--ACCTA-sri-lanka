
"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Eye,
  FileText,
  Loader2,
  X,
} from "lucide-react";

type DocumentItem = {
  id: string;
  documentType: string;
  originalName: string;
  fileSize?: string | number | null;
  uploadedAt?: string;
};

type PreviewItem = {
  url: string;
  name: string;
  type: string;
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
  const [viewing, setViewing] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewItem | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview?.url) {
        URL.revokeObjectURL(preview.url);
      }
    };
  }, [preview]);

  function getDocumentUrl(documentId: string) {
    return `/api/admin/membership-applications/${encodeURIComponent(
      applicationId
    )}/documents/${encodeURIComponent(
      documentId
    )}?type=${applicationType}`;
  }

  function getFileType(blob: Blob, fileName: string) {
    const contentType = blob.type.toLowerCase();
    const extension = fileName.split(".").pop()?.toLowerCase();

    if (contentType.includes("pdf") || extension === "pdf")
      return "application/pdf";

    if (
      contentType.includes("jpeg") ||
      contentType.includes("jpg") ||
      extension === "jpg" ||
      extension === "jpeg"
    ) {
      return "image/jpeg";
    }

    if (contentType.includes("png") || extension === "png")
      return "image/png";

    return contentType;
  }

  async function viewDocument(document: DocumentItem) {
    setViewing(document.id);
    setError("");

    try {
      const response = await fetch(getDocumentUrl(document.id));

      if (!response.ok) {
        throw new Error("Unable to open this document.");
      }

      const blob = await response.blob();
      const fileType = getFileType(blob, document.originalName);

      if (
        fileType !== "application/pdf" &&
        fileType !== "image/jpeg" &&
        fileType !== "image/png"
      ) {
        throw new Error("Preview is not supported for this file type.");
      }

      const url = URL.createObjectURL(blob);

      setPreview({
        url,
        name: document.originalName,
        type: fileType,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to preview document."
      );
    } finally {
      setViewing(null);
    }
  }

  async function downloadDocument(documentId: string) {
    setDownloading(documentId);
    setError("");

    try {
      const response = await fetch(getDocumentUrl(documentId));

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

  function closePreview() {
    setPreview(null);
  }

  return (
    <>
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
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-lg bg-white p-2 text-[#7b2329]">
                    <FileText size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="break-all font-semibold text-[#1f2e4d]">
                      {document.originalName}
                    </p>
                    <p className="mt-1 text-xs capitalize text-[#4a5263]">
                      {document.documentType.replaceAll("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => viewDocument(document)}
                    disabled={viewing !== null || downloading !== null}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#1f2e4d] bg-white px-4 py-2 text-sm font-semibold text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {viewing === document.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Eye size={16} />
                    )}
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadDocument(document.id)}
                    disabled={downloading !== null || viewing !== null}
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
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Document Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 sm:p-6"
          onClick={closePreview}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Preview: ${preview.name}`}
            className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 border-b border-[#dde1e8] px-5 py-4">
              <div className="min-w-0">
                <h3 className="font-bold text-[#1f2e4d]">
                  Document Preview
                </h3>
                <p className="mt-1 truncate text-xs text-[#4a5263]">
                  {preview.name}
                </p>
              </div>

              <button
                type="button"
                onClick={closePreview}
                aria-label="Close document preview"
                className="shrink-0 rounded-lg p-2 text-[#4a5263] hover:bg-[#f4f6f9] hover:text-[#7b2329]"
              >
                <X size={22} />
              </button>
            </div>

            {/* Document Content */}
            <div className="min-h-[300px] flex-1 overflow-auto bg-[#f4f6f9] p-3 sm:p-5">
              {preview.type === "application/pdf" ? (
                <iframe
                  src={preview.url}
                  title={preview.name}
                  className="h-[70vh] w-full rounded-lg border border-[#dde1e8] bg-white"
                />
              ) : (
                <div className="flex min-h-[300px] items-center justify-center">
                  <img
                    src={preview.url}
                    alt={preview.name}
                    className="max-h-[70vh] max-w-full rounded-lg object-contain"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-[#dde1e8] px-5 py-3">
              <button
                type="button"
                onClick={closePreview}
                className="rounded-lg bg-[#1f2e4d] px-5 py-2 text-sm font-semibold text-white hover:bg-[#15203a]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
