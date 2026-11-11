import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const uploadDirectory = path.join(
  process.cwd(),
  "upload-documents",
  "corporate-applications-documents"
);

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // Make sure this route receives FormData
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Request must use multipart/form-data." },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    const applicationId = formData.get("applicationId");

    if (typeof applicationId !== "string" || !applicationId.trim()) {
      return NextResponse.json(
        { error: "Application ID is required." },
        { status: 400 }
      );
    }

    const files = formData.getAll("files");

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No documents were provided." },
        { status: 400 }
      );
    }

    // Create a separate folder for each corporate application
    const applicationDirectory = path.join(
      uploadDirectory,
      applicationId
    );

    if (!fs.existsSync(applicationDirectory)) {
      fs.mkdirSync(applicationDirectory, { recursive: true });
    }

    const uploadedFiles: string[] = [];

    for (const item of files) {
      if (!(item instanceof File) || item.size === 0) {
        continue;
      }

      const bytes = await item.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create a safe filename
      const safeFileName = item.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );

      const uniqueFileName = `${Date.now()}-${safeFileName}`;

      const filePath = path.join(
        applicationDirectory,
        uniqueFileName
      );

      fs.writeFileSync(filePath, buffer);

      uploadedFiles.push(
        `upload-documents/corporate-applications-documents/${applicationId}/${uniqueFileName}`
      );
    }

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { error: "No valid documents were uploaded." },
        { status: 400 }
      );
    }

    console.log("Corporate documents uploaded successfully.");
    console.log("Application ID:", applicationId);
    console.log("Files:", uploadedFiles);

    return NextResponse.json(
      {
        success: true,
        message: "Corporate documents uploaded successfully.",
        files: uploadedFiles,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Corporate document upload error:", error);

    return NextResponse.json(
      { error: "Unable to upload corporate documents." },
      { status: 500 }
    );
  }
}