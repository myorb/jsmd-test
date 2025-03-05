import Image from "next/image"
import Link from "next/link"
import type { Experience } from "@/types"
import { Button } from "@workspace/ui/components/button"

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Image
        src={experience.imageUrl || "/placeholder.svg"}
        alt={experience.title}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{experience.title}</h2>
        <p className="text-gray-600 mb-2">{experience.description}</p>
        <p className="text-gray-400 mb-2 text-sm">{experience.locations.map(l => l).join(', ')}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">
            ${experience.strikePrice ? experience.strikePrice : experience.price}
            {experience.strikePrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${experience.price}</span>
            )}
          </span>
          <Button asChild >
            <Link
              href={`/experience/${experience.id}`}
            >
              View Details
            </Link>
          </Button>

        </div>
      </div>
    </div>
  )
}

