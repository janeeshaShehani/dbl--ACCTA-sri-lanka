
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const type = request.nextUrl.searchParams.get("type");

    if (!id || !["individual", "corporate"].includes(type || "")) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid application ID and type are required.",
        },
        { status: 400 }
      );
    }

    if (type === "individual") {
      const application = await prisma.individualApplication.findUnique({
        where: { id },
        include: {
          documents: true,
          referees: true,
        },
      });

      if (!application) {
        return NextResponse.json(
          { success: false, message: "Application not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        type: "individual",
        application: {
          ...application,
          documents: application.documents.map((document) => ({
            ...document,
            fileSize: document.fileSize?.toString() ?? null,
          })),
        },
      });
    }

    const application = await prisma.corporateApplication.findUnique({
      where: { id },
      include: {
        documents: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      type: "corporate",
      application: {
        ...application,
        documents: application.documents.map((document) => ({
          ...document,
          fileSize: document.fileSize?.toString() ?? null,
        })),
      },
    });
  } catch (error) {
    console.error("Application details API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve application details.",
      },
      { status: 500 }
    );
  }
}
