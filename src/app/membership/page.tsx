import MembershipHero from "@/components/membership/MembershipHero";
import MembershipCategories from "@/components/membership/MembershipCategories";
import AdmissionRoutes from "@/components/membership/AdmissionRoutes";
import MembershipFees from "@/components/membership/MembershipFees";
import HowToApply from "@/components/membership/HowToApply";
import PractisingLicence from "@/components/membership/PractisingLicence";

export default function MembershipPage() {
  return (
    <>
      <MembershipHero />

      <main>
        <MembershipCategories />
        <AdmissionRoutes />
        <MembershipFees />
        <HowToApply />
        <PractisingLicence />
      </main>
    </>
  );
}