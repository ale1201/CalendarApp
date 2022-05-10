import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from "./components/users/Profile";
import LoginView from "./components/login/loginView";
import Main from "./components/Main";
//import { AppRouter } from "./router/AppRouter";
function App() {

  //const [backendData, setBackendData] = useState([{}]);

  //console.log(backendData);
  return (

    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/main' element={<Main/>} />
          <Route exact path='/perfil' element={<Profile/>} />
          <Route exact path='/' element={<LoginView/>} />
        </Routes>
      </Fragment>
    </Router>

    
  );
}

export default App;
