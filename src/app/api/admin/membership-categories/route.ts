
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const feeRecords = await prisma.membershipFee.findMany({
      where: {
        isActive: true,
        isAddOn: false,
      },
      select: {
        categoryId: true,
        categoryName: true,
        sortOrder: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    // Remove duplicate categories caused by different currencies.
    const uniqueCategories = Array.from(
      new Map(
        feeRecords.map((item) => [
          item.categoryId,
          {
            categoryId: item.categoryId,
            categoryName: item.categoryName,
          },
        ])
      ).values()
    );

    return NextResponse.json({
      success: true,
      categories: uniqueCategories,
    });
  } catch (error) {
    console.error("Membership categories API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load membership categories.",
      },
      { status: 500 }
    );
  }
}
