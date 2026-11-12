import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import {
  sendAdminNotification,
  sendApplicantConfirmation,
} from "@/lib/email";

export const runtime = "nodejs";

const dataDirectory = path.join(process.cwd(), "src", "data");

const dataFilePath = path.join(
  dataDirectory,
  "apply-membership-applications.json"
);

type ApplicationType = "individual" | "corporate";

type ApplicationRecord = {
  id?: string;
  registrationNumber?: string;
  membershipCategory?: string;
  fullName?: string;
  personalEmail?: string;
  registeredName?: string;
  officialEmail?: string;
  [key: string]: unknown;
};

type ApplicationsData = {
  individualApplications: ApplicationRecord[];
  corporateApplications: ApplicationRecord[];
};

const createInitialData = (): ApplicationsData => ({
  individualApplications: [],
  corporateApplications: [],
});

/* Membership category prefixes */
const categoryPrefixes: Record<string, string> = {
  "associate (standard) (acta)": "ASA",
  "fellow (standard) (fcta)": "FSA",
  "associate academic (aacta)": "AAA",
  "fellow academic (facta)": "FAA",
  "affiliate (afcta)": "AFA",
  "corporate member": "CMA",
};

/* Normalize category text */
function normalizeCategory(category: string): string {
  return category.trim().replace(/\s+/g, " ").toLowerCase();
}

/* Get the registration prefix */
function getCategoryPrefix(category: string): string | null {
  const normalizedCategory = normalizeCategory(category);

  /* Exact category match */
  if (categoryPrefixes[normalizedCategory]) {
    return categoryPrefixes[normalizedCategory];
  }

  /*
   * Extra fallback checks.
   * These help if the form value has small wording differences.
   */
  if (
    normalizedCategory.includes("fellow academic") ||
    normalizedCategory.includes("facta")
  ) {
    return "FAA";
  }

  if (
    normalizedCategory.includes("associate academic") ||
    normalizedCategory.includes("aacta")
  ) {
    return "AAA";
  }

  if (
    normalizedCategory.includes("fellow") &&
    normalizedCategory.includes("standard")
  ) {
    return "FSA";
  }

  if (
    normalizedCategory.includes("associate") &&
    normalizedCategory.includes("standard")
  ) {
    return "ASA";
  }

  if (normalizedCategory.includes("affiliate")) {
    return "AFA";
  }

  if (normalizedCategory.includes("corporate")) {
    return "CMA";
  }

  return null;
}

/* Read applications safely */
function getApplications(): ApplicationsData {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(createInitialData(), null, 2),
      "utf-8"
    );
  }

  const fileData = fs.readFileSync(dataFilePath, "utf-8");
  const parsedData = JSON.parse(fileData);

  return {
    individualApplications: Array.isArray(parsedData.individualApplications)
      ? parsedData.individualApplications
      : [],
    corporateApplications: Array.isArray(parsedData.corporateApplications)
      ? parsedData.corporateApplications
      : [],
  };
}

/* Generate the next registration number */
function generateRegistrationNumber(
  category: string,
  applications: ApplicationsData
): string | null {
  const prefix = getCategoryPrefix(category);

  if (!prefix) {
    console.error(
      "Invalid membership category received:",
      category
    );
    return null;
  }

  const now = new Date();

  /* Example: 2026 becomes 26 */
  const year = String(now.getFullYear()).slice(-2);

  /* Example: November becomes 11 */
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const matchingPrefix = `${prefix}${year}${month}`;

  const allApplications = [
    ...applications.individualApplications,
    ...applications.corporateApplications,
  ];

  let highestSequence = 0;

  for (const existingApplication of allApplications) {
    const registrationNumber =
      existingApplication.registrationNumber;

    if (
      typeof registrationNumber === "string" &&
      registrationNumber.startsWith(matchingPrefix)
    ) {
      const sequencePart = registrationNumber.slice(
        matchingPrefix.length
      );

      const sequence = Number(sequencePart);

      if (
        !Number.isNaN(sequence) &&
        Number.isInteger(sequence) &&
        sequence > highestSequence
      ) {
        highestSequence = sequence;
      }
    }
  }

  const nextSequence = highestSequence + 1;

  /* Six-digit sequence: 000001 */
  const formattedSequence = String(nextSequence).padStart(
    6,
    "0"
  );

  return `${matchingPrefix}${formattedSequence}`;
}

/* GET - Get all saved applications */
export async function GET() {
  try {
    const applications = getApplications();

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Application read error:", error);

    return NextResponse.json(
      { error: "Unable to read applications." },
      { status: 500 }
    );
  }
}

