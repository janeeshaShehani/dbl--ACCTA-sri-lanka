"use client";

import { useState } from "react";
import Link from "next/link";
import type { Member } from "@/data/members";

type MemberRegisterProps = {
  members: Member[];
};

export default function MemberRegister({
  members,
}: MemberRegisterProps) {
  const [membershipNumber, setMembershipNumber] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Online verification remains disabled until authoritative certificate records are connected.
  };

  return (
    <section className="bg-accta-surface py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1fr_320px]">
        {/* Member Results */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accta-maroon">
            Register of Members
          </p>
          <p className="mt-3 rounded border border-accta-border bg-white p-4 text-sm leading-6 text-accta-muted">Demonstration records only. These entries do not confirm actual membership, good standing or licence validity. Contact ACCTA for verification.</p>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-serif text-3xl font-bold text-accta-navy">
                Search results
              </h2>

              <p className="mt-2 text-sm text-accta-muted">
                {members.length} member{members.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {members.length > 0 ? (
              members.map((member) => (
                <article
                  key={member.id}
                  className="rounded-md border border-accta-border bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                    {/* Member Information */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif text-xl font-bold text-accta-navy">
                          {member.name}
                        </h3>

                        <span className="text-sm font-semibold text-accta-maroon">
                          {member.letters}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1 text-sm text-accta-muted">
                        <p>
                          <span className="font-medium text-accta-ink">
                            Membership No:
                          </span>{" "}
                          {member.membershipNumber}
                        </p>

                        <p>
                          <span className="font-medium text-accta-ink">
                            Location:
                          </span>{" "}
                          {member.city}
                        </p>

                        <p>
                          <span className="font-medium text-accta-ink">
                            Firm:
                          </span>{" "}
                          {member.firm}
                        </p>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                        {member.status}
                      </span>

                      {member.licensedCCTA && (
                        <span className="rounded-full bg-accta-navy px-3 py-1 text-xs font-semibold text-white">
                          Licensed CCTA [{member.licensedCCTA}]
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-md border border-accta-border bg-white p-8 text-center">
                <h3 className="font-serif text-xl font-bold text-accta-navy">
                  No members found
                </h3>

                <p className="mt-2 text-sm text-accta-muted">
                  Try changing your search terms or filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Side Panels */}
        <aside className="space-y-5">
          {/* Verify Certificate */}
          <div className="rounded-md border border-accta-border bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-accta-maroon">
              Certificate verification
            </p>

            <h2 className="mt-2 font-serif text-xl font-bold text-accta-navy">
              Verify a certificate
            </h2>

            <p className="mt-3 text-sm leading-6 text-accta-muted">
              Online certificate verification is not available yet. Contact ACCTA to verify a membership or certificate.
            </p>

            <form onSubmit={handleVerify} className="mt-5 space-y-4">
              <div>
                <label htmlFor="verify-membership" className="mb-2 block text-xs font-semibold text-accta-ink">
                  Membership number
                </label>

                <input
                  id="verify-membership"
                  type="text"
                  value={membershipNumber}
                  onChange={(e) => setMembershipNumber(e.target.value)}
                  placeholder="Enter membership number"
                  className="w-full rounded border border-accta-border px-3 py-2.5 text-sm outline-none focus:border-accta-maroon"
                />
              </div>

              <div>
                <label htmlFor="verify-certificate" className="mb-2 block text-xs font-semibold text-accta-ink">
                  Certificate number
                </label>

                <input
                  id="verify-certificate"
                  type="text"
                  value={certificateNumber}
                  onChange={(e) => setCertificateNumber(e.target.value)}
                  placeholder="Enter certificate number"
                  className="w-full rounded border border-accta-border px-3 py-2.5 text-sm outline-none focus:border-accta-maroon"
                />
              </div>

              <button
                type="submit"
                disabled
                className="w-full cursor-not-allowed rounded bg-accta-navy/70 px-4 py-3 text-sm font-semibold text-white"
              >
                Verify certificate
              </button>
            </form>
          </div>

          {/* Raise a Concern */}
          <div className="rounded-md border border-accta-border bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-accta-maroon">
              Professional conduct
            </p>

            <h2 className="mt-2 font-serif text-xl font-bold text-accta-navy">
              Raise a concern
            </h2>

            <p className="mt-3 text-sm leading-6 text-accta-muted">
              If you have a concern about the professional conduct of an ACCTA
              member, you can submit a complaint for review.
            </p>

            <Link href="/complaint" className="mt-5 block w-full rounded border border-accta-maroon px-4 py-3 text-center text-sm font-semibold text-accta-maroon transition hover:bg-accta-maroon hover:text-white">
              How to make a complaint
            </Link>
          </div>

          <div className="rounded-md border-l-4 border-accta-navy bg-white p-4 text-xs leading-5 text-accta-muted">
            Public listings depend on consent. An absent listing does not by itself
            establish a person&apos;s membership status. Contact ACCTA before relying on a record.
          </div>
        </aside>
      </div>
    </section>
  );
}
