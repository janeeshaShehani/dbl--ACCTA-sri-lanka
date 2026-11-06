import { FileText } from "lucide-react";

export default function GoverningDocuments() {

    const documents = [
    { title: "Code of Ethics and Professional Conduct", type: "PDF" },
    { title: "CPD Regulations", type: "PDF" },
    { title: "Annual Report [Year]", type: "PDF" },
  ]

  return (
    <section id="governing-documents" className="scroll-mt-8">
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        GOVERNING DOCUMENTS
      </p>

      <div className="mt-6 overflow-hidden rounded-md border border-accta-border">
        {documents.map((document, index) => (
          <div
            key={document.title}
            className={`flex items-center justify-between gap-4 px-5 py-5 ${
              index !== documents.length - 1
                ? "border-b border-accta-border"
                : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <FileText
                size={20}
                className="text-accta-maroon"
              />

              <span className="text-sm font-semibold text-accta-ink">
                {document.title}
              </span>
            </div>

            <span className="text-xs text-accta-muted">
              {document.type} · [size]
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}