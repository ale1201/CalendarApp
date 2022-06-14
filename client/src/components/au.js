import ChargeUser from "./chargeUser"
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useContext, useEffect } from "react";

export default function Aux () {


    const {user} = useAuth0();
  

    if (user !== undefined){

        return (

            <ChargeUser current_user={user}/>
        );
    }
    else{
        return (<div></div>);
    }
}
