"use client";

import type { Experience } from "@/types";
import { useSearchParams } from "next/navigation";
import ExperienceCard from "./ExperienceCard";

export default function ExperiencesList({
  experiences,
}: {
  experiences: Experience[];
}) {
  const searchParams = useSearchParams();
  const location = searchParams.get("where") || "any";
  const price = searchParams.get("price") || "0-999999";
  const [minPrice = 0, maxPrice = 999999] = price.split("-").map(parseFloat);
  const date = searchParams.get("when") || "";
  const [startDate, endDate] = date.split(",");

  const filteredExperiences = experiences.filter((exp) => {
    const inPriceRange = exp.price >= minPrice && exp.price <= maxPrice;
    const inLocation = location === "any" || exp.locations.includes(location);

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
    <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredExperiences.length ? (
        filteredExperiences.map((exp: Experience) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))
      ) : (
        <p className="text-center text-lg">No experiences found</p>
      )}
    </div>
  );
}

export const ExperiencesListSceleton = () => {
  return (
    <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-lg shadow-md p-4"
        >
          <div className="h-40 bg-gray-200 rounded-lg"></div>
          <div className="h-4 my-2 bg-gray-200 rounded"></div>
          <div className="h-4 my-2 bg-gray-200 rounded"></div>
          <div className="h-4 my-2 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};
