
import { NextRequest, NextResponse } from "next/server";
import { getMembershipApplications } from "@/lib/admin/application-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const type = searchParams.get("type") || "all";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid pagination values." },
        { status: 400 }
      );
    }

    const result = await getMembershipApplications({
      search,
      status,
      type,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Membership applications API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve membership applications.",
      },
      { status: 500 }
    );
  }
}
