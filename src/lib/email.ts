import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Admin recipient for membership application alert emails
const ADMIN_EMAIL = process.env.MEMBERSHIP_ADMIN_EMAIL;

// "From" address on emails sent to membership applicants
const FROM_EMAIL =
  process.env.MEMBERSHIP_FROM_EMAIL ||
  "ACCTA Membership <membership@acctasl.com>";

type ApplicationType = "individual" | "corporate";

type ApplicantConfirmationData = {
  email: string;
  name: string;
  applicationType: ApplicationType;
  registrationNumber: string;
  membershipCategory: string;
};

type AdminNotificationData = {
  name: string;
  email: string;
  applicationType: ApplicationType;
  registrationNumber: string;
  membershipCategory: string;
};

function getApplicationLabel(applicationType: ApplicationType) {
  return applicationType === "individual"
    ? "Individual Membership Application"
    : "Corporate Membership Application";
}

/**
 * Shared email layout.
 */
function getEmailTemplate(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ACCTA Membership</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f3f4f6;
          font-family: Arial, Helvetica, sans-serif;
          color: #14293A;
        "
      >
        <div style="width: 100%; padding: 32px 12px; box-sizing: border-box;">
          <div
            style="
              max-width: 640px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            "
          >
            <!-- Header -->
            <div
              style="
                background-color: #14293A;
                padding: 28px 32px;
                text-align: center;
              "
            >
              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 28px;
                  font-weight: 700;
                  letter-spacing: 1px;
                "
              >
                ACCTA Sri Lanka
              </h1>

              <p
                style="
                  margin: 8px 0 0;
                  color: #DCE9F1;
                  font-size: 14px;
                "
              >
                Association of Certified Chartered Tax Advisors
              </p>
            </div>

            <!-- Gold accent -->
            <div
              style="
                height: 5px;
                background-color: #B5985A;
              "
            ></div>

            <!-- Content -->
            <div style="padding: 36px 32px;">
              ${content}
            </div>

            <!-- Footer -->
            <div
              style="
                padding: 22px 32px;
                background-color: #f3f6f8;
                border-top: 1px solid #e5e7eb;
                text-align: center;
              "
            >
              <p
                style="
                  margin: 0;
                  color: #667085;
                  font-size: 12px;
                  line-height: 18px;
                "
              >
                © ${new Date().getFullYear()} ACCTA Sri Lanka. All rights reserved.
              </p>

              <p
                style="
                  margin: 6px 0 0;
                  color: #667085;
                  font-size: 12px;
                "
              >
                ACCTA Membership Team
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Send confirmation email to the applicant.
 */
export async function sendApplicantConfirmation({
  email,
  name,
  applicationType,
  registrationNumber,
  membershipCategory,
}: ApplicantConfirmationData) {
  const applicationLabel = getApplicationLabel(applicationType);

  console.log("Sending applicant confirmation to:", email);
  console.log("Registration number:", registrationNumber);

  const emailContent = `
    <h2
      style="
        margin: 0 0 20px;
        color: #14293A;
        font-size: 20px;
      "
    >
      Thank you for your application, ${name}
    </h2>

    <p
      style="
        margin: 0 0 16px;
        color: #475467;
        font-size: 14px;
        line-height: 26px;
      "
    >
      We have successfully received your
      <strong style="color: #14293A;">
        ${applicationLabel}
      </strong>.
    </p>

    <!-- Registration number -->
    <div
      style="
        margin: 24px 0;
        padding: 20px;
        background-color: #fdf8f0;
        border-left: 4px solid #B5985A;
        border-radius: 4px;
      "
    >
      <p
        style="
          margin: 0 0 8px;
          color: #475467;
          font-size: 13px;
          font-weight: 600;
        "
      >
        YOUR APPLICATION REGISTRATION NUMBER
      </p>

      <p
        style="
          margin: 0;
          color: #14293A;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1px;
        "
      >
        ${registrationNumber}
      </p>

      <p
        style="
          margin: 10px 0 0;
          color: #475467;
          font-size: 13px;
          line-height: 20px;
        "
      >
        Membership Category: <strong>${membershipCategory}</strong>
      </p>
    </div>

    <!-- Status -->
    <div
      style="
        margin: 24px 0;
        padding: 20px;
        background-color: #DCE9F1;
        border-left: 4px solid #214C69;
        border-radius: 4px;
      "
    >
      <p
        style="
          margin: 0 0 6px;
          color: #14293A;
          font-size: 15px;
          font-weight: 700;
        "
      >
        Application Received
      </p>

      <p
        style="
          margin: 0;
          color: #475467;
          font-size: 14px;
          line-height: 22px;
        "
      >
        Your application is now under review. Please keep your registration
        number for future reference. Our team will contact you regarding the
        next steps.
      </p>
    </div>

    <p
      style="
        margin: 24px 0 0;
        color: #475467;
        font-size: 14px;
        line-height: 26px;
      "
    >
      Thank you for your interest in becoming a member of ACCTA Sri Lanka.
    </p>

    <p
      style="
        margin: 28px 0 0;
        color: #14293A;
        font-size: 14px;
        line-height: 24px;
      "
    >
      Kind regards,<br />
      <strong>ACCTA Membership Team</strong>
    </p>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: `ACCTA Application Received - ${registrationNumber}`,
    html: getEmailTemplate(emailContent),
  });

  if (error) {
    console.error("Applicant email error:", error);

    throw new Error(
      `Failed to send applicant confirmation: ${error.message}`
    );
  }

  console.log("Applicant confirmation sent successfully:", data);

  return data;
}

/**
 * Send notification email to the administrator.
 */
export async function sendAdminNotification({
  name,
  email,
  applicationType,
  registrationNumber,
  membershipCategory,
}: AdminNotificationData) {
  if (!ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is not configured.");
  }

  const applicationLabel = getApplicationLabel(applicationType);

  console.log("Sending admin notification to:", ADMIN_EMAIL);
  console.log("Registration number:", registrationNumber);

  const emailContent = `
    <h2
      style="
        margin: 0 0 20px;
        color: #14293A;
        font-size: 21px;
      "
    >
      New Membership Application
    </h2>

    <p
      style="
        margin: 0 0 24px;
        color: #475467;
        font-size: 16px;
        line-height: 26px;
      "
    >
      A new
      <strong style="color: #14293A;">
        ${applicationLabel}
      </strong>
      has been submitted through the ACCTA website.
    </p>

    <!-- Registration number -->
    <div
      style="
        margin: 20px 0;
        padding: 20px;
        background-color: #fdf8f0;
        border-left: 4px solid #B5985A;
        border-radius: 4px;
      "
    >
      <p
        style="
          margin: 0 0 8px;
          color: #475467;
          font-size: 13px;
          font-weight: 600;
        "
      >
        REGISTRATION NUMBER
      </p>

      <p
        style="
          margin: 0;
          color: #14293A;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1px;
        "
      >
        ${registrationNumber}
      </p>
    </div>

    <!-- Application details -->
    <div
      style="
        margin: 20px 0;
        border: 1px solid #d0d5dd;
        border-radius: 6px;
        overflow: hidden;
      "
    >
      <div
        style="
          padding: 14px 18px;
          background-color: #14293A;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
        "
      >
        Applicant Details
      </div>

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="
          border-collapse: collapse;
          font-size: 14px;
        "
      >
        <tr>
          <td
            style="
              width: 38%;
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              background-color: #f8fafc;
              color: #475467;
              font-weight: 600;
            "
          >
            Name
          </td>

          <td
            style="
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              color: #14293A;
            "
          >
            ${name}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              background-color: #f8fafc;
              color: #475467;
              font-weight: 600;
            "
          >
            Email
          </td>

          <td
            style="
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              color: #14293A;
            "
          >
            ${email}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              background-color: #f8fafc;
              color: #475467;
              font-weight: 600;
            "
          >
            Membership Category
          </td>

          <td
            style="
              padding: 14px 18px;
              border-bottom: 1px solid #e5e7eb;
              color: #14293A;
            "
          >
            ${membershipCategory}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 14px 18px;
              background-color: #f8fafc;
              color: #475467;
              font-weight: 600;
            "
          >
            Application Type
          </td>

          <td
            style="
              padding: 14px 18px;
              color: #14293A;
            "
          >
            ${applicationType === "individual" ? "Individual" : "Corporate"}
          </td>
        </tr>
      </table>
    </div>

    <!-- Action -->
    <div
      style="
        margin-top: 24px;
        padding: 18px 20px;
        background-color: #fdf8f0;
        border-left: 4px solid #B5985A;
        border-radius: 4px;
      "
    >
      <p
        style="
          margin: 0;
          color: #14293A;
          font-size: 14px;
          line-height: 22px;
        "
      >
        <strong>Action required:</strong>
        Please review the submitted application and supporting documents
        in the ACCTA administration system.
      </p>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    subject: `New Application - ${registrationNumber}`,
    html: getEmailTemplate(emailContent),
  });

  if (error) {
    console.error("Admin email error:", error);

    throw new Error(
      `Failed to send admin notification: ${error.message}`
    );
  }

  console.log("Admin notification sent successfully:", data);

  return data;
}