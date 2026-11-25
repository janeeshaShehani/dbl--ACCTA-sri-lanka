
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "../../src/lib/prisma";
import { constants } from "node:fs";

type JsonRecord = Record<string, any>;

const ROOT = process.cwd();
const IMPORT_DIR = path.join(ROOT, "import-data");
const JSON_PATH = path.join(
  IMPORT_DIR,
  "apply-membership-applications.json"
);
const DOCUMENTS_DIR = path.join(
  IMPORT_DIR,
  "individual-applications-documents"
);
const STORAGE_DIR = path.join(
  ROOT,
  "upload-documents",
  "individual-applications-documents"
);

const COMMIT = process.argv.includes("--commit");

function text(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const result = String(value).trim();
  return result ? result : null;
}

function dateValue(value: unknown): Date | null {
  if (!value) return null;

  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

function booleanValue(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return null;

  const normalized = value.trim().toLowerCase();

  if (normalized === "yes" || normalized === "true") return true;
  if (normalized === "no" || normalized === "false") return false;

  return null;
}

function normalizeIdentification(value: unknown): string | null {
  const result = text(value);
  if (!result) return null;

  return result.toUpperCase().replace(/[\s-]/g, "");
}

function mapResidency(value: unknown): string | null {
  const normalized = text(value)?.toLowerCase();

  if (normalized === "sri-lanka" || normalized === "sri_lanka") {
    return "SRI_LANKA";
  }

  if (normalized === "international") {
    return "INTERNATIONAL";
  }

  return null;
}

function mapAdmissionRoute(value: unknown): string | null {
  const normalized = text(value)?.toLowerCase();

  const routes: Record<string, string> = {
    exam: "ACCTA_EXAMINATION",
    qualification: "RECOGNISED_QUALIFICATION",
    "mature-entry": "MATURE_ENTRY",
  };

  return normalized ? routes[normalized] ?? null : null;
}

function getMimeType(fileName: string): string | null {
  const extension = path.extname(fileName).toLowerCase();

  const types: Record<string, string> = {
    ".pdf": "application/pdf",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
  };

  return types[extension] ?? null;
}

function getReferees(application: JsonRecord) {
  const referees = [
    {
      refereeNumber: 1,
      fullName: text(application.refereeOneName),
      email: text(application.refereeOneEmail),
      phoneNumber: text(application.refereeOnePhone),
    },
    {
      refereeNumber: 2,
      fullName: text(application.refereeTwoName),
      email: text(application.refereeTwoEmail),
      phoneNumber: text(application.refereeTwoPhone),
    },
  ];

  return referees.filter(
    (referee) =>
      referee.fullName || referee.email || referee.phoneNumber
  );
}

function mapApplication(
  application: JsonRecord,
  duplicateIdentificationNumber = false
) {
  const answers = application.fitAndProperAnswers ?? {};

  return {
    id: application.id,
    registrationNumber: text(application.registrationNumber),

    membershipCategory: text(application.membershipCategory),
    residency: mapResidency(application.residency),
    countryOfResidence: text(application.country),
    admissionRoute: mapAdmissionRoute(application.admissionRoute),

    title: text(application.title),
    fullName: text(application.fullName),
    initialsName: text(application.initialsName),
    preferredName: text(application.preferredName),
    dateOfBirth: dateValue(application.dateOfBirth),
    gender: text(application.gender),
    nationality: text(application.nationality),
    identificationNumber: text(application.identificationNumber),
    normalizedIdentificationNumber: duplicateIdentificationNumber
        ? null
        : normalizeIdentification(application.identificationNumber),
    preferredLanguage: text(application.preferredLanguage),

    residentialAddress: text(application.residentialAddress),
    officialAddress: text(application.officialAddress),
    mailingAddress: text(application.mailingAddress),

    mobileNumber: text(application.mobile),
    whatsappNumber: text(application.whatsapp),
    officePhone: text(application.officePhone),

    personalEmail: text(application.personalEmail),
    officialEmail: text(application.officialEmail),
    linkedInProfile: text(application.linkedIn),

    academicQualifications: text(application.qualifications),
    professionalQualifications: text(
      application.professionalMemberships
    ),

    currentEmployment: text(application.employmentDetails),
    relevantExperience: text(application.experience),
    areasOfExpertise: text(application.expertise),
    professionalStatement: text(application.statement),

    disciplinaryAction: booleanValue(answers.disciplinaryAction),
    criminalOffence: booleanValue(answers.criminalOffence),
    currentInvestigation: booleanValue(
      answers.professionalInvestigation
    ),
    bankruptOrInsolvent: booleanValue(answers.bankruptcy),
    membershipSuspended: booleanValue(
      answers.professionalBodyRemoval
    ),
    falseInformation: booleanValue(answers.falseInformation),
    otherRelevantMatter: booleanValue(answers.otherMatter),

    fitAndProperDetails: text(application.fitAndProperDetails),

    informationAccepted:
      application.declarationInformationAccepted === true,
    ageAccepted: application.declarationAgeAccepted === true,
    rulesAccepted: application.declarationRulesAccepted === true,
    designationAccepted:
      application.declarationDesignationAccepted === true,
    renewalAccepted: application.declarationRenewalAccepted === true,
    changesAccepted: application.declarationChangesAccepted === true,
    contributionAccepted:
      application.declarationContributionAccepted === true,
    consentAccepted: application.declarationConsentAccepted === true,

    declarationName: text(application.declarationName),
    declarationDate: dateValue(application.declarationDate),
    declarationPlace: text(application.declarationPlace),

    status: "SUBMITTED",
    submittedAt: dateValue(application.submittedAt),
  };
}

type PreparedDocument = {
  documentType: string;
  originalName: string;
  sourcePath: string;
  destinationPath: string;
  storedFileName: string;
  filePath: string;
  mimeType: string;
  fileSize: number;
};

async function prepareDocuments(
  application: JsonRecord
): Promise<{
  documents: PreparedDocument[];
  missing: string[];
}> {
  const documents = application.documents ?? {};
  const prepared: PreparedDocument[] = [];
  const missing: string[] = [];

  for (const [documentType, entries] of Object.entries(documents)) {
    const fileEntries = Array.isArray(entries)
      ? entries
      : entries
        ? [entries]
        : [];

    for (const entry of fileEntries as JsonRecord[]) {
      if (!entry || typeof entry !== "object" || !entry.path) {
        missing.push(`${documentType}: missing file reference`);
        continue;
      }

      const originalName = text(entry.name) ?? "document";
      const referencedName = path.basename(String(entry.path));

      // Match using the original application-ID folder and stored filename.
      const sourcePath = path.join(
        DOCUMENTS_DIR,
        application.id,
        referencedName
      );

      try {
        const stats = await fs.stat(sourcePath);

        if (!stats.isFile()) {
          missing.push(`${documentType}: ${referencedName}`);
          continue;
        }

        const mimeType = getMimeType(referencedName);

        if (!mimeType) {
          missing.push(
            `${documentType}: unsupported file ${referencedName}`
          );
          continue;
        }

        const storedFileName = referencedName;
        const destinationPath = path.join(
          STORAGE_DIR,
          application.id,
          storedFileName
        );

        const filePath = path.posix.join(
          "upload-documents",
          "individual-applications-documents",
          application.id,
          storedFileName
        );

        prepared.push({
          documentType,
          originalName,
          sourcePath,
          destinationPath,
          storedFileName,
          filePath,
          mimeType,
          fileSize: stats.size,
        });
      } catch {
        missing.push(`${documentType}: ${referencedName}`);
      }
    }
  }

  return { documents: prepared, missing };
}

async function main() {
  console.log("\nACCTA INDIVIDUAL APPLICATION IMPORT");
  console.log("-----------------------------------");
  console.log(`Mode: ${COMMIT ? "COMMIT" : "DRY RUN"}\n`);

  const jsonContent = await fs.readFile(JSON_PATH, "utf8");
  const parsed = JSON.parse(jsonContent);

  const applications: JsonRecord[] =
    parsed.individualApplications ?? [];

  if (!Array.isArray(applications)) {
    throw new Error("individualApplications must be an array.");
  }

  console.log(`Applications found: ${applications.length}`);

  const seenIds = new Set<string>();
  const seenRegistrationNumbers = new Set<string>();
  const seenIdentificationNumbers = new Map<string, string>();

  let duplicateCount = 0;
  let missingDocumentCount = 0;
  let availableDocumentCount = 0;
  let refereeCount = 0;
  let readyCount = 0;
  let importedCount = 0;

  for (const application of applications) {
    console.log("\n-----------------------------------");
    console.log(
      `Application: ${application.registrationNumber ?? application.id}`
    );

    const errors: string[] = [];

    if (!application.id) {
      errors.push("Missing application ID");
    }

    if (seenIds.has(application.id)) {
      errors.push("Duplicate ID inside JSON");
    }
    seenIds.add(application.id);

    const registrationNumber = text(application.registrationNumber);
    if (registrationNumber) {
      if (seenRegistrationNumbers.has(registrationNumber)) {
        errors.push("Duplicate registration number inside JSON");
      }
      seenRegistrationNumbers.add(registrationNumber);
    }


    const normalizedId = normalizeIdentification(
        application.identificationNumber
        );

        let duplicateIdentificationNumber = false;

        if (normalizedId) {
        const previousApplicationId =
            seenIdentificationNumbers.get(normalizedId);

        if (previousApplicationId) {
            duplicateIdentificationNumber = true;

            console.log(`DUPLICATE IDENTIFICATION: ${normalizedId}`);
            console.log(`First application: ${previousApplicationId}`);
            console.log(`Duplicate application: ${application.id}`);

            console.log(
            "INFO: Historical duplicate will use normalizedIdentificationNumber = null."
            );
        } else {
            seenIdentificationNumbers.set(
            normalizedId,
            application.id
            );
        }
    }




    if (!mapResidency(application.residency)) {
      errors.push(`Unrecognized residency: ${application.residency}`);
    }

    if (
      application.admissionRoute &&
      !mapAdmissionRoute(application.admissionRoute)
    ) {
      errors.push(
        `Unrecognized admission route: ${application.admissionRoute}`
      );
    }

    const referees = getReferees(application);
    const { documents, missing } = await prepareDocuments(application);

    refereeCount += referees.length;
    availableDocumentCount += documents.length;
    missingDocumentCount += missing.length;

    console.log(`Referees: ${referees.length}`);
    console.log(`Available documents: ${documents.length}`);
    console.log(`Missing documents: ${missing.length}`);

    for (const missingFile of missing) {
      console.log(`  MISSING: ${missingFile}`);
    }

    if (errors.length) {
      errors.forEach((error) => console.log(`  ERROR: ${error}`));
      duplicateCount++;
      continue;
    }

    const existing = await prisma.individualApplication.findUnique({
      where: { id: application.id },
      select: { id: true },
    });

    if (existing) {
      console.log("SKIPPED: Application ID already exists in database.");
      duplicateCount++;
      continue;
    }

    if (registrationNumber) {
      const existingRegistration =
        await prisma.individualApplication.findUnique({
          where: { registrationNumber },
          select: { id: true },
        });

      if (existingRegistration) {
        console.log("SKIPPED: Registration number already exists.");
        duplicateCount++;
        continue;
      }
    }

    if (normalizedId && !duplicateIdentificationNumber) {
      const existingIdentification =
        await prisma.individualApplication.findUnique({
          where: { normalizedIdentificationNumber: normalizedId },
          select: { id: true },
        });

      if (existingIdentification) {
        console.log(
          "SKIPPED: Normalized NIC/passport number already exists."
        );
        duplicateCount++;
        continue;
      }
    }

    const applicationData = mapApplication(
        application,
        duplicateIdentificationNumber
    );
    readyCount++;

    if (!COMMIT) {
      console.log("READY: No database changes made.");
      continue;
    }

    const copiedFiles: string[] = [];

    try {
      // Copy the verified documents before creating database references.
      for (const document of documents) {
        await fs.mkdir(path.dirname(document.destinationPath), {
          recursive: true,
        });

        // Never overwrite an existing document.
        await fs.copyFile(
          document.sourcePath,
          document.destinationPath,
          fs.constants?.COPYFILE_EXCL ?? 1
        );

        copiedFiles.push(document.destinationPath);
      }

      await prisma.individualApplication.create({
        data: {
          ...applicationData,
          referees: {
            create: referees,
          },
          documents: {
            create: documents.map((document) => ({
              documentType: document.documentType,
              originalName: document.originalName,
              storedFileName: document.storedFileName,
              filePath: document.filePath,
              mimeType: document.mimeType,
              fileSize: BigInt(document.fileSize),
            })),
          },
        } as any,
      });

      importedCount++;
      console.log("IMPORTED successfully.");
    } catch (error) {
      await Promise.all(
        copiedFiles.map((file) =>
          fs.unlink(file).catch(() => undefined)
        )
      );

      console.error("IMPORT FAILED:", error);
    }
  }

  console.log("\n===================================");
  console.log("IMPORT SUMMARY");
  console.log("===================================");
  console.log(`Applications in JSON: ${applications.length}`);
  console.log(`Ready to import: ${readyCount}`);
  console.log(`Skipped / duplicate: ${duplicateCount}`);
  console.log(`Referees found: ${refereeCount}`);
  console.log(`Available documents: ${availableDocumentCount}`);
  console.log(`Missing documents: ${missingDocumentCount}`);

  if (COMMIT) {
    console.log(`Successfully imported: ${importedCount}`);
  } else {
    console.log("\nDRY RUN ONLY: No database records or files were changed.");
    console.log(
      "Review the report before running again with the --commit flag."
    );
  }
}

main()
  .catch((error) => {
    console.error("\nMigration stopped:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
