
"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Loader2,
} from "lucide-react";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type Props = {
  fileUrl: string;
};

export default function PdfDocumentViewer({ fileUrl }: Props) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState("");

  function changeZoom(amount: number) {
    setZoom((current) =>
      Math.min(2, Math.max(0.5, current + amount))
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* PDF Toolbar */}
      <div className="flex min-h-[54px] shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#d8dee8] bg-white px-4 py-2 sm:px-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setPageNumber((current) => Math.max(1, current - 1))
            }
            disabled={pageNumber <= 1}
            className="rounded-md p-2 text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="min-w-[95px] text-center text-sm font-semibold text-[#1f2e4d]">
            Page {pageNumber} / {numPages || "..."}
          </span>

          <button
            type="button"
            onClick={() =>
              setPageNumber((current) =>
                Math.min(numPages, current + 1)
              )
            }
            disabled={!numPages || pageNumber >= numPages}
            className="rounded-md p-2 text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => changeZoom(-0.1)}
            disabled={zoom <= 0.5}
            title="Zoom out"
            className="rounded-md p-2 text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:opacity-30"
          >
            <ZoomOut size={19} />
          </button>

          <span className="min-w-[55px] text-center text-sm font-semibold text-[#1f2e4d]">
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={() => changeZoom(0.1)}
            disabled={zoom >= 2}
            title="Zoom in"
            className="rounded-md p-2 text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:opacity-30"
          >
            <ZoomIn size={19} />
          </button>

          <button
            type="button"
            onClick={() => setZoom(1)}
            title="Reset zoom"
            className="rounded-md p-2 text-[#1f2e4d] hover:bg-[#f4f6f9]"
          >
            <Maximize2 size={17} />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex min-h-0 flex-1">
        <Document
          key={fileUrl}
          file={fileUrl}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            setPageNumber(1);
            setError("");
          }}
          onLoadError={() => {
            setError("Unable to load this PDF document.");
          }}
          loading={
            <div className="flex flex-1 items-center justify-center gap-3 text-[#4a5263]">
              <Loader2 size={24} className="animate-spin" />
              Loading PDF document...
            </div>
          }
          error={
            <p className="p-8 text-center text-red-600">
              Unable to display this PDF document.
            </p>
          }
          className="flex min-h-0 flex-1"
        >
          {/* Page Thumbnails */}
          <aside className="flex w-[105px] shrink-0 flex-col border-r border-[#d8dee8] bg-[#f4f6f9] sm:w-[190px]">
            <div className="border-b border-[#d8dee8] px-3 py-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a5263]">
                Pages
              </h3>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-2 sm:p-3">
              {Array.from(
                { length: numPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setPageNumber(page)}
                  className={`flex w-full flex-col items-center gap-2 rounded-lg border-2 p-2 transition-colors ${
                    pageNumber === page
                      ? "border-[#7b2329] bg-white shadow-sm"
                      : "border-transparent bg-white hover:border-[#c7ced9]"
                  }`}
                >
                  <div className="pointer-events-none overflow-hidden bg-white">
                    <Page
                      pageNumber={page}
                      width={125}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>

                  <span className="text-xs font-semibold text-[#1f2e4d]">
                    Page {page}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main PDF Page */}
          <main className="min-w-0 flex-1 overflow-auto bg-[#e2e6ed] p-4 sm:p-8">
            {error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : (
              <div className="flex justify-center">
                <div className="bg-white shadow-xl">
                  <Page
                    pageNumber={pageNumber}
                    scale={zoom}
                    width={760}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    loading={
                      <div className="flex h-[500px] items-center justify-center">
                        <Loader2
                          className="animate-spin text-[#1f2e4d]"
                          size={32}
                        />
                      </div>
                    }
                  />
                </div>
              </div>
            )}
          </main>
        </Document>
      </div>

      {/* PDF Footer */}
      <footer className="flex min-h-[42px] shrink-0 items-center justify-between border-t border-[#d8dee8] bg-white px-4 py-2 sm:px-6">
        <p className="text-xs text-[#4a5263]">
          ACCTA Sri Lanka | Membership Administration
        </p>

        <p className="text-xs font-medium text-[#4a5263]">
          {numPages} pages
        </p>
      </footer>
    </div>
  );
}
