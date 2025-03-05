import FilterBar from "@/components/FilterBar"
import ExperiencesList from "@/components/ExperiencesList";

import experiences from '@/data/experiences.json';

export default function Home() {
  const allLocations = Array.from(
    new Set(
      experiences.flatMap(exp => exp.locations)
    )
  );

  const availableDates = Array.from(
    new Set(
      experiences.flatMap(exp => Object.values(exp.timeSlots).flat())
    )
  );

  const maxPrice = Math.max(...experiences.map(exp => exp.price));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">JSMD Experiences</h1>
      <FilterBar locations={allLocations} maxFilterPrice={maxPrice}/>
      <ExperiencesList experiences={experiences} />
    </div>
  )
}
