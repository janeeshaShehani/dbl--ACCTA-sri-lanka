
export const REPORT_TABS = [
  "applications",
  "individual",
  "corporate",
] as const;

export type ReportTab = (typeof REPORT_TABS)[number];

export const APPLICATION_STATUSES = [
  "ALL",
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
] as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUSES)[number];

export type ReportFilters = {
  tab: ReportTab;
  search: string;
  status: ApplicationStatus;
  from: string;
  to: string;
  page: number;
  limit: number;
};

export type ReportRow = {
  id: string;
  applicationNumber: string;
  applicant: string;
  type: "Individual" | "Corporate";
  category: string;
  status: string;
  submittedAt: string | null;
  createdAt: string;
};
