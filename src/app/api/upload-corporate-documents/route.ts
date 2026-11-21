
import { NextRequest, NextResponse } from "next/server";
import { saveApplicationDocuments } from "@/lib/document-upload";

export const runtime = "nodejs";

const corporateDocumentTypes = [
  "incorporation",
  "directors",
  "boardResolution",
  "companyProfile",
  "taxationEvidence",
  "irdRegistration",
  "professionalInsurance",
  "representativeMembership",
  "identityDocuments",
  "auditedStatements",
  "paymentProof",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const files = await saveApplicationDocuments(formData, {
      folderName: "corporate-applications-documents",
      allowedDocumentTypes: corporateDocumentTypes,
      allowedMimeTypes: [
        "application/pdf",
        "image/jpeg",
        "image/png",
      ],
      maxFiles: corporateDocumentTypes.length,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Corporate documents uploaded successfully.",
        files,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Corporate document upload error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to upload corporate documents.";

    const status =
      message.includes("required") ||
      message.includes("invalid") ||
      message.includes("missing") ||
      message.includes("maximum") ||
      message.includes("allowed") ||
      message.includes("exceeds") ||
      message.includes("supported") ||
      message.includes("empty")
        ? 400
        : 500;

    return NextResponse.json(
      { success: false, error: message },
      { status }
    );
  }
}
