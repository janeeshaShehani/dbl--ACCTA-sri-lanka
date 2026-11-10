import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const FROM_EMAIL =
  process.env.FROM_EMAIL || "ACCTA Membership <onboarding@resend.dev>";

type ApplicationType = "individual" | "corporate";

type ApplicantConfirmationData = {
  email: string;
  name: string;
  applicationType: ApplicationType;
};

type AdminNotificationData = {
  name: string;
  email: string;
  applicationType: ApplicationType;
};

function getApplicationLabel(applicationType: ApplicationType) {
  return applicationType === "individual"
    ? "Individual Membership Application"
    : "Corporate Membership Application";
}

// Send confirmation email to the applicant
export async function sendApplicantConfirmation({
  email,
  name,
  applicationType,
}: ApplicantConfirmationData) {
  const applicationLabel = getApplicationLabel(applicationType);

  console.log("Sending applicant confirmation to:", email);

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "ACCTA Membership Application Received",
    html: `
      <h2>Thank you for your application, ${name}</h2>

      <p>
        We have successfully received your
        <strong>${applicationLabel}</strong>.
      </p>

      <p>
        Your application is currently under review.
        The ACCTA team will contact you regarding the next steps.
      </p>

      <br />

      <p>Kind regards,</p>
      <p><strong>ACCTA Membership Team</strong></p>
    `,
  });

  // Check if Resend returned an error
  if (error) {
    console.error("Applicant email error:", error);
    throw new Error(
      `Failed to send applicant confirmation: ${error.message}`
    );
  }

  console.log("Applicant confirmation sent successfully:", data);

  return data;
}

// Send notification email to the administrator
export async function sendAdminNotification({
  name,
  email,
  applicationType,
}: AdminNotificationData) {
  if (!ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is not configured.");
  }

  const applicationLabel = getApplicationLabel(applicationType);

  console.log("Sending admin notification to:", ADMIN_EMAIL);

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    subject: `New ${applicationLabel}`,
    html: `
      <h2>New Membership Application Received</h2>

      <p>
        A new <strong>${applicationLabel}</strong> has been submitted.
      </p>

      <table>
        <tr>
          <td><strong>Name:</strong></td>
          <td>${name}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>${email}</td>
        </tr>
        <tr>
          <td><strong>Application Type:</strong></td>
          <td>${applicationType}</td>
        </tr>
      </table>

      <br />

      <p>Please review the application in the ACCTA administration system.</p>
    `,
  });

  // Check if Resend returned an error
  if (error) {
    console.error("Admin email error:", error);
    throw new Error(
      `Failed to send admin notification: ${error.message}`
    );
  }

  console.log("Admin notification sent successfully:", data);

  return data;
}