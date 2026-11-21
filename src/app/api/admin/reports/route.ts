
import { NextRequest, NextResponse } from "next/server";
import {
  APPLICATION_STATUSES,
  REPORT_TABS,
  type ReportFilters,
} from "@/lib/admin/reports/report-types";
import {
  getReportRows,
  getReportSummary,
} from "@/lib/admin/reports/report-service";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const requestedTab = params.get("tab") ?? "overview";
    const requestedStatus = params.get("status") ?? "ALL";

    const tab = REPORT_TABS.includes(
      requestedTab as (typeof REPORT_TABS)[number],
    )
      ? (requestedTab as ReportFilters["tab"])
      : "overview";

    const status = APPLICATION_STATUSES.includes(
      requestedStatus as (typeof APPLICATION_STATUSES)[number],
    )
      ? (requestedStatus as ReportFilters["status"])
      : "ALL";

    const filters: ReportFilters = {
      tab,
      status,
      search: params.get("search")?.trim() ?? "",
      from: params.get("from") ?? "",
      to: params.get("to") ?? "",
      page: Math.max(1, Number(params.get("page")) || 1),
      limit: Math.min(
        100,
        Math.max(1, Number(params.get("limit")) || 10),
      ),
    };

    const [summary, result] = await Promise.all([
      getReportSummary(),
      getReportRows(filters),
    ]);

    return NextResponse.json({
      success: true,
      summary,
      ...result,
    });
  } catch (error) {
    console.error("Reports API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch reports.",
      },
      { status: 500 },
    );
  }
}
