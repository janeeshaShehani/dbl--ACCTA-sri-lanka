import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const uploadDirectory = path.join(
  process.cwd(),
  "upload-documents",
  "individual-applications-documents"
);

export async function POST(request: NextRequest) {
  try {
    // This route receives FormData
    const formData = await request.formData();

    const files = formData.getAll("files") as File[];
    const applicationId = formData.get("applicationId") as string | null;

    // Validate files
    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files uploaded." },
        { status: 400 }
      );
    }

    // Validate application ID
    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required." },
        { status: 400 }
      );
    }

    // Make application ID safe for a folder name
    const safeApplicationId = applicationId.replace(
      /[^a-zA-Z0-9-_]/g,
      ""
    );

    // Create a separate folder for this application
    const applicationDirectory = path.join(
      uploadDirectory,
      safeApplicationId
    );

    if (!fs.existsSync(applicationDirectory)) {
      fs.mkdirSync(applicationDirectory, { recursive: true });
    }

    const uploadedFiles: string[] = [];

    // Save each uploaded file
    for (const file of files) {
      if (!(file instanceof File) || file.size === 0) {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create a safe and unique filename
      const safeFileName = file.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "-"
      );

      const uniqueFileName = `${Date.now()}-${safeFileName}`;
      

      const filePath = path.join(
        applicationDirectory,
        uniqueFileName
      );

      // Save the file
      fs.writeFileSync(filePath, buffer);

      // Store the relative file path
      uploadedFiles.push(
        `upload-documents/individual-applications-documents/${safeApplicationId}/${uniqueFileName}`
      );
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