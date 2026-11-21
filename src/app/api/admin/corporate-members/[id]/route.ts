
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const editableFields = [

  "status",
  
  "entityType",
  "otherEntityType",
  "residency",
  "countryOfRegistration",

  "registeredName",
  "tradingName",
  "legalForm",
  "registrationNumber",
  "registrationDate",
  "registrationCountry",
  "tinNumber",
  "vatNumber",
  "website",
  "numberOfEmployees",

  "registeredAddress",
  "tradingAddress",
  "officePhone",
  "officialEmail",

  "directorsAndKeyOfficers",
  "shareholdersAndOwnership",
  "parentFirmOrGroup",

  "servicesOffered",
  "yearsOfTaxExperience",
  "professionalRegistrations",
  "typicalClientProfile",
  "briefFirmProfile",

  "nominatedRepresentativeName",
  "nominatedRepresentativeEmail",
  "nominatedRepresentativePhone",
  "alternateRepresentativeName",
  "alternateRepresentativeEmail",
  "alternateRepresentativePhone",

  "fitProperF1",
  "fitProperF2",
  "fitProperF3",
  "fitProperF4",
  "fitProperF5",
  "fitProperF6",
  "fitProperDetails",

  "declarationAccepted",
  "authorisedSignatoryOne",
  "authorisedSignatoryTwo",
  "resolutionDate",

  "applicationFee",
  "annualSubscription",
  "feeCurrency",
  "totalAmountPaid",
  "paymentMethod",
  "paymentReference",
  "paymentDate",
] as const;

const dateFields = new Set([
  "registrationDate",
  "resolutionDate",
  "paymentDate",
]);

const integerFields = new Set([
  "numberOfEmployees",
  "yearsOfTaxExperience",
]);

const decimalFields = new Set([
  "applicationFee",
  "annualSubscription",
  "totalAmountPaid",
]);

const booleanFields = new Set([
  "fitProperF1",
  "fitProperF2",
  "fitProperF3",
  "fitProperF4",
  "fitProperF5",
  "fitProperF6",
  "declarationAccepted",
]);

const nullableFields = new Set([
  ...editableFields.filter(
    (field) => !booleanFields.has(field)
  ),
  "fitProperF1",
  "fitProperF2",
  "fitProperF3",
  "fitProperF4",
  "fitProperF5",
  "fitProperF6",
]);

function parseDate(value: string): Date | null {
  const datePart = value.trim().slice(0, 10);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
    return null;
  }

  const [year, month, day] = datePart.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Application ID is required." },
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
        { success: false, message: "Invalid request data." },
        { status: 400 }
      );
    }

    const input = body as Record<string, unknown>;
    const updateData: Record<string, unknown> = {};

    for (const field of editableFields) {
      if (!Object.prototype.hasOwnProperty.call(input, field)) {
        continue;
      }

      const value = input[field];

      // Handle empty values.
      if (value === null || value === "") {
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

      // Validate residency enum.
      if (field === "residency") {
        if (
          value !== "SRI_LANKA" &&
          value !== "INTERNATIONAL"
        ) {
          return NextResponse.json(
            { success: false, message: "Invalid residency value." },
            { status: 400 }
          );
        }

        updateData[field] = value;
        continue;
      }

      // Validate dates.
      if (dateFields.has(field)) {
        if (typeof value !== "string") {
          return NextResponse.json(
            { success: false, message: `Invalid ${field}.` },
            { status: 400 }
          );
        }

        const date = parseDate(value);

        if (!date) {
          return NextResponse.json(
            {
              success: false,
              message: `Invalid ${field} format.`,
            },
            { status: 400 }
          );
        }

        updateData[field] = date;
        continue;
      }

      // Validate integer fields.
      if (integerFields.has(field)) {
        const number =
          typeof value === "number"
            ? value
            : typeof value === "string"
              ? Number(value)
              : NaN;

        if (
          !Number.isInteger(number) ||
          number < 0
        ) {
          return NextResponse.json(
            { success: false, message: `Invalid ${field}.` },
            { status: 400 }
          );
        }

        updateData[field] = number;
        continue;
      }

      // Validate decimal fields.
      if (decimalFields.has(field)) {
        const amount =
          typeof value === "number"
            ? value
            : typeof value === "string"
              ? Number(value)
              : NaN;

        if (!Number.isFinite(amount) || amount < 0) {
          return NextResponse.json(
            { success: false, message: `Invalid ${field}.` },
            { status: 400 }
          );
        }

        updateData[field] = amount.toFixed(2);
        continue;
      }

      // Validate boolean fields.
      if (booleanFields.has(field)) {
        if (typeof value !== "boolean") {
          return NextResponse.json(
            { success: false, message: `Invalid ${field}.` },
            { status: 400 }
          );
        }

        updateData[field] = value;
        continue;
      }

      // Validate text fields.
      if (typeof value !== "string") {
        return NextResponse.json(
          { success: false, message: `Invalid ${field}.` },
          { status: 400 }
        );
      }

      if (value.length > 10000) {
        return NextResponse.json(
          { success: false, message: `${field} is too long.` },
          { status: 400 }
        );
      }

      updateData[field] = value.trim();
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

    const existingApplication =
      await prisma.corporateApplication.findUnique({
        where: { id },
        select: { id: true },
      });

    if (!existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: "Corporate application not found.",
        },
        { status: 404 }
      );
    }

    const updatedApplication =
      await prisma.corporateApplication.update({
        where: { id },
        data: updateData as never,
        select: {
          id: true,
          applicationNumber: true,
          corporateNumber: true,
          registeredName: true,
          officialEmail: true,
          status: true,
          updatedAt: true,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Corporate application updated successfully.",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Corporate member update API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update corporate application.",
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

    const member = await prisma.corporateApplication.findUnique({
      where: { id },
      select: {
        id: true,
        corporateNumber: true,
        applicationNumber: true,
        registeredName: true,
      },
    });

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Corporate member not found.",
        },
        { status: 404 }
      );
    }

    await prisma.corporateApplication.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Corporate member deleted successfully.",
      memberNumber:
        member.corporateNumber || member.applicationNumber,
    });
  } catch (error) {
    console.error("Corporate member deletion error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete corporate member.",
      },
      { status: 500 }
    );
  }
}