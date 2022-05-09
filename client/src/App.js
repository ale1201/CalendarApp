<<<<<<< HEAD
import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Sidebarizq from "./components/Sidebarizq";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import Tareas from "./components/Tareas"
=======
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from "./components/users/Profile";
import Main from "./components/Main";
//import { AppRouter } from "./router/AppRouter";
>>>>>>> f3c77a5e320e74074b03ddb970a74b1ed07988e4
function App() {

  //const [backendData, setBackendData] = useState([{}]);

  //console.log(backendData);
  return (

<<<<<<< HEAD
      <div className="h-screen flex flex-col mg-4 ">
        <CalendarHeader />
        <div className="flex flex-1">
        <Sidebar />
          <Month month={currenMonth} />
          <Tareas/>
          <Sidebarizq />
        </div>
      </div>
    </React.Fragment>
=======
    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/' element={<Main/>} />
          <Route exact path='/perfil' element={<Profile/>} />
        </Routes>
      </Fragment>
    </Router>

    
>>>>>>> f3c77a5e320e74074b03ddb970a74b1ed07988e4
  );
}

export default App;
