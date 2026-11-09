import type { Metadata } from "next";
import PractisingLicence from "@/components/membership/PractisingLicence";

export const metadata: Metadata = {
  title: "Practising Licence | ACCTA Sri Lanka",
  description: "Practising requirements and licence fee information for ACCTA Standard members.",
};

export default function PractisingLicencePage() {
  // Reuse the existing section to preserve its content and responsive layout.
  return <PractisingLicence />;
}
