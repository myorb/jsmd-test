import ExperiencesList, { ExperiencesListSceleton } from "@/components/ExperiencesList";
import { Suspense } from 'react';

import experiences from '@/data/experiences.json';
import Hero from "@/components/Hero";

export default function Home() {
  const locations = Array.from(
    new Set(
      experiences.flatMap(exp => exp.locations)
    )
  );

  return (
    <>
      <Hero locations={locations}/>
      <Suspense fallback={<ExperiencesListSceleton />}>
        <ExperiencesList experiences={experiences} />
      </Suspense>
    </>
  )
}
