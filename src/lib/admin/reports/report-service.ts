
import { prisma } from "@/lib/prisma";
import type {
  ReportFilters,
  ReportRow,
} from "./report-types";

function getDateFilter(from: string, to: string) {
  if (!from && !to) return {};

  return {
    gte: from ? new Date(`${from}T00:00:00.000`) : undefined,
    lte: to ? new Date(`${to}T23:59:59.999`) : undefined,
  };
}

export async function getReportSummary() {
  const [
    individual,
    corporate,
    individualApproved,
    corporateApproved,
    individualPending,
    corporatePending,
  ] = await Promise.all([
    prisma.individualApplication.count(),
    prisma.corporateApplication.count(),
    prisma.individualApplication.count({
      where: { status: "APPROVED" },
    }),
    prisma.corporateApplication.count({
      where: { status: "APPROVED" },
    }),
    prisma.individualApplication.count({
      where: {
        status: { in: ["SUBMITTED", "UNDER_REVIEW"] },
      },
    }),
    prisma.corporateApplication.count({
      where: {
        status: { in: ["SUBMITTED", "UNDER_REVIEW"] },
      },
    }),
  ]);

  return {
    totalApplications: individual + corporate,
    individualApplications: individual,
    corporateApplications: corporate,
    approvedMembers: individualApproved + corporateApproved,
    pendingApplications: individualPending + corporatePending,
  };
}

export async function getReportRows(filters: ReportFilters) {
  const {
    tab,
    search,
    status,
    from,
    to,
    page,
    limit,
  } = filters;

  const createdAt = getDateFilter(from, to);

  const individualWhere = {
    ...(status !== "ALL" ? { status } : {}),
    ...(from || to ? { createdAt } : {}),
    ...(search
      ? {
          OR: [
            { fullName: { contains: search } },
            { registrationNumber: { contains: search } },
            { personalEmail: { contains: search } },
            { identificationNumber: { contains: search } },
          ],
        }
      : {}),
  };

  const corporateWhere = {
    ...(status !== "ALL" ? { status } : {}),
    ...(from || to ? { createdAt } : {}),
    ...(search
      ? {
          OR: [
            { registeredName: { contains: search } },
            { applicationNumber: { contains: search } },
            { officialEmail: { contains: search } },
            { registrationNumber: { contains: search } },
          ],
        }
      : {}),
  };

  const showIndividual = tab !== "corporate" && tab !== "financial";
  const showCorporate = tab !== "individual" && tab !== "financial";

  const [individualRecords, corporateRecords] = await Promise.all([
    showIndividual
      ? prisma.individualApplication.findMany({
          where: individualWhere,
          orderBy: { createdAt: "desc" },
        })
      : Promise.resolve([]),

    showCorporate
      ? prisma.corporateApplication.findMany({
          where: corporateWhere,
          orderBy: { createdAt: "desc" },
        })
      : Promise.resolve([]),
  ]);

  const rows: ReportRow[] = [
    ...individualRecords.map((record) => ({
      id: record.id,
      applicationNumber: record.registrationNumber ?? record.id,
      applicant: record.fullName ?? "Unnamed applicant",
      type: "Individual" as const,
      category: record.membershipCategory ?? "Not specified",
      status: record.status,
      submittedAt: record.submittedAt?.toISOString() ?? null,
      createdAt: record.createdAt.toISOString(),
    })),

    ...corporateRecords.map((record) => ({
      id: record.id,
      applicationNumber: record.applicationNumber ?? record.id,
      applicant: record.registeredName ?? "Unnamed company",
      type: "Corporate" as const,
      category: "Corporate",
      status: record.status,
      submittedAt: record.submittedAt?.toISOString() ?? null,
      createdAt: record.createdAt.toISOString(),
    })),
  ].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime(),
  );

  const total = rows.length;
  const start = (page - 1) * limit;

  return {
    rows: rows.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getAllApplicationsForExport() {
  const [individuals, corporates] = await Promise.all([
    prisma.individualApplication.findMany({
      include: {
        referees: true,
        documents: true,
      },
      orderBy: { createdAt: "desc" },
    }),

    prisma.corporateApplication.findMany({
      include: {
        documents: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return { individuals, corporates };
}
