import React, { useState } from "react";
import { format, addMonths } from "date-fns";
import { Calendar } from "react-date-range";
import MonthGrid from "./MonthGrid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangeCalendar({
  onChange = () => {},
  labelFrom = "From Date",
  labelTo = "To Date",
  initialStart,
  initialEnd,
  maxRangeMonths = 6,
  color = "#284B63",
}) {
  const safeStart = initialStart instanceof Date ? initialStart : new Date();
  const safeEnd = initialEnd instanceof Date ? initialEnd : new Date();

const [selection, setSelection] = useState({
  startDate: safeStart,
  endDate: safeEnd,
  key: "selection",
  color: color, // 👈 this line is required for rendering
});


  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    if (startDate instanceof Date && endDate instanceof Date && startDate <= endDate) {
      setSelection(ranges.selection);
      onChange(ranges.selection);
    }
  };

  const maxDate = addMonths(new Date(), maxRangeMonths);

  return (
    <div className="w-full min-h-[600px] bg-white border border-gray-300 p-4">
      <div className="flex justify-between mb-4">
        <div className="text-sm">
          <div className="text-gray-500">{labelFrom}</div>
          <div className="font-medium">
            {selection.startDate ? format(selection.startDate, "MMM dd, yyyy") : "Add date"}
          </div>
        </div>
        <div className="text-sm">
          <div className="text-gray-500">{labelTo}</div>
          <div className="font-medium">
            {selection.endDate ? format(selection.endDate, "MMM dd, yyyy") : "Add date"}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 border border-gray-300">
        <div className="flex gap-4 mb-4 border-b border-gray-200">
          <button
            onClick={() => setMode("dates")}
            className={`pb-2 text-sm font-medium border-b-2 transition-all duration-150 ${
              mode === "dates" ? "border-current" : "border-transparent text-gray-500"
            }`}
            style={mode === "dates" ? { borderColor: color, color: color } : {}}
          >
            Dates
          </button>
          <button
            onClick={() => setMode("months")}
            className={`pb-2 text-sm font-medium border-b-2 transition-all duration-150 ${
              mode === "months" ? "border-current" : "border-transparent text-gray-500"
            }`}
            style={mode === "months" ? { borderColor: color, color: color } : {}}
          >
            Months
          </button>
        </div>

        {mode === "dates" ? (
          <Calendar
            months={2}
            direction="horizontal"
            showDateDisplay={false}
            showMonthAndYearPickers={true}
            weekdayDisplayFormat="EEEEEE"
            rangeColors={[color]}
            minDate={new Date()}
            maxDate={maxDate}
            moveRangeOnFirstSelection={false}
            ranges={[selection]}
            onChange={handleSelect}
          />
        ) : (
          <MonthGrid
            maxMonths={maxRangeMonths}
            color={color}
            onSelect={(date) => console.log("Selected Month:", date)}
          />
        )}
      </div>
    </div>
  );
}