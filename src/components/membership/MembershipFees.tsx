"use client";

import { useState } from "react";
import { membershipClasses } from "@/data/membershipClasses";

type FeeType = "lkr" | "usd";

export default function MembershipFees() {
  const [feeType, setFeeType] = useState<FeeType>("lkr");

  return (
    <section id="fees" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
            FEES
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
            Application fees and annual subscriptions
          </h2>
        </div>

        {/* Fee type switch */}
        <div className="inline-flex w-fit overflow-hidden rounded-sm border border-accta-navy">
          <button
            type="button"
            onClick={() => setFeeType("lkr")}
            className={`px-4 py-2 text-xs font-semibold transition ${
              feeType === "lkr"
                ? "bg-accta-navy text-white"
                : "bg-white text-accta-navy hover:bg-accta-surface"
            }`}
          >
            Resident in Sri Lanka
          </button>

          <button
            type="button"
            onClick={() => setFeeType("usd")}
            className={`border-l border-accta-navy px-4 py-2 text-xs font-semibold transition ${
              feeType === "usd"
                ? "bg-accta-navy text-white"
                : "bg-white text-accta-navy hover:bg-accta-surface"
            }`}
          >
            International
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="mt-8 overflow-x-auto rounded-md border border-accta-border">
        <table className="w-full min-w-[700px] border-collapse">
          <thead className="bg-accta-surface">
            <tr className="border-b-2 border-accta-navy">
              <th className="px-4 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-accta-muted">
                Category
              </th>

              <th className="px-4 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-accta-muted">
                Letters
              </th>

              <th className="px-4 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-accta-muted">
                Application Fee
              </th>

              <th className="px-4 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-accta-muted">
                Annual Subscription
              </th>
            </tr>
          </thead>

          <tbody>
            {membershipClasses.map((membership) => (
              <tr
                key={membership.id}
                className="border-b border-accta-border last:border-b-0"
              >
                <td className="px-4 py-4 text-sm font-medium text-accta-ink">
                  {membership.category}
                </td>

                <td className="px-4 py-4 font-serif text-sm font-bold text-accta-maroon">
                  {membership.letters}
                </td>

                <td className="px-4 py-4 text-sm text-accta-muted">
                  {membership.applicationFee[feeType] || "—"}
                </td>

                <td className="px-4 py-4 text-sm text-accta-muted">
                  {membership.annualSubscription[feeType] || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-5 text-accta-muted">
        Pay the application fee and first annual subscription after the
        Governing Council approves your application. Membership runs to 31
        December and is renewed annually; it lapses if the subscription is
        three months or more in arrears. Fees are subject to revision by the
        Council and are not refundable once an application is processed.
      </p>
    </section>
  );
}
