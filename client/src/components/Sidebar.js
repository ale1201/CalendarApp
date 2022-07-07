import React from "react";
import CreateEventButton from "./CreateEventButton";
//import dayjs from "dayjs";
//import SmallCalendar from "./SmallCalendar";
import ProgresoEstadistica from "./ProgresoEstadistica"
//import CalendarSB from "./CalendarSB";
//import GlobalContext from "../context/GlobalContext";
import Labels from "./Labels";
export default function Sidebar() {
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
   
    <aside className="m-3 border rounded align-right p-5 w-100">
     
     <nav className="m4"  />
       <CreateEventButton  />
       <nav />

       <nav className="m4  p-2 w-40"  />
       <Labels/>
       <nav />
     
    </aside>
     

  );
}

