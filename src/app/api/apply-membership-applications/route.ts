
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

type ApplicationsData = {
  individualApplications: unknown[];
  corporateApplications: unknown[];
};

const createInitialData = (): ApplicationsData => ({
  individualApplications: [],
  corporateApplications: [],
});

// Read applications safely
function getApplications(): ApplicationsData {
  // Create the data folder if it doesn't exist
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  // Create the JSON file if it doesn't exist
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(createInitialData(), null, 2),
      "utf-8"
    );
  }

  const fileData = fs.readFileSync(dataFilePath, "utf-8");

  return JSON.parse(fileData);
}

// GET - Get all saved applications
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

// POST - Save a new application and send emails
export async function POST(request: NextRequest) {
  try {
    // This route receives JSON
    const body = await request.json();

    const { type, application } = body;

    // Validate application type
    if (type !== "individual" && type !== "corporate") {
      return NextResponse.json(
        { error: "Invalid application type." },
        { status: 400 }
      );
    }

    // Validate application data
    if (!application || typeof application !== "object") {
      return NextResponse.json(
        { error: "Application data is required." },
        { status: 400 }
      );
    }

    const applicationType: ApplicationType = type;

    // Read existing applications
    const applications = getApplications();

    // Create new application record
    const newApplication = {
      id: application.id || crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      ...application,
    };

    // Save according to application type
    if (applicationType === "individual") {
      applications.individualApplications.push(newApplication);
    } else {
      applications.corporateApplications.push(newApplication);
    }

    // Save application data to JSON file
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(applications, null, 2),
      "utf-8"
    );

    console.log("====================================");
    console.log("Application saved successfully.");
    console.log("Application ID:", newApplication.id);
    console.log("====================================");

    // Get applicant name and email
    const applicantName =
      applicationType === "individual"
        ? application.fullName
        : application.registeredName;

    const applicantEmail =
      applicationType === "individual"
        ? application.personalEmail
        : application.officialEmail;

    // Track email status
    let applicantEmailSent = false;
    let adminEmailSent = false;
    let emailErrorMessage: string | null = null;

    // Send emails
    if (applicantName && applicantEmail) {
      try {
        console.log("------------------------------------");
        console.log("APPLICATION EMAIL PROCESS STARTED");
        console.log("Applicant name:", applicantName);
        console.log("Applicant email:", applicantEmail);
        console.log("Application type:", applicationType);

        // Send confirmation email to the applicant
        console.log("Sending confirmation email to applicant...");

        await sendApplicantConfirmation({
          name: applicantName,
          email: applicantEmail,
          applicationType,
        });

        applicantEmailSent = true;

        console.log("Applicant confirmation email sent successfully.");

        // Send notification email to the administrator
        console.log("Sending notification email to administrator...");

        await sendAdminNotification({
          name: applicantName,
          email: applicantEmail,
          applicationType,
        });

        adminEmailSent = true;

        console.log("Admin notification email sent successfully.");
        console.log("EMAIL PROCESS COMPLETED");
        console.log("------------------------------------");
      } catch (emailError) {
        console.error("------------------------------------");
        console.error("EMAIL SENDING ERROR:");
        console.error(emailError);
        console.error("------------------------------------");

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