/* POST - Save a new application and send emails */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { type, application } = body;

    /* Validate application type */
    if (type !== "individual" && type !== "corporate") {
      return NextResponse.json(
        { error: "Invalid application type." },
        { status: 400 }
      );
    }

    /* Validate application data */
    if (
      !application ||
      typeof application !== "object" ||
      Array.isArray(application)
    ) {
      return NextResponse.json(
        { error: "Application data is required." },
        { status: 400 }
      );
    }

    const applicationType: ApplicationType = type;
    const applicationData = application as ApplicationRecord;

    /* Read existing applications */
    const applications = getApplications();

    /*
     * Get membership category.
     * Corporate applications automatically use Corporate Member.
     */
    const membershipCategory =
      applicationType === "corporate"
        ? "Corporate Member"
        : applicationData.membershipCategory;

    if (
      typeof membershipCategory !== "string" ||
      !membershipCategory.trim()
    ) {
      return NextResponse.json(
        { error: "Membership category is required." },
        { status: 400 }
      );
    }

    const cleanedMembershipCategory =
      membershipCategory.trim().replace(/\s+/g, " ");

    /* Generate registration number */
    const registrationNumber = generateRegistrationNumber(
      cleanedMembershipCategory,
      applications
    );

    if (!registrationNumber) {
      return NextResponse.json(
        {
          error:
            `Unable to generate a registration number for membership category: ${cleanedMembershipCategory}`,
        },
        { status: 400 }
      );
    }

    /* Create new application record */
    const newApplication: ApplicationRecord = {
      ...applicationData,
      id:
        typeof applicationData.id === "string" &&
        applicationData.id
          ? applicationData.id
          : crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      membershipCategory: cleanedMembershipCategory,
      registrationNumber,
    };

    /* Save according to application type */
    if (applicationType === "individual") {
      applications.individualApplications.push(newApplication);
    } else {
      applications.corporateApplications.push(newApplication);
    }

    /* Save application data and registration number to JSON */
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(applications, null, 2),
      "utf-8"
    );

    console.log("====================================");
    console.log("Application saved successfully.");
    console.log("Application ID:", newApplication.id);
    console.log(
      "Membership Category:",
      cleanedMembershipCategory
    );
    console.log(
      "Registration Number:",
      registrationNumber
    );
    console.log("====================================");

    /* Get applicant name and email */
    const applicantName =
      applicationType === "individual"
        ? applicationData.fullName
        : applicationData.registeredName;

    const applicantEmail =
      applicationType === "individual"
        ? applicationData.personalEmail
        : applicationData.officialEmail;

    /* Track email status */
    let applicantEmailSent = false;
    let adminEmailSent = false;
    let emailErrorMessage: string | null = null;

    /* Send emails */
    if (
      typeof applicantName === "string" &&
      applicantName.trim() &&
      typeof applicantEmail === "string" &&
      applicantEmail.trim()
    ) {
      try {
        console.log("------------------------------------");
        console.log("APPLICATION EMAIL PROCESS STARTED");
        console.log("Applicant name:", applicantName);
        console.log("Applicant email:", applicantEmail);
        console.log("Application type:", applicationType);
        console.log(
          "Registration number:",
          registrationNumber
        );

        /* Send confirmation email to applicant */
        await sendApplicantConfirmation({
          name: applicantName.trim(),
          email: applicantEmail.trim(),
          applicationType,
          registrationNumber,
          membershipCategory: cleanedMembershipCategory,
        });

        applicantEmailSent = true;

        /* Send notification email to administrator */
        await sendAdminNotification({
          name: applicantName.trim(),
          email: applicantEmail.trim(),
          applicationType,
          registrationNumber,
          membershipCategory: cleanedMembershipCategory,
        });

        adminEmailSent = true;

        console.log("EMAIL PROCESS COMPLETED");
        console.log("------------------------------------");
      } catch (emailError) {
        console.error("EMAIL SENDING ERROR:", emailError);

        emailErrorMessage =
          emailError instanceof Error
            ? emailError.message
            : "Unknown email error";
      }
    } else {
      console.warn(
        "Application saved, but applicant name or email was not available."
      );

      emailErrorMessage =
        "Applicant name or email was not available.";
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application saved successfully.",
        application: newApplication,
        registrationNumber,
        emailStatus: {
          applicantEmailSent,
          adminEmailSent,
          error: emailErrorMessage,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application save error:", error);

    return NextResponse.json(
      { error: "Unable to save application." },
      { status: 500 }
    );
  }
}