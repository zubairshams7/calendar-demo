import React from "react";
import DateRangeCalendar from "./DateRangeCalendar";

export default function App() {
  const handleRangeChange = (range) => {
    console.log("Selected Range:", range);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl">
        <h1 className="text-xl font-semibold mb-6 text-gray-800">Date Picker Demo</h1>
        <DateRangeCalendar
          onChange={handleRangeChange}
          labelFrom="From Date"
          labelTo="To Date"
          color="#284B63"
        />
      </div>
    </div>
  );
}