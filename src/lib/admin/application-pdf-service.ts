import PDFDocument from "pdfkit";

type ApplicationType = "individual" | "corporate";

type PdfDocumentItem = {
  documentType: string;
  originalName: string;
  uploadedAt?: Date | string | null;
};

type PdfApplication = Record<string, unknown> & {
  id: string;
  status: string;
  createdAt: Date | string;
  submittedAt?: Date | string | null;
  documents?: PdfDocumentItem[];
  referees?: Array<{
    refereeNumber: number;
    fullName: string;
    email: string;
    phoneNumber: string;
  }>;
};

const individualSections = [
  {
    title: "Membership Information",
    fields: [
      "registrationNumber", "membershipCategory", "residency",
      "countryOfResidence", "admissionRoute",
    ],
  },
  {
    title: "Personal Information",
    fields: [
      "title", "fullName", "initialsName", "preferredName",
      "dateOfBirth", "gender", "nationality",
      "identificationNumber", "preferredLanguage",
    ],
  },
  {
    title: "Contact Information",
    fields: [
      "residentialAddress", "officialAddress", "mailingAddress",
      "mobileNumber", "whatsappNumber", "officePhone",
      "personalEmail", "officialEmail", "linkedInProfile",
    ],
  },
  {
    title: "Academic & Professional Qualifications",
    fields: ["academicQualifications", "professionalQualifications"],
  },
  {
    title: "Employment & Professional Experience",
    fields: [
      "currentEmployment", "relevantExperience",
      "areasOfExpertise", "professionalStatement",
    ],
  },
  {
    title: "Fit and Proper Declaration",
    fields: [
      "disciplinaryAction", "criminalOffence", "currentInvestigation",
      "bankruptOrInsolvent", "membershipSuspended",
      "falseInformation", "otherRelevantMatter", "fitAndProperDetails",
    ],
  },
  {
    title: "Applicant Declarations & Fees",
    fields: [
      "informationAccepted", "ageAccepted", "rulesAccepted",
      "designationAccepted", "renewalAccepted", "changesAccepted",
      "contributionAccepted", "consentAccepted",
      "declarationName", "declarationDate", "declarationPlace",
      "applicationFee", "annualSubscription", "feeCurrency",
    ],
  },
];

const corporateSections = [
  {
    title: "Membership Information",
    fields: [
      "applicationNumber", "corporateNumber", "entityType",
      "otherEntityType", "residency", "countryOfRegistration",
    ],
  },
  {
    title: "Company Information",
    fields: [
      "registeredName", "tradingName", "legalForm",
      "registrationNumber", "registrationDate", "registrationCountry",
      "tinNumber", "vatNumber", "website", "numberOfEmployees",
    ],
  },
  {
    title: "Contact Information",
    fields: [
      "registeredAddress", "tradingAddress", "officePhone", "officialEmail",
    ],
  },
  {
    title: "Company Structure",
    fields: [
      "directorsAndKeyOfficers", "shareholdersAndOwnership",
      "parentFirmOrGroup",
    ],
  },
  {
    title: "Professional Information",
    fields: [
      "servicesOffered", "yearsOfTaxExperience",
      "professionalRegistrations", "typicalClientProfile",
      "briefFirmProfile",
    ],
  },
  {
    title: "Nominated Representatives",
    fields: [
      "nominatedRepresentativeName", "nominatedRepresentativeEmail",
      "nominatedRepresentativePhone", "alternateRepresentativeName",
      "alternateRepresentativeEmail", "alternateRepresentativePhone",
    ],
  },
  {
    title: "Fit and Proper Declaration",
    fields: [
      "fitProperF1", "fitProperF2", "fitProperF3",
      "fitProperF4", "fitProperF5", "fitProperF6", "fitProperDetails",
    ],
  },
  {
    title: "Authorised Signatories & Fees",
    fields: [
      "declarationAccepted", "authorisedSignatoryOne",
      "authorisedSignatoryTwo", "resolutionDate",
      "applicationFee", "annualSubscription", "feeCurrency",
      "totalAmountPaid", "paymentMethod", "paymentReference",
      "paymentDate",
    ],
  },
];

function formatLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase())
    .trim();
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (value instanceof Date) {
    return value.toLocaleDateString("en-GB");
  }

  if (Array.isArray(value)) {
    return value.length
      ? value.map((item) => formatValue(item)).join(", ")
      : "Not provided";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  if (typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      return date.toLocaleDateString("en-GB");
    }

    return value.replace(/_/g, " ");
  }

  return String(value);
}

