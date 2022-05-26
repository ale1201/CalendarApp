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
import PointsModal from "./PointsModal";

//import { AppRouter } from "./router/AppRouter";

function Main({ current_user }) {

  
  
  
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, showPointsModal} = useContext(GlobalContext);

  //const [savedEvents] = useContext(GlobalContext);

    

    useEffect(() => {
      fetch('http://localhost:5000/api/usuario/'+current_user.id)
      .then(async (response) => response.json())
      .then(data => localStorage.setItem('user_id', JSON.stringify(data.id)))
    })


  useEffect(() => {
    
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      {showPointsModal && <PointsModal />}

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