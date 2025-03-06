import Image from "next/image";
import FilterBar, { FilterBarSkeleton } from "./FilterBar";
import { Suspense } from "react";

type Props = {
  locations: string[];
};

export default function Hero({ locations: locations }: Props) {
  return (
    <section className="relative w-full overflow-hidden pb-4">
      <Image
        src="/hero.png"
        width="1440"
        height="400"
        alt="Hero"
        className="object-cover w-full h-[600px] aspect-video"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="container grid-in-container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white py-4">
            Book Your Next Awesom Experience
          </h1>
          <div className="grid gap-2 max-w-lg">
            <Suspense fallback={<FilterBarSkeleton />}>
              <FilterBar locations={locations} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
