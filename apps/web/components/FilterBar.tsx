"use client"

import React, { useState } from 'react';
import { useRouter } from "next/navigation"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

interface FilterBarProps {
  locations: string[];
  maxFilterPrice: number;
}

const FilterBar = ({ locations, maxFilterPrice }: FilterBarProps) => {
  const router = useRouter()
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxFilterPrice);
  const [location, setLocation] = useState("All");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: addDays(new Date(), 20),
  })

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams()
    if (date?.from && date?.to) {
      searchParams.append("startDate", date.from?.toISOString().split('T')[0] || "")
      searchParams.append("endDate", date.to?.toISOString().split('T')[0] || "")
    }
    if (minPrice) searchParams.append("minPrice", minPrice.toString())
    if (maxPrice) searchParams.append("maxPrice", maxPrice.toString())
    if (location) searchParams.append("location", location)

    router.push(`/?${searchParams.toString()}`)
  }

  return (
    <form onSubmit={handleFilter} className="p-4 bg-gray-100 rounded-md mb-4 flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Where</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-9 px-3 py-1 border rounded"
        >
          <option value="All">All</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium">When</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              size={'sm'}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Min Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="h-9 px-3 py-1 border rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Max Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="h-9 px-3 py-1 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-end"
      >
        Filter
      </button>
    </form>
  );
};

export default FilterBar;
