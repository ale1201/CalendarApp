import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { Navegacion } from "../components/nav/Navbar";
//import { Footer } from "../components/footer/Footer";
import Account from "../components/users/Profile";
//import { Usuarios } from "../components/users/Users";
//import Dashboard from "../components/dashboard/Dashboard";

export class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Routes>

          <Route path="/perfil">
            <Account />
          </Route>
        </Routes>

      </Router>
    );
  }
}