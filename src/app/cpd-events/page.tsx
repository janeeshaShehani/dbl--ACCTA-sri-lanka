import CPDHero from "@/components/cpd-events/CPDHero";
import CPDStats from "@/components/cpd-events/CPDStats";
import UpcomingEvents from "@/components/cpd-events/UpcomingEvents";
import FlagshipEvent from "@/components/cpd-events/FlagshipEvent";
import PublicationsNews from "@/components/cpd-events/PublicationsNews";

export default function CPDEventsPage() {
  return (
    <main>
      <CPDHero />
      <CPDStats />
      <UpcomingEvents />
      <FlagshipEvent />
      <PublicationsNews />
    </main>
  );
}