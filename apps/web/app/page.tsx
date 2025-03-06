import FilterBar from "@/components/FilterBar"
import ExperiencesList from "@/components/ExperiencesList";
import { Suspense } from 'react';

import experiences from '@/data/experiences.json';
import Link from "next/link";
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
      <Suspense fallback={<div>Loading ...</div>}>
        <ExperiencesList experiences={experiences} />
      </Suspense>
    </>
  )
}
