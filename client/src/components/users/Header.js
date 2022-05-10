/* eslint-disable react/style-prop-object */
//import dayjs from "dayjs";

//import CreateEventButton from "./CreateEventButton";
//import React, { useContext } from "react";
//import logo from "../assets/logo.png";
//import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";


export default function Header() { 

    let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
    
  return (
    <header className="px-6 py-7 flex items-center bg-blue-400">
       <h1 className="mr-4 text-xl  font-bold">
        Hola, Sara. 
      </h1>
      

      <div className=""  style={{marginLeft: 64 + 'em'}} >
      <button
      className=" p-2 rounded-full shadow-md hover:shadow-2xl w-30 bg-blue-200 "
      onClick={routeChange}
    >
      <span className="pl-5 pr-5 ">  Mi Calendario </span>
    </button>
      </div>
    
    </header>
  
  );
}