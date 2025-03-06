import Hero from "@/components/Hero";
import ExperiencesList, {
  ExperiencesListSceleton,
} from "@/components/ExperiencesList";
import { Suspense } from "react";

import experiences from "@/data/experiences.json";

export default function Home() {
  const locations = Array.from(
    new Set(experiences.flatMap((exp) => exp.locations)),
  );

  return (
    <>
      <Hero locations={locations} />
      <Suspense fallback={<ExperiencesListSceleton />}>
        <ExperiencesList experiences={experiences} />
      </Suspense>
    </>
  );
}
