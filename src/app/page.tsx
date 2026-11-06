import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import AboutACCTA from "@/components/home/AboutACCTA";
import MembershipClasses from "@/components/home/MembershipClasses";
import QualificationSection from "@/components/home/QualificationSection";
import EventsNews from "@/components/home/EventsNewsSection";
import RegisterSearch from "@/components/home/RegisterSearch";
import AdvocacyResearch from "@/components/home/AdvocacyResearchInternational";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickActions />
      <AboutACCTA />
      <MembershipClasses />
      <QualificationSection />
      <EventsNews />
      <RegisterSearch />
      <AdvocacyResearch />
    </>
  );
}