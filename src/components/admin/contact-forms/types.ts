
export type ContactStatus = "CONTACTED" | "NOT_CONTACTED";

export type ContactEnquiry = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  enquiryType: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
};

export type ContactStats = {
  total: number;
  contacted: number;
  notContacted: number;
  today: number;
};

export type ContactPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
