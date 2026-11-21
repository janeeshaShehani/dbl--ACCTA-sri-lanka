
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { AdmissionRoute } from "@/generated/prisma/client";
import {
  sendApplicantConfirmation,
  sendAdminNotification,
} from "@/lib/email";

export const runtime = "nodejs";

// ============================================
// MEMBERSHIP CONFIGURATION
// ============================================

const membershipMap: Record<
  string,
  { categoryId: string; prefix: string }
> = {
  ACTA: { categoryId: "associate", prefix: "ASA" },
  FCTA: { categoryId: "fellow", prefix: "FSA" },
  AACTA: { categoryId: "associate-academic", prefix: "AAA" },
  FACTA: { categoryId: "fellow-academic", prefix: "FAA" },
  AFCTA: { categoryId: "affiliate", prefix: "AFA" },
};

const admissionRoutes: Record<string, AdmissionRoute> = {
  exam: AdmissionRoute.ACCTA_EXAMINATION,
  qualification: AdmissionRoute.RECOGNISED_QUALIFICATION,
  "mature-entry": AdmissionRoute.MATURE_ENTRY,
};

const allowedDocumentTypes = [
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

const requiredDocumentTypes = [
  "identity",
  "photo",
  "academic",
  "cv",
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

// ============================================
// HELPER FUNCTIONS
// ============================================

function stringValue(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed || null;
}

function dateValue(value: unknown): Date | null {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value
  ) {
    return null;
  }

  return date;
}

function isFutureDate(value: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return value > today;
}

function booleanValue(value: unknown): boolean | null {
  if (value === "yes" || value === true) return true;
  if (value === "no" || value === false) return false;

  return null;
}

function isValidEmail(value: unknown): boolean {
  return (
    typeof value === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}

function isValidPhone(value: unknown): boolean {
  if (typeof value !== "string" || !value.trim()) return false;

  const digits = value.replace(/\D/g, "");

  return (
    /^\+?[\d\s()\-]{7,20}$/.test(value) &&
    digits.length >= 7 &&
    digits.length <= 15
  );
}

function isValidLinkedIn(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      ["linkedin.com", "www.linkedin.com"].includes(url.hostname) &&
      url.pathname.startsWith("/in/")
    );
  } catch {
    return false;
  }
}

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

