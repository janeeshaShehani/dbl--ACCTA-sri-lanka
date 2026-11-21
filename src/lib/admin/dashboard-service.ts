
import { prisma } from "@/lib/prisma";

export async function getDashboardStatistics() {
  const [
    individualTotal,
    corporateTotal,
    individualStatuses,
    corporateStatuses,
  ] = await Promise.all([
    prisma.individualApplication.count(),
    prisma.corporateApplication.count(),

    prisma.individualApplication.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),

    prisma.corporateApplication.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const statusCounts = {
    DRAFT: 0,
    SUBMITTED: 0,
    UNDER_REVIEW: 0,
    APPROVED: 0,
    REJECTED: 0,
  };

  for (const application of [
    ...individualStatuses,
    ...corporateStatuses,
  ]) {
    statusCounts[application.status] += application._count._all;
  }

  return {
    total: individualTotal + corporateTotal,
    individual: individualTotal,
    corporate: corporateTotal,
    draft: statusCounts.DRAFT,
    pending: statusCounts.SUBMITTED,
    underReview: statusCounts.UNDER_REVIEW,
    approved: statusCounts.APPROVED,
    rejected: statusCounts.REJECTED,
  };
}
