
import { prisma } from "@/lib/prisma";

type MemberStatus =
  | "ALL"
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED";

type MemberQuery = {
  search: string;
  page: number;
  limit: number;
  status?: MemberStatus;
};

export async function getIndividualMembers({
  search,
  page,
  limit,
  status = "ALL",
}: MemberQuery) {
  const where = {
    ...(status !== "ALL" ? { status } : {}),
    ...(search
      ? {
          OR: [
            { registrationNumber: { contains: search } },
            { fullName: { contains: search } },
            { personalEmail: { contains: search } },
            { mobileNumber: { contains: search } },
          ],
        }
      : {}),
  };

  const [members, total, statusCounts] = await Promise.all([
    prisma.individualApplication.findMany({
      where,
      select: {
        id: true,
        registrationNumber: true,
        membershipCategory: true,
        fullName: true,
        personalEmail: true,
        mobileNumber: true,
        residency: true,
        countryOfResidence: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),

    prisma.individualApplication.count({ where }),

    prisma.individualApplication.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),
  ]);

  return {
    members,
    statusCounts: Object.fromEntries(
      statusCounts.map((item) => [
        item.status,
        item._count._all,
      ]),
    ),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getCorporateMembers({
  search,
  page,
  limit,
  status = "ALL",
}: MemberQuery) {
  const where = {
    ...(status !== "ALL" ? { status } : {}),
    ...(search
      ? {
          OR: [
            { corporateNumber: { contains: search } },
            { registeredName: { contains: search } },
            { tradingName: { contains: search } },
            { officialEmail: { contains: search } },
            { officePhone: { contains: search } },
          ],
        }
      : {}),
  };

  const [members, total, statusCounts] = await Promise.all([
    prisma.corporateApplication.findMany({
      where,
      select: {
        id: true,
        applicationNumber: true,
        corporateNumber: true,
        registeredName: true,
        tradingName: true,
        officialEmail: true,
        officePhone: true,
        residency: true,
        countryOfRegistration: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),

    prisma.corporateApplication.count({ where }),

    prisma.corporateApplication.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),
  ]);

  return {
    members,
    statusCounts: Object.fromEntries(
      statusCounts.map((item) => [
        item.status,
        item._count._all,
      ]),
    ),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
