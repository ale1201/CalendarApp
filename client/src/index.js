import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ReactDOM from "react-dom";
import Profile from "./components/users/Profile";
import LoginView from "./components/login/loginView";
import Aux from "./components/aux";
import "./index.css";
import App from "./App";
import {Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain="dev-m2j2lukt.us.auth0.com" clientId="PczvM7QErk1xya8cjcCgBHqIueVlaS6L" redirectUri={window.location.origin}>

    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/main' element={<Aux/>} />
          <Route exact path='/perfil' element={<Profile/>} />
          <Route exact path='/' element={<LoginView/>} />
        </Routes>
      </Fragment>
    </Router>

    </Auth0Provider>
    
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
