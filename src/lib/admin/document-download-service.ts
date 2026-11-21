
import fs from "fs/promises";
import path from "path";

import { prisma } from "@/lib/prisma";

type ApplicationType = "individual" | "corporate";

export async function getApplicationDocument(
  applicationId: string,
  documentId: string,
  type: ApplicationType
) {
  const document =
    type === "individual"
      ? await prisma.individualDocument.findFirst({
          where: {
            id: documentId,
            applicationId,
          },
        })
      : await prisma.corporateDocument.findFirst({
          where: {
            id: documentId,
            applicationId,
          },
        });

  if (!document) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }

  const uploadRoot = path.resolve(
    process.cwd(),
    "upload-documents"
  );

  const filePath = path.resolve(
    process.cwd(),
    document.filePath
  );

  // Prevent access to files outside the upload directory.
  if (
    !filePath.startsWith(uploadRoot + path.sep)
  ) {
    throw new Error("INVALID_FILE_PATH");
  }

  let fileBuffer: Buffer;

  try {
    fileBuffer = await fs.readFile(filePath);
  } catch {
    throw new Error("FILE_NOT_FOUND");
  }

  return {
    buffer: fileBuffer,
    fileName: document.originalName,
    mimeType: document.mimeType,
  };
}
