export type ApplicationType = "individual" | "corporate";

export type ApplicationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED";

export interface MembershipApplication {
  id: string;
  type: ApplicationType;
  name: string;
  email: string;
  applicationNumber: string;
  registrationNumber: string | null;
  status: ApplicationStatus;
  submittedAt: string | null;
  createdAt: string;
}

export interface ApplicationListResponse {
  success: boolean;
  applications: MembershipApplication[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApplicationFilters {
  search: string;
  status: ApplicationStatus | "ALL";
  type: ApplicationType | "all";
}