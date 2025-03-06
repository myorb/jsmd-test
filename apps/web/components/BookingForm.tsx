"use client";

import { useEffect, useState } from "react";
import type { Experience } from "@/types";

export default function BookingForm({
  experience,
}: {
  experience: Experience;
}) {
  const [selectedLocation, setSelectedLocation] = useState(
    experience.locations[0],
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    setSelectedDate("");
    setSelectedTime("");
  }, [selectedLocation]);

  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  // Create a unique list of available dates for the selected location.
  const availableDates = selectedLocation
    ? Array.from(
        new Set(
          experience.timeSlots[selectedLocation]?.map(
            (slot) => slot.split("T")[0],
          ) || [],
        ),
      )
    : [];

  // Filter available time slots based on the selected date.
  const availableTimeSlots =
    selectedLocation && selectedDate
      ? experience.timeSlots[selectedLocation]?.filter((slot) =>
          slot.startsWith(selectedDate),
        ) || []
      : [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Book a Time Slot</h2>
      <select
        className="w-full p-2 border rounded mb-4"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        {experience.locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      {/* Display available dates */}
      <div className="grid grid-cols-7 gap-2">
        {availableDates.map((date, index) => (
          <button
            key={index}
            className={`p-2 border rounded ${selectedDate === date ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setSelectedDate(date || "")}
          >
            {date && new Date(date).getDate()}
          </button>
        ))}
      </div>

      {/* Display available time slots for the selected date */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Available Time Slots:</h3>
          <div className="grid grid-cols-2 gap-2">
            {availableTimeSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(slot)}
                className={`p-2 border rounded hover:bg-blue-500 hover:text-white ${
                  selectedTime === slot ? "bg-blue-500 text-white" : ""
                }`}
              >
                {slot.split("T")[1]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Booking Button */}
      {selectedTime && selectedLocation && (
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
          onClick={() => {
            alert(
              `Booked ${selectedTime} at ${selectedLocation} on ${selectedDate}`,
            );
          }}
        >
          Book Experience
        </button>
      )}
    </div>
  );
}
