
import { NextResponse } from "next/server";
import { getDashboardStatistics } from "@/lib/admin/dashboard-service";

export async function GET() {
  try {
    const statistics = await getDashboardStatistics();

    return NextResponse.json({
      success: true,
      statistics,
    });
  } catch (error) {
    console.error("Admin dashboard API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard statistics.",
      },
      { status: 500 }
    );
  }
}
