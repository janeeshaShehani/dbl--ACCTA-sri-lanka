import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const FROM_EMAIL =
  process.env.FROM_EMAIL ||
  "ACCTA Sri Lanka <onboarding@resend.dev>";

// Contact enquiries JSON file location
const dataDirectory = path.join(process.cwd(), "src", "data");

const dataFilePath = path.join(
  dataDirectory,
  "contact-enquiries.json"
);

type ContactEnquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  submittedAt: string;
};

// Escape user input before adding it to the email HTML
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Get saved contact enquiries
function getContactEnquiries(): ContactEnquiry[] {
  // Create data directory if it does not exist
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  // Create JSON file if it does not exist
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify([], null, 2),
      "utf-8"
    );
  }

  const fileData = fs.readFileSync(dataFilePath, "utf-8");

  return JSON.parse(fileData);
}

export async function POST(request: NextRequest) {
  try {
    // Check whether the Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");

      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

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

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Check administrator email
    if (!ADMIN_EMAIL) {
      console.error("ADMIN_EMAIL is not configured.");

      return NextResponse.json(
        { error: "Administrator email is not configured." },
        { status: 500 }
      );
    }

    // Prepare enquiry data
    const newEnquiry: ContactEnquiry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      phone:
        typeof phone === "string" && phone.trim()
          ? phone.trim()
          : "",
      topic: topic.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Save the enquiry to the JSON file
    const enquiries = getContactEnquiries();

    enquiries.push(newEnquiry);

    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(enquiries, null, 2),
      "utf-8"
    );

    console.log("====================================");
    console.log("Contact enquiry saved successfully.");
    console.log("Enquiry ID:", newEnquiry.id);
    console.log("====================================");

    // Escape user input before placing it in HTML
    const safeName = escapeHtml(newEnquiry.name);
    const safeEmail = escapeHtml(newEnquiry.email);
    const safePhone = newEnquiry.phone
      ? escapeHtml(newEnquiry.phone)
      : "Not provided";
    const safeTopic = escapeHtml(newEnquiry.topic);
    const safeMessage = escapeHtml(newEnquiry.message);

    console.log("Sending contact enquiry to:", ADMIN_EMAIL);
    console.log("Enquirer:", newEnquiry.name);
    console.log("Enquiry type:", newEnquiry.topic);

    // Send the enquiry to the administrator
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      replyTo: newEnquiry.email,
      subject: `New ACCTA Enquiry: ${newEnquiry.topic}`,

      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 650px; margin: 0 auto; color: #14293A; background-color: #FFFFFF;">

          <!-- Header -->
          <div style="background-color: #14293A; padding: 28px 30px;">
            <p style="margin: 0; color: #B5985A; font-size: 13px; font-weight: bold; letter-spacing: 1.5px;">
              ACCTA SRI LANKA
            </p>

            <h1 style="margin: 8px 0 0; color: #FFFFFF; font-size: 25px;">
              New Contact Enquiry
            </h1>

            <p style="margin: 8px 0 0; color: #DCE9F1; font-size: 14px;">
              A new enquiry has been submitted through the website.
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 30px; border: 1px solid #E5E7EB;">

            <h2 style="margin-top: 0; color: #14293A; font-size: 19px;">
              Enquirer Details
            </h2>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">

              <tr>
                <td style="padding: 12px; background-color: #F3F6F8; font-weight: bold; width: 35%; border-bottom: 1px solid #E5E7EB;">
                  Full Name
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #E5E7EB;">
                  ${safeName}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px; background-color: #F3F6F8; font-weight: bold; border-bottom: 1px solid #E5E7EB;">
                  Email
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #E5E7EB;">
                  ${safeEmail}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px; background-color: #F3F6F8; font-weight: bold; border-bottom: 1px solid #E5E7EB;">
                  Phone
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #E5E7EB;">
                  ${safePhone}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px; background-color: #F3F6F8; font-weight: bold;">
                  Enquiry Type
                </td>
                <td style="padding: 12px;">
                  ${safeTopic}
                </td>
              </tr>

            </table>

            <!-- Message -->
            <div style="margin-top: 28px;">
              <h2 style="margin-bottom: 12px; color: #14293A; font-size: 19px;">
                Message
              </h2>

              <div style="background-color: #F3F6F8; border-left: 4px solid #B5985A; padding: 18px; line-height: 1.7; white-space: pre-wrap; font-size: 14px;">
                ${safeMessage}
              </div>
            </div>

            <div style="margin-top: 28px; padding: 14px 16px; background-color: #FFF8E8; border-left: 4px solid #B5985A;">
              <p style="margin: 0; font-size: 13px; color: #14293A;">
                You can reply directly to this email to respond to the enquirer.
              </p>
            </div>

          </div>

          <!-- Footer -->
          <div style="padding: 20px 30px; background-color: #F3F6F8; text-align: center;">
            <p style="margin: 0; color: #6B7280; font-size: 12px;">
              This email was automatically generated from the ACCTA Sri Lanka website contact form.
            </p>
          </div>

        </div>
      `,
    });

    if (error) {
      console.error("Contact email error:", error);

      // The enquiry is already saved even if the email fails
      return NextResponse.json(
        {
          success: true,
          message:
            "Your enquiry was saved successfully, but the email notification could not be sent.",
          enquiry: newEnquiry,
          emailError: error.message,
        },
        { status: 201 }
      );
    }

    console.log("Contact enquiry email sent successfully:", data);

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been sent successfully.",
        enquiry: newEnquiry,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        error: "Unable to process your enquiry. Please try again later.",
      },
      { status: 500 }
    );
  }
}