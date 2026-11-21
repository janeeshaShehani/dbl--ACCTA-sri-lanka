
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContactStatus, Prisma } from "@/generated/prisma/client";

export const runtime = "nodejs";

const allowedStatuses = Object.values(ContactStatus);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination
    const page = Math.max(
      1,
      Number(searchParams.get("page")) || 1
    );

    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit")) || 10)
    );

    const skip = (page - 1) * limit;

    // Search
    const search = searchParams.get("search")?.trim() || "";

    // Status filter
    const statusParam = searchParams.get("status");

    if (
      statusParam &&
      statusParam !== "ALL" &&
      !allowedStatuses.includes(statusParam as ContactStatus)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid contact status.",
        },
        { status: 400 }
      );
    }

    // Build database filters
    const where: Prisma.ContactMessageWhereInput = {
      ...(statusParam && statusParam !== "ALL"
        ? { status: statusParam as ContactStatus }
        : {}),

      ...(search
        ? {
            OR: [
              {
                fullName: {
                  contains: search,
                },
              },
              {
                email: {
                  contains: search,
                },
              },
              {
                subject: {
                  contains: search,
                },
              },
              {
                enquiryType: {
                  contains: search,
                },
              },
            ],
          }
        : {}),
    };

    // Today's date range (server local calendar date)
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      startOfDay.getTime() + 24 * 60 * 60 * 1000
    );

    // Fetch records and statistics
    const [
      enquiries,
      filteredTotal,
      totalCount,
      contactedCount,
      notContactedCount,
      todayCount,
    ] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),

      prisma.contactMessage.count({ where }),

      prisma.contactMessage.count(),

      prisma.contactMessage.count({
        where: {
          status: ContactStatus.CONTACTED,
        },
      }),

      prisma.contactMessage.count({
        where: {
          status: ContactStatus.NOT_CONTACTED,
        },
      }),

      prisma.contactMessage.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(filteredTotal / limit);

    return NextResponse.json({
      success: true,

      enquiries,

      statusCounts: {
        total: totalCount,
        contacted: contactedCount,
        notContacted: notContactedCount,
        today: todayCount,
      },

      pagination: {
        page,
        limit,
        totalRecords: filteredTotal,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Contact enquiries fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve contact enquiries.",
      },
      { status: 500 }
    );
  }
}
