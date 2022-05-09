/* eslint-disable react/style-prop-object */
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import "./CalendarHeader.css"
//import CreateEventButton from "./CreateEventButton";
import React, { useContext } from "react";
//import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";


export default function CalendarHeader() {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/perfil`; 
    navigate(path);
  }

  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  /* function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  } */
  return (
    <header className="px-6 py-7 flex items-center bg-blue-400">
       <h1 className="mr-4 text-xl  font-bold">
        Hola, Sara. 
      </h1>
      
      <h1 className="px-1 mr-4 text-xl text-gray-500 font-bold">
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

      <div className=""  style={{marginLeft: 55 + 'em'}} >
      <button
      className=" p-2 rounded-full shadow-md hover:shadow-2xl w-30 bg-blue-200 "
      onClick={routeChange}
    >
      <span className="pl-5 pr-5 ">  Perfil </span>
    </button>
      </div>
    
    </header>
  
  );
}
