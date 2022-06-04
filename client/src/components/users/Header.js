/* eslint-disable react/style-prop-object */
//import dayjs from "dayjs";

//import CreateEventButton from "./CreateEventButton";
//import React, { useContext } from "react";
//import logo from "../assets/logo.png";
//import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../logout/logout"


export default function Header() { 

    let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/main`; 
    navigate(path);
  }
    
  return (
    <header className="px-6 py-7 flex items-center bg-blue-400">
       <element className="mr-4 text-xl  font-bold">
       CalendApp
      </element>
      

      <element className=""  style={{marginLeft: 44 + 'em'}} >
      <button
      className=" p-2 rounded-full shadow-md hover:shadow-2xl w-30 bg-blue-200 "
      onClick={routeChange}
    >
      <span className="pl-5 pr-5 ">  Mi Calendario </span>
    </button>
      </element>

      <element className=""  style={{marginLeft: 4 + 'em'}} >
            <LogoutButton/>
        </element>
    
    </header>
  
  );
}