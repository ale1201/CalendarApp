import React, { useState, useContext, useEffect } from "react";
import "../App.css";
import { getMonth } from "../util";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Tareas from "./Tareas";
//import Sidebarizq from "./Sidebarizq";
import Month from "./Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "./EventModal";
//import { AppRouter } from "./router/AppRouter";
function Main() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  //const [backendData, setBackendData] = useState([{}]);


  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  //console.log(backendData);
  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        
        <CalendarHeader />
        <div className="flex flex-1">
        <Sidebar />
          <Month month={currenMonth} />
          <Tareas/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main;