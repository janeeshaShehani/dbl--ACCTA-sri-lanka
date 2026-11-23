
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const ADMIN_EMAIL = process.env.CONTACT_ADMIN_EMAIL;

const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  "ACCTA Sri Lanka <info@acctasl.com>";

const ALLOWED_ENQUIRY_TYPES = [
  "General enquiry",
  "Membership",
  "Qualification",
  "CPD & Events",
  "Professional conduct",
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, topic, message } = body;

    // Validate required fields
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof topic !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !topic.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const fullName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const enquiryType = topic.trim();
    const cleanMessage = message.trim();
    const cleanPhone =
      typeof phone === "string" ? phone.trim() : "";

    // Validate input lengths
    if (
      fullName.length > 255 ||
      normalizedEmail.length > 255 ||
      cleanPhone.length > 30 ||
      cleanMessage.length > 10000
    ) {
      return NextResponse.json(
        { error: "One or more fields exceed the allowed length." },
        { status: 400 }
      );
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Validate enquiry type
    if (!ALLOWED_ENQUIRY_TYPES.includes(enquiryType)) {
      return NextResponse.json(
        { error: "Please select a valid enquiry type." },
        { status: 400 }
      );
    }

    // Save enquiry to MySQL using Prisma
    const enquiry = await prisma.contactMessage.create({
      data: {
        fullName,
        email: normalizedEmail,
        phone: cleanPhone || null,
        enquiryType,
        message: cleanMessage,
      },
    });

    console.log("Contact enquiry saved:", enquiry.id);

    let emailSent = false;
    let autoReplySent = false;

    // Send emails using Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const safeName = escapeHtml(fullName);
      const safeEmail = escapeHtml(normalizedEmail);
      const safePhone = cleanPhone
        ? escapeHtml(cleanPhone)
        : "Not provided";
      const safeTopic = escapeHtml(enquiryType);
      const safeMessage = escapeHtml(cleanMessage);

      // 1. Send enquiry notification to admin
      if (ADMIN_EMAIL) {
        try {
          const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [ADMIN_EMAIL],
            replyTo: normalizedEmail,
            subject: `New ACCTA Enquiry: ${enquiryType}`,
            html: `
              <div style="font-family: Arial, Helvetica, sans-serif; max-width: 650px; margin: 0 auto; color: #1a1f2b; background: #ffffff;">
                <div style="background: #1f2e4d; padding: 28px 30px;">
                  <p style="margin: 0; color: #ffffff; font-size: 13px; font-weight: bold; letter-spacing: 1.5px;">
                    ACCTA SRI LANKA
                  </p>
                  <h1 style="margin: 10px 0 0; color: #ffffff; font-size: 25px;">
                    New Contact Enquiry
                  </h1>
                </div>

                <div style="padding: 30px; border: 1px solid #dde1e8;">
                  <h2 style="color: #1f2e4d;">Enquirer Details</h2>

                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                      <td style="padding: 12px; background: #f4f6f9; font-weight: bold;">Full Name</td>
                      <td style="padding: 12px;">${safeName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; background: #f4f6f9; font-weight: bold;">Email</td>
                      <td style="padding: 12px;">${safeEmail}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; background: #f4f6f9; font-weight: bold;">Phone</td>
                      <td style="padding: 12px;">${safePhone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; background: #f4f6f9; font-weight: bold;">Enquiry Type</td>
                      <td style="padding: 12px;">${safeTopic}</td>
                    </tr>
                  </table>

                  <h2 style="margin-top: 28px; color: #1f2e4d;">Message</h2>
                  <div style="background: #f4f6f9; border-left: 4px solid #7b2329; padding: 18px; line-height: 1.7; white-space: pre-wrap;">
                    ${safeMessage}
                  </div>

                  <p style="margin-top: 24px; font-size: 13px;">
                    You can reply directly to this email to respond to the enquirer.
                  </p>
                </div>

                <div style="padding: 20px; background: #f4f6f9; text-align: center; font-size: 12px; color: #4a5263;">
                  Automatically generated by the ACCTA Sri Lanka website.
                </div>
              </div>
            `,
          });

          if (error) {
            console.error("Admin email error:", error);
          } else {
            emailSent = true;
          }
        } catch (emailError) {
          console.error("Admin notification failed:", emailError);
        }
      }

      // 2. Send automatic confirmation email to user
      try {
        const { error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: [normalizedEmail],
          ...(ADMIN_EMAIL ? { replyTo: ADMIN_EMAIL } : {}),
          subject: "We Received Your Enquiry - ACCTA Sri Lanka",
          html: `
            <div style="font-family: Arial, Helvetica, sans-serif; max-width: 650px; margin: 0 auto; color: #1a1f2b; background: #ffffff;">

              <div style="background: #1f2e4d; padding: 28px 30px;">
                <p style="margin: 0; color: #ffffff; font-size: 13px; font-weight: bold; letter-spacing: 1.5px;">
                  ACCTA SRI LANKA
                </p>
                <h1 style="margin: 10px 0 0; color: #ffffff; font-size: 25px;">
                  Thank You for Contacting Us!
                </h1>
              </div>

              <div style="padding: 30px; border: 1px solid #dde1e8;">

                <h2 style="color: #1f2e4d;">
                  Dear ${safeName},
                </h2>

                <p style="font-size: 15px; line-height: 1.8;">
                  Thank you for contacting the Association of Certified Corporate Tax Accountants (ACCTA) Sri Lanka.
                </p>

                <p style="font-size: 15px; line-height: 1.8;">
                  We have successfully received your enquiry. Our team will review your message and get back to you as soon as possible.
                </p>

                <div style="background: #f4f6f9; border-left: 4px solid #7b2329; padding: 20px; margin: 25px 0;">
                  <h3 style="margin-top: 0; color: #1f2e4d;">
                    Your Enquiry Summary
                  </h3>

                  <p><strong>Enquiry Type:</strong> ${safeTopic}</p>

                  <p><strong>Your Message:</strong></p>

                  <p style="white-space: pre-wrap; line-height: 1.7;">
                    ${safeMessage}
                  </p>
                </div>

                <p style="font-size: 15px; line-height: 1.8;">
                  We appreciate your interest in ACCTA Sri Lanka and thank you for reaching out to us.
                </p>

                <p style="margin-top: 28px; line-height: 1.8;">
                  Best regards,<br />
                  <strong>ACCTA Sri Lanka Team</strong>
                </p>
              </div>

              <div style="padding: 20px; background: #f4f6f9; text-align: center; font-size: 12px; color: #4a5263;">
                © ACCTA Sri Lanka. All rights reserved.
              </div>

            </div>
          `,
        });

        if (error) {
          console.error("User auto-reply email error:", error);
        } else {
          autoReplySent = true;
        }
      } catch (emailError) {
        console.error("User auto-reply failed:", emailError);
      }
    } else {
      console.warn(
        "Contact enquiry saved, but Resend API key is not configured."
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
        emailSent,
        autoReplySent,
        enquiry: {
          id: enquiry.id,
          name: enquiry.fullName,
          email: enquiry.email,
          topic: enquiry.enquiryType,
          submittedAt: enquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);

    return NextResponse.json(
      {
        error: "Unable to process your enquiry. Please try again later.",
      },
      { status: 500 }
    );
  }
}
