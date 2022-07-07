import React from "react";
import Day from "./Day";
//import CreateEventButton from "./CreateEventButton";
//import dayjs from "dayjs";
import SmallCalendar from "./SmallCalendar";
import CalendarSB from "./CalendarSB";
//import GlobalContext from "../context/GlobalContext";
import Labels from "./Labels";
export default function Sidebarizq() {
    //const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    /* function handlePrevMonth() {
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
    } */
  
  return (
   
    <aside className="m-3 border p-5 w-70 ">
        <p className="ml-4 text-xl text-gray-500 font-bold align=center p-5 w-70 ">Tareas del día</p>
       <CalendarSB/>
       
    
    
    </aside>
  );
}
