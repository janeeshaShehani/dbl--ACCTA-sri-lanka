
import { NextRequest, NextResponse } from "next/server";
import { getCorporateMembers } from "@/lib/admin/member-service";

const VALID_STATUSES = [
  "ALL",
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
] as const;

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const search = params.get("search")?.trim() ?? "";

    const page = Math.max(
      1,
      Number(params.get("page")) || 1,
    );

    const limit = Math.min(
      100,
      Math.max(1, Number(params.get("limit")) || 10),
    );

    const requestedStatus = params.get("status") ?? "ALL";

    const status = VALID_STATUSES.includes(
      requestedStatus as (typeof VALID_STATUSES)[number],
    )
      ? (requestedStatus as (typeof VALID_STATUSES)[number])
      : "ALL";

    const result = await getCorporateMembers({
      search,
      page,
      limit,
      status,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Corporate members API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch corporate members.",
      },
      { status: 500 },
    );
  }
}
