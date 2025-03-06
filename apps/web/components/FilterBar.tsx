"use client"

import { useEffect, useState } from 'react';
import { format } from "date-fns"
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
import { useQueryState } from 'nuqs';
import Link from 'next/link';

interface FilterBarProps {
  locations: string[];
}

export default function FilterBar({ locations }: FilterBarProps) {
  const [price, setPrice] = useQueryState("price", {
    defaultValue: `0-999999`,
    clearOnDefault: true,
  });
  const [location, setLocation] = useQueryState("where", {
    defaultValue: 'all',
    clearOnDefault: true,
  });

  const [_, setDateRange] = useQueryState("when");

  const [date, setDate] = useState<DateRange | undefined>()

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (date?.from && date?.to) {
      const from = format(date.from, "yyyy-MM-dd");
      const to = format(date.to, "yyyy-MM-dd");
      setDateRange(`${from},${to}`);
      setOpen(false);
    }
  }
  , [date])

  const priceRange = [
    { label: "Any", value: "0-999999" },
    { label: "< $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200 - $500", value: "200-500" },
    { label: "> $500", value: "500-999999" },
  ]

  return (
    <form className="p-4 bg-gray-100 rounded-md mb-4 flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Where</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-9 px-3 py-1 border rounded cursor-pointer"
        >
          <option value="any">Anywhere</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium">When</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              size={'sm'}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
              onClick={() => setOpen(!open)}
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
        <label className="mb-1 font-medium">Price</label>
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="h-9 px-3 py-1 border rounded cursor-pointer"
        >
          {priceRange.map((p, i) => (
            <option key={i} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col self-end">
        <Button
          size={'sm'}
          asChild
        >
          <Link href='/'>
            Clear
          </Link>
        </Button>
      </div>
    </form>
  );
};

export const FilterBarSkeleton = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-md mb-4 flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col">
        <div className="h-9 bg-gray-200 rounded cursor-pointer"></div>
      </div>
      <div className="flex flex-col">
        <div className="h-9 bg-gray-200 rounded cursor-pointer"></div>
      </div>
      <div className="flex flex-col">
        <div className="h-9 bg-gray-200 rounded cursor-pointer"></div>
      </div>
      <div className="flex flex-col self-end">
        <div className="h-9 bg-gray-200 rounded cursor-pointer"></div>
      </div>
    </div>
  );
}
