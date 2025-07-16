import React from "react";
import { format, addMonths, startOfMonth } from "date-fns";

export default function MonthGrid({
  maxMonths = 6,
  color = "#284B63",
  onSelect = () => {},
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(maxMonths)].map((_, index) => {
        const date = addMonths(startOfMonth(new Date()), index);
        return (
          <button
            key={index}
            className="border border-gray-300 rounded-xl p-4 text-center text-sm font-medium transition duration-150 hover:shadow-md hover:bg-gray-100 active:scale-[.97]"
            style={{
              color: color,
              borderColor: color,
            }}
            onClick={() => onSelect(date)}
          >
            {format(date, "MMMM yyyy")}
          </button>
        );
      })}
    </div>
  );
}