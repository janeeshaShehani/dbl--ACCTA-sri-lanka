
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// Only fields that administrators are allowed to edit.
const editableFields = [

  "status",
  
  // Membership information
  "membershipCategory",
  "residency",
  "countryOfResidence",
  "admissionRoute",

  // Personal information
  "title",
  "fullName",
  "initialsName",
  "preferredName",
  "dateOfBirth",
  "gender",
  "nationality",
  "identificationNumber",
  "preferredLanguage",

  // Contact information
  "residentialAddress",
  "officialAddress",
  "mailingAddress",
  "mobileNumber",
  "whatsappNumber",
  "officePhone",
  "personalEmail",
  "officialEmail",
  "linkedInProfile",

  // Qualifications
  "academicQualifications",
  "professionalQualifications",

  // Employment and experience
  "currentEmployment",
  "relevantExperience",
  "areasOfExpertise",
  "professionalStatement",

  // Fit and proper declaration
  "disciplinaryAction",
  "criminalOffence",
  "currentInvestigation",
  "bankruptOrInsolvent",
  "membershipSuspended",
  "falseInformation",
  "otherRelevantMatter",
  "fitAndProperDetails",

  // Applicant declarations
  "informationAccepted",
  "ageAccepted",
  "rulesAccepted",
  "designationAccepted",
  "renewalAccepted",
  "changesAccepted",
  "contributionAccepted",
  "consentAccepted",
  "declarationName",
  "declarationDate",
  "declarationPlace",

  // Fees
  "applicationFee",
  "annualSubscription",
  "feeCurrency",
] as const;

const dateFields = new Set([
  "dateOfBirth",
  "declarationDate",
]);

// Optional Boolean fields in Prisma.
const nullableBooleanFields = new Set([
  "disciplinaryAction",
  "criminalOffence",
  "currentInvestigation",
  "bankruptOrInsolvent",
  "membershipSuspended",
  "falseInformation",
  "otherRelevantMatter",
]);

// Required Boolean fields in Prisma.
const requiredBooleanFields = new Set([
  "informationAccepted",
  "ageAccepted",
  "rulesAccepted",
  "designationAccepted",
  "renewalAccepted",
  "changesAccepted",
  "contributionAccepted",
  "consentAccepted",
]);

const booleanFields = new Set([
  ...nullableBooleanFields,
  ...requiredBooleanFields,
]);

// Optional String fields and optional enum fields.
// These are nullable in the Prisma schema.
const nullableFields = new Set([
  "membershipCategory",
  "residency",
  "countryOfResidence",
  "admissionRoute",

  "title",
  "fullName",
  "initialsName",
  "preferredName",
  "dateOfBirth",
  "gender",
  "nationality",
  "identificationNumber",
  "preferredLanguage",

  "residentialAddress",
  "officialAddress",
  "mailingAddress",
  "mobileNumber",
  "whatsappNumber",
  "officePhone",
  "personalEmail",
  "officialEmail",
  "linkedInProfile",

  "academicQualifications",
  "professionalQualifications",

  "currentEmployment",
  "relevantExperience",
  "areasOfExpertise",
  "professionalStatement",

  "disciplinaryAction",
  "criminalOffence",
  "currentInvestigation",
  "bankruptOrInsolvent",
  "membershipSuspended",
  "falseInformation",
  "otherRelevantMatter",

  "fitAndProperDetails",

  "declarationName",
  "declarationDate",
  "declarationPlace",

  "applicationFee",
  "annualSubscription",
  "feeCurrency",
]);

const stringFields = new Set([
  "membershipCategory",
  "countryOfResidence",

  "title",
  "fullName",
  "initialsName",
  "preferredName",
  "gender",
  "nationality",
  "identificationNumber",
  "preferredLanguage",

  "residentialAddress",
  "officialAddress",
  "mailingAddress",
  "mobileNumber",
  "whatsappNumber",
  "officePhone",
  "personalEmail",
  "officialEmail",
  "linkedInProfile",

  "academicQualifications",
  "professionalQualifications",

  "currentEmployment",
  "relevantExperience",
  "areasOfExpertise",
  "professionalStatement",

  "fitAndProperDetails",

  "declarationName",
  "declarationPlace",
  "feeCurrency",
]);

const decimalFields = new Set([
  "applicationFee",
  "annualSubscription",
]);

const validResidencies = [
  "SRI_LANKA",
  "INTERNATIONAL",
];

const validAdmissionRoutes = [
  "ACCTA_EXAMINATION",
  "RECOGNISED_QUALIFICATION",
  "MATURE_ENTRY",
];

// Maximum lengths for VarChar fields.
// Text fields are limited separately.
const maxLengths: Record<string, number> = {
  membershipCategory: 100,
  countryOfResidence: 100,

  title: 30,
  fullName: 255,
  initialsName: 255,
  preferredName: 150,
  gender: 50,
  nationality: 100,
  identificationNumber: 100,
  preferredLanguage: 50,

  mobileNumber: 30,
  whatsappNumber: 30,
  officePhone: 30,

  personalEmail: 255,
  officialEmail: 255,
  linkedInProfile: 500,

  declarationName: 255,
  declarationPlace: 150,
  feeCurrency: 10,
};

