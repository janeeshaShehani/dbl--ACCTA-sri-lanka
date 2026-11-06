import AboutHero from "@/components/about/AboutHero";
import AboutSidebar from "@/components/about/AboutSidebar";
import WhoWeAre from "@/components/about/WhoWeAre";
import Objectives from "@/components/about/Objectives";
import Functions from "@/components/about/Functions";
import Emblem from "@/components/about/Emblem";
import Governance from "@/components/about/Governance";
import Committees from "@/components/about/Committees";
import PatronAdvisory from "@/components/about/PatronAdvisory";
import GoverningDocuments from "@/components/about/GoverningDocuments";

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <div className="mx-auto flex max-w-7xl gap-10 px-4 py-12 lg:px-8">
        <AboutSidebar />

        <main className="min-w-0 flex-1 space-y-24">
          <WhoWeAre />
          <Objectives />
          <Functions />
          <Emblem />
          <Governance />
          <Committees />
          <PatronAdvisory />
          <GoverningDocuments />
        </main>
      </div>
    </>
  );
}