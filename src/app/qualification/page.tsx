import QualificationHero from "@/components/qualification/QualificationHero";
import QualificationPathway from "@/components/qualification/QualificationPathway";
import CompetencyFramework from "@/components/qualification/CompetencyFramework";
import QualificationInfo from "@/components/qualification/QualificationInfo";
import QualificationCTA from "@/components/qualification/QualificationCTA";

export default function QualificationPage() {
  return (
    <>
      <QualificationHero />

      <main>
        <QualificationPathway />
        <CompetencyFramework />
        <QualificationInfo />
      </main>

      <QualificationCTA />
    </>
  );
}