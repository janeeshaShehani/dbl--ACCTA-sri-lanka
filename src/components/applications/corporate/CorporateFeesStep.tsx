import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
  validationErrors?: Record<string, string>;
};

export default function CorporateFeesStep({
  data,
  updateData,
  validationErrors = {},
}: Props) {
  const isSriLanka = data.residency === "sri-lanka";

  const currency = isSriLanka ? "Rs." : "USD";
  const applicationFee = isSriLanka ? "10,000" : "100";
  const annualSubscription = isSriLanka ? "10,000" : "100";
  const totalFee = isSriLanka ? "20,000" : "200";

  const inputClass = (field: string) =>
    `mt-2 w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-accta-maroon ${
      validationErrors[field]
        ? "border-red-500"
        : "border-accta-border"
    }`;

  const showError = (field: string) =>
    validationErrors[field] ? (
      <p className="mt-1 text-xs text-red-600">
        {validationErrors[field]}
      </p>
    ) : null;

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
            <p className="text-accta-muted">
              Nominated representative
            </p>
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
            <span className="text-accta-muted">
              Application fee
            </span>
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
              {currency} {totalFee}
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
              Total amount paid <span className="text-red-600">*</span>
            </label>

            <input
              type="text"
              value={data.totalAmountPaid}
              onChange={(e) =>
                updateData({ totalAmountPaid: e.target.value })
              }
              placeholder={`${currency} ${totalFee}`}
              className={inputClass("totalAmountPaid")}
            />

            {showError("totalAmountPaid")}
          </div>

          {/* Payment method */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Payment method <span className="text-red-600">*</span>
            </label>

            <select
              value={data.paymentMethod}
              onChange={(e) =>
                updateData({ paymentMethod: e.target.value })
              }
              className={inputClass("paymentMethod")}
            >
              <option value="">Select payment method</option>
              <option value="bank-transfer">Bank transfer</option>
              <option value="cheque">Cheque</option>
              <option value="online-payment">Online payment</option>
            </select>

            {showError("paymentMethod")}
          </div>

          {/* Payment reference */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Bank / reference / cheque number{" "}
              <span className="text-red-600">*</span>
            </label>

            <input
              type="text"
              value={data.paymentReference}
              onChange={(e) =>
                updateData({ paymentReference: e.target.value })
              }
              placeholder="Enter payment reference number"
              className={inputClass("paymentReference")}
            />

            {showError("paymentReference")}
          </div>

          {/* Payment date */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Date of payment <span className="text-red-600">*</span>
            </label>

            <input
              type="date"
              value={data.paymentDate}
              onChange={(e) =>
                updateData({ paymentDate: e.target.value })
              }
              className={inputClass("paymentDate")}
            />

            {showError("paymentDate")}
          </div>
        </div>
      </div>

      {/* Submission notice */}
      <div className="mt-6 rounded-md border-l-4 border-accta-maroon bg-accta-surface p-4">
        <p className="text-sm leading-6 text-accta-ink">
          By submitting this application, you confirm that all
          information, declarations, supporting documents, and payment
          details provided are accurate and complete.
        </p>
      </div>
    </div>
  );
}