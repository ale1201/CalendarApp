import dayjs from "dayjs";
import CreateEventButton from "./CreateEventButton";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
export default function CalendarHeader() {
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
    <header className="px-4 py-2 flex items-center">
      
      <h1 className="mr-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h1>
     

      <h2 className="ml-4 text-xl text-gray-500 font-bold align-right">
     
      </h2>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
    
      <h4 className="ml-4 text-x2 font-bold align-right">
      <button
        onClick={handleReset}
        className=" border rounded  p-2 rounded-full shadow-md hover:shadow-2xl w-30 bg-blue-300"
      >
        
        <span className="pl-3 pr-3 align-right"> Hoy   </span>
      </button>
      </h4>
    </header>
  
  );
}
