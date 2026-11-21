
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateApplicationPdf } from "@/lib/admin/application-pdf-service";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;
    const type = request.nextUrl.searchParams.get("type");

    if (type !== "individual" && type !== "corporate") {
      return NextResponse.json(
        { success: false, message: "Invalid application type." },
        { status: 400 },
      );
    }

    const application =
      type === "individual"
        ? await prisma.individualApplication.findUnique({
            where: { id },
            include: {
              referees: true,
              documents: true,
            },
          })
        : await prisma.corporateApplication.findUnique({
            where: { id },
            include: {
              documents: true,
            },
          });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found." },
        { status: 404 },
      );
    }

    // Generate application PDF
    const pdfBuffer = await generateApplicationPdf(
      application as unknown as Parameters<
        typeof generateApplicationPdf
      >[0],
      type,
    );

    // Use the application number as the PDF filename
    const applicationNumber =  type === "individual"
    ? application.registrationNumber
    : application.applicationNumber;

    if (!applicationNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Application number is not available.",
        },
        { status: 400 },
      );
    }

    const safeName = String(applicationNumber).replace(
      /[^a-zA-Z0-9-_]/g,
      "_",
    );

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeName}.pdf"`,
        "Content-Length": String(pdfBuffer.length),
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Application PDF generation error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to generate application PDF." },
      { status: 500 },
    );
  }
}
