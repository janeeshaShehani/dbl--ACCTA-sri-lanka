import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDirectory = path.join(process.cwd(), "src", "data");

const dataFilePath = path.join(
  dataDirectory,
  "apply-membership-applications.json"
);

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
  // Create data folder if it doesn't exist
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  // Create JSON file if it doesn't exist
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

// POST - Save a new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, application } = body;

    if (type !== "individual" && type !== "corporate") {
      return NextResponse.json(
        { error: "Invalid application type." },
        { status: 400 }
      );
    }

    const applications = getApplications();

    const newApplication = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      ...application,
    };

    if (type === "individual") {
      applications.individualApplications.push(newApplication);
    } else {
      applications.corporateApplications.push(newApplication);
    }

    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(applications, null, 2),
      "utf-8"
    );

    return NextResponse.json(
      {
        success: true,
        message: "Application saved successfully.",
        application: newApplication,
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