
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { prisma } from "@/lib/prisma";
import { AdmissionRoute } from "@/generated/prisma/client";
import {
  sendApplicantConfirmation,
  sendAdminNotification,
} from "@/lib/email";

export const runtime = "nodejs";

// Membership letters and their database category IDs
const membershipMap: Record<
  string,
  { categoryId: string; prefix: string }
> = {
  ACTA: { categoryId: "associate", prefix: "ASA" },
  FCTA: { categoryId: "fellow", prefix: "FSA" },
  AACTA: {
    categoryId: "associate-academic",
    prefix: "AAA",
  },
  FACTA: {
    categoryId: "fellow-academic",
    prefix: "FAA",
  },
  AFCTA: {
    categoryId: "affiliate",
    prefix: "AFA",
  },
};

// Convert form values safely
function stringValue(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

// Convert date strings to Date objects
function dateValue(value: unknown): Date | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return Number.isNaN(date.getTime()) ? null : date;
}

// Convert yes/no values to Boolean
function booleanValue(value: unknown): boolean | null {
  if (value === "yes" || value === true) return true;
  if (value === "no" || value === false) return false;

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const application = body?.application;

    if (!application || typeof application !== "object") {
      return NextResponse.json(
        { error: "Application data is required." },
        { status: 400 }
      );
    }

    // Validate membership category
    const membershipCategory = stringValue(
      application.membershipCategory
    );

    const membership = membershipCategory
      ? membershipMap[membershipCategory]
      : null;

    if (!membership) {
      return NextResponse.json(
        { error: "Please select a valid membership category." },
        { status: 400 }
      );
    }

    // Convert residency
    const residency =
      application.residency === "sri-lanka"
        ? "SRI_LANKA"
        : application.residency === "international"
          ? "INTERNATIONAL"
          : null;

    // Convert admission route
    const admissionRoutes: Record<string, AdmissionRoute> = {
    exam: AdmissionRoute.ACCTA_EXAMINATION,
    qualification: AdmissionRoute.RECOGNISED_QUALIFICATION,
    "mature-entry": AdmissionRoute.MATURE_ENTRY,
    };

    const admissionRoute =
    admissionRoutes[application.admissionRoute];

    if (!residency || !admissionRoute) {
      return NextResponse.json(
        { error: "Invalid residency or admission route." },
        { status: 400 }
      );
    }

    // Validate required personal information
    if (
      !stringValue(application.fullName) ||
      !stringValue(application.personalEmail) ||
      !dateValue(application.dateOfBirth)
    ) {
      return NextResponse.json(
        {
          error: "Please provide the required personal details.",
        },
        { status: 400 }
      );
    }

    // Select currency based on residency
    const currency =
      residency === "SRI_LANKA" ? "LKR" : "USD";

    // Retrieve fees from MembershipFee table
    const fee = await prisma.membershipFee.findUnique({
      where: {
        categoryId_currency: {
          categoryId: membership.categoryId,
          currency,
        },
      },
    });

    if (!fee || !fee.isActive) {
      return NextResponse.json(
        {
          error: `No active ${currency} fee record was found for ${membershipCategory}.`,
        },
        { status: 400 }
      );
    }

    // Application ID
    const applicationId =
      stringValue(application.id) ?? crypto.randomUUID();

    // Registration number prefix
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const registrationPrefix =
      `${membership.prefix}${year}${month}`;

    // Fit and proper answers
    const fitAnswers =
      application.fitAndProperAnswers ?? {};

    // Uploaded document groups
    const documentGroups =
      application.documents &&
      typeof application.documents === "object"
        ? application.documents
        : {};

    // Prepare document metadata
    const documentRecords = Object.entries(
      documentGroups
    ).flatMap(([documentType, files]) => {
      if (!Array.isArray(files)) return [];

      return files.flatMap((file: any) => {
        if (
          !file ||
          typeof file.name !== "string" ||
          typeof file.path !== "string"
        ) {
          return [];
        }

        return [
          {
            documentType,
            originalName: file.name,
            storedFileName: path.basename(file.path),
            filePath: file.path,
          },
        ];
      });
    });

    // Save everything in one database transaction
    const result = await prisma.$transaction(async (tx) => {
      // Find existing registration numbers for this prefix
      const existing =
        await tx.individualApplication.findMany({
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

      // Create main application
      const savedApplication =
        await tx.individualApplication.create({
          data: {
            id: applicationId,
            registrationNumber,

            // SECTION A - Membership
            membershipCategory,
            residency,
            countryOfResidence: stringValue(
              application.country
            ),
            admissionRoute,

            // SECTION B - Personal Details
            title: stringValue(application.title),
            fullName: stringValue(application.fullName),
            initialsName: stringValue(
              application.initialsName
            ),
            preferredName: stringValue(
              application.preferredName
            ),
            dateOfBirth: dateValue(
              application.dateOfBirth
            ),
            gender: stringValue(application.gender),
            nationality: stringValue(
              application.nationality
            ),
            identificationNumber: stringValue(
              application.identificationNumber
            ),
            preferredLanguage: stringValue(
              application.preferredLanguage
            ),

            // SECTION C - Contact Details
            residentialAddress: stringValue(
              application.residentialAddress
            ),
            officialAddress: stringValue(
              application.officialAddress
            ),
            mailingAddress: stringValue(
              application.mailingAddress
            ),
            mobileNumber: stringValue(application.mobile),
            whatsappNumber: stringValue(
              application.whatsapp
            ),
            officePhone: stringValue(
              application.officePhone
            ),
            personalEmail: stringValue(
              application.personalEmail
            ),
            officialEmail: stringValue(
              application.officialEmail
            ),
            linkedInProfile: stringValue(
              application.linkedIn
            ),

            // SECTION D - Qualifications
            academicQualifications: stringValue(
              application.qualifications
            ),
            professionalQualifications: stringValue(
              application.professionalMemberships
            ),

            // SECTION E - Employment and Experience
            currentEmployment: stringValue(
              application.employmentDetails
            ),
            relevantExperience: stringValue(
              application.experience
            ),
            areasOfExpertise: stringValue(
              application.expertise
            ),
            professionalStatement: stringValue(
              application.statement
            ),

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

            // Application status
            status: "SUBMITTED",
            submittedAt: new Date(),

            // SECTION G - Referees
            referees: {
              create: [
                {
                  refereeNumber: 1,
                  fullName: stringValue(
                    application.refereeOneName
                  ),
                  email: stringValue(
                    application.refereeOneEmail
                  ),
                  phoneNumber: stringValue(
                    application.refereeOnePhone
                  ),
                },
                {
                  refereeNumber: 2,
                  fullName: stringValue(
                    application.refereeTwoName
                  ),
                  email: stringValue(
                    application.refereeTwoEmail
                  ),
                  phoneNumber: stringValue(
                    application.refereeTwoPhone
                  ),
                },
              ],
            },

            // SECTION H - Uploaded documents
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


    // ============================================
    // SEND EMAIL NOTIFICATIONS
    // ============================================

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
    membershipCategory: membershipCategory ?? "",
    };

    // Send confirmation email to the applicant
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
    } else {
    applicantEmailError =
        "Applicant name or email is missing.";
    }

    // Send notification email to the administrator
    if (applicantName && applicantEmail) {
    try {
        await sendAdminNotification(emailData);

        adminEmailSent = true;

        console.log(
        "Admin notification email sent successfully."
        );
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
    } else {
    adminEmailError =
        "Applicant name or email is missing.";
    }

   // Return successful application submission
    return NextResponse.json(
    {
        success: true,
        message: "Individual application submitted successfully.",
        application: result,
        registrationNumber: registrationNumber,

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
        error:
          error instanceof Error
            ? error.message
            : "Unable to submit the individual application.",
      },
      { status: 500 }
    );
  }
}
