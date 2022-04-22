import React, { useContext } from "react";
import CreateEventButton from "./CreateEventButton";
import dayjs from "dayjs";
import SmallCalendar from "./SmallCalendar";
import CalendarSB from "./CalendarSB";
import GlobalContext from "../context/GlobalContext";
import Labels from "./Labels";
export default function Sidebar() {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    function handlePrevMonth() {
      setMonthIndex(monthIndex - 1);
    }
    function handleNextMonth() {
      setMonthIndex(monthIndex + 1);
    }
    function handleReset() {
      setMonthIndex(
        monthIndex === dayjs().month()
          ? monthIndex + Math.random()
          : dayjs().month()
      );
    }
  
  return (
   
    <aside className="m-3 border rounded align-right p-5 w-70 ">
     
      
     <CreateEventButton  />
   
     <Labels />
    </aside>
     

  );
}

