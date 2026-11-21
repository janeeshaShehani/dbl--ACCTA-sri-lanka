
import { NextRequest, NextResponse } from "next/server";
import { saveApplicationDocuments } from "@/lib/document-upload";

export const runtime = "nodejs";

const individualDocumentTypes = [
  "identity",
  "photo",
  "academic",
  "professional",
  "examinationResults",
  "employerLetters",
  "cv",
  "academicEvidence",
  "portfolio",
  "cpdRecord",
  "taxAgentRegistration",
  "currentStudies",
  "payment",
];

const multipleDocumentTypes = [
  "academic",
  "professional",
  "employerLetters",
  "academicEvidence",
  "portfolio",
  "cpdRecord",
  "currentStudies",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const files = await saveApplicationDocuments(formData, {
      folderName: "individual-applications-documents",
      allowedDocumentTypes: individualDocumentTypes,
      multipleDocumentTypes,
      allowedMimeTypes: [
        "application/pdf",
        "image/jpeg",
      ],
      maxFiles: 30,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Individual documents uploaded successfully.",
        files,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Individual document upload error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to upload individual documents.";

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
