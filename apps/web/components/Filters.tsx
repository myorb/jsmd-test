"use client"


import * as React from "react"
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

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Filters() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  const handleFilter = () => {
    const searchParams = new URLSearchParams()
    if (dateRange.start) searchParams.append("startDate", dateRange.start)
    if (dateRange.end) searchParams.append("endDate", dateRange.end)
    searchParams.append("minPrice", priceRange.min.toString())
    searchParams.append("maxPrice", priceRange.max.toString())

    router.push(`/?${searchParams.toString()}`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Filters</h2>
      <div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
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
        <PopoverContent className="w-auto p-0 z-20 bg-background" align="start">
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
      <div>
        <label className="block mb-2">Price Range</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            className="w-1/2 p-2 border rounded"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
          />
          <span>-</span>
          <input
            type="number"
            className="w-1/2 p-2 border rounded"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
          />
        </div>
      </div>
      <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleFilter}>
        Apply Filters
      </button>
    </div>
  )
}