const textFields = new Set([
  "residentialAddress",
  "officialAddress",
  "mailingAddress",
  "academicQualifications",
  "professionalQualifications",
  "currentEmployment",
  "relevantExperience",
  "areasOfExpertise",
  "professionalStatement",
  "fitAndProperDetails",
]);

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Application ID is required.",
        },
        { status: 400 }
      );
    }

    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data.",
        },
        { status: 400 }
      );
    }

    const input = body as Record<string, unknown>;

    const updateData: Record<string, unknown> = {};

    // Process only explicitly allowed fields.
    for (const field of editableFields) {
      if (
        !Object.prototype.hasOwnProperty.call(input, field)
      ) {
        continue;
      }

      const value = input[field];

      // Handle null values.
      if (value === null) {
        if (!nullableFields.has(field)) {
          return NextResponse.json(
            {
              success: false,
              message: `${field} cannot be empty.`,
            },
            { status: 400 }
          );
        }

        updateData[field] = null;
        continue;
      }

      // Validate application status
      if (field === "status") {
        const validStatuses = [
          "DRAFT",
          "SUBMITTED",
          "UNDER_REVIEW",
          "APPROVED",
          "REJECTED",
        ];

        if (
          typeof value !== "string" ||
          !validStatuses.includes(value)
        ) {
          return NextResponse.json(
            { success: false, message: "Invalid status value." },
            { status: 400 }
          );
        }

        updateData[field] = value;
        continue;
      }

        // Date validation
        if (dateFields.has(field)) {
        if (typeof value !== "string") {
            return NextResponse.json(
            { success: false, message: `Invalid ${field}.` },
            { status: 400 }
            );
        }

        const trimmedValue = value.trim();

        if (!trimmedValue) {
            updateData[field] = null;
            continue;
        }

        const datePart = trimmedValue.slice(0, 10);

        if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
            return NextResponse.json(
            { success: false, message: `Invalid ${field} format.` },
            { status: 400 }
            );
        }

        const [year, month, day] = datePart.split("-").map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));

        if (
            date.getUTCFullYear() !== year ||
            date.getUTCMonth() !== month - 1 ||
            date.getUTCDate() !== day
        ) {
            return NextResponse.json(
            { success: false, message: `Invalid ${field}.` },
            { status: 400 }
            );
        }

        updateData[field] = date;
        continue;
        }

      // Boolean validation.
      if (booleanFields.has(field)) {
        if (typeof value !== "boolean") {
          return NextResponse.json(
            {
              success: false,
              message: `Invalid ${field}.`,
            },
            { status: 400 }
          );
        }

        updateData[field] = value;
        continue;
      }

      // Residency enum validation.
      if (field === "residency") {
        if (
          typeof value !== "string" ||
          !validResidencies.includes(value)
        ) {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid residency value.",
            },
            { status: 400 }
          );
        }

        updateData[field] = value;
        continue;
      }

      // Admission route enum validation.
      if (field === "admissionRoute") {
        if (
          typeof value !== "string" ||
          !validAdmissionRoutes.includes(value)
        ) {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid admission route.",
            },
            { status: 400 }
          );
        }

        updateData[field] = value;
        continue;
      }

      // Decimal validation for fees.
      if (decimalFields.has(field)) {
        if (
          typeof value !== "number" &&
          typeof value !== "string"
        ) {
          return NextResponse.json(
            {
              success: false,
              message: `Invalid ${field}.`,
            },
            { status: 400 }
          );
        }

        const decimalValue = Number(value);

        if (
          !Number.isFinite(decimalValue) ||
          decimalValue < 0
        ) {
          return NextResponse.json(
            {
              success: false,
              message: `Invalid ${field}.`,
            },
            { status: 400 }
          );
        }

        updateData[field] = decimalValue;
        continue;
      }

      // String validation.
      if (stringFields.has(field)) {
        if (typeof value !== "string") {
          return NextResponse.json(
            {
              success: false,
              message: `Invalid ${field}.`,
            },
            { status: 400 }
          );
        }

        const maxLength =
          maxLengths[field] ??
          (textFields.has(field) ? 60000 : 255);

        if (value.length > maxLength) {
          return NextResponse.json(
            {
              success: false,
              message: `${field} cannot exceed ${maxLength} characters.`,
            },
            { status: 400 }
          );
        }

        updateData[field] = value.trim() || null;
        continue;
      }

      return NextResponse.json(
        {
          success: false,
          message: `Unsupported field: ${field}.`,
        },
        { status: 400 }
      );
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No editable fields were provided.",
        },
        { status: 400 }
      );
    }

    // Check whether the application exists.
    const existingApplication =
      await prisma.individualApplication.findUnique({
        where: { id },
        select: { id: true },
      });

    if (!existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: "Individual application not found.",
        },
        { status: 404 }
      );
    }

    // Update application.
    const updatedApplication =
      await prisma.individualApplication.update({
        where: { id },
        data: updateData as never,
        select: {
          id: true,
          registrationNumber: true,
          fullName: true,
          personalEmail: true,
          status: true,
          updatedAt: true,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Individual application updated successfully.",
      application: updatedApplication,
    });
  } catch (error) {
    console.error(
      "Individual member update API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update individual application.",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Member ID is required.",
        },
        { status: 400 }
      );
    }

    const member = await prisma.individualApplication.findUnique({
      where: { id },
      select: {
        id: true,
        registrationNumber: true,
        fullName: true,
      },
    });

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Individual member not found.",
        },
        { status: 404 }
      );
    }

    await prisma.individualApplication.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Individual member deleted successfully.",
      memberNumber: member.registrationNumber,
    });
  } catch (error) {
    console.error("Individual member deletion error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete individual member.",
      },
      { status: 500 }
    );
  }
}