import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
};

export default function CorporateFeesStep({
  data,
  updateData,
}: Props) {
  const isSriLanka = data.residency === "sri-lanka";

  const currency = isSriLanka ? "Rs." : "USD";
  const applicationFee = isSriLanka ? "10,000" : "100";
  const annualSubscription = isSriLanka ? "10,000" : "100";

  return (
    <div>
      {/* Section heading */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION I
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Fees and payment
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Review your application and provide the payment details.
        </p>
      </div>

      {/* Application summary */}
      <div className="mt-6 rounded-md border border-accta-border p-5">
        <h3 className="font-serif text-lg font-bold text-accta-navy">
          Application summary
        </h3>

        <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-accta-muted">Organisation</p>
            <p className="mt-1 font-semibold text-accta-ink">
              {data.registeredName || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-accta-muted">Membership category</p>
            <p className="mt-1 font-semibold text-accta-ink">
              {data.membershipCategory || "Not selected"}
            </p>
          </div>

          <div>
            <p className="text-accta-muted">Official email</p>
            <p className="mt-1 font-semibold text-accta-ink">
              {data.officialEmail || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-accta-muted">Nominated representative</p>
            <p className="mt-1 font-semibold text-accta-ink">
              {data.nominatedRepresentative || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Membership fees */}
      <div className="mt-6 rounded-md border border-accta-border bg-accta-surface p-5">
        <h3 className="font-serif text-lg font-bold text-accta-navy">
          Membership fees
        </h3>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between border-b border-accta-border pb-3">
            <span className="text-accta-muted">Application fee</span>
            <span className="font-semibold text-accta-ink">
              {currency} {applicationFee}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-accta-border pb-3">
            <span className="text-accta-muted">
              Annual subscription
            </span>
            <span className="font-semibold text-accta-ink">
              {currency} {annualSubscription}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-semibold text-accta-navy">
              Total applicable fees
            </span>
            <span className="font-bold text-accta-maroon">
              {currency} {isSriLanka ? "20,000" : "200"}
            </span>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-accta-muted">
          Fees are non-refundable once the application has been processed.
        </p>
      </div>

      {/* Payment details */}
      <div className="mt-8 border-t border-accta-border pt-6">
        <h3 className="font-serif text-lg font-bold text-accta-navy">
          Payment details
        </h3>

        <p className="mt-1 text-sm text-accta-muted">
          Please provide the details of your payment.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {/* Total amount paid */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Total amount paid
            </label>

            <input
              type="text"
              value={data.totalAmountPaid}
              onChange={(e) =>
                updateData({ totalAmountPaid: e.target.value })
              }
              placeholder={`${currency} ${isSriLanka ? "20,000" : "200"}`}
              className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>

          {/* Payment method */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Payment method
            </label>

            <select
              value={data.paymentMethod}
              onChange={(e) =>
                updateData({ paymentMethod: e.target.value })
              }
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            >
              <option value="">Select payment method</option>
              <option value="bank-transfer">Bank transfer</option>
              <option value="cheque">Cheque</option>
              <option value="online-payment">Online payment</option>
            </select>
          </div>

          {/* Reference number */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Bank / reference / cheque number
            </label>

            <input
              type="text"
              value={data.paymentReference}
              onChange={(e) =>
                updateData({ paymentReference: e.target.value })
              }
              placeholder="Enter payment reference number"
              className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>

          {/* Payment date */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Date of payment
            </label>

            <input
              type="date"
              value={data.paymentDate}
              onChange={(e) =>
                updateData({ paymentDate: e.target.value })
              }
              className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        </div>
      </div>

      {/* Submission notice */}
      <div className="mt-6 rounded-md border-l-4 border-accta-maroon bg-accta-surface p-4">
        <p className="text-sm leading-6 text-accta-ink">
          By submitting this application, you confirm that all information,
          declarations, supporting documents, and payment details provided are
          accurate and complete.
        </p>
      </div>
    </div>
  );
}