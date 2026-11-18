import { NextRequest, NextResponse } from "next/server";

import {
  sendApplicantConfirmation,
  sendAdminNotification,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const testEmail = body.email;

    if (!testEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required",
        },
        { status: 400 }
      );
    }

    const testData = {
      name: "Test Applicant",
      email: testEmail,
      applicationType: "individual" as const,
      registrationNumber: "TEST-2026-001",
      membershipCategory: "ACTA",
    };

    const results = {
      applicantEmail: false,
      adminEmail: false,
      errors: [] as string[],
    };

    // Test applicant confirmation email
    try {
      await sendApplicantConfirmation(testData);

      results.applicantEmail = true;
    } catch (error) {
      results.errors.push(
        `Applicant email failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }

    // Test admin notification email
    try {
      await sendAdminNotification(testData);

      results.adminEmail = true;
    } catch (error) {
      results.errors.push(
        `Admin email failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email testing completed",
      results,
    });
  } catch (error) {
    console.error("Email testing error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Email testing failed",
        error:
          error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}