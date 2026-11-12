import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const uploadDirectory = path.join(
  process.cwd(),
  "upload-documents",
  "individual-applications-documents"
);

type UploadedFile = {
  documentType: string;
  name: string;
  path: string;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const files = formData.getAll("files");
    const documentTypes = formData.getAll("documentTypes");

    const applicationId = formData.get("applicationId");

    if (
      typeof applicationId !== "string" ||
      applicationId.trim() === ""
    ) {
      return NextResponse.json(
        { error: "Application ID is required." },
        { status: 400 }
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files uploaded." },
        { status: 400 }
      );
    }

    // Make sure every file has a document type
    if (files.length !== documentTypes.length) {
      return NextResponse.json(
        { error: "Document type information is missing." },
        { status: 400 }
      );
    }

    const safeApplicationId = applicationId.replace(
      /[^a-zA-Z0-9-_]/g,
      ""
    );

    const applicationDirectory = path.join(
      uploadDirectory,
      safeApplicationId
    );

    if (!fs.existsSync(applicationDirectory)) {
      fs.mkdirSync(applicationDirectory, { recursive: true });
    }

    const uploadedFiles: UploadedFile[] = [];

    for (let index = 0; index < files.length; index++) {
      const item = files[index];
      const documentType = documentTypes[index];

      if (
        !(item instanceof File) ||
        item.size === 0 ||
        typeof documentType !== "string"
      ) {
        continue;
      }

      const bytes = await item.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const safeFileName = item.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "-"
      );

      const uniqueFileName = `${Date.now()}-${safeFileName}`;

      const filePath = path.join(
        applicationDirectory,
        uniqueFileName
      );

      fs.writeFileSync(filePath, buffer);

      const relativePath =
        `upload-documents/individual-applications-documents/` +
        `${safeApplicationId}/${uniqueFileName}`;

      uploadedFiles.push({
        documentType,
        name: item.name,
        path: relativePath,
      });
    }

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { error: "No valid files were uploaded." },
        { status: 400 }
      );
    }

    console.log("Documents uploaded successfully.");
    console.log("Application ID:", applicationId);
    console.log("Files:", uploadedFiles);

    return NextResponse.json(
      {
        success: true,
        message: "Documents uploaded successfully.",
        files: uploadedFiles,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Document upload error:", error);

    return NextResponse.json(
      { error: "Unable to upload documents." },
      { status: 500 }
    );
  }
}