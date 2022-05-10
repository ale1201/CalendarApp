import React from "react";
import Header from "./Header";
import BodyLeft from "./Body";
import BodyRight from "./BodyRight";

//import Calendar from "./Calendar";


function Profile () {

  return (
    <React.Fragment>

      <div className="h-screen flex flex-col">
        
        <Header />
        <div className="flex flex-1">
          <BodyLeft/>
          <BodyRight/>
        </div>
      </div>
    </React.Fragment>
  );
  
  

}

export default Profile;