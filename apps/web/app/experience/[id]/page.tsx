import Image from "next/image"
import Calendar from "@/components/Calendar"
import experiences from '@/data/experiences.json';
import type { Experience } from "@/types"

export default async function ExperiencePage({ params }: { params: { id: string } }) {
  const { id } = await params
  const experience = experiences.find((exp) => String(exp.id) === id) as unknown as Experience

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={experience.imageUrl || "/placeholder.svg"}
            alt={experience.title}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{experience.title}</h1>
          <p className="text-gray-600 mb-4">{experience.description}</p>
          <div className="mb-4">
            <span className="text-2xl font-bold">${experience.price}</span>
            {experience.strikePrice && (
              <span className="text-lg text-gray-500 line-through ml-2">${experience.strikePrice}</span>
            )}
          </div>
          <p className="mb-4">Number of People: {experience.numberOfPeople}</p>
          <h2 className="text-xl font-semibold mb-2">Available Locations:</h2>
          <ul className="list-disc list-inside mb-4">
            {experience.locations.map((location) => (
              <li key={location}>{location}</li>
            ))}
          </ul>
          <Calendar experience={experience} />
        </div>
      </div>
    </div>
  )
}

