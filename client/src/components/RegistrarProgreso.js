import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className=" p-2 rounded-full shadow-md hover:shadow-2xl w-30 bg-blue-200"
    >
      <span className="pl-3 pr-2 "> Progreso diario</span>
    </button>
     
  );
}
