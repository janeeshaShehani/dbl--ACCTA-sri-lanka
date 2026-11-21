import { prisma } from "@/lib/prisma";
import type { ApplicationStatus as PrismaApplicationStatus } from "@/generated/prisma/client";

interface GetMembershipApplicationsParams {
  search?: string;
  status?: string;
  type?: string;
  page: number;
  limit: number;
}

export async function getMembershipApplications({
  search = "",
  status = "",
  type = "all",
  page,
  limit,
}: GetMembershipApplicationsParams) {
  const searchTerm = search.trim();

  const individualWhere = {
    ...(status
      ? { status: status as PrismaApplicationStatus }
      : {}),
    ...(searchTerm
      ? {
          OR: [
            { fullName: { contains: searchTerm } },
            { personalEmail: { contains: searchTerm } },
            { registrationNumber: { contains: searchTerm } },
          ],
        }
      : {}),
  };

  const corporateWhere = {
    ...(status
      ? { status: status as PrismaApplicationStatus }
      : {}),
    ...(searchTerm
      ? {
          OR: [
            { registeredName: { contains: searchTerm } },
            { officialEmail: { contains: searchTerm } },
            { applicationNumber: { contains: searchTerm } },
            { corporateNumber: { contains: searchTerm } },
          ],
        }
      : {}),
  };

  const fetchLimit = page * limit;

  const [
    individualTotal,
    corporateTotal,
    individualApplications,
    corporateApplications,
  ] = await Promise.all([
    type === "corporate"
      ? Promise.resolve(0)
      : prisma.individualApplication.count({
          where: individualWhere,
        }),

    type === "individual"
      ? Promise.resolve(0)
      : prisma.corporateApplication.count({
          where: corporateWhere,
        }),

    type === "corporate"
      ? Promise.resolve([])
      : prisma.individualApplication.findMany({
          where: individualWhere,
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          take: fetchLimit,
          select: {
            id: true,
            registrationNumber: true,
            fullName: true,
            personalEmail: true,
            status: true,
            submittedAt: true,
            createdAt: true,
          },
        }),

    type === "individual"
      ? Promise.resolve([])
      : prisma.corporateApplication.findMany({
          where: corporateWhere,
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          take: fetchLimit,
          select: {
            id: true,
            applicationNumber: true,
            corporateNumber: true,
            registeredName: true,
            officialEmail: true,
            status: true,
            submittedAt: true,
            createdAt: true,
          },
        }),
  ]);

  const applications = [
    ...individualApplications.map((application) => ({
      id: application.id,
      type: "individual" as const,
      name: application.fullName,
      email: application.personalEmail,
      applicationNumber: application.registrationNumber ?? "—",
      registrationNumber: application.registrationNumber,
      status: application.status,
      submittedAt: application.submittedAt?.toISOString() ?? null,
      createdAt: application.createdAt.toISOString(),
    })),

    ...corporateApplications.map((application) => ({
      id: application.id,
      type: "corporate" as const,
      name: application.registeredName,
      email: application.officialEmail,
      applicationNumber: application.applicationNumber ?? "—",
      registrationNumber: application.corporateNumber,
      status: application.status,
      submittedAt: application.submittedAt?.toISOString() ?? null,
      createdAt: application.createdAt.toISOString(),
    })),
  ];

  applications.sort((a, b) => {
    const dateDifference =
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime();

    return dateDifference || b.id.localeCompare(a.id);
  });

  const total = individualTotal + corporateTotal;
  const startIndex = (page - 1) * limit;

  return {
    applications: applications.slice(startIndex, startIndex + limit),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}