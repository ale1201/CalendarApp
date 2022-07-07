import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

export default function EventModal() {
  const {
    setShowPointsModal,
    //indexCategoria,
    dispatchCalEvent,
    selectedStatus,
    selectedEvent,
  } = useContext(GlobalContext);

  
  const estados = {
    "end_on_time":"Finalizada a tiempo",
    "end_before_time":"Finalizada antes de tiempo",
    "end_after_time":"Finalizada después de tiempo",
    "started_not_finalized":"Se empezó pero no se finalizó",
    "not_started":"No se empezó"
  }

  const puntos = {
    "end_on_time": 5,
    "end_before_time":4,
    "end_after_time":3,
    "started_not_finalized":2,
    "not_started":1
  }
  


  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded shadow-2xl w-1/4">
        <header className="bg-gray-300 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>

          <element>
            <button onClick={() => setShowPointsModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </element>
        </header>

        <div className="p-3" style={{background: '#D893F3'}}>
          <div className="grid grid-cols-1/5 items-end gap-y-7" >
            <div></div>
            {puntos[selectedStatus] === 5 && (    <p>Felicidades, ganaste {puntos[selectedStatus]} punto(s) extra!  - Sigue gestionando tu tiempo de la misma manera, para poder completar todas tus actividades propuestas :)</p>)}
            {puntos[selectedStatus] === 4 && (    <p>Felicidades, ganaste {puntos[selectedStatus]} punto(s) extra!  - Al poder acabar tus actividades antes de tiempo, puedes tener mayor tiempo libre y dedicarlo a otras actividades :)</p>)}
            {puntos[selectedStatus] === 3&& (    <p>Felicidades, ganaste {puntos[selectedStatus]} punto(s) extra!  - Recuerda dedicar el tiempo propuesto para cada actividad, para lograr realizarlas a tiempo :)</p>)}
            {puntos[selectedStatus] === 2 && (    <p>Felicidades, ganaste {puntos[selectedStatus]} punto(s) extra!  - Recuerda realizar todas las actividades propuestas para que puedas cumplir con tus objetivos :)</p>)}
            {puntos[selectedStatus] === 1 && (    <p>Felicidades, ganaste {puntos[selectedStatus]} punto(s) extra!  - Puedes priorizar de mejor manera tu tiempo, para que puedas lograr realizar las actividades propuestas :)</p>)}
        
            

          </div>
        </div>
        
      </form>
    </div>
  );
}
