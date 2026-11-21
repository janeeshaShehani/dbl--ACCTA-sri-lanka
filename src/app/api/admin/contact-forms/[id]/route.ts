
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContactStatus } from "@/generated/prisma/client";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// UPDATE CONTACT STATUS
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const { status } = body;

    // Validate status
    if (
      !Object.values(ContactStatus).includes(status as ContactStatus)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid contact status.",
        },
        { status: 400 }
      );
    }

    // Check whether the enquiry exists
    const existingEnquiry = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existingEnquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact enquiry not found.",
        },
        { status: 404 }
      );
    }

    // Update status
    const updatedEnquiry = await prisma.contactMessage.update({
      where: { id },
      data: {
        status: status as ContactStatus,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Contact status updated successfully.",
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    console.error("Contact status update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update contact status.",
      },
      { status: 500 }
    );
  }
}

// DELETE CONTACT ENQUIRY
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    // Check whether the enquiry exists
    const existingEnquiry = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existingEnquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact enquiry not found.",
        },
        { status: 404 }
      );
    }

    // Permanently delete the enquiry
    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Contact enquiry deleted successfully.",
      deletedId: id,
    });
  } catch (error) {
    console.error("Contact enquiry deletion error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete contact enquiry.",
      },
      { status: 500 }
    );
  }
}
