
"use client";

import { useCallback, useEffect, useState } from "react";

import ContactFormsHeader from "./ContactFormsHeader";
import ContactFormsStats from "./ContactFormsStats";
import ContactFormsToolbar from "./ContactFormsToolbar";
import ContactFormsTable from "./ContactFormsTable";
import ContactFormsPagination from "./ContactFormsPagination";
import ContactFormDetailsModal from "./ContactFormDetailsModal";
import DeleteContactFormModal from "./DeleteContactFormModal";

import {
  ContactEnquiry,
  ContactStats,
  ContactPagination,
  ContactStatus,
} from "./types";

const initialStats: ContactStats = {
  total: 0,
  contacted: 0,
  notContacted: 0,
  today: 0,
};

export default function ContactFormsPage() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [stats, setStats] = useState(initialStats);

  const [pagination, setPagination] = useState<ContactPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedEnquiry, setSelectedEnquiry] =
    useState<ContactEnquiry | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<ContactEnquiry | null>(null);

  // Fetch enquiries
  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        search,
        status,
      });

      const response = await fetch(
        `/api/admin/contact-forms?${params.toString()}`,
        { cache: "no-store" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load enquiries.");
      }

      setEnquiries(data.enquiries || []);
      setStats(data.statusCounts || initialStats);
      setPagination((previous) => ({
        ...previous,
        ...data.pagination,
      }));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, status]);

  // Debounced search and data loading
  useEffect(() => {
    const timer = setTimeout(fetchEnquiries, 300);
    return () => clearTimeout(timer);
  }, [fetchEnquiries]);

  // Update enquiry status
  const handleStatusChange = async (
    id: string,
    newStatus: ContactStatus
  ) => {
    try {
      const response = await fetch(`/api/admin/contact-forms/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update status.");
      }

      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry((previous) =>
          previous ? { ...previous, status: newStatus } : null
        );
      }

      await fetchEnquiries();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update status."
      );
    }
  };

  // Delete enquiry
  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/contact-forms/${deleteTarget.id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete enquiry.");
      }

      setDeleteTarget(null);

      if (selectedEnquiry?.id === deleteTarget.id) {
        setSelectedEnquiry(null);
      }

      if (enquiries.length === 1 && pagination.page > 1) {
        setPagination((previous) => ({
          ...previous,
          page: previous.page - 1,
        }));
      } else {
        await fetchEnquiries();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete enquiry."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#f4f6f9] p-4 sm:p-6 lg:p-8">

      <ContactFormsHeader
        onRefresh={fetchEnquiries}
        loading={loading}
      />

      <ContactFormsStats stats={stats} />

      <section className="overflow-hidden rounded-xl border border-[#dde1e8] bg-white shadow-sm">

        <ContactFormsToolbar
          search={search}
          status={status}
          onSearchChange={(value) => {
            setSearch(value);
            setPagination((previous) => ({ ...previous, page: 1 }));
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPagination((previous) => ({ ...previous, page: 1 }));
          }}
        />

        {error && (
          <div className="m-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <ContactFormsTable
          enquiries={enquiries}
          loading={loading}
          onView={setSelectedEnquiry}
          onDelete={setDeleteTarget}
          onStatusChange={handleStatusChange}
        />

        <ContactFormsPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          limit={pagination.limit}
          currentCount={enquiries.length}
          onPageChange={(page) =>
            setPagination((previous) => ({ ...previous, page }))
          }
        />
      </section>

      <ContactFormDetailsModal
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
      />

      <DeleteContactFormModal
        enquiry={deleteTarget}
        loading={deleteLoading}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

    </div>
  );
}
