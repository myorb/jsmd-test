"use client";

import type { Experience } from "@/types"
import { useSearchParams } from "next/navigation";
import ExperienceCard from "./ExperienceCard";

export default function ExperiencesList({ experiences }: { experiences: Experience[] }) {
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "1000");
  const location = searchParams.get("location") || "All";

  const filteredExperiences = experiences.filter((exp) => {
    const inPriceRange = exp.price >= minPrice && exp.price <= maxPrice;
    const inLocation = location === "All" || exp.locations.includes(location);

    let inDateRange = true;
    const allSlots = Object.values(exp.timeSlots).flat();

    if (startDate || endDate) {
      inDateRange = allSlots.some((slot) => {
        const slotDate = slot ? slot.split("T")[0] : "";
        if (startDate && endDate) {
          return slotDate && slotDate >= startDate && slotDate <= endDate;
        } else if (startDate && !endDate) {
          return slotDate && slotDate >= startDate;
        } else if (!startDate && endDate) {
          return slotDate && slotDate <= endDate;
        }
        return true;
      });
    }

    return inPriceRange && inDateRange && inLocation;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredExperiences.length
        ? filteredExperiences.map((exp: Experience) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))
        : <p className="text-center text-lg">No experiences found</p>
      }
    </div>
  )
}

