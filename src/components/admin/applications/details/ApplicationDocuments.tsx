
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import {
  Download,
  Eye,
  FileText,
  Loader2,
  X,
  Printer,
} from "lucide-react";

const PdfDocumentViewer = dynamic(
  () => import("./PdfDocumentViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-1 items-center justify-center gap-3 bg-[#e2e6ed] text-[#4a5263]">
        <Loader2 size={24} className="animate-spin" />
        Loading document viewer...
      </div>
    ),
  }
);

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
  documentId: string;
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

  // Clean up the previous preview URL when the preview changes or closes.
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

    if (contentType.includes("pdf") || extension === "pdf") {
      return "application/pdf";
    }

    if (
      contentType.includes("jpeg") ||
      contentType.includes("jpg") ||
      extension === "jpg" ||
      extension === "jpeg"
    ) {
      return "image/jpeg";
    }

    if (contentType.includes("png") || extension === "png") {
      return "image/png";
    }

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
        throw new Error(
          "Preview is not supported for this file type."
        );
      }

      const url = URL.createObjectURL(blob);

      setPreview({
        url,
        name: document.originalName,
        type: fileType,
        documentId: document.id,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to preview document."
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

      link.download =
        fileNameMatch?.[1] ?? "application-document";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
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

  function handlePrint() {
    if (!preview) return;

    const printWindow = window.open(preview.url, "_blank");

    if (!printWindow) {
      setError("Please allow pop-ups to print this document.");
      return;
    }

    printWindow.onload = () => {
      printWindow.print();
    };
  }

  return (
    <>
      {/* Uploaded Documents Section */}
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

      {/* Full-Screen Document Viewer */}
      {preview && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-[#e9edf3]">

          {/* Viewer Header */}
          <header className="flex min-h-[72px] shrink-0 items-center justify-between gap-3 bg-[#15203a] px-4 py-3 text-white sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="hidden rounded-lg bg-white/10 p-2 sm:block">
                <FileText size={23} />
              </div>

              <div className="min-w-0">
                <h2 className="font-bold tracking-wide">
                  ACCTA | Document Viewer
                </h2>

                <p className="truncate text-xs text-slate-300">
                  {preview.name}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                title="Print document"
                className="rounded-lg p-2.5 hover:bg-white/10"
              >
                <Printer size={19} />
              </button>

              <button
                type="button"
                onClick={() =>
                  downloadDocument(preview.documentId)
                }
                disabled={downloading !== null}
                title="Download document"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#15203a] hover:bg-slate-200 disabled:opacity-50"
              >
                {downloading === preview.documentId ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Download size={17} />
                )}
                <span className="hidden sm:inline">Download</span>
              </button>

              <button
                type="button"
                onClick={closePreview}
                title="Close viewer"
                className="ml-1 rounded-lg p-2.5 hover:bg-[#7b2329]"
              >
                <X size={22} />
              </button>
            </div>
          </header>

          {/* Main Viewer Content */}
          {preview.type === "application/pdf" ? (
            <PdfDocumentViewer fileUrl={preview.url} />
          ) : (
            <main className="min-w-0 flex-1 overflow-auto bg-[#e2e6ed] p-4 sm:p-8">
              <div className="flex min-h-full items-center justify-center">
                <img
                  src={preview.url}
                  alt={preview.name}
                  className="max-h-full max-w-full rounded-sm bg-white object-contain shadow-xl"
                />
              </div>
            </main>
          )}

          {/* Viewer Footer */}
          <footer className="flex min-h-[42px] shrink-0 items-center justify-between border-t border-[#d8dee8] bg-white px-4 py-2 sm:px-6">
            <p className="truncate text-xs text-[#4a5263]">
              ACCTA Sri Lanka | Membership Administration
            </p>

            <p className="shrink-0 text-xs font-medium text-[#4a5263]">
              {preview.type === "application/pdf"
                ? "PDF Document"
                : "Image Document"}
            </p>
          </footer>
        </div>
      )}
    </>
  );
}
