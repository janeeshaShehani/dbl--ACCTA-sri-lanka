import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const uploadDirectory = path.join(
  process.cwd(),
  "upload-documents",
  "corporate-applications-documents"
);

type UploadedFile = {
  documentType: string;
  name: string;
  path: string;
};

export async function POST(request: NextRequest) {
  try {
    // Get FormData
    const formData = await request.formData();

    const files = formData.getAll("files");
    const documentTypes = formData.getAll("documentTypes");
    const applicationId = formData.get("applicationId");

    // Validate application ID
    if (
      typeof applicationId !== "string" ||
      applicationId.trim() === ""
    ) {
      return NextResponse.json(
        { error: "Application ID is required." },
        { status: 400 }
      );
    }

    // Validate files
    if (files.length === 0) {
      return NextResponse.json(
        { error: "No documents were provided." },
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

    // Make application ID safe for the folder name
    const safeApplicationId = applicationId.replace(
      /[^a-zA-Z0-9-_]/g,
      ""
    );

    // Create a separate folder for each corporate application
    const applicationDirectory = path.join(
      uploadDirectory,
      safeApplicationId
    );

    if (!fs.existsSync(applicationDirectory)) {
      fs.mkdirSync(applicationDirectory, { recursive: true });
    }

    const uploadedFiles: UploadedFile[] = [];

    // Save each uploaded file
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

      // Create a safe filename
      const safeFileName = item.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "-"
      );

      // Add a unique timestamp to prevent duplicate names
      const uniqueFileName = `${Date.now()}-${safeFileName}`;

      const filePath = path.join(
        applicationDirectory,
        uniqueFileName
      );

      // Save the file
      fs.writeFileSync(filePath, buffer);

      // Store the relative file path
      const relativePath =
        `upload-documents/corporate-applications-documents/` +
        `${safeApplicationId}/${uniqueFileName}`;

      uploadedFiles.push({
        documentType,
        name: item.name,
        path: relativePath,
      });
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