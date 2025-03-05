"use client";

import React, { useState } from 'react';

interface BookingFormProps {
  locations: string[];
  timeSlots?: { [location: string]: string[] };
  onBook: (location: string, date: string) => void;
}

const BookingForm = ({ locations, timeSlots = {}, onBook }: BookingFormProps) => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTime) {
      onBook(selectedLocation, selectedTime);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-md">
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium">Select Location:</label>
        <select 
          value={selectedLocation} 
          onChange={(e) => { 
            setSelectedLocation(e.target.value); 
            setSelectedTime(''); 
          }} 
          className="px-2 py-1 border rounded"
        >
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium">Select Time Slot:</label>
        <select 
          value={selectedTime} 
          onChange={(e) => setSelectedTime(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value="">--Choose a time slot--</option>
          {timeSlots[selectedLocation] && timeSlots[selectedLocation].map(slot => (
            <option key={slot} value={slot}>
              {new Date(slot).toLocaleString()}
            </option>
          ))}
        </select>
      </div>
      <button 
        type="submit" 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Book Experience
      </button>
    </form>
  );
};

export default BookingForm;
