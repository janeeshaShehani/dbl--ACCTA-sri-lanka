
import { readFileSync } from "node:fs";
import path from "node:path";
import { prisma } from "../../src/lib/prisma";

type ContactEnquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  topic: string;
  message: string;
  submittedAt: string;
};

async function main() {
  const commit = process.argv.includes("--commit");

  const filePath = path.join(
    process.cwd(),
    "import-data",
    "contact-enquiries.json"
  );

  const enquiries = JSON.parse(
    readFileSync(filePath, "utf-8")
  ) as ContactEnquiry[];

  console.log(`Found ${enquiries.length} contact enquiries.`);
  console.log(`Mode: ${commit ? "COMMIT" : "DRY RUN"}`);

  let ready = 0;
  let skipped = 0;

  for (const item of enquiries) {
    if (
      !item.id ||
      !item.name ||
      !item.email ||
      !item.topic ||
      !item.message ||
      !item.submittedAt
    ) {
      console.log(`Skipped invalid record: ${item.id ?? "Unknown ID"}`);
      skipped++;
      continue;
    }

    const existing = await prisma.contactMessage.findUnique({
      where: { id: item.id },
      select: { id: true },
    });

    if (existing) {
      console.log(`Already exists: ${item.id}`);
      skipped++;
      continue;
    }

    const submittedAt = new Date(item.submittedAt);

    if (Number.isNaN(submittedAt.getTime())) {
      console.log(`Invalid date: ${item.id}`);
      skipped++;
      continue;
    }

    ready++;

    console.log(`Ready: ${item.name} (${item.email})`);

    if (commit) {
      await prisma.contactMessage.create({
        data: {
          id: item.id,
          fullName: item.name,
          email: item.email,
          phone: item.phone?.trim() || null,
          enquiryType: item.topic,
          message: item.message,
          createdAt: submittedAt,
        },
      });
    }
  }

  console.log("\nImport summary:");
  console.log(`Total records: ${enquiries.length}`);
  console.log(`Ready: ${ready}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Imported: ${commit ? ready : 0}`);

  if (!commit) {
    console.log("\nDry run only. No database records were changed.");
    console.log("Run with --commit to import.");
  }
}

main()
  .catch((error) => {
    console.error("Contact enquiry import failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
