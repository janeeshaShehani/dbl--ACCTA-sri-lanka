
import { NextRequest, NextResponse } from "next/server";
import {
  createApplicationsWorkbook,
  type ExportType,
} from "@/lib/admin/reports/export-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_EXPORT_TYPES = [
  "all",
  "individual",
  "corporate",
] as const;

export async function GET(request: NextRequest) {
  try {
    const requestedType =
      request.nextUrl.searchParams.get("type") ?? "all";

    if (
      !VALID_EXPORT_TYPES.includes(
        requestedType as (typeof VALID_EXPORT_TYPES)[number],
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid export type.",
        },
        { status: 400 },
      );
    }

    const type = requestedType as ExportType;

    const buffer = await createApplicationsWorkbook(type);

    const filenames: Record<ExportType, string> = {
      all: "ACCTA_All_Applications.xlsx",
      individual: "ACCTA_Individual_Applications.xlsx",
      corporate: "ACCTA_Corporate_Applications.xlsx",
    };

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          `attachment; filename="${filenames[type]}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Applications Excel export error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to export applications.",
      },
      { status: 500 },
    );
  }
}
