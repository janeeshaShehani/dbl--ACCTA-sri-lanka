
import { NextRequest, NextResponse } from "next/server";
import { getApplicationDocument } from "@/lib/admin/document-download-service";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
    documentId: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id, documentId } = await params;
    const type = request.nextUrl.searchParams.get("type");

    if (
      !id ||
      !documentId ||
      (type !== "individual" && type !== "corporate")
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid download request." },
        { status: 400 }
      );
    }

    const document = await getApplicationDocument(
      id,
      documentId,
      type
    );

    const safeFileName = document.fileName.replace(
      /[\r\n"]/g,
      "_"
    );

    return new NextResponse(
      new Uint8Array(document.buffer),
      {
        status: 200,
        headers: {
          "Content-Type": document.mimeType,
          "Content-Disposition": `attachment; filename="${safeFileName}"; filename*=UTF-8''${encodeURIComponent(document.fileName)}`,
          "Content-Length": String(document.buffer.length),
          "Cache-Control": "private, no-store",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (error) {
    console.error("Document download error:", error);

    if (
      error instanceof Error &&
      error.message === "DOCUMENT_NOT_FOUND"
    ) {
      return NextResponse.json(
        { success: false, message: "Document not found." },
        { status: 404 }
      );
    }

    if (
      error instanceof Error &&
      error.message === "FILE_NOT_FOUND"
    ) {
      return NextResponse.json(
        { success: false, message: "Uploaded file not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Unable to download document." },
      { status: 500 }
    );
  }
}
