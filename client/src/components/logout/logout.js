import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { func } from "joi";

export default function LogoutButton () {
    const { logout } = useAuth0();

    async function logo() {
        localStorage.removeItem("user_id")
        localStorage.removeItem("savedEvents")
        logout({returnTo:'http://localhost:3000/'})
      }
    

    return(
        <button
            className=" p-2 rounded-full shadow-md hover:shadow-2xl w-30 bg-blue-200 "
            onClick={logo}
            >
            <span className="pl-5 pr-5 ">  Salir </span>
        </button>
    ); 
}