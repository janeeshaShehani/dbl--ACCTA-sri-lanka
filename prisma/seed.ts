
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// MySQL connection
const databaseUrl = new URL(process.env.DATABASE_URL!);

const adapter = new PrismaMariaDb({
  host: databaseUrl.hostname,
  port: Number(databaseUrl.port || 3306),
  user: decodeURIComponent(databaseUrl.username),
  password: decodeURIComponent(databaseUrl.password),
  database: databaseUrl.pathname.replace(/^\//, ""),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

// Membership categories and fees
const membershipFees = [
  // Associate (Standard)
  {
    categoryId: "associate",
    categoryName: "Associate (Standard)",
    letters: "ACTA",
    eligibility:
      "ACCTA exams + 3 years of relevant experience or a recognised equivalent qualification",
    currency: "LKR",
    applicationFee: 3000,
    annualSubscription: 3000,
    isAddOn: false,
    sortOrder: 1,
  },
  {
    categoryId: "associate",
    categoryName: "Associate (Standard)",
    letters: "ACTA",
    eligibility:
      "ACCTA exams + 3 years of relevant experience or a recognised equivalent qualification",
    currency: "USD",
    applicationFee: 25,
    annualSubscription: 25,
    isAddOn: false,
    sortOrder: 1,
  },

  // Fellow (Standard)
  {
    categoryId: "fellow",
    categoryName: "Fellow (Standard)",
    letters: "FCTA",
    eligibility:
      "Associate for 5 years + senior experience + CPD; or qualifications accepted for Fellowship",
    currency: "LKR",
    applicationFee: 5000,
    annualSubscription: 5000,
    isAddOn: false,
    sortOrder: 2,
  },
  {
    categoryId: "fellow",
    categoryName: "Fellow (Standard)",
    letters: "FCTA",
    eligibility:
      "Associate for 5 years + senior experience + CPD; or qualifications accepted for Fellowship",
    currency: "USD",
    applicationFee: 30,
    annualSubscription: 30,
    isAddOn: false,
    sortOrder: 2,
  },

  // Associate Academic
  {
    categoryId: "associate-academic",
    categoryName: "Associate Academic",
    letters: "AACTA",
    eligibility:
      "Degree in a related field + 3 years of teaching and research experience in taxation",
    currency: "LKR",
    applicationFee: 3000,
    annualSubscription: 3000,
    isAddOn: false,
    sortOrder: 3,
  },
  {
    categoryId: "associate-academic",
    categoryName: "Associate Academic",
    letters: "AACTA",
    eligibility:
      "Degree in a related field + 3 years of teaching and research experience in taxation",
    currency: "USD",
    applicationFee: 25,
    annualSubscription: 25,
    isAddOn: false,
    sortOrder: 3,
  },

  // Fellow Academic
  {
    categoryId: "fellow-academic",
    categoryName: "Fellow Academic",
    letters: "FACTA",
    eligibility:
      "Associate Academic for 5 years + significant academic contribution, or equivalent qualifications",
    currency: "LKR",
    applicationFee: 5000,
    annualSubscription: 5000,
    isAddOn: false,
    sortOrder: 4,
  },
  {
    categoryId: "fellow-academic",
    categoryName: "Fellow Academic",
    letters: "FACTA",
    eligibility:
      "Associate Academic for 5 years + significant academic contribution, or equivalent qualifications",
    currency: "USD",
    applicationFee: 30,
    annualSubscription: 30,
    isAddOn: false,
    sortOrder: 4,
  },

  // Affiliate
  {
    categoryId: "affiliate",
    categoryName: "Affiliate",
    letters: "AFCTA",
    eligibility:
      "Interested or engaged in taxation, not yet eligible for Associate",
    currency: "LKR",
    applicationFee: 2000,
    annualSubscription: 2000,
    isAddOn: false,
    sortOrder: 5,
  },
  {
    categoryId: "affiliate",
    categoryName: "Affiliate",
    letters: "AFCTA",
    eligibility:
      "Interested or engaged in taxation, not yet eligible for Associate",
    currency: "USD",
    applicationFee: 15,
    annualSubscription: 15,
    isAddOn: false,
    sortOrder: 5,
  },

  // Corporate Member
  {
    categoryId: "corporate",
    categoryName: "Corporate Member",
    letters: "—",
    eligibility:
      "Firm or entity in taxation services, represented by a nominated ACCTA member",
    currency: "LKR",
    applicationFee: 10000,
    annualSubscription: 10000,
    isAddOn: false,
    sortOrder: 6,
  },
  {
    categoryId: "corporate",
    categoryName: "Corporate Member",
    letters: "—",
    eligibility:
      "Firm or entity in taxation services, represented by a nominated ACCTA member",
    currency: "USD",
    applicationFee: 100,
    annualSubscription: 100,
    isAddOn: false,
    sortOrder: 6,
  },

  // Honorary
  {
    categoryId: "honorary",
    categoryName: "Honorary",
    letters: "FCTA (Hons) / FACTA (Hons)",
    eligibility: "By Council invitation only",
    currency: "LKR",
    applicationFee: 0,
    annualSubscription: 0,
    isAddOn: false,
    sortOrder: 7,
  },
  {
    categoryId: "honorary",
    categoryName: "Honorary",
    letters: "FCTA (Hons) / FACTA (Hons)",
    eligibility: "By Council invitation only",
    currency: "USD",
    applicationFee: 0,
    annualSubscription: 0,
    isAddOn: false,
    sortOrder: 7,
  },

  // Practising Licence (Add-on)
  {
    categoryId: "practising-licence",
    categoryName: "Practising licence (add-on)",
    letters: "Certified Chartered Tax Advisor",
    eligibility:
      "Standard members meeting the practising conditions",
    currency: "LKR",
    applicationFee: 5000,
    annualSubscription: 15000,
    isAddOn: true,
    sortOrder: 8,
  },
];

async function main() {
  console.log("Starting ACCTA membership fee seeding...");

  for (const fee of membershipFees) {
    await prisma.membershipFee.upsert({
      where: {
        categoryId_currency: {
          categoryId: fee.categoryId,
          currency: fee.currency,
        },
      },

      update: {
        categoryName: fee.categoryName,
        letters: fee.letters,
        eligibility: fee.eligibility,
        applicationFee: fee.applicationFee,
        annualSubscription: fee.annualSubscription,
        isAddOn: fee.isAddOn,
        isActive: true,
        sortOrder: fee.sortOrder,
      },

      create: {
        ...fee,
      },
    });

    console.log(
      `Updated: ${fee.categoryName} (${fee.currency})`
    );
  }

  console.log("Membership fee seeding completed successfully!");
  console.log(`Total records processed: ${membershipFees.length}`);
}

main()
  .catch((error) => {
    console.error("Error seeding membership fees:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
