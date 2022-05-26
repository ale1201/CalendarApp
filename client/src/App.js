import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from "./components/users/Profile";
import LoginView from "./components/login/loginView";
import Aux from "./components/aux";
//import { AppRouter } from "./router/AppRouter";
function App() {

  return (

    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/main' element={<Aux/>} />
          <Route exact path='/perfil' element={<Profile/>} />
          <Route exact path='/' element={<LoginView/>} />
        </Routes>
      </Fragment>
    </Router>

    
  );
}

export default App;
