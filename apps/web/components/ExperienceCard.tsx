import Image from "next/image"
import Link from "next/link"
import type { Experience } from "@/types"

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
            ${experience.price}
            {experience.strikePrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${experience.strikePrice}</span>
            )}
          </span>
          <Link
            href={`/experience/${experience.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

