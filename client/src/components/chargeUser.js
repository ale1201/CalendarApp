import Main from "./Main"
import React, { useState, useEffect } from "react";
import ContextWrapper from "../context/ContextWrapper";

export default function ChargeUser ({ current_user }) {


    let url = "http://localhost:5000/api/usuario/email/";

    const [usuario, setUsuario] = useState();

    var values = {
      username: current_user.nickname,
      
      email: current_user.email,
      semestre: 1
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    
    useEffect(() => {
      fetch(url, requestOptions)
      .then(async (response) => response.json())
      .then(data => setUsuario(data));
  
    }, [])
  

    if (usuario !== undefined){

      localStorage.setItem('user_id', JSON.stringify(usuario.id))

        return (
            <ContextWrapper user_id = {usuario.id}>
            <Main current_user={usuario}/>
            </ContextWrapper>
        );
    }
    else{
        return (<div></div>);
    }
}