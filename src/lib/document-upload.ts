
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

export type UploadedFile = {
  documentType: string;
  name: string;
  path: string;
};

type UploadConfig = {
  folderName: string;
  allowedDocumentTypes: string[];
  multipleDocumentTypes?: string[];
  allowedMimeTypes: string[];
  maxFiles: number;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_TOTAL_SIZE = 100 * 1024 * 1024;

function detectFileType(buffer: Buffer): string | null {
  // PDF
  if (
    buffer.length >= 5 &&
    buffer.subarray(0, 5).toString() === "%PDF-"
  ) {
    return "application/pdf";
  }

  // JPEG
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return "image/jpeg";
  }

  // PNG
  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
    )
  ) {
    return "image/png";
  }

  return null;
}

function getExtension(mimeType: string): string {
  switch (mimeType) {
    case "application/pdf":
      return ".pdf";
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    default:
      throw new Error("Unsupported file type.");
  }
}

export async function saveApplicationDocuments(
  formData: FormData,
  config: UploadConfig
): Promise<UploadedFile[]> {
  const applicationId = formData.get("applicationId");
  const files = formData.getAll("files");
  const documentTypes = formData.getAll("documentTypes");

  if (
    typeof applicationId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      applicationId
    )
  ) {
    throw new Error("A valid application ID is required.");
  }

  if (files.length === 0) {
    throw new Error("Please upload at least one document.");
  }

  if (files.length !== documentTypes.length) {
    throw new Error("Document type information is missing.");
  }

  if (files.length > config.maxFiles) {
    throw new Error(
      `You can upload a maximum of ${config.maxFiles} files.`
    );
  }

  const typeCounts = new Map<string, number>();

  for (const documentType of documentTypes) {
    if (
      typeof documentType !== "string" ||
      !config.allowedDocumentTypes.includes(documentType)
    ) {
      throw new Error("An invalid document type was submitted.");
    }

    const count = (typeCounts.get(documentType) ?? 0) + 1;
    typeCounts.set(documentType, count);

    if (
      count > 1 &&
      !config.multipleDocumentTypes?.includes(documentType)
    ) {
      throw new Error(
        `Only one file is allowed for ${documentType}.`
      );
    }
  }

  const validatedFiles: {
    file: File;
    documentType: string;
    buffer: Buffer;
    mimeType: string;
  }[] = [];

  let totalSize = 0;

  for (let index = 0; index < files.length; index++) {
    const item = files[index];
    const documentType = documentTypes[index];

    if (!(item instanceof File) || item.size === 0) {
      throw new Error("An uploaded file is empty or invalid.");
    }

    if (item.size > MAX_FILE_SIZE) {
      throw new Error(
        `${item.name} exceeds the 10 MB file size limit.`
      );
    }

    totalSize += item.size;

    if (totalSize > MAX_TOTAL_SIZE) {
      throw new Error("The total upload size exceeds 100 MB.");
    }

    const buffer = Buffer.from(await item.arrayBuffer());
    const mimeType = detectFileType(buffer);

    if (
      !mimeType ||
      !config.allowedMimeTypes.includes(mimeType)
    ) {
      throw new Error(
        `${item.name} is not a supported file.`
      );
    }

    validatedFiles.push({
      file: item,
      documentType: documentType as string,
      buffer,
      mimeType,
    });
  }

  const uploadDirectory = path.join(
    process.cwd(),
    "upload-documents",
    config.folderName,
    applicationId
  );

  await fs.mkdir(uploadDirectory, { recursive: true });

  const uploadedFiles: UploadedFile[] = [];

  try {
    for (const item of validatedFiles) {
      const uniqueFileName =
        `${randomUUID()}${getExtension(item.mimeType)}`;

      const filePath = path.join(
        uploadDirectory,
        uniqueFileName
      );

      await fs.writeFile(filePath, item.buffer, {
        flag: "wx",
      });

      uploadedFiles.push({
        documentType: item.documentType,
        name: item.file.name,
        path: `upload-documents/${config.folderName}/${applicationId}/${uniqueFileName}`,
      });
    }

    return uploadedFiles;
  } catch (error) {
    // Remove files already saved if a later write fails.
    await Promise.all(
      uploadedFiles.map((file) =>
        fs.unlink(
          path.join(process.cwd(), file.path)
        ).catch(() => undefined)
      )
    );

    throw error;
  }
}