export async function generateApplicationPdf(
  application: PdfApplication,
  type: ApplicationType,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const pdf = new PDFDocument({
      size: "A4",
      margins: { top: 55, bottom: 55, left: 50, right: 50 },
      bufferPages: true,
      info: {
        Title: `${type === "individual" ? "Individual" : "Corporate"} Membership Application`,
        Author: "ACCTA Sri Lanka",
      },
    });

    const chunks: Buffer[] = [];

    pdf.on("data", (chunk: Buffer) => chunks.push(chunk));
    pdf.on("end", () => resolve(Buffer.concat(chunks)));
    pdf.on("error", reject);

    const sections =
      type === "individual" ? individualSections : corporateSections;

    const membershipNumber =
      type === "individual"
        ? application.registrationNumber
        : application.corporateNumber;

    // Header
    pdf
      .font("Helvetica-Bold")
      .fontSize(19)
      .fillColor("#1f2e4d")
      .text("ACCTA SRI LANKA", { align: "center" });

    pdf
      .moveDown(0.3)
      .font("Helvetica")
      .fontSize(11)
      .fillColor("#7b2329")
      .text(
        `${type === "individual" ? "Individual" : "Corporate"} Membership Application`,
        { align: "center" },
      );

    pdf.moveDown(1);

    // Application summary
    pdf
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor("#1f2e4d")
      .text("Application Summary");

    pdf.moveDown(0.4);

    const summary = [
      ["Applicant / Company", formatValue(application.fullName ?? application.registeredName)],
      ["Membership Number", formatValue(membershipNumber)],
      ["Application Number", formatValue(application.applicationNumber)],
      ["Application Status", formatValue(application.status)],
      ["Created Date", formatValue(application.createdAt)],
      ["Submitted Date", formatValue(application.submittedAt)],
    ];

    summary.forEach(([label, value]) => {
      pdf
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor("#1a1f2b")
        .text(`${label}: `, { continued: true });

      pdf
        .font("Helvetica")
        .text(value);
    });

    pdf.moveDown(1);

    // Application sections
    sections.forEach((section) => {
      const populatedFields = section.fields.filter(
        (field) => application[field] !== null &&
          application[field] !== undefined &&
          application[field] !== "",
      );

      if (populatedFields.length === 0) return;

      pdf
        .moveDown(0.5)
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#1f2e4d")
        .text(section.title);

      pdf
        .moveTo(50, pdf.y + 4)
        .lineTo(545, pdf.y + 4)
        .strokeColor("#7b2329")
        .lineWidth(1)
        .stroke();

      pdf.moveDown(0.6);

      populatedFields.forEach((field) => {
        const value = formatValue(application[field]);

        pdf
          .font("Helvetica-Bold")
          .fontSize(9)
          .fillColor("#1a1f2b")
          .text(`${formatLabel(field)}:`, { continued: true });

        pdf
          .font("Helvetica")
          .fontSize(9)
          .fillColor("#4a5263")
          .text(` ${value}`, {
            width: 490,
          });

        pdf.moveDown(0.25);
      });
    });

    // Individual referees
    if (type === "individual" && application.referees?.length) {
      pdf
        .moveDown(0.5)
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#1f2e4d")
        .text("Professional Referees");

      application.referees.forEach((referee) => {
        pdf
          .moveDown(0.4)
          .font("Helvetica-Bold")
          .fontSize(9)
          .fillColor("#1a1f2b")
          .text(`Referee ${referee.refereeNumber}`);

        pdf
          .font("Helvetica")
          .fontSize(9)
          .fillColor("#4a5263")
          .text(`Name: ${referee.fullName}`)
          .text(`Email: ${referee.email}`)
          .text(`Phone: ${referee.phoneNumber}`);
      });
    }

    // Uploaded documents
    if (application.documents?.length) {
      pdf
        .moveDown(1)
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#1f2e4d")
        .text("Uploaded Documents");

      application.documents.forEach((document, index) => {
        pdf
          .moveDown(0.3)
          .font("Helvetica")
          .fontSize(9)
          .fillColor("#4a5263")
          .text(
            `${index + 1}. ${formatLabel(document.documentType)} — ${document.originalName}`,
          );
      });
    }

    // Footer on every page
    const range = pdf.bufferedPageRange();

    for (let index = 0; index < range.count; index++) {
      pdf.switchToPage(index);

      pdf
        .font("Helvetica")
        .fontSize(8)
        .fillColor("#777777")
        .text(
          "ACCTA Sri Lanka | Confidential Membership Application",
          50,
          785,
          { width: 495, align: "center", lineBreak: false },
        );
    }

    pdf.end();
  });
}