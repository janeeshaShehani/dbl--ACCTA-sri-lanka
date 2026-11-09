import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import AvailabilityPage from "@/components/common/AvailabilityPage";
import { servicePages, sectionDestinations } from "@/data/servicePages";

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = Object.hasOwn(servicePages, slug.join("/")) ? servicePages[slug.join("/")] : undefined;
  return { title: `${page?.title ?? "ACCTA Sri Lanka"} | ACCTA Sri Lanka`, robots: { index: false, follow: true } };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join("/");
  // Preserve old links while directing visitors to the existing authoritative section.
  if (Object.hasOwn(sectionDestinations, path)) redirect(sectionDestinations[path]);
  if (!Object.hasOwn(servicePages, path)) notFound();
  return <AvailabilityPage {...servicePages[path]} />;
}
