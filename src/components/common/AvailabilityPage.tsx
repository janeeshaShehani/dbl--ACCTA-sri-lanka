import Link from "next/link";

type AvailabilityPageProps = {
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
};

export default function AvailabilityPage({ title, message, actionHref = "/contact", actionLabel = "Contact ACCTA" }: AvailabilityPageProps) {
  return (
    <section className="bg-accta-surface px-5 py-14 md:py-20">
      <div className="mx-auto max-w-2xl rounded-md border border-accta-border border-t-4 border-t-accta-maroon bg-white p-7 sm:p-10">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">ACCTA SRI LANKA</p>
        <h1 className="mt-4 font-heading text-3xl font-bold text-accta-navy sm:text-4xl">{title}</h1>
        <p className="mt-5 leading-7 text-accta-muted">{message}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={actionHref} className="inline-flex min-h-11 items-center justify-center rounded bg-accta-maroon px-5 py-3 text-sm font-semibold text-white">{actionLabel}</Link>
          <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded border border-accta-navy px-5 py-3 text-sm font-semibold text-accta-navy">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