// ============================================
// POST: SUBMIT INDIVIDUAL APPLICATION
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (!isRecord(body) || !isRecord(body.application)) {
      return NextResponse.json(
        { success: false, error: "Application data is required." },
        { status: 400 }
      );
    }

    const application = body.application;
    const errors: string[] = [];

    // --------------------------------------------
    // CHECK DUPLICATE NIC / PASSPORT / PERSONAL EMAIL
    // --------------------------------------------

    const normalizedIdentificationNumber = stringValue(
      application.identificationNumber
    )
      ?.replace(/[\s-]/g, "")
      .toUpperCase() ?? null;

    const normalizedPersonalEmail =
      stringValue(application.personalEmail)?.toLowerCase() ?? null;

    const duplicateConditions = [
      ...(normalizedIdentificationNumber
        ? [{ normalizedIdentificationNumber }]
        : []),

      ...(normalizedPersonalEmail
        ? [{ personalEmail: normalizedPersonalEmail }]
        : []),
    ];

    if (duplicateConditions.length > 0) {
      const existingDuplicate =
        await prisma.individualApplication.findFirst({
          where: {
            OR: duplicateConditions,
          },
          select: {
            id: true,
          },
        });

      if (existingDuplicate) {
        return NextResponse.json(
          {
            success: false,
            code: "ALREADY_REGISTERED",
            error:
              "You are already registered with ACCTA using this NIC, Passport number, or personal email address. Please contact ACCTA if you need assistance.",
          },
          { status: 409 }
        );
      }
    }

    // ========================================
    // 1. MEMBERSHIP VALIDATION
    // ========================================

    const membershipCategory = stringValue(
      application.membershipCategory
    );

    const membership = membershipCategory
      ? membershipMap[membershipCategory]
      : null;

    if (!membership) {
      errors.push("Please select a valid membership category.");
    }

    const residency =
      application.residency === "sri-lanka"
        ? "SRI_LANKA"
        : application.residency === "international"
          ? "INTERNATIONAL"
          : null;

    if (!residency) {
      errors.push("Please select a valid residency.");
    }

    if (
      residency === "INTERNATIONAL" &&
      !stringValue(application.country)
    ) {
      errors.push("Country of residence is required.");
    }

    const admissionRoute = stringValue(
      application.admissionRoute
    );

    const selectedAdmissionRoute = admissionRoute
      ? admissionRoutes[admissionRoute]
      : null;

    if (!selectedAdmissionRoute) {
      errors.push("Please select a valid admission route.");
    }

    // ========================================
    // 2. PERSONAL DETAILS
    // ========================================

    const personalFields = [
      "title",
      "fullName",
      "initialsName",
      "gender",
      "nationality",
      "identificationNumber",
      "preferredLanguage",
    ];

    for (const field of personalFields) {
      if (!stringValue(application[field])) {
        errors.push(`${field} is required.`);
      }
    }

    const dateOfBirth = stringValue(application.dateOfBirth);

    if (
      !dateOfBirth ||
      !dateValue(dateOfBirth) ||
      isFutureDate(dateOfBirth)
    ) {
      errors.push("Please provide a valid date of birth.");
    }

    // No minimum-age rule is enforced because the official
    // membership eligibility age has not been supplied.

    // ========================================
    // 3. CONTACT DETAILS
    // ========================================

    if (!stringValue(application.residentialAddress)) {
      errors.push("Residential address is required.");
    }

    if (
      !stringValue(application.mobile) ||
      !isValidPhone(application.mobile)
    ) {
      errors.push("Please provide a valid mobile number.");
    }

    if (!isValidEmail(application.personalEmail)) {
      errors.push("Please provide a valid personal email.");
    }

    for (const field of ["whatsapp", "officePhone"]) {
      const value = stringValue(application[field]);

      if (value && !isValidPhone(value)) {
        errors.push(`Please provide a valid ${field} number.`);
      }
    }

    const officialEmail = stringValue(application.officialEmail);

    if (officialEmail && !isValidEmail(officialEmail)) {
      errors.push("Please provide a valid official email.");
    }

    const linkedIn = stringValue(application.linkedIn);

    if (linkedIn && !isValidLinkedIn(linkedIn)) {
      errors.push("Please provide a valid LinkedIn profile URL.");
    }

    // ========================================
    // 4. QUALIFICATIONS
    // ========================================

    if (!stringValue(application.qualifications)) {
      errors.push("Academic qualifications are required.");
    }

    // ========================================
    // 5. EXPERIENCE
    // ========================================

    for (const field of [
      "employmentDetails",
      "experience",
      "expertise",
    ]) {
      if (!stringValue(application[field])) {
        errors.push(`${field} is required.`);
      }
    }

    // ========================================
    // 6. FIT AND PROPER
    // ========================================

    const fitAnswers = isRecord(application.fitAndProperAnswers)
      ? application.fitAndProperAnswers
      : {};

    const fitQuestions = [
      "disciplinaryAction",
      "criminalOffence",
      "professionalInvestigation",
      "bankruptcy",
      "professionalBodyRemoval",
      "falseInformation",
      "otherMatter",
    ];

    let hasYesAnswer = false;

    for (const question of fitQuestions) {
      const answer = fitAnswers[question];

      if (answer !== "yes" && answer !== "no") {
        errors.push(
          `Please answer the Fit and Proper question: ${question}.`
        );
      }

      if (answer === "yes") {
        hasYesAnswer = true;
      }
    }

    if (
      hasYesAnswer &&
      !stringValue(application.fitAndProperDetails)
    ) {
      errors.push(
        "Please provide details for your Yes answers."
      );
    }

    // ========================================
    // 7. REFEREES
    // ========================================

    for (const number of [1, 2]) {
      const prefix = number === 1 ? "One" : "Two";

      const name = application[`referee${prefix}Name`];
      const email = application[`referee${prefix}Email`];
      const phone = application[`referee${prefix}Phone`];

      if (!stringValue(name)) {
        errors.push(`Referee ${number} name is required.`);
      }

      if (!isValidEmail(email)) {
        errors.push(`Referee ${number} email is invalid.`);
      }

      if (
        stringValue(phone) &&
        !isValidPhone(phone)
      ) {
        errors.push(`Referee ${number} phone number is invalid.`);
      }
    }

    // ========================================
    // 8. APPLICATION ID
    // ========================================

    const applicationId = stringValue(application.id);

    if (
      !applicationId ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        applicationId
      )
    ) {
      errors.push("Invalid application ID.");
    }

    // ========================================
    // 9. DOCUMENT VALIDATION
    // ========================================

    const documentGroups = isRecord(application.documents)
      ? application.documents
      : {};

    const documentRecords: {
      documentType: string;
      originalName: string;
      storedFileName: string;
      filePath: string;
    }[] = [];

    let documentCount = 0;

    for (const [documentType, files] of Object.entries(
      documentGroups
    )) {
      if (!allowedDocumentTypes.includes(documentType)) {
        errors.push(`Invalid document type: ${documentType}.`);
        continue;
      }

      if (!Array.isArray(files)) {
        errors.push(`Invalid document group: ${documentType}.`);
        continue;
      }

      if (
        files.length > 1 &&
        !multipleDocumentTypes.includes(documentType)
      ) {
        errors.push(
          `Only one file is allowed for ${documentType}.`
        );
      }

      for (const file of files) {
        documentCount++;

        if (
          !isRecord(file) ||
          typeof file.name !== "string" ||
          typeof file.path !== "string"
        ) {
          errors.push(`Invalid uploaded document: ${documentType}.`);
          continue;
        }

        const originalName = file.name.trim();
        const filePath = file.path.replace(/\\/g, "/");
        const storedFileName = path.basename(filePath);

        if (
          !originalName ||
          !storedFileName ||
          storedFileName === "." ||
          storedFileName === ".."
        ) {
          errors.push(`Invalid filename for ${documentType}.`);
          continue;
        }

        documentRecords.push({
          documentType,
          originalName,
          storedFileName,
          filePath,
        });
      }
    }

    for (const documentType of requiredDocumentTypes) {
      const files = documentGroups[documentType];

      if (!Array.isArray(files) || files.length === 0) {
        errors.push(
          `Please upload the required document: ${documentType}.`
        );
      }
    }

    if (documentCount > 30) {
      errors.push("A maximum of 30 documents is allowed.");
    }

    if (documentRecords.length !== documentCount) {
      errors.push("Some uploaded document information is invalid.");
    }

    // ========================================
    // 10. DECLARATION
    // ========================================

    const declarationFields = [
      "declarationInformationAccepted",
      "declarationAgeAccepted",
      "declarationRulesAccepted",
      "declarationDesignationAccepted",
      "declarationRenewalAccepted",
      "declarationChangesAccepted",
      "declarationContributionAccepted",
      "declarationConsentAccepted",
    ];

    for (const field of declarationFields) {
      if (application[field] !== true) {
        errors.push("All declaration confirmations are required.");
        break;
      }
    }

    if (!stringValue(application.declarationName)) {
      errors.push("Declaration name is required.");
    }

    const declarationDate = stringValue(
      application.declarationDate
    );

    if (
      !declarationDate ||
      !dateValue(declarationDate) ||
      isFutureDate(declarationDate)
    ) {
      errors.push("Please provide a valid declaration date.");
    }

    if (!stringValue(application.declarationPlace)) {
      errors.push("Declaration place is required.");
    }

    // ========================================
    // RETURN VALIDATION ERRORS
    // ========================================

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please correct the application information.",
          details: errors,
        },
        { status: 400 }
      );
    }

    // ========================================
    // 11. VERIFY UPLOADED FILES
    // ========================================

    const expectedFolder = path.resolve(
      process.cwd(),
      "upload-documents",
      "individual-applications-documents",
      applicationId!
    );

    for (const document of documentRecords) {
      const actualPath = path.resolve(
        process.cwd(),
        document.filePath
      );

      const relativePath = path.relative(
        expectedFolder,
        actualPath
      );

      if (
        !relativePath ||
        relativePath.startsWith("..") ||
        path.isAbsolute(relativePath)
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "An uploaded document has an invalid file path.",
          },
          { status: 400 }
        );
      }

      try {
        const fileInfo = await fs.stat(actualPath);

        if (!fileInfo.isFile() || fileInfo.size === 0) {
          throw new Error("Invalid file.");
        }
      } catch {
        return NextResponse.json(
          {
            success: false,
            error: `Uploaded document ${document.originalName} could not be found.`,
          },
          { status: 400 }
        );
      }
    }

    // ========================================
    // 12. RETRIEVE MEMBERSHIP FEES
    // ========================================

    const currency =
      residency === "SRI_LANKA" ? "LKR" : "USD";

    const fee = await prisma.membershipFee.findUnique({
      where: {
        categoryId_currency: {
          categoryId: membershipMap[membershipCategory!].categoryId,
          currency,
        },
      },
    });

    if (!fee || !fee.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: `No active ${currency} fee record was found for ${membershipCategory}.`,
        },
        { status: 400 }
      );
    }

    // ========================================
    // 13. GENERATE REGISTRATION NUMBER
    // ========================================

    const now = new Date();

    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const registrationPrefix =
      `${membershipMap[membershipCategory!].prefix}${year}${month}`;

    // ========================================
    // 14. SAVE APPLICATION IN TRANSACTION
    // ========================================

    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.individualApplication.findMany({
        where: {
          registrationNumber: {
            startsWith: registrationPrefix,
          },
        },
        select: {
          registrationNumber: true,
        },
      });

      const highestSequence = existing.reduce(
        (highest, item) => {
          const number = Number(
            item.registrationNumber?.slice(
              registrationPrefix.length
            )
          );

          return Number.isInteger(number)
            ? Math.max(highest, number)
            : highest;
        },
        0
      );

      const registrationNumber =
        `${registrationPrefix}${String(
          highestSequence + 1
        ).padStart(6, "0")}`;

      const savedApplication =
        await tx.individualApplication.create({
          data: {
            id: applicationId!,
            registrationNumber,

            // SECTION A - Membership
            membershipCategory: membershipCategory!,
            residency: residency!,
            countryOfResidence: stringValue(application.country),
            admissionRoute: selectedAdmissionRoute!,

            // SECTION B - Personal details
            title: stringValue(application.title),
            fullName: stringValue(application.fullName),
            initialsName: stringValue(application.initialsName),
            preferredName: stringValue(application.preferredName),
            dateOfBirth: dateValue(application.dateOfBirth),
            gender: stringValue(application.gender),
            nationality: stringValue(application.nationality),
            identificationNumber: stringValue(
              application.identificationNumber
            ),
            normalizedIdentificationNumber,
            preferredLanguage: stringValue(
              application.preferredLanguage
            ),

            // SECTION C - Contact details
            residentialAddress: stringValue(
              application.residentialAddress
            ),
            officialAddress: stringValue(application.officialAddress),
            mailingAddress: stringValue(application.mailingAddress),
            mobileNumber: stringValue(application.mobile),
            whatsappNumber: stringValue(application.whatsapp),
            officePhone: stringValue(application.officePhone),
            personalEmail: normalizedPersonalEmail,
            officialEmail: stringValue(application.officialEmail),
            linkedInProfile: stringValue(application.linkedIn),

            // SECTION D - Qualifications
            academicQualifications: stringValue(
              application.qualifications
            ),
            professionalQualifications: stringValue(
              application.professionalMemberships
            ),

            // SECTION E - Experience
            currentEmployment: stringValue(
              application.employmentDetails
            ),
            relevantExperience: stringValue(application.experience),
            areasOfExpertise: stringValue(application.expertise),
            professionalStatement: stringValue(application.statement),

            // SECTION F - Fit and Proper
            disciplinaryAction: booleanValue(
              fitAnswers.disciplinaryAction
            ),
            criminalOffence: booleanValue(
              fitAnswers.criminalOffence
            ),
            currentInvestigation: booleanValue(
              fitAnswers.professionalInvestigation
            ),
            bankruptOrInsolvent: booleanValue(
              fitAnswers.bankruptcy
            ),
            membershipSuspended: booleanValue(
              fitAnswers.professionalBodyRemoval
            ),
            falseInformation: booleanValue(
              fitAnswers.falseInformation
            ),
            otherRelevantMatter: booleanValue(
              fitAnswers.otherMatter
            ),
            fitAndProperDetails: stringValue(
              application.fitAndProperDetails
            ),

            // SECTION I - Declaration
            informationAccepted:
              application.declarationInformationAccepted === true,
            ageAccepted:
              application.declarationAgeAccepted === true,
            rulesAccepted:
              application.declarationRulesAccepted === true,
            designationAccepted:
              application.declarationDesignationAccepted === true,
            renewalAccepted:
              application.declarationRenewalAccepted === true,
            changesAccepted:
              application.declarationChangesAccepted === true,
            contributionAccepted:
              application.declarationContributionAccepted === true,
            consentAccepted:
              application.declarationConsentAccepted === true,

            declarationName: stringValue(
              application.declarationName
            ),
            declarationDate: dateValue(
              application.declarationDate
            ),
            declarationPlace: stringValue(
              application.declarationPlace
            ),

            // SECTION J - Fees
            applicationFee: fee.applicationFee,
            annualSubscription: fee.annualSubscription,
            feeCurrency: currency,

            // Status
            status: "SUBMITTED",
            submittedAt: new Date(),

            // SECTION G - Referees
            referees: {
              create: [
                {
                  refereeNumber: 1,
                  fullName: stringValue(application.refereeOneName),
                  email: stringValue(application.refereeOneEmail),
                  phoneNumber: stringValue(
                    application.refereeOnePhone
                  ),
                },
                {
                  refereeNumber: 2,
                  fullName: stringValue(application.refereeTwoName),
                  email: stringValue(application.refereeTwoEmail),
                  phoneNumber: stringValue(
                    application.refereeTwoPhone
                  ),
                },
              ],
            },

            // SECTION H - Documents
            documents: {
              create: documentRecords,
            },
          },
          include: {
            referees: true,
            documents: true,
          },
        });

      return savedApplication;
    });

    // ========================================
    // 15. SEND EMAIL NOTIFICATIONS
    // ========================================

    let applicantEmailSent = false;
    let adminEmailSent = false;

    let applicantEmailError: string | null = null;
    let adminEmailError: string | null = null;

    const applicantName = stringValue(result.fullName);
    const applicantEmail = stringValue(result.personalEmail);
    const registrationNumber = result.registrationNumber ?? "";

    const emailData = {
      name: applicantName ?? "",
      email: applicantEmail ?? "",
      applicationType: "individual" as const,
      registrationNumber,
      membershipCategory: membershipCategory!,
    };

    if (applicantName && applicantEmail) {
      try {
        await sendApplicantConfirmation(emailData);
        applicantEmailSent = true;

        console.log(
          "Individual applicant confirmation email sent:",
          applicantEmail
        );
      } catch (emailError) {
        applicantEmailError =
          emailError instanceof Error
            ? emailError.message
            : "Unknown applicant email error";

        console.error(
          "Applicant confirmation email failed:",
          emailError
        );
      }

      try {
        await sendAdminNotification(emailData);
        adminEmailSent = true;

        console.log("Admin notification email sent successfully.");
      } catch (emailError) {
        adminEmailError =
          emailError instanceof Error
            ? emailError.message
            : "Unknown admin email error";

        console.error(
          "Admin notification email failed:",
          emailError
        );
      }
    }

    // ========================================
    // 16. SUCCESS RESPONSE
    // ========================================

    return NextResponse.json(
      {
        success: true,
        message: "Individual application submitted successfully.",
        application: result,
        registrationNumber,
        emailStatus: {
          applicantEmailSent,
          adminEmailSent,
          applicantEmailError,
          adminEmailError,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Individual application submission error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to submit the individual application.",
      },
      { status: 500 }
    );
  }
}
