import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
//import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
export default function CalendarHeader(day) {
  const [dayEvents, setDayEvents] = useState([]);
  const { monthIndex,
   setSmallCalendarMonth,
    setDaySelected,
    daySelected,
    filteredEvents,
    setShowEventModal,
    setSelectedEvent, } = useContext(GlobalContext);
    useEffect(() => {
      const events = filteredEvents.filter(
        (evt) =>
          dayjs(evt.day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      );
      setDayEvents(events);
    }, [filteredEvents, day]);
  
    function getCurrentDayClass() {
      return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
        ? "bg-blue-400 text-white rounded-full w-7"
        : "";
    }
  return (
  

<div
className="flex-1 cursor-pointer"
>
{dayEvents.map((evt, idx) => (
  <div
    key={idx}
    onClick={() => setSelectedEvent(evt)}
    className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
  >
    {evt.hourIni}-{evt.hourFin}, {evt.title}
  </div>
))}
</div>
  );
}
