import dayjs from "dayjs";
import React, { useContext } from "react";
//import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
export default function CalendarHeader() {
  const { monthIndex } = useContext(GlobalContext);
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
    <body className="p-5 w-64 align=center" >
     
  
      <h2 className="ml-4 text-xl text-gray-500 font-bold align=center">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "DD MMMM"
        )}
      </h2>
    </body>
  );
}
