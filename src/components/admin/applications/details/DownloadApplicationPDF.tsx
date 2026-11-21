
"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

type Props = {
  applicationId: string;
  applicationType: "individual" | "corporate";
};

export default function DownloadApplicationPDF({
  applicationId,
  applicationType,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/admin/membership-applications/${encodeURIComponent(applicationId)}/pdf?type=${applicationType}`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to download application PDF.",
        );
      }

      const blob = await response.blob();

      // Get the filename from the API response header
      const disposition = response.headers.get("Content-Disposition");

      const match = disposition?.match(/filename="?([^";]+)"?/i);

      const fileName = match?.[1] || "membership-application.pdf";

      // Download the PDF
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);

    } catch (error) {
      console.error("PDF Download Error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to download the PDF.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-lg bg-[#1f2e4d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15203a] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <Loader2 size={17} className="animate-spin" />
      ) : (
        <Download size={17} />
      )}

      {loading ? "Generating PDF..." : "Download PDF"}
    </button>
  );
}
